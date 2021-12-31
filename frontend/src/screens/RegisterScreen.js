import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

import {Row, Col, Button, Form } from 'react-bootstrap';


import Loader from '../components/Loader';
import Message from '../components/Message';

import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { loading, error, userInfo } = userRegister;

  

    const redirect = location.search ? location.search.split('=')[1]: '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect]);


    const onSubmitHandler = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setMessage('please provide the detalis');
        } else if(password !== confirmpassword) {
            setMessage('passwords do not match');
        }  else {
            dispatch(register(name, email, password))
        }
       
    }

    return (
        <FormContainer>
            <h1> Sign-In </h1>
            {message && <Message variant = "danger" > { message }</Message>}
            {error && <Message variant = "danger" > { error }</Message>}
            {loading && <Loader />}
            <Form onSubmit = {onSubmitHandler}>
                <Form.Group controlId = 'name'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control type="name" placeholder="enter your name " value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'email'>
                    <Form.Label> Email Address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="enter your email address" onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'password'>
                    <Form.Label> Password</Form.Label>
                    <Form.Control type="password"value={password} placeholder="enter your password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'confirmpassword'>
                    <Form.Label> confirmpassword</Form.Label>
                    <Form.Control type="password" value={confirmpassword} placeholder="please confirm password" onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" varient="primary"> Register </Button>
            </Form>
            <Row className="py-3">
                <Col>
                 Have an account ?  <Link to={redirect ? `/login/redirect=${redirect}` : '/login'}> Login </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
