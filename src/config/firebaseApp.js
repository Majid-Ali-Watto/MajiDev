import { initializeApp } from "firebase/app";
import { browserSessionPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebaseConfig";

// Firebase SDK for /admin only (sign-in and saving content); imported solely from the lazy-loaded admin chunk.
export const app = initializeApp(firebaseConfig);
// Email/password only: unlike getAuth, no popup/redirect resolver, so Auth never loads Google's iframe and gapi script
// (which the Content-Security-Policy in netlify.toml does not allow).
// Session persistence: the sign-in lasts until this tab closes. A remembered sign-in would carry the authenticator-code
// claim indefinitely, so anyone later opening this browser profile could edit the site without the password or code.
export const auth = initializeAuth(app, { persistence: browserSessionPersistence });
export const db = getFirestore(app);
