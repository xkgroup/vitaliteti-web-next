import React from "react";
import Header from "./components/Header";
import SectionOne from "./components/SectionOne";
import HeaderMobile from "./components/HeaderMobile";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import Footer from "./components/Footer";
import ThemeContextProvider from "./components/themeContext";
import Head from "next/head";

const Homepage = () => {
  return (
    <ThemeContextProvider>
      <div className="homepage-container">
        <div className="HomepageMobileHeader">
          <HeaderMobile />
        </div>
        <div className="HomepageHeader">
          <Header />
        </div>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
};

export default Homepage;
