import { initializeApp } from "firebase/app";
import { browserLocalPersistence, browserSessionPersistence, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebaseConfig";

// Firebase SDK for /admin only (sign-in and saving content); imported solely from the lazy-loaded admin chunk.
export const app = initializeApp(firebaseConfig);
// Email/password only: unlike getAuth, no popup/redirect resolver, so Auth never loads Google's iframe and gapi script
// (which the Content-Security-Policy in netlify.toml does not allow). Same persistence order as getAuth.
export const auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence] });
export const db = getFirestore(app);
