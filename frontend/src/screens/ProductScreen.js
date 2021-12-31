import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

import {Row, Col, Button, ListGroup, Image, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductScreen = ({history, match }) => {
    const [qty, setQty] = useState(1);

     const dispatch = useDispatch();

    const ProductDetails =  useSelector(state => state.ProductDetails);

    const addCartHandle = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    const  {loading, error, product} = ProductDetails;
    useEffect(() => {
        dispatch( listProductDetails(match.params.id));
    }, [dispatch, match ]);
   
    
    return (
        <>
            <Link className = "btn btn-light my-3" to='/'>
                back
            </Link>
            {loading ? <Loader /> : error ? <Message variant = 'danger'> { error }</Message> : ( 

<Row>
<Col md={6}>
<Image src={product.image} alt={product.name} fluid/>
</Col>
<Col md={3}>
    <ListGroup varient="flush">
        <ListGroup.Item>
            <h3> {product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </ListGroup.Item>
        <ListGroup.Item>
            price: $ {product.price}
        </ListGroup.Item>
        <ListGroup.Item>description: {product.description}</ListGroup.Item>
    </ListGroup>
</Col>
<Col md={3} >
    <ListGroup varient="flush">
        <ListGroup.Item>
            <Row>
                <Col >
                Price :
                </Col>
                <Col>
                <strong>
                 $ {product.price}
                  </strong>
                </Col>
            </Row>
        </ListGroup.Item> 
        <ListGroup.Item>
            <Row>
                <Col >
                Stock :
                </Col>
                <Col>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Col>
            </Row>
        </ListGroup.Item> 
        {product.countInStock > 0 && (
            <ListGroup.Item> 
                <Row>
                    <Col>qty</Col>
                    <Col>
                    <Form.Control as="select" value={qty} onChange={e => 
                        setQty(e.target.value)}>
                        {
                            [...Array(product.countInStock).keys()].map((x) => (
                                <option  key={ x+1 } value={ x+1 }> { x+1 } </option>
                            ))
                        }
                    </Form.Control>
                    </Col>
                </Row>
            </ListGroup.Item>
        )}
        <ListGroup.Item>
            <Button className=" btn-block" onClick={addCartHandle} type="button" disabled={product.countInStock === 0}> ADD to cart</Button>
        </ListGroup.Item>
    </ListGroup>

</Col>
</Row>

            ) }
            
        </>
    )
}

export default ProductScreen
