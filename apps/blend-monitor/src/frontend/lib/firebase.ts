import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'

// Fallback configuration for build time when env vars are not available
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-api-key',
    authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
        'dummy-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
    storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
        'dummy-project.appspot.com',
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId:
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
        '1:123456789:web:dummy-app-id',
}

// Only initialize Firebase if we're in the browser or have real config
let app: FirebaseApp | null = null
let auth: Auth

try {
    // Check if we have a real API key (not the dummy one)
    if (firebaseConfig.apiKey !== 'dummy-api-key') {
        app = initializeApp(firebaseConfig)
        auth = getAuth(app)
    } else {
        // Create a mock auth object for build time
        auth = {
            currentUser: null,
            onAuthStateChanged: () => () => {},
            signInWithEmailAndPassword: () =>
                Promise.reject(new Error('Firebase not configured')),
            signOut: () => Promise.reject(new Error('Firebase not configured')),
        } as unknown as Auth
    }
} catch (error) {
    console.warn('Firebase initialization failed, using mock auth:', error)
    // Create a mock auth object for build time
    auth = {
        currentUser: null,
        onAuthStateChanged: () => () => {},
        signInWithEmailAndPassword: () =>
            Promise.reject(new Error('Firebase not configured')),
        signOut: () => Promise.reject(new Error('Firebase not configured')),
    } as unknown as Auth
}

export { app, auth }
