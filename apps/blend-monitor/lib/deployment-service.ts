import { exec } from 'child_process'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'
import { getAdminDatabase, getAdminAuth } from './firebase-admin'
import type {
    Deployment,
    DeploymentRequest,
    DeploymentApproval,
    BuildCache,
    DeploymentNotification,
} from '@/types'

const execAsync = promisify(exec)

export class DeploymentService {
    private db: any
    private auth: any
    private deploymentQueue: Map<string, Deployment> = new Map()
    private buildCacheDir: string
    private projectRoot: string

    constructor() {
        this.db = getAdminDatabase()
        this.auth = getAdminAuth()

        // Set project root and build cache directory
        this.projectRoot = path.resolve(process.cwd(), '../..')
        this.buildCacheDir = path.join(this.projectRoot, '.build-cache')

        this.initializeBuildCache()
    }

    private async initializeBuildCache() {
        try {
            await fs.mkdir(this.buildCacheDir, { recursive: true })
        } catch (error) {
            console.error('Failed to create build cache directory:', error)
        }
    }

    /**
     * Main deployment method
     */
    async deployToHosting(
        request: DeploymentRequest,
        userId: string
    ): Promise<Deployment> {
        // Create deployment record
        const deployment = await this.createDeploymentRecord(request, userId)

        // Check if approval is required
        if (request.requireApproval || request.target === 'blend-prod') {
            await this.createApprovalRequest(deployment)
            await this.updateDeploymentStatus(deployment.id, 'pending_approval')
            await this.createNotification({
                type: 'approval_required',
                deploymentId: deployment.id,
                title: 'Deployment Approval Required',
                message: `Deployment to ${request.target} requires approval`,
                severity: 'warning',
            })
            return deployment
        }

        // Start deployment process
        this.processDeployment(deployment, request)
        return deployment
    }

    /**
     * Process deployment (build and deploy)
     */
    private async processDeployment(
        deployment: Deployment,
        request: DeploymentRequest
    ) {
        try {
            // Update status to building
            await this.updateDeploymentStatus(deployment.id, 'building')
            await this.createNotification({
                type: 'deployment_started',
                deploymentId: deployment.id,
                title: 'Deployment Started',
                message: `Building for ${request.target}`,
                severity: 'info',
            })

            // Check for cached build
            let buildPath: string
            if (request.buildOptions?.cache !== false) {
                const cachedBuild = await this.getCachedBuild(
                    request.commitSha || '',
                    request.target
                )
                if (cachedBuild) {
                    console.log('Using cached build:', cachedBuild.id)
                    buildPath = cachedBuild.artifactPath
                    await this.addBuildLog(
                        deployment.id,
                        'Using cached build from ' + cachedBuild.createdAt
                    )
                } else {
                    buildPath = await this.executeBuild(deployment, request)
                }
            } else {
                buildPath = await this.executeBuild(deployment, request)
            }

            // Update status to deploying
            await this.updateDeploymentStatus(deployment.id, 'deploying')

            // Execute deployment
            await this.executeDeployment(deployment, request, buildPath)

            // Update status to success
            await this.updateDeploymentStatus(deployment.id, 'success')
            await this.createNotification({
                type: 'deployment_success',
                deploymentId: deployment.id,
                title: 'Deployment Successful',
                message: `Successfully deployed to ${request.target}`,
                severity: 'success',
            })
        } catch (error) {
            console.error('Deployment failed:', error)
            await this.updateDeploymentStatus(deployment.id, 'failed')
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred'
            await this.addDeploymentLog(deployment.id, `Error: ${errorMessage}`)
            await this.createNotification({
                type: 'deployment_failed',
                deploymentId: deployment.id,
                title: 'Deployment Failed',
                message: errorMessage,
                severity: 'error',
            })
        }
    }

    /**
     * Execute build process
     */
    private async executeBuild(
        deployment: Deployment,
        request: DeploymentRequest
    ): Promise<string> {
        const buildId = uuidv4()
        const buildPath = path.join(this.buildCacheDir, buildId)

        // Get the project root directory (two levels up from apps/blend-monitor)
        const projectRoot = path.resolve(process.cwd(), '../..')

        try {
            await this.addBuildLog(deployment.id, 'Starting build process...')

            // Create build directory
            await fs.mkdir(buildPath, { recursive: true })

            // Clean if requested
            if (request.buildOptions?.clean) {
                await this.addBuildLog(
                    deployment.id,
                    'Cleaning previous builds...'
                )
                await execAsync(`rm -rf ${projectRoot}/dist`)
            }

            // Checkout specific branch if provided
            if (request.branch) {
                await this.addBuildLog(
                    deployment.id,
                    `Checking out branch: ${request.branch}`
                )
                await execAsync(
                    `cd ${projectRoot} && git checkout ${request.branch}`
                )
            }

            // Build Ascent
            await this.addBuildLog(
                deployment.id,
                'Building Ascent documentation...'
            )
            await this.updateBuildProgress(deployment.id, 25)

            const ascentBuildCmd = `cd ${projectRoot}/apps/ascent && npm run build`
            const { stdout: ascentOut, stderr: ascentErr } =
                await execAsync(ascentBuildCmd)
            if (ascentErr)
                await this.addBuildLog(
                    deployment.id,
                    `Ascent warnings: ${ascentErr}`
                )

            // Build Storybook
            await this.addBuildLog(deployment.id, 'Building Storybook...')
            await this.updateBuildProgress(deployment.id, 50)

            const storybookBuildCmd = `cd ${projectRoot}/apps/storybook && pnpm build-storybook`
            const { stdout: sbOut, stderr: sbErr } =
                await execAsync(storybookBuildCmd)
            if (sbErr)
                await this.addBuildLog(
                    deployment.id,
                    `Storybook warnings: ${sbErr}`
                )

            // Prepare deployment package
            await this.addBuildLog(
                deployment.id,
                'Preparing deployment package...'
            )
            await this.updateBuildProgress(deployment.id, 75)

            // Copy builds to cache directory
            await execAsync(`mkdir -p ${buildPath}/dist`)
            await execAsync(
                `cp -r ${projectRoot}/apps/ascent/out/* ${buildPath}/dist/`
            )
            await execAsync(`mkdir -p ${buildPath}/dist/storybook`)
            await execAsync(
                `cp -r ${projectRoot}/apps/storybook/storybook-static/* ${buildPath}/dist/storybook/`
            )

            await this.updateBuildProgress(deployment.id, 100)
            await this.addBuildLog(
                deployment.id,
                'Build completed successfully!'
            )

            // Cache the build
            if (request.buildOptions?.cache !== false && request.commitSha) {
                await this.cacheBuild(
                    request.commitSha,
                    request.target,
                    buildPath
                )
            }

            return buildPath
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown build error'
            await this.addBuildLog(
                deployment.id,
                `Build failed: ${errorMessage}`
            )
            throw error
        }
    }

    /**
     * Execute deployment to Firebase
     */
    private async executeDeployment(
        deployment: Deployment,
        request: DeploymentRequest,
        buildPath: string
    ) {
        try {
            await this.addDeploymentLog(
                deployment.id,
                'Starting deployment to Firebase...'
            )

            // Get the project root directory
            const projectRoot = path.resolve(process.cwd(), '../..')

            // Copy build to dist directory
            await execAsync(`rm -rf ${projectRoot}/dist`)
            await execAsync(`cp -r ${buildPath}/dist ${projectRoot}/`)

            // Deploy to Firebase from project root
            const deployCmd = `cd ${projectRoot} && firebase deploy --only hosting:${request.target} --project ${process.env.FIREBASE_PROJECT_ID}`
            await this.addDeploymentLog(
                deployment.id,
                `Executing: ${deployCmd}`
            )

            const { stdout, stderr } = await execAsync(deployCmd)

            if (stdout) await this.addDeploymentLog(deployment.id, stdout)
            if (stderr)
                await this.addDeploymentLog(
                    deployment.id,
                    `Warnings: ${stderr}`
                )

            // Get deployment URL
            const siteUrl =
                request.target === 'blend-prod'
                    ? 'https://blend-prod.web.app'
                    : request.target === 'blend-staging'
                      ? 'https://blend-staging.web.app'
                      : `https://${request.target}.web.app`

            await this.updateDeployment(deployment.id, {
                siteUrl,
                endTime: new Date().toISOString(),
                duration: Math.floor(
                    (Date.now() - new Date(deployment.startTime).getTime()) /
                        1000
                ),
            })

            await this.addDeploymentLog(
                deployment.id,
                `Deployment completed! View at: ${siteUrl}`
            )
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown deployment error'
            await this.addDeploymentLog(
                deployment.id,
                `Deployment failed: ${errorMessage}`
            )
            throw error
        }
    }

    /**
     * Create deployment record
     */
    private async createDeploymentRecord(
        request: DeploymentRequest,
        userId: string
    ): Promise<Deployment> {
        const deploymentId = uuidv4()

        // Try to get user info, but don't fail if permissions are missing
        let userEmail = 'unknown@example.com'
        let userName = 'Unknown User'

        try {
            const user = await this.auth.getUser(userId)
            userEmail = user.email || userEmail
            userName = user.displayName || user.email || userName
        } catch (error) {
            console.log('Could not fetch user details, using userId:', userId)
            userEmail = `user-${userId}@blend-monitor.app`
            userName = `User ${userId.substring(0, 8)}`
        }

        // Get current git commit SHA if not provided
        let commitSha = request.commitSha
        if (!commitSha) {
            try {
                const projectRoot = path.resolve(process.cwd(), '../..')
                const { stdout } = await execAsync(
                    `cd ${projectRoot} && git rev-parse HEAD`
                )
                commitSha = stdout.trim()
            } catch (error) {
                commitSha = 'unknown'
            }
        }

        const deployment: Deployment = {
            id: deploymentId,
            environment: request.target,
            version: `deploy-${Date.now()}`,
            deployer: {
                name: userName,
                email: userEmail,
            },
            startTime: new Date().toISOString(),
            status: 'in_progress',
            commitSha,
            source: 'hosting',
            service: `Hosting: ${request.target}`,
            rollbackAvailable: false,
            buildLogs: [],
            deploymentLogs: [],
        }

        // Add optional fields only if they have values
        if (request.branch) {
            deployment.branch = request.branch
        }
        if (request.scheduledFor) {
            deployment.scheduledFor = request.scheduledFor
        }

        // Save to database
        await this.db.ref(`deployments/history/${deploymentId}`).set(deployment)
        this.deploymentQueue.set(deploymentId, deployment)

        return deployment
    }

    /**
     * Create approval request
     */
    private async createApprovalRequest(
        deployment: Deployment
    ): Promise<DeploymentApproval> {
        const approvalId = uuidv4()
        const approval: DeploymentApproval = {
            id: approvalId,
            deploymentId: deployment.id,
            requestedBy: deployment.deployer.email,
            requestedAt: new Date().toISOString(),
            status: 'pending',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        }

        await this.db.ref(`deployments/approvals/${approvalId}`).set(approval)
        await this.updateDeployment(deployment.id, { approval })

        return approval
    }

    /**
     * Approve deployment
     */
    async approveDeployment(
        deploymentId: string,
        approverId: string,
        comments?: string
    ): Promise<void> {
        const deployment = await this.getDeployment(deploymentId)
        if (!deployment || !deployment.approval) {
            throw new Error('Deployment not found or no approval required')
        }

        // Try to get approver info
        let approverEmail = 'unknown'
        try {
            const user = await this.auth.getUser(approverId)
            approverEmail = user.email || `user-${approverId}@blend-monitor.app`
        } catch (error) {
            console.log(
                'Could not fetch approver details, using approverId:',
                approverId
            )
            approverEmail = `user-${approverId}@blend-monitor.app`
        }

        // Update approval
        const approval: DeploymentApproval = {
            ...deployment.approval,
            approvedBy: approverEmail,
            approvedAt: new Date().toISOString(),
            status: 'approved',
            comments,
        }

        await this.db
            .ref(`deployments/approvals/${approval.id}`)
            .update(approval)
        await this.updateDeployment(deploymentId, { approval })
        await this.updateDeploymentStatus(deploymentId, 'approved')

        // Get original request and process deployment
        const request = await this.getDeploymentRequest(deploymentId)
        if (request) {
            this.processDeployment(deployment, request)
        }
    }

    /**
     * Helper methods
     */
    private async updateDeploymentStatus(
        deploymentId: string,
        status: Deployment['status']
    ) {
        await this.db
            .ref(`deployments/history/${deploymentId}/status`)
            .set(status)
        const deployment = this.deploymentQueue.get(deploymentId)
        if (deployment) {
            deployment.status = status
        }
    }

    private async updateDeployment(
        deploymentId: string,
        updates: Partial<Deployment>
    ) {
        await this.db.ref(`deployments/history/${deploymentId}`).update(updates)
        const deployment = this.deploymentQueue.get(deploymentId)
        if (deployment) {
            Object.assign(deployment, updates)
        }
    }

    private async addBuildLog(deploymentId: string, log: string) {
        const timestamp = new Date().toISOString()
        const logEntry = `[${timestamp}] ${log}`
        await this.db
            .ref(`deployments/history/${deploymentId}/buildLogs`)
            .push(logEntry)
        console.log(`[BUILD ${deploymentId}] ${log}`)
    }

    private async addDeploymentLog(deploymentId: string, log: string) {
        const timestamp = new Date().toISOString()
        const logEntry = `[${timestamp}] ${log}`
        await this.db
            .ref(`deployments/history/${deploymentId}/deploymentLogs`)
            .push(logEntry)
        console.log(`[DEPLOY ${deploymentId}] ${log}`)
    }

    private async updateBuildProgress(deploymentId: string, progress: number) {
        await this.createNotification({
            type: 'build_progress',
            deploymentId,
            title: 'Build Progress',
            message: `Build is ${progress}% complete`,
            severity: 'info',
            progress,
        })
    }

    private async createNotification(
        notification: Omit<DeploymentNotification, 'id' | 'timestamp' | 'read'>
    ) {
        const notificationId = uuidv4()
        const fullNotification: DeploymentNotification = {
            ...notification,
            id: notificationId,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: `/deployments/history/${notification.deploymentId}`,
        }

        await this.db
            .ref(`deployments/notifications/${notificationId}`)
            .set(fullNotification)
    }

    private async getCachedBuild(
        commitSha: string,
        target: string
    ): Promise<BuildCache | null> {
        if (!commitSha) return null

        const cacheKey = this.generateCacheKey(commitSha, target)
        const snapshot = await this.db
            .ref(`deployments/buildCache/${cacheKey}`)
            .once('value')
        const cache = snapshot.val()

        if (cache && new Date(cache.expiresAt) > new Date()) {
            // Check if build artifacts still exist
            try {
                await fs.access(cache.artifactPath)
                return cache
            } catch {
                // Cache entry exists but artifacts are missing
                await this.db.ref(`deployments/buildCache/${cacheKey}`).remove()
                return null
            }
        }

        return null
    }

    private async cacheBuild(
        commitSha: string,
        target: string,
        buildPath: string
    ) {
        const cacheKey = this.generateCacheKey(commitSha, target)
        const cache: BuildCache = {
            id: cacheKey,
            commitSha,
            target,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            size: 0, // TODO: Calculate actual size
            artifactPath: buildPath,
            buildLogs: [],
        }

        await this.db.ref(`deployments/buildCache/${cacheKey}`).set(cache)
    }

    private generateCacheKey(commitSha: string, target: string): string {
        return crypto
            .createHash('md5')
            .update(`${commitSha}-${target}`)
            .digest('hex')
    }

    private async getDeployment(
        deploymentId: string
    ): Promise<Deployment | null> {
        const snapshot = await this.db
            .ref(`deployments/history/${deploymentId}`)
            .once('value')
        return snapshot.val()
    }

    private async getDeploymentRequest(
        deploymentId: string
    ): Promise<DeploymentRequest | null> {
        // TODO: Store and retrieve deployment requests
        // For now, return a basic request
        const deployment = await this.getDeployment(deploymentId)
        if (!deployment) return null

        return {
            target: deployment.environment as any,
            commitSha: deployment.commitSha,
            branch: deployment.branch,
        }
    }

    /**
     * Get deployment history
     */
    async getDeploymentHistory(limit: number = 50): Promise<Deployment[]> {
        const snapshot = await this.db
            .ref('deployments/history')
            .orderByChild('startTime')
            .limitToLast(limit)
            .once('value')

        const deployments: Deployment[] = []
        snapshot.forEach((child: any) => {
            deployments.push(child.val())
        })

        return deployments.reverse()
    }

    /**
     * Get pending approvals
     */
    async getPendingApprovals(): Promise<DeploymentApproval[]> {
        const snapshot = await this.db
            .ref('deployments/approvals')
            .orderByChild('status')
            .equalTo('pending')
            .once('value')

        const approvals: DeploymentApproval[] = []
        snapshot.forEach((child: any) => {
            approvals.push(child.val())
        })

        return approvals
    }

    /**
     * Rollback deployment
     */
    async rollbackDeployment(
        deploymentId: string,
        userId: string
    ): Promise<void> {
        // TODO: Implement rollback functionality
        throw new Error('Rollback not yet implemented')
    }
}

// Export singleton instance
export const deploymentService = new DeploymentService()
