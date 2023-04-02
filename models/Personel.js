const mongoose = require('mongoose')

const personelSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    poste: {
        type: mongoose.Types.ObjectId,
        ref: 'poste',
        required: true
    }
})

/**
 * @typedef Personel
 */
const Personel = mongoose.model('personel', personelSchema);

module.exports = Personel;