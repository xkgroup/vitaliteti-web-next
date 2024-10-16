"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Vitaliteti-logo.svg";
import Nav from "../assets/HeaderMobileNav.svg";
import SearchIcon from "../assets/SearchIcon.png";
import { ThemeToggleButton } from "./ThemeToggle";
import { ThemeContext } from "../components/themeContext"; // Import theme context

const HeaderMobile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Access the current theme from the ThemeContext
  const { currentTheme } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    router.push({
      pathname: "/search",
      query: { query: searchText },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  const handleLogoClick = () => {
    router.push("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div
      className="header-mobile"
      style={{
        backgroundColor: currentTheme === "light" ? "#f6f6f6" : "#1c1c1c", // Dynamic background color based on theme
        color: currentTheme === "light" ? "#333" : "#f0f0f0", // Dynamic text color
      }}
    >
      <div className="header-content">
        <Image
          src={Logo}
          className="header-mobile-logo"
          alt="Logo"
          onClick={handleLogoClick}
        />
        <button className="header-mobile-nav" onClick={toggleDropdown}>
          <Image src={Nav} alt="Navigation" />
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="header-mobile-dropdown"
          ref={dropdownRef}
          style={{
            backgroundColor: currentTheme === "light" ? "#f6f6f6" : "#1c1c1c", // Dropdown background color
          }}
        >
          <Link
            href="/rubrikat/keshilla-mjekesore"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Keshilla mjekesore
            </p>
          </Link>
          <Link
            href="/rubrikat/ushqimi-dhe-dieta"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Ushqimi dhe dieta
            </p>
          </Link>
          <Link
            href="/rubrikat/psikologji"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Psikologji
            </p>
          </Link>
          <Link
            href="/rubrikat/shendetesi-lajme"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
            >
              Shendetesi & lajme
            </p>
          </Link>
          <Link
            href="/rubrikat/temat-javore"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Temat javore
            </p>
          </Link>
          <Link
            href="/rubrikat/te-tjera"
            passHref
            className="mobile-header-list-link"
          >
            <p
              className="mobile-header-list-text"
              style={{ color: currentTheme === "light" ? "#333" : "#f0f0f0" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Te tjerat
            </p>
          </Link>
          <div className="mobile-header-list-text">
            <ThemeToggleButton />
          </div>
          <div className="header-mobile-search-container">
            <Image
              src={SearchIcon}
              className="header-mobile-search-icon"
              alt="Search"
              onClick={handleSearchClick}
            />
            <input
              type="text"
              className="header-mobile-search"
              placeholder="Kërko lajme"
              value={searchText}
              onChange={handleInputChange}
              style={{
                color: currentTheme === "light" ? "#333" : "#f0f0f0", // Dynamic input text color
                backgroundColor: currentTheme === "light" ? "#fff" : "#333", // Input background
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
