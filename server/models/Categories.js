  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    catName: {
        type: String,
        maxlength: 50
    },
    
}, { timestamps: true })



const Category = mongoose.model('Category', categorySchema);

module.exports = { Category }