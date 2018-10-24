var express = require('express');
var router = express.Router();

router.get("/", function get(req, res) {
    res.render("register.html");
});
router.post("/", function post(req, res) {
    res.redirect('/');
});

module.exports = router;