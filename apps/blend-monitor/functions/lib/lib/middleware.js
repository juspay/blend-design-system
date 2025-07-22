'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.errorHandler =
    exports.authenticateRequest =
    exports.corsHandler =
        void 0
const cors_1 = __importDefault(require('cors'))
const firebase_admin_1 = require('./firebase-admin')
// CORS configuration
exports.corsHandler = (0, cors_1.default)({
    origin: true, // Allow all origins in development, restrict in production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})
// Authentication middleware
const authenticateRequest = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (
            !(authHeader === null || authHeader === void 0
                ? void 0
                : authHeader.startsWith('Bearer '))
        ) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }
        const token = authHeader.split('Bearer ')[1]
        const auth = (0, firebase_admin_1.getAdminAuth)()
        const decodedToken = await auth.verifyIdToken(token)
        // Add user info to request
        req.user = {
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
exports.authenticateRequest = authenticateRequest
// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
    })
}
exports.errorHandler = errorHandler
//# sourceMappingURL=middleware.js.map
