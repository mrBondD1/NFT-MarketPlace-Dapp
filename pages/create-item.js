import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Particles from "react-tsparticles";


const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() { 
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

   const particlesInit = (main) => {
     console.log(main);

     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
   };

   const particlesLoaded = (container) => {
     console.log(container);
   };

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
}
  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  }
  
 return (
   <div
     className="flex justify-center"
     style={{
       height: "100%",
     }}
   >
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
     <div className="w-1/2 flex flex-col pb-12">
       <input
         placeholder="Asset Name"
         className="mt-8 border rounded p-4 form-input"
         onChange={(e) =>
           updateFormInput({ ...formInput, name: e.target.value })
         }
       />
       <textarea
         placeholder="Asset Description"
         className="mt-2 border rounded p-4 form-input"
         onChange={(e) =>
           updateFormInput({ ...formInput, description: e.target.value })
         }
       />
       <input
         placeholder="Asset Price in Eth"
         className="mt-2 border rounded p-4 form-input"
         onChange={(e) =>
           updateFormInput({ ...formInput, price: e.target.value })
         }
       />
       <input type="file" name="Asset" className="my-4 " onChange={onChange} />
       {fileUrl && (
         <img className="file rounded mt-4" width="350" src={fileUrl} />
       )}
       <button
         onClick={createMarket}
         className="font-bold mt-4 bg-blue-700 text-white rounded p-4 shadow-lg"
       >
         Create Digital Asset
       </button>
     </div>
   </div>
 );
}