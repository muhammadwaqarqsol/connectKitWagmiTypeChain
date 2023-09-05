import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import '../utils/uploader.css';
import ImageUploader from '../utils/ImageUploader';
import metaData from '../utils/Metadata';
import { useNFTFunctionwriter } from "../../hook";
import { useAccount, useWaitForTransaction } from 'wagmi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Uploader() {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const {address,isConnected}=useAccount(); 
  const [tokenUri, setTokenUri] = useState<string>("");
  // const [isfuncLoading, setIsLoading] = useState(false); // Loading state for the entire process

  //showing user Selected Image
  const [selectedImage, setSelectedImage] = useState<File | null>(); // To store the selected image URL
  //storing input data 
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //IMAGE nft name
  const [getNftDetails,setNftDetails]=useState({
    NftName:"",
    Description:""
  });
  
  // // Function to handle removing the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageSelected(false); 
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
   if(isConnected){ const file = e.target.files && e.target.files[0];
  
    if (file?.type === "image/png") {
      // Set the selected image to the file object
      setSelectedImage(file);
      setIsImageSelected(true); 
    } else {
      setSelectedImage(null);
      setIsImageSelected(false); 
      // Clear the selected image if it's not a valid PNG file
    }}
  };
  
  const { writeAsync,data } = useNFTFunctionwriter(
    "createToken",
    [address,tokenUri]
  );

  let {isLoading,isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  
  const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
    setNftDetails({
      ...getNftDetails,
      [e.target.name]:e.target.value,
    });
  }

  const handleUpload=async()=>{
    try{
    // setIsLoading(true);
    const uploadImages= await ImageUploader(selectedImage,getNftDetails.NftName);
    const metadatares=await metaData(getNftDetails.NftName,getNftDetails.Description,uploadImages);
    let TokenUri =`https://ipfs.io/ipfs/${metadatares}`;
    setTokenUri(TokenUri);
    console.log(TokenUri);
    if(tokenUri!==""){     
    const tx=await writeAsync?.();
    console.log("Transaction",tx?.hash);}
    // setIsLoading(false); 
  }catch(error){
    // setIsLoading(false);
  }
  } 

  useEffect(() => {
    // Check if both fields are filled
    setIsFormValid(getNftDetails.NftName.trim() !== "" &&
    getNftDetails.Description.trim() !== "" &&
    isImageSelected );
  }, [getNftDetails,isImageSelected]);


  useEffect(() => {
    if (isSuccess) {
      isSuccess=false;
      toast.success("NFT Created Successfully ",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(data, "Data");
    }
  }, [isSuccess]);

  return (
    <main className='flex justify-center flex-col items-center mt-16'>
      {!isConnected && (
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 mb-6">
      Please connect to your account to select a photo.
    </div>
    )}
      <form onClick={() => fileInputRef.current?.click()}>
        <div className="image-container">
          {selectedImage && (
            <div className='flex justify-center flex-col items-center '>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="selected-image"
                style={{ maxWidth: '500px', maxHeight: '250px' }} // Adjust the size as needed
              />
              <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleRemoveImage}>Delete</button>
            </div>
          )}
        </div>
        {!selectedImage && (
          <div className='font-extrabold flex justify-center flex-col'>
            <input
              type="file"
              className="input-field"
              hidden
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <button>Browse Files To Upload</button>
            <p>Upload Only PNG files</p>
          </div>
        )}
      </form>
    <br></br>
    <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        NFT Name
      </label>
    </div>
    <div className="md:w-2/3">
      <input  type='text' 
        onChange={handleChange}
        name="NftName"  
        placeholder='insert NFT name' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-2" required/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        NFT Description
      </label>
    </div>
    <div className="md:w-2/3">
      <input onChange={handleChange}
         name="Description"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Description" required/>
    </div>
  </div>
  <button disabled={!isFormValid} className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-200" onClick={()=>handleUpload()}> {isLoading ? "Please Wait" : "Mint NFT"}</button>
  <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover={false}
         theme="light"/>
    </main>
  );
}

export default Uploader;
