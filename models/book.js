const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String
});

BookSchema.plugin(findOrCreate);

module.exports = mongoose.model('Book', BookSchema);