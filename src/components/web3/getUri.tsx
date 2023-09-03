import { useNFTFunctionReader } from "../../hook";

export type NFTinfoProps = {
    nftid: number;
  };

function NftUri({nftid}:NFTinfoProps){
    const { data } = useNFTFunctionReader({
        functionName: 'tokenURI',
        args: [nftid.toString()],
      });

      return data;
}

export default NftUri;