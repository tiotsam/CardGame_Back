const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

const UserModel = mongoose.model('Users', new Schema({
    // "CardGame",
    // {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        mail: {
            type: String,
            required: true,
            unique: true
        },
        pseudo:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        admin:{
            type: Boolean,
            required: true
        }
    }
    // "Users"
));

module.exports = {UserModel};