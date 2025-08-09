import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/backend/lib/database'
import { Pool } from 'pg'

let pool: Pool | null = null

async function getPool() {
    if (!pool) {
        await initializeDatabase()
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl:
                process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
        })
    }
    return pool
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '25')
        const componentName = searchParams.get('component')

        const offset = (page - 1) * limit
        const db = await getPool()

        let query = `
            SELECT 
                cc.id,
                cc.component_name,
                cc.name as collection_name,
                cc.description,
                cc.is_active,
                cc.created_at,
                cc.updated_at,
                COUNT(ct.id) as token_count
            FROM component_token_collections cc
            LEFT JOIN component_tokens ct ON cc.id = ct.collection_id
        `

        const params: any[] = []
        let whereClause = ''

        if (componentName) {
            whereClause = ' WHERE cc.component_name = $1'
            params.push(componentName)
        }

        query += whereClause
        query += `
            GROUP BY cc.id, cc.component_name, cc.name, cc.description, 
                     cc.is_active, cc.created_at, cc.updated_at
            ORDER BY cc.component_name, cc.name
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}
        `

        params.push(limit, offset)

        const result = await db.query(query, params)

        // Get total count
        let countQuery = `
            SELECT COUNT(DISTINCT cc.id) as total
            FROM component_token_collections cc
        `

        if (componentName) {
            countQuery += ' WHERE cc.component_name = $1'
        }

        const countResult = await db.query(
            countQuery,
            componentName ? [componentName] : []
        )
        const total = parseInt(countResult.rows[0].total)

        return NextResponse.json({
            success: true,
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching component collections:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch component collections',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
