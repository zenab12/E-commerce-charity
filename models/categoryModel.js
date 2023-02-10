const mongoose=require('mongoose');

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,'category is required'],
        unique:[true,'Brand must be unique'],
        minlength:[3,'category title should be more than 3 characters '],
        maxlength:[30,'category title should be more than 30 characters ']
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String,
}
,{timestamps:true}
);

const categoryModel =mongoose.model('Category',categorySchema);

module.exports=categoryModel;