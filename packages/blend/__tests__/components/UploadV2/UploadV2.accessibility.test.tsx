import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
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

const getFileInput = () =>
    document.querySelector('input[type="file"]') as HTMLInputElement

describe('UploadV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default upload (axe-core validation)', async () => {
            const { container } = render(
                <UploadV2 label="Upload File" onChange={() => {}} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for disabled state', async () => {
            const { container } = render(
                <UploadV2 label="Upload File" disabled onChange={() => {}} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for error state', async () => {
            const files: UploadFileV2[] = [
                {
                    file: createMockFile('invalid.csv'),
                    isValid: false,
                    errorReason: UploadErrorReason.OVERSIZED,
                },
            ]
            const { container } = render(
                <UploadV2
                    label="Upload File"
                    state={UploadState.ERROR}
                    multiple={false}
                    files={files}
                    maxSize={8 * 1024 * 1024}
                    onChange={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for success state', async () => {
            const files: UploadFileV2[] = [
                { file: createMockFile('done.csv'), isValid: true },
            ]
            const { container } = render(
                <UploadV2
                    label="Upload File"
                    state={UploadState.SUCCESS}
                    files={files}
                    onChange={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('renders visible label and description', () => {
            render(
                <UploadV2
                    label="Upload File"
                    description="CSV only, up to 8 MB"
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Upload File')).toBeInTheDocument()
            expect(screen.getByText('CSV only, up to 8 MB')).toBeInTheDocument()
        })

        it('sets required semantics on file input', () => {
            render(
                <UploadV2 label="Upload File" required onChange={() => {}} />
            )
            const input = getFileInput()
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('sets aria-invalid true for error state', () => {
            const files: UploadFileV2[] = [
                {
                    file: createMockFile('invalid.csv'),
                    isValid: false,
                    errorReason: UploadErrorReason.MAX_FILES,
                },
            ]
            render(
                <UploadV2
                    label="Upload File"
                    state={UploadState.ERROR}
                    files={files}
                    onChange={() => {}}
                />
            )
            expect(getFileInput()).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('browse button is keyboard focusable', () => {
            render(<UploadV2 label="Upload File" onChange={() => {}} />)
            const browseButton = screen.getByRole('button', {
                name: /browse files/i,
            })
            act(() => {
                browseButton.focus()
            })
            expect(document.activeElement).toBe(browseButton)
        })
    })
})
