import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '../../test-utils'
import UploadV2 from '../../../lib/components/InputsV2/UploadV2/UploadV2'
import {
    UploadErrorReason,
    UploadFileV2,
    UploadState,
} from '../../../lib/components/InputsV2/UploadV2/UploadV2.types'

const createMockFile = (
    name: string,
    size: number = 1024,
    type: string = 'text/csv'
) => {
    const file = new File(['test-content'], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
}

describe('UploadV2 Component', () => {
    const getFileInput = () =>
        document.querySelector('input[type="file"]') as HTMLInputElement

    describe('Rendering', () => {
        it('renders with label and description', () => {
            render(
                <UploadV2
                    label="Upload Files"
                    description=".csv only | Max size 8 MB"
                    onChange={() => {}}
                />
            )

            expect(screen.getByText('Upload Files')).toBeInTheDocument()
            expect(
                screen.getByText('.csv only | Max size 8 MB')
            ).toBeInTheDocument()
            expect(
                screen.getByText('Choose a file or drag & drop it here')
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /browse files/i })
            ).toBeInTheDocument()
        })

        it('sets required aria attributes', () => {
            render(
                <UploadV2
                    label="Required Upload"
                    required
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('associates the label with the real file input id', () => {
            render(
                <UploadV2
                    id="invoice-upload"
                    label="Upload invoice"
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            expect(screen.getByText('Upload invoice')).toHaveAttribute(
                'for',
                input.id
            )
        })

        it('renders disabled input when disabled', () => {
            render(
                <UploadV2
                    label="Disabled Upload"
                    disabled
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            expect(input).toBeDisabled()
        })

        it('renders disabled input when state is disabled', () => {
            render(
                <UploadV2
                    label="Disabled Upload"
                    state={UploadState.DISABLED}
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            expect(input).toBeDisabled()
        })

        it('renders uploaded copy and counts for multiple selected files', () => {
            const files: UploadFileV2[] = [
                {
                    id: 'valid-file',
                    file: createMockFile('valid.csv'),
                    isValid: true,
                },
                {
                    id: 'invalid-file',
                    file: createMockFile('invalid.csv'),
                    isValid: false,
                    errorReason: UploadErrorReason.INVALID_TYPE,
                },
            ]

            render(
                <UploadV2
                    label="Upload Files"
                    multiple
                    files={files}
                    onChange={() => {}}
                />
            )

            expect(screen.getByText('Files uploaded')).toBeInTheDocument()
            expect(
                screen.getByText('1 succeeded, 1 failed')
            ).toBeInTheDocument()
            expect(
                screen.queryByText('Choose a file or drag & drop it here')
            ).not.toBeInTheDocument()
        })

        it('derives error state from invalid files', () => {
            const files: UploadFileV2[] = [
                {
                    id: 'invalid-file',
                    file: createMockFile('invalid.csv'),
                    isValid: false,
                    errorReason: UploadErrorReason.INVALID_TYPE,
                },
            ]

            render(
                <UploadV2
                    label="Upload Files"
                    multiple
                    files={files}
                    onChange={() => {}}
                />
            )

            expect(getFileInput()).toHaveAttribute('aria-invalid', 'true')
            expect(screen.getByText('Files uploaded')).toBeInTheDocument()
            expect(
                screen.getByText('0 succeeded, 1 failed')
            ).toBeInTheDocument()
        })
    })

    describe('File selection', () => {
        it('calls onChange with validated files on file input change', () => {
            const handleChange = vi.fn()
            const file = createMockFile('invoice.csv')

            render(<UploadV2 label="Upload Files" onChange={handleChange} />)

            const input = getFileInput()
            fireEvent.change(input, { target: { files: [file] } })

            expect(handleChange).toHaveBeenCalledTimes(1)
            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles).toHaveLength(1)
            expect(nextFiles[0].file.name).toBe('invoice.csv')
            expect(nextFiles[0].isValid).toBe(true)
        })

        it('marks file invalid when maxSize is exceeded', () => {
            const handleChange = vi.fn()
            const oversizedFile = createMockFile('large.csv', 10 * 1024 * 1024)

            render(
                <UploadV2
                    label="Upload Files"
                    maxSize={8 * 1024 * 1024}
                    onChange={handleChange}
                />
            )

            const input = getFileInput()
            fireEvent.change(input, { target: { files: [oversizedFile] } })

            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles[0].isValid).toBe(false)
            expect(nextFiles[0].errorReason).toBe(UploadErrorReason.OVERSIZED)
        })

        it('marks file invalid when acceptedFileTypes does not match', () => {
            const handleChange = vi.fn()
            const imageFile = createMockFile('avatar.png', 1024, 'image/png')

            render(
                <UploadV2
                    label="Upload Files"
                    acceptedFileTypes={['.csv', 'text/csv']}
                    onChange={handleChange}
                />
            )

            const input = getFileInput()
            fireEvent.change(input, { target: { files: [imageFile] } })

            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles[0].isValid).toBe(false)
            expect(nextFiles[0].errorReason).toBe(
                UploadErrorReason.INVALID_TYPE
            )
        })

        it('accepts wildcard MIME types', () => {
            const handleChange = vi.fn()
            const imageFile = createMockFile('avatar.png', 1024, 'image/png')

            render(
                <UploadV2
                    label="Upload Files"
                    acceptedFileTypes={['image/*']}
                    onChange={handleChange}
                />
            )

            const input = getFileInput()
            fireEvent.change(input, { target: { files: [imageFile] } })

            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles[0].isValid).toBe(true)
        })

        it('treats single-file selection as replacement when a file already exists', () => {
            const handleChange = vi.fn()
            const existingFile = createMockFile('old.csv')
            const replacementFile = createMockFile('new.csv')

            render(
                <UploadV2
                    label="Upload Files"
                    multiple={false}
                    files={[{ file: existingFile, isValid: true }]}
                    onChange={handleChange}
                />
            )

            const input = getFileInput()
            fireEvent.change(input, { target: { files: [replacementFile] } })

            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles).toHaveLength(1)
            expect(nextFiles[0].file.name).toBe('new.csv')
            expect(nextFiles[0].isValid).toBe(true)
        })
    })

    describe('Remove behavior', () => {
        it('removes only one file when duplicate names exist', async () => {
            const handleChange = vi.fn()
            const duplicateA = createMockFile('duplicate.csv')
            const duplicateB = createMockFile('duplicate.csv')

            const files: UploadFileV2[] = [
                { id: 'file-1', file: duplicateA, isValid: true },
                { id: 'file-2', file: duplicateB, isValid: true },
            ]

            const { user } = render(
                <UploadV2
                    label="Upload Files"
                    multiple
                    files={files}
                    onChange={handleChange}
                />
            )

            const fileTags = screen.getAllByText('duplicate.csv')
            await user.click(fileTags[0])

            expect(handleChange).toHaveBeenCalledTimes(1)
            const nextFiles = handleChange.mock.calls[0][0] as UploadFileV2[]
            expect(nextFiles).toHaveLength(1)
            expect(nextFiles[0].id).toBe('file-2')
        })

        it('moves extra files into an overflow popover in multiple mode', async () => {
            const files: UploadFileV2[] = Array.from(
                { length: 5 },
                (_, index) => ({
                    id: `file-${index + 1}`,
                    file: createMockFile(`file-${index + 1}.csv`),
                    isValid: true,
                })
            )

            const { user } = render(
                <UploadV2
                    label="Upload Files"
                    multiple
                    files={files}
                    onChange={() => {}}
                />
            )

            expect(screen.getByText('file-1.csv')).toBeInTheDocument()
            expect(screen.getByText('file-4.csv')).toBeInTheDocument()
            expect(screen.queryByText('file-5.csv')).not.toBeInTheDocument()
            expect(screen.getByText('+ 1')).toBeInTheDocument()

            await user.click(
                screen.getByRole('button', { name: 'Show 1 more files' })
            )

            expect(await screen.findAllByText('file-5.csv')).not.toHaveLength(0)
        })
    })

    describe('Error messaging', () => {
        it('shows maxSize in error text for single-file error state', () => {
            const files: UploadFileV2[] = [
                {
                    file: createMockFile('oversized.csv', 10 * 1024 * 1024),
                    isValid: false,
                    errorReason: UploadErrorReason.OVERSIZED,
                },
            ]

            render(
                <UploadV2
                    label="Upload Files"
                    multiple={false}
                    state={UploadState.ERROR}
                    files={files}
                    maxSize={8 * 1024 * 1024}
                    onChange={() => {}}
                />
            )

            expect(
                screen.getByText('File is too large. Max size is 8 MB')
            ).toBeInTheDocument()
        })

        it('supports V2 error footer props', () => {
            render(
                <UploadV2
                    id="footer-error-upload"
                    label="Upload Files"
                    error={{ show: true, message: 'Upload is required' }}
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            const errorMessage = screen.getByText('Upload is required')
            expect(errorMessage).toHaveAttribute(
                'id',
                'footer-error-upload-error'
            )
            expect(input).toHaveAttribute(
                'aria-describedby',
                'footer-error-upload-error'
            )
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })

        it('supports V2 hintText footer props', () => {
            render(
                <UploadV2
                    id="hint-upload"
                    label="Upload Files"
                    hintText="CSV files only"
                    onChange={() => {}}
                />
            )

            const input = getFileInput()
            expect(screen.getByText('CSV files only')).toHaveAttribute(
                'id',
                'hint-upload-hint'
            )
            expect(input).toHaveAttribute(
                'aria-describedby',
                'hint-upload-hint'
            )
        })
    })
})
