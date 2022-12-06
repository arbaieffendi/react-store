import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import NavBar from './Navigation';
import {getUser, getJwt} from '../helpers/LocalStorageHelper';

class MyOrders extends React.Component {

    constructor(props){
        super(props);
        // this.state = {
        //     cart: []
        // }
        this.user = undefined;
        this.cart = [];
    }

    componentDidMount(){
        console.log('MyOrders');
        const user = JSON.parse(getUser());
        console.log(user.id);
        this.loadMyOrders(user.id);
    }

    loadMyOrders = (id) => {
        console.log('loadMyOrders');
        const url = `/cart/${id}`;
        fetch(url,{
            headers: {
                        Authorization : `Bearer ${getJwt()}`
                    },
        })
        .then(response => response.json())
        .then(data => {
            this.cart = data.values;
            console.log(this.cart);
        }).catch(error => {
            console.log(error);
        });
    }
    
    render(){
        const cart = this.cart;
        
        return (
                <Container>
                    <NavBar/>
                    <h1 style={{paddingBottom:20}}>My Orders</h1>
                    <Row className="justify-content-md-center flex-container">
                        <Col style={{fontWeight:"bold"}}>Order ID</Col>
                        <Col style={{fontWeight:"bold"}}>Order Date</Col>
                        <Col style={{fontWeight:"bold"}}>Status</Col>
                        <Col style={{fontWeight:"bold"}}>Total Belanja</Col>
                    </Row>
                        {cart ? (
                            cart.map(item => (
                                <Row key={item.ID}>
                                    <Col> here {item.ID}</Col>
                                    <Col> here {item.CREATEDATE}</Col>
                                    <Col> here {item.STATUS}</Col>
                                    <Col> here {item.TOTAL}</Col>
                                </Row>
                        ))
                        ):(<div>Loading...</div>)
                    }

                        {/* <Col> here </Col>
                        <Col> here </Col>
                        <Col> here </Col>
                        <Col> here </Col> */}

                </Container>
        );
    }
}

export default MyOrders;