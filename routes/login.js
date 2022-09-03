const express = require('express');
const con = require('../connection');
const loginRouter = express.Router();

// Login route
loginRouter.post('/login/:username/:password', (req, res) => {
    con.query('SELECT * FROM poi_users WHERE username = ? AND password = ?', [req.params.username, req.params.password], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            req.session.user = req.params.username;
            console.log(results)
            if (results.length == 1) {
                res.json({ "username": req.body.user });
            } else {
                res.status(401).json({ error: "Incorrect login Info!" });
            }
        }
    });
});

// Logout route
loginRouter.post('/logout', (req, res) => {
    req.session.user = null;
    res.json({ 'success': 1 });
});

module.exports = loginRouter;