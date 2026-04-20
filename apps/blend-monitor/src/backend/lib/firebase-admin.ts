import * as admin from 'firebase-admin'
import { App } from 'firebase-admin/app'

let adminApp: App | undefined

export function initializeAdmin() {
    if (admin.apps.length === 0) {
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

            adminApp = admin.initializeApp({
                projectId,
                storageBucket,
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID || '',
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
                    privateKey:
                        process.env.FIREBASE_PRIVATE_KEY?.replace(
                            /\\n/g,
                            '\n'
                        ) || '',
                }),
            })
        } catch (error) {
            console.error('Error initializing Firebase Admin:', error)
        }
    } else {
        adminApp = admin.apps[0] as App | undefined
    }

    return adminApp
}

export function getAdminAuth() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return admin.auth(adminApp)
}

export function getAdminFirestore() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return admin.firestore(adminApp)
}

export function getAdminStorage() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return admin.storage(adminApp)
}

export function getAdminDatabase() {
    initializeAdmin()
    if (!adminApp) {
        throw new Error('Firebase Admin not initialized')
    }
    return admin.database(adminApp)
}
