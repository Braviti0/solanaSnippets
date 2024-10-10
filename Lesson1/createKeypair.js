// import functionalities
const {
  PublicKey,
  Keypair
} = require("@solana/web3.js");

// create a new keypair
const newPair = new Keypair();

// extract the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

