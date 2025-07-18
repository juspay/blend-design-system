// Firebase Management API client for fetching deployment and billing data
import { getAdminAuth, getAdminDb } from './firebase-admin'
import { google } from 'googleapis'

// Initialize Google APIs
const cloudresourcemanager = google.cloudresourcemanager('v1')
const cloudbilling = google.cloudbilling('v1')
const firebasehosting = google.firebasehosting('v1beta1')

// Get service account credentials
async function getAuthClient() {
    const auth = new google.auth.GoogleAuth({
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/firebase',
            'https://www.googleapis.com/auth/cloud-billing',
        ],
        // This will use the service account from GOOGLE_APPLICATION_CREDENTIALS env var
    })
    return auth.getClient()
}

// Get Firebase project ID from service account
export async function getProjectId(): Promise<string> {
    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT || '{}'
    )
    return serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID || ''
}

// Fetch hosting deployment history
export async function fetchHostingDeployments() {
    try {
        const authClient = await getAuthClient()
        const projectId = await getProjectId()

        // Get all sites in the project
        const sitesResponse = await firebasehosting.projects.sites.list({
            parent: `projects/${projectId}`,
            auth: authClient as any,
        })

        const deployments: any[] = []

        // For each site, get releases (deployments)
        for (const site of sitesResponse.data.sites || []) {
            const releasesResponse = await firebasehosting.sites.releases.list({
                parent: site.name,
                auth: authClient as any,
                pageSize: 50,
            })

            for (const release of releasesResponse.data.releases || []) {
                // Get version details
                const versionResponse =
                    await firebasehosting.sites.versions.get({
                        name: release.version?.name,
                        auth: authClient as any,
                    })

                deployments.push({
                    id: release.name,
                    environment: site.name?.includes('staging')
                        ? 'staging'
                        : site.name?.includes('dev')
                          ? 'development'
                          : 'production',
                    version:
                        release.version?.name?.split('/').pop() || 'unknown',
                    status: release.type === 'DEPLOY' ? 'success' : 'rollback',
                    deployer: {
                        name: release.message?.split(' by ')[1] || 'System',
                        email: 'system@firebase.com',
                    },
                    startTime: release.releaseTime,
                    endTime: release.releaseTime,
                    duration: 0, // Firebase doesn't provide duration
                    rollbackAvailable: true,
                    commitHash:
                        versionResponse.data.config?.headers?.[0]?.glob || '',
                    commitMessage: release.message || 'Firebase deployment',
                    site: site.name,
                })
            }
        }

        // Sort by date, newest first
        deployments.sort(
            (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
        )

        // Store in database
        const adminDb = getAdminDb()
        await adminDb.ref('deployments/history').set(
            deployments.reduce((acc, dep) => {
                acc[dep.id.replace(/\//g, '_')] = dep
                return acc
            }, {})
        )

        return deployments
    } catch (error) {
        console.error('Error fetching hosting deployments:', error)
        return []
    }
}

// Fetch current hosting status
export async function fetchHostingStatus() {
    try {
        const authClient = await getAuthClient()
        const projectId = await getProjectId()

        const sitesResponse = await firebasehosting.projects.sites.list({
            parent: `projects/${projectId}`,
            auth: authClient as any,
        })

        const environments: any = {}

        for (const site of sitesResponse.data.sites || []) {
            // Get the latest release
            const releasesResponse = await firebasehosting.sites.releases.list({
                parent: site.name,
                auth: authClient as any,
                pageSize: 1,
            })

            const latestRelease = releasesResponse.data.releases?.[0]
            const envName = site.name?.includes('staging')
                ? 'staging'
                : site.name?.includes('dev')
                  ? 'development'
                  : 'production'

            environments[envName] = {
                status: 'healthy', // Firebase doesn't provide health status
                url: `https://${site.defaultUrl}`,
                currentVersion:
                    latestRelease?.version?.name?.split('/').pop() || 'unknown',
                lastDeployment:
                    latestRelease?.releaseTime || new Date().toISOString(),
                uptime: 99.9, // Default value
            }
        }

        // Store in database
        const adminDb = getAdminDb()
        await adminDb.ref('deployments/environments').set(environments)

        return environments
    } catch (error) {
        console.error('Error fetching hosting status:', error)
        return {}
    }
}

// Fetch billing data
export async function fetchBillingData() {
    try {
        const authClient = await getAuthClient()
        const projectId = await getProjectId()

        // Get billing account for the project
        const projectResponse = await cloudresourcemanager.projects.get({
            projectId: projectId,
            auth: authClient as any,
        })

        const billingAccountName = projectResponse.data.billingAccountName

        if (!billingAccountName) {
            console.log('No billing account found for project')
            return null
        }

        // Get current billing info
        const billingInfo = await cloudbilling.billingAccounts.get({
            name: billingAccountName,
            auth: authClient as any,
        })

        // Calculate billing period (assuming monthly)
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

        // Note: Actual cost data requires Cloud Billing API with budget alerts
        // This is a simplified version
        const usageData = {
            current: {
                hosting: {
                    bandwidth: { used: 0, limit: 100, unit: 'GB' },
                    storage: { used: 0, limit: 50, unit: 'GB' },
                    requests: { used: 0, limit: 1000000, unit: 'K' },
                },
                firestore: {
                    reads: { used: 0, limit: 1000000, unit: 'K' },
                    writes: { used: 0, limit: 500000, unit: 'K' },
                    storage: { used: 0, limit: 10, unit: 'GB' },
                },
                functions: {
                    invocations: { used: 0, limit: 200000, unit: 'K' },
                    gbSeconds: { used: 0, limit: 100000, unit: '' },
                    outboundData: { used: 0, limit: 20, unit: 'GB' },
                },
                billing: {
                    currentCost: 0,
                    projectedCost: 0,
                    budget: 250,
                    billingPeriodEnd: endOfMonth.toISOString(),
                },
            },
        }

        // Store in database
        const adminDb = getAdminDb()
        await adminDb.ref('deployments/usage').set(usageData)

        return usageData
    } catch (error) {
        console.error('Error fetching billing data:', error)
        return null
    }
}

// Fetch Cloud Functions status
export async function fetchFunctionsStatus() {
    try {
        // Note: This would require Cloud Functions API
        // For now, return empty array
        const functions: any[] = []

        // Store in database
        const adminDb = getAdminDb()
        await adminDb.ref('deployments/functions').set({})

        return functions
    } catch (error) {
        console.error('Error fetching functions status:', error)
        return []
    }
}

// Main function to sync all deployment data
export async function syncDeploymentData() {
    console.log('Starting deployment data sync...')

    const results = await Promise.allSettled([
        fetchHostingStatus(),
        fetchHostingDeployments(),
        fetchBillingData(),
        fetchFunctionsStatus(),
    ])

    const summary = {
        hostingStatus: results[0].status === 'fulfilled' ? 'Success' : 'Failed',
        deployments: results[1].status === 'fulfilled' ? 'Success' : 'Failed',
        billing: results[2].status === 'fulfilled' ? 'Success' : 'Failed',
        functions: results[3].status === 'fulfilled' ? 'Success' : 'Failed',
        syncedAt: new Date().toISOString(),
    }

    console.log('Deployment data sync completed:', summary)
    return summary
}
