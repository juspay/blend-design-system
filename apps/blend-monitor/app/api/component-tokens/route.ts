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
        const limit = parseInt(searchParams.get('limit') || '1000')
        const componentName = searchParams.get('component')
        const collectionId = searchParams.get('collection_id')

        const offset = (page - 1) * limit
        const db = await getPool()

        let query = `
            SELECT 
                ct.id,
                ct.collection_id,
                ct.token_path,
                ct.foundation_token_reference,
                ct.breakpoint,
                ct.is_active,
                ct.created_at,
                ct.updated_at,
                cc.component_name,
                cc.name as collection_name
            FROM component_tokens ct
            JOIN component_token_collections cc ON ct.collection_id = cc.id
        `

        const params: any[] = []
        const whereConditions: string[] = []

        if (componentName) {
            whereConditions.push(`cc.component_name = $${params.length + 1}`)
            params.push(componentName)
        }

        if (collectionId) {
            whereConditions.push(`ct.collection_id = $${params.length + 1}`)
            params.push(collectionId)
        }

        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ')
        }

        query += `
            ORDER BY cc.component_name, ct.token_path
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}
        `

        params.push(limit, offset)

        const result = await db.query(query, params)

        // Get total count
        let countQuery = `
            SELECT COUNT(ct.id) as total
            FROM component_tokens ct
            JOIN component_token_collections cc ON ct.collection_id = cc.id
        `

        if (whereConditions.length > 0) {
            countQuery += ' WHERE ' + whereConditions.join(' AND ')
        }

        const countParams = params.slice(0, -2) // Remove limit and offset
        const countResult = await db.query(countQuery, countParams)
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
        console.error('Error fetching component tokens:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch component tokens',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
