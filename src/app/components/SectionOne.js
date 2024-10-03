'use client'
import React, { useEffect, useState, useMemo } from "react";
import Banner from "../assets/SectionOneBanner.svg";
import Certified from "../assets/SectionOneCertified.jpg";
import Heart from "../assets/SectionOneHeart.png";
import Doctor from "../assets/SectionOneDoctor.png";
import GreenDot from "./../assets/SectionOneCenterGreenDot.svg";
import {useRouter} from "next/navigation";
import Image from "next/image";

const SectionOne = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [latestArticle, setLatestArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
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
        if (data.data && data.data.length > 0) {
          setArticles(data.data);
        } else {
          console.error("No articles found");
        }
      } catch (error) {
        console.error("Error fetching the articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // UseMemo for optimized sorting of articles
  const sortedArticles = useMemo(() => {
    if (articles.length > 0) {
      return articles.slice().sort(
        (a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );
    }
    return [];
  }, [articles]);

  // Set the latest article and recent articles
  useEffect(() => {
    if (sortedArticles.length > 0) {
      const baseUrl = "https://cms.vitaliteti.com";

      // Get the latest article
      const latestArticleData = sortedArticles[0]; // Latest article
      const firstSentence =
        latestArticleData.attributes.description[0].children[0].text.split(".")[0] + ".";

      setLatestArticle({
        image: baseUrl + latestArticleData.attributes.image.data.attributes.formats.medium.url,
        title: latestArticleData.attributes.title,
        category: latestArticleData.attributes.category,
        description: firstSentence,
        fullDescription: latestArticleData.attributes.description,
        author: latestArticleData.attributes.author ? "Nga " + latestArticleData.attributes.author : null,
        slug: latestArticleData.attributes.slug,
      });

      // Set recent articles (including the latest article for the middle section)
      setRecentArticles(sortedArticles.slice(0, 5)); // Include the latest article
    }
  }, [sortedArticles]);

  // Function to handle article click
  const handleArticleClick = (slug) => {
    router.push(`/article/${slug}`);
    window.scrollTo(0, 0);
  };

  // Function to handle button click
  const handleButtonClick = (query) => {
    router.push("/search", { state: { query } });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Helper function to calculate time since article was created
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

  // Return early if no articles are available
  if (!latestArticle) {
    return <div className="section-one">Loading...</div>;
  }

  // Main render for SectionOne component
  return (
    <div className="section-one">
      <div className="section-one-part-1">
        <div className="section-one-part-1-group">
          <div className="section-one-part-1-bolded">
            <Image src={Certified} className="section-one-part-1-image" />
            <h1 className="section-one-part-1-stat-text">10+</h1>
          </div>
          <h1 className="section-one-part-1-text">
            {" "}
            Vite eksperience ne keshilla
          </h1>
        </div>
        <h1 className="section-one-part-1-divide-text">|</h1>
        <div className="section-one-part-1-group">
          <div className="section-one-part-1-bolded">
            <Image src={Heart} className="section-one-part-1-image" />
            <h1 className="section-one-part-1-stat-text">250k</h1>
          </div>
          <h1 className="section-one-part-1-text"> Shfletime te artikujve</h1>
        </div>
        <h1 className="section-one-part-1-divide-text">|</h1>
        <div className="section-one-part-1-group">
          <div className="section-one-part-1-bolded">
            <Image src={Doctor} className="section-one-part-1-image" />
            <h1 className="section-one-part-1-stat-text">50+</h1>
          </div>
          <h1 className="section-one-part-1-text">Ekspert medicinal</h1>
        </div>
      </div>

      <div className="section-one-part-2">
        <div className="section-one-part-2-left">
          <img
            src={latestArticle.image}
            className="section-one-part-2-left-image"
            alt="News Header"
            onClick={() => handleArticleClick(latestArticle.slug)}
            style={{ cursor: "pointer" }}
          />
          <button
            className="section-one-part-2-left-button"
            onClick={() => handleButtonClick(`${latestArticle.category}`)}
          >
            {latestArticle.category}
          </button>
          <h1
            className="section-one-part-2-left-title"
            onClick={() => handleArticleClick(latestArticle.slug)}
            style={{ cursor: "pointer" }}
          >
            {latestArticle.title}
          </h1>
          <h1 className="section-one-part-2-left-text">
            {latestArticle.description}
          </h1>
          <h1 className="section-one-part-2-left-author">
            {latestArticle.author}
          </h1>
        </div>

        <div className="section-one-part-2-center">
          <div className="section-one-part-2-center-header">
            <h1 className="section-one-part-2-center-header-text">
              Lajmet e fundit
            </h1>
          </div>
          {recentArticles.map((articleItem) => (
            <div
              className="section-one-part-2-center-news"
              key={articleItem.id}
            >
              <h1
                className="section-one-part-2-center-news-title"
                onClick={() => handleArticleClick(articleItem.attributes.slug)}
              >
                {articleItem.attributes.title}
              </h1>
              <div className="section-one-part-2-center-news-information">
                <p className="section-one-part-2-center-news-information-time">
                  {timeSince(articleItem.attributes.createdAt)}
                </p>
                <Image src={GreenDot} alt="Separator" />
                <h1 className="section-one-part-2-center-news-information-author">
                  {articleItem.attributes.author
                    ? "Nga " + articleItem.attributes.author
                    : " "}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="section-one-part-2-right">
          <Image src={Banner} alt="Banner" />
          <div className="section-one-part-2-right-categories">
            <h1 className="section-one-part-2-right-title">
              Temat me te kerkuara
            </h1>
            <div className="section-one-part-2-right-buttons">
              <button
                className="section-one-part-2-right-button"
                onClick={() => handleButtonClick("Best Time for Coffee")}
              >
                Best Time for Coffee
              </button>
              <button
                className="section-one-part-2-right-button"
                onClick={() => handleButtonClick("High Protein Gains")}
              >
                High Protein Gains
              </button>
              <button
                className="section-one-part-2-right-button"
                onClick={() => handleButtonClick("Electrolytes")}
              >
                Electrolytes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
