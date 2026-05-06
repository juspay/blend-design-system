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
    })
})
