var crypto=require('crypto-js');

class Block {
	constructor(index, previousBlockHeader='', transaction, timeStamp){
		this.index=index;
		this.previousBlockHeader=previousBlockHeader;
		this.transaction=transaction;
		this.timeStamp=timeStamp;
		this.hash=this.calculateHash();

	}

	calculateHash(){
		var hashed=this.index + this.previousBlockHeader + this.transaction + this.timeStamp;
		var sha256=crypto.SHA256(hashed).toString();
		return sha256;
	}
}

//var block=new Block(0, 'zero',0 ,Date());
//console.log(block);

module.exports = Block;
