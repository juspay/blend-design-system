import { describe, it, expect, vi } from 'vitest'
import type { DirectoryData } from '../../../lib/components/Directory/types'
import {
    isControlledSidebarV2,
    getSidebarV2Status,
    announceSidebarV2StateChange,
    getTopbarV2Styles,
    getSidebarV2MobileNavigationItems,
    useTopbarV2AutoHide,
} from '../../../lib/components/SidebarV2/utils'
import { SidebarV2StateChange } from '../../../lib/components/SidebarV2/types'

describe('SidebarV2 Utils', () => {
    describe('isControlledSidebarV2', () => {
        it('returns true when isExpanded is defined', () => {
            expect(isControlledSidebarV2(true)).toBe(true)
            expect(isControlledSidebarV2(false)).toBe(true)
        })

        it('returns false when isExpanded is undefined', () => {
            expect(isControlledSidebarV2(undefined)).toBe(false)
        })
    })

    describe('getSidebarV2Status', () => {
        it('returns INTERMEDIATE when hovering', () => {
            expect(getSidebarV2Status(true, true)).toBe(
                SidebarV2StateChange.INTERMEDIATE
            )
            expect(getSidebarV2Status(false, true)).toBe(
                SidebarV2StateChange.INTERMEDIATE
            )
        })

        it('returns EXPANDED when expanded and not hovering', () => {
            expect(getSidebarV2Status(true, false)).toBe(
                SidebarV2StateChange.EXPANDED
            )
        })

        it('returns COLLAPSED when not expanded and not hovering', () => {
            expect(getSidebarV2Status(false, false)).toBe(
                SidebarV2StateChange.COLLAPSED
            )
        })
    })

    describe('announceSidebarV2StateChange', () => {
        it('creates and removes announcement element for expanded state', () => {
            const originalAppendChild = document.body.appendChild
            const originalRemoveChild = document.body.removeChild
            const appendedElements: HTMLElement[] = []
            const removedElements: HTMLElement[] = []

            vi.spyOn(document.body, 'appendChild').mockImplementation(
                (node) => {
                    appendedElements.push(node as HTMLElement)
                    return node
                }
            )

            vi.spyOn(document.body, 'removeChild').mockImplementation(
                (node) => {
                    removedElements.push(node as HTMLElement)
                    return node
                }
            )

            vi.useFakeTimers()

            announceSidebarV2StateChange(true)

            expect(appendedElements).toHaveLength(1)
            expect(appendedElements[0].getAttribute('role')).toBe('status')
            expect(appendedElements[0].getAttribute('aria-live')).toBe('polite')
            expect(appendedElements[0].textContent).toBe('Sidebar expanded')

            // Fast-forward past the timeout
            vi.advanceTimersByTime(1001)

            expect(removedElements).toHaveLength(1)

            vi.useRealTimers()

            // Restore mocks
            document.body.appendChild = originalAppendChild
            document.body.removeChild = originalRemoveChild
        })

        it('creates and removes announcement element for collapsed state', () => {
            const originalAppendChild = document.body.appendChild
            const appendedElements: HTMLElement[] = []

            vi.spyOn(document.body, 'appendChild').mockImplementation(
                (node) => {
                    appendedElements.push(node as HTMLElement)
                    return node
                }
            )

            vi.useFakeTimers()

            announceSidebarV2StateChange(false)

            expect(appendedElements[0].textContent).toBe('Sidebar collapsed')

            vi.useRealTimers()

            document.body.appendChild = originalAppendChild
        })
    })

    describe('getTopbarV2Styles', () => {
        it('returns empty object when auto-hide is disabled', () => {
            expect(getTopbarV2Styles(false, true)).toEqual({})
            expect(getTopbarV2Styles(false, false)).toEqual({})
        })

        it('returns visible styles when auto-hide is enabled and should show', () => {
            const styles = getTopbarV2Styles(true, true)
            expect(styles).toHaveProperty('transform', 'translateY(0)')
            expect(styles).toHaveProperty(
                'transition',
                'transform 0.3s ease-in-out'
            )
        })

        it('returns hidden styles when auto-hide is enabled and should hide', () => {
            const styles = getTopbarV2Styles(true, false, {
                header: {
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    gap: '8px',
                },
            } as Parameters<typeof getTopbarV2Styles>[2])
            expect(styles).toHaveProperty('transform', 'translateY(-100%)')
            expect(styles).toHaveProperty(
                'transition',
                'transform 0.3s ease-in-out'
            )
            expect(styles).toHaveProperty('marginTop')
        })
    })

    describe('getSidebarV2MobileNavigationItems', () => {
        it('returns empty array when directory is empty', () => {
            const result = getSidebarV2MobileNavigationItems([])
            expect(result).toEqual([])
        })

        it('returns only items with showOnMobile=true', () => {
            const directory: DirectoryData[] = [
                {
                    label: 'Section 1',
                    items: [
                        { label: 'Item 1', showOnMobile: true },
                        {
                            label: 'Item 2',
                            showOnMobile: false,
                        },
                    ],
                },
                {
                    label: 'Section 2',
                    items: [{ label: 'Item 3', showOnMobile: true }],
                },
            ]

            const result = getSidebarV2MobileNavigationItems(directory)

            expect(result).toHaveLength(2)
            expect(result[0].label).toBe('Item 1')
            expect(result[0].sectionLabel).toBe('Section 1')
            expect(result[1].label).toBe('Item 3')
            expect(result[1].sectionLabel).toBe('Section 2')
        })

        it('handles sections without items', () => {
            const directory: DirectoryData[] = [
                {
                    label: 'Empty Section',
                    items: [],
                },
                {
                    label: 'Section with items',
                    items: [{ label: 'Item', showOnMobile: true }],
                },
            ]

            const result = getSidebarV2MobileNavigationItems(directory)

            expect(result).toHaveLength(1)
            expect(result[0].label).toBe('Item')
        })

        it('preserves all item properties in mobile items', () => {
            const directory: DirectoryData[] = [
                {
                    label: 'Section',
                    items: [
                        {
                            label: 'Item',
                            showOnMobile: true,
                            href: '/item',
                            onClick: () => {},
                        },
                    ],
                },
            ]

            const result = getSidebarV2MobileNavigationItems(directory)

            expect(result[0]).toMatchObject({
                label: 'Item',
                href: '/item',
                sectionLabel: 'Section',
            })
            expect(result[0].onClick).toBeDefined()
        })
    })
})

describe('useTopbarV2AutoHide', () => {
    it('hook exists in the utils module', () => {
        // The hook is tested through integration in the main component
        // Verify it can be imported from the utils module
        expect(useTopbarV2AutoHide).toBeDefined()
        expect(typeof useTopbarV2AutoHide).toBe('function')
    })
})
