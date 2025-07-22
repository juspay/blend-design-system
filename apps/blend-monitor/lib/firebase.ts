import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getDatabase, Database } from 'firebase/database'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only on client side
let app: FirebaseApp | null = null
let database: Database | null = null
let auth: Auth | null = null

if (typeof window !== 'undefined') {
    try {
        // Client-side initialization
        console.log('Initializing Firebase with config:', {
            ...firebaseConfig,
            apiKey: firebaseConfig.apiKey ? '***' : 'missing',
            databaseURL: firebaseConfig.databaseURL || 'missing',
        })

        if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
            console.error(
                'Firebase configuration is incomplete. Check your environment variables.'
            )
        } else {
            app =
                getApps().length === 0
                    ? initializeApp(firebaseConfig)
                    : getApp()

            // Initialize auth first (doesn't require database URL)
            auth = getAuth(app)

            // Try to initialize database
            try {
                database = getDatabase(app)
            } catch (dbError) {
                console.warn(
                    'Firebase Realtime Database initialization failed:',
                    dbError
                )
                console.warn(
                    'The app will work but database features will be limited.'
                )
            }
        }
    } catch (error) {
        console.error('Firebase initialization error:', error)
    }
}

export { app, database, auth }
