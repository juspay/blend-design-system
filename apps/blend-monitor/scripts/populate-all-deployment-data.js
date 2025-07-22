#!/usr/bin/env node

const admin = require('firebase-admin')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

// Initialize Firebase Admin
let serviceAccount
const serviceAccountPath = path.join(
    __dirname,
    '../firebase-service-account.json'
)

// Try to load from file first, then from environment variables
if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath)
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    } catch (error) {
        console.error('Error parsing FIREBASE_SERVICE_ACCOUNT from environment')
    }
} else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
) {
    serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
}

if (!serviceAccount || !serviceAccount.project_id) {
    console.error('Error: Firebase service account credentials not found')
    console.error('\nPlease do one of the following:')
    console.error(
        '1. Create a firebase-service-account.json file in the app directory'
    )
    console.error(
        '2. Set FIREBASE_SERVICE_ACCOUNT environment variable with the JSON content'
    )
    console.error(
        '3. Set individual environment variables: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY'
    )
    console.error('\nTo get service account credentials:')
    console.error(
        '1. Go to Firebase Console > Project Settings > Service Accounts'
    )
    console.error('2. Click "Generate new private key"')
    console.error('3. Save the file or copy the values to your .env.local file')
    process.exit(1)
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        process.env.FIREBASE_DATABASE_URL ||
        `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
})

const db = admin.database()
const firestore = admin.firestore()

// Function to run Firebase CLI commands
async function runFirebaseCommand(command) {
    try {
        const { stdout, stderr } = await execAsync(`firebase ${command} --json`)
        if (stderr && !stderr.includes('Warning')) {
            console.error('Firebase CLI error:', stderr)
        }

        // Try to parse JSON response
        try {
            const result = JSON.parse(stdout)
            return result
        } catch (parseError) {
            // If JSON parsing fails, return the raw output
            return stdout
        }
    } catch (error) {
        console.error(`Error running firebase ${command}:`, error.message)
        return null
    }
}

// Check if Firebase CLI is installed
async function checkFirebaseCLI() {
    try {
        await execAsync('firebase --version')
        return true
    } catch (error) {
        console.error(
            'Firebase CLI not found. Please install it with: npm install -g firebase-tools'
        )
        return false
    }
}

// Check if logged in to Firebase
async function checkFirebaseAuth() {
    try {
        await execAsync('firebase projects:list')
        return true
    } catch (error) {
        console.error('Not logged in to Firebase. Please run: firebase login')
        return false
    }
}

// Fetch and populate hosting data
async function populateHostingData() {
    console.log('\n📦 Populating Hosting Data...')

    const sitesResponse = await runFirebaseCommand('hosting:sites:list')

    let sites = []
    if (sitesResponse?.status === 'success' && sitesResponse?.result) {
        sites = Array.isArray(sitesResponse.result)
            ? sitesResponse.result
            : sitesResponse.result.sites || []
    } else if (Array.isArray(sitesResponse)) {
        sites = sitesResponse
    }

    const hostingSites = {}
    const hostingDeployments = []

    if (sites.length === 0) {
        console.log('No hosting sites found. Creating sample data...')

        // Sample hosting sites
        hostingSites['storybook-452807'] = {
            name: 'storybook-452807',
            defaultUrl: 'https://storybook-452807.web.app',
            type: 'DEFAULT_SITE',
            appId: '1:123456789:web:abcdef123456',
        }

        hostingSites['blend-design-system'] = {
            name: 'blend-design-system',
            defaultUrl: 'https://blend-design-system.web.app',
            type: 'USER_SITE',
            appId: '1:123456789:web:fedcba654321',
        }
    } else {
        console.log(`Found ${sites.length} hosting sites`)

        for (const site of sites) {
            const siteId = site.name
                ? site.name.split('/').pop()
                : site.siteId || site

            hostingSites[siteId] = {
                name: siteId,
                defaultUrl: site.defaultUrl || `https://${siteId}.web.app`,
                type: site.type || 'DEFAULT_SITE',
                appId: site.appId || '',
            }
        }
    }

    // Generate sample deployment history for each site
    Object.keys(hostingSites).forEach((siteId, siteIndex) => {
        for (let i = 0; i < 5; i++) {
            const hoursAgo = i * 6 + siteIndex * 2
            const deployTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000)

            hostingDeployments.push({
                id: `hosting_${siteId}_v1_0_${5 - i}`,
                environment: siteId.includes('staging')
                    ? 'staging'
                    : siteId.includes('dev')
                      ? 'development'
                      : 'production',
                version: `v1.0.${5 - i}`,
                status: i === 0 ? 'success' : i === 3 ? 'failed' : 'success',
                deployer: {
                    name: i % 2 === 0 ? 'GitHub Actions' : 'Developer',
                    email:
                        i % 2 === 0
                            ? 'actions@github.com'
                            : 'developer@example.com',
                },
                startTime: deployTime.toISOString(),
                endTime: new Date(deployTime.getTime() + 120000).toISOString(),
                duration: 120 + Math.floor(Math.random() * 60),
                rollbackAvailable: i > 0,
                commitSha: Math.random().toString(36).substring(2, 9),
                commitMessage: `Deploy to ${siteId} - ${['Feature update', 'Bug fix', 'Performance improvement', 'Security patch', 'Dependency update'][i % 5]}`,
                source: 'hosting',
                service: `Hosting: ${siteId}`,
                siteUrl: hostingSites[siteId].defaultUrl,
            })
        }
    })

    // Store hosting sites
    await db.ref('deployments/hosting_sites').set(hostingSites)
    console.log('✅ Stored hosting sites')

    return hostingDeployments
}

// Skip populating Cloud Functions data (removed sample data)
async function populateFunctionsData() {
    console.log('\n⚡ Skipping Cloud Functions Data (no sample data)...')

    // Clear any existing functions data
    await db.ref('deployments/functions').remove()
    console.log('✅ Cleared Cloud Functions data')

    // Return empty array for deployment history
    return []
}

// Skip populating Performance Metrics data (removed sample data)
async function populatePerformanceData() {
    console.log('\n📊 Skipping Performance Metrics (no sample data)...')

    // Clear any existing performance data
    await db.ref('deployments/performance').remove()
    console.log('✅ Cleared performance metrics data')
}

// Skip populating Usage data (removed sample data)
async function populateUsageData() {
    console.log('\n💰 Skipping Usage & Billing Data (no sample data)...')

    // Clear any existing usage data
    await db.ref('deployments/usage').remove()
    console.log('✅ Cleared usage and billing data')
}

// Populate environment status
async function populateEnvironmentStatus(hostingSites) {
    console.log('\n🌍 Populating Environment Status...')

    // Map actual hosting sites to environments
    const environments = {}

    // Check if we have actual hosting sites
    const siteIds = Object.keys(hostingSites)

    // Map blend-prod to production
    if (hostingSites['blend-prod']) {
        environments.production = {
            status: 'healthy',
            url: hostingSites['blend-prod'].defaultUrl,
            currentVersion: 'v1.0.5',
            lastDeployment: new Date().toISOString(),
            uptime: 99.95,
            healthChecks: {
                api: 'passing',
                database: 'passing',
                storage: 'passing',
            },
            siteId: 'blend-prod',
        }
    }

    // Map blend-staging to staging
    if (hostingSites['blend-staging']) {
        environments.staging = {
            status: 'degraded',
            url: hostingSites['blend-staging'].defaultUrl,
            currentVersion: 'v1.0.6-beta',
            lastDeployment: new Date(Date.now() - 3600000).toISOString(),
            uptime: 98.5,
            healthChecks: {
                api: 'passing',
                database: 'warning',
                storage: 'passing',
            },
            siteId: 'blend-staging',
        }
    }

    // Map storybook site to development or create a development environment
    if (hostingSites['storybook-452807']) {
        environments.development = {
            status: 'healthy',
            url: hostingSites['storybook-452807'].defaultUrl,
            currentVersion: 'v1.0.7-dev',
            lastDeployment: new Date(Date.now() - 7200000).toISOString(),
            uptime: 95.2,
            healthChecks: {
                api: 'passing',
                database: 'passing',
                storage: 'passing',
            },
            siteId: 'storybook-452807',
        }
    }

    // If no environments were created, use defaults
    if (Object.keys(environments).length === 0) {
        environments.production = {
            status: 'healthy',
            url: 'https://example.web.app',
            currentVersion: 'v1.0.5',
            lastDeployment: new Date().toISOString(),
            uptime: 99.95,
            healthChecks: {
                api: 'passing',
                database: 'passing',
                storage: 'passing',
            },
        }
    }

    await db.ref('deployments/environments').set(environments)
    console.log('✅ Stored environment status')
}

// Main execution
async function main() {
    console.log('🚀 Populating All Firebase Deployment Data...\n')

    try {
        // Check prerequisites
        const hasFirebaseCLI = await checkFirebaseCLI()
        const isAuthenticated = hasFirebaseCLI
            ? await checkFirebaseAuth()
            : false

        if (!hasFirebaseCLI || !isAuthenticated) {
            console.log(
                '\n⚠️  Firebase CLI not available or not authenticated.'
            )
            console.log('Proceeding with sample data generation...\n')
        }

        // Collect all deployments
        const allDeployments = []

        // 1. Populate Hosting Data
        const hostingDeployments = await populateHostingData()
        allDeployments.push(...hostingDeployments)

        // Get hosting sites for environment mapping
        const hostingSites =
            (await db.ref('deployments/hosting_sites').once('value')).val() ||
            {}

        // 2. Populate Cloud Functions Data
        const functionDeployments = await populateFunctionsData()
        allDeployments.push(...functionDeployments)

        // 3. Populate Performance Metrics
        await populatePerformanceData()

        // 4. Populate Environment Status with actual hosting sites
        await populateEnvironmentStatus(hostingSites)

        // 5. Populate Usage Data
        await populateUsageData()

        // 6. Store all deployments in history
        console.log('\n📝 Storing deployment history...')

        // Sort deployments by date
        allDeployments.sort(
            (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
        )

        // Convert to object format for Firebase
        const deploymentObj = {}
        allDeployments.forEach((dep) => {
            deploymentObj[dep.id] = dep
        })

        // Get existing deployments and merge
        const existingDeployments =
            (await db.ref('deployments/history').once('value')).val() || {}
        const mergedDeployments = { ...existingDeployments, ...deploymentObj }

        await db.ref('deployments/history').set(mergedDeployments)
        console.log('✅ Stored deployment history')

        console.log('\n🎉 Successfully populated deployment data!')
        console.log('\nSummary:')
        console.log(`- Hosting sites and deployments`)
        console.log(`- Cloud Functions data cleared (no sample data)`)
        console.log(`- Performance metrics cleared (no sample data)`)
        console.log(`- Environment status`)
        console.log(`- Usage and billing data cleared (no sample data)`)
        console.log(
            `- Total deployments in history: ${Object.keys(mergedDeployments).length}`
        )
    } catch (error) {
        console.error('\n❌ Error populating data:', error)
    } finally {
        process.exit(0)
    }
}

// Run the script
main()
