const mongoose = require('mongoose');
const Item = require('./Item');

const { Schema } = mongoose;

const WishListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    month: {
        type: Number,
        match: [/^(0[1-9]|1[0-2])$/, "Must match a valid month"],
        required: true
    },
    day: {
        type: Number,
        match: [/^(0[1 - 9] | [12]\d | 3[01])$/, "Must match a valid day"],
        required: true
    },
    year: {
        type: Number,
        match: [/^ (19 | 20) \d{ 2}$/, "Must match a valid year"],
        required: true
    },
    items: [Item.schema]
});

const WishList = mongoose.model('WishList', WishListSchema);

module.exports = WishList;