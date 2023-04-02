const mongoose = require('mongoose')

const typeAssureurSchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    taux: {
        type: Number
    },
    RD: {
        type: Number
    },
    assureur:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'assureur',
        required: true,
    }
})

/**
 * @typedef TypeAssureur
 */
const TypeAssureur = mongoose.model('typeAssureur', typeAssureurSchema);

module.exports = TypeAssureur;