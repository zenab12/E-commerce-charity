
const asyncHandler = require('express-async-handler');
const { listeners } = require('../models/productModel');
const ApiError = require('../utils/ApiError');

const ApiFeature = require('../utils/apiFeatures');




exports.deleteOne = (Model) => 
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const document = await Model.findByIdAndDelete(id);

        if (!document) {
            res.status(404).json({ msg: `No document For the is id : ${id} ` })
        }
        res.status(204).send();
    });
    

exports.updateOne = (Model) => 
    asyncHandler(async (req, res) => {
        const document = await Model.findByOneAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!document) {
            res.status(404).json({ msg: `No document For the is id : ${id} ` })
        }
        res.status(200).json({ data: document });
    });


exports.createOne = (Model) => 
    asyncHandler(async (req, res) => {
        const document = await Model.create(req.body);
        res.status(201).json({ data: document });
});


exports.getOne = (Model) => 
    asyncHandler(async(req,res)=>{
        const {id}=req.params;
        const document = await Model.find(id);
        if(!document){
            return next(new ApiError(`No document For the is id :${id}`,404));
        }
        res.status(200).json({data:document});
    });


exports.getAll = (Model) => 
asyncHandler (async(req, res, next) => {
    //1)Filtering 


    //2)pagenation

//3)build query
   const apiFeatures=new  ApiFeatures(Model.find(),req.query)
      .filter()
      .sort()
      .search()
      .pagenation()
      .limitFields()

    
    //execute query
    const {mongooseQuery,pagenationResult}=apiFeatures;
    const document= await apiFeatures.mongooseQuery;
    
    res.status(200).json({result:document.length,pagenationResult,data:document});

});

