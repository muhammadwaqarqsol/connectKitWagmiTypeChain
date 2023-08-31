import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useNFTFunctionwriter } from "../hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransferNFT() {
  const {address}=useAccount(); 
  const [tokenId, setTokenId] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<boolean>(false);

  const { writeAsync, data, isError } = useNFTFunctionwriter(
    "transferFrom",
    [address, recipientAddress, tokenId]
  );
  let { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleTokenIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTokenId = parseInt(e.target.value);
    setTokenId(inputTokenId);
  };

  const handleRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputAddress = e.target.value;
    setRecipientAddress(inputAddress);
    setAddressError(false); // Clear address error when user starts typing
  };

  const handleTransfer = async (e: MouseEvent<HTMLButtonElement>) => {
    if (recipientAddress === "") {
      setAddressError(true);
      return;
    }

    try {
      e.preventDefault();
      const tx = await writeAsync?.();
      console.log("tx >>> ", tx);
    } catch (error) {
      console.log("error >>> ", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      isSuccess = false;
      toast.success("NFT Transferred Successfully", {
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
        <input
          style={{ height: 40 }}
          type="number"
          placeholder="Input Token ID"
          required
          onChange={handleTokenIdChange}
        />
        <input
          style={{ height: 40 }}
          placeholder="Recipient Address"
          required
          onChange={handleRecipientAddressChange}
        />
        <button
          type="button"
          disabled={isLoading}
          onClick={handleTransfer}
        >
          {isLoading ? "Please Wait" : "Transfer NFT"}
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
        theme="light" />
    </div>
  );
}

export default TransferNFT;
