import {useContractRead,useContractWrite} from "wagmi";
import abi from "./abis/0x620a2c1F8525219058938f613fD57339Efca4862.json";
import type {NFT} from "./contract-types/NFT"

const address="0x620a2c1F8525219058938f613fD57339Efca4862";

export function useNFTcontract():NFT{
    const contract=useContractWrite({
        address:address,
        abi:abi,
    });
    return contract as unknown as NFT;
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
    });
  
    return contractRead;
  }
