// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import  NftUri from '../web3/getUri'; // Import the NftUri component
// import { useTotalTokenId } from '../web3/totaltokenId';
// interface NftData {
//   image: string;
//   name: string;
//   description: string;
//   // Add other properties as needed
// }
// export const ListedNfts = () => {
//   const totalTokens = useTotalTokenId();
//   const [nftDataList, setNftDataList] = useState<NftData[]>([]); // Initialize with an empty array
 
//   useEffect(() => {
//     const fetchData = async () => {
//       const nftDataArray = [];

//       for (let tokenId = 1; tokenId <= totalTokens; tokenId++) {
//         try {
//           const tokenURI = await NftUri({ nftid: tokenId }) as string;
//           const response = await axios.get(tokenURI); // Fetch data using Axios
//           const nftData = response.data;
//           nftDataArray.push(nftData);
//         } catch (error) {
//           console.error(`Error fetching data for token ${tokenId}:`, error);
//         }
//       }
//       setNftDataList(nftDataArray);
//     };

//     if (totalTokens) {
//       fetchData();
//     }
//   }, [totalTokens]);

//   if (!totalTokens) {
//     return <div>No Tokens Minted yet!</div>;
//   }

//   return (
//     <div className='flex justify-center flex-row'>
//       {nftDataList.map((nftData, index) => (
//         <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
//           <div className="p-4">
//             <img src={nftData.image} className="w-30 h-40 object-cover" alt="NFT" />
//             <div className="flex justify-center items-center flex-col">
//               <h1 className='text-2xl'>{nftData.name}</h1>
//               <p>{nftData.description}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNFTFunctionReader } from '../../hook';
import { useTotalTokenId } from '../web3/totaltokenId';

export const ListedNfts = () => {
  const totaltokens = useTotalTokenId();
  const [nftData, setNftData] = useState<any>(null); // Use "any" for nftData initially

  const { data } = useNFTFunctionReader({
    functionName: 'tokenURI',
    args: [totaltokens.toString()],
  });

  useEffect(() => {
    if (data) {
      // Make an Axios GET request to the data URL and update the state with the fetched data
      axios.get(data?.toString())
        .then((response) => {
          setNftData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [data]);

  if (!totaltokens) {
    return <div>No Tokens Minted yet!</div>;
  }

  return (
    <div className='flex justify-center flex-row'>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <img src={nftData?.image} className="w-30 h-40 object-cover" alt="NFT" />
          <div className="flex justify-center items-center flex-col">
            <h1 className='text-2xl'>{nftData?.name}</h1>
            <p>{nftData?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
