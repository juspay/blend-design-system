import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { env } from './index.js'
import { logger } from '@/utils/logger.js'

let db: Firestore | null = null

export const initFirestore = (): Firestore => {
    if (db) return db

    try {
        const serviceAccount: ServiceAccount = {
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }

        const app = initializeApp(
            {
                credential: cert(serviceAccount),
            },
            'blend-backend'
        )

        db = getFirestore(app)
        logger.info('Firestore initialized successfully')
        return db
    } catch (error) {
        logger.error({ error }, 'Failed to initialize Firestore')
        throw error
    }
}

export const getFirestoreDb = (): Firestore => {
    if (!db) {
        return initFirestore()
    }
    return db
}

export const firestoreCollections = {
    branches: () => getFirestoreDb().collection('branches'),
    branch: (branchId: string) =>
        getFirestoreDb().collection('branches').doc(branchId),
    versions: (branchId: string) =>
        getFirestoreDb()
            .collection('branches')
            .doc(branchId)
            .collection('versions'),
    snapshots: (branchId: string) =>
        getFirestoreDb()
            .collection('branches')
            .doc(branchId)
            .collection('snapshots'),
}

export default {
    initFirestore,
    getFirestoreDb,
    firestoreCollections,
}
