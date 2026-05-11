import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy-api-key',
    authDomain:
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
        'dummy-project.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy-project',
    storageBucket:
        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
        'dummy-project.appspot.com',
    messagingSenderId:
        import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId:
        import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:dummy-app-id',
}

export const isConfigured = Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_API_KEY !== 'dummy-api-key'
)

let app: FirebaseApp | null = null

const mockAuth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () =>
        Promise.reject(new Error('Firebase not configured')),
    signOut: () => Promise.reject(new Error('Firebase not configured')),
} as unknown as Auth

let auth: Auth

try {
    if (isConfigured) {
        app = initializeApp(firebaseConfig)
        auth = getAuth(app)
    } else {
        auth = mockAuth
    }
} catch (error) {
    console.warn('Firebase initialization failed, using mock auth:', error)
    auth = mockAuth
}

export { app, auth }
