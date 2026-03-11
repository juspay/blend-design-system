import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import MultiSelectV2Trigger from '../../../lib/components/MultiSelectV2/MultiSelectV2Trigger'
import MultiSelectV2MenuHeader from '../../../lib/components/MultiSelectV2/MultiSelectV2MenuHeader'
import MultiSelectV2SelectAllItem from '../../../lib/components/MultiSelectV2/MultiSelectV2SelectAllItem'
import MultiSelectV2MenuItem from '../../../lib/components/MultiSelectV2/MultiSelectV2MenuItem'
import {
    MultiSelectV2Size,
    MultiSelectV2Variant,
    MultiSelectV2SelectionTagType,
} from '../../../lib/components/MultiSelectV2/multiSelectV2.types'
import { getMultiSelectV2Tokens } from '../../../lib/components/MultiSelectV2/multiSelectV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'

const tokens = getMultiSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT).sm

describe('MultiSelectV2 parts', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders MultiSelectV2Trigger with placeholder when no selection', () => {
        render(
            <MultiSelectV2Trigger
                size={MultiSelectV2Size.MEDIUM}
                variant={MultiSelectV2Variant.CONTAINER}
                selectedValues={[]}
                valueLabelMap={{}}
                placeholder="Choose options"
                multiSelectTokens={tokens}
                open={false}
                disabled={false}
                selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                name="test"
                label=""
                required={false}
                isSmallScreen={false}
                borderRadius="8px"
            />
        )
        const combobox = screen.getByRole('combobox')
        expect(combobox).toBeInTheDocument()
        expect(screen.getByText('Choose options')).toBeInTheDocument()
    })

    it('renders MultiSelectV2Trigger with selected count when selectionTagType is COUNT', () => {
        render(
            <MultiSelectV2Trigger
                size={MultiSelectV2Size.MEDIUM}
                variant={MultiSelectV2Variant.CONTAINER}
                selectedValues={['a', 'b']}
                valueLabelMap={{ a: 'A', b: 'B' }}
                placeholder="Select"
                multiSelectTokens={tokens}
                open={false}
                disabled={false}
                selectionTagType={MultiSelectV2SelectionTagType.COUNT}
                name="test"
                label=""
                required={false}
                isSmallScreen={false}
                borderRadius="8px"
            />
        )
        expect(screen.getByRole('combobox')).toHaveTextContent('2')
    })

    it('renders MultiSelectV2Trigger with selected text when selectionTagType is TEXT', () => {
        render(
            <MultiSelectV2Trigger
                size={MultiSelectV2Size.MEDIUM}
                variant={MultiSelectV2Variant.CONTAINER}
                selectedValues={['apple']}
                valueLabelMap={{ apple: 'Apple' }}
                placeholder="Select"
                multiSelectTokens={tokens}
                open={false}
                disabled={false}
                selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                name="test"
                label=""
                required={false}
                isSmallScreen={false}
                borderRadius="8px"
            />
        )
        expect(screen.getByText('Apple')).toBeInTheDocument()
    })

    it('renders MultiSelectV2MenuHeader with search and select all', () => {
        const searchInputRef = React.createRef<HTMLInputElement | null>()
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2MenuHeader
                        tokens={tokens}
                        showSearch
                        itemsCount={3}
                        searchValue=""
                        searchInputRef={searchInputRef}
                        onSearchChange={() => {}}
                        onSearchArrowKeyToFirst={() => {}}
                        showSelectAll
                        selected={[]}
                        availableValues={['a', 'b', 'c']}
                        filteredItems={[
                            {
                                items: [
                                    { label: 'A', value: 'a' },
                                    { label: 'B', value: 'b' },
                                    { label: 'C', value: 'c' },
                                ],
                            },
                        ]}
                        onSelectAll={() => {}}
                        selectAllText="Select All"
                        searchPlaceholder="Search..."
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
        expect(screen.getByText('Select All')).toBeInTheDocument()
    })

    it('renders MultiSelectV2SelectAllItem with checked state', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2SelectAllItem
                        selected={['a', 'b']}
                        availableValues={['a', 'b']}
                        onSelectAll={() => {}}
                        selectAllText="Select All"
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(screen.getByText('Select All')).toBeInTheDocument()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    it('renders MultiSelectV2MenuItem with label and checked state', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2MenuItem
                        item={{ label: 'Option A', value: 'option-a' }}
                        selected={['option-a']}
                        onSelect={() => {}}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(
            screen.getByRole('option', { name: /option a/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders MultiSelectV2SelectAllItem with indeterminate state when some selected', () => {
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2SelectAllItem
                        selected={['a']}
                        availableValues={['a', 'b', 'c']}
                        onSelectAll={() => {}}
                        selectAllText="Select All"
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    })

    it('MultiSelectV2SelectAllItem calls onSelectAll when clicked', async () => {
        const user = userEvent.setup()
        const onSelectAll = vi.fn()
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2SelectAllItem
                        selected={[]}
                        availableValues={['a', 'b']}
                        onSelectAll={onSelectAll}
                        selectAllText="Select All"
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        await user.click(screen.getByRole('menuitem', { name: /select all/i }))
        expect(onSelectAll).toHaveBeenCalledWith(true)
    })
})
