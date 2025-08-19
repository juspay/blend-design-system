// Content-related type definitions
export interface DocumentMetadata {
    title: string
    description?: string
    category?: string
    tags?: string[]
    lastModified?: string
    author?: string
}

export interface DocumentContent {
    metadata: DocumentMetadata
    content: string
    slug: string
    path: string
}

export interface DirectoryItem {
    name: string
    path: string
    type: 'file' | 'directory'
    children?: DirectoryItem[]
}
