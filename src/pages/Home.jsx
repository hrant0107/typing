import React from "react";
import LevelBlock from "../components/LevelBlock";
import levels from "../db.json";

const Home = () => {
  return (
    <div className="levels">
      <div className="container">
        <div className="levels__container">
          {levels.map((obj) => {
            return <LevelBlock key={obj.id} {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
