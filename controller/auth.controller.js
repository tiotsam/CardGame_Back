const express = require('express');
const { UserModel } = require('../models/UserModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
}

// S'authentifier
router.post('/in', async (req,res) => {
    const { pseudo, password } = req.body

    try{
        const user = await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
    } catch (err){
        const errors = signInErrors(err);
        res.status(200).json({errors});

    }
})

// Se délogger
router.get('/out', async (req,res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
})

module.exports = router;