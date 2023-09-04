import {NFT} from "../../contract-types/NFT"
import {useNFTFunctionReader} from "../../hook";

export function useTotalTokenId(): number {
    const totalTokenId = useNFTFunctionReader({
        functionName: "_tokenIds"
    });
    const _tokenIds: Awaited<ReturnType<NFT["_tokenIds"]>> | undefined = totalTokenId.data as Awaited<ReturnType<NFT["_tokenIds"]>>;

    if (_tokenIds === undefined) {
        throw new Error("TotalTokenId is undefined"); // Handle this error in your code as needed
    }

    const tokenIdValue = parseInt(_tokenIds.toString()) as number;

    if (isNaN(tokenIdValue)) {
        throw new Error("TotalTokenId is not a valid number"); // Handle this error in your code as needed
    }

    return tokenIdValue;
}

