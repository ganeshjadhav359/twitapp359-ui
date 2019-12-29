import React, { Component } from 'react';
import{ Form, Container } from 'react-bootstrap';
import { getToken ,TweetTiles ,Loading } from './SearchHashTags';
const city={};
city['2']="12.9716,77.5946,20km";
city['3']="18.5204,73.8567,20km";
city['4']="19.0760,72.8777,20km";
city['5']="28.7041,77.1025,20km";
city['6']="22.9868,87.8550,20km";
city['7']="37.0902,95.7129,1000km";
city['8']="35.6762,139.6503,20km";









class LocationBasedTweets extends Component {

    constructor(props) {
        super(props);
        this.state={loading:false,statuses:null,submit:false,error:false,errorMessage:''}
    }
    

    onChange =(e)=>{
        if(city[e.target.value]){

            this.setState({submit:true,loading:true});
            const data ={
                city: city[e.target.value]
            }

            const url ='https://twitapp359-service.herokuapp.com/search/location';
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
    }
    render() {
        const {loading ,statuses,submit} =this.state;
        return (
            <div>
                <Container>
                     <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label> select city</Form.Label>
                            <Form.Control as="select" disabled={loading} defaultValue={1} onChange={this.onChange}>
                                <option value ="1" disabled={true}>filter tweets by location</option>
                                <option value ="2">Banglore</option>
                                <option value ="3">Pune</option>
                                <option value ="4">Mumbai</option>
                                <option value ="5">Delhi</option>
                                <option value ="6">West Bengal</option>
                                <option value ="7">New york</option>
                                <option value ="8">Tokyo</option>
                            </Form.Control>
                    </Form.Group>
                    <Loading isLoading={loading}/>
                    <TweetTiles submit={submit} statuses={statuses} isLoading={loading}/>
                </Container>
                
            </div>
        );
    }
}

export default LocationBasedTweets;