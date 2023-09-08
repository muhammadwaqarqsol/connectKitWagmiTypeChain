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
Get Infure id from [Infura](https://www.infura.io/) get API key 
Get Pinata Jwt from [Pinata](https://www.pinata.cloud/)
Get wallet connect APi Key from [walletConnect](https://cloud.walletconnect.com/sign-in)

after getting these keys create .env file and check variable name from .env.example and set it up



