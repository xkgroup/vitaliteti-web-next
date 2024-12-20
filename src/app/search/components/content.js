"use client";

import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/SearchIcon.png";
import NewsOne from "../../assets/SectionThreeNewsOne.svg";
import MainNewsTime from "../../assets/SectionTwoMainNewsTime.png";
import Image from "next/image";
import NotFound from "../../assets/SearchNotFound.png";
import Link from "next/link";

const Content = () => {
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // New state to track search button click

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(inputText);
    setHasSearched(true); // Set to true when the button is clicked
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
        <h1 className="search-section-one-result-text">Rezultatet për:</h1>
        <h1 className="search-section-one-result-text-input">{searchQuery}</h1>
      </div>
      {hasSearched ? (
        <div className="search-section-two">
          <div className="search-section-two-row">
            <p className="search-section-two-row-text">Asnjë rezultatë...</p>
            <Image src={NotFound} alt="NotFound" />
          </div>
          <p className="search-section-two-text">
            Duket se nuk mund të gjejmë asgjë për {searchQuery}.
            <br />
            <p className="search-random">
              Shihni nëse mund ta gjeni në <Link href="/" className="search-section-link-text">Homepage</Link> ose
              provoni të kërkoni më lart!
            </p>
          </p>
          <p className="search-section-two-text"></p>
        </div>
      ) : (
        <div className="search-section-results"></div>
      )}
    </div>
  );
};

export default Content;
