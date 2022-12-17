import Game from "./pages/Game";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import React from "react";

function App() {
  const data = JSON.parse(localStorage.getItem("UserData"));
  const [userData, setUserData] = useState(data ? [...data] : []);

  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(userData));
  }, [userData]);

  const addLevelDataToUserData = (levelData) => {
    if (userData.some((item) => item.id === levelData.id)) {
      setUserData(
        userData.map((item) => {
          if (item.id === levelData.id) {
            return levelData;
          }
          return item;
        })
      );
    } else {
      setUserData([...userData, levelData]);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home userData={userData} />} />
        <Route
          path="game/:id"
          element={
            <Game
              addLevelDataToUserData={addLevelDataToUserData}
              userData={userData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
