var express = require('express');
var router = express.Router();
var afterLoginRouter = require('./afterLoginController');
var indexRouter = require('./indexController');
var loginRouter = require('./loginController');
var registerRouter = require('./registerController');

router.use('/afterLogin.html', afterLoginRouter);
router.use('/login.html', loginRouter);
router.use('/', indexRouter);
router.use('/register.html', registerRouter);

module.exports = router;

