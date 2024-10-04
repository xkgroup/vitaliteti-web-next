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
      <Head>
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
