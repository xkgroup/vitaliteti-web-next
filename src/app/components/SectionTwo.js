'use client'
import React, { useEffect, useState, useRef } from "react";
import Arrow from "../assets/SectionTwoArrow.png";
import MainNewsTime from "../assets/SectionTwoMainNewsTime.png";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SectionTwo = () => {
  const router = useRouter();
  const [mainNews, setMainNews] = useState([]);
  const [categoriesData, setCategoriesData] = useState({
    keshillaMjekesore: [],
    psikologjia: [],
    ushqimiDieta: [],
    shendetesiLajme: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const textRefs = useRef([]);

  const fetchArticles = async (category) => {
    try {
      const response = await fetch(
        `https://cms.vitaliteti.com/api/articles?filters[category][$eq]=${category}&populate=image&sort=createdAt:desc`,
        {
          headers: {
            Authorization:
              "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
          },
        }
      );
      const data = await response.json();
      return data.data.slice(0, 4);
    } catch (error) {
      console.error(`Error fetching articles for ${category}:`, error);
      return [];
    }
  };

  // Function to fetch main news
  const fetchMainNews = async () => {
    try {
      const response = await fetch(
        "https://cms.vitaliteti.com/api/articles?populate=image",
        {
          headers: {
            Authorization:
              "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
          },
        }
      );
      const data = await response.json();
      return data.data.filter(
        (article) => article.attributes.subcategory === "1"
      ).slice(0, 3); // Limit to 3 articles
    } catch (error) {
      console.error("Error fetching main news:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const mainNewsData = await fetchMainNews();
      const [keshillaMjekesore, psikologjia, ushqimiDieta, shendetesiLajme] =
        await Promise.all([
          fetchArticles("Keshilla mjekesore"),
          fetchArticles("Psikologji"),
          fetchArticles("Ushqimi dhe dieta"),
          fetchArticles("Shendetesi lajme"),
        ]);

      setMainNews(mainNewsData);
      setCategoriesData({
        keshillaMjekesore,
        psikologjia,
        ushqimiDieta,
        shendetesiLajme,
      });
      setIsLoading(false); // End loading state
    };

    fetchAllData();
  }, []);

  const handleArticleClick = (slug) => {
    router.push(`/article/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleButtonClick = (query) => {
    router.push("/search", { state: { query } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToRubrikat = (category) => {
    router.push(`/rubrikat/${category.replace(/\s+/g, "-").toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const extractTextFromDescription = (description) => {
    if (Array.isArray(description)) {
      return description
        .map((block) => block.children.map((child) => child.text).join(" "))
        .join(" ");
    }
    return "";
  };

  const truncateText = (element) => {
    const maxHeight = element.clientHeight;
    let fullText = element.textContent;
    let truncatedText = fullText;

    while (element.scrollHeight > maxHeight) {
      truncatedText = truncatedText.slice(0, -1);
      element.textContent = truncatedText + "...";
    }
  };

  useEffect(() => {
    textRefs.current.forEach((element) => {
      if (element) {
        truncateText(element);
      }
    });
  }, [mainNews, categoriesData]);

  const renderArticles = (articles) => {
    return articles.map((article, index) => {
      const description = extractTextFromDescription(
        article.attributes.description
      );
      const imageUrl = article.attributes.image?.data?.attributes?.url;

      return (
        <div className="section-two-news-card" key={article.id}>
          <div className="section-two-news-card-hover">
            {imageUrl ? (
              <img
                src={`https://cms.vitaliteti.com${imageUrl}`}
                className="section-two-news-card-image"
                alt={article.attributes.title}
                style={{ cursor: "pointer" }}
                onClick={() => handleArticleClick(article.attributes.slug)}
              />
            ) : (
              <div
                className="section-two-news-card-image-placeholder"
                style={{ cursor: "pointer" }}
                onClick={() => handleArticleClick(article.attributes.slug)}
              >
                No Image Available
              </div>
            )}

            <button
              className="section-two-news-card-button"
              onClick={() =>
                handleNavigateToRubrikat(article.attributes.category)
              }
            >
              {article.attributes.category}
            </button>
            <h1
              className="section-two-news-card-title"
              onClick={() => handleArticleClick(article.attributes.slug)}
              style={{ cursor: "pointer" }}
            >
              {article.attributes.title}
            </h1>
          </div>

          <h1
            className="section-two-news-card-text"
            ref={(el) => (textRefs.current[index] = el)}
          >
            {description}
          </h1>

          <div className="section-two-news-card-time">
            <Image src={MainNewsTime} alt="Time Icon" />
            <h1 className="section-two-news-card-time-text">
              {timeSince(article.attributes.createdAt)}
            </h1>
          </div>
        </div>
      );
    });
  };

  const categories = [
    "Alzhaimer",
    "Kanceri Gjirit",
    "Crregullime te tretjes",
    "Depresioni",
    "Semundjet e zemres",
    "Semundjet e veshkave",
    "Kanceri mushkerive",
    "Koliti Ulceroz",
    "Migrena",
    "Psoriasa",
    "Artrit rheumatoid",
    "Kushtet e lekures",
    "Diabeti i tipit 1",
    "Diabeti i tipit 2",
  ];

  if (isLoading) {
    return <div className="section-two">Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="section-two">
      <div className="section-two-header">
        <h1 className="section-two-header-title">Artikujt kryesor</h1>
        <div className="section-two-header-link">
          <Link href={''} className="section-two-header-link-text">
            SHIKO TË GJITHA “LAJMET KRYESORE”
          </Link>
          <Image src={Arrow} />
        </div>
      </div>

      <div className="section-two-categories">
        {categories.map((category) => (
          <button
            key={category}
            className="section-two-categories-button"
            onClick={() => handleButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="section-two-main-news">
        {mainNews.map((newsItem, index) => {
          const description = extractTextFromDescription(
            newsItem.attributes.description
          );
          const firstTwoSentences =
            description.split(".").slice(0, 2).join(".") + ".";
          const imageUrl =
            "https://cms.vitaliteti.com" +
            newsItem.attributes.image.data.attributes.url;

          return (
            <div className="section-two-main-news-card" key={newsItem.id}>
              <img
                src={imageUrl}
                className="section-two-main-news-card-image"
                alt={newsItem.attributes.title}
                style={{ cursor: "pointer" }}
                onClick={() => handleArticleClick(newsItem.attributes.slug)}
              />
              <button
                className="section-two-main-news-card-button"
                onClick={() =>
                  handleNavigateToRubrikat(newsItem.attributes.category)
                }
              >
                {newsItem.attributes.category}
              </button>
              <h1
                className="section-two-main-news-card-title"
                onClick={() => handleArticleClick(newsItem.attributes.slug)}
                style={{ cursor: "pointer" }}
              >
                {newsItem.attributes.title}
              </h1>
              <h1 className="section-two-main-news-card-text">
                {firstTwoSentences}
              </h1>
              <div className="section-two-main-news-card-time">
                <Image src={MainNewsTime} alt="Time Icon" />
                <h1 className="section-two-main-news-card-time-text">
                  {timeSince(newsItem.attributes.createdAt)}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-two-header">
        <h1 className="section-two-header-title">Keshilla mjekesore</h1>
        <div className="section-two-header-link">
          <Link
            href="/rubrikat/keshilla-mjekesore"
            className="section-two-header-link-text"
          >
            SHIKO TË GJITHA “KESHILLAT MJEKESORE”
          </Link>
          <Image src={Arrow} />
        </div>
      </div>
      <div className="section-two-news">
        {renderArticles(categoriesData.keshillaMjekesore)}
      </div>

      <div className="section-two-header">
        <h1 className="section-two-header-title">Psikologjia</h1>
        <div className="section-two-header-link">
          <Link
            href="/rubrikat/psikologji"
            className="section-two-header-link-text"
          >
            SHIKO TË GJITHA “PSIKOLOGJIA”
          </Link>
          <Image src={Arrow} />
        </div>
      </div>
      <div className="section-two-news">
        {renderArticles(categoriesData.psikologjia)}
      </div>

      <div className="section-two-header">
        <h1 className="section-two-header-title">Ushqimi dhe Dieta</h1>
        <div className="section-two-header-link">
          <Link
            href="/rubrikat/ushqimi-dieta"
            className="section-two-header-link-text"
          >
            SHIKO TË GJITHA “USHQIMI DHE DIETA”
          </Link>
          <Image src={Arrow} />
        </div>
      </div>
      <div className="section-two-news">
        {renderArticles(categoriesData.ushqimiDieta)}
      </div>

      <div className="section-two-header">
        <h1 className="section-two-header-title">Shendetesi Lajme</h1>
        <div className="section-two-header-link">
          <Link
            href="/rubrikat/shendetesi-lajme"
            className="section-two-header-link-text"
          >
            SHIKO TË GJITHA “SHENDETESI LAJME”
          </Link>
          <Image src={Arrow} />
        </div>
      </div>
      <div className="section-two-news">
        {renderArticles(categoriesData.shendetesiLajme)}
      </div>
    </div>
  );
};

export default SectionTwo;
