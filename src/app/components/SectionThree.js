'use client'
import React, { useEffect, useState } from "react";
import Arrow from "./../assets/SectionTwoArrow.png";
import Reklama from "../assets/SectionThreeReklama.svg";
import MainNewsTime from "../assets/SectionTwoMainNewsTime.png";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";

const SectionThree = () => {
  const router = useRouter();
  const [articlesWithoutCategory, setArticlesWithoutCategory] = useState([]);

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

  useEffect(() => {
    const fetchArticlesWithoutCategory = async () => {
      try {
        const response = await fetch(
          `https://cms.vitaliteti.com/api/articles?filters[category][$null]=true&populate=image&sort=createdAt:desc`,
          {
            headers: {
              Authorization:
                "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
            },
          }
        );

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setArticlesWithoutCategory(data.data.slice(0, 6));
        } else {
          console.error("No articles found without a category");
        }
      } catch (error) {
        console.error("Error fetching the articles without a category:", error);
      }
    };

    fetchArticlesWithoutCategory();
  }, []);

  const handleArticleClick = (slug) => {
    router.push(`/article/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderArticles = (articles) => {
    return articles.map((article, index) => {
      const imageUrl = article.attributes.image?.data?.attributes?.url;

      return (
        <div
          className={`section-three-news-card ${
            index === articles.length - 1 ? "section-three-news-card-last" : ""
          }`}
          key={article.id}
          onClick={() => handleArticleClick(article.attributes.slug)} // Fixed the issue here
        >
          <div className="section-three-news-card-info">
            <h1 className="section-three-news-card-title">
              {article.attributes.title}
            </h1>
            <div className="section-three-news-card-time">
              <Image src={MainNewsTime} alt="Time Icon" />
              <h1 className="section-three-news-card-time-text">
                {timeSince(article.attributes.createdAt)}
              </h1>
            </div>
          </div>
          {imageUrl && (
            <img
              src={`https://cms.vitaliteti.com${imageUrl}`}
              className="section-three-news-card-image"
              alt="News"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="section-three">
      <div className="section-three-header">
        <h1 className="section-three-header-title">Te tjera</h1>
        <div className="section-three-header-link">
          <Link href="/rubrikat/te-tjera" className="section-three-header-link-text">
            SHIKO TË GJITHA “TE TJERA”
          </Link>
          <Image src={Arrow} alt="Arrow" />
        </div>
      </div>
      <div className="section-three-body">
        <div className="section-three-news">{renderArticles(articlesWithoutCategory)}</div>
        <div>
          <Image src={Reklama} className="section-three-reklama" alt="Reklama" />
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
