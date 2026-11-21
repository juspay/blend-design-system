import { describe, expect, it } from 'vitest'
import { MESSAGE_GROUPS } from '../../lib/i18n/constants'
import { BLEND_MESSAGES } from '../../lib/i18n/catalog'
import { COMMON_MESSAGES } from '../../lib/i18n/catalog/common.messages'
import { DATE_RANGE_PICKER_MESSAGES } from '../../lib/i18n/catalog/dateRangePicker.messages'
import { TIME_PICKER_MESSAGES } from '../../lib/i18n/catalog/timePicker.messages'
import { UPLOAD_MESSAGES } from '../../lib/i18n/catalog/upload.messages'
import { UPLOAD_V2_MESSAGES } from '../../lib/i18n/catalog/uploadV2.messages'
import { SELECT_MESSAGES } from '../../lib/i18n/catalog/select.messages'
import { DATA_TABLE_MESSAGES } from '../../lib/i18n/catalog/dataTable.messages'
import { NAVIGATION_MESSAGES } from '../../lib/i18n/catalog/navigation.messages'
import { MENU_MESSAGES } from '../../lib/i18n/catalog/menu.messages'
import { DIRECTORY_MESSAGES } from '../../lib/i18n/catalog/directory.messages'
import { BREADCRUMB_MESSAGES } from '../../lib/i18n/catalog/breadcrumb.messages'
import { TABS_MESSAGES } from '../../lib/i18n/catalog/tabs.messages'
import { INPUT_MESSAGES } from '../../lib/i18n/catalog/input.messages'
import { OVERLAY_MESSAGES } from '../../lib/i18n/catalog/overlay.messages'
import { FEEDBACK_MESSAGES } from '../../lib/i18n/catalog/feedback.messages'
import { CHAT_INPUT_MESSAGES } from '../../lib/i18n/catalog/chatInput.messages'
import { CODE_MESSAGES } from '../../lib/i18n/catalog/code.messages'
import { STEPPER_MESSAGES } from '../../lib/i18n/catalog/stepper.messages'
import { CHART_MESSAGES } from '../../lib/i18n/catalog/chart.messages'

/** `{component}.{group}.{item}[.{modifier}][.{plural-category}]`, 3-5 segments. */
const KEY_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*){2,4}$/

const GROUPS = new Set<string>(MESSAGE_GROUPS)
// Explicit rather than derived from the fragments: adding a family should be
// a deliberate edit here, not something a new file does silently.
const FAMILIES = new Set([
    'common',
    'upload',
    'data-table',
    'upload-v2',
    'date-range-picker',
    'time-picker',
    'select',
    'navigation',
    'sidebar',
    'topbar',
    'menu',
    'directory',
    'breadcrumb',
    'tabs',
    'input',
    'modal',
    'popover',
    'drawer',
    'alert',
    'snackbar',
    'spinner',
    'skeleton',
    'chat-input',
    'code-block',
    'code-editor',
    'stepper',
    'chart',
    'stat-card',
])
const PLACEHOLDER_SCAN = /\{([^}]*)\}/g
const VALID_PLACEHOLDER = /^[A-Za-z0-9_]+$/

const FRAGMENTS = {
    COMMON_MESSAGES,
    UPLOAD_MESSAGES,
    UPLOAD_V2_MESSAGES,
    DATE_RANGE_PICKER_MESSAGES,
    TIME_PICKER_MESSAGES,
    SELECT_MESSAGES,
    DATA_TABLE_MESSAGES,
    NAVIGATION_MESSAGES,
    MENU_MESSAGES,
    DIRECTORY_MESSAGES,
    BREADCRUMB_MESSAGES,
    TABS_MESSAGES,
    INPUT_MESSAGES,
    OVERLAY_MESSAGES,
    FEEDBACK_MESSAGES,
    CHAT_INPUT_MESSAGES,
    CODE_MESSAGES,
    STEPPER_MESSAGES,
    CHART_MESSAGES,
}

const entries = Object.entries(BLEND_MESSAGES)
const keys = Object.keys(BLEND_MESSAGES)

describe('message catalog', () => {
    describe('key grammar', () => {
        it.each(keys)('%s matches the key pattern', (key) => {
            expect(key).toMatch(KEY_PATTERN)
        })

        it.each(keys)('%s names a known family', (key) => {
            expect(FAMILIES).toContain(key.split('.')[0])
        })

        it.each(keys)('%s uses a group from the closed vocabulary', (key) => {
            expect(GROUPS).toContain(key.split('.')[1])
        })
    })

    describe('values', () => {
        it.each(entries)(
            '%s is non-empty and cleanly trimmed',
            (key, value) => {
                expect(value.length).toBeGreaterThan(0)
                // A trailing space is invisible in review and would break every
                // byte-identical-output claim a migration PR makes.
                expect(value).toBe(value.trim())
            }
        )

        it.each(entries)(
            '%s declares well-formed placeholders',
            (_key, value) => {
                for (const [, name] of value.matchAll(PLACEHOLDER_SCAN)) {
                    expect(name).toMatch(VALID_PLACEHOLDER)
                }
            }
        )
    })

    describe('plural pairs', () => {
        it('pairs every .one with an .other and vice versa', () => {
            const oneKeys = keys.filter((key) => key.endsWith('.one'))
            const otherKeys = keys.filter((key) => key.endsWith('.other'))

            for (const key of oneKeys) {
                expect(keys).toContain(`${key.slice(0, -4)}.other`)
            }
            for (const key of otherKeys) {
                expect(keys).toContain(`${key.slice(0, -6)}.one`)
            }
        })

        it('declares no non-English plural categories', () => {
            // A Polish or Arabic translator supplies few/many/zero/two in their
            // own dictionary; the English catalog has nothing better to offer,
            // so the resolver falls back to .other.
            for (const key of keys) {
                expect(key).not.toMatch(/\.(zero|two|few|many)$/)
            }
        })
    })

    describe('fragment composition', () => {
        it('defines no key in two fragments', () => {
            // BLEND_MESSAGES is built by spread, so a duplicate would be
            // silently resolved by spread order rather than reported.
            const total = Object.values(FRAGMENTS).reduce(
                (sum, fragment) => sum + Object.keys(fragment).length,
                0
            )
            expect(keys).toHaveLength(total)
        })

        it.each(Object.entries(FRAGMENTS))(
            '%s contributes every one of its keys',
            (_name, fragment) => {
                for (const key of Object.keys(fragment)) {
                    expect(keys).toContain(key)
                }
            }
        )
    })

    // The key catalog is a public contract: renaming a key breaks every
    // consumer's translation files. A snapshot diff makes that visible in
    // review instead of shipping silently.
    it('matches the published key list', () => {
        expect([...keys].sort()).toMatchInlineSnapshot(`
          [
            "alert.a11y.action",
            "alert.a11y.close",
            "breadcrumb.a11y.current-page",
            "breadcrumb.a11y.current-page-unnamed",
            "breadcrumb.a11y.navigate-to",
            "breadcrumb.a11y.navigate-to-unnamed",
            "breadcrumb.a11y.navigation",
            "breadcrumb.a11y.show-more.one",
            "breadcrumb.a11y.show-more.other",
            "breadcrumb.label.item-fallback",
            "chart.a11y.collapse",
            "chart.a11y.container",
            "chart.a11y.enter-fullscreen",
            "chart.a11y.exit-fullscreen",
            "chart.a11y.expand",
            "chart.a11y.header",
            "chart.a11y.legend",
            "chart.a11y.reset-legend",
            "chart.a11y.toggle-series",
            "chart.action.hide-legend",
            "chart.action.show-legend",
            "chart.empty.no-data",
            "chart.empty.no-data-subtitle",
            "chart.error.fullscreen",
            "chart.error.invalid-sankey",
            "chart.error.invalid-sankey-hint",
            "chart.error.unsupported-type",
            "chart.label.data-point",
            "chart.label.funnel-drop-off",
            "chart.label.more-series.one",
            "chart.label.more-series.other",
            "chart.label.sankey-flow",
            "chart.label.sankey-from",
            "chart.label.sankey-node",
            "chart.label.sankey-to",
            "chart.label.sankey-value",
            "chat-input.a11y.actions",
            "chat-input.a11y.attach-files",
            "chat-input.a11y.file-item",
            "chat-input.a11y.files-attached.one",
            "chat-input.a11y.files-attached.other",
            "chat-input.a11y.message-input",
            "chat-input.a11y.query",
            "chat-input.a11y.remove-attachment",
            "chat-input.a11y.remove-file",
            "chat-input.a11y.secondary-action",
            "chat-input.a11y.show-more-files.one",
            "chat-input.a11y.show-more-files.other",
            "chat-input.a11y.suggested-queries",
            "chat-input.label.more-files.one",
            "chat-input.label.more-files.other",
            "chat-input.label.top-queries",
            "chat-input.placeholder.message",
            "chat-input.status.duplicate-header",
            "chat-input.status.duplicate-single",
            "chat-input.status.duplicates-not-added.one",
            "chat-input.status.duplicates-not-added.other",
            "code-block.a11y.added-code",
            "code-block.a11y.collapsed-lines",
            "code-block.a11y.copied",
            "code-block.a11y.copied-from",
            "code-block.a11y.copied-from-unnamed",
            "code-block.a11y.copy",
            "code-block.a11y.copy-from",
            "code-block.a11y.copy-from-unnamed",
            "code-block.a11y.expand-collapsed",
            "code-block.a11y.header",
            "code-block.a11y.load-more-above",
            "code-block.a11y.load-more-below",
            "code-block.a11y.region",
            "code-block.a11y.region-language",
            "code-block.a11y.region-unnamed",
            "code-block.a11y.region-unnamed-language",
            "code-block.a11y.removed-code",
            "code-block.label.header",
            "code-editor.a11y.copied",
            "code-editor.a11y.copy",
            "code-editor.a11y.header",
            "code-editor.label.title",
            "code-editor.status.loading",
            "common.action.apply",
            "common.action.cancel",
            "common.action.clear",
            "common.empty.no-items",
            "common.empty.no-results",
            "data-table.a11y.advanced-filters",
            "data-table.a11y.advanced-filters-active",
            "data-table.a11y.cancel-edit",
            "data-table.a11y.clear-all-filters",
            "data-table.a11y.close-search",
            "data-table.a11y.collapse-row",
            "data-table.a11y.column-manager",
            "data-table.a11y.deselect-all",
            "data-table.a11y.edit-row",
            "data-table.a11y.expand-row",
            "data-table.a11y.export-format",
            "data-table.a11y.export-selected.one",
            "data-table.a11y.export-selected.other",
            "data-table.a11y.export-table",
            "data-table.a11y.filter-column",
            "data-table.a11y.go-to-page",
            "data-table.a11y.go-to-page-current",
            "data-table.a11y.jump-to-page-current",
            "data-table.a11y.load-failed",
            "data-table.a11y.loading",
            "data-table.a11y.manage-columns",
            "data-table.a11y.more-actions",
            "data-table.a11y.more-columns",
            "data-table.a11y.next-page",
            "data-table.a11y.next-page-current",
            "data-table.a11y.open-search",
            "data-table.a11y.pagination",
            "data-table.a11y.pivot-add-columns",
            "data-table.a11y.pivot-add-rows",
            "data-table.a11y.pivot-add-values",
            "data-table.a11y.pivot-illustration",
            "data-table.a11y.previous-page",
            "data-table.a11y.previous-page-current",
            "data-table.a11y.remove-field",
            "data-table.a11y.row",
            "data-table.a11y.row-expanded",
            "data-table.a11y.row-selected",
            "data-table.a11y.row-selected-expanded",
            "data-table.a11y.rows-per-page",
            "data-table.a11y.rows-selected.one",
            "data-table.a11y.rows-selected.other",
            "data-table.a11y.save-row",
            "data-table.a11y.see-actions.one",
            "data-table.a11y.see-actions.other",
            "data-table.a11y.select-all-rows",
            "data-table.a11y.select-row",
            "data-table.a11y.select-row-in-table",
            "data-table.a11y.showing-rows",
            "data-table.a11y.table",
            "data-table.a11y.table-settings",
            "data-table.a11y.view-details",
            "data-table.action.add-columns",
            "data-table.action.clear-all",
            "data-table.action.clear-filter",
            "data-table.action.default",
            "data-table.action.delete",
            "data-table.action.deselect-all",
            "data-table.action.download",
            "data-table.action.edit",
            "data-table.action.export",
            "data-table.action.export-csv",
            "data-table.action.filter",
            "data-table.action.format",
            "data-table.action.insert-left",
            "data-table.action.insert-right",
            "data-table.action.operations",
            "data-table.action.rename",
            "data-table.action.retry",
            "data-table.action.save",
            "data-table.action.see-actions",
            "data-table.action.select-all-columns",
            "data-table.action.settings",
            "data-table.action.sort-ascending",
            "data-table.action.sort-descending",
            "data-table.empty.no-data",
            "data-table.empty.no-data-available",
            "data-table.empty.no-filter-component",
            "data-table.error.export-failed",
            "data-table.error.export-no-data",
            "data-table.error.export-no-selection",
            "data-table.error.load-failed",
            "data-table.error.slider-config-missing",
            "data-table.label.actions",
            "data-table.label.advanced-filters",
            "data-table.label.advanced-filters-count",
            "data-table.label.am",
            "data-table.label.available-columns",
            "data-table.label.delta",
            "data-table.label.filter-by-range",
            "data-table.label.go-to-page",
            "data-table.label.insights",
            "data-table.label.jump-to-page",
            "data-table.label.page",
            "data-table.label.pivot-columns",
            "data-table.label.pivot-rows",
            "data-table.label.pivot-title",
            "data-table.label.pivot-values",
            "data-table.label.pm",
            "data-table.label.range",
            "data-table.label.range-empty",
            "data-table.label.rows",
            "data-table.label.rows-per-page",
            "data-table.label.select-column-value",
            "data-table.label.select-columns",
            "data-table.label.selected-count",
            "data-table.label.show-total",
            "data-table.placeholder.add",
            "data-table.placeholder.choose-columns",
            "data-table.placeholder.column-name",
            "data-table.placeholder.manage-columns",
            "data-table.placeholder.operation",
            "data-table.placeholder.search",
            "data-table.placeholder.search-columns",
            "data-table.placeholder.search-options",
            "data-table.placeholder.search-pages",
            "data-table.placeholder.search-table",
            "data-table.placeholder.select",
            "data-table.placeholder.select-columns",
            "data-table.status.loading",
            "date-range-picker.a11y.choose-date",
            "date-range-picker.a11y.choose-month",
            "date-range-picker.a11y.choose-year",
            "date-range-picker.a11y.clear-selection",
            "date-range-picker.a11y.end-time",
            "date-range-picker.a11y.next-year",
            "date-range-picker.a11y.previous-year",
            "date-range-picker.a11y.select-month",
            "date-range-picker.a11y.select-year",
            "date-range-picker.a11y.start-time",
            "date-range-picker.a11y.state-disabled",
            "date-range-picker.a11y.state-not-selected",
            "date-range-picker.a11y.state-selected",
            "date-range-picker.a11y.state-today",
            "date-range-picker.a11y.trigger",
            "date-range-picker.action.apply-date",
            "date-range-picker.label.date",
            "date-range-picker.label.end",
            "date-range-picker.label.end-date",
            "date-range-picker.label.month",
            "date-range-picker.label.start",
            "date-range-picker.label.start-date",
            "date-range-picker.label.time",
            "date-range-picker.label.year",
            "date-range-picker.placeholder.select-date",
            "date-range-picker.placeholder.select-date-range",
            "date-range-picker.placeholder.select-dates",
            "date-range-picker.placeholder.select-month",
            "date-range-picker.placeholder.select-month-range",
            "date-range-picker.placeholder.select-range",
            "date-range-picker.placeholder.select-year",
            "date-range-picker.preset.custom",
            "date-range-picker.preset.last-1-hour",
            "date-range-picker.preset.last-12-months",
            "date-range-picker.preset.last-24-hours",
            "date-range-picker.preset.last-3-months",
            "date-range-picker.preset.last-30-days",
            "date-range-picker.preset.last-30-minutes",
            "date-range-picker.preset.last-6-hours",
            "date-range-picker.preset.last-7-days",
            "date-range-picker.preset.last-month",
            "date-range-picker.preset.next-12-months",
            "date-range-picker.preset.next-3-months",
            "date-range-picker.preset.next-30-days",
            "date-range-picker.preset.next-7-days",
            "date-range-picker.preset.this-month",
            "date-range-picker.preset.today",
            "date-range-picker.preset.tomorrow",
            "date-range-picker.preset.yesterday",
            "directory.a11y.navigation",
            "directory.a11y.section",
            "directory.a11y.submenu",
            "drawer.action.clear",
            "drawer.action.clear-all",
            "drawer.action.done",
            "drawer.placeholder.search",
            "drawer.status.opened",
            "input.a11y.clear-search",
            "input.a11y.decrease",
            "input.a11y.decrease-value",
            "input.a11y.hide-password",
            "input.a11y.hide-password-verbose",
            "input.a11y.increase",
            "input.a11y.increase-value",
            "input.a11y.password-group",
            "input.a11y.password-group-unnamed",
            "input.a11y.remove-value",
            "input.a11y.select-option",
            "input.a11y.show-password",
            "input.a11y.show-password-verbose",
            "input.a11y.text-input-group",
            "input.error.invalid-value",
            "input.error.range-between",
            "input.error.range-max",
            "input.error.range-min",
            "input.error.unit-too-long",
            "input.label.number-input",
            "input.placeholder.enter",
            "menu.a11y.search",
            "menu.a11y.search-submenu",
            "menu.a11y.search-with-placeholder",
            "menu.placeholder.search",
            "menu.placeholder.submenu-search",
            "modal.a11y.close",
            "modal.a11y.dialog",
            "navigation.a11y.main-content",
            "navigation.a11y.navigation-menu",
            "navigation.a11y.select-merchant",
            "navigation.a11y.select-tenant",
            "navigation.a11y.select-tenant-unnamed",
            "navigation.placeholder.select-merchant",
            "popover.a11y.close",
            "popover.a11y.dialog",
            "select.a11y.clear-selection",
            "select.a11y.clear-selection-for",
            "select.a11y.results-updated",
            "select.a11y.search",
            "select.a11y.searching",
            "select.action.clear-all",
            "select.action.select-all",
            "select.label.custom-value",
            "select.label.custom-value-option",
            "select.label.select-options",
            "select.label.select-options-v1",
            "select.placeholder.search",
            "select.placeholder.search-short",
            "select.status.searching",
            "sidebar.a11y.app-navigation",
            "sidebar.a11y.collapse-toggle",
            "sidebar.a11y.expand-toggle",
            "sidebar.a11y.more-navigation-options",
            "sidebar.a11y.more-options",
            "sidebar.a11y.more-tenants",
            "sidebar.a11y.primary-action",
            "sidebar.action.collapse",
            "sidebar.action.expand",
            "sidebar.label.collapse-shortcut",
            "sidebar.label.expand-shortcut",
            "sidebar.label.more",
            "sidebar.placeholder.search-tenants",
            "sidebar.status.collapsed",
            "sidebar.status.expanded",
            "skeleton.a11y.loading",
            "skeleton.label.cancel",
            "skeleton.label.confirm",
            "snackbar.a11y.close",
            "spinner.label.loading",
            "stat-card.a11y.change-decrease",
            "stat-card.a11y.change-increase",
            "stat-card.a11y.chart",
            "stat-card.a11y.chart-trend-decreasing.one",
            "stat-card.a11y.chart-trend-decreasing.other",
            "stat-card.a11y.chart-trend-increasing.one",
            "stat-card.a11y.chart-trend-increasing.other",
            "stat-card.a11y.chart-trend-stable.one",
            "stat-card.a11y.chart-trend-stable.other",
            "stat-card.a11y.chart-unnamed",
            "stat-card.a11y.help",
            "stepper.a11y.additional-info",
            "stepper.a11y.collapse-substeps",
            "stepper.a11y.expand-substeps",
            "stepper.a11y.progress",
            "stepper.a11y.step-completed",
            "stepper.a11y.step-current",
            "stepper.a11y.step-disabled",
            "stepper.a11y.step-focused",
            "stepper.a11y.step-pending",
            "stepper.a11y.step-skipped",
            "stepper.a11y.substep-completed",
            "stepper.a11y.substep-current",
            "stepper.a11y.substep-disabled",
            "stepper.a11y.substep-pending",
            "stepper.a11y.substep-skipped",
            "stepper.a11y.substeps",
            "tabs.a11y.close",
            "tabs.a11y.close-tab",
            "tabs.a11y.navigate-to-tab",
            "tabs.label.add-new-tab",
            "tabs.placeholder.navigate",
            "tabs.placeholder.search-tabs",
            "time-picker.a11y.choose-time",
            "time-picker.a11y.trigger",
            "time-picker.label.am",
            "time-picker.label.hours",
            "time-picker.label.minutes",
            "time-picker.label.period",
            "time-picker.label.pm",
            "time-picker.label.seconds",
            "time-picker.label.time-with-period",
            "topbar.a11y.go-back",
            "upload-v2.a11y.file-input",
            "upload-v2.a11y.remove-file",
            "upload-v2.a11y.show-more-files.one",
            "upload-v2.a11y.show-more-files.other",
            "upload-v2.action.browse-files",
            "upload-v2.action.replace-file",
            "upload-v2.error.invalid-file",
            "upload-v2.error.invalid-type",
            "upload-v2.error.max-files",
            "upload-v2.error.max-files-limit",
            "upload-v2.error.oversized",
            "upload-v2.error.oversized-max",
            "upload-v2.label.drop-hint",
            "upload-v2.label.files-added",
            "upload-v2.label.files-uploaded",
            "upload-v2.label.partial-result",
            "upload-v2.label.selected-file",
            "upload-v2.label.upload-succeeded",
            "upload-v2.status.failed",
            "upload-v2.status.uploading",
            "upload.a11y.file-input",
            "upload.a11y.remove-file",
            "upload.a11y.upload-area",
            "upload.a11y.uploading-progress",
            "upload.action.browse-files",
            "upload.action.replace-file",
            "upload.error.failed-short",
            "upload.error.failed-to-upload.one",
            "upload.error.failed-to-upload.other",
            "upload.error.failed.one",
            "upload.error.failed.other",
            "upload.error.files-failed",
            "upload.error.rejected",
            "upload.error.retry",
            "upload.label.drop-here",
            "upload.label.drop-hint",
            "upload.label.files-uploaded",
            "upload.label.invalid-type",
            "upload.label.partial-result",
            "upload.status.added.one",
            "upload.status.added.other",
            "upload.status.failed",
            "upload.status.uploaded-multiple",
            "upload.status.uploaded-single",
            "upload.status.uploading",
            "upload.status.uploading-description",
            "upload.status.uploading-named",
          ]
        `)
    })
})
