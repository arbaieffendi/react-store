import React from 'react';
import { Card, Button, Container, Col, Row, Modal} from 'react-bootstrap';
import NavBar from './Navigation';
import './products.css'

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart: null,
            modal:false,
        }        
        
        // this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount(){
        const url = `/cart/1`;
        fetch(url)
        .then(res => res.json())
        .then(json => this.setState({
            cart: json.values
        }))
    }

    updateQty = (ID, isAdd) => {
        const user_id = '1' // in future this one should be jwt token
        fetch(`/cart/${user_id}/${ID}/${isAdd}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.user_id,
                id: ID,
                isAdd: isAdd,
            }),
        });
        this.showModal(`cart updated :)`);
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
        const {cart, modal, message} = this.state;

        return(
            <Container fluid='true'>
                <NavBar/>
                <h1>Shopping Cart</h1>
                <Row>
                    <Col>
                        {cart ? (
                            cart.map(item => (
                                    <Card className='card' key={item.ID}>
                                        <img variant="top" src={item.IMAGE_URL} alt="no thumbnail" rounded="true" width="64px" height="64px"/>
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