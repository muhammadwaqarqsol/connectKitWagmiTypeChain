import React, { useEffect } from 'react'
import { useTotalTokenId } from '../web3/totaltokenId';
import { OwnedListedNfts } from '../web3/ownerOf';
import { useAccount } from 'wagmi';
import { useNFTFunctionReader } from '../../hook';
export const MyNfts = () => {
   const {isConnected}=useAccount();
   const totaltokens = useTotalTokenId();
   const {data} = useNFTFunctionReader({
    functionName: "getTokens"
  })as { data: bigint[] };

  if(!totaltokens){
    return <>{isConnected?<div className='justify-center items-center flex flex-col'>
    <img src='error.png' />
    <p className='text-3xl font-bold italic text-purple-500'>You dont have NFT!</p>
    <p className='text-3xl font-bold italic text-purple-500'>Mint First!</p>
    </div>:<p className='justify-center items-center text-5xl flex flex-col text-purple-500'>Connect First</p>}
    </>
  }
  return (
        <div>
          {isConnected ? <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            {
        data?.map((item, index) => (
          <div key={item.toString()}>
        <OwnedListedNfts projectID={Number(item)} />
        </div>
         ))
        }
        </div>:<div>Connect First</div> }
        </div>
      )
    }


