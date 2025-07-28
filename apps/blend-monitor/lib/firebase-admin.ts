import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { getDatabase } from 'firebase-admin/database'

let adminApp: App | undefined

export function initializeAdmin() {
    if (getApps().length === 0) {
        // In production, you would use service account credentials
        // For now, we'll use environment variables
        const projectId =
            process.env.FIREBASE_PROJECT_ID ||
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

        if (!projectId) {
            console.warn(
                'Firebase Admin SDK not properly configured. Some features may not work.'
            )
            return
        }

        try {
            const storageBucket =
                process.env.FIREBASE_STORAGE_BUCKET ||
                process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
                `${projectId}.appspot.com`

            adminApp = initializeApp({
                projectId,
                storageBucket,
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
                        /\\n/g,
                        '\n'
                    ),
                }),
            })
        } catch (error) {
            console.error('Error initializing Firebase Admin:', error)
        }
    } else {
        adminApp = getApps()[0]
    }

    return adminApp
}

export function getAdminAuth() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return getAuth(adminApp)
}

export function getAdminFirestore() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return getFirestore(adminApp)
}

export function getAdminStorage() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return getStorage(adminApp)
}

export function getAdminDatabase() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return getDatabase(adminApp)
}
