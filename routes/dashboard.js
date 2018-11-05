var express = require('express');
var router = express.Router();
var user = require("../user/user");
var auth = require("../auth/auth");

router.get("/", auth.isAuthorized, function post(req, res) {
    res.render("dashboard", {user: user.username, isAdmin: user.isAdmin});
});
router.post("/", function post(req, res) {
    user.username = "";
    user.email = "";
    user.isLoggedIn = false;
    user.isAdmin = false;
    res.redirect("/");
});

module.exports = router;