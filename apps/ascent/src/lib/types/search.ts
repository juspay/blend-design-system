// Search-related type definitions
export interface SearchResult {
    title: string
    description?: string
    path: string
    slug: string
    category: string
    tags?: string[]
    content: string
    excerpt: string
    sections: Section[]
}

export interface Section {
    title: string
    level: number
    id: string
}

export interface RecentSearch {
    query: string
    result: SearchResult
    timestamp: number
}
