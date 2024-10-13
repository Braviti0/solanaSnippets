const {
    Keypair,
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction
 } = require("@solana/web3.js");
 
 
 const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
 
 console.log("connected successfully");
 
 const senderSecretKey = new Uint8Array([
     128,  71, 207,  33, 158,  42,  45, 234, 180,  98,  47,
     219, 239, 111, 229, 226, 146, 239, 119,  83,  19, 179,
      60,  43, 115,  90,  46, 175, 197,  36, 204,  20, 195,
     210, 121, 118, 103,  12, 144, 227,  90, 196,  57,  15,
      15, 129, 158,  19,  33,  63, 138,  47, 215, 241,  77,
      71, 238, 169, 230, 229,  57,  80,  81, 158
 ]);
 
 const senderWallet = Keypair.fromSecretKey(senderSecretKey);
 const receiverWallet = Keypair.generate();
 
 
 // *** AIRDROP SOL FUNCTION (ONLY ON DEVNET) ***
 
 const airDropSol = async ( connection, publicKey , amount) => {
     try {
       console.log(`Airdropping ${amount} SOL to the wallet!`);
       const txHash = await connection.requestAirdrop(
         new PublicKey(publicKey),
         amount * LAMPORTS_PER_SOL
       )
   
     // verify transaction has been mined
       let latestBlockHash = connection.getLatestBlockhash();
 
       await connection.confirmTransaction({
         blockhash: latestBlockHash.blockhash,
         lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
         signature: txHash
     });
   
   
     } catch (err) {
         console.log(err);
     }
   
 }
 
 // getBalance function
 
 const getWalletBalance = async ( connection, publicKey ) => {
     try {

       const walletBalance = await connection.getBalance( new PublicKey(publicKey) );
   
       console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL `);
       

       // send the wallet balance as a return variable
       return parseInt(walletBalance) / LAMPORTS_PER_SOL

     } catch (err) {
         console.log(err);
     }
   
 }


 // send Solana function
const sendSol = async (connection, senderWallet, receiverAddress, amount) => {

  var transaction = new Transaction().add(
      SystemProgram.transfer({
          fromPubkey: senderWallet.publicKey,
          toPubkey: receiverAddress,
          lamports: amount * LAMPORTS_PER_SOL
      })
  )

  var signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [senderWallet]
  )

  console.log("Transaction signature = "  + signature);
}

 
 
 
 const main = async () => {

     console.log("determining the balance of the sender")
     const senderBalance = await getWalletBalance(connection, senderWallet.publicKey);

     console.log("sending funds to receiver");
     await sendSol(connection, senderWallet, receiverWallet.publicKey, senderBalance/ 2);

     console.log("checking receiver balance");
     await getWalletBalance(connection, receiverWallet.publicKey);

     console.log ("checking sender balance");
     await getWalletBalance(connection, senderWallet.publicKey);
 }
 
 main();