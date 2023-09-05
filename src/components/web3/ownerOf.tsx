import axios from 'axios';
import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useNFTFunctionReader, useNFTFunctionwriter } from '../../hook';
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

    const { writeAsync, data:transfer } = useNFTFunctionwriter(
      "transferFrom",
      [address, recipientAddress, projectID]
    );
    let { isLoading, isSuccess } = useWaitForTransaction({
      hash: transfer?.hash,
    });

    const { writeAsync:burnToken, data:burn } = useNFTFunctionwriter(
      "burnNft",
      [tokenId]
    );
    let { isLoading:burnLoader, isSuccess:burnSuccess } = useWaitForTransaction({
      hash: transfer?.hash,
    });
    const handleBurnButtonClick = useCallback((e:any) => {
      let value = e.currentTarget.parentElement?.getAttribute("key");
      if (value) {
        setTokenId(value.toString());
      }
    }, []);
  
    useEffect(() => {
      console.log(tokenId);
    }, [handleBurnButtonClick]);
    // const handleBurnButtonClick = (e:React.MouseEvent<HTMLElement>) => {
    //   let value = e.currentTarget.parentElement?.getAttribute("key");
    //   if (value) {
    //     setTokenId(value.toString());
    // }
    // }

    // useEffect(()=>{
    //   console.log(tokenId)
    // },[handleBurnButtonClick])

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
  <>
  {nftData !== null &&
    <div className="flex flex-col justify-center items-center">
            <div className="bg-purple-300 !z-5 relative rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] undefined">
                <div className="h-full w-full">
                    <div className="relative w-full">
                        <img src={nftData?.image} className="mb-3 h-40 w-full rounded-xl 3xl:h-full 3xl:w-full" alt=""/>
                    </div>
                        <div className="mb-2 flex justify-center items-center flex-col">
                            <p className="text-2xl font-bold text-navy-700"> {nftData?.name}</p>
                            {/* <p className="text-2xl font-bold text-navy-700">{nftData?.description}</p> */}
                            <div className="flex items-center justify-between md:items-center lg:justify-between mt-4">
                            <button  className="  bg-yellow-200 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-brand-800 active:bg-brand-700">Transfer NFT</button>
                            <button  className=" ml-3 bg-red-400 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-brand-800 active:bg-brand-700" onClick={ handleBurnButtonClick}>Burn NFT</button>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    }
  </>
  );
}

