import { Navbar } from './components/navbar';
import { Routes,Route } from 'react-router-dom';
import MintNft from "./components/pages/MintNft";
import { MyNfts } from './components/pages/MyNfts';
import { MainPage } from './components/pages/mainPage';
import { NftListing } from './components/pages/NftListing';
function App() {
  return (<>
  <head> 
  <title>NFTrops</title>
  </head>
    <div className="relative min-h-screen">
     <Navbar />
     <Routes>
      <Route path="/" element={<MainPage />} ></Route>
      <Route path='/MintNft' element={<MintNft/>}></Route>
      <Route path='/MyNfts' element={<MyNfts/>}></Route>
      <Route path='/ListedNfts' element={<NftListing />}></Route>
     </Routes>
    </div></>
  );
}

export default App;
