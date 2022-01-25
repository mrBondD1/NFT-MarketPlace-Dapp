import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import Header from './Header'
import Footer from './Footer'

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {


    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState("not-loaded");

      useEffect(() => {
        loadNFTs();
      }, []);

        const particlesInit = (main) => {
          console.log(main);

          // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        };

        const particlesLoaded = (container) => {
          console.log(container);
        };
  async function loadNFTs() {
          const provider = new ethers.providers.JsonRpcProvider();
          const tokenContract = new ethers.Contract(
            nftaddress,
            NFT.abi,
            provider
          );
          const marketContract = new ethers.Contract(
            nftmarketaddress,
            Market.abi,
            provider
          );
          const data = await marketContract.fetchMarketItems();

          const items = await Promise.all(
            data.map(async (i) => {
              const tokenUri = await tokenContract.tokenURI(i.tokenId);
              const meta = await axios.get(tokenUri);
              let price = ethers.utils.formatUnits(i.price.toString(), "ether");
              let item = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
              };
              return item;
            })
          );
          setNfts(items);
          setLoadingState("loaded");
        }


 async function buyNft(nft) {
   const web3Modal = new Web3Modal();
   const connection = await web3Modal.connect();
   const provider = new ethers.providers.Web3Provider(connection);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

   const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
   const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
     value: price,
   });
   await transaction.wait();
   loadNFTs();
 }

          if (loadingState === "loaded" && !nfts.length)
            return (
              <div
                className="border"
                style={{
                  marginTop: 0,
                }}
              >
                <Header />
                <div
                  style={{
                    borderTop: "1px solid white",
                    background: `linear-gradient(104deg, rgba(50,200,224,1) 0%, rgba(200,120,200,1) 100%)`,
                  }}
                >
                  <h1 className="text-center px-20 py-10 text-3xl font-semibold">
                    Opps! 😒
                  </h1>
                  <h1 className="text-center px-20 py-10 text-3xl font-semibold">
                    No items in the marketplace... ❌
                  </h1>
                  <p className="text-center px-20 py-10 text-xl font-semibold">
                    You can list your own NFTs for a less gas fee. Start Now! 👨‍💻
                  </p>
                </div>
                <Footer />
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
                        value: "#ffffff",
                      },
                      links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
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
              </div>
            );
  return (
    <div
      style={{
     background: "linear-gradient(0deg, rgba(117,230,193,1) 0%, rgba(112,145,200,1) 100%),"
        // margin: 0,
        // zIndex: 2,
      }}
    >
      <Header />
      <h1
        className="text-center px-20 py-5 text-3xl  "
        style={{
          fontSize: 24,
          fontFamily: "sans-serif",
          fontWeight: "700",
          color: "black",
          borderBottom: "1px solid white  ",
        }}
      >
        Collect your desired <span className="text-blue-700">NFTs</span>
      </h1>
      <div className="flex justify-center ">
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
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 2,
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
        <div className="px-4" style={{ maxWidth: "90vw" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-20 pb-20">
            {nfts.map((nft, i) => (
              <motion.div
                key={i}
                style={{
                  height: "56.5vh",
                  overflow: "hidden",
                  border: "2px solid white",
                }}
                className=" shadow rounded-xl overflow-hidden "
                // animate={{
                //   rotate: [0, 0, 180, 0],
                //   transition: {
                //     duration: 1,
                //   },
                // }}
                whileHover={{
                  position: "relative",
                  zIndex: 1,

                  scale: 1.07,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <img
                  src={nft.image}
                  style={{ height: "50%", width: "100%", overflow: "hidden" }}
                />
                <div className="p-4">
                  <p
                    style={{ height: "30px" }}
                    className="text-2xl font-semibold text-black"
                  >
                    {nft.name}
                  </p>
                  <div style={{ height: "20px", overflow: "hidden" }}>
                    <p>{nft.description}</p>
                  </div>
                </div>
                <div className="p-2 bg-black">
                  <p className="text-l mb-3  text-white">{nft.price} ETH</p>
                  <button
                    className="w-full bg-blue-600 text-white font-bold py-2 px-12 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
