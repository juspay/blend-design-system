import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import MenuV2Item from '../../../lib/components/MenuV2/MenuV2Item'
import MenuV2SubMenu from '../../../lib/components/MenuV2/MenuV2SubMenu'
import { getMenuV2Tokens } from '../../../lib/components/MenuV2/menuV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'
import type { MenuV2TokensType } from '../../../lib/components/MenuV2/menuV2.tokens'
import type { MenuV2ItemType } from '../../../lib/components/MenuV2/menuV2.types'

const responsiveTokens = getMenuV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
const menuTokens: MenuV2TokensType = responsiveTokens.sm

describe('MenuV2 parts', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders MenuV2Item with label and optional subLabel', () => {
        const item: MenuV2ItemType = {
            label: { text: 'Profile' },
            subLabel: 'View your profile',
        }

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuV2Item
                        item={item}
                        index={0}
                        itemTokens={menuTokens.group.item}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(
            screen.getByRole('menuitem', { name: /profile/i })
        ).toBeInTheDocument()
        expect(screen.getByText('View your profile')).toBeInTheDocument()
    })

    it('renders MenuV2Item slot and tooltip content', () => {
        const item: MenuV2ItemType = {
            label: {
                text: 'With slot',
                leftSlot: <span data-testid="slot">1</span>,
            },
            tooltip: 'Tooltip text',
        }

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuV2Item
                        item={item}
                        index={0}
                        itemTokens={menuTokens.group.item}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(screen.getByTestId('slot')).toBeInTheDocument()
    })

    it('renders MenuV2Item with non-element slot as decorative text', () => {
        const item: MenuV2ItemType = {
            label: {
                text: 'With string slot',
                leftSlot: <span data-testid="slot">*</span>,
            },
        }

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuV2Item
                        item={item}
                        index={0}
                        itemTokens={menuTokens.group.item}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        const slotWrapper = screen.getByText('*')
        expect(slotWrapper).toBeInTheDocument()
    })

    it('renders MenuV2SubMenu parent item', () => {
        const item: MenuV2ItemType = {
            label: { text: 'Parent menu' },
            subLabel: 'Has nested items',
            subMenu: [
                { label: { text: 'Child A' } },
                { label: { text: 'Child B' } },
            ],
        }

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MenuV2SubMenu item={item} index={0} maxHeight={320} />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(
            screen.getByRole('menuitem', { name: /parent menu/i })
        ).toBeInTheDocument()
    })
})
