const mongoose = require("mongoose");

const CardsModel = mongoose.model(
    "CardGame",
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        type: {
            type: Array,
            required: true
        },
        mana:{
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        },
        HP: {
            type: Number,
            required: true
        },
        desc:{
            type: String,
            required: true
        },
        effect:{
            type: String,
            required: true
        }

    },
    "Cards"
);

module.exports = {CardsModel};