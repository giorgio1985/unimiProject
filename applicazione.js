var express=require('express');
var app=express();

var port=9000;

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var mongo=require('mongodb');

var fs=require('fs');

var cripto=require('crypto-js');

var block=require('./block.js');
var blockChain=require('./blockChain.js');


app.get('/login', function(req, res){
    fs.readFile(__dirname +'/'+ 'index.html','utf8', function(err, data){
    	if (err) throw err;
    res.end(data);
});
});

app.post('/private', function(req, res){
    var nome=req.body.nome;
    var cognome=req.body.cognome;
    var password=req.body.password;
    var hiddenPass=cripto.MD5(password).toString();
    var phrase=nome+' '+cognome+' '+hiddenPass;
    fs.readFile(__dirname  +'/'+ 'private.html','utf8', function(err, data){
    	if (err) throw err;
    	res.end(JSON.stringify(phrase));
    });
});
app.listen(port);

/*
Blockchain {
  chain:
   [ Block {
       index: 0,
       header: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855undefined',
       previousBlockHeader: 'This Is The Genesis Block',
       transactions: [Object],
       timestamp: 'Fri Dec 29 2017 12:02:33 GMT-0700 (MST)' },
     Block {
       index: 1,
       header: '35f87048396bd3386a35dc4ddf5fdb2c07c628ae510d00afda3714002a34b8a7Fri Dec 29 2017 12:13:46 GMT-0700 (MST)',
       previousBlockHeader: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855undefined',
       transactions: [Object],
       timestamp: 'Fri Dec 29 2017 12:13:46 GMT-0700 (MST)' },
     Block {
       index: 2,
       header: 'c2bd3f90136364832f43f87499888c6284f53deb9573c47fddd60c3d7e2313f5Fri Dec 29 2017 12:28:00 GMT-0700 (MST)',
       previousBlockHeader: '35f87048396bd3386a35dc4ddf5fdb2c07c628ae510d00afda3714002a34b8a7Fri Dec 29 2017 12:13:46 GMT-0700 (MST)',
       transactions: [Object],
       timestamp: 'Fri Dec 29 2017 12:28:00 GMT-0700 (MST)' }
    ]
}

*/

