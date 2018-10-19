var express=require('express');
var app=express();
var bodyP=require('body-parser');
var Customs=require('./mongoose.js');
var myBlocks=require('./myBlock.js');
var cryptoJs=require('crypto-js');

//mongoose.connect('mongodb://m*:i*@ds245680.mlab.com:45680/database001');
//var mongoClient=require('mongodb').mongoClient;
app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());
//app.use(express.static(__dirname + '/myBlock.html'));

app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html');
	console.log('file connected!');
}).listen(8800);

  app.get('/Block-file', function(req, res){
  res.sendFile(__dirname +'/'+ 'myBlock.html');
  console.log('Block connected!');
});

app.post('/login', function(req, res){
	var user=req.body.user;
	var email=req.body.email;
	var timestamp=Date();
	//var block=[];
	// block[0]=new Block(0, 'Genesis Block', 5000, timestamp);
    // var JBlock=[];
    //JBlock=JSON.stringify(block);
   
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
//console.log(hash);

  var blockchains=new myBlocks({
    index: hash,
    previous: hash,
    transaction: price,
    detail: detail,
    data: Date()
});

blockchains.save(function(err){
   if (err) throw err;
   res.end(JSON.stringify(blockchains));
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

    console.log(JSON.stringify(result));
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

