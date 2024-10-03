import React from "react";
import Header from "../components/Header";
import Content from "./components/content";
import Footer from "../components/Footer";
import HeaderMobile from "../components/HeaderMobile";

const Search = () => {
    return (
        <div className="homepage-container">
            <div className="HomepageMobileHeader">
                <HeaderMobile />
            </div>
            <div className="HomepageHeader">
                <Header />
            </div>{" "}
            <Content />
            <Footer />
        </div>
    );
};

export default Search;
