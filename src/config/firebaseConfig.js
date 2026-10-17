// Your web app's Firebase configuration. Plain values: the public site reads Firestore over REST (hooks/useContent),
// so the Firebase SDK only ships with /admin (./firebaseApp).
export const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_APIKEY,
	authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_APP_ID
};
