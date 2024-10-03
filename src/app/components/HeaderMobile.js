'use client'
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Vitaliteti-logo.svg";
import Nav from "../assets/HeaderMobileNav.svg";
import SearchIcon from "../assets/SearchIcon.png";
import { ThemeToggleButton } from "./ThemeToggle";

const HeaderMobile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const dropdownRef = useRef(null);

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
      <div className="header-mobile">
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
            <div className="header-mobile-dropdown" ref={dropdownRef}>
              <Link href="/rubrikat/keshilla-mjekesore" passHref>
                <a className="mobile-header-list-text" onClick={() => window.scrollTo(0, 0)}>
                  Keshilla mjekesore
                </a>
              </Link>
              <Link href="/rubrikat/ushqimi-dhe-dieta" passHref>
                <a className="mobile-header-list-text" onClick={() => window.scrollTo(0, 0)}>
                  Ushqimi dhe dieta
                </a>
              </Link>
              <Link href="/rubrikat/psikologji" passHref>
                <a className="mobile-header-list-text" onClick={() => window.scrollTo(0, 0)}>
                  Psikologji
                </a>
              </Link>
              <Link href="/rubrikat/shendetesi-lajme" passHref>
                <a className="mobile-header-list-text">Shendetesi & lajme</a>
              </Link>
              <Link href="/rubrikat/temat-javore" passHref>
                <a className="mobile-header-list-text" onClick={() => window.scrollTo(0, 0)}>
                  Temat javore
                </a>
              </Link>
              <Link href="/rubrikat/te-tjerat" passHref>
                <a className="mobile-header-list-text" onClick={() => window.scrollTo(0, 0)}>
                  Te tjerat
                </a>
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
                />
              </div>
            </div>
        )}
      </div>
  );
};

export default HeaderMobile;
