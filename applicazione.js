var express=require('express');
var app=express();
var fs=require('fs');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//mongodb+srv://<USERNAME>:<PASSWORD>@cluster1-flnc4.mongodb.net/test?retryWrites=true




var MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
var uri = "mongodb+srv://giorgio:giorgino85!@cluster1-flnc4.mongodb.net";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n'+err);
   }
   console.log('Connected. to mongodb..');
   //const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   //client.close();




});
app.get('/index', function(req, res){
fs.readFile(__dirname+'/'+'index.html', 'utf8', function(err, data){
if (err) throw err;
res.end(data);
console.log('file is downloaded!');
});
});

app.post('/applicazione', function(req, res){
	var name=req.body.nome;
	var surename=req.body.cognome;
	var age=req.body.eta;
	var password=req.body.password;
	fs.readFile(__dirname+'/'+'applicazione.html','utf8' ,function(err, data){
if(err) throw err;
res.end('Your are send this informations: name: '+name+' surename: '+surename+'age: '+age+' And password: '+password);
	console.log('informations send!');
	});
});




app.listen(7000);