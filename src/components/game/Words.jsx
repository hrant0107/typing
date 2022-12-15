import React from "react";

const Words = ({ getClassName, words }) => {
  return (
    <div className="wordsContainer">
      <div>
        {[...words].map((leter, i) => {
          return (
            <span key={i} className={getClassName(leter, i)}>
              {leter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Words;
