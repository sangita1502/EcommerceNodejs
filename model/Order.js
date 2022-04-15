const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        orderdate: {
            type: Date,
            required: true
        },
        sizes: {
            type: Array
        },
        colors: {
            type: Array
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobileno: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        shipping: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        
        imagepath:{
            type:String,
            required:true
        }

    })
const Order = mongoose.model("order", schema);
module.exports = Order;