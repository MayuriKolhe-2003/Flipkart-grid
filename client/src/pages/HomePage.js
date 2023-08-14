import React, { useEffect } from "react";

import { Box, makeStyles } from "@material-ui/core";

import Navbar from "../components/Navbar";
import HomeBanner from "../components/header/HomeBanner";
import PosterRow from "../components/PosterRow";
import FeaturedBrandsRow from "../components/FeaturedBrandsRow";
import ProductRow from "../components/product/ProductRow";
import Footer from "../components/footer/Footer";
import erc20abi from "./ERC20abi.json";
import { setSpCoin } from "../actions/userActions";


import { featuredBrandLinks, posterLinks, sidePosterLink  } from "../constants/data";

import "../styles/HomePage.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  homePage: {
    marginTop: 60,
  },
});
function HomePage() {
  const classes = useStyles();
  const ethers = require('ethers');
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  useEffect(() => {
    getCoin()
  }, [])

  const getCoin = async() => {
    if (isAuthenticate){
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract("0x35af617fF01Fd4c6990572C64FF1Ba838D7EEdFC", erc20abi, provider);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const balancewei = await erc20.balanceOf(signerAddress);
      const balance = ethers.formatEther(balancewei,18);
      console.log(balance);
      setSpCoin(balance);

    }
  }

  
  
  return (
    <Box className={classes.homePage}>
      <Navbar />
      <HomeBanner />
      <div className="first_productRow">
        <ProductRow
          isFirstRow={true}
          categoryName="top_offers"
          title="Top Offers"
          subTitle="Deals Refresh Every 24 Hours"
        />
        <div style={{ padding: 1, backgroundColor: "#ffffff", cursor:"pointer" }}>
          <img
            src={sidePosterLink}
            alt="Ads"
            className="ads_banner"
          />
        </div>
      </div>
      {/* <PosterRow
        imgUrls={posterLinks.links1}
      /> */}
      <PosterRow
        imgUrls={posterLinks.links2}
      />
      <ProductRow
        title="Top Deals"
        categoryName="top_deals"
        subTitle="Daily crazy deals"
      />
      <PosterRow
        imgUrls={posterLinks.links3}
      />
      <ProductRow title="Mobiles" categoryName="mobile" />
      <PosterRow
        imgUrls={posterLinks.links4}
      />
      <FeaturedBrandsRow
        brandsUrls={featuredBrandLinks.links1}
      />
      <ProductRow title="Electronics" categoryName="electronic" />
      <PosterRow
        imgUrls={posterLinks.links5}
      />
      <ProductRow title="Appliances" categoryName="appliances" />
      <PosterRow
        imgUrls={posterLinks.links6}
      />
      <FeaturedBrandsRow
        brandsUrls={featuredBrandLinks.links2}
      />
      <ProductRow title="Furniture" categoryName="furniture" />
      <Footer/>
    </Box>
  );
}

export default HomePage;
