var express=require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var fs=require('fs');

var mongo=require('mongodb');
var url='mongodb://127.0.0.1:27017/';

var time=require('./time.js');

var crypto=require('./crypto.js');

app.get('/index', function(req, res){
 fs.readFile(__dirname +'/'+ 'index.html', 'utf8', function(err, data){
 	if (err) throw err;
 	res.end(data);
 });
});

app.post('/applicazione', function(req, res){
var nome=req.body.nome;
var email=req.body.email;
var text=req.body.textarea;
var timeStamp=time.timer();
var words=nome+email+text+timeStamp;

var md5=crypto.toCrypt(words);
mongoInsert(nome,email,text,timeStamp,md5);
mongoShow();

var wordAppend='Hello '+ nome +'| This is your last message: '+text+'| At '+timeStamp;
fs.readFile(__dirname  +'/'+'applicazione.html', 'utf8', function(err, data){
	if (err) throw err;
	res.end(data);
	console.log('text post! '+ timeStamp);
});
});

function mongoInsert(no,em,te,ts,md){
mongo.connect(url, function(err, db){
if (err) throw err;
var obj={ _id: md, name: no, email: em, text: te, timeStamp: ts };
var myDb=db.db('mongoDatabase');
myDb.collection('mongoCollection').insertOne(obj, function(err, data){
if (err) throw err;
console.log(JSON.stringify(obj));
});
db.close();
});
}

function mongoShow(){
	mongo.connect(url, function(err, db){
		if (err) throw err;
var showDb=db.db('mongoDatabase');
showDb.collection('mongoCollection').find({}).toArray(function(err, data){
	if (err) throw err;
	console.log('you have insert this informations: ');
	console.log(data);
});
db.close();
	});
}


app.listen(8000);


//mongodb+srv://<USERNAME>:<PASSWORD>@cluster1-flnc4.mongodb.net/test?retryWrites=true





