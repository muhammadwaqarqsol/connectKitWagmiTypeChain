import {getBalanceOf,getOwnerOF,getTokenUri} from "../read"

export type NFTinfoProps = {
  nftid: number;
};

function NFTinfo({ nftid }: NFTinfoProps) {
  console.log("NFTID: ", nftid);
  const getOwner=getOwnerOF(nftid);
  const tokenuri=getTokenUri(nftid);
  let balance;

  if (getOwner !== undefined) {
    const getBalance=getBalanceOf(getOwner);
    balance=getBalance;
    console.log({
      getOwner,
      tokenuri,
      getBalance
    });
  }
  if (
    !getOwner ||
    !tokenuri ||
    !balance 
  ) {
    return null;
  }
  return(
    <>
    <div>
      <span>ownerOf: {getOwner}</span>
      <br/>
      <span>TokenURI: {tokenuri}</span>
      <br/>
      <span>BalanceOf: {balance}</span>
    </div>
    </>
  )
}

export default NFTinfo;





