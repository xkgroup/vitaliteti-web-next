import React from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import Footer from "../../components/Footer";
import Content from "./components/content";

export async function generateMetadata({params}) {
    const {slug} = params;
    const response = await fetch(
        `https://cms.vitaliteti.com/api/articles?filters[slug][$eq]=${slug}&populate=image`,
        {
            headers: {
                Authorization: "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
            },
        }
    );
    const data = await response.json();

    const articleData = data.data[0].attributes;
    const baseUrl = "https://cms.vitaliteti.com";
    const imageUrl = articleData.image?.data?.attributes?.url
        ? baseUrl + articleData.image.data.attributes.url
        : null;
    return {
        title: articleData.title,
        description:articleData.title,
        images: [imageUrl],
        openGraph: {
            title: articleData.title,
            description:articleData.title,
            images: [imageUrl]
        },
        twitter: {
            title: articleData.title,
            description:articleData.title,
            images: [imageUrl]
        },
    }
}

const Article = ({params}) => {
    return (
        <div className="homepage-container">
            <div className="HomepageMobileHeader">
                <HeaderMobile/>
            </div>
            <div className="HomepageHeader">
                <Header/>{" "}
            </div>
            <Content params={params}/>
            <Footer/>
        </div>
    );
};

export default Article;
