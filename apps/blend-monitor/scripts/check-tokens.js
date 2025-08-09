// Check Token Data in Database
// Quick script to verify the seeded token data

const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

const { Pool } = require('pg')

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
})

async function checkTokenData() {
    const client = await pool.connect()

    try {
        console.log('🔍 Checking Token Management System Data...\n')

        // 1. Check foundation token collections
        console.log('📊 Foundation Token Collections:')
        const collections = await client.query(`
            SELECT id, name, description, is_active, is_default, created_at 
            FROM foundation_token_collections 
            ORDER BY created_at DESC
        `)
        console.table(collections.rows)

        // 2. Check foundation tokens count by category
        console.log('\n📊 Foundation Tokens by Category:')
        const tokensByCategory = await client.query(`
            SELECT category, subcategory, COUNT(*) as token_count
            FROM foundation_tokens 
            GROUP BY category, subcategory 
            ORDER BY category, subcategory
        `)
        console.table(tokensByCategory.rows)

        // 3. Sample foundation tokens
        console.log('\n📊 Sample Foundation Tokens (Colors):')
        const sampleTokens = await client.query(`
            SELECT category, subcategory, token_key, token_value
            FROM foundation_tokens 
            WHERE category = 'colors' AND subcategory = 'primary'
            ORDER BY token_key
            LIMIT 10
        `)
        console.table(sampleTokens.rows)

        // 4. Check component token collections
        console.log('\n📊 Component Token Collections:')
        const componentCollections = await client.query(`
            SELECT component_name, COUNT(*) as collection_count
            FROM component_token_collections 
            GROUP BY component_name 
            ORDER BY component_name
        `)
        console.table(componentCollections.rows)

        // 5. Sample component tokens
        console.log('\n📊 Sample Component Tokens (Button):')
        const componentTokens = await client.query(`
            SELECT ct.token_path, ct.foundation_token_reference
            FROM component_tokens ct
            JOIN component_token_collections ctc ON ct.collection_id = ctc.id
            WHERE ctc.component_name = 'Button'
            ORDER BY ct.token_path
        `)
        console.table(componentTokens.rows)

        // 6. Overall summary
        console.log('\n📊 Overall Summary:')
        const summary = await client.query(`
            SELECT 
                (SELECT COUNT(*) FROM foundation_token_collections) as foundation_collections,
                (SELECT COUNT(*) FROM foundation_tokens) as foundation_tokens,
                (SELECT COUNT(*) FROM component_token_collections) as component_collections,
                (SELECT COUNT(*) FROM component_tokens) as component_tokens
        `)
        console.table(summary.rows)

        console.log('\n✅ Token data verification complete!')
    } catch (error) {
        console.error('❌ Error checking token data:', error)
    } finally {
        client.release()
        await pool.end()
    }
}

// Run the check
checkTokenData().catch(console.error)
