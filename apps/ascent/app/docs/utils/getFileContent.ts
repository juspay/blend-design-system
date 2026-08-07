import { getDoc } from '@/lib/docs-source'

export interface PageMetadata {
    title?: string
    description?: string
    category?: string
    tags?: string[]
    author?: string
    date?: string
    image?: string
    keywords?: string
    [key: string]: any
}

export async function getFileContent(slugArray: string[]) {
    const page = getDoc(slugArray)
    return page?.data as PageMetadata | undefined
}
