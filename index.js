var express = require('express');
var app = express();
var fs = require('fs');
var bodyP = require('body-parser');
var Customs = require('./mongoose.js');             // <--- including nodejs libreries ...
var myBlocks = require('./myBlock.js');
var cryptoJs = require('crypto-js');


var bitAddress = null;
const saldo = 5000;


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo1985:internazionale1985@ds245680.mlab.com:45680/database001";

app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());


app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html', function(err, res){
    if (err) throw err;

   /* request({
  url: "http://blockchain.info/stats?format=json",
  json: true
  }, function(error, response, body){
    if (err) throw err;
       console.log('... 1 BTC = ' + body.market_price_usd + ' dollars'); 

        }
);*/
  });      //  <---  first page dowloaded at port number 8000 ...
 

}).listen(8000);

  app.get('/Block-file', function(req, res){       // <---  return here ... 0001
  res.sendFile(__dirname +'/'+ 'myBlock.html');
  console.log('Block connected!');
});

app.post('/login', function(req, res){  // <--- app.post start **** ******************************************************
                                        //receive infos by login form and catch user and email customers ...
	var email=req.body.email;
	var pass=req.body.pass;


  var bitAdd=email + pass;
  var bitHash = cryptoJs.SHA256(bitAdd).toString();
 

  var bitAddress= bitHash;
  var timestamp=Date();

    //db.close();
  /*-------------------------------------------------------------------------------------*/

  MongoClient.connect(url, function(err, db) {   //  <------ request infos saved in db via login! and put on inside the collection "customs"...
  if (err) throw err;
  var dbo = db.db("database001");
  query={bitAddress: bitAddress, date: Date()};
  dbo.collection("customs").find(query).toArray(function(err, result) {
  if (err) throw err;
  if (bitAddress) {
 console.log('bit address funziona    '+ email+ '  '+ pass+ '  '+ bitAddress+'  ' +timestamp);


   var customs=new Customs({                //  <--- customs schema ...
    bitAddress: bitAddress,
    date: timestamp

  });



  customs.save(function(err){             // <--- seve all in db ...
   if (err) throw err;
      console.log('informations are saved ind db!'+ bitAddress);
   });
    console.log(result);
  } else console.log('errore di qualcosa....');
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

   console.log('Ultima funzione ... ---->' + result.id);
    var preId=result.id;
    dbo.collection("blockchains").findOne({id: preId}, function(err, results){  
if (err) throw err;
console.log('penultima funzione ... ---->' + (results.id) + '  penultimo hash -----> '+  (results.index)+ '  '+(results.transaction));



var exHash = results.index;
var exTrans = results.transaction;
var balance = Number(exTrans) + Number(price);

    var blockchains = new myBlocks({
    index: hash,
    previous:exHash,
    transaction: price,
    Balance: balance,
    detail: detail,
    data: Date()
   
  });  


blockchains.save(function(err){    //  <--- INPUT TRANSACTION ...
   if (err) throw err;
   res.end(JSON.stringify(blockchains));
      console.log('your block are saved in db!');
   });  
  


var exHash = results.index;

 
   



MongoClient.connect(url, function(err, db) {    // <--- OUTPUT TRANSACTION ...
  if (err) throw err;
  var dbo = db.db("database001");
  query={index: hash, previous: exHash, transaction: req.body.price, detail: req.body.detail, data: Date()};
  dbo.collection("blockchain").find(query).toArray(function(err, result) {
  if (err) throw err;
  
fs.appendFile('costructor.html', JSON.stringify({transaction: req.body.price, data: Date(), index: hash}), 'utf8' ,function (err) {
  if (err) throw err;
   // res.end(JSON.stringify(result));
  /* res.end('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Pagina Node.js!</title>'+
'    </head>'+ 
'    <body>'+
'       <p>Sono un paragrafo <strong>HTML</strong>!</p>'+
'    </body>'+
'</html>');*/
  console.log('Saved!');

}); 
  
    console.log(JSON.stringify(query));
 });

    db.close();
  });
}); 
    });   });
res.redirect('/myBlock');
});



/*<----------  end app.post *********************** ...
    
******  ******  ******  *****   ******  ******  ******
*       *    *  *    *  *    *  *    *  *       *
*  ***  ******  *****   * ***   ******  *  ***  * ****
*    *  *    *  *   *   *    *  *    *  *    *  *
******  *    *  *    *  *****   *    *  ******  ******


------------------------------------------------- ----*/
