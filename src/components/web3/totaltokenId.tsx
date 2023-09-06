import {NFTv1} from "../../contract-types/NFTv1"
import {useNFTFunctionReader} from "../utils/hook";

export function useTotalTokenId(): number | undefined{
    const totalTokenId = useNFTFunctionReader({
        functionName: "_tokenIds"
    });
    const _tokenIds: Awaited<ReturnType<NFTv1["_tokenIds"]>> | undefined = totalTokenId.data as Awaited<ReturnType<NFTv1["_tokenIds"]>>;

    if (_tokenIds === undefined) {
    return undefined;    
    }

    const tokenIdValue = parseInt(_tokenIds.toString()) as number;

    if (isNaN(tokenIdValue)) {
        return undefined; // Handle this error in your code as needed
    }

    return tokenIdValue;
}

