const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
   category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'categories',
       required: true
   },
    garanty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'garanties',
        required: true
    },
    assureur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assureur',
        required: true
    },
    tauxP: {
       type: Number,
    },
    minP: {
        type: Number,
    },
    tauxF: {
        type: Number,
        default: 0
    },
    minF: {
        type: Number,
        default: 0
    },
})

/**
 * @typedef Quote
 */
const Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote;

const formule = 1