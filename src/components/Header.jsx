import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <Link to="/">Home</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
