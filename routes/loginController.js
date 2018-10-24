var express = require('express');
var router = express.Router();
var db = require("../database/connection");

router.get("/", function get(req, res) {
    res.render("login.html");
});

router.post("/", function post(req, res) {
        let args = req.body;
        let usernameOrEmail = args.username_email;
        let password = args.password;

        let toCheck = "";

        if(usernameOrEmail.includes('@')){
            toCheck = "\`email\`";
        }
        else{
            toCheck = "\`username\`";
        }

        db.connection.getConnection(function(err, connection) {
            if (err) {
                console.log("Error has occurred.")
            } else {
                connection.query(`SELECT * FROM users WHERE ${toCheck} = "${usernameOrEmail}" and \`password\` = "${password}"`, function(err, rows, fields) {
                    if (err) {
                        console.log("Error has occurred.")
                    } else {
                        console.log(rows);
                        if(rows.length > 0){
                            res.redirect("afterlogin.html")
                        }
                    }
                });
                connection.release();
            }
        });
    }
);


module.exports = router;