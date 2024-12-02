const {
    Connection,
    Keypair,
} = require('@solana/web3.js')
const bs58 = require('bs58')

const PRIVATE_KEY = "aaaaaaa";
const endpoint = "aaaaaaa";
const PINATA_GATEWAY = "aaaaaaa";
const PINATA_SECRET_JWT = "aaaaaaa";

// Example of created token: https://solscan.io/token/Bj3EDqheEpjSVSwJxWkxYNpPHX1PWQKm7AtpQj8eCMcQ

const revokeMintBool = true
const revokeFreezeBool  = false


let tokenInfo = {
    amount: 1000000000,
    decimals: 9,
    symbol: 'LPT ',
    tokenName: 'Lazy Peanut',
    metadata: '' //add metadata url here if you already have one else leave it empty
}


let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '',
    "description": `
                            One hundred eaters
                            They won't fit in one SUV (nah)
                            S-O-S, somebody rescue me
                            I got too many gyal, too many-many gyal, I got
                            They can last me the next two weeks (uh, huh)
                            Alright, like send the address through, please
                            `,
    "extensions": {
        "twitter": "https://twitter.com/lazydevpro",
        "telegram": "https://t.me/lazydevpro"
    },
    "tags": [ "SOLANA","MEME", "LAZYDEVPRO"
    ],
    "creator": {
        "name": "LAZYDEVPRO",
    }
}




// Ignore these
const connection = new Connection(endpoint); // helius
const myKeyPair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY)));


module.exports = {
    connection,
    myKeyPair,
    PINATA_SECRET_JWT,
    PINATA_GATEWAY,
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
};