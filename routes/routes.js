var express = require('express');

var router = express.Router();
var dashboardRouter = require('./dashboard');
var indexRouter = require('./index');
var loginRouter = require('./login');
var registerRouter = require('./register');

router.use('/dashboard.hbs', dashboardRouter);
router.use('/login.hbs', loginRouter);
router.use('/', indexRouter);
router.use('/register.hbs', registerRouter);

module.exports = router;

