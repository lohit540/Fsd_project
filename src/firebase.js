// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvv6-m42J3zcUzdiSx5Lin8ttvl-sNFfM",
  authDomain: "restaurant-816d7.firebaseapp.com",
  projectId: "restaurant-816d7",
  storageBucket: "restaurant-816d7.firebasestorage.app",
  messagingSenderId: "388338157634",
  appId: "1:388338157634:web:36123fd4318489eeb545db",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
