const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler')
const productModel = require('../models/productModel');

//All products
exports.getproducts = asyncHandler (async(req, res) => {
    // pagenation
    const page =req.query.page * 1 || 1;
    const limit=req.query.limit*1 ;
    const skip=(page-1)*limit;
                                                   // attach pagenation
    const products = await productModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result:products.length, page, data:products});
});

//product By ID
exports.getProduct= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const product = await productModel.find(id);
    if(!product){
        res.status(404).json({msg:`No Product For the is id : ${id} `})
    }
    res.status(200).json({data:product});
})

//Create Product 
exports.createProduct = asyncHandler(async (req, res) => {
   req.body.slug=slugify(req.body.title);
        const product = await productModel.create(req.body);
        res.status(201).json({ data: product });
});

// Updateb Product
exports.updateProduct= asyncHandler (async(req,res)=>{
    const {id}=req.params;
    req.body.slug=slugify(req.body.title);

    const product= await productModel.findByOneAndUpdate(
        {_id:id},
        req.body,
        {new:true}
        );

    if(!product){
        res.status(404).json({msg:`No Product For the is id : ${id} `})
    }
    res.status(200).json({data:product});
});

//Delete Product
exports.deteleProduct= asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if(!product){
        res.status(404).json({msg:`No Product For the is id : ${id} `})
    }
    res.status(204).send();
});
