module.exports.timeStamp=function(){  
var timer = new Date();
var time=timer.toUTCString();
return time;
}