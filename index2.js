var express=require('express');
var app=express();
var bodyP=require('body-parser');
var Customs=require('./mongoose.js');
app.use(express.static(__dirname + '/unimiProject'));
//var Block=require('./block.js');
//var Blockchain=require('./blockchain.js');
var myBlocks=require('./myBlock.js');

var cryptoJs=require('crypto-js');

app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());

app.get('/myBlock', function(req, res){
  res.sendFile(__dirname +'/'+ 'costructor.html');
  console.log('block file html connected!');
}).listen(8800);

app.post('/blocker', function(req, res){
	var name=req.body.nome;
	var title=req.body.titolo;
	var price=req.body.price;
	var detail=req.body.detail;
	var timestamp=Date();


    var string=name+title+price+detail+timestamp;
  var hash = cryptoJs.SHA256(string).toString();
console.log(hash);

	var blockchains=new myBlocks({
    index: hash,
    previous: hash,
    transaction: price,
    detail: detail,
    data: Date()
});

blockchains.save(function(err){
   if (err) throw err;
   //res.end(JSON.stringify(blockchains));
      console.log('your block are saved ind db!');
   });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database001");
  query={index: hash, previous: hash, transaction: req.body.price, detail: req.body.detail, data: Date()};
  dbo.collection("blockchain").find(query).toArray(function(err, result) {
  if (err) throw err;

    console.log(result);
    db.close();
  });
}); 
res.redirect('/costructor.html');
});

