var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var myBlocks = new Schema({
	index: Number,
	previous: String,
	transaction: Number,
	detail: String,
	timeStamp: Date
});

var blockchains = mongoose.model('blockchains', myBlocks);

module.exports = blockchains;