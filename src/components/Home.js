import React, { Component } from 'react';
import { Container} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (

            <Container>
                <h2> 1. See your home timeline </h2>
                <h2> 2. Search tweets by hashtag</h2>
                <h2> 3. Filter tweets by location</h2>
            </Container>
                
        );
    }
}

export default Home;