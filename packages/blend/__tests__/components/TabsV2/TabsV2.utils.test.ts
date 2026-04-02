import { describe, it, expect } from 'vitest'
import {
    processTabsWithConcatenation,
    prepareDropdownItems,
    calculateTabIndicatorPosition,
    getActualTabValue,
    isConcatenatedTab,
    extractOriginalValues,
    mergeItemsWithDefaultOrdering,
    applyTabItemDisplayDefaults,
} from '../../../lib/components/TabsV2/tabsV2.utils'
import type { TabsV2TabItem } from '../../../lib/components/TabsV2/tabsV2.types'
import type { SkeletonVariant } from '../../../lib/components/Skeleton/skeleton.tokens'

describe('TabsV2 Utils', () => {
    describe('processTabsWithConcatenation', () => {
        it('returns tabs unchanged when no duplicate content', () => {
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = processTabsWithConcatenation(tabs)

            expect(result).toHaveLength(2)
            expect(result[0].value).toBe('tab1')
            expect(result[1].value).toBe('tab2')
        })

        it('concatenates tabs with same content', () => {
            const sharedContent = 'Shared Content'
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: sharedContent },
                { value: 'tab2', label: 'Tab 2', content: sharedContent },
                { value: 'tab3', label: 'Tab 3', content: 'Different Content' },
            ]

            const result = processTabsWithConcatenation(tabs)

            expect(result).toHaveLength(2)
            expect(result[0].value).toBe('tab1_tab2')
            expect(result[0].label).toBe('Tab 1+Tab 2')
        })

        it('limits concatenation to maximum 3 tabs', () => {
            const sharedContent = 'Shared Content'
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: sharedContent },
                { value: 'tab2', label: 'Tab 2', content: sharedContent },
                { value: 'tab3', label: 'Tab 3', content: sharedContent },
                { value: 'tab4', label: 'Tab 4', content: sharedContent },
            ]

            const result = processTabsWithConcatenation(tabs)

            expect(result).toHaveLength(1)
            expect(result[0].value).toBe('tab1_tab2_tab3')
            expect(result[0].label).toBe('Tab 1+Tab 2+Tab 3')
        })

        it('handles empty tabs array', () => {
            const result = processTabsWithConcatenation([])
            expect(result).toHaveLength(0)
        })

        it('handles single tab', () => {
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
            ]

            const result = processTabsWithConcatenation(tabs)

            expect(result).toHaveLength(1)
            expect(result[0].value).toBe('tab1')
        })
    })

    describe('prepareDropdownItems', () => {
        it('prepares dropdown items from tabs', () => {
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = prepareDropdownItems(tabs)

            expect(result).toHaveLength(1)
            expect(result[0].items).toHaveLength(2)
            expect(result[0].items[0]).toEqual({
                value: 'tab1',
                label: 'Tab 1',
            })
            expect(result[0].items[1]).toEqual({
                value: 'tab2',
                label: 'Tab 2',
            })
        })

        it('uses originalItems when provided', () => {
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
            ]
            const originalItems: TabsV2TabItem[] = [
                { value: 'orig1', label: 'Original 1', content: 'Content 1' },
                { value: 'orig2', label: 'Original 2', content: 'Content 2' },
            ]

            const result = prepareDropdownItems(tabs, originalItems)

            expect(result[0].items).toHaveLength(2)
            expect(result[0].items[0].value).toBe('orig1')
        })

        it('ignores empty originalItems and uses tabs', () => {
            const tabs: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = prepareDropdownItems(tabs, [])

            expect(result[0].items).toHaveLength(2)
            expect(result[0].items[0].value).toBe('tab1')
        })

        it('returns empty array when no items', () => {
            const result = prepareDropdownItems([])
            expect(result).toHaveLength(0)
        })
    })

    describe('calculateTabIndicatorPosition', () => {
        it('calculates correct position and width', () => {
            const mockTabElement = {
                offsetLeft: 100,
                offsetWidth: 80,
            } as HTMLButtonElement

            const mockListElement = {
                offsetWidth: 400,
            } as HTMLDivElement

            const result = calculateTabIndicatorPosition(
                mockTabElement,
                mockListElement
            )

            expect(result.tabLeft).toBe(100)
            expect(result.tabWidth).toBe(0.2)
        })

        it('calculates correct width for full-width tab', () => {
            const mockTabElement = {
                offsetLeft: 0,
                offsetWidth: 400,
            } as HTMLButtonElement

            const mockListElement = {
                offsetWidth: 400,
            } as HTMLDivElement

            const result = calculateTabIndicatorPosition(
                mockTabElement,
                mockListElement
            )

            expect(result.tabWidth).toBe(1)
        })

        it('handles tab at beginning', () => {
            const mockTabElement = {
                offsetLeft: 0,
                offsetWidth: 100,
            } as HTMLButtonElement

            const mockListElement = {
                offsetWidth: 500,
            } as HTMLDivElement

            const result = calculateTabIndicatorPosition(
                mockTabElement,
                mockListElement
            )

            expect(result.tabLeft).toBe(0)
            expect(result.tabWidth).toBe(0.2)
        })
    })

    describe('getActualTabValue', () => {
        it('returns value as-is when it exists in original values', () => {
            const originalValues = new Set(['tab1', 'tab2', 'tab3'])

            const result = getActualTabValue('tab2', originalValues)

            expect(result).toBe('tab2')
        })

        it('extracts first value from concatenated value', () => {
            const originalValues = new Set(['tab1', 'tab2', 'tab3'])

            const result = getActualTabValue('tab1_tab2_tab3', originalValues)

            expect(result).toBe('tab1')
        })

        it('returns value as-is when no underscore but not in original', () => {
            const originalValues = new Set(['tab1', 'tab2'])

            const result = getActualTabValue('unknown', originalValues)

            expect(result).toBe('unknown')
        })
    })

    describe('isConcatenatedTab', () => {
        it('returns true for concatenated value', () => {
            const originalValues = new Set(['tab1', 'tab2'])

            const result = isConcatenatedTab('tab1_tab2', originalValues)

            expect(result).toBe(true)
        })

        it('returns false for original value', () => {
            const originalValues = new Set(['tab1', 'tab2'])

            const result = isConcatenatedTab('tab1', originalValues)

            expect(result).toBe(false)
        })

        it('returns false for value without underscore', () => {
            const originalValues = new Set(['tab1'])

            const result = isConcatenatedTab('tab', originalValues)

            expect(result).toBe(false)
        })
    })

    describe('extractOriginalValues', () => {
        it('extracts values from concatenated string', () => {
            const result = extractOriginalValues('tab1_tab2_tab3')

            expect(result).toEqual(['tab1', 'tab2', 'tab3'])
        })

        it('handles single value', () => {
            const result = extractOriginalValues('tab1')

            expect(result).toEqual(['tab1'])
        })

        it('handles empty string', () => {
            const result = extractOriginalValues('')

            expect(result).toEqual([''])
        })
    })

    describe('mergeItemsWithDefaultOrdering', () => {
        it('marks new items and moves them to front', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
                { value: 'tab3', label: 'Tab 3', content: 'Content 3' },
            ]
            const defaultTabs = new Set(['tab2'])
            const newlyAddedTabs = new Set(['tab2'])

            const result = mergeItemsWithDefaultOrdering(
                items,
                defaultTabs,
                newlyAddedTabs
            )

            expect(result).toHaveLength(3)
            expect(result[0].value).toBe('tab1')
            expect(result[1].value).toBe('tab3')
            expect(result[2].value).toBe('tab2')
            expect(result[2].newItem).toBe(true)
        })

        it('handles empty items array', () => {
            const result = mergeItemsWithDefaultOrdering(
                [],
                new Set<string>(),
                new Set<string>()
            )

            expect(result).toHaveLength(0)
        })

        it('handles all items as default tabs', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]
            const defaultTabs = new Set(['tab1', 'tab2'])
            const newlyAddedTabs = new Set<string>()

            const result = mergeItemsWithDefaultOrdering(
                items,
                defaultTabs,
                newlyAddedTabs
            )

            expect(result).toHaveLength(2)
            expect(result[0].value).toBe('tab1')
            expect(result[1].value).toBe('tab2')
        })

        it('does not set newItem when default tab is not in newlyAddedTabs', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]
            const defaultTabs = new Set(['tab1'])
            const result = mergeItemsWithDefaultOrdering(
                items,
                defaultTabs,
                new Set<string>()
            )

            expect(result.map((i) => i.value)).toEqual(['tab2', 'tab1'])
            expect(result[1].newItem).toBeUndefined()
        })
    })

    describe('applyTabItemDisplayDefaults', () => {
        it('applies disabled default to all items', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = applyTabItemDisplayDefaults(
                items,
                true,
                false,
                'pulse'
            )

            expect(result[0].disabled).toBe(true)
            expect(result[1].disabled).toBe(true)
        })

        it('applies showSkeleton default to all items', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = applyTabItemDisplayDefaults(
                items,
                false,
                true,
                'pulse'
            )

            expect(result[0].showSkeleton).toBe(true)
            expect(result[1].showSkeleton).toBe(true)
        })

        it('applies skeletonVariant default to all items', () => {
            const items: TabsV2TabItem[] = [
                { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
            ]

            const result = applyTabItemDisplayDefaults(
                items,
                false,
                false,
                'shimmer' as SkeletonVariant
            )

            expect(result[0].skeletonVariant).toBe('shimmer')
            expect(result[1].skeletonVariant).toBe('shimmer')
        })

        it('preserves existing item properties', () => {
            const items: TabsV2TabItem[] = [
                {
                    value: 'tab1',
                    label: 'Tab 1',
                    content: 'Content 1',
                    disabled: false,
                    // showSkeleton undefined - will use default
                },
            ]

            const result = applyTabItemDisplayDefaults(
                items,
                true,
                true,
                'pulse'
            )

            // disabled uses OR logic: item.disabled || default
            expect(result[0].disabled).toBe(true)
            // showSkeleton uses default when item.showSkeleton is undefined
            expect(result[0].showSkeleton).toBe(true)
        })

        it('does not override item-specific properties when set', () => {
            const items: TabsV2TabItem[] = [
                {
                    value: 'tab1',
                    label: 'Tab 1',
                    content: 'Content 1',
                    disabled: false,
                    showSkeleton: false,
                },
                {
                    value: 'tab2',
                    label: 'Tab 2',
                    content: 'Content 2',
                    disabled: true,
                    showSkeleton: true,
                },
            ]

            const result = applyTabItemDisplayDefaults(
                items,
                false,
                false,
                'pulse'
            )

            expect(result[0].disabled).toBe(false)
            expect(result[0].showSkeleton).toBe(false)
            expect(result[1].disabled).toBe(true)
            expect(result[1].showSkeleton).toBe(true)
        })

        it('handles empty items array', () => {
            const result = applyTabItemDisplayDefaults(
                [],
                false,
                false,
                'pulse'
            )
            expect(result).toHaveLength(0)
        })
    })
})
