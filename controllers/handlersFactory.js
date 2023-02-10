const asyncHandler = require('express-async-handler');
// const ApiError = require('express-async-handler');
// const apiFeature = require('express-async-handler');

exports.deleteOne = (Model) => 
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const document = await Model.findByIdAndDelete(id);

        if (!document) {
            res.status(404).json({ msg: `No document For the is id : ${id} ` })
        }
        res.status(204).send();
    });
    

exports.UpdateOne = (Model) => 
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
            res.status(404).json({msg:`No document For the is id : ${id} `})
        }
        res.status(200).json({data:document});
    });


exports.getAll = (Model) => 
asyncHandler (async(req, res) => {
    // pagenation
    const page =req.query.page * 1 || 1;
    const limit=req.query.limit*1 ;
    const skip=(page-1)*limit;
                                                   // attach pagenation
    const document = await Model.find({}).skip(skip).limit(limit);
    res.status(200).json({result:document.length, page, data:document});
});

    
