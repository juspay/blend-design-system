import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
}

export const getAdminAuth = () => admin.auth()
export const getAdminDatabase = () => admin.database()
export const getAdminFirestore = () => admin.firestore()

export default admin
