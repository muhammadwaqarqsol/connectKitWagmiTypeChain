import {NFT} from "../../contract-types/NFT"
import {useNFTFunctionReader} from "../../hook";

export function useTotalTokenId(): number {
    const totalTokenId = useNFTFunctionReader({
        functionName: "_tokenIds"
    });
    const _tokenIds: Awaited<ReturnType<NFT["_tokenIds"]>> | undefined = totalTokenId.data as Awaited<ReturnType<NFT["_tokenIds"]>>;

    if (_tokenIds === undefined) {
        throw new Error("TotalTokenId is undefined"); // You can handle this error in your code as needed
    }

    return parseInt(_tokenIds.toString()) as number;
}
