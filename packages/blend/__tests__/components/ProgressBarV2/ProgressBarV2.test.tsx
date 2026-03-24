import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import {
    ProgressBarV2,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../../lib/components/ProgressBarV2'
import {
    calculatePercentage,
    clampValue,
    calculateCircularProgressStroke,
    parseCircularDashToken,
} from '../../../lib/components/ProgressBarV2/utils'

describe('ProgressBarV2', () => {
    describe('Rendering', () => {
        it('renders linear progressbar by default', () => {
            const { container } = render(<ProgressBarV2 value={40} />)
            expect(
                container.querySelector('[data-progressbar="progressbar"]')
            ).toBeInTheDocument()
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })

        it('renders circular variant with svg', () => {
            const { container } = render(
                <ProgressBarV2
                    value={40}
                    variant={ProgressBarV2Variant.CIRCULAR}
                />
            )
            expect(container.querySelector('svg')).toBeInTheDocument()
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })
    })

    describe('ARIA & value', () => {
        it('sets aria-valuenow, valuemin, valuemax from props', () => {
            render(
                <ProgressBarV2
                    value={35}
                    min={0}
                    max={100}
                    aria-label="Upload"
                />
            )
            const bar = screen.getByRole('progressbar')
            expect(bar).toHaveAttribute('aria-valuenow', '35')
            expect(bar).toHaveAttribute('aria-valuemin', '0')
            expect(bar).toHaveAttribute('aria-valuemax', '100')
            expect(bar).toHaveAttribute('aria-label', 'Upload')
        })

        it('uses default aria-label when none provided', () => {
            render(<ProgressBarV2 value={62} />)
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-label',
                'Progress: 62%'
            )
        })

        it('uses aria-labelledby when provided', () => {
            render(
                <div>
                    <span id="cap">Caption</span>
                    <ProgressBarV2 value={10} aria-labelledby="cap" />
                </div>
            )
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-labelledby',
                'cap'
            )
        })

        it('clamps value for aria-valuenow when above max', () => {
            render(<ProgressBarV2 value={150} min={0} max={100} />)
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '100'
            )
        })

        it('clamps value for aria-valuenow when below min', () => {
            render(<ProgressBarV2 value={-20} min={0} max={100} />)
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '0'
            )
        })
    })

    describe('Label', () => {
        it('shows percentage label when showLabel is true', () => {
            render(<ProgressBarV2 value={44} showLabel />)
            expect(screen.getByText('44%')).toBeInTheDocument()
        })

        it('does not show percentage label when showLabel is false', () => {
            render(<ProgressBarV2 value={44} showLabel={false} />)
            expect(screen.queryByText('44%')).not.toBeInTheDocument()
        })

        it('rounds label for custom range', () => {
            render(<ProgressBarV2 value={125} min={0} max={500} showLabel />)
            expect(screen.getByText('25%')).toBeInTheDocument()
        })
    })

    describe('Variants & appearance', () => {
        it('renders linear segmented without svg', () => {
            const { container } = render(
                <ProgressBarV2
                    value={30}
                    appearance={ProgressBarV2Appearance.SEGMENTED}
                />
            )
            expect(container.querySelector('svg')).toBeNull()
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })

        it('renders circular segmented with dashed track on background circle', () => {
            const { container } = render(
                <ProgressBarV2
                    value={40}
                    variant={ProgressBarV2Variant.CIRCULAR}
                    appearance={ProgressBarV2Appearance.SEGMENTED}
                />
            )
            const circles = container.querySelectorAll('circle')
            expect(circles.length).toBeGreaterThanOrEqual(2)
            const bg = circles[0]
            expect(bg.getAttribute('stroke-dasharray')).toBeTruthy()
        })

        it('accepts size prop without throwing', () => {
            render(<ProgressBarV2 value={50} size={ProgressBarV2Size.SM} />)
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })
    })

    describe('ref', () => {
        it('forwards ref to progressbar root element', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<ProgressBarV2 ref={ref} value={20} />)
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current?.getAttribute('role')).toBe('progressbar')
        })
    })
})

describe('ProgressBarV2 utils', () => {
    it('clampValue bounds value', () => {
        expect(clampValue(5, 0, 10)).toBe(5)
        expect(clampValue(-1, 0, 10)).toBe(0)
        expect(clampValue(99, 0, 10)).toBe(10)
    })

    it('calculatePercentage respects range', () => {
        expect(calculatePercentage(50, 0, 100)).toBe(50)
        expect(calculatePercentage(25, 0, 200)).toBe(12.5)
        expect(calculatePercentage(150, 0, 100)).toBe(100)
    })

    it('parseCircularDashToken parses token string', () => {
        expect(parseCircularDashToken('4 2')).toEqual([4, 2])
        expect(parseCircularDashToken('8, 4')).toEqual([8, 4])
    })

    it('parseCircularDashToken uses fallbacks', () => {
        expect(parseCircularDashToken(undefined)).toEqual([8, 4])
        expect(parseCircularDashToken('')).toEqual([8, 4])
    })

    it('calculateCircularProgressStroke scales offset by percentage', () => {
        const c = 100
        const { strokeDasharray, strokeDashoffset } =
            calculateCircularProgressStroke(c, 40)
        expect(strokeDasharray).toBe('100')
        expect(strokeDashoffset).toBe(60)
    })
})
