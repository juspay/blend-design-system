/**
 * GET /api/studio/branches/[branchId]/pull
 * Pull a branch's brand config (for CLI usage)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { getBranch, getVersion } from '@/backend/lib/branch-service'

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
    const { searchParams } = new URL(request.url)
    const versionParam = searchParams.get('version')

    try {
        const branch = await getBranch(branchId)
        if (!branch) {
            return errorResponse(
                'NOT_FOUND',
                `Branch ${branchId} not found`,
                404
            )
        }

        let version = null
        let brandConfig = branch.brandConfig

        if (versionParam) {
            const v = await getVersion(branchId, versionParam)
            if (!v) {
                return errorResponse(
                    'NOT_FOUND',
                    `Version ${versionParam} not found`,
                    404
                )
            }
            version = v
            brandConfig = v.brandConfig
        } else if (branch.latestVersion) {
            const latest = await getVersion(branchId, branch.latestVersion)
            if (latest) {
                version = latest
                brandConfig = latest.brandConfig
            }
        }

        return jsonResponse({
            success: true,
            data: {
                branch,
                version,
                brandConfig,
            },
        })
    } catch (error) {
        console.error('Error pulling branch:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to pull branch'
        return errorResponse('PULL_ERROR', message, 500)
    }
}
