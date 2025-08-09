const { Pool } = require('pg')

// Database configuration
const pool = new Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5433,
    database: process.env.DATABASE_NAME || 'blend_monitor',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'Juspay@123',
    ssl: false,
})

async function cleanupDatabase() {
    console.log('🧹 Cleaning up unused database tables...\n')

    try {
        const client = await pool.connect()

        try {
            // Tables to remove (empty or not needed for tokenizer)
            const tablesToRemove = [
                'audit_logs', // Empty
                'component_integrations', // Empty
                'npm_versions', // Empty
                'theme_permissions', // Empty
                'token_exports', // Empty
                'coverage_metrics', // Not needed for tokenizer
                'download_trends', // Not needed for tokenizer
                'npm_package_stats', // Not needed for tokenizer
                'system_activity', // Not needed for tokenizer
                'activity_logs', // Not needed for tokenizer
            ]

            console.log('📋 Tables to be removed:')
            tablesToRemove.forEach((table) => console.log(`   - ${table}`))
            console.log('')

            // Remove tables
            for (const table of tablesToRemove) {
                try {
                    await client.query(`DROP TABLE IF EXISTS ${table} CASCADE`)
                    console.log(`✅ Removed table: ${table}`)
                } catch (error) {
                    console.error(
                        `❌ Error removing table ${table}:`,
                        error.message
                    )
                }
            }

            console.log('\n🧹 Database cleanup completed!')

            // Show remaining tables
            console.log('\n📊 Remaining tables:')
            const result = await client.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                ORDER BY table_name
            `)

            result.rows.forEach((row) => console.log(`   - ${row.table_name}`))
        } finally {
            client.release()
        }
    } catch (error) {
        console.error('❌ Error during database cleanup:', error.message)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

// Load environment variables
require('dotenv').config({ path: '../.env.local' })

// Run the cleanup
cleanupDatabase()
