var express = require('express');
var router = express.Router();
var afterLoginRouter = require('./afterlogin');
var indexRouter = require('./index');
var loginRouter = require('./login');
var registerRouter = require('./register');

router.use('/afterLogin.html', afterLoginRouter);
router.use('/login.html', loginRouter);
router.use('/', indexRouter);
router.use('/register.html', registerRouter);

module.exports = router;

