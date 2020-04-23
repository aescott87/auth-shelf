const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    if (req.isAuthenticated()) {
        pool.query('SELECT * FROM "item";')
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for items:', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newItem = req.body;
    console.log('new item is', newItem);
    if (req.isAuthenticated()) {
        pool.query(`INSERT INTO "item" ("description", "image_url") VALUES ($1, $2);`, [req.body.description, req.body.image_url])
            .then(res.sendStatus(200))
            .catch(
                res.sendStatus(500)
            );
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;