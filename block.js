const SHA256 = require('crypto-js');

class Block {
  constructor(index, previousBlockHeader = '', transactions, timestamp) {
    this.index               = index;
    this.header              = this.calculateHash();
    this.previousBlockHeader = previousBlockHeader;
    this.transactions        = transactions;
    this.timestamp           = timestamp;
  }

  calculateHash() {
    return SHA256.MD5(this.index  +
                  this.previousBlockHeader +
                  JSON.stringify(this.transactions)).toString() +
                  this.timestamp;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }


getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

addBlock(newBlock) {
    newBlock.previousBlockHeader = this.getLastBlock().header;
    newBlock.header              = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}


module.exports = Block;
