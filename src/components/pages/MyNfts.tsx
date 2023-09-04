import React, { useEffect } from 'react'
import { useTotalTokenId } from '../web3/totaltokenId';
import { OwnedListedNfts } from '../web3/ownerOf';
import { useAccount } from 'wagmi';
export const MyNfts = () => {
   const {isConnected}=useAccount();
   const totaltokens = useTotalTokenId();
  if(!totaltokens){
  return <p>Nothing to list</p>
  }
  
  return (
        <div>{isConnected ?<div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-7"'>
        {Array.from(Array(totaltokens).keys()).map(
              (projectNumber: number, i) => {
                return (
                  <div key={i+1}>
                    <OwnedListedNfts projectID={i+1} />
                  </div>
                );
              }
            )}
        </div>:<div>Connect First</div> }
        
        </div>
      )
    }


