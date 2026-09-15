export type SelectSearchControlProps = {
    /**
     * The value rendered in the search input. Providing this prop enables
     * controlled search and disables internal item filtering, including when
     * the value is an empty string. Keep this value synchronous with user
     * input and debounce only the request that produces `items`.
     */
    searchText?: string
    /**
     * Called once for each user-driven search value change. In controlled
     * mode, update `searchText` from this callback. When `searchText` is not
     * provided, the callback observes changes while local filtering remains
     * enabled.
     */
    onSearchChange?: (text: string) => void
    /**
     * Shows the search-specific loading state. This is independent of
     * pagination (`hasMore`/`loadingComponent`) and the component skeleton.
     */
    isSearchLoading?: boolean
    /**
     * Overrides the message shown when the current item collection is empty.
     * The message is hidden while `isSearchLoading` is true.
     */
    emptyStateText?: string
}
