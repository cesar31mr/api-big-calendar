var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    start: {type: Date, default: Date.now},
    end: {type: Date, default: Date.now},
    title: String,
});

module.exports = mongoose.model('Dates', dateSchema);