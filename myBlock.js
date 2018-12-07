var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var myBlocks = new Schema({
	id: {type: Number, AutoIncrement: true ,required: false},
    index: String,
	previous: String,
	myAddress: String,
	btcAddressFriends: String,
	transaction: Number,
	Balance: Number,
	detail: String,
	data: Date
});

myBlocks.plugin(AutoIncrement, {inc_field: 'id'});
var blockchains = mongoose.model('blockchains', myBlocks);

module.exports = blockchains;