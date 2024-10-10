const {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL
  } = require("@solana/web3.js");


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