module.exports.timer=function(){
	var data=new Date();
	var d=data.toUTCString();
	return 'the real time stamp is: '+d;
}
