import { NextRequest, NextResponse } from 'next/server'
import { query, withTransaction } from '@/src/backend/lib/database'

// PATCH /api/foundation-collections/[id] - Update a foundation token collection
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const collectionId = params.id
        const body = await request.json()
        const { is_active, is_default } = body

        // Validation
        if (is_active === undefined && is_default === undefined) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'At least one field (is_active or is_default) is required',
                },
                { status: 400 }
            )
        }

        const result = await withTransaction(async (client) => {
            // Check if collection exists
            const collectionResult = await client.query(
                'SELECT * FROM foundation_token_collections WHERE id = $1',
                [collectionId]
            )

            if (collectionResult.rows.length === 0) {
                throw new Error('Collection not found')
            }

            // If setting as default, unset other defaults first
            if (is_default === true) {
                await client.query(
                    `
                    UPDATE foundation_token_collections 
                    SET is_default = false 
                    WHERE is_default = true AND id != $1
                `,
                    [collectionId]
                )
            }

            // Build dynamic update query
            const updateFields = []
            const updateValues = []
            let paramIndex = 1

            if (is_active !== undefined) {
                updateFields.push(`is_active = $${paramIndex}`)
                updateValues.push(is_active)
                paramIndex++
            }

            if (is_default !== undefined) {
                updateFields.push(`is_default = $${paramIndex}`)
                updateValues.push(is_default)
                paramIndex++
            }

            updateFields.push(`updated_at = NOW()`)
            updateValues.push(collectionId)

            const updateQuery = `
                UPDATE foundation_token_collections 
                SET ${updateFields.join(', ')}
                WHERE id = $${paramIndex}
                RETURNING *
            `

            const updateResult = await client.query(updateQuery, updateValues)
            return updateResult.rows[0]
        })

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Foundation collection updated successfully',
        })
    } catch (error) {
        console.error('Error updating foundation collection:', error)
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to update foundation collection',
            },
            { status: 500 }
        )
    }
}

// GET /api/foundation-collections/[id] - Get a specific foundation token collection
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const collectionId = params.id

        const result = await query(
            `
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
            WHERE id = $1
        `,
            [collectionId]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Collection not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        })
    } catch (error) {
        console.error('Error fetching foundation collection:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch foundation collection' },
            { status: 500 }
        )
    }
}

// DELETE /api/foundation-collections/[id] - Delete a specific foundation token collection
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const collectionId = params.id

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
