const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const {getAllCategory,
       createCategory,
       updateCategory,
       deleteCategorys
} = require('../controllers/categoryController');

router.route("/").get(getAllCategory);
router
  .route("/admin")
  .post(isAuthenticatedUser, authorizeRole("admin"), createCategory);
router
  .route("/admin/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCategorys);

module.exports = router;