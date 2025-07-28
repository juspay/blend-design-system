import { NextResponse } from 'next/server'

// Test PostgreSQL connection directly without database-service
const { Pool } = require('pg')

// Database row interface
interface ComponentRow {
    component_id: string
    name: string
    path: string
    category: string
    has_storybook: boolean
    has_figma_connect: boolean
    has_tests: boolean
    last_modified?: Date
}

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: { rejectUnauthorized: false },
})

// GET /api/components - Fetch components from PostgreSQL
export async function GET() {
    try {
        const client = await pool.connect()
        const result = await client.query(
            'SELECT * FROM components ORDER BY name'
        )
        client.release()

        const components = result.rows.map((row: ComponentRow) => ({
            id: row.component_id,
            name: row.name,
            path: row.path,
            category: row.category,
            hasStorybook: row.has_storybook,
            hasFigmaConnect: row.has_figma_connect,
            hasTests: row.has_tests,
            lastModified:
                row.last_modified?.toISOString() || new Date().toISOString(),
        }))

        return NextResponse.json({
            components,
            lastUpdated: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error fetching components:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// POST /api/components - Simple refresh
export async function POST() {
    try {
        return NextResponse.json({
            success: true,
            message: 'Components refresh endpoint',
        })
    } catch (error) {
        console.error('Error in components POST API:', error)
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        )
    }
}
