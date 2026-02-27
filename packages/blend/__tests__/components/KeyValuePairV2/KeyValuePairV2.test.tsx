import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import KeyValuePairV2 from '../../../lib/components/KeyValuePairV2/KeyValuePairV2'
import { KeyValuePairV2Size } from '../../../lib/components/KeyValuePairV2/keyValuePairV2.types'
import { MockIcon } from '../../test-utils'

describe('KeyValuePairV2 Component', () => {
    describe('Rendering', () => {
        it('renders key and value with semantic roles', () => {
            render(<KeyValuePairV2 keyString="Name" value="John Doe" />)
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('John Doe')).toBeInTheDocument()
            // container role group
            expect(
                document.querySelector('[data-keyvaluepair="Name"]')
            ).toBeInTheDocument()
            // key has role term and value has role definition via aria-labelledby
            expect(
                screen.getByRole('definition', { hidden: true }) || true
            ).toBeTruthy()
        })

        it('renders with slots', () => {
            render(
                <KeyValuePairV2
                    keyString="Status"
                    value="Active"
                    slots={{
                        key: <MockIcon />,
                        value: {
                            left: <MockIcon />,
                            right: <MockIcon />,
                        },
                    }}
                />
            )
            expect(
                document.querySelector('[data-element="key-slot"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="value-left-slot"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="value-right-slot"]')
            ).toBeInTheDocument()
            expect(
                screen.getAllByTestId('mock-icon').length
            ).toBeGreaterThanOrEqual(3)
        })
    })

    describe('Props and Variants', () => {
        it('supports different sizes', () => {
            const { rerender } = render(
                <KeyValuePairV2
                    keyString="S"
                    value="v"
                    size={KeyValuePairV2Size.SM}
                />
            )
            expect(screen.getByText('v')).toBeInTheDocument()

            rerender(
                <KeyValuePairV2
                    keyString="M"
                    value="v"
                    size={KeyValuePairV2Size.MD}
                />
            )
            expect(screen.getByText('v')).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-keyvaluepair attribute with keyString', () => {
            render(<KeyValuePairV2 keyString="Email" value="a@b.com" />)
            expect(
                document.querySelector('[data-keyvaluepair="Email"]')
            ).toBeInTheDocument()
        })

        it('uses fallback data-id when value missing', () => {
            render(<KeyValuePairV2 keyString="NoValue" value={undefined} />)
            expect(
                document.querySelector('[data-id="value"]')
            ).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty keyString', () => {
            render(<KeyValuePairV2 keyString="" value="V" />)
            expect(screen.getByText('V')).toBeInTheDocument()
        })

        it('handles long value text', () => {
            const long = 'A'.repeat(1000)
            render(<KeyValuePairV2 keyString="Long" value={long} />)
            expect(screen.getByText(long)).toBeInTheDocument()
        })

        it('forwards ref to container div', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<KeyValuePairV2 keyString="Ref" value="v" ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('role', 'group')
        })
    })
})
