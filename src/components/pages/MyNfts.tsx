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
        <div>{isConnected ?<>
        {Array.from(Array(totaltokens).keys()).map(
              (projectNumber: number, i) => {
                return (
                  <div key={i+1}>
                    <OwnedListedNfts projectID={i+1} />
                  </div>
                );
              }
            )}
        </>:<div>Connect First</div> }
        </div>
      )
    }


