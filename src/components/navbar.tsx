import { ConnectKitButton } from 'connectkit'
import { Link } from 'react-router-dom'
import { useNFTFunctionReader } from './utils/hook';
import { useAccount } from 'wagmi';
export const Navbar = () => {
  const { address,isConnected } = useAccount();
  const addressString = address ? address.toString() : ''; // Use a default value if address is undefined

  const { data: Ownerof } = useNFTFunctionReader({
    functionName: 'balanceOf',
    args: [addressString],
  });


  return (
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    <Link to="/"><img src='./logo.png'className='h-12 w-30'></img></Link>
    </a>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <a className="mr-5 hover:text-gray-900"><Link to="/MintNft">Mint Nft</Link></a>
        <a className="mr-5 hover:text-gray-900"><Link to="/MyNfts">My Nfts</Link></a>
        <a className="mr-5 hover:text-gray-900"><Link to="/ListedNfts">Listed Nfts</Link></a>
      </nav>
      <div className='flex flex-row gap-6 justify-center items-center rounded-lg '>
      <div>{isConnected ? <p className='text-xl justify-center items-center bg-purple-300 rounded-3xl p-2'>Owned : {Ownerof?.toString()}</p> : null}</div>
      <ConnectKitButton showBalance />
      </div>
    </div>
  </header>
  )
}
