"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import Footer from "../../components/Footer";
import ThemeContextProvider from "@/app/components/themeContext";
import Head from "next/head";
import Facebook from "./../../assets/ArticleFacebook.png";
import Twitter from "./../../assets/ArticleTwitter.png";
import CopyButton from "../components/copyButton";
import ReactModal from "react-modal";

import Image from "next/image";
import Link from "next/link";

const Article = ({ params }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(2);
  const [loading, setLoading] = useState(false); // Loading state
  const [orderSuccess, setOrderSuccess] = useState(false); // Order success state

  const handleModalOpen = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable body scrolling
  };

  const handleModalClose = () => {
    setModalOpen(false);
    document.body.style.overflow = ""; // Enable body scrolling
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const selectedPackObject = packs.find((pack) => pack.id === selectedPack);

    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      address: formData.get("address"),
      country: formData.get("country"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      selectedPack,
    };

    for (const [key, value] of Object.entries(formValues)) {
      if (!value) {
        setLoading(false); // Stop loading
        return;
      }
    }

    const wooCommerceOrderData = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      status: "processing",
      billing: {
        first_name: formValues.name,
        last_name: formValues.surname,
        address_1: formValues.address,
        city: formValues.city,
        postcode: "",
        country: formValues.country,
        email: formValues.email,
        phone: formValues.phone,
      },
      shipping: {
        first_name: formValues.name,
        last_name: formValues.surname,
        address_1: formValues.address,
        city: formValues.city,
        postcode: "",
        country: formValues.country,
      },
      line_items: [
        {
          product_id: 8065,
          quantity: formValues.selectedPack,
          total: String(selectedPackObject?.wooPrice || 0),
        },
      ],
    };

    try {
      const wooCommerceEndpoint =
        "https://balanutritions.com/wp-json/wc/v3/orders";
      const firstKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
      const secondKey = process.env.NEXT_PUBLIC_CONSUMER_SECRET;
      const wooCommerceAuth = `Basic ${btoa(`${firstKey}:${secondKey}`)}`;

      const response = await fetch(wooCommerceEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: wooCommerceAuth,
        },
        body: JSON.stringify(wooCommerceOrderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderSuccess(true); // Show Thank You section
      } else {
        const errorData = await response.json();
        console.error("Error creating order:", errorData);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        "Ndodhi një gabim gjatë krijimit të porosisë. Ju lutem provoni përsëri."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    return () => {
      // Clean up in case the modal is unmounted while open
      document.body.style.overflow = "";
    };
  }, []);

  const packs = [
    {
      id: 1,
      name: "Pako Solo",
      price: "35.00€",
      wooPrice: 35,
      image: "/products/diet-aid/diet-aid-pack-1.webp",
    },
    {
      id: 2,
      name: "Pako Dyshe",
      originalPrice: "70.00€",
      price: "63.00€",
      wooPrice: 63,
      image: "/products/diet-aid/diet-aid-pack-2.webp",
      sale: "-10% ZBRITJE",
    },
    {
      id: 3,
      name: "Pako Treshe",
      originalPrice: "105.00€",
      price: "90.00€",
      sale: "-15% ZBRITJE",
      wooPrice: 90,
      image: "/products/diet-aid/diet-aid-pack-3.webp",
    },
  ];

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffInMs = now - createdAt;

    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;
    const msInMonth = msInDay * 30;

    if (diffInMs < msInHour) {
      return `${Math.floor(diffInMs / (1000 * 60))} minuta me pare`;
    } else if (diffInMs < msInDay) {
      return `${Math.floor(diffInMs / msInHour)} ore me pare`;
    } else if (diffInMs < msInWeek) {
      return `${Math.floor(diffInMs / msInDay)} dite me pare`;
    } else if (diffInMs < msInMonth) {
      return `${Math.floor(diffInMs / msInWeek)} jave me pare`;
    } else {
      return `${Math.floor(diffInMs / msInMonth)} muaj me pare`;
    }
  };
  return (
    <>
      <ThemeContextProvider>
        <Head>
          <title>
            Unë jam Vlora, dhe doja të ndaja historinë time | Vitaliteti
          </title>

          {/* Meta description */}
          <meta
            name="description"
            content="Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës."
          />

          {/* Open Graph Metadata */}
          <meta
            property="og:title"
            content="Unë jam Vlora, dhe doja të ndaja historinë time | Vitaliteti"
          />
          <meta
            property="og:description"
            content="Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës."
          />
          <meta property="og:image" content="/custom-article/article.webp" />
          <meta
            property="og:url"
            content={`https://example.com/articles/${
              params?.slug || "vlora-story"
            }`}
          />
          <meta property="og:type" content="article" />

          {/* Twitter Metadata */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Unë jam Vlora, dhe doja të ndaja historinë time | Vitaliteti"
          />
          <meta
            name="twitter:description"
            content="Zbuloni historinë frymëzuese të Vlorës dhe përfitimet që ajo gjeti me Diet Aid. Një rrëfim mbi vetëbesimin dhe ndryshimin e jetës."
          />
          <meta name="twitter:image" content="/custom-article/article.webp" />

          {/* Additional Metadata */}
          <meta name="author" content="Vitaliteti" />
          <meta
            name="keywords"
            content="Diet Aid, Histori, Peshë, Ushqim, Vetëbesim"
          />
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
        <div className="homepage-container">
          <div className="HomepageMobileHeader">
            <HeaderMobile />
          </div>
          <div className="HomepageHeader">
            <Header />
          </div>
          <section>
            <div className="section">
              <div className="section-body-1">
                <h1 className="article-header-title">
                  Unë jam Vlora, dhe doja të ndaja historinë time.
                </h1>
                <img
                  src="/custom-article/article.webp"
                  className="article-header-image"
                  style={{ maxWidth: "50em" }}
                  alt="Article Header"
                />
                <div className="article-information" style={{ width: "100%" }}>
                  <h1 className="article-information-time">
                    {timeSince("2024-12-05T12:00:00Z")}
                  </h1>
                  <div className="article-information-social">
                    <a
                      href="https://www.facebook.com/people/Vitaliteti/61559428040819/?paipv=0&eav=Afb0SD5Y3vJk9wYbQkxaxrKJ53eDW0vG8txVjwMd7xXfuqLyZMsG6yQ9gV97Q8dn9W4&_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={Facebook} alt="Facebook" />
                    </a>
                    <Link href={""}>
                      <Image src={Twitter} alt="Twitter" />
                    </Link>
                    <CopyButton />
                  </div>
                </div>

                <div className="section-body-2-text">
                  <p>
                    Martesa ime kishte qenë gjithmonë e mbushur me dashuri dhe
                    gëzim. Por, si shumë gra, vitet, ndryshimet hormonale dhe
                    stili i jetës filluan të lenë gjurmë te unë. Fillova të
                    shtoja peshë ngadalë, dhe kjo ndikoi te mënyra si ndihesha
                    me veten dhe, pa e kuptuar, edhe në marrëdhënien time me
                    burrin tim. Ai kurrë nuk më tha diçka të pakëndshme ose
                    kritike. Por me kalimin e kohës, vura re ndryshime të vogla.
                    Nuk kërkonte më të kalonim kohë bashkë si më parë. Darkat
                    spontane u zhdukën, dhe shumicën e mbrëmjeve ai qëndronte në
                    telefon ose shikonte televizor. E ndjeja që largësia e tij
                    po rritej, dhe nuk dija çfarë të bëja.
                  </p>
                  <p>
                    Më kujtohet një ditë specifike kur i sugjerova të dilnim
                    bashkë për një shëtitje pasditeje. Ai buzëqeshi
                    ngrohtësisht, por tha se kishte diçka tjetër për të bërë.
                    Nuk e tha hapur, por ndjeja që diçka në marrëdhënien tonë
                    nuk ishte më e njëjtë.
                  </p>
                  <p>
                    Gjithë kjo më bëri të ndihesha keq me veten. Jo vetëm për
                    faktin që trupi im kishte ndryshuar, por për atë që dukej se
                    po ndodhte mes nesh. Po humbisja vetëvlerësimin tim dhe
                    marrëdhënien tonë njëkohësisht.
                  </p>
                  <p>
                    Atëherë vendosa se duhej të bëja diçka. Fillova të lexoj për
                    trupin dhe hormonet e femrave, për mënyrat si pesha dhe
                    energjia ndërlidhen me mënyrën si ne ndiejmë dhe jetojmë.
                    Mësova se ndryshimet hormonale ishin një faktor i madh për
                    shtimin e peshës dhe lodhjen e vazhdueshme që ndjeja.
                  </p>
                  <p>
                    Vendosa të bëj ndryshime të vogla. Nuk isha gati për dieta
                    ekstreme apo rutina të rënda stërvitjeje. Fillova të
                    përfshij ushqime të shëndetshme në dietën time dhe të bëja
                    shëtitje të shkurtra çdo mëngjes. Gjithashtu, vendosa të
                    provoj një suplement që lexova se ndihmonte në mbështetjen e
                    metabolizmit dhe menaxhimin e oreksit – Diet Aid.
                  </p>
                  <p>
                    Rezultatet nuk erdhën menjëherë, por pas disa javësh fillova
                    të ndjej ndryshime. Kisha më shumë energji gjatë ditës dhe
                    nuk më tundonin më ushqimet e shpejta si më parë. Oreksi im
                    ishte më i balancuar dhe nuk ndjeja më fryrjen e zakonshme
                    që më shqetësonte.
                  </p>
                  <p>
                    Pas disa muajsh, trupi im filloi të ndryshonte. Kisha humbur
                    disa kilogramë dhe fillova të ndjehesha shumë më e lehtë dhe
                    më e vetëbesuar.
                  </p>
                  <p>
                    Por ajo që vura re më shumë ishte ndryshimi në marrëdhënien
                    time me burrin tim. Ai filloi të propozojë daljet jashtë dhe
                    të kalonte më shumë kohë me mua. Një natë më tha: “Duket
                    sikur je rikthyer te vetja jote e dikurshme. Je kaq e lumtur
                    këto kohë.”
                  </p>
                  <p>
                    Ishte një moment i veçantë për mua. Nuk ishte vetëm për
                    kilogramët që kisha humbur, por për mënyrën si ndihesha me
                    veten time. Diet Aid nuk më ndihmoi vetëm me peshën – më
                    ndihmoi të rifitoj vetëvlerësimin tim.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      alt="Bala Diet Aid"
                      src="/products/diet-aid/diet-aid-pack-1.webp"
                      style={{
                        maxWidth: "20em",
                        textAlign: "center",
                        padding: "0 auto",
                      }}
                    />
                  </div>

                  <p>
                    Nëse jeni duke luftuar me peshën dhe energjinë tuaj, unë ju
                    rekomandoj me gjithë zemër të provoni Diet Aid. Ky ishte
                    hapi i parë i transformimit tim, dhe mund të jetë edhe i
                    juaji.
                  </p>
                  <p>Filloni udhëtimin tuaj sot dhe mos e lini për nesër.</p>
                </div>
                <button
                  style={{
                    padding: "12px 25px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#8cbc67",
                    color: "white",
                    fontSize: "18px",
                  }}
                  onClick={handleModalOpen}
                >
                  POROSIT TANI
                </button>
              </div>
            </div>
          </section>

          <Footer />
        </div>
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            },
            content: {
              maxWidth: "550px",
              width: "90%",
              padding: "15px",
              borderRadius: "10px",
              margin: "0px 15px",
              position: "relative",
              overflow: "scroll",
              maxHeight: "85vh",
              inset: "unset",
              zIndex: 1001,
            },
          }}
        >
          {orderSuccess ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                fontFamily: "Clash Grotesk",
              }}
            >
              <img
                src="/green-tick.webp"
                alt="green-tick"
                style={{ width: "4.5em", height: "4.5em" }}
              />
              <p style={{ fontSize: "1.2em", fontWeight: "600" }}>
                Falemnderit për porosinë tuaj!
              </p>
              <p>
                Porosia juaj është pranuar me sukses dhe do të përpunohet së
                shpejti.
              </p>
              <hr />
              <button
                style={{
                  border: "none",
                  backgroundColor: "#6c757d",
                  color: "white",
                  padding: "8px 8px",
                  borderRadius: "5px",
                  marginRight: 0,
                  float: "right",
                }}
                onClick={() => {
                  handleModalClose();
                  setOrderSuccess(false);
                }}
              >
                MBYLL
              </button>
            </div>
          ) : (
            <>
              <section style={{ fontFamily: "Clash Grotesk" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      marginBottom: "20px",
                      marginTop: "5px",
                    }}
                  >
                    Zgjidh Ofertën
                  </p>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                      marginTop: "5px",
                    }}
                    onClick={handleModalClose}
                  >
                    &#x2715;
                  </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px",
                    }}
                  >
                    {packs.map((pack) => (
                      <div
                        key={pack.id}
                        style={{
                          border:
                            selectedPack === pack.id
                              ? "2px solid #15803d"
                              : "2px solid #e5e7eb",
                          opacity: selectedPack === pack.id ? "1" : "0.8",
                          backgroundColor:
                            selectedPack === pack.id ? "#fafafa" : "white",
                          borderRadius: "10px",
                          padding: "10px 4px 4px 4px",
                          textAlign: "center",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() => setSelectedPack(pack.id)}
                      >
                        {pack.sale && (
                          <p
                            style={{
                              position: "absolute",
                              top: "-22px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#69b42d",
                              color: "white",
                              padding: "2px 5px",
                              borderRadius: "5px",
                              fontSize: "0.8rem",
                              width: "6em",
                              fontWeight: "500",
                            }}
                          >
                            {pack.sale}
                          </p>
                        )}
                        <h4 style={{ fontWeight: 500, margin: "2px 0 0 0" }}>
                          {pack.name}
                        </h4>
                        <img
                          src={pack.image}
                          alt={pack.name}
                          style={{ width: "80px", height: "80px" }}
                        />

                        {pack.originalPrice && (
                          <p
                            style={{
                              textDecoration: "line-through",
                              color: "#999",
                              margin: 0,
                            }}
                          >
                            {pack.originalPrice}
                          </p>
                        )}
                        <p
                          style={{
                            color: "#15803d",
                            fontWeight: "500",
                            margin: 0,
                          }}
                        >
                          {pack.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      marginTop: "10px",
                    }}
                  >
                    Adresa e Dërgesës
                  </p>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Emri:
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Mbiemri:
                    </label>
                    <input
                      type="text"
                      name="surname"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Numri i Telefonit:
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Adresa:
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Shteti:
                    </label>
                    <select
                      name="country"
                      defaultValue=""
                      required
                      style={{
                        width: "100%",
                        padding: "8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "black",
                        backgroundColor: "white",
                        appearance: "none", // Ensures consistent cross-browser styling
                      }}
                    >
                      <option value="" disabled hidden>
                        Zgjidh një shtet
                      </option>
                      <option value="Kosova">Kosova</option>
                      <option value="albania">Albania</option>
                      <option value="north_macedonia">North Macedonia</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Qyteti:
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "3px",
                        fontWeight: "500",
                      }}
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      style={{
                        width: "100%",
                        padding: " 8px 4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: "15px 20px",
                      backgroundColor: loading ? "#88c35d" : "#69b42d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      marginTop: "20px",
                      marginBottom: "20px",

                      width: "100%",
                      fontSize: "16px",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Duke u Procesuar..." : "BËJ POROSINË"}
                  </button>
                </form>
              </section>
              <hr style={{ color: "#d1d5db" }}></hr>
              <button
                style={{
                  border: "none",
                  backgroundColor: "#6c757d",
                  color: "white",
                  padding: "8px 8px",
                  borderRadius: "5px",
                  marginRight: 0,
                  float: "right",
                }}
                onClick={handleModalClose}
              >
                MBYLL
              </button>
            </>
          )}
        </ReactModal>
      </ThemeContextProvider>
    </>
  );
};

export default Article;
