const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        // validate: value => validator.isURL(),
        // match: [
        //     /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
        //     'must be a valid url'
        // ],
        required: true
    },
    specialNote: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    isClaimed: {
        type: Boolean,
        default: false
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;