const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function initDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:
            process.env.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
    })

    try {
        console.log('Initializing database schema...')

        // Read the schema file
        const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql')
        const schema = fs.readFileSync(schemaPath, 'utf8')

        // Execute the schema
        await pool.query(schema)

        console.log('Database schema initialized successfully!')

        // Insert some sample components if the table is empty
        const { rows } = await pool.query('SELECT COUNT(*) FROM components')
        if (parseInt(rows[0].count) === 0) {
            console.log('Inserting sample components...')

            const sampleComponents = [
                {
                    name: 'Button',
                    category: 'input',
                    has_figma_connect: true,
                    has_storybook: true,
                    has_tests: true,
                },
                {
                    name: 'TextInput',
                    category: 'input',
                    has_figma_connect: true,
                    has_storybook: true,
                    has_tests: true,
                },
                {
                    name: 'Select',
                    category: 'input',
                    has_figma_connect: false,
                    has_storybook: true,
                    has_tests: true,
                },
                {
                    name: 'Card',
                    category: 'display',
                    has_figma_connect: true,
                    has_storybook: true,
                    has_tests: false,
                },
                {
                    name: 'Modal',
                    category: 'feedback',
                    has_figma_connect: false,
                    has_storybook: true,
                    has_tests: true,
                },
                {
                    name: 'Alert',
                    category: 'feedback',
                    has_figma_connect: true,
                    has_storybook: true,
                    has_tests: true,
                },
                {
                    name: 'Table',
                    category: 'data',
                    has_figma_connect: false,
                    has_storybook: true,
                    has_tests: false,
                },
                {
                    name: 'Tabs',
                    category: 'navigation',
                    has_figma_connect: true,
                    has_storybook: true,
                    has_tests: true,
                },
            ]

            for (const component of sampleComponents) {
                await pool.query(
                    'INSERT INTO components (name, category, has_figma_connect, has_storybook, has_tests) VALUES ($1, $2, $3, $4, $5)',
                    [
                        component.name,
                        component.category,
                        component.has_figma_connect,
                        component.has_storybook,
                        component.has_tests,
                    ]
                )
            }

            console.log('Sample components inserted!')
        }
    } catch (error) {
        console.error('Error initializing database:', error)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

// Run if called directly
if (require.main === module) {
    initDatabase()
}

module.exports = { initDatabase }
