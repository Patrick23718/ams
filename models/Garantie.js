const mongoose = require('mongoose')

const garantieSchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    type:  {
        type: String,
        required: true,
        enum: ['vv', 'vn']
    },

})

/**
 * @typedef Garantie
 */
const Garantie = mongoose.model('garanties', garantieSchema);

module.exports = Garantie;