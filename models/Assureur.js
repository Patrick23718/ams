const mongoose = require('mongoose')

const assureurSchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    DR: {
        type: Number,
        required: true
    }
})

/**
 * @typedef Assureur
 */
const Assureur = mongoose.model('assureur', assureurSchema);

module.exports = Assureur;