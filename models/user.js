const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);