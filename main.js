const fs = require('fs');
const {createToken} = require('./src/create_token.js')
const PinataSDK = require("@pinata/sdk");
const {
    PINATA_SECRET_JWT,
    PINATA_GATEWAY,
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
} = require('./config.js')




async function main() {

    // Upload metadata to pinata
    if(tokenInfo.metadata == ''){
        const metadata_url = await uploadMetaData()
        if (!metadata_url){
        console.log("Metadata failed")
        return;
        }
        tokenInfo.metadata = metadata_url
    }
    console.log("Using user provided metadata url:", tokenInfo.metadata)
    
    // Create token
    console.log("Creating Token...")
    const mintAddress = await createToken(tokenInfo, revokeMintBool, revokeFreezeBool)
    console.log(`Mint Link: https://solscan.io/token/${mintAddress.toString()}`)


}





async function uploadMetaData() {
    const pinata = new PinataSDK({
        pinataJWTKey: PINATA_SECRET_JWT,
        pinataGatewayUrl: PINATA_GATEWAY
    })

    // Store image
    const readableStreamForFile = fs.createReadStream('./image.jpg');
    const options = {
        pinataMetadata: {
            name: "image.jpg"
        }
    };

    let result;
    try {
        result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    } catch (err) {
        console.log("Could not upload image:", err);
        return;
    }

    const cid1 = result.IpfsHash; // This is the CID
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${cid1}`;
    console.log('Image URL:', imageUrl);
    metaDataforToken.image = imageUrl;

    // Now, pin the JSON metadata
    const jsonOptions = {
        pinataMetadata: {
            name: "token-metadata.json"
        }
    };

    try {
        result = await pinata.pinJSONToIPFS(metaDataforToken, jsonOptions);
    } catch (err) {
        console.log("Could not upload metadata:", err);
        return;
    }

    const cid = result.IpfsHash;
    const metadata_url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    console.log('Metadata URI:', metadata_url);

    return metadata_url;
}

main()
