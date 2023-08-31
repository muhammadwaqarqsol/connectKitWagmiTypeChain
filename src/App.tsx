import { ConnectKitButton } from 'connectkit';
import CreateNFT from './components/createNFt';
import TransferNFT from './components/transferNft';
// import NFTInfo from './components/nftInfo';
import {useTotalTokenId} from "./read"
import NFTinfo from './components/nftInfo';
function App() {
  const totaltokens=useTotalTokenId();
  if (!totaltokens) {
    return <div >No Tokens Minted yet!</div>;
  }
  return (
    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"column"}}>
     <ConnectKitButton showBalance/>
      <CreateNFT />
      <TransferNFT />
      <div >
        {/* create an array starting from 0 index  */}
        {Array.from(Array(totaltokens).keys()).map(
          (tokenId: number, i) => {
            return (
              <div key={i}>
                <NFTinfo nftid={tokenId+1} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;
