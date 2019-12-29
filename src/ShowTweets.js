import React, { Component, Fragment } from 'react';
import { Card ,Button ,Spinner , Row, Col ,Container} from 'react-bootstrap';

const getToken =() =>{
    const token = localStorage.getItem('token');
  return token;
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


class ShowTweets extends Component {

    constructor(props) {
        super(props);
        this.state ={tweets:[],loading:true,error:false,errorMessage:''};
    }
    

    componentDidMount(){
        const url ='https://twitapp359-service.herokuapp.com/homepage/tweets';
        const token =getToken();
        fetch(url,{
            headers: {
                'jwt-token':token
            },
            method: 'get'
        })
        .then(res =>{
            if(res.ok && res.status===200)
                return res.json();
            else 
                throw new Error(res.statusText || 'Please enter valid credentials');
        })
        .then(result =>{
            console.log(result);
            this.setState({tweets:result})
            this.setState({loading:false});
        })
        .catch(err=>{
            this.setState({error:true,errorMessage:err,loading:false});
        })
    }

    render() {
        const {tweets ,loading } = this.state;
        let card1='';
        let card2='';
        if(loading){
            return (
                <Container>
                    
                            <h5>fetching tweets stay calm.......</h5>
                            <Spinner animation="border" variant="primary" />
                </Container>    
            )
        }
        return (
        <div style={{display:'inline-flex'}}>
             <div style={{width:'20%'}}>
                 <Row>
                    <Col>
                        <Card >
                            <Card.Body>
                                <Card.Title>Most tweets by</Card.Title>
                                <Card.Text>
                                    {tweets.most_links} , {tweets.link_count}
                                </Card.Text>
                                <hr/>
                                <Card.Title>Top hashtags</Card.Title>
                                <hr/>
                                {
                                    tweets.hashtags.map( hashtag =>( 
                                        <Fragment>
                                            <Card.Text>
                                                #{hashtag}
                                            </Card.Text>
                                            <hr/>
                                        </Fragment>
                                        
                                    ))
                                }
                            </Card.Body>
                           
                          
                        </Card>
                    </Col>
                </Row>
            </div>
            <div style={{width:'70%',margin:'0px 5%'}}>
                {
                  

                   tweets.tweets.map((tweet,key)=>{
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
                    else if(key%3===0 && tweets.tweets.length===(key+1)){
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
                    else if(key%3===1 && tweets.tweets.length===(key+1)){
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
        </div>
       
        );
    }
}

export default ShowTweets;