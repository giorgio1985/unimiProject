var express=require('express');
var app=express();
var bodyP=require('body-parser');
var Block=require('./block.js');
var Blockchain=require('./blockchain.js');
var Customs=require('./mongoose.js');
//mongoose.connect('mongodb://m*:i*@ds245680.mlab.com:45680/database001');

app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());

app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html');
	console.log('file connected!');
}).listen(8800);

app.post('/mese', function(req, res){
	var nome=req.body.nome;
	var cognome=req.body.cognome;
	var anni=req.body.anni;
	var citta=req.body.citta;
	var timestamp=Date();
	//var block=[];
	// block[0]=new Block(0, 'Genesis Block', 5000, timestamp);
    // var JBlock=[];
    //JBlock=JSON.stringify(block);
   
   var customs=new Customs({
    nome: nome,
    cognome:cognome,
    anni:anni,
    citta:citta,
    data:timestamp  
});
   customs.save(function(err){
   if (err) throw err;
   console.log('informations are saved ind db!');
   res.end(JSON.stringify(customs));
   });

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

