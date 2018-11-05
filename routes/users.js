var express = require('express');
var router = express.Router();
var auth = require("../auth/auth");
let db = require("../database/connection");

router.get("/", auth.isAuthorized, async function post(req, res) {
    res.render("users", {users: await getUsers()});
});
router.post("/", function post(req, res) {

});

async function getUsers() {
    let users = [];
    return new Promise((resolve, reject) => {
        db.connection.getConnection(function (err, connection) {
            if (err) {
                reject("Error has occurred.")
            } else {
                connection.query(`SELECT * FROM users`, function (err, rows, fields) {
                    if (err) {
                        reject("Error has occurred.");
                    }
                    else {
                        for (let i = 0; i < rows.length; i++) {
                            users.push({
                                    user: {
                                        id: rows[i].id,
                                        username: rows[i].username,
                                        email: rows[i].email,
                                        password: rows[i].password,
                                        isAdmin: rows[i].isAdmin
                                    }
                                }
                            );
                        }
                        resolve(users);
                    }
                });
                connection.release();
            }
        })
    });
}

module.exports = router;