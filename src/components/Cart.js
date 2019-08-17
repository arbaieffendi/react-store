import React from 'react';
import { Card, Button, Container, Col, Row, Modal, Image} from 'react-bootstrap';
import NavBar from './Navigation';
import '../assets/css/cart.css'
import {getUser, getCart, getJwt} from '../helpers/LocalStorageHelper';

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false
        };
        this.cart = []
    }

    componentWillMount(){
        const user = JSON.parse(getUser());
        console.log(user);

        if (user === undefined || user === null){
            return;
        }
        
        let cartTemp = [];
        cartTemp = JSON.parse(getCart());
        if (cartTemp) {
            this.cart = cartTemp.slice(0);
        }
    }

    queryCartFromDB = () => {
        const url = `/cart/${this.state.user.id}`;
        fetch(url)
        .then(res => res.json())
        .then(json => this.setState({
            cart: json.values
        }))
    }

    updateQty = (ID, isAdd) => {
        this.cart = JSON.parse(getCart());
        let product = this.cart.filter(item => item.ID === ID);
        let index = this.cart.findIndex(item => item.ID === ID);

        product[0].QUANTITY = (isAdd) ? product[0].QUANTITY+1 : product[0].QUANTITY-1;

        console.log(product[0]);
        if (product[0].QUANTITY < 1) {
            this.cart.splice(index, 1);
        } else {
            this.cart[index] = product[0];
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        console.log(this.cart);

        this.showModal(`cart updated :)`);
    }
    
    calculateSummary = () => {
        let total = 0;
        for (let i = 0; i < this.cart.length; i++){
            total = total + ( this.cart[i].QUANTITY * this.cart[i].PRICE);
        }
        return total;
    }

    checkOut = () => {
        fetch(`/cart/checkout`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : `Bearer ${getJwt()}`
            },
            body: JSON.stringify(this.cart),
        }).then( (req, res) => {
            console.log(req);
            console.log(res);
            this.showModal(`Check My Order :)`)
        }
        ).catch( (error) =>
            this.showModal(error)
        );
    }

    showModal = (msg) =>{
        if (this.state.modal === false)
            this.setState({
                message: msg,
                modal: true,
            })
        else
            this.setState({
            modal: false,
        })
    }

    render(){
        const {modal, message} = this.state;
        const cart = this.cart;

        return(

            <Container>
                <NavBar/>
                <h1 style={{paddingBottom:20}}>Shopping Cart</h1>
                <Container className="flex-container" >
                <Row className="justify-content-md-center flex-container">
                    <Col>
                        {cart ? (
                            cart.map(item => (
                                    <Container key={item.ID}>
                                        <Row >
                                            <Col sm={2}>
                                                <Image variant="top" src={item.IMAGE_URL} rounded="true" data-src="holder.js/64x64" />
                                            </Col>
                                            <Col sm={7} className='panel-body'>
                                                <Card.Title>{item.NAME}</Card.Title>
                                                <Card.Text>Rp {item.PRICE} / {item.UNIT}</Card.Text>
                                            </Col>
                                            <Col sm={3} className="row flex-nowrap">
                                                <Button className='btn btn-danger rounded-circle btn-circle' style={{padding: 0}} onClick={()=>this.updateQty(item.ID, 0)}> - </Button>
                                                <Card.Text style={{padding:3}}>{item.QUANTITY}</Card.Text>
                                                <Button className='btn btn-success rounded-circle btn-circle' style={{padding: 0}} onClick={()=>this.updateQty(item.ID, 1)}> + </Button>
                                            </Col>
                                        </Row>
                                        <hr/>
                                    </Container>
                            ))
                        ):(<div>Loading...</div>)
                        }
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                            <Col>
                                <Card.Title>Total</Card.Title>
                                <h4>Rp {this.calculateSummary()}</h4>
                                <hr/>
                                <Button className='btn btn-danger'onClick={this.checkOut}>Check Out</Button>
                            </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>
                <Modal show={modal} size='sm'>
                    {/* <Modal.Header closeButton onClick={this.showModal}></Modal.Header> */}
                    <Modal.Body>
                        <p>{message}</p>
                        <Button className="btn btn-block" onClick={this.showModal}>Ok</Button>
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
}

export default Cart;