// Token Management System Seeder
// Seeds the database with Blend foundation and component tokens

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

// Import foundation tokens from Blend package
const foundationTokenPath = path.join(
    __dirname,
    '../../../packages/blend/lib/foundationToken.ts'
)

// Parse foundation tokens from the TypeScript file
function parseFoundationTokens() {
    try {
        const content = fs.readFileSync(foundationTokenPath, 'utf8')

        // Extract the foundationToken object using regex
        const tokenMatch = content.match(
            /const foundationToken = ({[\s\S]*?})\s*export/m
        )
        if (!tokenMatch) {
            throw new Error('Could not find foundationToken object in file')
        }

        // Convert TypeScript object to JSON-parseable format
        let tokenString = tokenMatch[1]

        // Replace single quotes with double quotes
        tokenString = tokenString.replace(/'/g, '"')

        // Remove trailing commas
        tokenString = tokenString.replace(/,(\s*[}\]])/g, '$1')

        // Parse as JSON
        return JSON.parse(tokenString)
    } catch (error) {
        console.error('Error parsing foundation tokens:', error)
        console.log('Using direct import from foundationToken.ts...')

        // Try to require the actual file
        try {
            const {
                foundationToken,
            } = require('../../../packages/blend/lib/foundationToken.ts')
            return foundationToken
        } catch (requireError) {
            console.error('❌ Could not require foundationToken:', requireError)
            console.error(
                '❌ Cannot proceed without real foundation tokens from Blend package'
            )
            throw new Error(
                'Failed to parse foundation tokens from Blend package. Please ensure packages/blend/lib/foundationToken.ts exists and is accessible.'
            )
        }
    }
}

// Parse all component token files from Blend package
function parseAllComponentTokens() {
    const componentTokenMappings = {}
    const componentsDir = path.join(
        __dirname,
        '../../../packages/blend/lib/components'
    )

    try {
        // Find all .tokens.ts files
        const { execSync } = require('child_process')
        const tokenFiles = execSync(
            `find "${componentsDir}" -name "*.tokens.ts"`,
            { encoding: 'utf8' }
        )
            .trim()
            .split('\n')
            .filter((file) => file.length > 0)

        console.log(`🔍 Found ${tokenFiles.length} component token files`)

        for (const tokenFile of tokenFiles) {
            try {
                const componentName = path.basename(path.dirname(tokenFile))
                const content = fs.readFileSync(tokenFile, 'utf8')

                // Extract token mappings from the file
                const mappings = extractTokenMappingsFromFile(
                    content,
                    componentName
                )
                if (Object.keys(mappings).length > 0) {
                    componentTokenMappings[componentName] = mappings
                    console.log(
                        `✅ Parsed ${Object.keys(mappings).length} tokens from ${componentName}`
                    )
                }
            } catch (error) {
                console.warn(`⚠️  Could not parse ${tokenFile}:`, error.message)
            }
        }

        console.log(
            `📊 Successfully parsed ${Object.keys(componentTokenMappings).length} components`
        )
        return componentTokenMappings
    } catch (error) {
        console.error('❌ Error parsing component tokens:', error)
        console.error(
            '❌ Cannot proceed without real component tokens from Blend package'
        )
        throw new Error(
            'Failed to parse component tokens from Blend package. Please ensure the packages/blend directory exists and contains component token files.'
        )
    }
}

// Extract token mappings from a component token file
function extractTokenMappingsFromFile(content, componentName) {
    const mappings = {}

    try {
        // Look for FOUNDATION_THEME references in the content
        const foundationRefs =
            content.match(/FOUNDATION_THEME\.[a-zA-Z0-9_.[\]]+/g) || []

        for (const ref of foundationRefs) {
            // Convert FOUNDATION_THEME.colors.primary[500] to colors.primary.500
            const cleanRef = ref
                .replace('FOUNDATION_THEME.', '')
                .replace(/\[(\d+)\]/g, '.$1')
                .replace(/\['([^']+)'\]/g, '.$1')
                .replace(/\["([^"]+)"\]/g, '.$1')

            // Create a simple token path based on the reference
            const tokenPath = `${cleanRef.split('.')[0]}.default`
            mappings[tokenPath] = cleanRef
        }

        // If no mappings found, create some basic ones based on component type
        if (Object.keys(mappings).length === 0) {
            mappings[`backgroundColor.default`] = 'colors.gray.0'
            mappings[`borderColor.default`] = 'colors.gray.200'
            mappings[`textColor.default`] = 'colors.gray.900'
        }
    } catch (error) {
        console.warn(
            `Could not extract mappings from ${componentName}:`,
            error.message
        )
    }

    return mappings
}

async function runMigration() {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        console.log('🚀 Starting token management system migration...')

        // 1. Run the database schema migration
        console.log('📋 Creating new database schema...')
        const migrationSQL = fs.readFileSync(
            path.join(
                __dirname,
                '../database/migrations/002_token_management_system.sql'
            ),
            'utf8'
        )
        await client.query(migrationSQL)
        console.log('✅ Database schema created successfully')

        // 2. Create default user - check existing schema first
        console.log('👤 Creating default user...')

        // Check if users table exists and get its schema
        const userTableInfo = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND table_schema = 'public'
        `)

        if (userTableInfo.rows.length === 0) {
            // Create users table if it doesn't exist
            await client.query(`
                CREATE TABLE users (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    email VARCHAR(255) UNIQUE,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            `)
        }

        // Insert default user with the required columns
        const columns = userTableInfo.rows.map((row) => row.column_name)
        const hasEmailColumn = columns.includes('email')
        const hasFirebaseUidColumn = columns.includes('firebase_uid')

        if (hasEmailColumn && hasFirebaseUidColumn) {
            await client.query(
                `
                INSERT INTO users (id, email, firebase_uid)
                VALUES ($1, $2, $3)
                ON CONFLICT (email) DO NOTHING
            `,
                [
                    '550e8400-e29b-41d4-a716-446655440000',
                    'system@blend.design',
                    'system-user-firebase-uid',
                ]
            )
        } else if (hasEmailColumn) {
            await client.query(
                `
                INSERT INTO users (id, email)
                VALUES ($1, $2)
                ON CONFLICT (email) DO NOTHING
            `,
                ['550e8400-e29b-41d4-a716-446655440000', 'system@blend.design']
            )
        } else {
            await client.query(
                `
                INSERT INTO users (id)
                VALUES ($1)
                ON CONFLICT (id) DO NOTHING
            `,
                ['550e8400-e29b-41d4-a716-446655440000']
            )
        }
        console.log('✅ Default user created')

        // 3. Create default foundation token collection
        console.log('🎨 Creating default foundation token collection...')
        const foundationCollectionResult = await client.query(
            `
            INSERT INTO foundation_token_collections (name, description, is_active, is_default, created_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `,
            [
                'Blend Default',
                'Default foundation tokens from the Blend Design System',
                true,
                true,
                '550e8400-e29b-41d4-a716-446655440000', // Default user ID
            ]
        )

        const foundationCollectionId = foundationCollectionResult.rows[0].id
        console.log(
            `✅ Created foundation collection: ${foundationCollectionId}`
        )

        // 3. Seed foundation tokens
        console.log('🌱 Seeding foundation tokens...')
        const foundationTokens = parseFoundationTokens()
        let tokenCount = 0

        for (const [category, categoryData] of Object.entries(
            foundationTokens
        )) {
            if (typeof categoryData === 'object' && categoryData !== null) {
                // Check if this is a nested category (like colors) or flat (like fontSize)
                const firstValue = Object.values(categoryData)[0]

                if (typeof firstValue === 'object' && firstValue !== null) {
                    // Nested category (e.g., colors.primary.500)
                    for (const [subcategory, subcategoryData] of Object.entries(
                        categoryData
                    )) {
                        for (const [tokenKey, tokenValue] of Object.entries(
                            subcategoryData
                        )) {
                            await client.query(
                                `
                                INSERT INTO foundation_tokens (collection_id, category, subcategory, token_key, token_value)
                                VALUES ($1, $2, $3, $4, $5)
                            `,
                                [
                                    foundationCollectionId,
                                    category,
                                    subcategory,
                                    tokenKey,
                                    tokenValue,
                                ]
                            )
                            tokenCount++
                        }
                    }
                } else {
                    // Flat category (e.g., fontSize.headingLG)
                    for (const [tokenKey, tokenValue] of Object.entries(
                        categoryData
                    )) {
                        await client.query(
                            `
                            INSERT INTO foundation_tokens (collection_id, category, subcategory, token_key, token_value)
                            VALUES ($1, $2, $3, $4, $5)
                        `,
                            [
                                foundationCollectionId,
                                category,
                                null,
                                tokenKey,
                                tokenValue,
                            ]
                        )
                        tokenCount++
                    }
                }
            }
        }

        console.log(`✅ Seeded ${tokenCount} foundation tokens`)

        // 4. Create component token collections and seed component tokens
        console.log('🧩 Creating component token collections...')
        const componentTokenMappings = parseAllComponentTokens()

        for (const [componentName, tokenMappings] of Object.entries(
            componentTokenMappings
        )) {
            // Create component collection
            const componentCollectionResult = await client.query(
                `
                INSERT INTO component_token_collections (name, component_name, description, foundation_collection_id, is_active, created_by)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `,
                [
                    `${componentName} Default`,
                    componentName,
                    `Default token mappings for ${componentName} component`,
                    foundationCollectionId,
                    true,
                    '550e8400-e29b-41d4-a716-446655440000',
                ]
            )

            const componentCollectionId = componentCollectionResult.rows[0].id

            // Seed component tokens
            for (const [tokenPath, foundationReference] of Object.entries(
                tokenMappings
            )) {
                await client.query(
                    `
                    INSERT INTO component_tokens (collection_id, token_path, foundation_token_reference)
                    VALUES ($1, $2, $3)
                `,
                    [componentCollectionId, tokenPath, foundationReference]
                )
            }

            console.log(
                `✅ Created ${componentName} collection with ${Object.keys(tokenMappings).length} tokens`
            )
        }

        await client.query('COMMIT')
        console.log(
            '🎉 Token management system migration completed successfully!'
        )

        // Print summary
        console.log('\n📊 Migration Summary:')
        console.log(`- Created 1 foundation token collection`)
        console.log(`- Seeded ${tokenCount} foundation tokens`)
        console.log(
            `- Created ${Object.keys(componentTokenMappings).length} component collections`
        )
        console.log(
            `- Seeded ${Object.values(componentTokenMappings).reduce((sum, tokens) => sum + Object.keys(tokens).length, 0)} component tokens`
        )
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('❌ Migration failed:', error)
        throw error
    } finally {
        client.release()
        await pool.end()
    }
}

// Run migration if called directly
if (require.main === module) {
    runMigration().catch(console.error)
}

module.exports = { runMigration }
