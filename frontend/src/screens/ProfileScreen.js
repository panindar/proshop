import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector} from 'react-redux'


import {Row, Col, Button, Form } from 'react-bootstrap';


import Loader from '../components/Loader';
import Message from '../components/Message';

import { getUserDetalis, updateUserProfile } from '../actions/userActions';


const ProfileScreen = ({ history }) => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const UpdateuserProfile = useSelector(state => state.UpdateuserProfile);
    const { success } = UpdateuserProfile;


    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else if(!user.name) {
            dispatch(getUserDetalis('profile'))
        }else {
            setName(user.name)
            setEmail(user.email)
        }
    },[dispatch, history, userInfo, user]);


    const onSubmitHandler = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setMessage('please provide the detalis');
        } else if(password !== confirmpassword) {
            setMessage('passwords do not match');
        }  else {
           dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
       
    }

    

    return <Row>
            <Col md={3}>
            <h2> User profile </h2>
            {message && <Message variant = "danger" > { message }</Message>}
            {error && <Message variant = "danger" > { error }</Message>}
            {success && <Message variant = "success" > Profile Updated</Message>}
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
                <Button type="submit" varient="primary"> Update </Button>
            </Form>
            </Col>
            <Col md={9} >
                My orders
            </Col>
    </Row>
        
    
}

export default ProfileScreen
