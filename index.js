var express=require('express');
var app=express();
var bodyP=require('body-parser');
var Block=require('./block.js');
app.set('view engine', 'ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());

app.get('/', function(req, res){
	res.sendFile(__dirname +'/'+ 'index.html');
	console.log('file connected!');
}).listen(8800);
console.log('write your url name file.');


app.post('/mese', function(req, res){
	var nome=req.body.nome;
	var cognome=req.body.cognome;
	var anni=req.body.anni;
	var citta=req.body.citta;
	var timestamp=new Date();
	var block=[];
	 block[0]=new Block(0, 'Genesis Block', 5000, timestamp);
	 block[1]=new Block(1, '', 740, timestamp);
	 block[2]=new Block(2, '', 400, timestamp);
	 block[3]=new Block(3, '', 45540, timestamp);
	 block[4]=new Block(4, '', 500, timestamp);
	 block[5]=new Block(5, '', 54400, timestamp);
	 block[6]=new Block(6, '', 4700, timestamp);

    var JBlock=[];
    JBlock=JSON.stringify(block);
   

   
	res.render('welcome', { nom: nome, cog: cognome, ann: anni, cit: citta, time: timestamp, bit: JBlock });
	console.log('last update: '+ timestamp);

});

