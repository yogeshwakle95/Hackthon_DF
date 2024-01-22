const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const {registerUser,loginUser,logOut,forgotPassword,resetPassword, isLoggedIn} = require('../controllers/userController')

router.route('/register').post(registerUser);
router.route('/islogin').get(isLoggedIn);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset:token').put(resetPassword);

module.exports = router; 