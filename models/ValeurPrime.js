const mongoose = require('mongoose')

const typeAssureurSchema = mongoose.Schema({
    RC: {
        type: Number,
        default: 2500
    },
    DR: {
        type: Number,
        required: true
    },
    IPT: {
        type: Number,
        required: true
    },
    VM: {
        type: Number,
        required: true
    },
    IMC: {
        type: Number,
        required: true
    },
    DINNA: {
        type: Number,
        required: true
    },
    BrisGlasse: {
        type: Number,
        required: true
    },
    ASSISTANCE: {
        type: Number,
        required: true
    },
    assureur:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'assureur',
        unique: true,
        required: true,
    },
    typeAssureur:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'typeAssureur',
        required: true,
        unique: true
    }
})

/**
 * @typedef TypeAssureur
 */
const TypeAssureur = mongoose.model('type-assureur', typeAssureurSchema);

module.exports = TypeAssureur;