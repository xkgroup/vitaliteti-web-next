'use client'
import React from "react";
import Logo from "../assets/Vitaliteti-logo.svg";
import Search from "./../assets/HeaderSearch.png";
import { ThemeToggleButton } from "./ThemeToggle";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter()
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
    <div className="header">
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
        <Link
          href="/rubrikat/keshilla-mjekesore"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
          Keshilla mjekesore
        </Link>
        <Link
          href="/rubrikat/ushqimi-dhe-dieta"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
          Ushqimi dhe dieta
        </Link>
        <Link
          href="/rubrikat/psikologji"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
          Psikologji
        </Link>
        <Link
          href="/rubrikat/shendetesi-lajme"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
          Shendetesi & lajme
        </Link>
        <Link
          href="/rubrikat/temat-javore"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
          Temat javore
        </Link>
        <Link
          href="/rubrikat/te-tjera"
          // onClick={() => window.scrollTo(0, 0)}
          className="header-list-text"
        >
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
