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
// GET /api/deployments/history
router.get('/history', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit || '50')
        const environment = req.query.environment || undefined
        const source = req.query.source || 'all'
        const db = (0, firebase_admin_1.getAdminDatabase)()
        let query = db.ref('deployments').orderByChild('timestamp')
        // Get all deployments first
        const snapshot = await query.once('value')
        let deployments = []
        snapshot.forEach((child) => {
            const deployment = child.val()
            deployment.id = child.key
            deployments.push(deployment)
        })
        // Filter by environment if specified
        if (environment && environment !== 'all') {
            deployments = deployments.filter(
                (d) => d.environment === environment
            )
        }
        // Filter by source if specified
        if (source && source !== 'all') {
            deployments = deployments.filter((d) => d.source === source)
        }
        // Sort by timestamp descending and limit
        deployments = deployments
            .sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
            )
            .slice(0, limit)
        res.json({ deployments })
    } catch (error) {
        console.error('Error fetching deployment history:', error)
        res.status(500).json({ error: 'Failed to fetch deployment history' })
    }
})
// POST /api/deployments/history
router.post('/history', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const { environment, version, commitSha, deployer } = req.body
        const user = req.user
        if (!environment || !version || !commitSha) {
            return res.status(400).json({ error: 'Missing required fields' })
        }
        const db = (0, firebase_admin_1.getAdminDatabase)()
        const deployment = {
            environment,
            version,
            commitSha,
            deployer: deployer || {
                name: user.displayName || user.email,
                email: user.email,
            },
            startTime: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            status: 'in_progress',
            rollbackAvailable: false,
            source: 'manual',
            createdBy: user.uid,
        }
        const ref = await db.ref('deployments').push(deployment)
        const deploymentId = ref.key
        res.json({
            success: true,
            deploymentId,
        })
    } catch (error) {
        console.error('Error creating deployment:', error)
        res.status(500).json({ error: 'Failed to create deployment' })
    }
})
// GET /api/deployments/usage
router.get('/usage', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const db = (0, firebase_admin_1.getAdminDatabase)()
        const snapshot = await db.ref('firebase-usage').once('value')
        const usage = snapshot.val() || {}
        res.json(usage)
    } catch (error) {
        console.error('Error fetching usage data:', error)
        res.status(500).json({ error: 'Failed to fetch usage data' })
    }
})
// GET /api/deployments/performance
router.get(
    '/performance',
    middleware_1.authenticateRequest,
    async (req, res) => {
        try {
            const db = (0, firebase_admin_1.getAdminDatabase)()
            const snapshot = await db.ref('performance-metrics').once('value')
            const metrics = snapshot.val() || {}
            res.json(metrics)
        } catch (error) {
            console.error('Error fetching performance metrics:', error)
            res.status(500).json({
                error: 'Failed to fetch performance metrics',
            })
        }
    }
)
// POST /api/deployments/rollback
router.post('/rollback', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const { deploymentId } = req.body
        const user = req.user
        if (!deploymentId) {
            return res.status(400).json({ error: 'Deployment ID required' })
        }
        const db = (0, firebase_admin_1.getAdminDatabase)()
        // Get the deployment to rollback
        const deploymentSnapshot = await db
            .ref(`deployments/${deploymentId}`)
            .once('value')
        const deployment = deploymentSnapshot.val()
        if (!deployment) {
            return res.status(404).json({ error: 'Deployment not found' })
        }
        // Create a rollback deployment
        const rollbackDeployment = Object.assign(
            Object.assign({}, deployment),
            {
                id: undefined,
                timestamp: new Date().toISOString(),
                startTime: new Date().toISOString(),
                status: 'in_progress',
                isRollback: true,
                rollbackFrom: deploymentId,
                deployer: {
                    name: user.displayName || user.email,
                    email: user.email,
                },
                createdBy: user.uid,
            }
        )
        const ref = await db.ref('deployments').push(rollbackDeployment)
        const rollbackId = ref.key
        // Update original deployment
        await db.ref(`deployments/${deploymentId}`).update({
            rolledBackAt: new Date().toISOString(),
            rolledBackTo: rollbackId,
        })
        res.json({
            success: true,
            rollbackId,
        })
    } catch (error) {
        console.error('Error creating rollback:', error)
        res.status(500).json({ error: 'Failed to create rollback' })
    }
})
// GET /api/deployments/hosting/status
router.get(
    '/hosting/status',
    middleware_1.authenticateRequest,
    async (req, res) => {
        try {
            const deploymentId = req.query.deploymentId
            if (!deploymentId) {
                return res
                    .status(400)
                    .json({ error: 'Deployment ID is required' })
            }
            const db = (0, firebase_admin_1.getAdminDatabase)()
            // Get deployment status from database
            const snapshot = await db
                .ref(`deployments/history/${deploymentId}`)
                .once('value')
            const deployment = snapshot.val()
            if (!deployment) {
                return res.status(404).json({ error: 'Deployment not found' })
            }
            // Get build logs
            const buildLogsSnapshot = await db
                .ref(`deployments/history/${deploymentId}/buildLogs`)
                .once('value')
            const buildLogs = []
            buildLogsSnapshot.forEach((child) => {
                buildLogs.push(child.val())
            })
            // Get deployment logs
            const deploymentLogsSnapshot = await db
                .ref(`deployments/history/${deploymentId}/deploymentLogs`)
                .once('value')
            const deploymentLogs = []
            deploymentLogsSnapshot.forEach((child) => {
                deploymentLogs.push(child.val())
            })
            res.json({
                success: true,
                deployment: Object.assign(Object.assign({}, deployment), {
                    buildLogs,
                    deploymentLogs,
                }),
            })
        } catch (error) {
            console.error('Status API error:', error)
            res.status(500).json({
                error: 'Failed to get deployment status',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    }
)
exports.default = router
//# sourceMappingURL=deployments.js.map
