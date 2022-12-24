import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCBM6BXypGYLuQWaioEJu2ZHPD5Dc4naoE",
  authDomain: "typing-app-2e4f6.firebaseapp.com",
  projectId: "typing-app-2e4f6",
  storageBucket: "typing-app-2e4f6.appspot.com",
  messagingSenderId: "421724369857",
  appId: "1:421724369857:web:648f83e093a94e5000b540",
  measurementId: "G-76YR4SCVM1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
