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

// DELETE /api/foundation-collections - Delete a foundation token collection
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const collectionId = searchParams.get('id')

        if (!collectionId) {
            return NextResponse.json(
                { success: false, error: 'Collection ID is required' },
                { status: 400 }
            )
        }

        const result = await withTransaction(async (client) => {
            // Check if collection exists and get its details
            const collectionResult = await client.query(
                'SELECT * FROM foundation_token_collections WHERE id = $1',
                [collectionId]
            )

            if (collectionResult.rows.length === 0) {
                throw new Error('Collection not found')
            }

            const collection = collectionResult.rows[0]

            // Prevent deletion of default collection if it has tokens
            if (collection.is_default) {
                const tokenCount = await client.query(
                    'SELECT COUNT(*) as count FROM foundation_tokens WHERE collection_id = $1',
                    [collectionId]
                )

                if (parseInt(tokenCount.rows[0].count) > 0) {
                    throw new Error(
                        'Cannot delete default collection that contains tokens. Please set another collection as default first.'
                    )
                }
            }

            // Delete all foundation tokens in this collection first
            await client.query(
                'DELETE FROM foundation_tokens WHERE collection_id = $1',
                [collectionId]
            )

            // Delete the collection
            const deleteResult = await client.query(
                'DELETE FROM foundation_token_collections WHERE id = $1 RETURNING *',
                [collectionId]
            )

            return deleteResult.rows[0]
        })

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Foundation collection deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting foundation collection:', error)
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to delete foundation collection',
            },
            { status: 500 }
        )
    }
}
