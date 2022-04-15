const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
      name:{
          type:String,
          required:true
      },
      description:{
        type:String,
        required:true
    } ,
    sizes:{
        type:Array
    }  ,
    colors:{
        type:Array
    }  ,
    mrp:{
        type:Number,
        required:true
    } ,
    price:{
        type:Number,
        required:true
    }  ,
    instock:{
        type:String,
        required:true
    } ,
    status:{
        type:String,
        required:true
    }  ,
    sku:{
        type:String,
        required:true
    }  ,
    imagepath:{
        type:String
    } 
})
const Product = mongoose.model("products", schema);
module.exports = Product;