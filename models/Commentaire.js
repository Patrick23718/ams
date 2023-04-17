const mongoose = require('mongoose')

const commentaireSchema = new mongoose.Schema({
    
    poste: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Poste'
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

const Commentaire = mongoose.model('Commentaire', commentaireSchema)
module.exports = Commentaire