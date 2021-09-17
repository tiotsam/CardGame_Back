const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeckModel = mongoose.model('Decks', new Schema({
        cardId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Cards',
            required: true
        },
        collectionId: {
            type: String,
            ref: 'Collection'
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
}));

module.exports = {DeckModel};
