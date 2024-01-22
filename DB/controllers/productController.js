const Product = require("../models/productModel");
const cloudinary = require('cloudinary').v2;
const moment = require('moment');
const multer = require('multer');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret
})

const imgconfig = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,'./uploads')
  },
  filename:(req,file,callback)=>{
      callback(null,`image-${Date.now()}.${file.originalname}`)
  }
});

// img filter
const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
          callback(null,true)
  }else{
      callback(new Error("Only image is allowed"))
  }
}

const upload = multer({
  storage:imgconfig,
  fileFilter:isImage
}).single('photo');


const createProducts = [upload, catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  // Ensure that req.file is defined before accessing its properties
  if (!req.file || !req.file.path) {
      return next(new ErrorHandler("Image file not provided", 400));
  }

  try {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      // console.log("uploaded Image: ",uploadedImage);
      const { name, packSize, category, mrp, status } = req.body;
      const productData = new Product({
          name: name,
          image: uploadedImage.secure_url,
          packSize: packSize,
          category: category,
          mrp: mrp,
          status: status
      });
      const product = await productData.save();

      res.status(201).json({
          success: true,
          product,
      });
  } catch (error) {
    console.log(error);
      // Handle any errors that might occur during the upload or product save
      return next(new ErrorHandler("Internal Server Error", 500));
  }
})];


  const getAllProducts = catchAsyncError(async (req, res, next) => {
    // const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
    const products = await apiFeatures.query;
    res.status(201).json( products);
  });
  
  const updateProducts = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(201).json({ sucess: true, product });
  });
  
  const deleteProducts = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    let productId = req.params.id;
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    await Product.findByIdAndDelete(productId);
    res
      .status(201)
      .json({ success: true, message: "Product deleted successfully" });
  });

  module.exports = {createProducts,getAllProducts,updateProducts,deleteProducts,upload}