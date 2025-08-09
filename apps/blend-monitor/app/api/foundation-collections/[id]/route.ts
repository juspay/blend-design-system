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

// GET /api/foundation-collections/[id] - Get a specific foundation collection
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const client = await pool.connect()

    try {
        const { id } = params

        const result = await client.query(
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
            [id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Foundation collection not found' },
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
    } finally {
        client.release()
    }
}

// PUT /api/foundation-collections/[id] - Update a foundation collection
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const client = await pool.connect()

    try {
        const { id } = params
        const body = await request.json()
        const { name, description, is_active, is_default } = body

        await client.query('BEGIN')

        // If setting as default, unset other defaults
        if (is_default) {
            await client.query(
                `
                UPDATE foundation_token_collections 
                SET is_default = false 
                WHERE is_default = true AND id != $1
            `,
                [id]
            )
        }

        const result = await client.query(
            `
            UPDATE foundation_token_collections 
            SET 
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                is_active = COALESCE($3, is_active),
                is_default = COALESCE($4, is_default),
                updated_at = NOW()
            WHERE id = $5
            RETURNING *
        `,
            [name, description, is_active, is_default, id]
        )

        if (result.rows.length === 0) {
            await client.query('ROLLBACK')
            return NextResponse.json(
                { success: false, error: 'Foundation collection not found' },
                { status: 404 }
            )
        }

        await client.query('COMMIT')

        return NextResponse.json({
            success: true,
            data: result.rows[0],
            message: 'Foundation collection updated successfully',
        })
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error updating foundation collection:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update foundation collection' },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}

// DELETE /api/foundation-collections/[id] - Delete a foundation collection
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const client = await pool.connect()

    try {
        const { id } = params

        await client.query('BEGIN')

        // Check if collection exists and is not default
        const checkResult = await client.query(
            `
            SELECT is_default FROM foundation_token_collections WHERE id = $1
        `,
            [id]
        )

        if (checkResult.rows.length === 0) {
            await client.query('ROLLBACK')
            return NextResponse.json(
                { success: false, error: 'Foundation collection not found' },
                { status: 404 }
            )
        }

        if (checkResult.rows[0].is_default) {
            await client.query('ROLLBACK')
            return NextResponse.json(
                {
                    success: false,
                    error: 'Cannot delete default foundation collection',
                },
                { status: 400 }
            )
        }

        // Delete the collection (cascade will handle tokens)
        await client.query(
            `
            DELETE FROM foundation_token_collections WHERE id = $1
        `,
            [id]
        )

        await client.query('COMMIT')

        return NextResponse.json({
            success: true,
            message: 'Foundation collection deleted successfully',
        })
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error deleting foundation collection:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete foundation collection' },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}
