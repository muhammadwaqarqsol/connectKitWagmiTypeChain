import axios,{AxiosRequestConfig} from 'axios';
const key="857f402a550d0272035b";
const secret="aca191b370b08376bcf458f90468a91b24613a52fd0fabd4918507b709c9a563";
const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMzM4Yzc5Ny0yMTFiLTQ5YjQtODY1Yi03YWM0MTA5NmU1N2EiLCJlbWFpbCI6ImFiZHVsMTk3N2doYWZmYXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijg1N2Y0MDJhNTUwZDAyNzIwMzViIiwic2NvcGVkS2V5U2VjcmV0IjoiYWNhMTkxYjM3MGIwODM3NmJjZjQ1OGY5MDQ2OGE5MWIyNDYxM2E1MmZkMGZhYmQ0OTE4NTA3YjcwOWM5YTU2MyIsImlhdCI6MTY5MzU2OTA2MH0.v73t0Tln0tKnA3Iv30YWLgwi5Q45yhQ8_Q1RK81TpFA";
async function metaData(nftTitle:string,NftDescription:string ,IpfsHash:string) {
  try {
    const data = JSON.stringify({
      pinataOptions: {
        CidVersion: 1,
      },
      pinataMetaData: {
        name: `${nftTitle}`,
      },
      pinataContent:{
        name: nftTitle,
        description: NftDescription,
        image : `https://ipfs.io/ipfs/${IpfsHash}`,
      }
    });

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${JWT}`,
      },
      data: data,
    };

    const MetadataRes = await axios(config);
    return MetadataRes.data.IpfsHash
  } catch (error) {
    console.error("Error in metaData function:", error);
  }
}
export default metaData;