import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDatabase } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
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
      
      // Get request body
      const body = await request.json()
      const { name, email, age } = body

      if (!name || !email) {
        return NextResponse.json(
          { message: 'Name and email are required' },
          { status: 400 }
        )
      }

      // Create user data
      const userData = {
        name,
        email,
        age: age || null,
        createdAt: new Date().toISOString(),
        createdBy: decodedToken.uid,
      }

      // Save to Firebase Realtime Database
      const usersRef = adminDatabase.ref('users')
      const newUserRef = usersRef.push()
      await newUserRef.set(userData)

      return NextResponse.json({
        message: 'User created successfully',
        userId: newUserRef.key,
        user: userData,
      })
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
      
      // Get users from Firebase Realtime Database
      const usersRef = adminDatabase.ref('users')
      const snapshot = await usersRef.get()

      if (snapshot.exists()) {
        const users = snapshot.val()
        return NextResponse.json({
          message: 'Users retrieved successfully',
          users,
        })
      } else {
        return NextResponse.json({
          message: 'No users found',
          users: {},
        })
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 