import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebaseConfig";

// Firebase SDK for /admin only (sign-in and saving content); imported solely from the lazy-loaded admin chunk.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
