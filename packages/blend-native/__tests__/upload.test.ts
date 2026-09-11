import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    UploadErrorReason,
    UploadState,
    getUploadV2Tokens,
} from '@juspay/blend-design-system/node'
import { parseBorder } from '../src/adapters/cssStringAdapter'
import {
    FILE_NAME_TAG_MAX_LEN,
    formatFileSize,
    getAggregatedErrorMessage,
    getFileId,
    getUploadDisplayState,
    getValidationMessage,
    isFileTypeAccepted,
    isKnownUploadErrorReason,
    normalizeUploadErrorReason,
    truncateFileNameForTag,
    validateUploadFiles,
} from '../src/components/Upload/upload.utils'
import type { UploadFileNativeItem } from '../src/components/Upload/upload.types'

const VALID_FILE: UploadFileNativeItem = {
    name: 'report.pdf',
    size: 1024,
    isValid: true,
    type: 'application/pdf',
}

const file = (
    name: string,
    size = 1024,
    type?: string,
    extra: Partial<UploadFileNativeItem> = {}
): UploadFileNativeItem => ({
    name,
    size,
    isValid: true,
    type,
    ...extra,
})

describe('Upload tokens', () => {
    describe.each([
        ['sm', Theme.LIGHT],
        ['lg', Theme.LIGHT],
        ['sm', Theme.DARK],
        ['lg', Theme.DARK],
    ])('%s / %s', (breakpoint, theme) => {
        const tokens = getUploadV2Tokens(FOUNDATION_THEME as never, theme)[
            breakpoint as 'sm' | 'lg'
        ]

        it('resolves the token shape', () => {
            expect(tokens.gap).toBeDefined()
            expect(tokens.topContainer.label).toBeDefined()
            expect(tokens.bottomContainer.errorMessage).toBeDefined()
            expect(tokens.uploadContainer.header.title).toBeDefined()
        })

        it('parses every uploadContainer border leaf as dashed', () => {
            const borders = tokens.uploadContainer.border as Record<
                string,
                unknown
            >
            for (const key of Object.keys(borders)) {
                const parsed = parseBorder(String(borders[key]))
                expect(parsed.borderStyle).toBe('dashed')
                expect(parsed.borderWidth).toBe(1)
                expect(parsed.borderColor).toMatch(/#/)
            }
        })

        it('resolves a background for every state key', () => {
            const backgrounds = tokens.uploadContainer
                .backgroundColor as Record<string, unknown>
            for (const key of Object.keys(backgrounds)) {
                expect(String(backgrounds[key])).toMatch(/#|rgb|hsl/)
            }
        })
    })
})

describe('truncateFileNameForTag', () => {
    it('returns short names untouched', () => {
        expect(truncateFileNameForTag('a.pdf')).toBe('a.pdf')
    })

    it('returns exactly-max-length names untouched', () => {
        const name = 'a'.repeat(FILE_NAME_TAG_MAX_LEN)
        expect(truncateFileNameForTag(name)).toBe(name)
    })

    it('truncates long names with an ellipsis at the max length', () => {
        const name = 'b'.repeat(FILE_NAME_TAG_MAX_LEN + 10)
        const truncated = truncateFileNameForTag(name)
        expect(truncated.length).toBe(FILE_NAME_TAG_MAX_LEN + 1)
        expect(truncated.endsWith('…')).toBe(true)
    })
})

describe('getFileId', () => {
    it('prefers an explicit id', () => {
        expect(getFileId({ ...VALID_FILE, id: 'x' }, 0)).toBe('x')
    })

    it('derives a unique id from name/size/index otherwise', () => {
        const a = getFileId(VALID_FILE, 0)
        const b = getFileId(VALID_FILE, 1)
        expect(a).not.toBe(b)
        expect(a).toContain('report.pdf')
    })
})

describe('isFileTypeAccepted', () => {
    it('accepts everything when the list is empty', () => {
        expect(isFileTypeAccepted(VALID_FILE, [])).toBe(true)
    })

    it('matches extensions case-insensitively', () => {
        expect(isFileTypeAccepted(file('photo.JPG'), ['.jpg', '.png'])).toBe(
            true
        )
        expect(isFileTypeAccepted(file('photo.webp'), ['.jpg'])).toBe(false)
    })

    it('matches mime groups via type', () => {
        expect(isFileTypeAccepted(file('x', 1, 'image/png'), ['image/*'])).toBe(
            true
        )
        expect(isFileTypeAccepted(file('x', 1, 'video/mp4'), ['image/*'])).toBe(
            false
        )
    })

    it('matches exact mime types', () => {
        expect(
            isFileTypeAccepted(file('x', 1, 'application/pdf'), [
                'application/pdf',
            ])
        ).toBe(true)
        expect(
            isFileTypeAccepted(file('x', 1, 'text/plain'), ['application/pdf'])
        ).toBe(false)
    })

    it('never matches an extension rule on a missing type', () => {
        // A file with no mime type and an unrelated extension.
        expect(isFileTypeAccepted(file('data.csv'), ['.pdf'])).toBe(false)
    })

    it('ignores blank entries in the accepted list', () => {
        expect(isFileTypeAccepted(file('x', 1, ''), ['   '])).toBe(false)
    })
})

describe('formatFileSize', () => {
    it('formats bytes, kilobytes and megabytes', () => {
        expect(formatFileSize(500)).toBe('500 B')
        expect(formatFileSize(2048)).toBe('2 KB')
        expect(formatFileSize(1024 * 1024)).toBe('1 MB')
        expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1.5 MB')
    })

    it('drops trailing zeros', () => {
        expect(formatFileSize(1024)).toBe('1 KB')
    })
})

describe('error reason normalization', () => {
    it('recognizes the three known reasons', () => {
        for (const reason of ['oversized', 'maxFiles', 'invalidType']) {
            expect(isKnownUploadErrorReason(reason)).toBe(true)
            expect(normalizeUploadErrorReason(reason)).toBe(reason)
        }
    })

    it('normalizes anything else to undefined', () => {
        expect(normalizeUploadErrorReason('nope')).toBeUndefined()
        expect(normalizeUploadErrorReason(undefined)).toBeUndefined()
    })
})

describe('getValidationMessage', () => {
    it('includes the formatted max size when given', () => {
        expect(getValidationMessage('oversized', 1024)).toBe(
            'File is too large. Max size is 1 KB'
        )
    })

    it('omits the size clause when maxSize is unset', () => {
        expect(getValidationMessage('oversized')).toBe('File is too large')
    })

    it('includes the file limit when given', () => {
        expect(getValidationMessage('maxFiles', 0, 3)).toBe(
            'File limit exceeded. Maximum 3 files allowed'
        )
    })

    it('handles invalidType and the generic fallback', () => {
        expect(getValidationMessage('invalidType')).toBe('Invalid file type')
        expect(getValidationMessage(undefined)).toBe('Invalid file')
    })
})

describe('validateUploadFiles', () => {
    it('marks valid files when nothing constrains them', () => {
        const result = validateUploadFiles([VALID_FILE])
        expect(result[0].isValid).toBe(true)
        expect(result[0].errorReason).toBeUndefined()
    })

    it('marks oversized files', () => {
        const result = validateUploadFiles([file('big.bin', 999999)], {
            maxSize: 1000,
        })
        expect(result[0].isValid).toBe(false)
        expect(result[0].errorReason).toBe(UploadErrorReason.OVERSIZED)
    })

    it('marks invalid types', () => {
        const result = validateUploadFiles(
            [file('doc.exe', 10, 'application/x-msdownload')],
            { acceptedTypes: ['.pdf'] }
        )
        expect(result[0].isValid).toBe(false)
        expect(result[0].errorReason).toBe(UploadErrorReason.INVALID_TYPE)
    })

    it('marks files beyond the remaining slots as MAX_FILES', () => {
        const batch = [file('a.pdf'), file('b.pdf'), file('c.pdf')]
        const result = validateUploadFiles(batch, {
            maxFiles: 3,
            multiple: true,
            existingCount: 1,
        })
        // Only 2 slots remain; the third file is MAX_FILES.
        expect(result.map((f) => f.isValid)).toEqual([true, true, false])
        expect(result[2].errorReason).toBe(UploadErrorReason.MAX_FILES)
    })

    it('single-file mode (multiple: false) allows exactly one, replacing', () => {
        const batch = [file('a.pdf'), file('b.pdf')]
        const result = validateUploadFiles(batch, { multiple: false })
        // No credit for existing files: index 0 wins, 1 is MAX_FILES.
        expect(result.map((f) => f.isValid)).toEqual([true, false])
        expect(result[1].errorReason).toBe(UploadErrorReason.MAX_FILES)
    })

    it('never mutates the input array or its items', () => {
        const batch = [file('bad.exe', 99999)]
        const snapshot = batch.map((f) => ({ ...f }))
        validateUploadFiles(batch, { maxSize: 10, acceptedTypes: ['.pdf'] })
        expect(batch).toEqual(snapshot)
    })

    it('applies an id to returned copies', () => {
        const result = validateUploadFiles([file('a.pdf')])
        expect(result[0].id).toBeDefined()
    })
})

describe('getUploadDisplayState', () => {
    // Truth table: disabled > invalid-files > prop state.
    it('defaults to IDLE', () => {
        expect(getUploadDisplayState()).toBe(UploadState.IDLE)
    })

    it('disabled prop forces DISABLED over everything', () => {
        expect(getUploadDisplayState(UploadState.UPLOADING, true, true)).toBe(
            UploadState.DISABLED
        )
    })

    it('DISABLED state wins over invalid files', () => {
        expect(getUploadDisplayState(UploadState.DISABLED, false, true)).toBe(
            UploadState.DISABLED
        )
    })

    it('invalid files force ERROR even when the prop state is IDLE', () => {
        expect(getUploadDisplayState(UploadState.IDLE, false, true)).toBe(
            UploadState.ERROR
        )
    })

    it('otherwise passes the prop state through', () => {
        expect(getUploadDisplayState(UploadState.SUCCESS, false, false)).toBe(
            UploadState.SUCCESS
        )
    })
})

describe('getAggregatedErrorMessage', () => {
    it('collects distinct reasons in the fixed order', () => {
        const files = [
            file('a.pdf', 10, undefined, {
                isValid: false,
                errorReason: UploadErrorReason.INVALID_TYPE,
            }),
            file('b.pdf', 999999, undefined, {
                isValid: false,
                errorReason: UploadErrorReason.OVERSIZED,
            }),
        ]
        expect(getAggregatedErrorMessage(files, 1024, 5)).toBe(
            'File is too large. Max size is 1 KB, Invalid file type'
        )
    })

    it('deduplicates repeated reasons', () => {
        const files = [
            file('a.pdf', 10, undefined, {
                isValid: false,
                errorReason: UploadErrorReason.INVALID_TYPE,
            }),
            file('b.pdf', 10, undefined, {
                isValid: false,
                errorReason: UploadErrorReason.INVALID_TYPE,
            }),
        ]
        expect(getAggregatedErrorMessage(files)).toBe('Invalid file type')
    })

    it('falls back to the generic message when nothing is marked', () => {
        expect(getAggregatedErrorMessage([VALID_FILE])).toBe('Invalid file')
    })
})
