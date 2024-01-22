const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[4,"Name should have more than 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 character"],
        select:false,
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
});

// inside arrow function we can not used this keyword so we used simple function
userSchema.pre("save",async function (next){
    // Check if the "password" field has been modified during the current save operation
if (!this.isModified("password")) {
    // If the password is not modified, move to the next middleware in the stack
    // This helps avoid unnecessary hashing and database updates when the password hasn't changed
    next();
  }
  
    this.password = await bcrypt.hash(this.password,10)
});

// JWt token
userSchema.methods.getJWTTokened = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETE,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
userSchema.methods.comparePassword = async function(enterePassword){
    return await bcrypt.compare(enterePassword,this.password);
};

// Generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")                     //this is an algorathm for creating hash
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model("users",userSchema);