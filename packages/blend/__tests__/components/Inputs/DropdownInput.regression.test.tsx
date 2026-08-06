import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '../../test-utils'
import DropdownInput from '../../../lib/components/Inputs/DropdownInput/DropdownInput'
import ThemeProvider from '../../../lib/context/ThemeProvider'

const items = [
    {
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK' },
        ],
    },
]

describe('DropdownInput menu behavior', () => {
    it('reports menu open and close through dropdown callbacks', async () => {
        const onDropdownOpen = vi.fn()
        const onDropdownClose = vi.fn()
        const { user } = render(
            <DropdownInput
                value=""
                onChange={() => {}}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropDownItems={items}
                onDropdownOpen={onDropdownOpen}
                onDropdownClose={onDropdownClose}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Select option' }))
        expect(onDropdownOpen).toHaveBeenCalledTimes(1)
        expect(onDropdownClose).not.toHaveBeenCalled()

        await user.click(
            await screen.findByRole('menuitem', { name: 'United States' })
        )
        await waitFor(() => {
            expect(onDropdownClose).toHaveBeenCalledTimes(1)
        })
    })

    it('keeps the legacy 400px default menu height cap', async () => {
        const { user } = render(
            <DropdownInput
                value=""
                onChange={() => {}}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropDownItems={items}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Select option' }))

        expect(await screen.findByRole('menu')).toHaveStyle({
            maxHeight: '400px',
        })
    })

    it('keeps the menu search field label independent from the input placeholder', async () => {
        const { user } = render(
            <DropdownInput
                value=""
                onChange={() => {}}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropDownItems={items}
                placeholder="Enter city"
            />
        )

        await user.click(screen.getByRole('button', { name: 'Select option' }))

        expect(
            await screen.findByRole('searchbox', { name: 'Search options...' })
        ).toBeInTheDocument()
    })

    it('keeps the menu portal inside a ThemeProvider target', async () => {
        const host = document.createElement('div')
        const shadowRoot = host.attachShadow({ mode: 'open' })
        const target = document.createElement('div')
        shadowRoot.appendChild(target)

        const { user, unmount } = render(
            <ThemeProvider target={target}>
                <DropdownInput
                    value=""
                    onChange={() => {}}
                    dropDownValue=""
                    onDropDownChange={() => {}}
                    dropDownItems={items}
                />
            </ThemeProvider>,
            { container: target }
        )

        await user.click(
            within(target).getByRole('button', { name: 'Select option' })
        )

        const menu = await within(target).findByRole('menu')
        expect(target.contains(menu)).toBe(true)

        unmount()
        host.remove()
    })
})
