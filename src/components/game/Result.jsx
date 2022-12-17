import React from "react";
import { Link } from "react-router-dom";

const Result = ({ id, countWrongs, accurancy, showResult }) => {
  return (
    <div className="resultBlock">
      <div className="wrongs__block block">
        <span className="first">Wrongs:</span>
        <span className="second">{countWrongs}</span>
      </div>

      <div className="accurancy__block block">
        <span className="first">accurancy:</span>

        <span className="second">{100 - accurancy} %</span>
      </div>

      {100 - accurancy > 90 ? (
        <Link to={`/game/${+id + 1}`}>
          <button onClick={showResult} className="nextLevelBtn">
            Next Level
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default Result;
