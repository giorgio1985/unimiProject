var express=require('express');
var app=express();
var fs = require('fs');
var bodyP=require('body-parser');
var Customs=require('./mongoose.js');
var myBlocks=require('./myBlock.js');
var cryptoJs=require('crypto-js');
var firstBlock = require('./block.js');
var chainer=require('./blockchain.js');
//   https://enlight.nyc/projects/blockchain/
//   https://developers.caffeina.com/chiccocoin-learn-what-is-a-blockchain-by-creating-one-in-nodejs-12929a89208b

app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());


app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html');
	console.log('file connected!');
}).listen(8000);

  app.get('/Block-file', function(req, res){
  res.sendFile(__dirname +'/'+ 'myBlock.html');
  console.log('Block connected!');
});

app.post('/login', function(req, res){
	var user=req.body.user;
	var email=req.body.email;
	var timestamp=Date();

   
   var customs=new Customs({
    user: user,
    email:email,
    data:timestamp  
});
   customs.save(function(err){
   if (err) throw err;
   res.end(JSON.stringify(customs));
      console.log('informations are saved ind db!');
   });
  
  

   //res.end(JSON.stringify(customs));
   

   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database001");
  query={user: req.body.user, email: req.body.email};
  dbo.collection("customs").find(query).toArray(function(err, result) {
  if (err) throw err;

    console.log(result);
    db.close();
  });
}); 
// use ajax for output information to index file?...  working in progress...
res.redirect('/Block-file')
});
  


app.get('/myBlock', function(req, res){
  res.sendFile(__dirname +'/'+ 'costructor.html');
  console.log('block file html connected!');
});

app.post('/blocker', function(req, res){
  var name=req.body.nome;
  var title=req.body.titolo;
  var price=req.body.price;
  var detail=req.body.detail;
  var timestamp=Date();

  var string=name+title+price+detail+timestamp;
  
  var hash = cryptoJs.SHA256(string).toString();
  console.log(hash);

  //var Block=[];
  // block[0]=new Block(0, 'Genesis Block', 5000, timestamp);
    // var JBlock=[];
    //JBlock=JSON.stringify(block);


 var Block = new firstBlock(hash, exHash, price, timestamp);
var Blockchain = new chainer();
Blockchain.createGenesisBlock(0, 'zero', 'my genesis block!!', Date());
Blockchain.getLastBlock();
var ccc = Blockchain.addBlock(Block);
console.log('ccc = '+ccc+' <---- ccc');
console.log('Blockchain ---> '+JSON.stringify(Blockchain)+ '<----- Blockchain');
console.log('Block ---> '+JSON.stringify(Block)+' <-----Block');
console.log('Last Block ---> '+JSON.stringify(Blockchain.getLastBlock(ccc))+' <--- last Block');
console.log('Last hash -->'+JSON.stringify(Blockchain.getLastBlock(ccc).header)+'<--- last hash');
var exHash = Blockchain.getLastBlock().header;
//var exHash2 = previousBlockHeader;



var blockchains=new myBlocks({
    index: hash,
    previous:exHash,
    transaction: price,
    detail: detail,
    data: Date()
   
  
}); 
blockchains.save(function(err){
   if (err) throw err;
   res.end(JSON.stringify(blockchains));
      console.log('your block are saved in db!');
   });  




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database001");
  query={index: hash, previous: exHash, transaction: req.body.price, detail: req.body.detail, data: Date()};
  dbo.collection("blockchain").find(query).toArray(function(err, result) {
  if (err) throw err;
  
fs.appendFile('costructor.html', JSON.stringify(query), 'utf8' ,function (err) {
  if (err) throw err;
  
  console.log('Saved!');

}); 
    res.end(JSON.stringify(result));
    console.log(JSON.stringify(query));
    db.close();
  });
}); 
res.redirect('/myBlock');
});




    /*var block=new Block();
    var blockchain=new Blockchain();

    var genesis=blockchain.createGenesisBlock();
    var lastBlock=blockchain.getLastBlock();
    var block=new Block(1,'new block', 2000, Date()); 
    var addblock=blockchain.addBlock(block);

    var Jgenesis=JSON.stringify(genesis);
    var JlastBlock=JSON.stringify(lastBlock);
    //var Jaddblock=JSON.stringify(addblock);

    console.log('genesis: '+Jgenesis);
    console.log('Last block: '+ JlastBlock);
    //console.log('new block: '+ Jaddblock);
	//res.render('welcome', { nom: nome, cog: cognome, ann: anni, cit: citta, time: timestamp, bit: JBlock });
	res.send(Jgenesis+'  <br> '+JlastBlock);



console.log('write your url name file.');
*/

/*  ------------------------------------------------  
function back(){ 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database001");
  //dbo.collection('blockchains').find({'id': 5}).toArray(function(err, data){
   // if (err) throw err;
    //console.log(data);
    var ggg = dbo.collection('blockchains').find({'id': 1}, {limit: 1}).sort({$natural: -1});
      //return dbo.collection.find().sort({ $natural: -1 }).limit(1);
      // dbo.collection('blockchains').find({}).hint( { $natural : -1 } ).limit(2).sort({'id': -1});
      return ggg;
  //console.log(ggg);
  });
}
//});
------------------------------------------------- */