// Search-related type definitions
import type { SearchResult } from './common'

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
