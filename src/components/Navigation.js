import React from 'react';
import {Redirect} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { getJwt, destroyJwt } from '../helpers/JWTHelper';
import axios from 'axios';

class NavBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            user: undefined,
        };
    }

    componentDidMount(){
        // if jwt is set and not expired yet, then say hi to user
        const jwt = getJwt();
        if (jwt) {
            // this.setState({
            //     user: null
            // })
            axios.post('/auth/getUser', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            }).then(res => {
                console.log('then');
                // this.setState({
                //     user: res.data.AuthData.user,
                // });
                console.log(res);
            }).catch((error) => {
                console.log(error);
            });
            console.log(this.state.user);
        }
    }

    render(){
        return (
            <Navbar>
                <Navbar.Brand href="/">Simple Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav className="mr-auto">
                    <Nav.Link href="/products">Products</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {this.isLogin()}
                </Navbar.Collapse>
            </Navbar>  
        );
    }

    isLogin = () => {
        if(this.state.user === undefined || this.state.user === null){
            return <Navbar.Text><a href="/login">Login</a></Navbar.Text>;
        }else{
            return (
                <NavDropdown title={`Hi ${this.state.user.firstname}!`} id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">
                        <Navbar.Text>Profile</Navbar.Text>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.2" onClick={this.onLogout()}>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

    onLogout = () => {
        destroyJwt();
        return <Redirect to='/Products' />
    }

}

export default NavBar;