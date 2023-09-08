## Project Dependencies Required
wagmi for etheruem hooks to get read write functionality on Blockchain 
```shell
npm i wagmi
```
wallet connectivty requires connectKit which offer different Evm wallet connections
```shell
npm i connectkit viem 
```
Using axios for get request for fetching UI from the ipfs 
```shell
npm i axios
```
Using typechain for generating Types for Solidiity Smart contract 
```shell
npm install --save-dev typechain
```
typechain requires ethers to use the static types so better install it as well
its a web3 library for read and writing function call for blockchain
```shell
npm i ethers
```

## Running project
You need to clone this repo using 
```shell
git clone urlofthisrepo
```
then install dependencies
```shell
npm i
```
then run the development server
```shell
npm start
```
but first need to configure the env file require to run this 

## configure env from example env given
- Get Infure id from [Infura](https://www.infura.io/) get API key 

- Get Pinata Jwt from [Pinata](https://www.pinata.cloud/)

- Get wallet connect APi Key from [walletConnect](https://cloud.walletconnect.com/sign-in)

after getting these keys create .env file and check variable name from .env.example and set it up


## Here's an overview of the project structure:

## Inside the src folder:

- `index.tsx` sets up `ConnectKit` and configures `Wagmi`. It also sets up React Router.
- `App.tsx` contains all the routes and the navigation bar.
- The navigation bar includes a `ConnectKit button` for connecting EVM wallets and a read on-chain function to check how many NFTs the owner has.
- The `Contract-types` folder contains `static typings required for Solidity smart contracts` usage.

## Inside the components folder:

- Pages for all the routes:
- The main page is a static page.
- `mintNFT` page allows users to select an image and display it in a container, along with input fields for the NFT's name and description.
- `myNFTs` page displays NFTs owned by the user using a read function. It fetches all token IDs that exist within the contract and generates a card for each owned NFT.
- `NFTListing` page lists all NFTs without checking `ownership`, showing all available NFTs.
- The `Ui folder` contains two modal components: `mintModal` for `minting NFTs` and `modal.tsx` for `transferring minted NFTs`.

# The utils folder contains 
- utility functions, including a `debug console logger` that can be toggled on or off.

- The hooks file contains functions for interacting with `Wagmi`, reducing redundancy when defining multiple functions for different operations.

- `ImageUploader` and `MetaDataUploader` handle the `POST API` functionality for uploading data to `Pinata IPFS`.

## The web3 folder contains components:

- `TotalTokenId` returns the `total number` of `tokens minted`, which is used to determine the number of NFTs to display.
- `OwnerOf` defines the `OwnedListedNFTs` component, which generates cards for owned NFTs.
- `ListedNFT` generates cards for listed NFTs.

- The `navbar.TSX` Has only `navbar element` and `connectkit` button for evm wallet connection

# The abi folder contains 
- contract ABIs, which can be updated if you want to use your own ERC721 contracts.

# Contract for NFt
- NFT contract is deployed on polygon with address `0x68377b4BDf3b1E4804D15E81774c5398A670E5eE`.
- It is also verified you can run function on polygon mumbai scan as well.
- Code and Abi can be seen there as well.
  
### Warning:
- This project doesnot contain any database to store users nft so while getting data from chain and ipfs it continously send get request and show it show the data is continously fetching from respective servers no local storage feature to store and fecth again plus no any kind of other session storage. So when you mint nft and go to my Nft it might show your data a little late due to network fetching it depends on internet speed and your browser.
- That's all.

## MIT License
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
