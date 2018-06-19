var mongoose = require('mongoose');
mongoose.connect('mongodb://m*:*@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var Customs = new Schema({
	nome: String,
	cognome: String,
	anni: Number,
	citta: String,
	data: Date
});

var customs = mongoose.model('customs', Customs);

module.exports = customs;
