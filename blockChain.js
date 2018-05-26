const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

createGenesisBlock() {
    return new Block(0, "This Is The Genesis Block", {coinAmount : 10}, Date());
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

module.exports = Blockchain;