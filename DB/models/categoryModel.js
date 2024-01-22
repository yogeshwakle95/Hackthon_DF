const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
    },
    
    description:{
        type:String,
        required:[true,"please upload product image"],
    },
    status:{
        type:String,
        // required:[true,"please enter product stock"],
        default:"Inactive",
    }
})

module.exports = mongoose.model("category",categorySchema);