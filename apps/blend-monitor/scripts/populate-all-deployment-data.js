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

// Populate Cloud Functions data
async function populateFunctionsData() {
    console.log('\n⚡ Populating Cloud Functions Data...')

    const functions = {
        'api-getData': {
            name: 'api-getData',
            status: 'active',
            runtime: 'nodejs18',
            region: 'us-central1',
            memorySize: 256,
            timeout: 60,
            lastUpdated: Date.now(),
            metrics: {
                invocations: 15234,
                errors: 12,
                avgDuration: 145,
                successRate: 99.92,
            },
        },
        'auth-createUser': {
            name: 'auth-createUser',
            status: 'active',
            runtime: 'nodejs18',
            region: 'us-central1',
            memorySize: 512,
            timeout: 120,
            lastUpdated: Date.now(),
            metrics: {
                invocations: 8456,
                errors: 5,
                avgDuration: 230,
                successRate: 99.94,
            },
        },
        'scheduled-cleanup': {
            name: 'scheduled-cleanup',
            status: 'active',
            runtime: 'nodejs18',
            region: 'us-central1',
            memorySize: 128,
            timeout: 540,
            lastUpdated: Date.now(),
            metrics: {
                invocations: 720,
                errors: 0,
                avgDuration: 1250,
                successRate: 100,
            },
        },
        'storage-processImage': {
            name: 'storage-processImage',
            status: 'inactive',
            runtime: 'nodejs18',
            region: 'us-central1',
            memorySize: 1024,
            timeout: 300,
            lastUpdated: Date.now() - 86400000, // 1 day ago
            metrics: {
                invocations: 0,
                errors: 0,
                avgDuration: 0,
                successRate: 0,
            },
        },
    }

    await db.ref('deployments/functions').set(functions)
    console.log('✅ Stored Cloud Functions data')

    // Generate function deployment history
    const functionDeployments = []
    Object.keys(functions).forEach((funcName, index) => {
        const deployTime = new Date(Date.now() - index * 3 * 60 * 60 * 1000)
        functionDeployments.push({
            id: `function_${funcName}_deploy_${Date.now()}`,
            environment: 'production',
            version: `${funcName}@1.0.${index}`,
            status: 'success',
            deployer: {
                name: 'Firebase CLI',
                email: 'developer@example.com',
            },
            startTime: deployTime.toISOString(),
            endTime: new Date(deployTime.getTime() + 180000).toISOString(),
            duration: 180,
            rollbackAvailable: true,
            commitSha: Math.random().toString(36).substring(2, 9),
            commitMessage: `Deploy function ${funcName}`,
            source: 'functions',
            service: `Functions: ${funcName}`,
        })
    })

    return functionDeployments
}

// Populate Performance Metrics data
async function populatePerformanceData() {
    console.log('\n📊 Populating Performance Metrics...')

    const environments = ['production', 'staging']
    const performanceData = {}

    // Generate performance metrics for the last 24 hours
    for (const env of environments) {
        performanceData[env] = {
            current: {
                responseTime: {
                    p50: 120 + Math.random() * 50,
                    p95: 250 + Math.random() * 100,
                    p99: 500 + Math.random() * 200,
                },
                errorRate: Math.random() * 2,
                requestsPerSecond: 50 + Math.random() * 30,
                cpuUsage: 30 + Math.random() * 40,
                memoryUsage: 40 + Math.random() * 30,
                activeConnections: Math.floor(100 + Math.random() * 50),
                timestamp: Date.now(),
            },
            history: [],
        }

        // Add historical data points
        for (let i = 0; i < 24; i++) {
            const timestamp = Date.now() - i * 60 * 60 * 1000

            performanceData[env].history.push({
                timestamp,
                responseTime: {
                    p50: 120 + Math.random() * 50,
                    p95: 250 + Math.random() * 100,
                    p99: 500 + Math.random() * 200,
                },
                errorRate: Math.random() * 2,
                requestsPerSecond: 50 + Math.random() * 30,
                cpuUsage: 30 + Math.random() * 40,
                memoryUsage: 40 + Math.random() * 30,
                activeConnections: Math.floor(100 + Math.random() * 50),
            })
        }
    }

    // Store in Realtime Database instead of Firestore
    await db.ref('deployments/performance').set(performanceData)
    console.log('✅ Stored performance metrics in Realtime Database')
}

// Populate environment status
async function populateEnvironmentStatus() {
    console.log('\n🌍 Populating Environment Status...')

    const environments = {
        production: {
            status: 'healthy',
            url: 'https://storybook-452807.web.app',
            currentVersion: 'v1.0.5',
            lastDeployment: new Date().toISOString(),
            uptime: 99.95,
            healthChecks: {
                api: 'passing',
                database: 'passing',
                storage: 'passing',
            },
        },
        staging: {
            status: 'degraded',
            url: 'https://staging.example.com',
            currentVersion: 'v1.0.6-beta',
            lastDeployment: new Date(Date.now() - 3600000).toISOString(),
            uptime: 98.5,
            healthChecks: {
                api: 'passing',
                database: 'warning',
                storage: 'passing',
            },
        },
        development: {
            status: 'healthy',
            url: 'https://dev.example.com',
            currentVersion: 'v1.0.7-dev',
            lastDeployment: new Date(Date.now() - 7200000).toISOString(),
            uptime: 95.2,
            healthChecks: {
                api: 'passing',
                database: 'passing',
                storage: 'passing',
            },
        },
    }

    await db.ref('deployments/environments').set(environments)
    console.log('✅ Stored environment status')
}

// Populate usage data
async function populateUsageData() {
    console.log('\n💰 Populating Usage & Billing Data...')

    const now = new Date()
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const usageData = {
        hosting: {
            bandwidth: { used: 12.5, limit: 100, unit: 'GB' },
            storage: { used: 3.2, limit: 50, unit: 'GB' },
            requests: { used: 125000, limit: 1000000, unit: 'K' },
        },
        firestore: {
            reads: { used: 45000, limit: 1000000, unit: 'K' },
            writes: { used: 12000, limit: 500000, unit: 'K' },
            storage: { used: 0.8, limit: 10, unit: 'GB' },
        },
        functions: {
            invocations: { used: 8500, limit: 200000, unit: 'K' },
            gbSeconds: { used: 1200, limit: 100000, unit: '' },
            outboundData: { used: 0.5, limit: 20, unit: 'GB' },
        },
        billing: {
            currentCost: 15.23,
            projectedCost: 28.45,
            budget: 250,
            billingPeriodEnd: endOfMonth.toISOString(),
        },
    }

    await db.ref('deployments/usage/current').set(usageData)
    console.log('✅ Stored usage and billing data')
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

        // 2. Populate Cloud Functions Data
        const functionDeployments = await populateFunctionsData()
        allDeployments.push(...functionDeployments)

        // 3. Populate Performance Metrics
        await populatePerformanceData()

        // 4. Populate Environment Status
        await populateEnvironmentStatus()

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

        console.log('\n🎉 Successfully populated all deployment data!')
        console.log('\nSummary:')
        console.log(`- Hosting sites and deployments`)
        console.log(`- Cloud Functions status and metrics`)
        console.log(`- Performance metrics (in Realtime Database)`)
        console.log(`- Environment status`)
        console.log(`- Usage and billing data`)
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
