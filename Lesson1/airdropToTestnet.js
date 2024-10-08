const {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");


// connected to devnet

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
console.log("connected successfully");


// create a keypair
// create a new keypair
const newPair = new Keypair();

// extract the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;


// getBalance function

const getWalletBalance = async ( connection, publicKey ) => {
  try { 
    // get balance
    const walletBalance = await connection.getBalance( new PublicKey(publicKey) );

    // display balance
    console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL `);

  } catch (err) {
      console.log(err);
  }

}





// *** AIRDROP SOL FUNCTION (ONLY ON DEVNET) ***

const airDropSol = async ( connection, publicKey , amount) => {
  try {
    console.log(`Airdropping ${amount} SOL to the wallet!`);
    const txHash = await connection.requestAirdrop(
      new PublicKey(publicKey),
      amount * LAMPORTS_PER_SOL
    )

  // verify transaction has been mined
    await connection.confirmTransaction(txHash);


  } catch (err) {
      console.log(err);
  }

}



// call the appropriate functions 

const mainFunction = async () => {

  await getWalletBalance(connection, publicKey);

  await airDropSol(connection, publicKey, 2 );

  await getWalletBalance(connection, publicKey);
}

mainFunction();






