import React from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { getJwt, destroyJwt } from '../helpers/LocalStorageHelper';

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
            fetch('/auth/getUser', {
                method: 'POST',
                headers: { Authorization: `Bearer ${jwt}` } },
                ).then((response) => {
                    response.json().then((data) => {
                    this.setState({
                        user: data.authData.user
                    });
                    localStorage.setItem('user', JSON.stringify(data.authData.user));
                }).catch((error) => {
                    return console.log(error);
                })
            })
        } else {
            console.log('token is not available');
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
                    <NavDropdown.Item>
                        <Navbar.Text>Profile</Navbar.Text>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

    // should not be call as function, otherwise it would always fired everytime page is refresh
    onLogout = () => {
        destroyJwt();
        localStorage.clear();
        window.location.reload();
    }

}

export default withRouter(NavBar);