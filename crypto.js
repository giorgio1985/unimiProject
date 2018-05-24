module.exports.toCrypt=function(data){
	var cripto=require('crypto-js');
	var result=cripto.MD5(data).toString();
	return result;
}
