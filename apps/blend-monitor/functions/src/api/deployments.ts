import * as express from 'express'
import { getAdminDatabase } from '../lib/firebase-admin'
import { authenticateRequest } from '../lib/middleware'

const router = express.Router()

// GET /api/deployments/history
router.get('/history', authenticateRequest, async (req, res) => {
    try {
        const limit = parseInt((req.query.limit as string) || '50')
        const environment = (req.query.environment as string) || undefined
        const source = (req.query.source as string) || 'all'

        const db = getAdminDatabase()
        let query = db.ref('deployments').orderByChild('timestamp')

        // Get all deployments first
        const snapshot = await query.once('value')
        let deployments: any[] = []

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
router.post('/history', authenticateRequest, async (req, res) => {
    try {
        const { environment, version, commitSha, deployer } = req.body
        const user = (req as any).user

        if (!environment || !version || !commitSha) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const db = getAdminDatabase()
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
router.get('/usage', authenticateRequest, async (req, res) => {
    try {
        const db = getAdminDatabase()
        const snapshot = await db.ref('firebase-usage').once('value')
        const usage = snapshot.val() || {}

        res.json(usage)
    } catch (error) {
        console.error('Error fetching usage data:', error)
        res.status(500).json({ error: 'Failed to fetch usage data' })
    }
})

// GET /api/deployments/performance
router.get('/performance', authenticateRequest, async (req, res) => {
    try {
        const db = getAdminDatabase()
        const snapshot = await db.ref('performance-metrics').once('value')
        const metrics = snapshot.val() || {}

        res.json(metrics)
    } catch (error) {
        console.error('Error fetching performance metrics:', error)
        res.status(500).json({ error: 'Failed to fetch performance metrics' })
    }
})

// POST /api/deployments/rollback
router.post('/rollback', authenticateRequest, async (req, res) => {
    try {
        const { deploymentId } = req.body
        const user = (req as any).user

        if (!deploymentId) {
            return res.status(400).json({ error: 'Deployment ID required' })
        }

        const db = getAdminDatabase()

        // Get the deployment to rollback
        const deploymentSnapshot = await db
            .ref(`deployments/${deploymentId}`)
            .once('value')
        const deployment = deploymentSnapshot.val()

        if (!deployment) {
            return res.status(404).json({ error: 'Deployment not found' })
        }

        // Create a rollback deployment
        const rollbackDeployment = {
            ...deployment,
            id: undefined, // Remove the old ID
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
router.get('/hosting/status', authenticateRequest, async (req, res) => {
    try {
        const deploymentId = req.query.deploymentId as string

        if (!deploymentId) {
            return res.status(400).json({ error: 'Deployment ID is required' })
        }

        const db = getAdminDatabase()

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
        const buildLogs: string[] = []
        buildLogsSnapshot.forEach((child: any) => {
            buildLogs.push(child.val())
        })

        // Get deployment logs
        const deploymentLogsSnapshot = await db
            .ref(`deployments/history/${deploymentId}/deploymentLogs`)
            .once('value')
        const deploymentLogs: string[] = []
        deploymentLogsSnapshot.forEach((child: any) => {
            deploymentLogs.push(child.val())
        })

        res.json({
            success: true,
            deployment: {
                ...deployment,
                buildLogs,
                deploymentLogs,
            },
        })
    } catch (error) {
        console.error('Status API error:', error)
        res.status(500).json({
            error: 'Failed to get deployment status',
            message: error instanceof Error ? error.message : 'Unknown error',
        })
    }
})

export default router
