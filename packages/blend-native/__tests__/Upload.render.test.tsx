import {
    FOUNDATION_THEME,
    UploadState,
    getUploadV2Tokens,
    type UploadV2TokensType,
} from '@juspay/blend-design-system/node'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Upload } from '../src/components/Upload'
import type { UploadFileNativeItem } from '../src/components/Upload'
import { parseBorder } from '../src/adapters/cssStringAdapter'

/**
 * Upload render behaviour: the drop zone chrome renders, browse fires the
 * app-owned picker callback, file tags remove through onChange, invalid
 * files flip the border to the ERROR tokens, and disabled/uploading block
 * interaction.
 */

const tokens = getUploadV2Tokens(FOUNDATION_THEME).sm as UploadV2TokensType

const renderUpload = (
    props: Partial<React.ComponentProps<typeof Upload>> = {}
) =>
    render(
        <BlendNativeProvider>
            <Upload
                label="Documents"
                description="PDF or images up to 1 MB"
                testID="upload"
                {...props}
            />
        </BlendNativeProvider>
    )

const file = (
    name: string,
    extra: Partial<UploadFileNativeItem> = {}
): UploadFileNativeItem => ({
    name,
    size: 2048,
    isValid: true,
    ...extra,
})

const flatten = (style: unknown) =>
    Object.assign(
        {},
        ...(Array.isArray(style) ? style.flat(Infinity) : [style])
    )

describe('Upload rendering', () => {
    it('renders the empty state: header, description and Browse Files', () => {
        renderUpload()
        expect(screen.getByText('Tap to upload files')).toBeTruthy()
        expect(screen.getByText('PDF or images up to 1 MB')).toBeTruthy()
        expect(screen.getByText('Browse Files')).toBeTruthy()
    })

    it('renders files as tags, invalid first', () => {
        renderUpload({
            multiple: true,
            files: [
                file('good.pdf'),
                file('bad.exe', { isValid: false, errorReason: 'invalidType' }),
            ],
        })
        expect(screen.getByText('good.pdf')).toBeTruthy()
        expect(screen.getByText('bad.exe')).toBeTruthy()
        expect(screen.getByText('Files uploaded')).toBeTruthy()
        expect(screen.getByText('1 succeeded, 1 failed')).toBeTruthy()
    })

    it('shows the single-file copy when multiple is false', () => {
        renderUpload({
            multiple: false,
            files: [file('only.pdf')],
        })
        expect(screen.getByText('Selected file: only.pdf')).toBeTruthy()
        expect(screen.getByText('Replace File')).toBeTruthy()
    })

    it('renders the +N overflow trigger beyond four files', () => {
        renderUpload({
            multiple: true,
            files: [
                file('one.pdf'),
                file('two.pdf'),
                file('three.pdf'),
                file('four.pdf'),
                file('five.pdf'),
            ],
        })
        expect(screen.getByText('+ 1')).toBeTruthy()
        // The overflowed file itself is behind the Popover trigger.
        expect(screen.queryByText('five.pdf')).toBeNull()
    })

    it('renders a ProgressBar while uploading', () => {
        renderUpload({ state: UploadState.UPLOADING, progressBarValue: 42 })
        expect(screen.getByText('Please wait while uploading')).toBeTruthy()
    })

    it('renders the aggregated single-file validation message', () => {
        renderUpload({
            multiple: false,
            maxSize: 1024,
            state: UploadState.ERROR,
            files: [
                file('huge.bin', {
                    size: 999999,
                    isValid: false,
                    errorReason: 'oversized',
                }),
            ],
        })
        expect(
            screen.getByText('File is too large. Max size is 1 KB')
        ).toBeTruthy()
    })
})

describe('Upload interaction', () => {
    it('pressing Browse fires onBrowse', () => {
        const onBrowse = jest.fn()
        renderUpload({ onBrowse })
        fireEvent.press(screen.getByTestId('upload-container-browse'))
        expect(onBrowse).toHaveBeenCalledTimes(1)
    })

    it('pressing the drop zone fires onBrowse', () => {
        const onBrowse = jest.fn()
        renderUpload({ onBrowse })
        fireEvent.press(screen.getByTestId('upload-container-dropzone'))
        expect(onBrowse).toHaveBeenCalledTimes(1)
    })

    it('removes a file through onChange when its tag is pressed', () => {
        const onChange = jest.fn()
        renderUpload({
            multiple: true,
            files: [
                file('keep.pdf', { id: 'keep' }),
                file('drop.pdf', { id: 'drop' }),
            ],
            onChange,
        })
        const tags = screen.getAllByTestId('upload-container-file-tag')
        fireEvent.press(tags[1])
        expect(onChange).toHaveBeenCalledTimes(1)
        const removed = onChange.mock.calls[0][0] as UploadFileNativeItem[]
        expect(removed.map((f) => f.name)).toEqual(['keep.pdf'])
    })

    it('blocks onBrowse when disabled', () => {
        const onBrowse = jest.fn()
        renderUpload({ disabled: true, onBrowse })
        fireEvent.press(screen.getByTestId('upload-container-dropzone'))
        expect(onBrowse).not.toHaveBeenCalled()
    })

    it('blocks onBrowse while uploading', () => {
        const onBrowse = jest.fn()
        renderUpload({ state: UploadState.UPLOADING, onBrowse })
        fireEvent.press(screen.getByTestId('upload-container-dropzone'))
        expect(onBrowse).not.toHaveBeenCalled()
    })
})

describe('Upload state styling', () => {
    it('invalid files flip the container border to the ERROR tokens', () => {
        renderUpload({
            files: [
                file('bad.exe', { isValid: false, errorReason: 'invalidType' }),
            ],
        })
        const errorBorder = parseBorder(
            String(tokens.uploadContainer.border[UploadState.ERROR])
        )
        // Guard: the assertion below is meaningless if these match.
        const idleBorder = parseBorder(
            String(tokens.uploadContainer.border[UploadState.IDLE])
        )
        expect(errorBorder.borderColor).not.toBe(idleBorder.borderColor)

        // The drop zone Pressable wraps a Block carrying the border tokens;
        // Block applies resolveSurfaceStyle output through its style prop.
        // Walk the rendered instances to the first styled View with a border.
        const styledView = (() => {
            type Inst = {
                props?: { style?: unknown }
                children?: Inst[] | Inst
            }
            const walk = (node: Inst | Inst[] | undefined): unknown => {
                if (!node) return undefined
                if (Array.isArray(node)) {
                    for (const child of node) {
                        const found = walk(child)
                        if (found) return found
                    }
                    return undefined
                }
                const style = flatten(node.props?.style)
                if (style.borderColor !== undefined) return style
                const kids = node.children
                if (Array.isArray(kids)) {
                    for (const child of kids) {
                        const found = walk(child)
                        if (found) return found
                    }
                } else if (kids) {
                    return walk(kids)
                }
                return undefined
            }
            const root = screen.getByTestId(
                'upload-container-dropzone'
            ) as unknown as Inst
            return walk(root.children)
        })()
        expect(styledView).toBeDefined()
        expect((styledView as Record<string, unknown>).borderColor).toBe(
            errorBorder.borderColor
        )
        expect((styledView as Record<string, unknown>).borderStyle).toBe(
            'dashed'
        )
    })

    it('blocks interaction when the state is DISABLED', () => {
        renderUpload({ state: UploadState.DISABLED })
        expect(
            screen.getByTestId('upload-container-dropzone').props
                .accessibilityState
        ).toMatchObject({ disabled: true })
    })
})
