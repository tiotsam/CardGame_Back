const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { CardsModel } = require('../models/CardsModel');
const { CollectionModel } = require('../models/CollectionModel');
const { DeckModel } = require('../models/DeckModel');

// Afficher toutes les cartes
router.get('/', (req,res) => {
    CardsModel.find((err,docs)=> {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher seulement une carte
router.get("/:id", (req,res, next) => {
    CardsModel.findById(req.params.id, (err,docs)=>{
        if(!err) res.send(docs);
        else{
            console.log("Error to get data : " + err);
            next();
        } 
    })  
})

// Créer une carte
router.post('/', (req,res) => {
    const newCards = new CardsModel({
        name: req.body.name,
        image: req.body.image,
        type: req.body.type,
        mana: req.body.mana,
        attack: req.body.attack,
        HP: req.body.HP,
        desc: req.body.desc,
        effect: req.body.effect,
    });

    newCards.save((err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new cards : ' + err);
            
    })
})

// Modifier une carte
router.put("/:id", (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        const updateCards = {
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            mana: req.body.mana,
            attack: req.body.attack,
            HP: req.body.HP,
            desc: req.body.desc,
            effect: req.body.effect,
        };

        CardsModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateCards},
            { new : true},
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Update Error : " + err);
            }
        )
    }
})

// Supprimer une carte

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
        CollectionModel.findByIdAndRemove(
            req.params.id,
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Delete error : " + err);
            }
        );
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