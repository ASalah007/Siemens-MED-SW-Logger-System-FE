import React from "react";
import "./ThemeButton.css";
function ThemeButton() {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (event) => {
    if (event.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div style={{ float: "right", marginTop: "10px" }}>
      <label className="switch" htmlFor="darkmode-toggle">
        <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ThemeButton;
