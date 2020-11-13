const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lotSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        required: true,
    },
    bets: [{}]
}, {
    timestamps: true
})

module.exports = mongoose.model('Lot', lotSchema)
