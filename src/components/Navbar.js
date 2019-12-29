import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/loginLogout';

const getUserName =() =>{
    let userData = localStorage.getItem('userData');
    userData =JSON.parse(userData);
    return userData.email
}
class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.state ={userName:''};
    }
    
     
    handleLogout = async () =>{
        try {
            await this.props.logout();
        } catch (error) {
            alert(error);
        }
        
    }
    componentDidMount(){

        const email = getUserName();
        const userName  = email.slice(0,email.search('@'));
        this.setState({userName});
    }
    render() {
      
        return (
            <div>
                <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink  className="nav-link" exact to={"/"}>Home </NavLink>
                            <NavLink  className="nav-link" exact to={"/tweets"}> Tweets </NavLink>
                            <NavLink  className="nav-link" exact to={"/tweets/search/hashtag"}> Hashtag search  </NavLink>
                            <NavLink  className="nav-link" exact to={"/tweets/location/search"}> Location filter </NavLink>
                        </Nav>
                        <Nav>

                            <Navbar.Text>
                                Signed in as : {this.state.userName}
                            </Navbar.Text>

                            <Nav.Link eventKey={2} href="#memes" onClick={this.handleLogout}>
                                Logout
                            </Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const  mapStateToProps = (state) =>({

})

const mapDispatchToProps = (dispatch) =>({
  logout:bindActionCreators(logout,dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(MyNavbar);