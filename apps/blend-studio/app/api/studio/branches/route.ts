/**
 * GET /api/studio/branches
 * List all branches with optional filtering
 *
 * POST /api/studio/branches
 * Create a new branch
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { listBranches, createBranch } from '@/backend/lib/branch-service'
import type {
    BranchListOptions,
    CreateBranchInput,
    BranchStatus,
    BranchVisibility,
} from '@blend-design/token-engine'

initializeAdmin()

type BranchListFilters = NonNullable<BranchListOptions['filters']>
type SortBy = NonNullable<BranchListOptions['sortBy']>
type SortOrder = NonNullable<BranchListOptions['sortOrder']>

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

function errorResponse(
    code: string,
    message: string,
    status = 400,
    details?: Record<string, unknown>
) {
    return NextResponse.json(
        {
            success: false,
            error: { code, message, details },
        },
        { status }
    )
}

export async function GET(request: NextRequest) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    const { searchParams } = new URL(request.url)

    const options: BranchListOptions = {
        filters: {
            status:
                (searchParams.get('status') as BranchStatus | null) ||
                undefined,
            visibility:
                (searchParams.get('visibility') as BranchVisibility | null) ||
                undefined,
            search: searchParams.get('search') || undefined,
            clientName: searchParams.get('clientName') || undefined,
        },
        sortBy: (searchParams.get('sortBy') as SortBy) || 'updatedAt',
        sortOrder: (searchParams.get('sortOrder') as SortOrder) || 'desc',
        limit: parseInt(searchParams.get('limit') || '50', 10),
        cursor: searchParams.get('cursor') || undefined,
    }

    try {
        const result = await listBranches(options)
        return jsonResponse({ success: true, data: result })
    } catch (error) {
        console.error('Error listing branches:', error)
        return errorResponse('INTERNAL_ERROR', 'Failed to list branches', 500)
    }
}

export async function POST(request: NextRequest) {
    const user = await getUserFromRequest(request)
    if (!user) {
        return errorResponse('UNAUTHORIZED', 'Authentication required', 401)
    }

    try {
        const body = (await request.json()) as CreateBranchInput

        if (!body.brandId || !body.name) {
            return errorResponse(
                'VALIDATION_ERROR',
                'brandId and name are required'
            )
        }

        const branch = await createBranch(body, user)
        return jsonResponse({ success: true, data: branch }, 201)
    } catch (error) {
        console.error('Error creating branch:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to create branch'
        return errorResponse('CREATE_ERROR', message, 400)
    }
}
