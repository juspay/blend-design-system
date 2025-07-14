import { NextResponse } from 'next/server'
import path from 'path'
import { buildSearchIndex } from '../../docs/utils/searchContent'

export async function GET() {
    try {
        const contentDir = path.join(process.cwd(), 'app/docs/content')
        const searchIndex = buildSearchIndex(contentDir)

        return NextResponse.json(searchIndex)
    } catch (error) {
        console.error('Error building search index:', error)
        return NextResponse.json(
            { error: 'Failed to build search index' },
            { status: 500 }
        )
    }
}
