var Block=require('./block.js');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

createGenesisBlock(){
    return new Block(0, 'zero', 'my genesis block!!', Date());
}

getLastBlock() {
    return this.chain[this.chain.length-1];
  }

addBlock(newBlock) {
    newBlock.previousBlockHeader = this.getLastBlock().header;
    newBlock.header              = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
