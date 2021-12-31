import React, {  useEffect } from 'react';
import {Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { Button, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import CheckOutSteps from '../components/CheckOutSteps'; 
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';


const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    //calculations 
    cart.itmesPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0 );
    cart.ShippingPrice = cart.itmesPrice > 100 ? 0 : 100
    cart.taxPrice = Number((0.15 * cart.itmesPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itmesPrice) + Number(cart.ShippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;
    

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            
        }))
    }

   
    return (
        <>
        <CheckOutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
             <ListGroup varient = "flush">
                 <ListGroup.Item>
                     <h2> Shipping </h2>
                     <p>
                         <strong> Address:</strong>
                         {cart.shippingAddress.address},  {cart.shippingAddress.city},  {cart.shippingAddress.postalcode},{' '}  {cart.shippingAddress.country}
                     </p>
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <h2> Payment Method</h2>
                     <strong> Method </strong>
                     {cart.paymentMethod}
                 </ListGroup.Item>

                 <ListGroup.Item>
                     <h2> Order items</h2>
                     {cart.cartItems.length === 0 ? (
                         <Message> Your Cart is Empty </Message>
                     ) : (
                         <ListGroup variant="flush"> 
                         {cart.cartItems.map((item, index) => (
                             <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                      <Link to={`/product/${item.product}`} >
                                          {item.name}
                                      </Link>
                                    </Col>
                                    <Col>
                                    {item.qty} x $ {item.price} = $ {item.qty * item.price}
                                    </Col>
                                </Row>
                             </ListGroup.Item>
                         ))}
                         </ListGroup>
                     )}
                 </ListGroup.Item>
             </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                   <ListGroup varient="flush">
                       <ListGroup.Item>
                           <h2> Order Summary</h2>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col> Items </Col>
                               <Col> $ {cart.itmesPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col> Shipping </Col>
                               <Col> $ {cart.ShippingPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col> Tax </Col>
                               <Col> $ {cart.taxPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col> Total </Col>
                               <Col> $ {cart.totalPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item> 
                            {error && <Message variant ="danger"> {error} </Message>}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Button type="button" className="btn btn_block" disabled={cart.cartItems.length === 0} onClick = {placeOrderHandler}> Place Order</Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
        </Row>
            
        </>
    )
}

export default PlaceOrderScreen
