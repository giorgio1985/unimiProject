var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var Address = new Schema({
	id_transaction: {type: Number, AutoIncrement: true, unique: true},
    coinAddress: String,
    transferOUT: Number,
    accountBalance: Number,
	date: Date
});

Address.plugin(AutoIncrement, {inc_field: 'id_transaction'});

var address = mongoose.model('address', Address);

module.exports = address;
