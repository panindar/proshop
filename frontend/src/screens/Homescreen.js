import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Row , Col} from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Homescreen = () => {

    const dispatch = useDispatch();

    const ProductList = useSelector(state => state.ProductList );

    const { loading, error, products } = ProductList

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

   

    return (
        <>
        <h1> Latest Products </h1>
        {loading ? <Loader /> : error ? <Message variant='danger' >{ error}</Message> :    <Row>
         {products.map(product => (
             <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
              <Product product={product} />
             </Col>
         ))}
         </Row>}
        
        
            
        </>
    )
}

export default Homescreen
