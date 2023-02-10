const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler')
const BrandModel = require('../models/brandModel');

//All Brands
exports.getBrands = asyncHandler (async(req, res) => {
    // pagenation
    const page =req.query.page * 1 || 1;
    const limit=req.query.limit*1 ;
    const skip=(page-1)*limit;
                                                   // attach pagenation
    const brands = await BrandModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result:brands.length, page, data:brands});
});

//Brand By ID
exports.getBrand= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const brand = await BrandModel.find(id);
    if(!brand){
        res.status(404).json({msg:`No Category For the is id : ${id} `})
    }
    res.status(200).json({data:brand});
})

//Create Brand 
exports.createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body.name;
        const brand = await BrandModel.create({ name, slug: slugify(name) });
        res.status(201).json({ data: brand });
});

// Update Brand
exports.updateBrand= asyncHandler (async(req,res)=>{
    const {id}=req.params;
    const {name} =req.body;

    const brand= await BrandModel.findByOneAndUpdate(
        {_id:id},
        {name,slug:slugify(name)},
        {new:true}
        );

    if(!brand){
        res.status(404).json({msg:`No Category For the is id : ${id} `})
    }
    res.status(200).json({data:brand});
});

//Delete Brand
exports.deteleBrand= asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const brand = await BrandModel.findByIdAndDelete(id);

    if(!brand){
        res.status(404).json({msg:`No Category For the is id : ${id} `})
    }
    res.status(204).send();
});
