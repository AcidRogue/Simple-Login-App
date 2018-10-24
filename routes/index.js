var express = require('express');
var router = express.Router();
var db = require('../database/connection');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/login.html', function (req, res) {
    res.render("login");
});

router.post('/login.html', function (req, res) {
    let args = req.body;
    let username_email = args.username_email;
    let password = args.password;

    let username="";
    let email="";

    if(username_email.includes('@')){
        email = username_email;
    }
    else{
        
    }

    db.connection.getConnection(function(err, connection) {
        if (err) {
            console.log("Error has occurred.")
        } else {
            connection.query(`SELECT * FROM users WHERE \`username\` = "${username_email}" and \`password\` = "${password}" or \`email\` = "{}" AND \`password\` = "${password}"`, function(err, rows, fields) {
                if (err) {
                   console.log("Error has occurred.")
                } else {
                    console.log(rows);
                    if(rows.length > 0){
                        console.log("SUCEESS");
                    }
                }
            });
            connection.release();
        }
    });
});

router.get('/register.html', function (req, res) {
    res.render("register");
});

router.post('/register.html', function (req, res) {
    res.redirect('/');
});


module.exports = router;
