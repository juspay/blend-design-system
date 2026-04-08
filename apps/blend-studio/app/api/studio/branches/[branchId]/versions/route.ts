/**
 * GET /api/studio/branches/[branchId]/versions
 * List all versions of a branch
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { listVersions } from '@/backend/lib/branch-service'

initializeAdmin()

async function getUserFromRequest(
    request: NextRequest
): Promise<{ uid: string } | null> {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.slice(7)

    try {
        const auth = getAdminAuth()
        const decoded = await auth.verifyIdToken(token)
        return { uid: decoded.uid }
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
        const versions = await listVersions(branchId)

        return jsonResponse({
            success: true,
            data: versions,
        })
    } catch (error) {
        console.error('Error listing versions:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to list versions'
        return errorResponse('LIST_ERROR', message, 500)
    }
}
