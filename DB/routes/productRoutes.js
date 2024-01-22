const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productController");

router.route("/").get(getAllProducts);
router
  .route("/admin")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProducts);
router
  .route("/admin/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProducts);

module.exports = router;
