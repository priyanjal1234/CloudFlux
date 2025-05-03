import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3QG6yjeTOeBlxCOIkISH3ywR92bnxdxg",
  authDomain: "cloudcost-6be45.firebaseapp.com",
  projectId: "cloudcost-6be45",
  storageBucket: "cloudcost-6be45.firebasestorage.app",
  messagingSenderId: "858017591148",
  appId: "1:858017591148:web:2b00d1c221bcb0ae258d49",
  measurementId: "G-0XRXQ29GHM",
};

const app = initializeApp(firebaseConfig);

export default app