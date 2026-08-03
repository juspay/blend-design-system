import { useEffect, useState } from 'react'

export type AsyncSearchGroup = {
    groupLabel?: string
    items: Array<{ label: string; value: string }>
}

const mockApiItems: AsyncSearchGroup[] = [
    {
        groupLabel: 'People',
        items: [
            { label: 'Ada Lovelace', value: 'ada' },
            { label: 'Alan Turing', value: 'alan' },
            { label: 'Grace Hopper', value: 'grace' },
            { label: 'Katherine Johnson', value: 'katherine' },
        ],
    },
]

const searchMockApi = (query: string) =>
    new Promise<AsyncSearchGroup[]>((resolve) => {
        window.setTimeout(() => {
            const normalizedQuery = query.trim().toLowerCase()
            resolve(
                mockApiItems
                    .map((group) => ({
                        ...group,
                        items: group.items.filter((item) =>
                            item.label.toLowerCase().includes(normalizedQuery)
                        ),
                    }))
                    .filter((group) => group.items.length > 0)
            )
        }, 650)
    })

export const useMockAsyncSearch = () => {
    const [searchText, setSearchText] = useState('')
    const [items, setItems] = useState<AsyncSearchGroup[]>([])
    const [isSearchLoading, setIsSearchLoading] = useState(false)

    useEffect(() => {
        let active = true

        if (!searchText.trim()) {
            setItems([])
            setIsSearchLoading(false)
            return () => {
                active = false
            }
        }

        setIsSearchLoading(true)
        const debounceId = window.setTimeout(async () => {
            const nextItems = await searchMockApi(searchText)
            if (!active) return
            setItems(nextItems)
            setIsSearchLoading(false)
        }, 350)

        return () => {
            active = false
            window.clearTimeout(debounceId)
        }
    }, [searchText])

    return {
        items,
        searchText,
        onSearchChange: setSearchText,
        isSearchLoading,
        emptyStateText: searchText
            ? 'No people found'
            : 'Start typing to search',
    }
}
