import React from "react";
import Header from "./components/Header";
import SectionOne from "./components/SectionOne";
import HeaderMobile from "./components/HeaderMobile";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import Footer from "./components/Footer";

const Homepage = () => {
  return (
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
  );
};

export default Homepage;
