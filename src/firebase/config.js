import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Using hardcoded Project ID for reliability as Vite/HMR can sometimes delay .env loading
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: "akotheesafaris-6bd2e",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// FIX: initializeFirestore signature is (app, settings, databaseId)
// We need to pass 'default' as the THIRD argument, not inside the settings object.
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
}, 'default');

export const storage = getStorage(app);

console.log("Firestore initialized successfully on project:", firebaseConfig.projectId, "targeting database: 'default'");

export default app;
