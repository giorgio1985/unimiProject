const express=require('express');
const app=express();
const fs=require('fs');
const Block=require('./block.js');
const block = new Block(0, "This Is The Genesis Block", {coinAmount : 10}, Date());

var jsonBlock=JSON.stringify(block);

app.get('/blockchain', function(req, res){
	fs.readFile(__dirname +'/'+ 'file.html', 'utf8', function(err, data){
		if (err) throw err;
		res.end(data+jsonBlock);
		console.log('this is the genesis block:');
		console.log(jsonBlock);
	});
}).listen(8800);

