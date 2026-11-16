/**
 * DataTable strings, including its pagination, bulk-action bar, filter
 * popovers, mobile drawers and PivotTableModal.
 *
 * Values are transcribed verbatim from source so the migrated component
 * renders byte-identical English. Where the old code built a sentence by
 * concatenation (`row${s}`, `', selected'`), each variant is now a whole
 * sentence, so a translator controls word order.
 *
 * Deliberately NOT here — these are data, not display, and stay English
 * whatever the locale:
 * - `getExportValue`'s `'Yes'`/`'No'`, sheet name and dates (CSV/XLSX output
 *   consumers parse);
 * - the `data-date` / `data-table` DOM attributes;
 * - PivotTableModal's computed `'All Rows'` / `'All Columns'` / `'Grand Total'`
 *   labels, which double as row keys in `PivotTableModal/utils.ts`.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const DATA_TABLE_MESSAGES = {
    'data-table.action.retry': 'Retry',
    'data-table.action.export': 'Export',
    'data-table.action.export-csv': 'Export CSV',
    'data-table.action.download': 'Download',
    'data-table.action.settings': 'Settings',
    'data-table.action.clear-all': 'Clear All',
    'data-table.action.deselect-all': 'Deselect all',
    'data-table.action.see-actions': 'See Actions',
    'data-table.action.save': 'Save',
    'data-table.action.edit': 'Edit',
    'data-table.action.default': 'Action',
    'data-table.action.sort-ascending': 'Sort Ascending',
    'data-table.action.sort-descending': 'Sort Descending',
    'data-table.action.filter': 'Filter',
    'data-table.action.clear-filter': 'Clear Filter',
    'data-table.action.operations': 'Operations',
    'data-table.action.rename': 'Rename',
    'data-table.action.insert-left': 'Insert Left',
    'data-table.action.insert-right': 'Insert Right',
    'data-table.action.delete': 'Delete',
    'data-table.action.format': 'Format',
    'data-table.action.add-columns': 'Add Columns',

    'data-table.label.actions': 'Actions',
    'data-table.label.advanced-filters': 'Advanced Filters',
    'data-table.label.advanced-filters-count': 'Advanced Filters ({count})',
    'data-table.label.rows': 'Rows',
    'data-table.label.rows-per-page': 'Rows per page',
    'data-table.label.range': '{start}-{end} of {total}',
    'data-table.label.range-empty': '0 of {total}',
    'data-table.label.selected-count': '{count} selected',
    'data-table.label.go-to-page': 'Go to page',
    'data-table.label.page': 'Page {page}',
    'data-table.label.jump-to-page': 'Jump to page',
    'data-table.label.insights': 'Insights',
    'data-table.label.select-column-value': 'Select a {column}',
    'data-table.label.available-columns': 'Available Columns',
    'data-table.label.select-columns': 'Select Columns',
    'data-table.label.delta': 'Delta',
    'data-table.label.filter-by-range': 'Filter by Range',
    'data-table.label.show-total': 'Show Total',
    'data-table.label.pivot-title': 'Create Pivot Table',
    'data-table.label.pivot-rows': 'Rows',
    'data-table.label.pivot-columns': 'Columns',
    'data-table.label.pivot-values': 'Values',
    // Day-period markers for the `A`/`a` tokens of a date column's `format`.
    'data-table.label.am': 'AM',
    'data-table.label.pm': 'PM',

    'data-table.placeholder.search': 'Search',
    'data-table.placeholder.search-table': 'Search...',
    'data-table.placeholder.select': 'Select...',
    'data-table.placeholder.select-columns': 'Select columns to display',
    'data-table.placeholder.manage-columns': 'Manage Columns',
    'data-table.placeholder.choose-columns': 'Choose columns to display',
    'data-table.placeholder.column-name': 'Column Name',
    'data-table.placeholder.operation': 'operation',
    'data-table.placeholder.add': 'Add',

    'data-table.status.loading': 'Loading data...',

    'data-table.empty.no-data': 'No data',
    'data-table.empty.no-data-available': 'No data available',
    'data-table.empty.no-filter-component':
        'No filter component configured for this column type',

    'data-table.error.load-failed': 'Unable to load data',
    'data-table.error.export-failed': 'Export failed',
    'data-table.error.export-no-data': 'No data available for export',
    'data-table.error.export-no-selection':
        'Please select at least one row to export',
    'data-table.error.slider-config-missing': 'Slider configuration missing',

    'data-table.a11y.table': 'Data table',
    'data-table.a11y.loading': 'Loading table data',
    'data-table.a11y.load-failed': 'Failed to load table data',
    'data-table.a11y.showing-rows': 'Showing {visible} of {total} rows',
    'data-table.a11y.pagination': 'Pagination',
    'data-table.a11y.rows-per-page': 'Select number of rows per page',
    'data-table.a11y.previous-page': 'Previous page',
    'data-table.a11y.previous-page-current':
        'Previous page (currently page {page})',
    'data-table.a11y.next-page': 'Next page',
    'data-table.a11y.next-page-current':
        'Next page (currently page {page} of {total})',
    'data-table.a11y.go-to-page': 'Go to page {page}',
    'data-table.a11y.go-to-page-current': 'Go to page {page} (current page)',
    'data-table.a11y.jump-to-page-current':
        'Jump to page (currently showing page {page} of {total})',
    'data-table.a11y.export-format': 'Export {format}',
    'data-table.a11y.export-table': 'Export table',
    'data-table.a11y.table-settings': 'Table settings',
    'data-table.a11y.close-search': 'Close search',
    'data-table.a11y.open-search': 'Open search',
    'data-table.a11y.advanced-filters': 'Advanced filters',
    'data-table.a11y.advanced-filters-active':
        'Advanced filters ({count} active)',
    'data-table.a11y.clear-all-filters': 'Clear all filters',
    'data-table.a11y.manage-columns': 'Manage columns',
    'data-table.a11y.rows-selected.one': '{count} row selected',
    'data-table.a11y.rows-selected.other': '{count} rows selected',
    'data-table.a11y.see-actions.one': 'See actions for {count} selected row',
    'data-table.a11y.see-actions.other':
        'See actions for {count} selected rows',
    'data-table.a11y.export-selected.one': 'Export {count} selected row',
    'data-table.a11y.export-selected.other': 'Export {count} selected rows',
    'data-table.a11y.deselect-all': 'Deselect all rows',
    'data-table.a11y.save-row': 'Save row',
    'data-table.a11y.cancel-edit': 'Cancel editing row',
    'data-table.a11y.edit-row': 'Edit row',
    'data-table.a11y.more-actions': 'More actions',
    // Four whole sentences rather than `Row {n}` plus appended suffixes:
    // the list separator and the order of states are language-specific.
    'data-table.a11y.row': 'Row {index}',
    'data-table.a11y.row-selected': 'Row {index}, selected',
    'data-table.a11y.row-expanded': 'Row {index}, expanded',
    'data-table.a11y.row-selected-expanded': 'Row {index}, selected, expanded',
    'data-table.a11y.expand-row': 'Expand row',
    'data-table.a11y.collapse-row': 'Collapse row',
    'data-table.a11y.select-row': 'Select row {index}',
    'data-table.a11y.select-row-in-table': 'Select row {index} in {table}',
    'data-table.a11y.select-all-rows': 'Select all rows',
    'data-table.a11y.view-details': 'View more details',
    'data-table.a11y.filter-column': 'Filter {column}',
    'data-table.a11y.more-columns': 'View more columns',
    'data-table.a11y.column-manager': 'Column manager',
    'data-table.a11y.remove-field': 'Remove {field}',
    'data-table.a11y.pivot-add-rows': 'Add rows field',
    'data-table.a11y.pivot-add-columns': 'Add columns field',
    'data-table.a11y.pivot-add-values': 'Add values field',
    'data-table.a11y.pivot-illustration': 'Pivot table illustration',
} as const
