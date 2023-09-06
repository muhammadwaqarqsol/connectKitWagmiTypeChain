import {useContractRead,useContractWrite} from "wagmi";
import { NFTv1 } from "../../contract-types";
import abi from "../../abis/0x68377b4BDf3b1E4804D15E81774c5398A670E5eE.json"
const address="0x68377b4BDf3b1E4804D15E81774c5398A670E5eE";

export function useNFTcontract():NFTv1{
    const contract=useContractWrite({
        address:address,
        abi:abi,
    });
    return contract as unknown as NFTv1;
}

export function useNFTFunctionwriter(
    functionName:string,
    args?:any[]
):ReturnType<typeof useContractWrite>{
    const contractWrite = useContractWrite({
        address: address,
        abi: abi,
        functionName: functionName,
        args:args,
      });
    
      return contractWrite;
}

export interface UseNFTFunctionReaderProps {
    functionName: string;
    args?: String[];
  }
  // create a generic hook to access read functions of contract
  export function useNFTFunctionReader({
    functionName,
    args , // Default to an empty array if 'args' is not provided
  }: UseNFTFunctionReaderProps): ReturnType<typeof useContractRead> {
    const contractRead = useContractRead({
      address: address,
      abi: abi,
      functionName: functionName,
      args: args,
      watch: true,
      onError(error){
      }
    });
  
    return contractRead;
  }
