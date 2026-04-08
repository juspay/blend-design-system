/**
 * POST /api/studio/branches/[branchId]/resolve
 * Get brand config for token resolution (client-side resolution)
 *
 * Body: { theme: 'light' | 'dark', version?: string }
 * Returns: BrandConfig for client-side token resolution
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { getBranch, getVersion } from '@/backend/lib/branch-service'
import type { BrandConfig } from '@blend-design/token-engine'

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
        const theme = body.theme === 'dark' ? 'dark' : 'light'
        const versionId = body.version as string | undefined

        const branch = await getBranch(branchId)
        if (!branch) {
            return errorResponse(
                'NOT_FOUND',
                `Branch ${branchId} not found`,
                404
            )
        }

        let brandConfig: BrandConfig
        let resolvedVersion: string | null = null

        if (versionId) {
            const version = await getVersion(branchId, versionId)
            if (!version) {
                return errorResponse(
                    'NOT_FOUND',
                    `Version ${versionId} not found`,
                    404
                )
            }
            brandConfig = version.brandConfig
            resolvedVersion = version.version
        } else {
            brandConfig = branch.brandConfig
            resolvedVersion = branch.latestVersion
        }

        return jsonResponse({
            success: true,
            data: {
                branchId,
                version: resolvedVersion,
                theme,
                brandConfig,
                resolvedAt: new Date().toISOString(),
            },
        })
    } catch (error) {
        console.error('Error resolving tokens:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to resolve tokens'
        return errorResponse('RESOLVE_ERROR', message, 500)
    }
}
