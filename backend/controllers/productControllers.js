import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc fetch all products
//@route get /api/products
//@access public


const getProducts = asyncHandler( async (req, res) => {
    
    const products = await Product.find({});
    res.json(products)
})


//@desc fetch a product
//@route get /api/product
//@access public


const getProductById = asyncHandler( async (req, res) => {
    
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({msg: ' Product not found'});
    }
});

export {
    getProducts,
    getProductById
}