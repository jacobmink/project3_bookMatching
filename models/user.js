const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Book = require('./book');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    likedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);