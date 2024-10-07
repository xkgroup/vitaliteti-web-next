import React from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import Footer from "../../components/Footer";
import Content from "./components/content";
import ThemeContextProvider from "@/app/components/themeContext";
import Head from "next/head";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const response = await fetch(
    `https://cms.vitaliteti.com/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    {
      headers: {
        Authorization:
          "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
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
    description: articleData.title,
    images: [imageUrl],
    openGraph: {
      title: articleData.title,
      description: articleData.title,
      images: [imageUrl],
    },
    twitter: {
      title: articleData.title,
      description: articleData.title,
      images: [imageUrl],
    },
  };
}

const Article = ({ params }) => {
  return (
    <ThemeContextProvider>
      <Head>
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PC7G83EB7E"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PC7G83EB7E');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1067667051620490');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1067667051620490&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
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
    </ThemeContextProvider>
  );
};

export default Article;
