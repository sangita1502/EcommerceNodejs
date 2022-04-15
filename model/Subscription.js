const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        
        email: {
            type: String,
            required: true,
        },
        
    });
const Subscription = mongoose.model("subscription", schema);
module.exports = Subscription;