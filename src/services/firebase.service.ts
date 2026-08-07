import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseApp = initializeApp({
    credential: cert({
        projectId: " process.env.FIREBASE_PROJECT_ID",
        clientEmail: "process.env.FIREBASE_CLIENT_EMAIL",
        privateKey: "process.env.FIREBASE_PRIVATE_KEY",
    }),
});

export const firebaseAuth = getAuth(firebaseApp);