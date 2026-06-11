"use strict";
// Firebase Admin SDK - Config & Initialization
// Initializes the Firebase Admin SDK using service account credentials
// from environment variables and exports a singleton admin instance.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle newlines
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
if (!serviceAccount.projectId ||
    !serviceAccount.privateKey ||
    !serviceAccount.clientEmail) {
    throw new Error("Firebase service account credentials are missing in environment variables");
}
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
exports.default = firebase_admin_1.default;
