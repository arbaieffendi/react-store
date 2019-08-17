import React from 'react';
import { Card, Button, Container, Row, Modal} from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../assets/css/products.css';
import NavBar from './Navigation';
import {getCart} from '../helpers/LocalStorageHelper';

class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            offset: 0,
            limit: 4,
            modal:false
        }
        this.cart = [];
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = () => {
        const {products, offset, limit} = this.state;
        fetch(`/product/${offset}/${limit}`)
        .then(res => res.json())
        .then(json => this.setState({
            // products: json.values
            products: [...products, ...json.values]
        }))
    }

    loadMore = () => {
        this.setState( prevState => ({
            offset: prevState.offset + prevState.limit,
        }), this.loadProducts)
    }

    addToCart = (item) => {
        console.log('product');
        console.log(item);
        let cartString = getCart();
        if(!cartString){
            console.log(this.cart);
            console.log('create cart');
            let product = {
                ID: item.ID,
                PRICE: item.PRICE,
                NAME: item.NAME,
                QUANTITY: 1,
                modifyAt: Date.now()
            }
            this.cart.push(product);
            console.log(this.cart);
        } else {
            this.cart = JSON.parse(cartString);
            console.log('add to cart');
            //need to implement some validation here
            let product = {
                ID: item.ID,
                PRICE: item.PRICE,
                NAME: item.NAME,
                QUANTITY: 1,
                modifyAt: Date.now()
            };
            
            this.cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // console.log('product_id : ' + product_id)
        // // const user_id = '1' // in future this one should be jwt token
        // fetch('/cart', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user_id: this.user_id,
        //         product_id: this.product_id,
        //     }),
        // });
        this.showModal(`${item.NAME} added to cart :)`);
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
        const {products, modal, message} = this.state;

        return(
            <Container fluid='true'>
                <NavBar/>
                <h1>Product List</h1>
                <Row>
                    {products ? (
                        products.map(item => (
                                <Card className='card' key={item.ID}>
                                    <Card.Img variant="top" src={item.IMAGE_URL} alt='No Image' rounded="true"/>
                                    <Card.Body>
                                        <Card.Title>{item.NAME}</Card.Title>
                                        <Card.Text>Rp {item.PRICE} / {item.UNIT}</Card.Text>
                                    </Card.Body>
                                    {/* <Button variant="danger" onClick={()=>this.addToCart(item.ID, item.NAME)}>Add to cart</Button> */}
                                    <Button variant="danger" onClick={()=>this.addToCart(item)}>Add to cart</Button>
                                </Card>
                        ))
                    ):(<div>Loading...</div>)
                    }
                </Row>
                <Row>
                    <Button className='btn btn-default btn-lg btn-block' onClick={this.loadMore}>Load More</Button>
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

export default Products;