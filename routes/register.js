var express = require('express');
var router = express.Router();
var db = require("../database/connection");
var bcrypt = require("bcrypt");

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
            return;
        }

        if (!usernameIsValid(username) || !emailIsValid(email) || !passwordIsValid(password) || !passwordsMatch(password, repeatPassword)) {
            if (!usernameIsValid(username)) {
                errors.push({error: "Username cannot contain special characters"});
            }
            if (!emailIsValid(email)) {
                errors.push({error: "Invalid email"});
            }
            if (!passwordIsValid(password)) {
                errors.push({error: "Password must be between 3 and 30 characters long"});
            }
            if (!passwordsMatch(password, repeatPassword)) {
                errors.push({error: "Passwords must match"});
            }
            res.render("register", {errors: errors});
            return;
        }

        let hash = bcrypt.hashSync(password, 10);

        db.connection.getConnection(function (err, connection) {
            if (err) {
                console.log("Error has occurred.")
            } else {
                connection.query(`INSERT INTO \`users\`( \`username\`, \`email\`, \`password\`) VALUES ("${username}","${email}","${hash}")`, function (err, rows, fields) {
                    if (err) {
                        errors.push({error: "Username or email already in use"});
                        res.render("register", {errors:errors});
                        return;
                    }
                    else {
                        res.redirect("login.hbs");
                    }
                });
                connection.release();
            }
        });
    }
);

function usernameIsValid(username) {
    if (/[^A-Za-z0-9_]+/g.test(username)) {
        return false;
    }
    return true;
}

function emailIsValid(email) {
    if (/^[^@]+@[^@]+\.[^@]+$/g.test(email)) {
        return true;
    }
    return false;
}

function passwordIsValid(password) {
    if (password.length >= 3 && password.length <= 30) {
        return true;
    }
    return false;
}

function passwordsMatch(password1, password2) {
    return password1 === password2;
}


module.exports = router;