const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { DeckModel } = require('../models/DeckModel');

// Afficher tous les users
router.get('/', (req,res) => {
    DeckModel.find((err,docs)=> {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher user par id
router.get('/:id', (req,res, next) => {
    DeckModel.findById(req.params.id, (err,docs)=>{
        if(!err) res.send(docs);
        else{
            console.log("Error to get data : " + err);
            next();
        } 
    })  
})

// Créer un compte
router.post('/register', (req,res) => {
    const newDeck = new DeckModel({
        cardId: req.body.cardId,
        collectionId: req.body.collectionId,
    });

    newDeck.save((err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new card : ' + err);
            
    })
})

// Modifier info user
router.put('/:id', (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        const updateDeck = {
            cardId: req.body.cardId,
            collectionId: req.body.collectionId,
        };

        DeckModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateDeck},
            { new : true},
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Update Error : " + err);
            }
        )
    }
})

// Supprimer une carte

router.delete('/:id', (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        DeckModel.findByIdAndRemove(
            req.params.id,
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Delete error : " + err);
            }
        );
    }
})

module.exports = router;