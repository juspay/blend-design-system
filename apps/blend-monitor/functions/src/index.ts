import * as functions from 'firebase-functions'
import express from 'express'
import { corsHandler, errorHandler } from './lib/middleware'
import usersRouter from './api/users'
import deploymentsRouter from './api/deployments'
import npmRouter from './api/npm'

// Create Express app
const app = express()

// Apply middleware
app.use(corsHandler)
app.use(express.json())

// Mount routers
app.use('/api/users', usersRouter)
app.use('/api/deployments', deploymentsRouter)
app.use('/api/npm', npmRouter)

// Error handling
app.use(errorHandler)

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app)

// You can also export individual functions if needed
// export const userRole = functions.https.onRequest(usersRouter);
