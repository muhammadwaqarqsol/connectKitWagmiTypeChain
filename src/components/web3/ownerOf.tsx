import axios from 'axios';
import React, { ChangeEvent,MouseEvent, useCallback, useEffect, useState } from 'react';
import { useNFTFunctionReader, useNFTFunctionwriter } from '../../hook';
import { useAccount, useWaitForTransaction } from 'wagmi';
import {Modal} from '../ui/Modal';
interface ListedNftsProps {
  projectID: number; // Change the type of projectID to match your data type
}

interface NFTData {
  image: string;
  name: string;
  description: string;
  nftTokenId:string;
  // Add more properties if needed
}

export const OwnedListedNfts: React.FC<ListedNftsProps> = ({ projectID }) => {
    const {address}=useAccount(); 
    const [tokenId,setTokenId]=useState("");
    const [recipientAddress,setRecipientAddress]=useState("");
    const [nftData, setNftData] = useState<NFTData | null>(null); // Use NFTData type for nftData initially

    const { data,error } = useNFTFunctionReader({
      functionName: 'tokenURI',
      args: [projectID.toString()],
    });
    const { data:Ownerof,isError,error:projectIderor} = useNFTFunctionReader({
      functionName: 'ownerOf',
      args: [projectID.toString()],
    });

    

    // const { writeAsync:burnToken, data:burn } = useNFTFunctionwriter(
    //   "burnNft",
    //   [tokenId]
    // );
    // let { isLoading:burnLoader, isSuccess:burnSuccess } = useWaitForTransaction({
    //   hash: transfer?.hash,
    // });
    useEffect(() => {
    if(!isError){if(Ownerof===address)
    { 
      if (data) {
      // Make an Axios GET request to the data URL and update the state with the fetched data
      axios
        .get(data?.toString())
        .then((response) => {
          const currentData=response.data;
            const updateNftData:any={
              ...currentData,
              nftTokenId:projectID,
          }
          setNftData(updateNftData);
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
  <>
  {nftData !== null &&
    <div className="flex flex-col justify-center items-center m-4">
    <div className="!z-5 relative rounded-[20px] max-w-[500px] max-h-[500px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white outline-dashed undefined">
        <div className="h-full w-full">
            <div className="relative w-full">
                <img src={nftData?.image} className="mb-3 h-40 w-full rounded-xl 3xl:h-full 3xl:w-full" alt=""/>
            </div>
            <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                    <p className="text-lg font-bold text-navy-700"> {nftData?.name} </p>
                    <p className="text-lg mt-1 font-medium text-gray-600 md:mt-2">{nftData?.description}</p>
                    <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">By You</p>
                </div>
            </div>
            <div className="flex items-center justify-between md:items-center lg:justify-between ">
                <Modal tokenId={nftData?.nftTokenId} />
            </div>
        </div>
    </div>
</div>
    }
  
  </>
  );
}

