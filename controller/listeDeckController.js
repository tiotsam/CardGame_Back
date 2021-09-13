const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { DecklistModel } = require('../models/ListeDeckModel');

// Afficher tous les users
router.get('/', (req, res) => {
    DecklistModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher user par id
router.get('/:id', (req, res, next) => {
    DecklistModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else {
            console.log("Error to get data : " + err);
            next();
        }
    })
})

// Créer un compte
router.post('/', (req, res) => {
    if (!ObjectID.isValid(req.body.userId))
        return res.status(400).send("ID unknown : " + req.body.userId)
    else {
        const newDecklist = new DecklistModel({
            userId: req.body.userId,
            deckId: req.body.deckId,
        });

        newDecklist.save((err, docs) => {
            if (!err) res.send(docs);
            else console.log('Error creating new deck : ' + err);

        })
    }
})

// Modifier info user
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else {
        const updateDecklist = {
            userId: req.body.userId,
            deckId: req.body.deckId,
        };

        DecklistModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateDecklist },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log("Update Error : " + err);
            }
        )
    }
})

// Supprimer une carte

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else {
        DecklistModel.findByIdAndRemove(
            req.params.id,
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log("Delete error : " + err);
            }
        );
    }
})

module.exports = router;
