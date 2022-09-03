const express = require('express');
const connection = require('../connection');

const pointsofinterestRouter = express.Router();

//Get points of interest in a given region
pointsofinterestRouter.get('/search/:region', (req, res) => {
    connection.query('SELECT * FROM pointsofinterest WHERE region = ?', [req.params.region], (error, results, fields) => {
        if (error) {
            res.status(404).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

//Increase the number of recommendations by one
pointsofinterestRouter.post('/recommend/:ID', (req, res) => {
    connection.query('UPDATE pointsofinterest SET recommendations=recommendations+1  WHERE ID=?', [req.params.ID], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error });
        } else if (results.affectedRows == 1) {
            res.json({ 'message': 'Successfully added a recommendation.' });
        } else {
            res.status(404).json({ error: 'No rows updated, could not find a record matching that ID' });
        }
    });
});

//Add points of interest
pointsofinterestRouter.post('/create', (req, res) => {
    connection.query('INSERT INTO pointsofinterest (ID, name, type, country, region, lon, lat, description, recommendations) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.ID, req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description, req.body.recommendations], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.json({ success: 1 });
        }
    });
});


module.exports = pointsofinterestRouter;