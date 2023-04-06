
const fs = require('fs');
const db = require('../db/db.json');
const express = require("express");
const crypto = require('crypto');
const noteRoutes = express.Router();

// util functions 

const generateUniqueID = () => {
    return crypto.randomBytes(8).toString('hex')
}

const saveAccountData = (data) => {
    db.push(data);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
}


// Get Data - using get method
noteRoutes.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    });
});

// Post Data - using post method
noteRoutes.post('/notes', (req, res) => {
    // Assign unique Id to each record
    const id = generateUniqueID()
    const { title, text } = req.body;
    const newNote = { id, title, text };
    saveAccountData(newNote);
    res.send({ success: true, msg: 'account data added successfully', db })
})


// Update Data - using Put method
noteRoutes.put('/notes/:id', (req, res) => {
    const { title, text } = req.body;
    const id = generateUniqueID()
    const updateNote = { id, title, text };
    db.splice(db.findIndex(v => v.id === req.params.id), 1, updateNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
});
// Delete Data - using Delete method
noteRoutes.delete('/notes/:id', (req, res) => {
    db.splice(db.findIndex(v => v.id === req.params.id), 1);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
})
module.exports = noteRoutes