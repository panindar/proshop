import React, {  useState  } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'; 
import CheckOutSteps from '../components/CheckOutSteps'; 
import { saveShippingAddress } from '../actions/cartActions';


const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalcode, country}));
        history.push('/payment');
    }
    return  <FormContainer>
            <CheckOutSteps step1 step2/>
            <h1> Shipping </h1>
            <Form onSubmit = {submitHandler} >
            <Form.Group controlId = 'address'>
                    <Form.Label> Address</Form.Label>
                    <Form.Control type="text"
                     placeholder="enter your address "
                      value={address}
                       required
                       onChange={e => setAddress(e.target.value)
                       }>
                       </Form.Control>
                </Form.Group>
                <Form.Group controlId = 'city'>
                    <Form.Label> City</Form.Label>
                    <Form.Control type="text"
                     placeholder="enter your city "
                      value={city}
                       required
                       onChange={e => setCity(e.target.value)
                       }>
                       </Form.Control>
                </Form.Group>
                <Form.Group controlId = 'postalcode'>
                    <Form.Label> postalcode</Form.Label>
                    <Form.Control type="text"
                     placeholder="enter your postalcode "
                      value={postalcode}
                       required
                       onChange={e => setPostalCode(e.target.value)
                       }>
                       </Form.Control>
                </Form.Group>
                <Form.Group controlId = 'country'>
                    <Form.Label> country</Form.Label>
                    <Form.Control type="text"
                     placeholder="enter your country "
                      value={country}
                       required
                       onChange={e => setCountry(e.target.value)
                       }>
                       </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    
}

export default ShippingScreen
