"use client";
import React, { useEffect, useState } from "react";
import TimeIcon from "../../assets/SectionTwoMainNewsTime.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ARTICLES_PER_PAGE = 10;

const fetchArticles = async (category, setState) => {
  try {
    let url;
    const now = new Date();
    const lastWeek = new Date(now.setDate(now.getDate() - 7)).toISOString();

    if (category === "temat-javore") {
      url = `https://cms.vitaliteti.com/api/articles?filters[createdAt][$gte]=${lastWeek}&populate=image&sort=createdAt:desc`;
    } else if (category === "no-category") {
      // Adjusted the filter to ensure only articles with no category are fetched
      url = `https://cms.vitaliteti.com/api/articles?filters[category][$null]=true&populate=image&sort=createdAt:desc`;
    } else {
      url = `https://cms.vitaliteti.com/api/articles?filters[category][$eq]=${category}&populate=image&sort=createdAt:desc`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
      },
    });

    const data = await response.json();
    console.log(`Fetched Articles for ${category}:`, data.data);

    if (data.data && data.data.length > 0) {
      setState(data.data); // Set all articles, we'll handle pagination separately
    } else {
      console.error(`No articles found for category ${category}`);
    }
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
  }
};

const convertUrlToCategory = (urlCategory) => {
  return (
    urlCategory?.charAt(0).toUpperCase() +
    urlCategory?.slice(1).replace(/-/g, " ").toLowerCase()
  );
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

const Rubrikat = ({ params }) => {
  const { category } = params;
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const router = useRouter();

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE); // Calculate total pages

  const handleArticleClick = (slug) => {
    router.push(`/article/${slug}`);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const originalCategory =
      category === "temat-javore"
        ? "temat-javore"
        : category === "te-tjera"
        ? "no-category"
        : convertUrlToCategory(category);

    fetchArticles(originalCategory, setArticles);
  }, [category]);

  const extractTextFromRichText = (blocks) => {
    if (!Array.isArray(blocks)) return "";

    return blocks
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join(" ");
        }
        return "";
      })
      .join(" ");
  };

  if (articles.length === 0) {
    return <div className="rubrikat">Loading...</div>; // Show a loading message while fetching
  }

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  const mainArticle = paginatedArticles[0];
  const otherArticles = paginatedArticles.slice(1);

  return (
    <div className="rubrikat">
      <div className="rubrikat-header">
        <h1 className="rubrikat-header-title">{category.replace(/-/g, " ")}</h1>
        <div className="rubrikat-main">
          {mainArticle && (
            <>
              <div className="width-height">
                <Image
                  src={`https://cms.vitaliteti.com${mainArticle.attributes.image?.data?.attributes?.url}`}
                  className="rubrikat-main-image"
                  width={500}
                  height={500}
                  alt={mainArticle.attributes.title}
                  onClick={() =>
                    handleArticleClick(mainArticle.attributes.slug)
                  }
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="rubrikat-main-information">
                <h1
                  className="rubrikat-main-information-title"
                  onClick={() =>
                    handleArticleClick(mainArticle.attributes.slug)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {mainArticle.attributes.title}
                </h1>
                <h1 className="rubrikat-main-information-text">
                  {extractTextFromRichText(mainArticle.attributes.description)}
                </h1>
                <h1 className="rubrikat-main-information-author">
                  {mainArticle.attributes.author
                    ? "Nga " + mainArticle.attributes.author
                    : null}
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="rubrikat-other">
        <h1 className="rubrikat-other-title">Te fundit</h1>
      </div>
      <div className="rubrikat-main-2">
        <div className="rubrika-seperation">
          {otherArticles.map((article, index) => (
            <div key={index} className="rubrikat-main-news-card">
              <div className="height-width-2">
                <Image
                  src={`https://cms.vitaliteti.com${article.attributes.image?.data?.attributes?.url}`}
                  className="rubrikat-main-news-image"
                  fill
                  alt={article.attributes.title}
                  onClick={() => handleArticleClick(article.attributes.slug)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="rubrikat-main-news-card-information">
                <div>
                  <h1
                    className="rubrikat-main-news-title"
                    onClick={() => handleArticleClick(article.attributes.slug)}
                    style={{ cursor: "pointer" }}
                  >
                    {article.attributes.title}
                  </h1>
                  <h1 className="rubrikat-main-news-text">
                    {extractTextFromRichText(article.attributes.description)}
                  </h1>
                </div>
                <div className="rubrikat-main-news-time">
                  <Image src={TimeIcon} alt="Time Icon" />
                  <h1 className="rubrikat-main-news-time-text">
                    {timeSince(article.attributes.createdAt)}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*        <div className="rubrikat-selected">
          <div className="rubrikat-selected-title">
            <h1 className="rubrikat-selected-title-text">
              Trend Ushqimi dhe Dieta
            </h1>
          </div>
          <div className="rubrikat-selected-news-card">
            <img src={SelectedNewsOne} />
            <h1 className="rubrikat-selected-news-card-title">
              Trajtimi i akneve me produktet e natyres
            </h1>
          </div>
          <div className="rubrikat-selected-news-card">
            <img src={SelectedNewsTwo} />
            <h1 className="rubrikat-selected-news-card-title">
              Trajtimi i akneve me produktet e natyres
            </h1>
          </div>
          <div className="rubrikat-selected-news-card">
            <img src={SelectedNewsThree} />
            <h1 className="rubrikat-selected-news-card-title">
              Trajtimi i akneve me produktet e natyres
            </h1>
          </div>
        </div> */}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active-page" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rubrikat;
