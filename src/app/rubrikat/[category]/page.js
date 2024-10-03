'use client'
import React from "react";
import HeaderMobile from "../../components/HeaderMobile";
import Header from "../../components/Header";
import Content from "../components/content";
import Footer from "../../components/Footer";

const Rubrikat = ({params}) => {
    return (
        <div className="homepage-container">
            <div className="HomepageMobileHeader">
                <HeaderMobile />
            </div>
            <div className="HomepageHeader">
                <Header />
            </div>
            <Content params={params} />
            <Footer />
        </div>
    );
};

export default Rubrikat;
