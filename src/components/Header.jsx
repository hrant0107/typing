import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "./assets/HomeIcon";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__block">
            <HomeIcon />
            <span className="header__text">Home </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
