import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import type { SelectMenuGroupType } from '../../../lib/components/SingleSelect/types'

const createBasicItems = (): SelectMenuGroupType[] => [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
        ],
    },
]

describe('SingleSelect menuFooter', () => {
    it('renders menuFooter content when provided', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Footer"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /footer/i }))
        expect(
            await screen.findByRole('button', { name: /create new/i })
        ).toBeInTheDocument()
    })

    it('does not render menuFooter when not provided', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="No footer"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        await user.click(screen.getByRole('button', { name: /no footer/i }))
        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: /create new/i })
            ).not.toBeInTheDocument()
        })
    })

    it('clicking menuFooter does not select an item or close the menu', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Footer click"
                items={createBasicItems()}
                selected=""
                onSelect={vi.fn()}
                menuFooter={<button onClick={vi.fn()}>Create new</button>}
            />
        )
        const trigger = screen.getByRole('button', {
            name: /footer click/i,
        })
        await user.click(trigger)
        const footerBtn = await screen.findByRole('button', {
            name: /create new/i,
        })
        await user.click(footerBtn)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })
    })

    it('menuFooter stays visible when list is empty', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Empty footer"
                items={[]}
                selected=""
                onSelect={() => {}}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /empty footer/i }))
        expect(
            await screen.findByRole('button', { name: /create new/i })
        ).toBeInTheDocument()
    })

    it('menuFooter is rendered outside the scrollable list (pinned)', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Pinned footer"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /pinned footer/i }))
        const footerBtn = await screen.findByRole('button', {
            name: /create new/i,
        })
        const menu = screen.getByRole('menu')
        // Footer is inside the menu, as a direct child (sibling of the scrollable list)
        expect(menu).toContainElement(footerBtn)
        // The footer's nearest ancestor with role="menu" should be the menu itself
        expect(footerBtn.closest('[role="menu"]')).toBe(menu)
    })
})
