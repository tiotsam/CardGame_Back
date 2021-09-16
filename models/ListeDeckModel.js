const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

const DecklistModel = mongoose.model('Decklist', new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    deckId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Decks'
    }
}));
module.exports = {DecklistModel};
