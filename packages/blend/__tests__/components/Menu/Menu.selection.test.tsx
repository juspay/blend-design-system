import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../test-utils'
import Menu from '../../../lib/components/Menu/Menu'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { getMenuTokens } from '../../../lib/components/Menu/menu.tokens'

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    return screen.findByRole('menu')
}

describe('Menu controlled selection', () => {
    it('keeps omitted selected items on the legacy menuitem path', async () => {
        const user = userEvent.setup()
        const menuItems = [
            {
                items: [
                    { label: 'Legacy item' },
                    { label: 'Unselected item', selected: false },
                    { label: 'Selected item', selected: true },
                ],
            },
        ]

        const menu = await (async () => {
            render(
                <Menu
                    trigger={<button type="button">Open menu</button>}
                    items={menuItems}
                />
            )
            return openMenu(user)
        })()

        expect(
            screen.getByRole('menuitem', { name: 'Legacy item' })
        ).not.toHaveAttribute('aria-checked')
        expect(
            screen.getByRole('menuitemradio', { name: 'Unselected item' })
        ).toHaveAttribute('aria-checked', 'false')
        const selectedItem = screen.getByRole('menuitemradio', {
            name: 'Selected item',
        })
        expect(selectedItem).toHaveAttribute('aria-checked', 'true')
        expect(
            menu.querySelectorAll('[data-element="menu-item-checkmark"]')
        ).toHaveLength(1)
    })

    it('uses highlight tokens and group overrides independently', async () => {
        const user = userEvent.setup()
        render(
            <Menu
                trigger={<button type="button">Open menu</button>}
                selectionStyle="highlight"
                selectionMode="multiple"
                items={[
                    {
                        selectionStyle: 'checkmark',
                        selectionMode: 'single',
                        items: [{ label: 'Radio item', selected: true }],
                    },
                    {
                        items: [{ label: 'Checkbox item', selected: true }],
                    },
                ]}
            />
        )

        await openMenu(user)

        const radio = screen.getByRole('menuitemradio', {
            name: 'Radio item',
        })
        const checkbox = screen.getByRole('menuitemcheckbox', {
            name: 'Checkbox item',
        })
        expect(radio).toHaveAttribute('data-selection-style', 'checkmark')
        expect(checkbox).toHaveAttribute('data-selection-style', 'highlight')
        expect(
            radio.querySelector('[data-element="menu-item-checkmark"]')
        ).toBeInTheDocument()
        expect(
            checkbox.querySelector('[data-element="menu-item-checkmark"]')
        ).not.toBeInTheDocument()
    })

    it('preserves empty submenu triggers unless selected is explicit', async () => {
        const user = userEvent.setup()
        render(
            <Menu
                trigger={<button type="button">Open menu</button>}
                items={[
                    {
                        items: [
                            { label: 'Legacy empty submenu', subMenu: [] },
                            {
                                label: 'Unselected empty submenu',
                                subMenu: [],
                                selected: false,
                            },
                            {
                                label: 'Selected empty submenu',
                                subMenu: [],
                                selected: true,
                            },
                        ],
                    },
                ]}
            />
        )

        await openMenu(user)

        expect(
            screen.getByRole('menuitem', { name: 'Legacy empty submenu' })
        ).toHaveAttribute('aria-haspopup', 'menu')
        expect(
            screen.getByRole('menuitemradio', {
                name: 'Unselected empty submenu',
            })
        ).toHaveAttribute('aria-checked', 'false')
        expect(
            screen.getByRole('menuitemradio', {
                name: 'Selected empty submenu',
            })
        ).toHaveAttribute('aria-checked', 'true')
    })

    it('uses the V1 checkmark token position without changing the slot order', async () => {
        const user = userEvent.setup()
        const tokens = getMenuTokens(FOUNDATION_THEME)
        const leadingTokens = {
            sm: {
                ...tokens.sm,
                item: {
                    ...tokens.sm.item,
                    checkmark: {
                        ...tokens.sm.item.checkmark,
                        position: 'leading' as const,
                    },
                },
            },
            lg: {
                ...tokens.lg,
                item: {
                    ...tokens.lg.item,
                    checkmark: {
                        ...tokens.lg.item.checkmark,
                        position: 'leading' as const,
                    },
                },
            },
        }

        render(
            <ThemeProvider componentTokens={{ MENU: leadingTokens }}>
                <Menu
                    trigger={<button type="button">Open menu</button>}
                    items={[{ items: [{ label: 'Selected', selected: true }] }]}
                />
            </ThemeProvider>
        )

        await openMenu(user)
        const item = screen.getByRole('menuitemradio', { name: 'Selected' })
        expect(
            item.querySelector('[data-element="menu-item-checkmark"]')
        ).toHaveAttribute('data-position', 'leading')
    })

    it('falls back when a legacy MENU override has no selection branches', async () => {
        const user = userEvent.setup()
        const stripSelectionFields = (value: unknown): unknown => {
            if (Array.isArray(value)) {
                return value.map(stripSelectionFields)
            }
            if (value && typeof value === 'object') {
                return Object.fromEntries(
                    Object.entries(value)
                        .filter(
                            ([key]) => key !== 'selected' && key !== 'checkmark'
                        )
                        .map(([key, nestedValue]) => [
                            key,
                            stripSelectionFields(nestedValue),
                        ])
                )
            }
            return value
        }
        const legacyTokens = stripSelectionFields(
            getMenuTokens(FOUNDATION_THEME)
        ) as ReturnType<typeof getMenuTokens>

        render(
            <ThemeProvider componentTokens={{ MENU: legacyTokens }}>
                <Menu
                    trigger={<button type="button">Open menu</button>}
                    selectionStyle="highlight"
                    selectionMode="multiple"
                    items={[{ items: [{ label: 'Selected', selected: true }] }]}
                />
            </ThemeProvider>
        )

        await openMenu(user)
        expect(
            screen.getByRole('menuitemcheckbox', { name: 'Selected' })
        ).toBeInTheDocument()
    })

    it('calls the controlled callback once and closes by default', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        render(
            <Menu
                trigger={<button type="button">Open menu</button>}
                items={[{ items: [{ label: 'Select me', onClick }] }]}
            />
        )

        await openMenu(user)
        await user.click(screen.getByRole('menuitem', { name: 'Select me' }))

        expect(onClick).toHaveBeenCalledTimes(1)
        await waitFor(() =>
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        )
    })

    it('keeps the menu open when closeOnSelect is false', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        render(
            <Menu
                trigger={<button type="button">Open menu</button>}
                closeOnSelect={false}
                items={[{ items: [{ label: 'Select me', onClick }] }]}
            />
        )

        await openMenu(user)
        await user.click(screen.getByRole('menuitem', { name: 'Select me' }))

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('propagates selection config through submenu and virtual leaves', async () => {
        const user = userEvent.setup()
        render(
            <Menu
                trigger={<button type="button">Open menu</button>}
                selectionMode="multiple"
                closeOnSelect={false}
                enableVirtualScrolling
                virtualScrollThreshold={0}
                items={[
                    {
                        items: [
                            {
                                label: 'Submenu',
                                subMenu: [
                                    { label: 'Nested item', selected: true },
                                ],
                            },
                            ...Array.from({ length: 25 }, (_, index) => ({
                                label: `Virtual ${index}`,
                                selected: index === 0,
                            })),
                        ],
                    },
                ]}
            />
        )

        await openMenu(user)
        expect(
            screen.getByRole('menuitemcheckbox', { name: 'Virtual 0' })
        ).toHaveAttribute('aria-checked', 'true')
        await user.click(screen.getByRole('menuitem', { name: 'Submenu' }))
        expect(
            await screen.findByRole('menuitemcheckbox', {
                name: 'Nested item',
            })
        ).toHaveAttribute('aria-checked', 'true')
    })
})
