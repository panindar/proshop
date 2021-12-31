import React, {  useState  } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'; 
import CheckOutSteps from '../components/CheckOutSteps'; 
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();


    if(!shippingAddress) {
        history.push('/shipping');
    }
    

    const [paymentMethod, setPaymentMethod] = useState('paypal');
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }
    return  <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1> Payment Method </h1>
            <Form onSubmit = {submitHandler} >
                <Form.Group>
                    <Form.Label as="legend" > Select Method </Form.Label>
                
                 <Col>  
                    <Form.Check type='radio'
                     label="paypal or credit Card"
                     id="paypal"
                     name="paymentMethod"
                     value="paypal"
                     checked
                     onChange = {(e) => setPaymentMethod(e.target.value)}
                      > 
                      </Form.Check>
{/* 
                      <Form.Check type='radio'
                     label="Stripe"
                     id="Stripe"
                     name="payment Method"
                     value="Stripe"
                     checked
                     onChange = {(e) => setPaymentMethod(e.target.value)}
                      > 
                      </Form.Check> */}

                 </Col>
                 </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    
}

export default PaymentScreen
