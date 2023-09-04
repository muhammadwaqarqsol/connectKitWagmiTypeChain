import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNFTFunctionReader, useNFTFunctionwriter } from '../../hook';
import { useTotalTokenId } from '../web3/totaltokenId';
import { useAccount, useWaitForTransaction } from 'wagmi';

interface ListedNftsProps {
  projectID: number; // Change the type of projectID to match your data type
}

interface NFTData {
  image: string;
  name: string;
  description: string;
  // Add more properties if needed
}

export const OwnedListedNfts: React.FC<ListedNftsProps> = ({ projectID }) => {
    const {address}=useAccount(); 
    const [recipientAddress,setRecipientAddress]=useState("");
    const [nftData, setNftData] = useState<NFTData | null>(null); // Use NFTData type for nftData initially

    const { data } = useNFTFunctionReader({
      functionName: 'tokenURI',
      args: [projectID.toString()],
    });
    const { data:Ownerof,isError} = useNFTFunctionReader({
      functionName: 'ownerOf',
      args: [projectID.toString()],
    });

    const { writeAsync, data:transfer } = useNFTFunctionwriter(
      "transferFrom",
      [address, recipientAddress, projectID]
    );
    let { isLoading, isSuccess } = useWaitForTransaction({
      hash: transfer?.hash,
    });




    useEffect(() => {
    if(!isError){if(Ownerof===address)
    { 
      if (data) {
      // Make an Axios GET request to the data URL and update the state with the fetched data
      axios
        .get(data?.toString())
        .then((response) => {
          setNftData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }}}}
      , [data]);
      if (!Ownerof || Ownerof !== address) {
        return null;
      }
return (
    <div className='flex justify-center relative group items-start'>
    <div className="bg-purple-300 w-64 
    shadow-lg rounded-lg overflow-hidden 
    relative block group ">
      <div className="p-3 flex flex-col 
      items-center justify-center relative">
        <img src={nftData?.image} className="w-auto h-40 
        object-cover mb-4" alt="NFT" />
        <h1 className='font-bold text-xl 
        text-center text-white'>{nftData?.name}</h1>
        <p className="opacity-0 group-hover:opacity-100
        duration-300 absolute inset-x-0 bottom-0 
        flex justify-center items-end text-xl
         bg-gray-200 text-white font-semibold">
          {nftData?.description}
        </p>
      </div>
      <button className="bg-blue-500 rounded-lg p-2 flex justify-center items-center m-2" type="button">
            Transfer
      </button>
    </div>
    
  </div>
  );
}

