import React, { Component } from 'react';
import  TwitterLogin  from 'react-twitter-auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { login } from '../actions/loginLogout'
import {Spinner, Col,Container ,Row } from 'react-bootstrap';
import { pullTweetsFormTwitter } from '../actions/home_line';
class Login extends Component {
    constructor() {
        super();
        this.state ={isFetching:false};
    }

    onSuccess = (response) => {
        this.setState({isFetching:true});
        const token = response.headers.get('jwt-token');
        response.json().then( async (user) => {
        try{
            await this.props.pullTweetsFormTwitter(token);
            await this.props.login(token,user);
           this.setState({isFetching:false});
        }
        catch(err){
            alert(err);
        }
        });
      };
      
    onFailed = (error) => {
        alert(error);
      };

   
    render() {
        if(this.state.isFetching===true){
            return (
                <Container fluid="true">
                    <Row>
                        <Col className="custome-spinner">
                            <h5>setting up app for you.......</h5>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>
                </Container>    
            )
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner ">
                    <h3>Sign In</h3>
                    <div className="login-button-center">
                        <TwitterLogin 
                            loginUrl="https://twitapp359-service.herokuapp.com/users/oauth/access_token"
                            onFailure={this.onFailed} 
                            onSuccess={this.onSuccess}
                            requestTokenUrl="https://twitapp359-service.herokuapp.com/users/oauth/request_token"
                        />
                     </div>
                </div>
             </div>
        )
    }
}
const  mapStateToProps = (state) =>({

  })
  
  const mapDispatchToProps = (dispatch) =>({
    login:bindActionCreators(login,dispatch),
    pullTweetsFormTwitter : bindActionCreators(pullTweetsFormTwitter,dispatch)
  });
export default connect( mapStateToProps,mapDispatchToProps )(Login);