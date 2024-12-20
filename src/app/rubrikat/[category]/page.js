"use client";
import React from "react";
import HeaderMobile from "../../components/HeaderMobile";
import Header from "../../components/Header";
import Content from "../components/content";
import Footer from "../../components/Footer";
import ThemeContextProvider from "@/app/components/themeContext";
import Head from "next/head";

const Rubrikat = ({ params }) => {
  return (
    <ThemeContextProvider>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PC7G83EB7E"
        ></script>
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
        <Content params={params} />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
};

export default Rubrikat;
