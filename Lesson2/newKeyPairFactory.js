const { Keypair } = require("@solana/web3.js");

const newPair = Keypair.generate();

console.log(newPair.secretKey);