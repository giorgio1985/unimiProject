var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var myBlock = new Schema({
	index: Number,
	previous: String,
	transaction: Number,
	timeStamp: Date
});

var theBlock = mongoose.model('theBlock', myBlock);
module.exports = theBlock;