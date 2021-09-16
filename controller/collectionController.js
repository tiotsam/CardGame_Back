const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { CollectionModel } = require('../models/CollectionModel');
const { DeckModel } = require('../models/DeckModel');
const { UserModel } = require('../models/UserModel');

// Afficher toutes les collection
router.get('/', (req,res) => {
    CollectionModel.find((err,docs)=> {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher seulement une collection
router.get("/:id", (req,res, next) => {
    CollectionModel.findById(req.params.id, (err,docs)=>{
        if(!err) res.send(docs);
        else{
            console.log("Error to get data : " + err);
            next();
        } 
    })  
})

// Créer une collection
router.post('/', (req,res) => {
    if(!ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID unknown : " + req.body.userId)
    else{
        const newCollection = new CollectionModel({
            cardId: req.body.cardId,
            userId: req.body.userId
        });
    
        newCollection.save((err,docs,next) => {
            if (!err) res.send(docs);
            else{
                console.log('Error creating new cards : ' + err)
                return next();
            } ;
                
        })

    }
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

router.delete("/:id", async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        try {
            const listDeck = await DeckModel.find({collectionId: req.params.id}).exec()       
            const firstReturn = listDeck.map(async (elem) =>{
                await DeckModel.findByIdAndRemove(elem);
            })
            const secondReturn = await CollectionModel.findByIdAndRemove(req.params.id)
            res.status(201).json({firstReturn,secondReturn})
        }catch(exception) {
            res.status(400).json({...exception})
        }
    }
})



module.exports = router;