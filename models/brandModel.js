const mongoose=require('mongoose');

const brandSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Brand is required'],
        unique:[true,'Brand must be unique'],
        minlength:[3,'Brand title should be more than 3 characters '],
        maxlength:[30,'Brand title should be more than 30 characters ']
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String,
}
,{timestamps:true}
);

module.exports=mongoose.model('Brand',brandSchema);

