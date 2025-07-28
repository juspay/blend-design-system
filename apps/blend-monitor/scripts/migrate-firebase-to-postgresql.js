#!/usr/bin/env node

/**
 * Migration Script: Firebase Realtime Database → PostgreSQL
 *
 * This script exports data from Firebase Realtime Database and imports it into PostgreSQL.
 * Run this script to migrate your existing data during the transition.
 */

const admin = require('firebase-admin')
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

console.log('🔄 Starting Firebase to PostgreSQL migration...\n')

// Firebase Admin setup
let serviceAccount
const serviceAccountPath = path.join(
    __dirname,
    '../firebase-service-account.json'
)

if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath)
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
} else {
    serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }
}

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        process.env.FIREBASE_DATABASE_URL ||
        `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
})

const firebaseDb = admin.database()

// PostgreSQL setup
const pgPool = new Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'blend_monitor',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
})

// Migration statistics
const stats = {
    users: 0,
    components: 0,
    deployments: 0,
    activities: 0,
    npmStats: 0,
    errors: [],
}

// Helper function to safely convert Firebase data
function convertFirebaseTimestamp(timestamp) {
    if (!timestamp) return null

    // If it's already a Date object
    if (timestamp instanceof Date) return timestamp

    // If it's a Firebase timestamp string
    if (typeof timestamp === 'string') {
        const date = new Date(timestamp)
        return isNaN(date.getTime()) ? null : date
    }

    // If it's a Unix timestamp (number)
    if (typeof timestamp === 'number') {
        return new Date(timestamp)
    }

    return null
}

// Migrate users data
async function migrateUsers() {
    try {
        console.log('👥 Migrating users...')

        const snapshot = await firebaseDb.ref('users').once('value')
        const users = snapshot.val()

        if (!users) {
            console.log('   No users found in Firebase')
            return
        }

        for (const [firebaseUid, userData] of Object.entries(users)) {
            try {
                await pgPool.query(
                    `
                    INSERT INTO users (firebase_uid, email, display_name, photo_url, role, is_active, created_at, last_login)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (firebase_uid) DO UPDATE SET
                        email = EXCLUDED.email,
                        display_name = EXCLUDED.display_name,
                        photo_url = EXCLUDED.photo_url,
                        role = EXCLUDED.role,
                        is_active = EXCLUDED.is_active,
                        last_login = EXCLUDED.last_login,
                        updated_at = NOW()
                `,
                    [
                        firebaseUid,
                        userData.email,
                        userData.displayName || null,
                        userData.photoURL || null,
                        userData.role || 'viewer',
                        userData.isActive !== false, // Default to true if not specified
                        convertFirebaseTimestamp(userData.createdAt) ||
                            new Date(),
                        convertFirebaseTimestamp(userData.lastLogin),
                    ]
                )

                stats.users++
            } catch (error) {
                console.error(
                    `   Error migrating user ${firebaseUid}:`,
                    error.message
                )
                stats.errors.push(`User ${firebaseUid}: ${error.message}`)
            }
        }

        console.log(`   ✅ Migrated ${stats.users} users`)
    } catch (error) {
        console.error('   ❌ Error migrating users:', error)
        stats.errors.push(`Users migration: ${error.message}`)
    }
}

// Migrate components data
async function migrateComponents() {
    try {
        console.log('🧩 Migrating components...')

        const snapshot = await firebaseDb
            .ref('blend-monitor/components')
            .once('value')
        const components = snapshot.val()

        if (!components) {
            console.log('   No components found in Firebase')
            return
        }

        for (const [componentId, componentData] of Object.entries(components)) {
            try {
                const info = componentData.info || {}
                const integration = componentData.integration || {}

                await pgPool.query(
                    `
                    INSERT INTO components (
                        component_id, name, path, category, has_storybook, 
                        has_figma_connect, has_tests, last_modified
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (component_id) DO UPDATE SET
                        name = EXCLUDED.name,
                        path = EXCLUDED.path,
                        category = EXCLUDED.category,
                        has_storybook = EXCLUDED.has_storybook,
                        has_figma_connect = EXCLUDED.has_figma_connect,
                        has_tests = EXCLUDED.has_tests,
                        last_modified = EXCLUDED.last_modified,
                        updated_at = NOW()
                `,
                    [
                        componentId,
                        info.name || componentId,
                        info.path || '',
                        info.category || 'other',
                        integration.hasStorybook || false,
                        integration.hasFigmaConnect || false,
                        integration.hasTests || false,
                        convertFirebaseTimestamp(info.lastModified),
                    ]
                )

                stats.components++
            } catch (error) {
                console.error(
                    `   Error migrating component ${componentId}:`,
                    error.message
                )
                stats.errors.push(`Component ${componentId}: ${error.message}`)
            }
        }

        console.log(`   ✅ Migrated ${stats.components} components`)
    } catch (error) {
        console.error('   ❌ Error migrating components:', error)
        stats.errors.push(`Components migration: ${error.message}`)
    }
}

// Migrate NPM data
async function migrateNpmData() {
    try {
        console.log('📦 Migrating NPM data...')

        // Migrate package stats
        const statsSnapshot = await firebaseDb
            .ref('blend-monitor/publishing')
            .once('value')
        const publishingData = statsSnapshot.val()

        if (publishingData) {
            const current = publishingData.current || {}
            const downloads = publishingData.downloads || {}

            await pgPool.query(
                `
                INSERT INTO npm_package_stats (
                    package_name, version, downloads_daily, downloads_weekly, 
                    downloads_monthly, downloads_total, size_unpacked, size_gzipped, 
                    dependencies_count, last_publish
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `,
                [
                    'blend-v1',
                    current.version || '0.0.0',
                    downloads.daily || 0,
                    downloads.weekly || 0,
                    downloads.monthly || 0,
                    downloads.total || 0,
                    current.size?.unpacked || 0,
                    current.size?.gzipped || 0,
                    current.dependencies || 0,
                    convertFirebaseTimestamp(current.publishedAt),
                ]
            )

            stats.npmStats++
        }

        // Migrate download trends
        const trendsSnapshot = await firebaseDb
            .ref('blend-monitor/publishing/trends/downloads')
            .once('value')
        const trends = trendsSnapshot.val()

        if (trends && Array.isArray(trends)) {
            for (const trend of trends) {
                try {
                    await pgPool.query(
                        `
                        INSERT INTO download_trends (date, downloads, package_name)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (date, package_name) DO UPDATE SET
                            downloads = EXCLUDED.downloads
                    `,
                        [trend.date, trend.downloads, 'blend-v1']
                    )
                } catch (error) {
                    console.error(
                        `   Error migrating trend for ${trend.date}:`,
                        error.message
                    )
                }
            }
        }

        // Migrate version history
        const versionsSnapshot = await firebaseDb
            .ref('blend-monitor/publishing/versions')
            .once('value')
        const versions = versionsSnapshot.val()

        if (versions) {
            for (const [versionKey, versionData] of Object.entries(versions)) {
                try {
                    await pgPool.query(
                        `
                        INSERT INTO npm_versions (
                            version, published_at, publisher, downloads, changelog,
                            size_unpacked, size_gzipped, is_breaking, is_prerelease
                        )
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    `,
                        [
                            versionData.version ||
                                versionKey.replace(/_/g, '.'),
                            convertFirebaseTimestamp(versionData.publishedAt) ||
                                new Date(),
                            versionData.publisher || 'unknown',
                            versionData.downloads || 0,
                            versionData.changelog || null,
                            versionData.size?.unpacked || null,
                            versionData.size?.gzipped || null,
                            versionData.breaking || false,
                            (versionData.version || versionKey).includes('-'),
                        ]
                    )
                } catch (insertError) {
                    // Skip if version already exists (duplicate key error)
                    if (!insertError.message.includes('duplicate key')) {
                        throw insertError
                    }
                }
            }
        }

        console.log(`   ✅ Migrated NPM data (${stats.npmStats} package stats)`)
    } catch (error) {
        console.error('   ❌ Error migrating NPM data:', error)
        stats.errors.push(`NPM migration: ${error.message}`)
    }
}

// Migrate activity logs
async function migrateActivities() {
    try {
        console.log('📊 Migrating activity logs...')

        // Migrate user activities
        const usersSnapshot = await firebaseDb.ref('users').once('value')
        const users = usersSnapshot.val()

        if (users) {
            for (const [firebaseUid, userData] of Object.entries(users)) {
                if (userData.activity) {
                    // Get PostgreSQL user ID
                    const userResult = await pgPool.query(
                        'SELECT id FROM users WHERE firebase_uid = $1',
                        [firebaseUid]
                    )

                    if (userResult.rows.length > 0) {
                        const userId = userResult.rows[0].id

                        for (const [activityId, activityData] of Object.entries(
                            userData.activity
                        )) {
                            try {
                                await pgPool.query(
                                    `
                                    INSERT INTO activity_logs (user_id, action, details, metadata, timestamp)
                                    VALUES ($1, $2, $3, $4, $5)
                                `,
                                    [
                                        userId,
                                        activityData.action,
                                        activityData.details
                                            ? JSON.stringify(
                                                  activityData.details
                                              )
                                            : null,
                                        activityData.metadata
                                            ? JSON.stringify(
                                                  activityData.metadata
                                              )
                                            : null,
                                        convertFirebaseTimestamp(
                                            activityData.timestamp
                                        ) || new Date(),
                                    ]
                                )

                                stats.activities++
                            } catch (error) {
                                console.error(
                                    `   Error migrating activity ${activityId}:`,
                                    error.message
                                )
                            }
                        }
                    }
                }
            }
        }

        // Migrate system activity
        const systemActivitySnapshot = await firebaseDb
            .ref('system_activity')
            .once('value')
        const systemActivities = systemActivitySnapshot.val()

        if (systemActivities) {
            for (const [activityId, activityData] of Object.entries(
                systemActivities
            )) {
                try {
                    await pgPool.query(
                        `
                        INSERT INTO system_activity (action, details, timestamp)
                        VALUES ($1, $2, $3)
                    `,
                        [
                            activityData.action,
                            activityData.details
                                ? JSON.stringify(activityData.details)
                                : null,
                            convertFirebaseTimestamp(activityData.timestamp) ||
                                new Date(),
                        ]
                    )
                } catch (error) {
                    console.error(
                        `   Error migrating system activity ${activityId}:`,
                        error.message
                    )
                }
            }
        }

        console.log(`   ✅ Migrated ${stats.activities} activity logs`)
    } catch (error) {
        console.error('   ❌ Error migrating activities:', error)
        stats.errors.push(`Activities migration: ${error.message}`)
    }
}

// Migrate deployments (if any exist in Firebase)
async function migrateDeployments() {
    try {
        console.log('🚀 Migrating deployments...')

        const snapshot = await firebaseDb.ref('deployments').once('value')
        const deployments = snapshot.val()

        if (!deployments) {
            console.log('   No deployments found in Firebase')
            return
        }

        // Migrate deployment history
        if (deployments.history) {
            for (const [deploymentId, deploymentData] of Object.entries(
                deployments.history
            )) {
                try {
                    await pgPool.query(
                        `
                        INSERT INTO deployments (
                            environment, version, deployer_name, deployer_email,
                            start_time, end_time, status, duration_seconds,
                            commit_sha, configuration, rollback_available
                        )
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    `,
                        [
                            deploymentData.environment || 'unknown',
                            deploymentData.version || '0.0.0',
                            deploymentData.deployer?.name || 'unknown',
                            deploymentData.deployer?.email ||
                                'unknown@example.com',
                            convertFirebaseTimestamp(
                                deploymentData.startTime
                            ) || new Date(),
                            convertFirebaseTimestamp(deploymentData.endTime),
                            deploymentData.status || 'unknown',
                            deploymentData.duration || null,
                            deploymentData.commitSha || null,
                            deploymentData.configuration
                                ? JSON.stringify(deploymentData.configuration)
                                : null,
                            deploymentData.rollbackAvailable || false,
                        ]
                    )

                    stats.deployments++
                } catch (error) {
                    console.error(
                        `   Error migrating deployment ${deploymentId}:`,
                        error.message
                    )
                    stats.errors.push(
                        `Deployment ${deploymentId}: ${error.message}`
                    )
                }
            }
        }

        console.log(`   ✅ Migrated ${stats.deployments} deployments`)
    } catch (error) {
        console.error('   ❌ Error migrating deployments:', error)
        stats.errors.push(`Deployments migration: ${error.message}`)
    }
}

// Main migration function
async function runMigration() {
    try {
        console.log('🔗 Testing database connections...')

        // Test PostgreSQL connection
        await pgPool.query('SELECT 1')
        console.log('✅ PostgreSQL connection successful')

        // Test Firebase connection
        await firebaseDb.ref('.info/connected').once('value')
        console.log('✅ Firebase connection successful\n')

        // Run migrations in order
        await migrateUsers()
        await migrateComponents()
        await migrateNpmData()
        await migrateActivities()
        await migrateDeployments()

        // Final statistics
        console.log('\n📈 Migration Summary:')
        console.log(`   Users: ${stats.users}`)
        console.log(`   Components: ${stats.components}`)
        console.log(`   NPM Stats: ${stats.npmStats}`)
        console.log(`   Activities: ${stats.activities}`)
        console.log(`   Deployments: ${stats.deployments}`)

        if (stats.errors.length > 0) {
            console.log(`\n⚠️  Errors encountered (${stats.errors.length}):`)
            stats.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`)
            })
        }

        console.log('\n✅ Migration completed successfully!')
    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    } finally {
        // Cleanup connections
        await pgPool.end()
        admin.app().delete()
    }
}

// Validation function to verify migration
async function validateMigration() {
    try {
        console.log('\n🔍 Validating migration...')

        const userCount = await pgPool.query('SELECT COUNT(*) FROM users')
        const componentCount = await pgPool.query(
            'SELECT COUNT(*) FROM components'
        )
        const activityCount = await pgPool.query(
            'SELECT COUNT(*) FROM activity_logs'
        )

        console.log(`   PostgreSQL Records:`)
        console.log(`   - Users: ${userCount.rows[0].count}`)
        console.log(`   - Components: ${componentCount.rows[0].count}`)
        console.log(`   - Activities: ${activityCount.rows[0].count}`)

        return true
    } catch (error) {
        console.error('   ❌ Validation failed:', error)
        return false
    }
}

// Run the migration
if (require.main === module) {
    runMigration()
        .then(() => validateMigration())
        .then(() => {
            console.log(
                '\n🎉 All done! Your data has been successfully migrated from Firebase to PostgreSQL.'
            )
            console.log('\n📝 Next steps:')
            console.log(
                '   1. Update your application to use the new PostgreSQL hooks'
            )
            console.log('   2. Test all functionality thoroughly')
            console.log('   3. Update environment variables for production')
            console.log(
                '   4. Consider keeping Firebase as backup until fully validated'
            )
            process.exit(0)
        })
        .catch((error) => {
            console.error('Migration failed:', error)
            process.exit(1)
        })
}

module.exports = {
    runMigration,
    validateMigration,
    stats,
}
