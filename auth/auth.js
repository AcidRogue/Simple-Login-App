var user = require("../user/user");

module.exports.isAuthorized  = function(req, res, next) {
    if(user.isLoggedIn){
        return next();
    }
    else{
        return res.redirect("/login.hbs");
    }
};

module.exports.isAuthorized2 = function (req, res, next) {
    if(user.isLoggedIn){
        return res.redirect("/dashboard.hbs");
    }
    else{
        next();
    }
};