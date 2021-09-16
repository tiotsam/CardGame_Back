const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { UserModel } = require('../models/UserModel');
const { CollectionModel } = require('../models/CollectionModel');
const { DeckModel } = require('../models/DeckModel');
const { DecklistModel } = require('../models/ListeDeckModel');

// Afficher tous les users
router.get('/', (req, res) => {
    UserModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

// Chercher user par id
router.get('/:id', (req, res, next) => {
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else {
            console.log("Error to get data : " + err);
            next();
        }
    })
})

// Créer un compte
router.post('/register', (req, res, next) => {
    const newUser = new UserModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        image: req.body.image,
        ban: req.body.ban,
        password: req.body.password,
        score: req.body.score,
        admin: req.body.admin,
    });

    newUser.save((err, docs) => {
        if (!err) res.send(docs);
        else {
            console.log('Error creating new user : ' + err);
            next();
        }

    })
})

// Modifier info user
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    else {
        const updateUser = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            mail: req.body.mail,
            pseudo: req.body.pseudo,
            image: req.body.image,
            ban: req.body.ban,
            password: req.body.password,
            score: req.body.score,
            admin: req.body.admin,
        };

        UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateUser },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log("Update Error : " + err);
            }
        )
    }
})

// Supprimer un utilisateur
router.delete("/:id", async (req,res,next) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknown : " + req.params.id)
        next();
    }
    else{
        try {
            const firstReturn =  await UserModel.findByIdAndRemove(req.params.id)
            const secondReturn = await CollectionModel.deleteMany({userId: req.params.id})
            const listDeck = await DecklistModel.find({userId: req.params.id}).exec()            
            const thirdReturn = listDeck.map(async (elem) =>{
                console.log(elem.deckId);
                elem.deckId.map( async (el) => await DeckModel.findByIdAndRemove(el))
            })
            const fourthReturn = await DecklistModel.deleteMany({userId: req.params.id})
            res.status(201).json({firstReturn,secondReturn,thirdReturn,fourthReturn})
        }catch(exception) {
            res.status(400).json({...exception})
        }
    }
})


// router.delete('/:id', (req, res) => {
//     if (!ObjectID.isValid(req.params.id))
//         return res.status(400).send("ID unknown : " + req.params.id)
//     else {
//         UserModel.findByIdAndRemove(
//             req.params.id,
//             (err, docs) => {
//                 if (!err) res.send(docs);
//                 else console.log("Delete error : " + err);
//             }
//         );
//     }
// })

module.exports = router;