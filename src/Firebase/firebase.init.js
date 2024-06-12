import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_aKxJVOIxuGkq4XQbgh-FxZ1NdKhXk-k",
  authDomain: "sifat-ticket-counter.firebaseapp.com",
  projectId: "sifat-ticket-counter",
  storageBucket: "sifat-ticket-counter.appspot.com",
  messagingSenderId: "366037828699",
  appId: "1:366037828699:web:b4d7af191f9f79f9a92b7e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
