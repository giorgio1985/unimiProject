const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, previousBlockHeader = '', transactions, timestamp) {
    this.index               = index;
    this.header              = this.calculateHash();
    this.previousBlockHeader = previousBlockHeader;
    this.transactions        = transactions;
    this.timestamp           = timestamp;
  }

  calculateHash() {
    return SHA256(this.index  +
                  this.previousBlockHeader +
                  JSON.stringify(this.transactions)).toString() +
                  this.timestamp;
  }
}

module.exports = Block;