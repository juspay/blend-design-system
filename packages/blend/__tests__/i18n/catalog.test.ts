import { describe, expect, it } from 'vitest'
import { MESSAGE_GROUPS } from '../../lib/i18n/constants'
import { BLEND_MESSAGES } from '../../lib/i18n/catalog'
import { COMMON_MESSAGES } from '../../lib/i18n/catalog/common.messages'
import { DATE_RANGE_PICKER_MESSAGES } from '../../lib/i18n/catalog/dateRangePicker.messages'
import { TIME_PICKER_MESSAGES } from '../../lib/i18n/catalog/timePicker.messages'
import { UPLOAD_MESSAGES } from '../../lib/i18n/catalog/upload.messages'
import { UPLOAD_V2_MESSAGES } from '../../lib/i18n/catalog/uploadV2.messages'

/** `{component}.{group}.{item}[.{modifier}][.{plural-category}]`, 3-5 segments. */
const KEY_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*){2,4}$/

const GROUPS = new Set<string>(MESSAGE_GROUPS)
// Explicit rather than derived from the fragments: adding a family should be
// a deliberate edit here, not something a new file does silently.
const FAMILIES = new Set([
    'common',
    'upload',
    'upload-v2',
    'date-range-picker',
    'time-picker',
])
const PLACEHOLDER_SCAN = /\{([^}]*)\}/g
const VALID_PLACEHOLDER = /^[A-Za-z0-9_]+$/

const FRAGMENTS = {
    COMMON_MESSAGES,
    UPLOAD_MESSAGES,
    UPLOAD_V2_MESSAGES,
    DATE_RANGE_PICKER_MESSAGES,
    TIME_PICKER_MESSAGES,
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
            "common.action.apply",
            "common.action.cancel",
            "common.action.clear",
            "common.empty.no-items",
            "common.empty.no-results",
            "date-range-picker.a11y.choose-date",
            "date-range-picker.a11y.choose-month",
            "date-range-picker.a11y.choose-year",
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
            "date-range-picker.label.month",
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
            "time-picker.a11y.choose-time",
            "time-picker.label.am",
            "time-picker.label.hours",
            "time-picker.label.minutes",
            "time-picker.label.period",
            "time-picker.label.pm",
            "time-picker.label.seconds",
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
            "upload.a11y.remove-file",
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
            "upload.label.invalid-type",
            "upload.status.added.one",
            "upload.status.added.other",
            "upload.status.uploaded-multiple",
            "upload.status.uploaded-single",
            "upload.status.uploading",
            "upload.status.uploading-description",
            "upload.status.uploading-named",
          ]
        `)
    })
})
