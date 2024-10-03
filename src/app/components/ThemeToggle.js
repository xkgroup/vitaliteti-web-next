import React, { useContext } from "react";
import { ThemeContext } from "./themeContext";

export function ThemeToggleButton() {
  const { currentTheme, themeSwitchHandler } = useContext(ThemeContext);

  return (
    <button
      onClick={() =>
        themeSwitchHandler(currentTheme === "light" ? "dark" : "light")
      }
      style={{
        width: "fit-content",
        padding: "8px 16px",
        fontSize: "16px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
        backgroundColor: currentTheme === "light" ? "#f0f0f0" : "#333",
        color: currentTheme === "light" ? "#333" : "#f0f0f0",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      {currentTheme === "light" ? "🌞" : "🌜"}
    </button>
  );
}
