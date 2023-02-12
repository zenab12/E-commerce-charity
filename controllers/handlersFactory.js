const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
// const ApiFeature = require('../utils/apiFeature');



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
    const queryStringObj={...req.query};
    const encludesFields=['page','sort','limit','fields'];
    encludesFields.forEach((field)=> delete queryStringObj[field]);

    //2)pagenation
    const page =req.query.page * 1 || 1;
    const limit=req.query.limit*1 ;
    const skip=(page-1)*limit;

    //3)build query
    const mongooseQuery = Model.find(queryStringObj)
    .skip(skip)
    .limit(limit);

    //4)execute query
    const products= await mongooseQuery;

    res.status(200).json({result:document.length, page, data:document});

});

    
