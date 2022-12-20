import Game from "./pages/Game";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useCallback, useEffect, useState } from "react";
import React from "react";
// import Layout from "./components/Layout";

export const AppContext = React.createContext({});
console.log(AppContext);
function App() {
  const data = JSON.parse(localStorage.getItem("UserData"));
  const [userData, setUserData] = useState(data ? [...data] : []);

  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(userData));
  }, [userData]);

  const addLevelDataToUserData = useCallback(
    (levelData) => {
      if (userData.some((item) => item.id === levelData.id)) {
        setUserData(
          userData.map((item) => (item.id === levelData.id ? levelData : item))
        );
      } else {
        setUserData([...userData, levelData]);
      }
    },
    [userData]
  );

  return (
    <AppContext.Provider value={{ userData, addLevelDataToUserData }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="game/:id" element={<Game />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
