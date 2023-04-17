const mongoose = require('mongoose')

const posteSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Types.ObjectId,
    //     // required: true
    // },
    petite_image: {
        type: String,
        required: true
    },
    grande_image: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String
    },
    text_short: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

const Poste = mongoose.model('Poste', posteSchema)
module.exports = Poste