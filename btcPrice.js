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



module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

*/