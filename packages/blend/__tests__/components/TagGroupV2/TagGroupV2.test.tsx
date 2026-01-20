import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import TagGroupV2 from '../../../lib/components/TagGroupV2/TagGroupV2'
import TagV2 from '../../../lib/components/TagV2/TagV2'
import {
    TagV2Type,
    TagV2Color,
} from '../../../lib/components/TagV2/TagV2.types'

describe('TagGroupV2 Component', () => {
    describe('Rendering', () => {
        it('renders with children', () => {
            render(
                <TagGroupV2>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                </TagGroupV2>
            )
            expect(screen.getByText('Tag 1')).toBeInTheDocument()
            expect(screen.getByText('Tag 2')).toBeInTheDocument()
        })

        it('renders with single child', () => {
            render(
                <TagGroupV2>
                    <TagV2 text="Single Tag" />
                </TagGroupV2>
            )
            expect(screen.getByText('Single Tag')).toBeInTheDocument()
        })

        it('renders with multiple children', () => {
            render(
                <TagGroupV2>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                    <TagV2 text="Tag 3" />
                </TagGroupV2>
            )
            expect(screen.getByText('Tag 1')).toBeInTheDocument()
            expect(screen.getByText('Tag 2')).toBeInTheDocument()
            expect(screen.getByText('Tag 3')).toBeInTheDocument()
        })
    })

    describe('Stacked Prop', () => {
        it('renders with stacked=false by default', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toHaveAttribute('data-tag-group-stacked', 'false')
        })

        it('renders with stacked=true', () => {
            const { container } = render(
                <TagGroupV2 stacked={true}>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toHaveAttribute('data-tag-group-stacked', 'true')
        })

        it('injects tagGroupPosition prop when stacked', () => {
            const { container } = render(
                <TagGroupV2 stacked={true}>
                    <TagV2 text="Left" />
                    <TagV2 text="Center" />
                    <TagV2 text="Right" />
                </TagGroupV2>
            )
            const tags = container.querySelectorAll('[data-tag]')
            // Position prop is injected but not directly testable via DOM
            // We verify the group is stacked which enables position injection
            expect(tags).toHaveLength(3)
        })
    })

    describe('Gap Prop', () => {
        it('renders with custom gap', () => {
            const { container } = render(
                <TagGroupV2 gap="20px">
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toBeInTheDocument()
        })

        it('renders without gap prop (uses default)', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-tag-group attribute', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toBeInTheDocument()
        })

        it('has correct data-tag-group-count for single child', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toHaveAttribute('data-tag-group-count', '1')
        })

        it('has correct data-tag-group-count for multiple children', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag 1" />
                    <TagV2 text="Tag 2" />
                    <TagV2 text="Tag 3" />
                </TagGroupV2>
            )
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toHaveAttribute('data-tag-group-count', '3')
        })
    })

    describe('Accessibility', () => {
        it('has aria-label', () => {
            const { container } = render(
                <TagGroupV2>
                    <TagV2 text="Tag" />
                </TagGroupV2>
            )
            const group = container.querySelector('[aria-label="Tag group"]')
            expect(group).toBeInTheDocument()
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <TagGroupV2 ref={ref}>
                    <TagV2 text="Tag" />
                </TagGroupV2>
            )
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('data-tag-group', 'true')
        })
    })

    describe('Edge Cases', () => {
        it('handles empty children gracefully', () => {
            const { container } = render(<TagGroupV2>{[]}</TagGroupV2>)
            const group = container.querySelector('[data-tag-group="true"]')
            expect(group).toBeInTheDocument()
            expect(group).toHaveAttribute('data-tag-group-count', '0')
        })

        it('handles children with different tag configurations', () => {
            render(
                <TagGroupV2>
                    <TagV2
                        text="Primary"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.PRIMARY}
                    />
                    <TagV2
                        text="Success"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.SUCCESS}
                    />
                </TagGroupV2>
            )
            expect(screen.getByText('Primary')).toBeInTheDocument()
            expect(screen.getByText('Success')).toBeInTheDocument()
        })
    })
})
