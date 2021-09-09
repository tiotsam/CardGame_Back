const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { CollectionModel } = require('../models/CollectionModel');

// Afficher toutes les collection
router.get('/', (req,res) => {
    CardsModel.find((err,docs)=> {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher seulement une collection
router.get("/:id", (req,res, next) => {
    CardsModel.findById(req.params.id, (err,docs)=>{
        if(!err) res.send(docs);
        else{
            console.log("Error to get data : " + err);
            next();
        } 
    })  
})

// Créer une collection
router.post('/', (req,res) => {
    const newCollection = new CollectionModel({
        cardId: req.body.cardId,
        userId: req.body.userId
    });

    newCollection.save((err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new cards : ' + err);
            
    })
})

// Modifier une collection
router.put("/:id", (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        const updateCollection= {
            cardId: req.body.cardId,
            userId: req.body.userId
        };

        CollectionModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateCollection},
            { new : true},
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Update Error : " + err);
            }
        )
    }
})

// Supprimer une collection

router.delete("/:id", (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        CardsModel.findByIdAndRemove(
            req.params.id,
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Delete error : " + err);
            }
        );
    }
})


module.exports = router;