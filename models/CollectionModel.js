const mongoose = require("mongoose");

const CollectionModel = mongoose.model(
    "CardGame",
    {
        id_card: {
            type: String,
            required: true
        },
        id_User: {
            type: String,
            required: true
        }
    },
    "Collection"
);

module.exports = {CollectionModel};