import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]

    try {
      // Verify the Firebase token
      const decodedToken = await adminAuth.verifyIdToken(token)
      
      return NextResponse.json({
        message: 'Pong! Backend is working correctly.',
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email,
        },
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Ping API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 