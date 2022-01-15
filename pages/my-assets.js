import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Particles from "react-tsparticles";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])

     const particlesInit = (main) => {
       console.log(main);

       // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
     };

     const particlesLoaded = (container) => {
       console.log(container);
     };

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <div>
        <h1
          className="py-10 px-20 text-center text-3xl"
          style={{
            fontFamily: "cambria",
            fontWeight: 700
          }}
        >
         Oho! No assets owned 👽
        </h1>
        <Particles
          style={{
            zIndex: 1,
          }}
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 800,
                  duration: 2,
                  opacity: 0.5,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#fff",
              },
              links: {
                color: "#000",
                distance: 150,
                enable: false,
                opacity: 0.2,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.9,
              },
              shape: {
                type: 'circle',
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
      </div>
    );

     return (
       <div className="flex justify-center">
         <Particles
           style={{
             zIndex: 1,
           }}
           id="tsparticles"
           init={particlesInit}
           loaded={particlesLoaded}
           options={{
             fpsLimit: 60,
             interactivity: {
               events: {
                 onClick: {
                   enable: true,
                   mode: "push",
                 },
                 onHover: {
                   enable: true,
                   mode: "repulse",
                 },
                 resize: true,
               },
               modes: {
                 bubble: {
                   distance: 800,
                   duration: 2,
                   opacity: 0.5,
                   size: 40,
                 },
                 push: {
                   quantity: 4,
                 },
                 repulse: {
                   distance: 200,
                   duration: 0.4,
                 },
               },
             },
             particles: {
               color: {
                 value: "#535151",
               },
               links: {
                 color: "#000",
                 distance: 150,
                 enable: false,
                 opacity: 0.2,
                 width: 1,
               },
               collisions: {
                 enable: true,
               },
               move: {
                 direction: "none",
                 enable: true,
                 outMode: "bounce",
                 random: false,
                 speed: 2,
                 straight: false,
               },
               number: {
                 density: {
                   enable: true,
                   area: 800,
                 },
                 value: 50,
               },
               opacity: {
                 value: 0.9,
               },
               shape: {
                 type: "circle",
               },
               size: {
                 random: true,
                 value: 5,
               },
             },
             detectRetina: true,
           }}
         />
         <div className="p-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
             {nfts.map((nft, i) => (
               <div
                 key={i}
                 className="border shadow rounded-xl overflow-hidden"
               >
                 <img src={nft.image} className="rounded" />
                 <div className="p-4 bg-black">
                   <p className="text-2xl font-bold text-white">
                     Price - {nft.price} Eth
                   </p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     );
}