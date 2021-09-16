const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { DecklistModel } = require('../models/ListeDeckModel');
const { DeckModel } = require('../models/DeckModel');

// Afficher toutes les decklist
router.get('/', (req, res) => {
    DecklistModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher decklist par id
router.get('/:id', (req, res, next) => {
    DecklistModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else {
            console.log("Error to get data : " + err);
            next();
        }
    })
})

// Créer une liste de deck
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

// Modifier liste de deck
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

// Supprimer une liste de deck

router.delete('/:id', async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        try {
            const listDeck = await DecklistModel.findById(req.params.id)        
            const firstReturn = listDeck.deckId.map(async (elem) =>{
                await DeckModel.findByIdAndRemove(elem);
            })
            const secondReturn = await DecklistModel.findByIdAndRemove(req.params.id)
            res.status(201).json({firstReturn,secondReturn})
        }catch(exception) {
            res.status(400).json({...exception})
        }
    }
})

module.exports = router;
