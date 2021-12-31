import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateWebToken } from '../utils/generateWebtoken.js';

//@desc authenticate the user and get token
//@route post /api/users/login
//@access public


const userAuth = asyncHandler( async (req, res) => {
     const { email, password} = req.body;

     const user = await User.findOne({email});

     if(user && await user.matchPassword(password)) {
         res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             token: generateWebToken(user._id)
         })
     } else {
         res.status(401);
         throw new Error('Invalid Credentials')
     }
    
});


//@desc Register a new user
//@route post /api/users
//@access public


const registerUser = asyncHandler( async (req, res) => {
     const { name, email,  password} = req.body;

     const userExists = await User.findOne({email});

     if(userExists) {
         res.status(400);
         throw new Error('User already exists')
     }
     const user = await User.create({
         name,
         email,
         password
     })
     if(user) {
        res.status(201).json({
            _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             token: generateWebToken(user._id)
        })
     } else {

        res.status(400)
        throw new Error('invalid user data')
     }
    
});


//@desc get user profile
//@route post /api/users/profile
//@access private


const getUserProfile = asyncHandler( async (req, res) => {
  
    let user  =  await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('user not found ');
    }
   
})


//@desc Update user profile
//@route Put /api/users/profile
//@access private


const updateUserProfile = asyncHandler( async (req, res) => {
  
    let user  =  await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateWebToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('user not found ');
    }
   
})

export { userAuth, registerUser, getUserProfile, updateUserProfile }