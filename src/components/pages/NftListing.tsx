import React from 'react'
import { useTotalTokenId } from '../web3/totaltokenId';
import { ListedNfts } from '../web3/ListedNfts';
import { useAccount } from 'wagmi';
export const NftListing = () => {
  const {isConnected}=useAccount();

const totaltokens = useTotalTokenId();

if(!totaltokens){
  return <p>Nothing to list</p>
}

return (
  <div>
    {isConnected ? (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-7">
        {Array.from(Array(totaltokens).keys()).map(
          (projectNumber: number, i) => {
            return (
              <div key={i + 1}>
                <ListedNfts projectID={i + 1} />
              </div>
            );
          }
        )}
      </div>
    ) : (
      <div>Connect First</div>
    )}
  </div>
);}
