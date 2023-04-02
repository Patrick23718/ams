const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    dateNais: {
        type: Date,
    },
    cni: {
        type: String,
    },
    adresse: {
        type: String,
    },
    tel: {
        type: String,
    },
    profession: {
        type: String,
    },
    numImmatriculation: {
        type: String,
    },
    numChassir: {
        type: String,
    },
    marqueVehicule: {
        type: String,
    },
    energie: {
        type: String,
        enum: ['diesel', 'essence'],
    },
    puissance: {
        type: String,
    },
    miseEnCirculation: {
        type: Date,
    },
    chargeUtile: {
        type: String,
    },
    valNeuve: {
        type: String,
    },
    carroserie: {
        type: String,
    },
    Nbreplace: {
        type: Number,
    },
    valVenale: {
        type: String,
    },
})

/**
 * @typedef Quote
 */
const Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote;

const formule = 1