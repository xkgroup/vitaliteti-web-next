'use client'
import React, { useContext } from "react";
import Logo from "../assets/Vitaliteti-logo.svg";
import Search from "./../assets/HeaderSearch.png";
import { ThemeToggleButton } from "./ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeContext } from "../components/themeContext"; // Import the theme context

const Header = () => {
  const router = useRouter();
  
  // Access the current theme from the ThemeContext
  const { currentTheme } = useContext(ThemeContext);

  const handleLogoClick = () => {
    router.push("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchClick = () => {
    router.push("/search");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="header"
      style={{
        backgroundColor: currentTheme === "light" ? "#f6f6f6" : "#1c1c1c", // Adjust background based on the theme
        color: currentTheme === "light" ? "#1c1c1c" : "#f0f0f0", // Adjust text color based on the theme
      }}
    >
      <div
        className="header-logo"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "auto",
            height: "85%",
          }}
          src={Logo}
          alt="Logo"
          onClick={handleLogoClick}
        />
      </div>
      <div className="header-list">
        <Link href="/rubrikat/keshilla-mjekesore" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0", 
          }}>
          Keshilla mjekesore
        </Link>
        <Link href="/rubrikat/ushqimi-dhe-dieta" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0",
          }}>
          Ushqimi dhe dieta
        </Link>
        <Link href="/rubrikat/psikologji" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0",
          }}>
          Psikologji
        </Link>
        <Link href="/rubrikat/shendetesi-lajme" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0",
          }}>
          Shendetesi & lajme
        </Link>
        <Link href="/rubrikat/temat-javore" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0",
          }}>
          Temat javore
        </Link>
        <Link href="/rubrikat/te-tjera" className="header-list-text"
          style={{
            color: currentTheme === "light" ? "#333" : "#f0f0f0",
          }}>
          Te tjerat
        </Link>
        <ThemeToggleButton className="header-list-text" />
        <button className="header-search-button" onClick={handleSearchClick}>
          <Image src={Search} className="header-search-img" alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default Header;
