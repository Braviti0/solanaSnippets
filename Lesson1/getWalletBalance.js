// import decimals support
const {
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");


// getBalance function

const getWalletBalance = async ( connection, publicKey ) => {
  try {
    const walletBalance = await connection.getBalance( new PublicKey(publicKey) );

    console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL `);
  } catch (err) {
      console.log(err);
  }

}
