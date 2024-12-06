import React from "react";
import Head from "next/head";
import "@/app/globals.css";

export const metadata = {
  title: {
    template: "%s | Vitaliteti",
    default: "Unë jam Vlora, dhe doja të ndaja historinë time",
  },
  description:
    "Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës.",
  openGraph: {
    title: "Unë jam Vlora, dhe doja të ndaja historinë time",
    description:
      "Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës.",
    images: [
      {
        url: "https:/vitaliteti.com/custom-article/article.webp",
        width: 600,
        height: 600,
        alt: "Article Image",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unë jam Vlora, dhe doja të ndaja historinë time | Vitaliteti",
    description:
      "Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës.",
    images: ["https:/vitaliteti.com/custom-article/article.webp"],
  },
  metadataBase: new URL("https://example.com"),
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["Diet Aid", "Histori", "Peshë", "Ushqim", "Vetëbesim"],
  authors: [
    {
      name: "Vitaliteti",
    },
  ],
};

export default function Layout({ children, params }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
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
      <main>{children}</main>
    </>
  );
}
