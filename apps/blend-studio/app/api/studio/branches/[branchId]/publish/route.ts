/**
 * POST /api/studio/branches/[branchId]/publish
 * Publish a new version of a branch
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, initializeAdmin } from '@/backend/lib/firebase-admin'
import { publishVersion } from '@/backend/lib/branch-service'
import type { CreateVersionInput } from '@blend-design/token-engine'

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
        const body = (await request.json()) as CreateVersionInput

        if (!body.version) {
            return errorResponse('VALIDATION_ERROR', 'version is required')
        }

        const input: CreateVersionInput = {
            branchId,
            version: body.version,
            brandConfig: body.brandConfig,
            changelog: body.changelog,
            isBreaking: body.isBreaking,
            isPrerelease: body.isPrerelease,
            parentVersion: body.parentVersion,
        }

        const version = await publishVersion(branchId, input, user)

        return jsonResponse({ success: true, data: version }, 201)
    } catch (error) {
        console.error('Error publishing version:', error)
        const message =
            error instanceof Error ? error.message : 'Failed to publish version'
        return errorResponse('PUBLISH_ERROR', message, 400)
    }
}
