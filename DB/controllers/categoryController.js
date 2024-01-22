const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

const createCategory = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const category = await Category.create(req.body);
    // console.log(req.body.name);
  
    res.status(201).json({
      sucess: true,
      category,
    });
  });

  const getAllCategory = catchAsyncError(async (req, res, next) => {
    // const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Category.find(), req.query)
      .search()
    const categorys = await apiFeatures.query;
    res.status(201).json( categorys);
  });


  const updateCategory = catchAsyncError(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("category not found", 404));
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(201).json({ sucess: true, category });
  });

  const deleteCategorys = catchAsyncError(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    let categoryId = req.params.id;
    if (!category) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    await Category.findByIdAndDelete(categoryId);
    res
      .status(201)
      .json({ success: true, message: "Product deleted successfully" });
  });

  module.exports ={
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategorys

  }