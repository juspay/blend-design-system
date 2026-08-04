import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import {
    ProgressBarV2,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../../lib/components/ProgressBarV2'

describe('ProgressBarV2 Accessibility', () => {
    describe('WCAG 2.0, 2.1, 2.2 (axe-core)', () => {
        it('linear solid passes axe', async () => {
            const { container } = render(
                <ProgressBarV2 value={50} aria-label="Upload progress" />
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
    })

    describe('Role & ARIA value', () => {
        it('exposes role progressbar with aria-label', () => {
            render(<ProgressBarV2 value={50} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar', { name: 'Progress' })
            ).toBeInTheDocument()
        })

        it('sets aria-valuenow, valuemin, valuemax', () => {
            render(
                <ProgressBarV2
                    value={65}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            const el = screen.getByRole('progressbar', { name: 'Progress' })
            expect(el).toHaveAttribute('aria-valuenow', '65')
            expect(el).toHaveAttribute('aria-valuemin', '0')
            expect(el).toHaveAttribute('aria-valuemax', '100')
        })

        it('respects custom min and max', () => {
            render(
                <ProgressBarV2
                    value={50}
                    min={0}
                    max={200}
                    aria-label="Progress"
                />
            )
            const el = screen.getByRole('progressbar', { name: 'Progress' })
            expect(el).toHaveAttribute('aria-valuemax', '200')
            expect(el).toHaveAttribute('aria-valuenow', '50')
        })

        it('clamps aria-valuenow to max', () => {
            render(
                <ProgressBarV2
                    value={150}
                    min={0}
                    max={100}
                    aria-label="Progress"
                />
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '100'
            )
        })

        it('sets aria-labelledby when provided', () => {
            render(
                <div>
                    <div id="progress-label">Upload Status</div>
                    <ProgressBarV2
                        value={50}
                        aria-labelledby="progress-label"
                    />
                </div>
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-labelledby',
                'progress-label'
            )
        })

        it('generates default aria-label when none provided', () => {
            render(<ProgressBarV2 value={75} />)
            const el = screen.getByRole('progressbar')
            const label = el.getAttribute('aria-label')
            expect(label).toContain('Progress:')
            expect(label).toContain('%')
        })
    })

    describe('Variants & sizes', () => {
        it('linear appearances keep required ARIA', () => {
            ;[
                ProgressBarV2Appearance.SOLID,
                ProgressBarV2Appearance.SEGMENTED,
            ].forEach((appearance) => {
                const { unmount } = render(
                    <ProgressBarV2
                        value={60}
                        appearance={appearance}
                        aria-label={`${appearance} progress`}
                    />
                )
                const el = screen.getByRole('progressbar', {
                    name: `${appearance} progress`,
                })
                expect(el).toHaveAttribute('aria-valuenow', '60')
                unmount()
            })
        })

        it('circular appearances keep required ARIA', () => {
            ;[
                ProgressBarV2Appearance.SOLID,
                ProgressBarV2Appearance.SEGMENTED,
            ].forEach((appearance) => {
                const { unmount } = render(
                    <ProgressBarV2
                        value={40}
                        variant={ProgressBarV2Variant.CIRCULAR}
                        appearance={appearance}
                        aria-label={`${appearance} circular`}
                    />
                )
                const el = screen.getByRole('progressbar', {
                    name: `${appearance} circular`,
                })
                expect(el).toHaveAttribute('aria-valuenow', '40')
                unmount()
            })
        })

        it('all sizes expose progressbar', () => {
            ;[
                ProgressBarV2Size.SM,
                ProgressBarV2Size.MD,
                ProgressBarV2Size.LG,
            ].forEach((size) => {
                const { unmount } = render(
                    <ProgressBarV2
                        value={55}
                        size={size}
                        aria-label={`${size} progress`}
                    />
                )
                expect(
                    screen.getByRole('progressbar', {
                        name: `${size} progress`,
                    })
                ).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('WCAG 1.3.1 & 4.1.2', () => {
        it('associates name via aria-label', () => {
            render(
                <ProgressBarV2 value={50} aria-label="File upload progress" />
            )
            expect(
                screen.getByRole('progressbar', {
                    name: 'File upload progress',
                })
            ).toBeInTheDocument()
        })

        it('associates name via aria-labelledby', () => {
            render(
                <div>
                    <span id="upload-label">Upload Progress</span>
                    <ProgressBarV2 value={50} aria-labelledby="upload-label" />
                </div>
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-labelledby',
                'upload-label'
            )
        })
    })

    describe('Decorative content', () => {
        it('marks circular svg as aria-hidden', () => {
            render(
                <ProgressBarV2
                    value={50}
                    variant={ProgressBarV2Variant.CIRCULAR}
                    aria-label="Progress"
                />
            )
            expect(document.querySelector('svg')).toHaveAttribute(
                'aria-hidden',
                'true'
            )
        })

        it('hides visible percentage from AT when showLabel is true', () => {
            render(<ProgressBarV2 value={50} showLabel aria-label="Progress" />)
            const progressBar = screen.getByRole('progressbar')
            expect(
                progressBar.querySelector(
                    '[data-element="progress-bar-value-now"]'
                )
            ).toBeInTheDocument()
            expect(
                progressBar.querySelector('[aria-hidden="true"]')
            ).toBeInTheDocument()
        })
    })

    describe('Edge cases', () => {
        it('value at minimum', () => {
            render(<ProgressBarV2 value={0} min={0} max={100} aria-label="P" />)
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '0'
            )
        })

        it('value at maximum', () => {
            render(
                <ProgressBarV2 value={100} min={0} max={100} aria-label="P" />
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '100'
            )
        })

        it('clamps below min', () => {
            render(
                <ProgressBarV2 value={-10} min={0} max={100} aria-label="P" />
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '0'
            )
        })

        it('custom min/max range', () => {
            render(
                <ProgressBarV2 value={50} min={20} max={80} aria-label="P" />
            )
            const el = screen.getByRole('progressbar')
            expect(el).toHaveAttribute('aria-valuemin', '20')
            expect(el).toHaveAttribute('aria-valuemax', '80')
            expect(el).toHaveAttribute('aria-valuenow', '50')
        })
    })
})
