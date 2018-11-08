var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var Customs = new Schema({
	email: String,
    pass: String,
    bitAddress: String,
	date: Date
});

var customs = mongoose.model('customs', Customs);

module.exports = customs;

