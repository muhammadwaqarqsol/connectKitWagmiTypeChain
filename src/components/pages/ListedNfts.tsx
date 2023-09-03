import React, { useState } from 'react'
import {NFT} from "../../contract-types/NFT"
import {useNFTFunctionReader} from "../../hook";
import { useTotalTokenId } from '../web3/totaltokenId';

export const ListedNfts = () => {
  const [tokenId,setTokenId]=useState("")
  const totaltokens=useTotalTokenId();


  const getUriResult=useNFTFunctionReader({
    functionName:"tokenURI",
    args:[tokenId]
  })


  if (!totaltokens) {
    return <div >No Tokens Minted yet!</div>;
  }
  return (<>
    <div className='text-blue-900 text-xl'>ListedNfts</div>
    {/* <NFTinfo nftid={totaltokens}/> */}
    <p>{totaltokens}</p>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    {/* <img src={tokenUri} className="w-full h-56 object-cover" /> */}
      <div className="p-4">
        {/* <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p> */}
      </div>
    </div>
    </>
  )
}
