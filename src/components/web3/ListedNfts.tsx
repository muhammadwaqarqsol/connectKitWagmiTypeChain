import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNFTFunctionReader } from '../../hook';
import { useTotalTokenId } from '../web3/totaltokenId';
interface ListedNftsProps {
  projectID: number; // Change the type of projectID to match your data type
}

interface NFTData {
  image: string;
  name: string;
  description: string;
  // Add more properties if needed
}

export const ListedNfts: React.FC<ListedNftsProps> = ({ projectID }) => {
  const totaltokens = useTotalTokenId();
  const [nftData, setNftData] = useState<NFTData | null>(null); // Use NFTData type for nftData initially

  const { data,isError } = useNFTFunctionReader({
    functionName: 'tokenURI',
    args: [projectID.toString()],
  });

  useEffect(() => {
    // if
    if(!isError){
      if (data) {
      // Make an Axios GET request to the data URL and update the state with the fetched data
      axios
          .get(data?.toString())
          .then((response) => {
            console.log("Response",response)
            setNftData(response.data);

          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }}else {
      console.log("CHECL ")
      setNftData(null)
      console.log("ERROR CHECK")
    }
  }, [data]);

  if (!totaltokens) {
    return <div>No Tokens Minted yet!</div>;
  }
  if (isError) {
    return null;
  }
  return (
    <div className='flex items-center justify-center relative group'>
    <div className="bg-purple-300 w-64 
    shadow-lg rounded-lg overflow-hidden 
    relative block group">
      <div className="p-3 flex flex-col 
      items-center justify-center relative">
      <img src={nftData?.image} className="w-auto h-40 object-cover mb-4" alt="NFT" />
          <h1 className='font-bold text-xl text-center text-white'>{nftData?.name}</h1>
            <p className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0 flex justify-center items-end text-xl
               bg-gray-200 text-white font-semibold">
                    {nftData?.description}
            </p>
      </div>
    </div>
  </div>

  );
};
