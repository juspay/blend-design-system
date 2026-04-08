/**
 * GET /api/studio/branches/[branchId]
 * Get a specific branch
 *
 * PATCH /api/studio/branches/[branchId]
 * Update a branch's brand config
 *
 * DELETE /api/studio/branches/[branchId]
 * Delete or archive a branch
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import {
    getBranch,
    updateBranch,
    deleteBranch,
} from '@/backend/lib/branch-service'
import type { UpdateBranchInput } from '@blend-design/token-engine'

initializeAdmin()

async function getUserFromRequest(request: NextRequest): Promise<{
    uid: string
    email: string
    displayName?: string
} | null> {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.slice(7)

    try {
        const auth = getAdminAuth()
        const decoded = await auth.verifyIdToken(token)
        return {
            uid: decoded.uid,
            email: decoded.email || '',
            displayName: decoded.name,
        }
    } catch {
        return null
    }
}

function jsonResponse(data: unknown, status = 200) {
    return NextResponse.json(data, { status })
}

function errorResponse(code: string, message: string, status = 400) {
    return NextResponse.json(
        {
            success: false,
            error: { code, message },
        },
        { status }
    )
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ branchId: string }> }
) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    const { branchId } = await params

    try {
        const branch = await getBranch(branchId)
        if (!branch) {
            return errorResponse(
                'NOT_FOUND',
                `Branch ${branchId} not found`,
                404
            )
        }

        return jsonResponse({ success: true, data: branch })
    } catch (error) {
        console.error('Error getting branch:', error)
        return errorResponse('INTERNAL_ERROR', 'Failed to get branch', 500)
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ branchId: string }> }
) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    const { branchId } = await params

    try {
        const body = (await request.json()) as UpdateBranchInput

        const branch = await updateBranch(branchId, body, user)
        return jsonResponse({ success: true, data: branch })
    } catch (error) {
        console.error('Error updating branch:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to update branch'
        return errorResponse('UPDATE_ERROR', message, 400)
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ branchId: string }> }
) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    const { branchId } = await params

    try {
        await deleteBranch(branchId, user)
        return jsonResponse({ success: true })
    } catch (error) {
        console.error('Error deleting branch:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to delete branch'
        return errorResponse('DELETE_ERROR', message, 400)
    }
}
