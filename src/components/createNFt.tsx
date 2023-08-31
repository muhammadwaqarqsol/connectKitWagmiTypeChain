import { useWaitForTransaction } from "wagmi";
import { useNFTFunctionwriter } from "../hook";
import { useState, type ChangeEvent,type MouseEvent, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateNFT() {
    const [tokenUri, setTokenUri] = useState<string>("");
    const [getAddress,setAddress]=useState<String>("");
    const [uriError, setUriError] = useState<boolean>(false);
    const [addressError, setAddressError] = useState<boolean>(false);


    const { writeAsync,data, isError } = useNFTFunctionwriter(
      "createToken",
      [getAddress,tokenUri]
    );

    let { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      });
      
    const handlevalue=(e:ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
      const inputvalue=e.target.value;
      console.log("URI",inputvalue);
      setTokenUri(inputvalue);
      setUriError(false); // Clear URI error when user starts typing
    }
    const handleAddress=(e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const inputvalue=e.target.value;
        console.log("URI",inputvalue);
        setAddress(inputvalue);
        setAddressError(false); // Clear address error when user starts typing
      }
      const handlemint = async (e: MouseEvent<HTMLButtonElement>) => {
        // Check for empty URI and address
        if (tokenUri === "" || getAddress === "") {
        if (tokenUri === "") {
          setUriError(true);
        }
        if (getAddress === "") {
          setAddressError(true);
        }
        toast.error("Cannot mint empty Address or URI", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        return;
      }
        
        try {
          e.preventDefault();
          const tx = await writeAsync?.();
          console.log("tx >>> ", tx);
        } catch (error) {
          console.log("errror >>> ", error);
        }
      };

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
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column"}}>
       <input
              style={{ height: 40 }}
              placeholder="Input uri"
              required
              onChange={handlevalue}
            ></input>
             <input
              style={{ height: 40 }}
              placeholder="Input Address"
              required
              onChange={handleAddress}
            ></input>
             <button
            type="button"
            disabled={isLoading}
            onClick={handlemint}
            >
        {isLoading ? "Please Wait" : "Mint NFT"}
          </button>
       </div>
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
      </div>
    );
  }
  
  export default CreateNFT;