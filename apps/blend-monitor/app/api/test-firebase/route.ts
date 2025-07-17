import { NextResponse } from 'next/server'
import { ref, set, get } from 'firebase/database'
import { database } from '@/lib/firebase'

export async function GET() {
    try {
        // Test 1: Check if Firebase is initialized
        console.log(
            'Firebase database instance:',
            database ? 'Initialized' : 'Not initialized'
        )

        // Test 2: Try to write a simple test value
        const testRef = ref(database, 'blend-monitor/test')
        console.log('Attempting to write to Firebase...')

        await set(testRef, {
            message: 'Test write successful',
            timestamp: new Date().toISOString(),
        })

        console.log('Write successful!')

        // Test 3: Try to read it back
        const snapshot = await get(testRef)
        const data = snapshot.val()
        console.log('Read back data:', data)

        return NextResponse.json({
            success: true,
            firebaseInitialized: !!database,
            writeTest: 'Success',
            readTest: data,
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        })
    } catch (error: any) {
        console.error('Firebase test error:', error)

        return NextResponse.json(
            {
                success: false,
                error: error.message,
                code: error.code,
                details: {
                    firebaseInitialized: !!database,
                    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
                    errorStack: error.stack,
                },
            },
            { status: 500 }
        )
    }
}
