import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (
  !serviceAccount.projectId ||
  !serviceAccount.privateKey ||
  !serviceAccount.clientEmail
) {
  throw new Error(
    "Firebase service account credentials are missing in environment variables"
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export default admin;