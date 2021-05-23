const mongoose = require('mongoose');

const { Schema } = mongoose;

const WishListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: Number,
        validate: (value => ((value <= 12) && (value > 0))),
        required: true
    },
    day: {
        type: Number,
        validate: (value => ((value <= 31) && (value > 0))),
        required: true
    },
    year: {
        type: Number,
        validate: (value => ((value <= Date.now) && (value > 1900))),
        required: true
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

const WishList = mongoose.model('WishList', WishListSchema);

module.exports = WishList;