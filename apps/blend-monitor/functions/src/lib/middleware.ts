import cors from 'cors'
import * as admin from 'firebase-admin'
import { Request, Response, NextFunction } from 'express'
import { getAdminAuth } from './firebase-admin'

// CORS configuration
export const corsHandler = cors({
    origin: true, // Allow all origins in development, restrict in production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})

// Authentication middleware
export const authenticateRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const token = authHeader.split('Bearer ')[1]
        const auth = getAdminAuth()
        const decodedToken = await auth.verifyIdToken(token)

        // Add user info to request
        ;(req as any).user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name || decodedToken.email,
        }

        next()
    } catch (error) {
        console.error('Authentication error:', error)
        res.status(401).json({ error: 'Invalid token' })
    }
}

// Error handler middleware
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err)
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
    })
}
