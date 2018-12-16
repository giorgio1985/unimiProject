var express = require('express');
var app = express();
var fs = require('fs');
var bodyP = require('body-parser');
var Customs = require('./mongoose.js');             // <--- including nodejs libreries ...
var myBlocks = require('./myBlock.js');
var cryptoJs = require('crypto-js');
var nodemailer = require('nodemailer');
//-----------------------------------------------

var ursa = require('ursa');
var key = ursa.generatePrivateKey(1024, 65537);
var privkeypem = key.toPrivatePem();
var pubkeypem = key.toPublicPem();

//-----------------------------------------------

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
console.log(privkeypem.toString('ascii'));
console.log(pubkeypem.toString('ascii'));
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
	
	/*------------------------------------------------------------------------------------*/

    var myMailer = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'g.adonoo@yahoo.it',
    pass: 'S*'
  }
});

var mailOptions = {
  from: 'g.adonoo@yahoo.it',
  to: email,
  subject: 'Sending Email using login app',
  text: 'Are you tryng to enter the B-chain application?!'
};

myMailer.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);

  }
});

  /*-------------------------------------------------------------------------------------*/

  MongoClient.connect(url, function(err, db) {   //  <------ request infos saved in db via login! and put on inside the collection "customs"...
  if (err) throw err;
  var dbo = db.db("database001");
  query={bitAddress: bitAddress, date: Date()};
  dbo.collection("customs").find(query).toArray(function(err, result) {
  if (err) throw err;
  if (bitAddress) {
 console.log('bit address funziona    '+ email+ '  '+ pass+ '  '+ bitAddress+'  ' +timestamp+'    ');
 console.log('La chiave pubblica generata:   '+ pubkeypem.toString('ascii'));


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
  var btcAddress=req.body.address;
  var detail=req.body.detail;
  var timestamp=Date();

  var string=name+title+price+btcAddress+detail+timestamp;
  
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

dbo.collection("customs").findOne({}, {sort: {bitAddress: -1}, limit: 1}, function(err, result) { /////////////////////////////////////
if (err) throw err;

console.log('Last bit address: '+ result.bitAddress);


var exHash = results.index;
var exTrans = results.transaction;
var balance = Number(exTrans) + Number(price);
var myAddress = result.bitAddress;

    var blockchains = new myBlocks({
    index: hash,
    previous: exHash,
    myAddress: myAddress,
    btcAddressFriends: btcAddress,
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
  
fs.writeFile('costructor.html',  
'<!DOCTYPE html>'+
'<head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1">'+
  '<meta name="description" content="">'+
  '<meta name="autor" content="">'+

  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">'+
  '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" id="bootstrap-css">'+
  '<link rel="stylesheet" href="../../dist/css/bootstrap.min.css">'+
  '<link rel="stylesheet" href="sticky-footer-navbar.css">'+
  '<link rel="stylesheet" type="text/css" href="index.css">'+
  '<link rel="stylesheet" type="text/css" href="footer.css">'+

  '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'+
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>'+
  '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>'+
  '<script src="./unimiProject/jquery.min.js"></script>'+
  
 
'<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>'+
'<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>'+
//'<scrtipt>'+ function myFunction(){alert("ciaoooooooooooooo")}+'</scrtipt>'+

    '<link href="../../dist/css/bootstrap.min.css" rel="stylesheet">'+

    '+<link href="navbar-top-fixed.css" rel="stylesheet">'+
'<title>Welcome to B-Chain transaction!</title>'+
'</head>'+ 
'<body>'+
'<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">'+
      '<a class="navbar-brand" href="#">B-Chain</a>'+
      '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">'+
        '<span class="navbar-toggler-icon">'+
        '</span>'+
      '</button>'+
      '<div class="collapse navbar-collapse" id="navbarCollapse">'+
        '<ul class="navbar-nav mr-auto">'+
          '<li class="nav-item active">'+
            '<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>'+
          '</li>'+
        '</ul>'+
        '<form class="form-inline mt-2 mt-md-0">'+
          '<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">'+
          '<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>'+
        '</form>'+
      '</div>'+
    '</nav>'+
'<p>B-Chain transaction <strong></p>'+
'<p>'+
'<scrtipt>'+ JSON.stringify({transaction: req.body.price, data: Date(), index: hash}) +'</scrtipt>'+
    //location.reload();
'</p>'+
'<hr>'+
'<footer class="footer">'+

  '<div class="footer-copyright text-center py-3">© 2018 Copyright:'+
    '<a href="#"> B-Chain </a>'+
  '</div>'+

'</footer>'+
'</body>'+
'</html>', 'utf-8' ,function (err) {
  if (err) throw err;
  
  console.log('Saved!');

}); 
  
    console.log(JSON.stringify(query));
 });

    db.close();
  });
}); 
    });   });    });////////////////  JSON.stringify({transaction: req.body.price, data: Date(), index: hash})
res.redirect('/myBlock');
});



/*<----------  end app.post *********************** ...
    
******  ******  ******  *****   ******  ******  ******
*       *    *  *    *  *    *  *    *  *       *
*  ***  ******  *****   * ***   ******  *  ***  * ****
*    *  *    *  *   *   *    *  *    *  *    *  *
******  *    *  *    *  *****   *    *  ******  ******


------------------------------------------------- ----*/
