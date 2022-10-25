# Dependencies
* node >=12.0 && <= 17.0

# Set up 
* npm install

# Configurations
You can customize your collection in config.json
#### newContract
Used for deploying a new contract
```json   
"collectionName": "ENTER YOUR NEW COLLECTION NAME",
"collectionSymbol": "ENTER YOUR NEW COLLECTION SYMBOL",
"baseTokenURI": "ENTER YOUR CONTENT HOSTING PROVIDER: https://example.com/ ... ENSURE YOU INCLUDE '/' AT THE END",
"maxSupply": "ENTER YOUR COLLECTION SIZE"
```
#### existingContract
Used for loading an existing contract to change baseURI
```json
"contractAddress":"ENTER YOUR EXISTING COLLECTION ADDRESS",
"newURI": "ENTER YOUR NEW URI https://newuri.com/ ... DON'T FORGET TO INCLUDE '/' AT THE END"
```
# .env
Enter your private key and your polygonscan API key (https://polygonscan.com/myapikey)

# Process
* update private key in .env file ... contract owner wallet with enough MATIC to deploy
* change config file

* to check your wallet address
```shell    
npm run account
```

* to run tests:
```shell
npm run test
```

* gasLimit in deploy.js is set to 3 000 000, which is enough for collection of aprox. 600 NFTs (maxSupply), change it in case of bigger collection 
* to deploy contract only     
```shell
npm run deploy
```

* once deployed, you can mint - wait at least 2 minutes after deploy  
```shell
npm run mint
```

* contract verification (sometimes does not work correctly), better to verify on polygonscan (mumbai.polygonscan)
```shell
npm run verify
```

* if necessary to change baseURI if you ever change your hosting provider
```shell
npm run baseuri
```

* Once minted, token can be transfered to customer's wallet:
* This is called as hardhat task from hardhat.config.js
```shell
npm run transfer-nft <receiverAddress> <tokenID>
```

* for testnet use same commands just add "-mumbai" to it... e.g. npm run deploy-mumbai
* for local use same commands just add "-local" to it... e.g. npm run deploy-local