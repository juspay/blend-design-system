import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import SingleSelectV2MenuRoot from '../../../lib/components/SingleSelectV2/SingleSelectV2MenuRoot'
import {
    SingleSelectV2Alignment,
    SingleSelectV2Side,
} from '../../../lib/components/SingleSelectV2/singleSelectV2.types'

describe('SingleSelectV2MenuRoot', () => {
    it('renders trigger and children when open', () => {
        render(
            <SingleSelectV2MenuRoot
                open
                onOpenChange={() => {}}
                trigger={<button type="button">Open menu</button>}
                alignment={SingleSelectV2Alignment.START}
                side={SingleSelectV2Side.BOTTOM}
                sideOffset={0}
                alignOffset={0}
                contentStyle={{}}
            >
                <div data-testid="menu-content">Menu content</div>
            </SingleSelectV2MenuRoot>
        )

        expect(
            screen.getByRole('button', { name: /open menu/i })
        ).toBeInTheDocument()
        expect(screen.getByTestId('menu-content')).toHaveTextContent(
            'Menu content'
        )
    })

    it('renders with menuId and data-dropdown on content', () => {
        render(
            <SingleSelectV2MenuRoot
                open
                onOpenChange={() => {}}
                trigger={<button type="button">Trigger</button>}
                menuId="single-select-menu"
                alignment={SingleSelectV2Alignment.CENTER}
                side={SingleSelectV2Side.BOTTOM}
                sideOffset={8}
                alignOffset={0}
                contentStyle={{}}
            >
                <span>Content</span>
            </SingleSelectV2MenuRoot>
        )

        const content = document.getElementById('single-select-menu')
        expect(content).toBeInTheDocument()
        expect(content).toHaveAttribute('data-dropdown', 'dropdown')
    })

    it('disables trigger when disabled is true', () => {
        render(
            <SingleSelectV2MenuRoot
                open={false}
                onOpenChange={() => {}}
                disabled
                trigger={<button type="button">Trigger</button>}
                alignment={SingleSelectV2Alignment.START}
                side={SingleSelectV2Side.BOTTOM}
                sideOffset={0}
                alignOffset={0}
                contentStyle={{}}
            >
                <span>Content</span>
            </SingleSelectV2MenuRoot>
        )

        expect(screen.getByRole('button', { name: /trigger/i })).toBeDisabled()
    })

    it('calls onOpenChange when trigger is clicked', async () => {
        const user = userEvent.setup()
        const onOpenChange = vi.fn()

        render(
            <SingleSelectV2MenuRoot
                open={false}
                onOpenChange={onOpenChange}
                trigger={<button type="button">Toggle</button>}
                alignment={SingleSelectV2Alignment.START}
                side={SingleSelectV2Side.BOTTOM}
                sideOffset={0}
                alignOffset={0}
                contentStyle={{}}
            >
                <span>Content</span>
            </SingleSelectV2MenuRoot>
        )

        await user.click(screen.getByRole('button', { name: /toggle/i }))
        expect(onOpenChange).toHaveBeenCalled()
    })
})
