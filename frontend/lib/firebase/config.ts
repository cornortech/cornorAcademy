import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "academy-4aab3.firebaseapp.com",
  projectId: "academy-4aab3",
  storageBucket: "academy-4aab3.firebasestorage.app",
  messagingSenderId: "284741878928",
  appId: "1:284741878928:web:16b917c4ada3a746f48415",
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
