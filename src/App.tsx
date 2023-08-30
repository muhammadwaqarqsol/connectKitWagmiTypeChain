import './App.css';
import { ConnectKitButton } from 'connectkit';
import CreateNFT from './components/createNFt';
import OwnerOf from './components/OwnerOf';

function App() {

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
     <ConnectKitButton showBalance/>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <CreateNFT />
      </div>
      <OwnerOf />
    </div>
  );
}

export default App;
