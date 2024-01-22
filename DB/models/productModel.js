const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:[true,"Please enter product name"],
        trim:true,
    },
    packSize:{
        type:String,
        // required:[true,"Please enter the packsize"],
    },
    category:{
        type: String,
            // ref: "category",
            // required: true,
    },
    mrp:{ 
        type:Number,
        // required:[true,"Please enter price"],
    },
    image:{
        type:String,
        // required:[true,"please upload product image"],
    },
    status:{
        type:String,
        // required:[true,"please enter product stock"],
        default:"true",
    }
    
})

module.exports = mongoose.model("products",productSchema);