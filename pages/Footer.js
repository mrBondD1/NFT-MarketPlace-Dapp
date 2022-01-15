import React from 'react'

const Footer = () => {
    return (
      <div
        style={{
          background:
            "linear-gradient(94deg, rgba(233,161,233,1) 0%, rgba(125,227,240,1) 100%)",
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 24,
            fontWeight: 600,
            textAlign: "center",
            margin: "2rem auto",
            padding: "6rem 4rem 3rem",
            textDecoration: "underline",
          }}
        >
          <h2>Create and sell your NFTs</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 2rem 4rem",
            fontFamily: "serif",
            fontSize: 18,
            fontWeight: 500,
            color: "rgb(63, 62, 62)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              paddingRight: "1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="https://opensea.io/static/images/icons/wallet.svg"
              alt="icon"
              style={{
                width: "2.5rem",
                margin: "0 auto",
                paddingBottom: "1rem",
              }}
            />
            <h2
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: 20,
                paddingBottom: "1rem",
              }}
            >
              Set up your wallet
            </h2>
            <p>
              Once you’ve set up your wallet of choice, connect it to Cryplistic
              by clicking the wallet icon in the top right corner. Currently
              we're supporting MetaMask wallet only!
            </p>
          </div>
          <div
            style={{
              width: "50%",
              paddingRight: "1.5rem",
            }}
          >
            <img
              src="https://opensea.io/static/images/icons/collection.svg"
              alt="icon"
              style={{
                width: "2.5rem",
                margin: "0 auto",
                paddingBottom: "1rem",
              }}
            />
            <h2
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: 20,
                paddingBottom: "1rem",
              }}
            >
              Create your collection
            </h2>
            <p>
              Click Sell Digital Assets and set up your collection. Add social
              links, a description, profile & banner images, and set a secondary
              sales fee.
            </p>
          </div>
          <div
            style={{
              width: "50%",
              paddingRight: "1.5rem",
            }}
          >
            <img
              src="https://opensea.io/static/images/icons/nft.svg"
              alt="icon"
              style={{
                width: "2.5rem",
                margin: "0 auto",
                paddingBottom: "1rem",
              }}
            />
            <h2
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: 20,
                paddingBottom: "1rem",
              }}
            >
              Add your NFTs
            </h2>
            <p>
              Upload your work (image, video, audio, or 3D art), add a title and
              description, and customize your NFTs with properties, stats, and
              unlockable content.
            </p>
          </div>
          <div
            style={{
              width: "50%",
              paddingLeft: "1.5rem",
            }}
          >
            <img
              src="https://opensea.io/static/images/icons/sale.svg"
              alt="icon"
              style={{
                width: "2.5rem",
                margin: "0 auto",
                paddingBottom: "1rem",
              }}
            />
            <h2
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: 20,
                paddingBottom: "1rem",
              }}
            >
              List them for sale
            </h2>
            <p>
              Choose between auctions, fixed-price listings, and declining-price
              listings. You choose how you want to sell your NFTs, and we help
              you sell them!
            </p>
          </div>
        </div>
        <div
          className="flex justify-between pb-10"
          style={{
            margin: "0rem 5rem",
            borderTop: "1px solid grey",
            borderBottom: "1px solid grey",
          }}
        >
          <div
            style={{
              marginRight: "8rem",
              padding: "0 5rem",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <h2 className="text-2xl font-bold pb-5 pt-20 underline">
              Cryplistic MarketPlace
            </h2>
            <p
              className="text-2xl"
              style={{
                fontWeight: 600,
                color: "rgb(76, 76, 80)",
              }}
            >
              The world’s secure and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items 🚀
            </p>
            <p className='font-semibold'>© 2022 -  Bandhan Dey</p>
          </div>
          <div
            style={{
              //   marginRight: "8rem",
              padding: "0 5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 className="text-2xl font-bold pb-5 pt-20 underline">
              MarketPlace
            </h2>
            <a href="" className="text-xl pb-2 hover:underline  duration-75">
              All NFTs
            </a>
            <a href="" className="text-xl pb-2 hover:underline  duration-75">
              Sell Digital Assets
            </a>
            <a href="" className="text-xl pb-2 hover:underline  duration-75">
              My Digital Assets
            </a>
            <a href="" className="text-xl pb-2 hover:underline  duration-75">
              Creator Dashboard
            </a>
          </div>
        </div>
      </div>
    );
}

export default Footer
