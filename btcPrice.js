var express=require('express');
var request = require('request');





request({
  url: "http://blockchain.info/stats?format=json",
  json: true
  }, function(error, response, body){
   return console.log('1 BTC = ' + body.market_price_usd + ' dollars'); 
        }
);



/* ----------------------------------------------------------------------


$ npm install exchange-rates


var exchange = require("exchange-rates"),
	fx = require("money");

exchange.load(function() {
	// Apply exchange rates and base rate to `fx` object:
	fx.rates = exchange.rates;
	fx.base = exchange.base;
	
	// money.js is all set up:
	fx(1).from("GBP").to("USD"); // 1.586 or etc.
});

*/