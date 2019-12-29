import React, { Component } from "react";
import { Form ,Button,Row,Col, Container ,Card,Spinner} from 'react-bootstrap';
import{ Formik ,ErrorMessage } from 'formik';
import * as yup from 'yup';
import { errorStyle } from './../CommonFunctions'

const schema = yup.object({
   
    search: yup.string()
    .matches(/^[a-zA-Z0-9_.-\s#]*$/,{message:'Only contains alphabets and numbers ',excludeEmptyString:true})
    .min(1,'Too short text...')
    .max(100,'Too long text...')
    .required('Please enter text'),
});

export const getToken =() =>{
    const token = localStorage.getItem('token');
  return token;
}

export const Loading =({ isLoading }) =>{
    if(isLoading){
        return(
            <div>
                  <h5>fetching tweets stay calm.......</h5>
                  <Spinner animation="border" variant="primary" />
            </div>
        )
    }
    return null;
}

const getCard = (tweet,key) =>(
    <Card key={key}>
        <Card.Body>
            <Card.Title>
               <span>{tweet.screen_name} , {<h6>{tweet.created_at}</h6>}
               </span> 
            </Card.Title>
            <Card.Text>
                {tweet.text}
            </Card.Text>
            <hr/>
            <Card.Img variant="top" src={tweet.profile_img} />
        </Card.Body>
        <Card.Footer>
            
            <Row>
                <Col>
                    {tweet.tweetUrl!=='NA' ? (
                        <Button target="_blank" href={tweet.tweetUrl} variant="secondary" size="sm" >
                            See tweet
                        </Button>
                    ) :(
                        <Card.Text>
                            Tweet url is not available.
                        </Card.Text>
                    )
                    
                    } 
                    
                </Col>
                
            </Row>
        </Card.Footer>  
    </Card>
)

export const TweetTiles =({ submit ,statuses ,isLoading })=>{
    if(isLoading)
        return null;
    
    let card1='', card2='';
    if(submit && statuses && statuses.tweets && statuses.tweets.length)
        return (
            <div style={{marginTop:'40px'}}>
            { 
                statuses.tweets.map((tweet,key)=>{
                    if(key%3===2){
                        const card3 = getCard(tweet,key)
                    return( <Row key={key} >
                                <Col style={{marginBottom:'10px'}}>
                                    {card1}
                                </Col>
                                <Col style={{marginBottom:'10px'}}>
                                    {card2}
                                </Col>
                                <Col style={{marginBottom:'10px'}}>
                                    {card3}
                                </Col>
                            </Row>
                        )
                    }
                else if(key%3===0 && statuses.tweets.length===(key+1)){
                    return( <Row style={{marginBottom:'10px'}} key={key}>
                                <Col style={{marginBottom:'10px'}}>
                                    {getCard(tweet,key)}
                                </Col>
                                {/* <Col style={{marginBottom:'10px'}}>
                                    
                                </Col >    
                                <Col style={{marginBottom:'10px'}}>
                                    
                                </Col> */}
                        </Row>
                    )
                }
                else if(key%3===1 && statuses.tweets.length===(key+1)){
                    return( <Row style={{marginBottom:'10px'}}>
                                <Col style={{marginBottom:'10px'}}>
                                    {card1}
                                </Col>
                                <Col style={{marginBottom:'10px'}}>
                                    {getCard(tweet,key)}
                                </Col>
                                {/* <Col style={{marginBottom:'10px'}}>
                                    
                                </Col> */}
                        </Row>
                    )
                }
                else if(key%3===0){
                    card1 = getCard(tweet,key);
                }
                else{
                    card2 = getCard(tweet,key);
                }

                })
            }
        </div>
    )
    else if(submit)
        return ( 
        <div>
            <h4>No data found</h4>
        </div>
        )
    return null;
}


export default class SearchHashTags extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false,submit:false,statuses:[],error:false,errorMessage:''};
    }
    

    handleSubmit= (data)=>{
        this.setState({loading:true,submit:true});
        const url ='https://twitapp359-service.herokuapp.com/search/hashtag';
        const token =getToken();
        fetch(url,{
            headers: {
                'jwt-token':token,
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res =>{
            if(res.ok && res.status===200)
                return res.json();
            else 
                throw new Error(res.statusText || 'Please enter valid credentials');
        })
        .then(result =>{
            console.log(result);
            this.setState({statuses:result})
            this.setState({loading:false});
        })
        .catch(err=>{
            this.setState({error:true,errorMessage:err,loading:false});
        })
    }

    render() {
        const {loading,statuses} =this.state;
        return (
            <Formik
                validationSchema={schema}
                onSubmit={values => this.handleSubmit(values)}
                initialValues={{
                    search:'',
                   
                }}
            >
            {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    setFieldTouched
                  }) =>(
                     <Container>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                            <Row>
                                <Col xs={12} md={8}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Hashtag</Form.Label>
                                        <Form.Control 
                                            type="search" 
                                            placeholder="Enter hashtag" 
                                            name="search"
                                            value={values.search}
                                            onChange={ e => {setFieldTouched(e.target.name, true);handleChange(e);}}
                                            isValid={ touched.search && !errors.search }
                                            onBlur={e =>{setFieldTouched(e.target.name, true);}}                                    
                                        />
                                        <div style={errorStyle}>
                                            <ErrorMessage name="search" />
                                        </div>
                                    </Form.Group>
                                </Col>

                                <Col xs={6} md={4} className="SearchMargin-top">
                                    <Button variant="primary" type="submit" disabled={loading}> 
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Loading isLoading={loading}/>
                        <TweetTiles isLoading={loading} submit={this.state.submit} statuses={statuses}/>
                    </Container>
                    
                )}
            </Formik>
        );
    }
}