import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from 'firebase-admin/database'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase Admin
const apps = getApps()

if (!apps.length) {
  initializeApp(firebaseAdminConfig)
}

// Initialize Firebase Admin Auth
export const adminAuth = getAuth()

// Initialize Firebase Admin Database
export const adminDatabase = getDatabase() 