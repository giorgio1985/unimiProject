var express=require('express');
var app=express();
var fs = require('fs');
var bodyP=require('body-parser');
var request = require('request');
const EventEmitter = require('events').EventEmitter;
const  marketPrice = new EventEmitter;

function btcStockPrice(){ 

request({
  url: "http://blockchain.info/stats?format=json",
  json: true
}, function(error, response, body){
  console.log('1 BTC = '+ body.market_price_usd + ' USD');
//res.end(body.market_price_usd);
});
}

marketPrice.on('btcStockPrice', btcStockPrice);
console.log('srfsrf')
// ----------------------------------------------------------------------
/*app.on('testEvent', function () {
  return console.log('responded to testEvent');
});

app.get('/test', function (req, res) {
  app.emit('testEvent');
  return res.status(200).end();
});

//4

*/