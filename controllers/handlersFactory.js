const asyncHandler = require("express-async-handler");
const { listeners } = require("../models/productModel");
const ApiError = require("../utils/ApiError");

const ApiFeature = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      res.status(404).json({ msg: `No document For the is id : ${id} ` });
    }
    res.status(204).json({ msg: "deleted successfully" });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      res.status(404).json({ msg: `No document For the is id : ${id} ` });
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document For the is id :${id}`, 404));
    }
    res.status(200).json({ data: document });
  });


exports.getAll = (Model,modelName ='') => 
asyncHandler (async(req, res) => {
   let filter ={};
   if(req.filterObj){
    filter=req.filterObj;
   }

//3)build query
  const documentCount= await Model.countDocuments();
   const apiFeatures=new  ApiFeature(Model.find(filter),req.query)
      .filter()
      .sort()
      .search(modelName)
      .pagenation(documentCount)
      .limitFields()

    
    //execute query
    const {mongooseQuery,pagenationResult}=apiFeatures;
    const document= await apiFeatures.mongooseQuery;
    
    res.status(200).json({result:document.length,pagenationResult,data:document});

});
