import {NFT} from "./contract-types/NFT";
import {useNFTFunctionReader} from "./hook";

export function useTotalTokenId(): number | undefined {
    const totalTokenId = useNFTFunctionReader({
        functionName: "_tokenIds"
    });
    const _tokenIds: Awaited<ReturnType<NFT["_tokenIds"]>> | undefined = totalTokenId.data as Awaited<ReturnType<NFT["_tokenIds"]>>;
    
    console.log("TokenID: ", _tokenIds?.toString());

    if (_tokenIds === undefined) return undefined;

    return parseInt(_tokenIds.toString()) as number;
}

export function getTokenUri(index: number): string | undefined {
    const getUriResult = useNFTFunctionReader({
        functionName: "tokenURI",
        args: [index.toString()],
    });

    const tokenUriData: Awaited<ReturnType<NFT["tokenURI"]>> | undefined = getUriResult.data as Awaited<ReturnType<NFT["tokenURI"]>>;

    console.log("Token URI: ", tokenUriData?.toString());

    if (tokenUriData === undefined) return undefined;

    return tokenUriData.toString(); // No need to cast to string again
}



export function getOwnerOF(index: number): string | undefined {
    const getOwner = useNFTFunctionReader({
        functionName: "ownerOf",
        args: [index.toString()],
    });

    const tokenOwnerData: Awaited<ReturnType<NFT["ownerOf"]>> | undefined = getOwner.data as Awaited<ReturnType<NFT["ownerOf"]>>;

    console.log("Owner OF: ", tokenOwnerData?.toString());

    if (tokenOwnerData === undefined) return undefined;

    return tokenOwnerData.toString(); // No need to cast to string again
}


export function getBalanceOf(index: string ): string | undefined {
    const getBalance = useNFTFunctionReader({
        functionName: "balanceOf",
        args: [index],
    });

    const tokenBalance: Awaited<ReturnType<NFT["balanceOf"]>> | undefined = getBalance.data as Awaited<ReturnType<NFT["balanceOf"]>>;

    console.log("Token Balance: ", tokenBalance?.toString());

    if (tokenBalance === undefined) return undefined;

    return tokenBalance.toString(); // No need to cast to string again
}

//tokenURI tokenID
//ownerof tokenID
//balanceof address
