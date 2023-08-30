import { useNFTFunctionReader } from "../hook";
import { isAddress } from "viem";
import { useState, ChangeEvent, MouseEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function OwnerOf() {
    
  const [getAddress, setAddress] = useState("");
  const isAddressEmpty = getAddress === "";

  const { data } = useNFTFunctionReader({
    functionName: "balanceOf",
    args: [getAddress],
  });

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputvalue = e.target.value;
    console.log("URI", inputvalue);
    setAddress(inputvalue);
  };


  const handleFunction = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!isAddressEmpty) {
        if (isAddress(getAddress)) {
          // Valid Ethereum address, proceed with the function call and toast
          console.log("tx >>> ", data?.toString());
          toast.success(`NFT COUNT ${data?.toString()}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Invalid Ethereum address
          console.log("Invalid Ethereum address");
          toast.error("Invalid Ethereum address", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        }
      } else {
        // No address inserted
        console.log("No address inserted");
        toast.error("Cannot check Zero Address", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
    } catch (error) {
      console.log("error >>> ", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <input
          style={{ height: 40 }}
          placeholder="Input Address"
          required
          onChange={handleAddress}
        />
        <button
          type="button"
          onClick={handleFunction}
        >
          BalanceOf
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

export default OwnerOf;
