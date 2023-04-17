const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    libelle: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true
    }
})

/**
 * @typedef Category
 */
const Category = mongoose.model('categories', categorySchema);

module.exports = Category;