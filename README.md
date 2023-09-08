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

## Project Struture

- Inside the source `index.tsx` is connectkit setup and wagmi is configured + also react router is setup.
- Then `App.tsx` has all the routes of the folder structure with in navbar
- The connectkit button to connect Evm wallet is inside the navbar component where there is also one read on chain function to check how many nfts owner has
- Folder `Contract-types` has all the static typings required for solidity smart contracts usage.
- Inside component we have pages for all the routes main page is static page
- then mintNFt page has only features like select image and show it inside the container with input fields of name and description of the nft
- The myNfts page has the feature to show your owned NFTS using read function that takes all tokenIds first that exist inside the contract then loop over it to pass to ownedListedNft component that takes id of token and generated a card for it if you own it else null will be return.
- Same Nftlisting page do the same thing but it loop over all the tokend id to generate all cards without checking ower it is like listing all nfts.
- The Ui folder has two modal minmodal that has button to mint nft after passing state props from minfNft page and modal.tsx is for transfer minted token NFT which takes props from myNft page component of OwnedListedNFTs.
- utils folder has the utils like debug console word that if true it will console the output else wont.
- hooks file has function for wagmi so we dont have to write the whole think again for multiple function we just defiine ones and then use it by pasiing arguments and also function name.
- ImageUploader and MetaData uploader has post api functionality to post on pinata IPFS.
- web3 folder has components totaltokenId that return a number of total token counter which will be required to see how many nfts are minted so we can loop over to generate card
- The ownerof file has component ownedListedNfts which is already defined above
- The listedNft has the same feature to generate card which is also discussed above
- the navbar has navbar elements and button setup for connectkit.
- The abi folder has contract abis you can change if you want to use your own ERC721 contracts
- 


