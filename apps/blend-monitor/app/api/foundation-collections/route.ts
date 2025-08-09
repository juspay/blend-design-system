import { NextRequest, NextResponse } from 'next/server'
import { query, withTransaction } from '@/src/backend/lib/database'

// GET /api/foundation-collections - List all foundation token collections
export async function GET() {
    try {
        const result = await query(`
            SELECT 
                id,
                name,
                description,
                is_active,
                is_default,
                created_by,
                created_at,
                updated_at,
                (SELECT COUNT(*) FROM foundation_tokens WHERE collection_id = ftc.id) as token_count
            FROM foundation_token_collections ftc
            ORDER BY is_default DESC, created_at DESC
        `)

        return NextResponse.json({
            success: true,
            data: result.rows,
            count: result.rows.length,
        })
    } catch (error) {
        console.error('Error fetching foundation collections:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch foundation collections' },
            { status: 500 }
        )
    }
}

// POST /api/foundation-collections - Create a new foundation token collection
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            name,
            description,
            is_active = true,
            is_default = false,
            created_by,
        } = body

        // Validation
        if (!name || !created_by) {
            return NextResponse.json(
                { success: false, error: 'Name and created_by are required' },
                { status: 400 }
            )
        }

        const result = await withTransaction(async (client) => {
            // If setting as default, unset other defaults
            if (is_default) {
                await client.query(`
                    UPDATE foundation_token_collections 
                    SET is_default = false 
                    WHERE is_default = true
                `)
            }

            const insertResult = await client.query(
                `
                INSERT INTO foundation_token_collections (name, description, is_active, is_default, created_by)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `,
                [name, description, is_active, is_default, created_by]
            )

            return insertResult.rows[0]
        })

        return NextResponse.json(
            {
                success: true,
                data: result,
                message: 'Foundation collection created successfully',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating foundation collection:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create foundation collection' },
            { status: 500 }
        )
    }
}
