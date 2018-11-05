var express = require('express');
var router = express.Router();
var auth = require("../auth/auth");

router.get("/", auth.isAuthorized2, function (req, res) {
    res.render('index');
});

module.exports = router;