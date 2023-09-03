import axios from "axios";
const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMzM4Yzc5Ny0yMTFiLTQ5YjQtODY1Yi03YWM0MTA5NmU1N2EiLCJlbWFpbCI6ImFiZHVsMTk3N2doYWZmYXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijg1N2Y0MDJhNTUwZDAyNzIwMzViIiwic2NvcGVkS2V5U2VjcmV0IjoiYWNhMTkxYjM3MGIwODM3NmJjZjQ1OGY5MDQ2OGE5MWIyNDYxM2E1MmZkMGZhYmQ0OTE4NTA3YjcwOWM5YTU2MyIsImlhdCI6MTY5MzU2OTA2MH0.v73t0Tln0tKnA3Iv30YWLgwi5Q45yhQ8_Q1RK81TpFA";
async function ImageUploader(ipfsArray:any,fileName:string) {
  const formData = new FormData();
    formData.append('file', ipfsArray)

    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
  try{
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${ipfsArray._boundry}`,
        Authorization:  `Bearer ${JWT}`
      }
    });
    const data = res.data;
    return data.IpfsHash;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default ImageUploader;
