/**
 * POST /api/studio/branches/[branchId]/fork
 * Fork a branch
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { forkBranch } from '@/backend/lib/branch-service'

initializeAdmin()

async function getUserFromRequest(request: NextRequest): Promise<{
    uid: string
    email: string
    displayName?: string
    photoURL?: string
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
            photoURL: decoded.picture,
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

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ branchId: string }> }
) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    const { branchId } = await params

    try {
        const body = await request.json()

        if (!body.name) {
            return errorResponse('VALIDATION_ERROR', 'name is required')
        }

        const forkedBranch = await forkBranch(
            branchId,
            body.name,
            body.slug,
            user
        )

        return jsonResponse({ success: true, data: forkedBranch }, 201)
    } catch (error) {
        console.error('Error forking branch:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to fork branch'
        return errorResponse('FORK_ERROR', message, 400)
    }
}
