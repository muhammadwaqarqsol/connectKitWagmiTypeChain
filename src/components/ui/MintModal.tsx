import React, { ChangeEvent, useState,useEffect } from "react";
import { useNFTFunctionwriter } from "../../hook";
import { useAccount, useWaitForTransaction } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  
  
export default function MintModal() {
    // Access the title prop and use it in your component

    const {address}=useAccount();
    const [showModal, setShowModal] = useState(false);

    

    // const handleChange =(e:ChangeEvent<HTMLButtonElement>)=>{

    //   }
    //   const handleTransfer=async()=>{
    //     try{
    //     // await writeAsync?.();
    //     }catch(error){
    //         toast.error("Error",{
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //           });
    //   }
    //   } 
    //   useEffect(() => {
    //     if (isSuccess) {
    //       isSuccess=false;
    //     //   setShowModal(false)
    //       toast.success("Nft transfered Successfully ",{
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       console.log(transfer, "Data");
    //     }
    //   }, [isSuccess]);
    return (
        <>
            <button
                className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-200"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Mint NFT
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        NFT transfer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto flex justify-center items-center flex-col">
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                Recepient Address
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input
                                                name="Description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Address" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
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
        </>
    );
}