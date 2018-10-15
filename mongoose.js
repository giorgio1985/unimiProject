var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var Customs = new Schema({
	user: String,
	email: String,
	data: Date
});

var customs = mongoose.model('customs', Customs);

module.exports = customs;
