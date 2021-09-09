const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

const DeckModel = mongoose.model('Decks', new Schema({
        cardId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Cards',
            required: true
        },
        collectionId: {
            type: String,
            ref: 'Collection'
        }
    }));

module.exports = {DeckModel};
