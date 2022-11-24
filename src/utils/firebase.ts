import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6Nv2oraGr4XUp3E8L-EcDrD_pc_3iT4o",
  authDomain: "practice-c0ebc.firebaseapp.com",
  projectId: "practice-c0ebc",
  storageBucket: "practice-c0ebc.appspot.com",
  messagingSenderId: "906542762131",
  appId: "1:906542762131:web:7c00cc9a80d854869c6566",
};

const FB = initializeApp(firebaseConfig);
export const auth = getAuth(FB);
export default FB;
