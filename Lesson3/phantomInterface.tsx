import React from 'react';
import './App.css';
import {
    PublicKey,
    Transaction
} from '@solana/web3.js';
import {useEffect, useState } from "react";

//create types
type DisplayEncoding = "utf8" | "hex";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

type PhantomRequestMethod = 
| "connect" 
| "disconnect"
| "signTransaction"
| "signAllTransactions"
| "signMessage";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    publicKey: PublicKey | null;
    isConnected: boolean | null;
    signTransaction : (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions : (transactions: Transaction[]) => Promise<Transaction[]>;
    signMessage: (
        message: Uint8Array | String,
        display? : DisplayEncoding
    ) => Promise<any>;

    connect: (opts?: Partial<ConnectOpts>) => Promise<{publicKey: PublicKey}>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params:any) => Promise<unknown>;
}

const getProvider = (): PhantomProvider | undefined  => {
    if ("solana" in window) {
        const provider = window.solana as any;
        if (provider.isPhantom) {
            return provider as PhantomProvider
        }
        
    }
}

export default function App () {
    // react state variable for the provider
    const [provider, setProvider] = useState <PhantomProvider | undefined>(undefined);

    // react state variable for the wallet key
    const [walletKey, setWalletKey] = useState <PhantomProvider | undefined>(undefined);

    // This runs whenever we reload the site to get the Phantom wallet
    useEffect(() => {
        const provider = getProvider();

        if (provider)  setProvider(provider);
        else  setProvider(undefined);
    },[])

    /**
   * @description prompts user to connect wallet if it exists.
	 * This function is called when the connect wallet button is clicked
   */
    const connectWallet = async () => {
        // @ts-ignore
        const {solana}  = window;

        // check if phantom wallet exists
        if (solana) {
            try {
                const response = await solana.connect();
                console.log('wallet account', response.publicKey.toString())
                setWalletKey(response.publicKey.toString())
            } catch (error) {
                // { code: 4001, message: 'User rejected the request.' }
            }
        }
    }

    const disconnectWallet = async () => {
        // @ts-ignore
        const { solana } = window;
    
        // check if Phantom wallet exists
        if (solana?.isPhantom) {
            try {
                setWalletKey(undefined);
                console.log('Wallet disconnected successfully');
            } catch (error) {
                console.error('User rejected the request', error);
            }
        } else {
            console.error('Phantom wallet not found');
        }
    };


    
    return  (
        <div className="App">
            <header className="App-header">
                <h2>Connect to Phantom Wallet</h2>
                { provider && !walletKey && (
                    <button
                    style={{
                        fontSize: "16px",
                        padding: "15px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                      }}
                    onClick={connectWallet}
                    >
                        ConnectWallet
                    </button>
                )}

                {provider && walletKey && <p> Connected Account</p> && (<button
                style={{
                    fontSize: "16px",
                    padding: "15px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    }}
                onClick={disconnectWallet}
                >Disconnect Wallet</button>)}

                {!provider && (
                    <p>
                        No provider found. Install{" "}
                        <a href="https://phantom.app/">Phantom Browser extension</a>
                    </p>
                )}
            </header>
        </div>
    )
}