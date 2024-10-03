'use client'

import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/SearchIcon.png";
import NewsOne from "../../assets/SectionThreeNewsOne.svg";
import MainNewsTime from "../../assets/SectionTwoMainNewsTime.png";
import Image from "next/image";

const Content = () => {
    const [inputText, setInputText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [newsListData,] = useState([
        {
            img: NewsOne,
            title:
                "Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë ditës",
            description:
                "Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru, por jo gjithmonë ka simptoma të dukshme.",
            date: "3 javë më parë",
        },
    ]);
    const [newsList, setNewsList] = useState([]);

    // useEffect(() => {
    //     if (location.state && location.state.query) {
    //         setInputText(location.state.query);
    //         setSearchQuery(location.state.query);
    //     }
    // }, [location]);

    useEffect(() => {
        // search filter for newsList
        if (!!!searchQuery) {
            setNewsList(newsListData);
            return;
        }

        setNewsList(
            newsListData.filter(
                (prevNewsItem) =>
                    prevNewsItem.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    prevNewsItem.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, newsListData]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(inputText);
    };

    return (
        <div className="search-section-one">
            <div className="search-section-one-search">
                <div className="search-section-one-search-container">
                    <Image
                        src={SearchIcon}
                        className="search-section-one-search-icon"
                        alt="Search"
                    />
                    <input
                        type="text"
                        className="search-section-one-search-input"
                        placeholder="Kërko lajme"
                        value={inputText}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="search-section-one-button" onClick={handleSearch}>
                    Kerko
                </button>
            </div>
            <div className="search-section-one-result">
                <h1 className="search-section-one-result-text">Rezultatet per:</h1>
                <h1 className="search-section-one-result-text-input">{searchQuery}</h1>
            </div>
            <>
                {newsList.map((news,i) => (
                    <div key={i} className="search-section-news-card">
                        <Image
                            src={news.img}
                            className="search-section-news-card-image"
                            alt="News"
                        />
                        <div className="search-section-news-card-info">
                            <button className="search-section-news-card-button">
                                TE TJERA
                            </button>
                            <h1 className="search-section-news-card-title">{news.title}</h1>
                            <h1 className="search-section-one-news-card-text">
                                {news.description}
                            </h1>
                            <div className="search-section-news-card-time">
                                <Image src={MainNewsTime} alt="Time" />
                                <h1 className="search-section-news-card-time-text">
                                    {news.date}
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="search-section-news-card">
          <img
            src={NewsOne}
            className="search-section-news-card-image"
            alt="News"
          />
          <div className="search-section-news-card-info">
            <button className="search-section-news-card-button">
              TE TJERA
            </button>
            <h1 className="search-section-news-card-title">
              Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë
              ditës
            </h1>
            <h1 className="search-section-one-news-card-text">
              Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të
              rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru,
              por jo gjithmonë ka simptoma të dukshme.
            </h1>
            <div className="search-section-news-card-time">
              <img src={MainNewsTime} alt="Time" />
              <h1 className="search-section-news-card-time-text">
                3 javë më parë
              </h1>
            </div>
          </div>
        </div>
        <div className="search-section-news-card">
          <img
            src={NewsOne}
            className="search-section-news-card-image"
            alt="News"
          />
          <div className="search-section-news-card-info">
            <button className="search-section-news-card-button">
              TE TJERA
            </button>
            <h1 className="search-section-news-card-title">
              Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë
              ditës
            </h1>
            <h1 className="search-section-one-news-card-text">
              Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të
              rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru,
              por jo gjithmonë ka simptoma të dukshme.
            </h1>
            <div className="search-section-news-card-time">
              <img src={MainNewsTime} alt="Time" />
              <h1 className="search-section-news-card-time-text">
                3 javë më parë
              </h1>
            </div>
          </div>
        </div>
        <div className="search-section-news-card">
          <img
            src={NewsOne}
            className="search-section-news-card-image"
            alt="News"
          />
          <div className="search-section-news-card-info">
            <button className="search-section-news-card-button">
              TE TJERA
            </button>
            <h1 className="search-section-news-card-title">
              Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë
              ditës
            </h1>
            <h1 className="search-section-one-news-card-text">
              Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të
              rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru,
              por jo gjithmonë ka simptoma të dukshme.
            </h1>
            <div className="search-section-news-card-time">
              <img src={MainNewsTime} alt="Time" />
              <h1 className="search-section-news-card-time-text">
                3 javë më parë
              </h1>
            </div>
          </div>
        </div>
        <div className="search-section-news-card">
          <img
            src={NewsOne}
            className="search-section-news-card-image"
            alt="News"
          />
          <div className="search-section-news-card-info">
            <button className="search-section-news-card-button">
              TE TJERA
            </button>
            <h1 className="search-section-news-card-title">
              Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë
              ditës
            </h1>
            <h1 className="search-section-one-news-card-text">
              Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të
              rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru,
              por jo gjithmonë ka simptoma të dukshme.
            </h1>
            <div className="search-section-news-card-time">
              <img src={MainNewsTime} alt="Time" />
              <h1 className="search-section-news-card-time-text">
                3 javë më parë
              </h1>
            </div>
          </div>
        </div>
        <div className="search-section-news-card">
          <img
            src={NewsOne}
            className="search-section-news-card-image"
            alt="News"
          />
          <div className="search-section-news-card-info">
            <button className="search-section-news-card-button">
              TE TJERA
            </button>
            <h1 className="search-section-news-card-title">
              Gjërat që duhet të bëni nëse kaloni shumë kohë në këmbë gjatë
              ditës
            </h1>
            <h1 className="search-section-one-news-card-text">
              Shtypja e lartë e gjakut mund të çojë në një sërë komplikimesh të
              rrezikshme, duke përfshirë sëmundjet e zemrës dhe goditjen në tru,
              por jo gjithmonë ka simptoma të dukshme.
            </h1>
            <div className="search-section-news-card-time">
              <img src={MainNewsTime} alt="Time" />
              <h1 className="search-section-news-card-time-text">
                3 javë më parë
              </h1>
            </div>
          </div>
        </div> */}
            </>
        </div>
    );
};

export default Content;
