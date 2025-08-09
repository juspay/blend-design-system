import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
})

// GET /api/foundation-tokens - List foundation tokens with filtering
export async function GET(request: NextRequest) {
    const client = await pool.connect()

    try {
        const { searchParams } = new URL(request.url)
        const collectionId = searchParams.get('collection_id')
        const category = searchParams.get('category')
        const subcategory = searchParams.get('subcategory')
        const search = searchParams.get('search')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        let query = `
            SELECT 
                ft.id,
                ft.collection_id,
                ft.category,
                ft.subcategory,
                ft.token_key,
                ft.token_value,
                ft.is_active,
                ft.created_at,
                ft.updated_at,
                ftc.name as collection_name
            FROM foundation_tokens ft
            JOIN foundation_token_collections ftc ON ft.collection_id = ftc.id
            WHERE 1=1
        `

        const params: any[] = []
        let paramIndex = 1

        if (collectionId) {
            query += ` AND ft.collection_id = $${paramIndex}`
            params.push(collectionId)
            paramIndex++
        }

        if (category) {
            query += ` AND ft.category = $${paramIndex}`
            params.push(category)
            paramIndex++
        }

        if (subcategory) {
            query += ` AND ft.subcategory = $${paramIndex}`
            params.push(subcategory)
            paramIndex++
        }

        if (search) {
            query += ` AND (ft.token_key ILIKE $${paramIndex} OR ft.token_value ILIKE $${paramIndex})`
            params.push(`%${search}%`)
            paramIndex++
        }

        query += ` ORDER BY ft.category, ft.subcategory, ft.token_key`
        query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
        params.push(limit, offset)

        const result = await client.query(query, params)

        // Get total count for pagination
        let countQuery = `
            SELECT COUNT(*) as total
            FROM foundation_tokens ft
            WHERE 1=1
        `
        const countParams: any[] = []
        let countParamIndex = 1

        if (collectionId) {
            countQuery += ` AND ft.collection_id = $${countParamIndex}`
            countParams.push(collectionId)
            countParamIndex++
        }

        if (category) {
            countQuery += ` AND ft.category = $${countParamIndex}`
            countParams.push(category)
            countParamIndex++
        }

        if (subcategory) {
            countQuery += ` AND ft.subcategory = $${countParamIndex}`
            countParams.push(subcategory)
            countParamIndex++
        }

        if (search) {
            countQuery += ` AND (ft.token_key ILIKE $${countParamIndex} OR ft.token_value ILIKE $${countParamIndex})`
            countParams.push(`%${search}%`)
        }

        const countResult = await client.query(countQuery, countParams)
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
        console.error('Error fetching foundation tokens:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch foundation tokens' },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}

// POST /api/foundation-tokens - Create a new foundation token
export async function POST(request: NextRequest) {
    const client = await pool.connect()

    try {
        const body = await request.json()
        const {
            collection_id,
            category,
            subcategory,
            token_key,
            token_value,
            is_active = true,
        } = body

        // Validation
        if (!collection_id || !category || !token_key || !token_value) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'collection_id, category, token_key, and token_value are required',
                },
                { status: 400 }
            )
        }

        const result = await client.query(
            `
            INSERT INTO foundation_tokens (collection_id, category, subcategory, token_key, token_value, is_active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `,
            [
                collection_id,
                category,
                subcategory,
                token_key,
                token_value,
                is_active,
            ]
        )

        return NextResponse.json(
            {
                success: true,
                data: result.rows[0],
                message: 'Foundation token created successfully',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating foundation token:', error)

        // Handle unique constraint violation
        if (
            error &&
            typeof error === 'object' &&
            'code' in error &&
            error.code === '23505'
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token with this key already exists in the collection',
                },
                { status: 409 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create foundation token' },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}
