import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { MenuItem } from '../../../lib/components/SingleSelectV2/SingleSelectV2MenuItems'
import { getSingleSelectV2Tokens } from '../../../lib/components/SingleSelectV2/singleSelectV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'

const tokens = getSingleSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT).sm

describe('SingleSelectV2 MenuItems', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('returns null when singleSelectTokens are missing for plain item', () => {
        const { container } = render(
            <MenuItem
                item={{ label: 'No token item', value: 'no-token-item' }}
                selected=""
                onSelect={() => {}}
            />
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders SelectItemV2 for plain item when tokens provided', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuItem
                        item={{ label: 'Option A', value: 'a' }}
                        selected=""
                        onSelect={vi.fn()}
                        singleSelectTokens={tokens}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(
            screen.getByRole('menuitem', { name: /option a/i })
        ).toBeInTheDocument()
    })

    it('renders SubMenu for item with subMenu', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuItem
                        item={{
                            label: 'Parent',
                            value: 'p',
                            subMenu: [{ label: 'Child', value: 'c' }],
                        }}
                        selected=""
                        onSelect={vi.fn()}
                        singleSelectTokens={tokens}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(screen.getByText('Parent')).toBeInTheDocument()
        expect(
            screen.getByRole('menuitem', { name: /parent/i })
        ).toBeInTheDocument()
    })

    it('renders SubMenu with slot1 slot2 slot3 slot4', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuItem
                        item={{
                            label: 'With slots',
                            value: 'slots',
                            slot1: <span data-testid="slot1">1</span>,
                            slot2: <span data-testid="slot2">2</span>,
                            slot3: <span data-testid="slot3">3</span>,
                            slot4: <span data-testid="slot4">4</span>,
                            subMenu: [{ label: 'Sub', value: 'sub' }],
                        }}
                        selected=""
                        onSelect={vi.fn()}
                        singleSelectTokens={tokens}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(screen.getByTestId('slot1')).toBeInTheDocument()
        expect(screen.getByTestId('slot2')).toBeInTheDocument()
        expect(screen.getByTestId('slot3')).toBeInTheDocument()
        expect(screen.getByTestId('slot4')).toBeInTheDocument()
    })
})
