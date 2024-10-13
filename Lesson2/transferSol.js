const {
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require("@solana/web3.js");



// send Solana function
const sendSol = async (connection, senderWallet, receiverAddress, amount) => {

    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: receiverAddress,
            lamports: amount * LAMPORTS_PER_SOL
        })
    )
  
    var signature = await sendAndConfirmTransaction({
      connection,
      transaction,
      senderWallet
    })
  
    console.log("Transaction signature = "  + signature);
  }
  