import React from 'react';
import { Card, Button, Container, Col, Row, Modal} from 'react-bootstrap';
import NavBar from './Navigation';
import './products.css'
import {getUser, getCart} from '../helpers/LocalStorageHelper'

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
        
        // get productid and array index
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

        // update value of array by id
        this.showModal(`cart updated :)`);

        // const user_id = '1' // in future this one should be jwt token
        // fetch(`/cart/${user_id}/${ID}/${isAdd}`, {
        //     method: 'PUT',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user_id: this.user_id,
        //         id: ID,
        //         isAdd: isAdd,
        //     }),
        // });
        // this.showModal(`cart updated :)`);
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

            <Container fluid='true'>
                <NavBar/>
                <h1>Shopping Cart</h1>
                <Row>
                    <Col>
                        {cart ? (
                            cart.map(item => (
                                    <Card className='card' key={item.ID}>
                                        {/* <img variant="top" src={item.IMAGE_URL} alt="no thumbnail" rounded="true" width="64px" height="64px"/> */}
                                        <Card.Body>
                                            <Col>
                                                <Card.Title>{item.NAME}</Card.Title>
                                                <Card.Text>Rp {item.PRICE} / {item.UNIT}</Card.Text>
                                                <Card.Text>QTY : {item.QUANTITY}</Card.Text>
                                            </Col>
                                            <Col>
                                                <Button className='btn btn-danger btn-circle' onClick={()=>this.updateQty(item.ID, 0)}> - </Button>
                                                <Button className='btn btn-success btn-circle' onClick={()=>this.updateQty(item.ID, 1)}> + </Button>
                                            </Col>
                                        </Card.Body>
                                    </Card>
                            ))
                        ):(<div>Loading...</div>)
                        }
                    </Col>
                </Row>
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