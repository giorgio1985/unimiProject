var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001');
var Schema = mongoose.Schema;

var Address = new Schema({
    bitAddress: String,
	date: Date
});
