import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { MessageTyp, RoomTyp, UserTyp } from "./types";

// const firebaseConfig = {
//   apiKey: "AIzaSyD6Nv2oraGr4XUp3E8L-EcDrD_pc_3iT4o",
//   authDomain: "practice-c0ebc.firebaseapp.com",
//   projectId: "practice-c0ebc",
//   storageBucket: "practice-c0ebc.appspot.com",
//   messagingSenderId: "906542762131",
//   appId: "1:906542762131:web:7c00cc9a80d854869c6566",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC9HbG1KVWhGidBokp8LciZRsQuDtpOjXQ",
  authDomain: "ship-match.firebaseapp.com",
  projectId: "ship-match",
  storageBucket: "ship-match.appspot.com",
  messagingSenderId: "1028114498969",
  appId: "1:1028114498969:web:5e7a3ce27fbcdb31cf7f08",
};

const FB = initializeApp(firebaseConfig);
export const auth = getAuth(FB);
export const database = getFirestore(FB);
export const USER_DB = "users";
export const ROOM_DB = "rooms";
export default FB;

export const userConverter = {
  fromFirestore: (ss: QueryDocumentSnapshot<UserTyp>) => {
    return ss.data();
  },
  toFirestore: (model: UserTyp) => model,
};

export const roomConverter = {
  fromFirestore: (ss: QueryDocumentSnapshot<RoomTyp>) => {
    return ss.data();
  },
  toFirestore: (model: RoomTyp) => model,
};
