import * as express from 'express'
import { getAdminAuth, getAdminDatabase } from '../lib/firebase-admin'
import { authenticateRequest } from '../lib/middleware'

const router = express.Router()

// GET /api/users/:userId/role
router.get('/:userId/role', authenticateRequest, async (req, res) => {
    try {
        const { userId } = req.params
        const requestingUser = (req as any).user

        // Check if user is requesting their own role or is an admin
        if (requestingUser.uid !== userId) {
            // For now, only allow users to check their own role
            // TODO: Add admin check once permissions are fixed
            return res.status(403).json({ error: 'Forbidden' })
        }

        const db = getAdminDatabase()
        const roleSnapshot = await db.ref(`users/${userId}/role`).once('value')
        const role = roleSnapshot.val() || 'viewer'

        res.json({ role })
    } catch (error) {
        console.error('Error getting user role:', error)
        res.status(500).json({ error: 'Failed to get user role' })
    }
})

// POST /api/users/:userId/role
router.post('/:userId/role', authenticateRequest, async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body
        const requestingUser = (req as any).user

        // Validate role
        const validRoles = ['viewer', 'editor', 'admin']
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role' })
        }

        // For now, only allow self-updates to prevent privilege escalation
        // TODO: Add proper admin check once permissions are fixed
        if (requestingUser.uid !== userId) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        // Prevent self-promotion to admin
        if (role === 'admin') {
            return res
                .status(403)
                .json({ error: 'Cannot self-promote to admin' })
        }

        const db = getAdminDatabase()
        const auth = getAdminAuth()

        // Get user info
        const userRecord = await auth.getUser(userId)

        // Update role in database
        await db.ref(`users/${userId}`).update({
            role,
            email: userRecord.email,
            displayName: userRecord.displayName || userRecord.email,
            updatedAt: new Date().toISOString(),
            updatedBy: requestingUser.email,
        })

        res.json({ success: true, role })
    } catch (error) {
        console.error('Error updating user role:', error)
        res.status(500).json({ error: 'Failed to update user role' })
    }
})

export default router
