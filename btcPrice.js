function btcStockPrice(){ 
/*request({
  url: "http://blockchain.info/stats?format=json",
  json: true
}, function(error, response, body){
  console.log('1 BTC = '+ body.market_price_usd + ' USD');
res.end(body.market_price_usd);
});*/

var x = document.getElementsByClassName('btcTable')[0];
 var y = x.getElementsByTagName('p')[0];

    y.innerHTML = "red";
console.log('fatto');

}


//4