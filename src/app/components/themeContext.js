"use client";
import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext({
  currentTheme: "light",
  themeSwitchHandler: () => {},
});

const ThemeContextProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const themeSwitchHandler = (themeType) => {
    setCurrentTheme(themeType);
    window.localStorage.setItem("theme", themeType);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeSwitchHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
