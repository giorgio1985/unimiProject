
//mongodb+srv://<USERNAME>:<PASSWORD>@cluster1-flnc4.mongodb.net/test?retryWrites=true

var express=require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var mongo=require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/mongoDatabase';

var fs=require('fs');
var time=require('./time.js');

var cripto=require('crypto-js');


app.get('/index', function(req, res){
fs.readFile(__dirname+'/'+'index.html', 'utf8', function(err, data){
if (err) throw err;
res.end(data);
console.log('File is uploaded!: '+time.timeStamp());
});
});

app.post('/inside', function(req, res){
var name=req.body.nome;
var pass=req.body.password;
var email=req.body.email;
var string=name+pass+email;
var enc=cripto.MD5(string).toString();
var passEncrypt=cripto.MD5(pass).toString();
fs.readFile(__dirname+'/'+'inside.html', 'utf8', function(err, data){
if (err) throw err;
mongo.connect(url, function(err, db){
	if (err) throw err;
	var mydb=db.db('mongoDatabase');
	var obj={_id: enc, Stamp: time.timeStamp(), Nome: name, Password: passEncrypt, Email: email};
	mydb.collection('custums').insertOne(obj, function(err, data){
		if (err) throw err;
		res.end(JSON.stringify(obj));
	});
	mydb.collection('custums').find({}, {_id: 1}).toArray(function(err, data){
        if (err) throw err;
        res.end(JSON.stringify(obj));
	});
db.close();
});

});



});
//
app.listen(8000);





