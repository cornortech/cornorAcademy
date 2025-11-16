import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "doclock-bef33.firebaseapp.com",
  projectId: "doclock-bef33",
  storageBucket: "doclock-bef33.firebasestorage.app",
  messagingSenderId: "46808600541",
  appId: "1:46808600541:web:5d8141681f3a24d52db034",
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
