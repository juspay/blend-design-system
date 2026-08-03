import {
    MultiSelect,
    MultiSelectV2,
    SingleSelect,
    SingleSelectV2,
    type MultiSelectMenuGroupType,
    type MultiSelectV2GroupType,
    type SelectMenuGroupType,
    type SingleSelectV2GroupType,
} from '@juspay/blend-design-system'

type SearchAdapterProps<TItems> = {
    query: string
    onQueryChange: (query: string) => void
    results: TItems
    isLoading?: boolean
}

export const ControlledSingleSelectV1SearchAdapter = ({
    query,
    onQueryChange,
    results,
    isLoading,
}: SearchAdapterProps<SelectMenuGroupType[]>) => (
    <SingleSelect
        label="Adapted single select"
        placeholder="Adapted single select"
        items={results}
        selected=""
        onSelect={() => {}}
        searchText={query}
        onSearchChange={onQueryChange}
        isSearchLoading={isLoading}
        emptyStateText="Start typing to search"
    />
)

export const ControlledMultiSelectV1SearchAdapter = ({
    query,
    onQueryChange,
    results,
    isLoading,
}: SearchAdapterProps<MultiSelectMenuGroupType[]>) => (
    <MultiSelect
        label="Adapted multi select"
        placeholder="Adapted multi select"
        items={results}
        selectedValues={[]}
        onSelectionChange={() => {}}
        searchText={query}
        onSearchChange={onQueryChange}
        isSearchLoading={isLoading}
        emptyStateText="Start typing to search"
    />
)

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
