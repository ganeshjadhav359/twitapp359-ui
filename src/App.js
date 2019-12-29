import React, { Component } from 'react';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { connect } from 'react-redux';
import { Route,BrowserRouter as Router, Switch  } from 'react-router-dom';
import Home from './components/Home';
import MyNavbar from './components/Navbar';
import { Container,Col } from 'react-bootstrap';
import NotFound from './components/NotFound';
import ShowTweets from './ShowTweets';
import  SearchHashTags from './components/SearchHashTags'
import LocationFilter from './components/LocationBasedTweets'
const getIsLoggedIn =()=>{

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn;
}

const setIsLoggedIn = ( isLoggedIn) =>({ type: 'LOGGED_IN' ,payload:isLoggedIn})

class App extends Component {
  constructor() {
    super();
    this.state = { isLoggedIn: false};
  }
componentDidMount(){
  const isLoggedIn = getIsLoggedIn();
  this.setState({isLoggedIn: isLoggedIn });
  this.props.setIsLoggedIn(isLoggedIn);
}

static getDerivedStateFromProps(nextProps, prevState){
  if(nextProps.isLoggedIn!==prevState.isLoggedIn){
      const isLoggedIn = getIsLoggedIn();
      return { isLoggedIn : isLoggedIn };

  }
  return null;

}


  render() {
    const { isLoggedIn }= this.state;
    if(!isLoggedIn){
        return (
          <div className="App">
              <Router>
                <Switch>
                  <Route exact path="/*" component={Login} />
                </Switch>
              </Router>
          </div>  
        );
    }
    else{
      return (
        <div className="App">
        <Router>
                  <MyNavbar/>
                  <Container fluid="true" className="Body">
                      <Col>
                          <Switch>
                              <Route exact path="/" component={Home} />
                              <Route exact path="/tweets" component={ShowTweets} />
                              <Route path="/tweets/search/hashtag" component={SearchHashTags} />
                              <Route path="/tweets/location/search" component={LocationFilter} />
                              <Route path="/*" component={NotFound} />
                          </Switch>
                      </Col>
                  </Container>
          </Router>
      </div>
      );

    }
  }
}

const  mapStateToProps = (state) =>({
  isLoggedIn:state.login.isLoggedIn
})
const mapDispatchToProps = (dispatch) =>({
  setIsLoggedIn:(isLoggedIn) => dispatch(setIsLoggedIn(isLoggedIn))
});

export default connect( mapStateToProps , mapDispatchToProps )(App);