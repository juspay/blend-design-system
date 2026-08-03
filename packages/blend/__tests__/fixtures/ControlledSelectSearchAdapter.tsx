import {
    MultiSelectV2,
    SingleSelectV2,
    type MultiSelectV2GroupType,
    type SingleSelectV2GroupType,
} from '@juspay/blend-design-system'

type SearchAdapterProps<TItems> = {
    query: string
    onQueryChange: (query: string) => void
    results: TItems
    isLoading?: boolean
}

export const ControlledSingleSelectSearchAdapter = ({
    query,
    onQueryChange,
    results,
    isLoading,
}: SearchAdapterProps<SingleSelectV2GroupType[]>) => (
    <SingleSelectV2
        label="Adapted single select"
        placeholder="Adapted single select"
        items={results}
        selected=""
        onSelect={() => {}}
        search={{
            searchText: query,
            onSearchChange: onQueryChange,
            isSearchLoading: isLoading,
            emptyStateText: 'Start typing to search',
        }}
    />
)

export const ControlledMultiSelectSearchAdapter = ({
    query,
    onQueryChange,
    results,
    isLoading,
}: SearchAdapterProps<MultiSelectV2GroupType[]>) => (
    <MultiSelectV2
        label="Adapted multi select"
        placeholder="Adapted multi select"
        items={results}
        selectedValues={[]}
        onSelectionChange={() => {}}
        search={{
            searchText: query,
            onSearchChange: onQueryChange,
            isSearchLoading: isLoading,
            emptyStateText: 'Start typing to search',
        }}
    />
)
