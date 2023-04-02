const mongoose = require('mongoose')

const reseauSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['facebook', 'twitter', 'youtube', 'linkedIn']
    },
    link: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'personel',
        required: true,
    } 
})

/**
 * @typedef Reseau
 */
const Reseau = mongoose.model('reseau', reseauSchema);

module.exports = Reseau;