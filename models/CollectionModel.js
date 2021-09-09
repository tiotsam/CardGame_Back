const mongoose = require("mongoose");


const CollectionModel = mongoose.model('Collection', new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cards',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    }
))


module.exports = { CollectionModel };