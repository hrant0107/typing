import React, { useContext } from "react";
import { AppContext } from "../App";
import LevelBlock from "../components/LevelBlock";
import levels from "../db.json";

const Home = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="levels">
      <div className="container">
        <div className="levels__container">
          {levels.map((obj) => {
            return <LevelBlock userData={userData} key={obj.id} {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
