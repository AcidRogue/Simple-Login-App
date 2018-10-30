var express = require('express');
var router = express.Router();
var auth = require("../auth/auth");
let db = require("../database/connection");

router.get("/", auth.isAuthorized, function post(req, res) {
    res.render("users", {users: getUsers()});
});
router.post("/", function post(req, res) {

});

function getUsers(){
    db.connection.getConnection(function (err, connection) {
        if (err) {
            console.log("Error has occurred.")
        } else {
            connection.query(`SELECT * FROM users`, function (err, rows, fields) {
                if (err) {
                    console.log("Error has occurred.")
                }
                else {
                    return rows;
                }
            });
            connection.release();
        }
    });
}

module.exports = router;