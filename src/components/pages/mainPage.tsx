import React from 'react'

export const MainPage = () => {
  return (
    <div className=" font-sans">
    {/* Visual Section */}
    <section className=" flex-col p-8 rounded-lg shadow-md flex items-center space-x-8">
        {/* Image */}
        <img src="logo.png" alt="Main Visual" className="w-3/2 rounded-lg" />

        {/* Content */}
        <div className="w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold mb-2 italic mt-2">Discover Unique NFTs</h2>
            <p className="text-gray-700 text-2xl text-center">
                Explore our exclusive collection of NFTs from digital artists and creators worldwide. 
                Mint,Transfer and showcase your favorite digital assets.
            </p>
        </div>
    </section>

    <div className="flex fcenterlex-row justify-center items-stretch">
    {/* Image Box */}
    <div className="flex flex-col justify-center items-center m-4">
        <div className="!z-5 relative rounded-[20px] max-w-[500px] max-h-[500px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white outline-dashed undefined">
            <div className="h-full w-full">
                <div className="relative w-full">
                    <img src="bird.jpg" className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full " alt="Legendary Bird"/>
                </div>
                <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-navy-700">Trio Birds </p>
                        <p className="text-lg mt-1 font-medium text-gray-600 md:mt-2">Pokemon Legendary Trio Birds.</p>
                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 ">By {("0xEdb8373211332CC6F141CEBB7B8587C7CFb68243").slice(0,8)}...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Text Box Section */}
    <section className="mt-4 flex justify-center items-center flex-col">
        <h2 className="text-3xl font-semibold mb-2 italic">About NFTrops</h2>
        <p className="text-gray-700 text-2xl text-center">
            <span style={{ fontSize: '2rem' }}>NFTrops is your premier destination </span><br />
            <span style={{ fontSize: '2rem' }}>for discovering, Minting, Showcasing</span><br />
            <span style={{ fontSize: '2rem' }}>and Transfering unique NFTs.</span>
        </p>
        <section className="mt-4 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold mb-2 italic">How It Works</h2>
            <p className='text-gray-700 text-2xl text-center'>
            <span style={{ fontSize: '2rem' }}>Connect Wallet meta mask or any Evm Wallet</span><br />
            <span style={{ fontSize: '2rem' }}>Go to My Nfts to see your own Nfts</span><br />
            <span style={{ fontSize: '2rem' }}>Transfer Nfts from MyNft tab</span><br />
            <span style={{ fontSize: '2rem' }}>Go to Listed Nfts to see all NFts listed</span><br />
            <span style={{ fontSize: '2rem' }}>Showcase your digital assets</span></p>
        </section>
    </section>
</div>



</div>
    )
}
