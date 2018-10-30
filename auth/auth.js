var user = require("../user/user");

module.exports.isAuthorized  = function(req, res, next) {
    if(user.isLoggedIn){
        return next();
    }
    else{
        return res.redirect("/login.hbs");
    }
};