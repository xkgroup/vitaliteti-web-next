import React from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import Footer from "../../components/Footer";
import Content from "./components/content";

const Article = ({params}) => {
    return (
        <div className="homepage-container">
            <div className="HomepageMobileHeader">
                <HeaderMobile />
            </div>
            <div className="HomepageHeader">
                <Header />{" "}
            </div>
            <Content params={params} />
            <Footer />
        </div>
    );
};

export default Article;
