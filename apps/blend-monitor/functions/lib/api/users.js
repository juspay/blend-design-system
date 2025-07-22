'use strict'
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = []
                    for (var k in o)
                        if (Object.prototype.hasOwnProperty.call(o, k))
                            ar[ar.length] = k
                    return ar
                }
            return ownKeys(o)
        }
        return function (mod) {
            if (mod && mod.__esModule) return mod
            var result = {}
            if (mod != null)
                for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                    if (k[i] !== 'default') __createBinding(result, mod, k[i])
            __setModuleDefault(result, mod)
            return result
        }
    })()
Object.defineProperty(exports, '__esModule', { value: true })
const express = __importStar(require('express'))
const firebase_admin_1 = require('../lib/firebase-admin')
const middleware_1 = require('../lib/middleware')
const router = express.Router()
// GET /api/users/:userId/role
router.get(
    '/:userId/role',
    middleware_1.authenticateRequest,
    async (req, res) => {
        try {
            const { userId } = req.params
            const requestingUser = req.user
            // Check if user is requesting their own role or is an admin
            if (requestingUser.uid !== userId) {
                // For now, only allow users to check their own role
                // TODO: Add admin check once permissions are fixed
                return res.status(403).json({ error: 'Forbidden' })
            }
            const db = (0, firebase_admin_1.getAdminDatabase)()
            const roleSnapshot = await db
                .ref(`users/${userId}/role`)
                .once('value')
            const role = roleSnapshot.val() || 'viewer'
            res.json({ role })
        } catch (error) {
            console.error('Error getting user role:', error)
            res.status(500).json({ error: 'Failed to get user role' })
        }
    }
)
// POST /api/users/:userId/role
router.post(
    '/:userId/role',
    middleware_1.authenticateRequest,
    async (req, res) => {
        try {
            const { userId } = req.params
            const { role } = req.body
            const requestingUser = req.user
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
            const db = (0, firebase_admin_1.getAdminDatabase)()
            const auth = (0, firebase_admin_1.getAdminAuth)()
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
    }
)
exports.default = router
//# sourceMappingURL=users.js.map
