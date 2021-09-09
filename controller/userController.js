const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { UserModel } = require('../models/UserModel');

// Afficher tous les users
router.get('/', (req,res) => {
    UserModel.find((err,docs)=> {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher user par id
router.get('/:id', (req,res, next) => {
    UserModel.findById(req.params.id, (err,docs)=>{
        if(!err) res.send(docs);
        else{
            console.log("Error to get data : " + err);
            next();
        } 
    })  
})

// Créer un compte
router.post('/register', (req,res) => {
    const newUser = new UserModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        password: req.body.password,
        score: req.body.score,
        admin: req.body.admin,
    });

    newUser.save((err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new user : ' + err);
            
    })
})

// Modifier info user
router.put('/:id', (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else{
        const updateUser = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            password: req.body.password,
        };

        UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateUser},
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
        UserModel.findByIdAndRemove(
            req.params.id,
            (err,docs) => {
                if(!err) res.send(docs);
                else console.log("Delete error : " + err);
            }
        );
    }
})

module.exports = router;