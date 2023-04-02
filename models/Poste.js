const mongoose = require('mongoose')

const posteSchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    }
})

/**
 * @typedef Poste
 */
const Poste = mongoose.model('poste', posteSchema);

module.exports = Poste;