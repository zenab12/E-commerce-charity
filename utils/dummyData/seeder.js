const fs = require('fs');
const dotenv=require('dotenv');
const productModel=require('../models/productModel');
const dbConnection=require('../config/dbconnection');


dotenv.config({path:'./config/config.env'});

//connect db
dbConnection();

//read data 
const products= JSON.parse(fs.appendFileSync('./products.json', 'utf8'));


//insert data into db
const insertData=async()=>{
try{
await productModel.create(products);
console.log('Data inserted successfully'.green.inverse);
proccess.exit();
}
catch(err){
console.log(err);
}
};

//delete data from db
const deletetData=async()=>{

    try{
    await productModel.deleteMany();
    console.log('Data deleted successfully'.red.inverse);
    proccess.exit();
    }
    catch(err){
    console.log(err);
    }

};


///node seeder.js 
if(process.argv[2] === '-i'){
    insertData();
}
else if(process.argv[2] === '-d'){
    deletetData();
}