import { useEffect, useState } from 'react'
import { expect, userEvent, waitFor, within } from '@storybook/test'

export type AsyncSearchGroup = {
    groupLabel?: string
    items: Array<{ label: string; value: string }>
}

export const mockAsyncSearchItems: AsyncSearchGroup[] = [
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

const MOCK_API_LATENCY_MS = 650
const MOCK_FAST_API_LATENCY_MS = 150
const SEARCH_DEBOUNCE_MS = 350
const MOCK_SEARCH_EVENT = 'blend:mock-select-search'

type MockSearchEventDetail = {
    phase: 'requested' | 'resolved' | 'applied' | 'ignored'
    query: string
}

const announceMockSearch = (detail: MockSearchEventDetail) => {
    window.dispatchEvent(
        new CustomEvent<MockSearchEventDetail>(MOCK_SEARCH_EVENT, { detail })
    )
}

const waitForMockSearch = (
    phase: MockSearchEventDetail['phase'],
    query: string
) =>
    new Promise<void>((resolve) => {
        const handleSearchEvent = (event: Event) => {
            const detail = (event as CustomEvent<MockSearchEventDetail>).detail
            if (detail.phase !== phase || detail.query !== query) return
            window.removeEventListener(MOCK_SEARCH_EVENT, handleSearchEvent)
            resolve()
        }
        window.addEventListener(MOCK_SEARCH_EVENT, handleSearchEvent)
    })

const searchMockApi = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase()
    announceMockSearch({ phase: 'requested', query: normalizedQuery })

    return new Promise<AsyncSearchGroup[]>((resolve) => {
        window.setTimeout(
            () => {
                const results = mockAsyncSearchItems
                    .map((group) => ({
                        ...group,
                        items: group.items.filter((item) =>
                            item.label.toLowerCase().includes(normalizedQuery)
                        ),
                    }))
                    .filter((group) => group.items.length > 0)
                announceMockSearch({
                    phase: 'resolved',
                    query: normalizedQuery,
                })
                resolve(results)
            },
            normalizedQuery === 'a'
                ? MOCK_API_LATENCY_MS
                : MOCK_FAST_API_LATENCY_MS
        )
    })
}

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
            const normalizedQuery = searchText.trim().toLowerCase()
            if (!active) {
                announceMockSearch({ phase: 'ignored', query: normalizedQuery })
                return
            }
            setItems(nextItems)
            setIsSearchLoading(false)
            announceMockSearch({ phase: 'applied', query: normalizedQuery })
        }, SEARCH_DEBOUNCE_MS)

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

export const createControlledAsyncSearchPlay =
    (
        triggerRole: 'button' | 'combobox',
        triggerName: RegExp,
        reopenTriggerName: RegExp
    ) =>
    async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement)
        const page = within(canvasElement.ownerDocument.body)

        await userEvent.click(
            canvas.getByRole(triggerRole, { name: triggerName })
        )
        expect(
            await page.findAllByText('Start typing to search')
        ).not.toHaveLength(0)

        const searchInput = page.getByPlaceholderText('Search options...')
        const firstRequest = waitForMockSearch('requested', 'a')
        await userEvent.type(searchInput, 'a')
        expect(page.getByText('Searching…')).toBeInTheDocument()

        await firstRequest
        const latestResponse = waitForMockSearch('applied', 'alan')
        const staleResponse = waitForMockSearch('ignored', 'a')
        await userEvent.type(searchInput, 'lan')
        await latestResponse

        await waitFor(() =>
            expect(page.getByText('Alan Turing')).toBeInTheDocument()
        )
        await staleResponse
        expect(page.getByText('Alan Turing')).toBeInTheDocument()
        expect(page.queryByText('Ada Lovelace')).not.toBeInTheDocument()

        await userEvent.click(page.getByText('Alan Turing'))
        await userEvent.keyboard('{Escape}')
        await userEvent.click(
            canvas.getByRole(triggerRole, { name: reopenTriggerName })
        )

        const reopenedSearchInput =
            page.getByPlaceholderText('Search options...')
        expect(reopenedSearchInput).toHaveValue('alan')

        const subsequentResponse = waitForMockSearch('applied', 'grace')
        await userEvent.clear(reopenedSearchInput)
        await userEvent.type(reopenedSearchInput, 'grace')
        expect(page.getByText('Searching…')).toBeInTheDocument()
        await subsequentResponse

        await waitFor(() =>
            expect(page.getByText('Grace Hopper')).toBeInTheDocument()
        )
        expect(page.queryByText('Alan Turing')).not.toBeInTheDocument()
    }
