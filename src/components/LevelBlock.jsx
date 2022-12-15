import React from "react";
import { Link, useParams } from "react-router-dom";

const LevelBlock = ({ id, title, accurancy }) => {
  return (
    <Link to={`game/${id}`}>
      <div className="levelBlock">
        <div className="levelTitle">{title}</div>
        <div className="lock">
          {id !== 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-unlock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
            </svg>
          )}
        </div>
        <div className="block level__acurancy__block">
          <span className="name">accurancy:</span>
          <span className="procent">{accurancy}%</span>
        </div>
      </div>
    </Link>
  );
};

export default LevelBlock;
