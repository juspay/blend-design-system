import { getAdminAuth, getAdminDatabase } from './firebase-admin'
import { exec } from 'child_process'
import { promisify } from 'util'
import type { Environment } from '@/types'

const execAsync = promisify(exec)

// Firebase Hosting API client
export class FirebaseHostingClient {
    private projectId: string
    private auth: any
    private db: any

    constructor() {
        this.projectId = process.env.FIREBASE_PROJECT_ID || ''
        this.auth = getAdminAuth()
        this.db = getAdminDatabase()
    }

    /**
     * Get real hosting site data from Firebase using CLI
     */
    async getHostingSites() {
        try {
            console.log('Fetching hosting sites for project:', this.projectId)

            // Try to use Firebase CLI to get hosting sites
            const { stdout } = await execAsync(
                'firebase hosting:sites:list --json'
            ).catch(() => ({ stdout: null }))

            if (stdout) {
                try {
                    const result = JSON.parse(stdout)
                    if (result.status === 'success' && result.result) {
                        return Array.isArray(result.result)
                            ? result.result
                            : result.result.sites || []
                    }
                } catch (e) {
                    console.log('Failed to parse Firebase CLI output')
                }
            }

            // Fallback: Get from database if stored
            const snapshot = await this.db
                .ref('deployments/hosting_sites')
                .once('value')
            const sites = snapshot.val()
            return sites ? Object.values(sites) : []
        } catch (error) {
            console.error('Error fetching hosting sites:', error)
            return []
        }
    }

    /**
     * Get real deployment/release data for a hosting site
     */
    async getHostingReleases(siteId: string) {
        try {
            console.log('Fetching releases for site:', siteId)

            // Try to get from deployment history in database
            const snapshot = await this.db
                .ref('deployments/history')
                .orderByChild('environment')
                .equalTo(siteId)
                .limitToLast(10)
                .once('value')

            const releases: any[] = []
            snapshot.forEach((child: any) => {
                const deployment = child.val()
                if (deployment.source === 'hosting') {
                    releases.push({
                        name: child.key,
                        version: { name: deployment.version },
                        releaseTime: deployment.startTime,
                        status:
                            deployment.status === 'success'
                                ? 'FINALIZED'
                                : 'FAILED',
                        ...deployment,
                    })
                }
            })

            return releases.reverse() // Most recent first
        } catch (error) {
            console.error('Error fetching hosting releases:', error)
            return []
        }
    }

    /**
     * Calculate environment status based on real data
     */
    calculateEnvironmentStatus(
        releases: any[],
        siteUrl: string
    ): Partial<Environment> {
        if (!releases || releases.length === 0) {
            // No releases found, but site exists - consider it healthy
            return {
                status: 'healthy' as const,
                url: siteUrl,
                currentVersion: 'N/A',
                lastDeployment: undefined,
                uptime: 100, // Default to 100% if no data
            }
        }

        // Get the latest release
        const latestRelease = releases[0]
        const releaseTime = new Date(
            latestRelease.releaseTime || latestRelease.createTime
        )

        // Calculate uptime based on successful deployments
        const successfulReleases = releases.filter(
            (r) => r.status === 'FINALIZED' || r.status === 'success'
        )
        const uptime =
            releases.length > 0
                ? (successfulReleases.length / releases.length) * 100
                : 0

        // Determine status based on recent deployments
        let status: 'healthy' | 'degraded' | 'down' = 'healthy'

        // If we have 100% uptime, it's healthy
        if (uptime === 100) {
            status = 'healthy'
        } else if (uptime >= 95) {
            // High uptime but not perfect
            status = 'healthy'
        } else if (uptime >= 80) {
            // Some issues
            status = 'degraded'
        } else {
            // Major issues
            status = 'down'
        }

        // Override based on latest deployment if it failed
        if (
            latestRelease.status !== 'FINALIZED' &&
            latestRelease.status !== 'success'
        ) {
            // Latest deployment failed, at least degraded
            if (status === 'healthy') {
                status = 'degraded'
            }
        }

        // Check recent failures for additional degradation
        const recentReleases = releases.slice(0, 5)
        const recentFailures = recentReleases.filter(
            (r) => r.status !== 'FINALIZED' && r.status !== 'success'
        ).length

        if (recentFailures >= 3 && status === 'healthy') {
            status = 'degraded'
        }
        if (recentFailures >= 4) {
            status = 'down'
        }

        return {
            status,
            url: siteUrl,
            currentVersion:
                latestRelease.version?.name ||
                `release-${latestRelease.name?.split('/').pop()}`,
            lastDeployment: releaseTime.toISOString(),
            uptime: parseFloat(uptime.toFixed(2)),
        }
    }

    /**
     * Get real-time environment status from Firebase
     */
    async getRealEnvironmentStatus(
        environmentName: string
    ): Promise<Environment | null> {
        try {
            // Map environment names to Firebase hosting site IDs
            const siteMapping: Record<string, string> = {
                production: 'blend-prod',
                staging: 'blend-staging',
                development: 'storybook-452807',
            }

            const siteId = siteMapping[environmentName]
            if (!siteId) {
                console.log(
                    `No site mapping found for environment: ${environmentName}`
                )
                return null
            }

            // Get real deployment history for this environment
            const releases = await this.getHostingReleases(siteId)

            // Get the site URL
            const sites = await this.getHostingSites()
            const site = sites.find(
                (s: any) =>
                    s.name === siteId ||
                    s.name?.includes(siteId) ||
                    s.defaultUrl?.includes(siteId)
            )

            // Ensure correct URL for each environment
            let siteUrl = site?.defaultUrl || `https://${siteId}.web.app`
            if (
                environmentName === 'development' &&
                siteId === 'storybook-452807'
            ) {
                siteUrl = 'https://storybook-452807.web.app'
            }

            // Calculate real status based on deployment history
            const environmentStatus = this.calculateEnvironmentStatus(
                releases,
                siteUrl
            )

            // Return real environment data
            const realData: Environment = {
                id: environmentName,
                name: environmentName as
                    | 'production'
                    | 'staging'
                    | 'development',
                status: environmentStatus.status || 'healthy',
                url: environmentStatus.url || siteUrl,
                currentVersion: environmentStatus.currentVersion || 'unknown',
                lastDeployment:
                    environmentStatus.lastDeployment ||
                    new Date().toISOString(),
                uptime: environmentStatus.uptime || 100,
            }

            console.log(`Fetched real status for ${environmentName}:`, realData)
            return realData
        } catch (error) {
            console.error(
                `Error fetching real status for ${environmentName}:`,
                error
            )
            return null
        }
    }
}

// Export singleton instance
export const firebaseHostingClient = new FirebaseHostingClient()
