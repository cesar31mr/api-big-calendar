var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    creation: {type: Date, default: Date.now},
    active: Boolean
});

module.exports = mongoose.model('User', userSchema);