import React from 'react';
import {withRouter} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { getJwt, clearLocalStorage, getUser } from '../helpers/LocalStorageHelper';
import {FiShoppingCart} from 'react-icons/fi';
import {GiFruitBowl} from 'react-icons/gi';

class NavBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            user: undefined,
        };
    }

    componentDidMount(){
        const jwt = getJwt();
        const users = JSON.parse(getUser());
        if (jwt) {
            this.setState({
                user: users
            });
        } else {
            // this.props.history.push('/products');
            console.log('token is not available');
        }
    }

    // getUser(jwt){
    //     fetch('/auth/getUser', {
    //       method: 'POST',
    //       headers: { Authorization: `Bearer ${jwt}` } },
    //       ).then((response) => {
    //           response.json().then((data) => {
    //           console.log(data.authData.user);
    //           localStorage.setItem('user', JSON.stringify(data.authData.user));
    //           this.setState({
    //               user: data.authData.user
    //           })
    //       }).catch((error) => {
    //           console.log(error);
    //           clearLocalStorage();
    //           // window.location.reload();
    //       })
    //   }) 
    //   }

    render(){
        return (
            <Navbar>
                <Navbar.Brand href="/">Simple Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav className="mr-auto">
                    <Nav.Link href="/products"><GiFruitBowl/> Products</Nav.Link>
                    <Nav.Link href="/cart"><FiShoppingCart/> Cart</Nav.Link>
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
                    <NavDropdown.Item onClick={this.orderOnClick}>My Order</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logoutOnClick}>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

    // should not be call as function, otherwise it would always fired everytime page is refresh
    logoutOnClick = () => {
        clearLocalStorage();
        window.location.reload();
    }

}

export default withRouter(NavBar);