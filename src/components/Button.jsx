import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, onClick, link }) => {
  return (
    <Link to={link}>
      <button onClick={onClick} className="btn">
        {text}
      </button>
    </Link>
  );
};

export default Button;
