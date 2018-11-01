var express=require('express');
var app=express();
var fs = require('fs');
var bodyP=require('body-parser');
var Customs=require('./mongoose.js');             // <--- including js libreries ...
var myBlocks=require('./myBlock.js');
var cryptoJs=require('crypto-js');
var firstBlock = require('./block.js');
var chainer=require('./blockchain.js');
//   https://enlight.nyc/projects/blockchain/
//   https://developers.caffeina.com/chiccocoin-learn-what-is-a-blockchain-by-creating-one-in-nodejs-12929a89208b
//   https://www.youtube.com/watch?v=VBu7lgSR9sc  

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";

app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());


app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html');      //  <---  first page dowloaded at port number 8000 ...
	console.log('file connected!');
}).listen(8000);

  app.get('/Block-file', function(req, res){       // <---  return here ... 0001
  res.sendFile(__dirname +'/'+ 'myBlock.html');
  console.log('Block connected!');
});

app.post('/login', function(req, res){  // <--- app.post start **** ******************************************************
                                        //receive infos by login form and catch user and email customers ...
	var user=req.body.user;
	var email=req.body.email;
	var timestamp=Date();

   
   var customs=new Customs({                //  <--- customs schema ...
    user: user,
    email:email,
    data:timestamp  
});
   customs.save(function(err){             // <--- seve all in db ...
   if (err) throw err;
   res.end(JSON.stringify(customs));
      console.log('informations are saved ind db!');
   });
  
  

   //res.end(JSON.stringify(customs));
   



MongoClient.connect(url, function(err, db) {   //  <------ request infos saved in db via login! and put on inside the collection "customs"...
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
res.redirect('/Block-file')  // <--- back here 0001 ...
});                                                   // <--- end app.post  ******************************************* ...

app.get('/myBlock', function(req, res){
  res.sendFile(__dirname +'/'+ 'costructor.html');
  console.log('block file html connected!');
});

app.post('/blocker', function(req, res){            // <--- app.post start ********************************************* ...
                                                    // <--- catch infos via private form after the first login ... 
  var name=req.body.nome;
  var title=req.body.titolo;
  var price=req.body.price;
  var detail=req.body.detail;
  var timestamp=Date();

  var string=name+title+price+detail+timestamp;
  
  var hash = cryptoJs.SHA256(string).toString();
  console.log(hash);

//   -------->  last block function 

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database001");
  
      dbo.collection("blockchains").findOne({}, {sort: {_id: -1}, limit: 1}, function(err, result) {

  if (err) throw err;                                                                                  // <--- da sistemare ...

   console.log('Ultima funzione ...' + result.id);
    var preId=result.id;
    dbo.collection("blockchains").findOne({id: preId}, function(err, results){  
if (err) throw err;
console.log('penultima funzione ...' + (results.id) + '          penultimo hash '+  (results.index));




var exHash = results.index;

    var blockchains=new myBlocks({
    index: hash,
    previous:exHash,
    transaction: price,
    detail: detail,
    data: Date()
   
  });  



blockchains.save(function(err){    //  <--- INPUT TRANSACTION ...
   if (err) throw err;
   res.end(JSON.stringify(blockchains));
      console.log('your block are saved in db!');
   });  

    db.close();
  //});


var Block = new firstBlock(hash, exHash, price, timestamp);
var Blockchain = new chainer();
Blockchain.createGenesisBlock(0, 'zero', 'my genesis block!!', Date());
Blockchain.getLastBlock();
Blockchain.addBlock(Block);
var exHash = results.index;
//var exHash = Blockchain.getLastBlock().header;  

//});
MongoClient.connect(url, function(err, db) {    // <--- OUTPUT TRANSACTION ...
  if (err) throw err;
  var dbo = db.db("database001");
  query={index: hash, previous: exHash, transaction: req.body.price, detail: req.body.detail, data: Date()};
  dbo.collection("blockchain").find(query).toArray(function(err, result) {
  if (err) throw err;
  
/*fs.appendFile('costructor.html', JSON.stringify(query), 'utf8' ,function (err) {
  if (err) throw err;
  
  console.log('Saved!');

}); */  });
    res.end(JSON.stringify(result));
    console.log(JSON.stringify(query));
    db.close();
  });
}); 
    });   });
res.redirect('/myBlock');
});

    /*  <---  end app.post ************************************************************ ...
    
******  ******  ******  *****   ******  ******  ******
*       *    *  *    *  *    *  *    *  *       *
*  ***  ******  *****   * ***   ******  *  ***  * ****
*    *  *    *  *   *   *    *  *    *  *    *  *
******  *    *  *    *  *****   *    *  ******  ******




*//*
<<                    -----------------------------------------------------------                     >>



//console.log('ccc = '+ccc+' <---- ccc');
/*console.log('Blockchain ---> '+JSON.stringify(Blockchain)+ '<----- Blockchain');
console.log('Block ---> '+JSON.stringify(Block)+' <-----Block');
console.log('Last Block ---> '+JSON.stringify(Blockchain.getLastBlock(ccc))+' <--- last Block');
console.log('Last hash -->'+JSON.stringify(Blockchain.getLastBlock(ccc).header)+'<--- last hash');   */



/*


    var block=new Block();
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
/*

******  ******  ******  *****   ******  ******  ******
*       *    *  *    *  *    *  *    *  *       *
*  ***  ******  *****   * ***   ******  *  ***  * ****
*    *  *    *  *   *   *    *  *    *  *    *  *
******  *    *  *    *  *****   *    *  ******  ******
*/