import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userupdateProfileReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';

const reducers = combineReducers({
    ProductList: productListReducer,
    ProductDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    UpdateuserProfile: userupdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}


const initialState = {
   cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
   userInfo: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;