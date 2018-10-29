var express = require('express');
var router = express.Router();
var db = require("../database/connection");
var bcrypt = require("bcrypt");

router.get("/", function get(req, res) {
    res.render("login");
});
router.post("/", function post(req, res) {
        let args = req.body;
        let usernameOrEmail = args.username_email;
        let password = args.password;

        let errors = [];

        if (usernameOrEmail === "" || password === "") {
            if (usernameOrEmail === "") {
                errors.push({error: "Please enter a username"});
            }
            if (password === "") {
                errors.push({error: "Please enter a password"});
            }
            res.render("login", {errors: errors});
        }

        let toCheck = "";

        if (usernameOrEmail.includes('@')) {
            toCheck = "\`email\`";
        }
        else {
            toCheck = "\`username\`";
        }

        db.connection.getConnection(function (err, connection) {
            if (err) {
                console.log("Error has occurred.")
            } else {
                connection.query(`SELECT * FROM users WHERE ${toCheck} = "${usernameOrEmail}"`, function (err, rows, fields) {
                    if (err) {
                        console.log("Error has occurred.")
                    }
                    else {
                        if (rows.length > 0) {
                            let hashedPassword = rows[0].password;
                            if (bcrypt.compareSync(password, hashedPassword)) {
                                console.log("aaa");
                                res.redirect("dashboard.hbs");
                            }
                            else {
                                errors.push({error: "Wrong username or password"});
                                res.render("login", {errors: errors});
                            }
                        }
                        else {
                            errors.push({error: "Username or email not found"});
                            res.render("login", {errors: errors});
                        }
                    }
                });
                connection.release();
            }
        });
    }
);


module.exports = router;