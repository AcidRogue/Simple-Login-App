var express = require('express');
var router = express.Router();

router.get("/", function get(req, res) {
    res.render("register");
});
router.post("/", function post(req, res) {
        let args = req.body;

        let username = args.username;
        let email = args.email;
        let password = args.password;
        let repeatPassword = args.repeatPassword;

        let errors = [];

        if (username === "" || email === "" || password === "" || repeatPassword === "") {
            if (username === "") {
                errors.push({error: "Please enter a username"});
            }
            if (email === "") {
                errors.push({error: "Please enter an email"});
            }
            if (password === "") {
                errors.push({error: "Please enter a password"});
            }
            if (repeatPassword === "") {
                errors.push({error: "Please repeat your password"})
            }
            res.render("register", {errors: errors});
        }

        if(!usernameIsValid(username) || ){
            errors.push({error: "Username cannot contain special characters"});
        }
    }
);

function usernameIsValid(username){
    if(/[^A-Za-z0-9_]+/g.test(username)){
        return false;
    }
    return true;
}
function emailIsValid(email){
    
}

module.exports = router;