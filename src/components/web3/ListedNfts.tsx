import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNFTFunctionReader } from '../../hook';

interface ListedNftsProps {
  projectID: number;
  // projectID?: React.Reac/tNode; // Change the type of projectID to match your data type
}

interface NFTData {
  image: string;
  name: string;
  description: string;
  // Add more properties if needed
}

export const ListedNfts: React.FC<ListedNftsProps> = ({ projectID }) => {

  const [nftData, setNftData] = useState<NFTData | null>(null); // Use NFTData type for nftData initially

  const { data,isError,error } = useNFTFunctionReader({
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
            console.log("Data .. ",data)
            console.error('Error fetching data:', error);
          });
    }}else {
      console.log("CHECL ")
      setNftData(null)
      console.log("ERROR CHECK")
    }
  }, [data]);
  useEffect(() => {
    console.log("NFT : ",nftData)
  }, [nftData]);



  return (
    <>
    {nftData !== null &&(
       <div className="flex flex-col justify-center items-center">
       <div className="bg-purple-300 !z-5 relative rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] undefined">
           <div className="h-full w-full">
               <div className="relative w-full">
                   <img src={nftData?.image} className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt=""/>
               </div>
                   <div className="mb-2 flex justify-center items-center flex-col">
                       <p className="text-2xl font-bold text-navy-700"> {nftData?.name}</p>
                       <div className="flex items-center justify-between md:items-center lg:justify-between ">
                   </div>
                   </div>
           </div>
       </div>
   </div>
    )}
    </>
  );
};
