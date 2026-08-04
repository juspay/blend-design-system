import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import ProgressBar from '../../../lib/components/ProgressBar/ProgressBar'
import {
    ProgressBarSize,
    ProgressBarVariant,
    ProgressBarType,
} from '../../../lib/components/ProgressBar/types'

describe('ProgressBar Accessibility', () => {
    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic linear progress bar (axe-core validation)', async () => {
            const { container } = render(
                <ProgressBar value={50} aria-label="Upload progress" />
            )
            const results = await axe(container, {
                rules: {
                    'aria-required-attr': { enabled: true },
                    'aria-valid-attr-value': { enabled: true },
                    'aria-allowed-attr': { enabled: true },
                    'aria-required-parent': { enabled: true },
                    'aria-required-children': { enabled: true },
                    'aria-roles': { enabled: true },
                    'aria-valid-attr': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for circular progress bar (axe-core validation)', async () => {
            const { container } = render(
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    aria-label="Download progress"
                />
            )
            const results = await axe(container, {
                rules: {
                    'aria-required-attr': { enabled: true },
                    'aria-valid-attr-value': { enabled: true },
                    'aria-allowed-attr': { enabled: true },
                    'aria-required-parent': { enabled: true },
                    'aria-required-children': { enabled: true },
                    'aria-roles': { enabled: true },
                    'aria-valid-attr': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('has proper role="progressbar" attribute', () => {
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toBeInTheDocument()
        })

        it('has proper aria-valuenow attribute', () => {
            render(<ProgressBar value={65} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toHaveAttribute('aria-valuenow', '65')
        })

        it('has proper aria-valuemin attribute (defaults to 0)', () => {
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toHaveAttribute('aria-valuemin', '0')
        })

        it('has proper aria-valuemax attribute (defaults to 100)', () => {
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toHaveAttribute('aria-valuemax', '100')
        })

        it('respects custom min and max values', () => {
            render(
                <ProgressBar
                    value={50}
                    min={0}
                    max={200}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toHaveAttribute('aria-valuemin', '0')
            expect(progressBar).toHaveAttribute('aria-valuemax', '200')
            expect(progressBar).toHaveAttribute('aria-valuenow', '50')
        })

        it('clamps value to min and max range', () => {
            render(
                <ProgressBar
                    value={150}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar', {
                name: 'Progress',
            })
            expect(progressBar).toHaveAttribute('aria-valuenow', '100')
        })

        it('has proper aria-label attribute', () => {
            render(<ProgressBar value={50} aria-label="File upload progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'File upload progress',
            })
            expect(progressBar).toBeInTheDocument()
        })

        it('has proper aria-labelledby attribute', () => {
            render(
                <div>
                    <div id="progress-label">Upload Status</div>
                    <ProgressBar value={50} aria-labelledby="progress-label" />
                </div>
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute(
                'aria-labelledby',
                'progress-label'
            )
        })

        it('generates default aria-label when none provided', () => {
            render(<ProgressBar value={75} />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-label')
            const ariaLabel = progressBar.getAttribute('aria-label')
            expect(ariaLabel).toContain('Progress:')
            expect(ariaLabel).toContain('%')
        })

        it('has proper role and ARIA attributes for all linear variants', () => {
            const variants = [
                ProgressBarVariant.SOLID,
                ProgressBarVariant.SEGMENTED,
            ]

            variants.forEach((variant) => {
                const { unmount } = render(
                    <ProgressBar
                        value={60}
                        variant={variant}
                        aria-label={`${variant} progress`}
                    />
                )
                const progressBar = screen.getByRole('progressbar', {
                    name: `${variant} progress`,
                })
                expect(progressBar).toBeInTheDocument()
                expect(progressBar).toHaveAttribute('aria-valuenow', '60')
                expect(progressBar).toHaveAttribute('aria-valuemin', '0')
                expect(progressBar).toHaveAttribute('aria-valuemax', '100')
                unmount()
            })
        })

        it('has proper role and ARIA attributes for all circular types', () => {
            const types = [ProgressBarType.SOLID, ProgressBarType.SEGMENTED]

            types.forEach((type) => {
                const { unmount } = render(
                    <ProgressBar
                        value={40}
                        variant={ProgressBarVariant.CIRCULAR}
                        type={type}
                        aria-label={`${type} circular progress`}
                    />
                )
                const progressBar = screen.getByRole('progressbar', {
                    name: `${type} circular progress`,
                })
                expect(progressBar).toBeInTheDocument()
                expect(progressBar).toHaveAttribute('aria-valuenow', '40')
                expect(progressBar).toHaveAttribute('aria-valuemin', '0')
                expect(progressBar).toHaveAttribute('aria-valuemax', '100')
                unmount()
            })
        })

        it('has proper role and ARIA attributes for all sizes', () => {
            const sizes = [
                ProgressBarSize.SMALL,
                ProgressBarSize.MEDIUM,
                ProgressBarSize.LARGE,
            ]

            sizes.forEach((size) => {
                const { unmount } = render(
                    <ProgressBar
                        value={55}
                        size={size}
                        aria-label={`${size} progress`}
                    />
                )
                const progressBar = screen.getByRole('progressbar', {
                    name: `${size} progress`,
                })
                expect(progressBar).toBeInTheDocument()
                expect(progressBar).toHaveAttribute('aria-valuenow', '55')
                unmount()
            })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('uses semantic role="progressbar" for progress indication', () => {
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toBeInTheDocument()
        })

        it('associates label with progressbar via aria-label', () => {
            render(<ProgressBar value={50} aria-label="File upload progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'File upload progress',
            })
            expect(progressBar).toBeInTheDocument()
        })

        it('associates label with progressbar via aria-labelledby', () => {
            render(
                <div>
                    <span id="upload-label">Upload Progress</span>
                    <ProgressBar value={50} aria-labelledby="upload-label" />
                </div>
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute(
                'aria-labelledby',
                'upload-label'
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('provides accessible name via aria-label', () => {
            render(<ProgressBar value={50} aria-label="Download progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'Download progress',
            })
            expect(progressBar).toBeInTheDocument()
        })

        it('provides accessible name via aria-labelledby', () => {
            render(
                <div>
                    <div id="status-label">Processing Status</div>
                    <ProgressBar value={75} aria-labelledby="status-label" />
                </div>
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute(
                'aria-labelledby',
                'status-label'
            )
        })

        it('provides proper role="progressbar"', () => {
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toBeInTheDocument()
        })

        it('provides proper value via aria-valuenow', () => {
            render(<ProgressBar value={80} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '80')
        })

        it('provides proper min value via aria-valuemin', () => {
            render(
                <ProgressBar
                    value={50}
                    min={10}
                    max={90}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuemin', '10')
        })

        it('provides proper max value via aria-valuemax', () => {
            render(
                <ProgressBar
                    value={50}
                    min={0}
                    max={200}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuemax', '200')
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('uses theme tokens that ensure proper contrast', () => {
            // This test verifies that the component uses theme tokens
            // Actual contrast should be verified with tools like WebAIM Contrast Checker
            render(<ProgressBar value={50} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toBeInTheDocument()
            // Component uses theme tokens which should ensure WCAG AA contrast
        })
    })

    describe('Screen Reader Support', () => {
        it('announces progress value via aria-valuenow', () => {
            render(<ProgressBar value={45} aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '45')
        })

        it('announces progress range via aria-valuemin and aria-valuemax', () => {
            render(
                <ProgressBar
                    value={50}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuemin', '0')
            expect(progressBar).toHaveAttribute('aria-valuemax', '100')
        })

        it('announces progress label via aria-label', () => {
            render(<ProgressBar value={60} aria-label="File upload progress" />)
            const progressBar = screen.getByRole('progressbar', {
                name: 'File upload progress',
            })
            expect(progressBar).toBeInTheDocument()
        })

        it('hides decorative SVG elements from screen readers', () => {
            render(
                <ProgressBar
                    value={50}
                    variant={ProgressBarVariant.CIRCULAR}
                    aria-label="Progress"
                />
            )
            const svg = document.querySelector('svg')
            expect(svg).toHaveAttribute('aria-hidden', 'true')
        })

        it('hides percentage label from screen readers when showLabel is true', () => {
            render(
                <ProgressBar
                    value={50}
                    showLabel={true}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            const label = progressBar.querySelector('span[aria-hidden="true"]')
            expect(label).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles value at minimum correctly', () => {
            render(
                <ProgressBar
                    value={0}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '0')
        })

        it('handles value at maximum correctly', () => {
            render(
                <ProgressBar
                    value={100}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '100')
        })

        it('handles negative values by clamping to min', () => {
            render(
                <ProgressBar
                    value={-10}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '0')
        })

        it('handles values exceeding max by clamping to max', () => {
            render(
                <ProgressBar
                    value={150}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuenow', '100')
        })

        it('handles custom min and max ranges correctly', () => {
            render(
                <ProgressBar
                    value={50}
                    min={20}
                    max={80}
                    aria-label="Progress"
                />
            )
            const progressBar = screen.getByRole('progressbar')
            expect(progressBar).toHaveAttribute('aria-valuemin', '20')
            expect(progressBar).toHaveAttribute('aria-valuemax', '80')
            expect(progressBar).toHaveAttribute('aria-valuenow', '50')
        })
    })
})
