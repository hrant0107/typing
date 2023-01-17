import React from "react";
import { useCallback, useEffect, useState } from "react";

import Game from "./pages/Game";
import Home from "./pages/Home";
import Header from "./components/Header";

import { Routes, Route } from "react-router-dom";

import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export const AppContext = React.createContext({});

function App() {
  const data = JSON.parse(localStorage.getItem("UserData"));
  const [userData, setUserData] = useState(data ? [...data] : []);

  const [user, setUser] = useState(null);

  const coll = collection(db, `${user?.email}`);

  const getData = async (email) => {
    const docsFire = await getDocs(collection(db, `${email}`));
    const docsList = docsFire.docs.map((item) => {
      return item.data();
    });
    if (docsList.length) setUserData([...docsList]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getData(currentUser?.email);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      const fetchFirebase = () => {
        localStorage.setItem("UserData", JSON.stringify(userData));
      };
      fetchFirebase();
    }
  }, [user, userData]);

  const logOut = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setUserData([]);
  }, []);

  const addLevelDataToUserData = useCallback(
    async (levelData) => {
      if (userData.some((item) => item.id === levelData.id)) {
        setUserData(
          userData.map((item) => (item.id === levelData.id ? levelData : item))
        );

        if (user) {
          const data = await getDocs(coll);
          const filtredItem = data.docs.find((item) => {
            return item.data().id === levelData.id;
          });

          const docUpdate = doc(db, user?.email, filtredItem.id);
          await updateDoc(docUpdate, {
            ...levelData,
          });
        }
      } else {
        setUserData([...userData, levelData]);
        if (user) {
          await addDoc(coll, levelData);
        }
      }
    },
    [userData]
  );

  return (
    <AppContext.Provider
      value={{ userData, addLevelDataToUserData, user, logOut, getData }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="game/:id" element={<Game />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signUp" element={<RegisterForm />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
