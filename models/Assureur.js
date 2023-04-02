const mongoose = require('mongoose')

const assureurSchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    }
})

/**
 * @typedef Assureur
 */
const Assureur = mongoose.model('assureur', assureurSchema);

module.exports = Assureur;