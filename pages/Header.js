import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div
      style={{
        background: `linear-gradient(104deg, rgba(75,224,224,1) 0%, rgba(231,127,205,1) 100%)`,
        marginTop: 0,
      }}
    >
      <div className="header-main">
        <div className="header-bg">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0rem 2rem",
              height: "80vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                justifyContent: "center",
                padding: "0 2rem",
              }}
            >
              <h1
                className="text-5xl font-bold pb-10"
                style={{
                  fontFamily: "sans-serif",
                }}
              >
                Discover, collect, and sell extraordinary NFTs
              </h1>
              <p
                className="text-2xl"
                style={{
                  paddingRight: "9em",
                  color: "#2f4f4f",
                }}
              >
                <span className="font-bold">Cryplistic</span> is the world's
                secure and largest NFT marketplace
              </p>
              <div>
                <Link href="/my-assets">
                  <button
                    style={{
                      marginRight: "auto",
                      marginTop: "2rem",
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "10px 50px",
                      backgroundColor: "rgb(51, 93, 230)",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    Explore
                  </button>
                </Link>
                <Link href="/create-item">
                  <button
                    style={{
                      marginLeft: "1.5rem",
                      marginTop: "2rem",
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "10px 50px",
                      border: "1px solid rgb(51, 93, 230)",
                      borderRadius: "10px",
                      color: "rgb(51, 93, 230)",
                      backgroundColor: "white",
                    }}
                  >
                    Create
                  </button>
                </Link>
              </div>
            </div>
            <div
              style={{
                width: "50vw",
              }}
            >
              <img
                style={{
                  margin: "1rem auto",
                  width: "80%",
                  height: "70vh",
                  border: "1px solid black",
                  borderRadius: "15px",
                }}
                src="https://thevrsoldier.com/wp-content/uploads/2022/01/metaverse-crypto-coins-market-cap-thevrsoldier.jpg"
                alt="nft"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
