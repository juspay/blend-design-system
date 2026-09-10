import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Breadcrumb } from '../src/components/Breadcrumb'
import type { BreadcrumbNativeItemType } from '../src/components/Breadcrumb'

/**
 * Breadcrumb behaviour under the jest mocks: crumb rendering, separator
 * placement, the current-page crumb, overflow collapse into the Menu, and
 * press wiring through both the trail and the overflow list.
 */

const ITEMS: BreadcrumbNativeItemType[] = [
    { label: 'Home' },
    { label: 'Payments' },
    { label: 'Settlements' },
    { label: 'Current page' },
]

const renderBreadcrumb = (
    props: Partial<React.ComponentProps<typeof Breadcrumb>> = {}
) =>
    render(
        <BlendNativeProvider>
            <Breadcrumb items={ITEMS} testID="breadcrumb" {...props} />
        </BlendNativeProvider>
    )

describe('Breadcrumb', () => {
    it('renders every crumb and separator when under the overflow limit', () => {
        renderBreadcrumb()
        for (const label of [
            'Home',
            'Payments',
            'Settlements',
            'Current page',
        ]) {
            expect(screen.getByText(label)).toBeTruthy()
        }
        // Three separators between four crumbs. They are deliberately
        // hidden from assistive tech (web `aria-hidden`), so include
        // hidden elements when querying them.
        expect(
            screen.getAllByText('/', { includeHiddenElements: true })
        ).toHaveLength(3)
    })

    it('renders nothing for an empty list', () => {
        renderBreadcrumb({ items: [] })
        expect(screen.queryByTestId('breadcrumb')).toBeNull()
    })

    it('marks the last crumb as current — link crumbs stay links', () => {
        renderBreadcrumb()
        expect(
            screen.getByLabelText('Navigate to Home').props.accessibilityRole
        ).toBe('link')
        // The current page has no link role — it renders as plain text.
        expect(screen.queryByLabelText('Navigate to Current page')).toBeNull()
    })

    it('fires onPress when a trail crumb is pressed', () => {
        const onPress = jest.fn()
        renderBreadcrumb({
            items: [{ label: 'Home', onPress }, { label: 'Current page' }],
        })
        fireEvent.press(screen.getByLabelText('Navigate to Home'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('honours an explicit isActive over last-position default', () => {
        renderBreadcrumb({
            items: [{ label: 'Home', isActive: true }, { label: 'Trail' }],
        })
        // Home is current (no link), Trail is the navigable one. The link
        // crumb is a plain Pressable (not `accessible` via a label query
        // path that RNTL resolves differently for Pressable), so assert on
        // the rendered subtree instead.
        expect(screen.queryByLabelText('Navigate to Home')).toBeNull()
        expect(screen.getByText('Trail')).toBeTruthy()
    })
})

describe('Breadcrumb overflow', () => {
    const many: BreadcrumbNativeItemType[] = Array.from(
        { length: 8 },
        (_, i) => ({ label: `Page ${i + 1}` })
    )

    it('collapses to first crumb + ellipsis + three trailing segments', () => {
        renderBreadcrumb({ items: many })
        expect(screen.getByText('Page 1')).toBeTruthy()
        for (const label of ['Page 6', 'Page 7', 'Page 8']) {
            expect(screen.getByText(label)).toBeTruthy()
        }
        // Hidden middle crumbs are only in the overflow menu.
        for (const label of ['Page 2', 'Page 3', 'Page 4', 'Page 5']) {
            expect(screen.queryByText(label)).toBeNull()
        }
    })

    it('web parity by default: one item past the limit collapses with a one-crumb menu', () => {
        renderBreadcrumb({ items: many.slice(0, 5), testID: 'bc' })
        fireEvent.press(screen.getByTestId('bc-overflow-trigger'))
        // Only Page 2 is in the overflow menu.
        expect(screen.getByText('Page 2')).toBeTruthy()
    })

    it('minVisibleItems 3 keeps the trail inline at maxItems 2 (collapse would show only 2)', () => {
        renderBreadcrumb({
            items: many,
            maxItems: 2,
            minVisibleItems: 3,
            testID: 'bc',
        })
        for (const label of ['Page 2', 'Page 5', 'Page 6']) {
            expect(screen.getByText(label)).toBeTruthy()
        }
        expect(screen.queryByTestId('bc-overflow-trigger')).toBeNull()
    })

    it('minVisibleItems 3 suppresses the dead-ellipsis case', () => {
        renderBreadcrumb({
            items: many.slice(0, 2),
            maxItems: 1,
            minVisibleItems: 3,
            testID: 'bc',
        })
        expect(screen.getByText('Page 2')).toBeTruthy()
        expect(screen.queryByTestId('bc-overflow-trigger')).toBeNull()
    })

    it('opens the overflow menu and fires a hidden crumb onPress', () => {
        const onPress = jest.fn()
        const items: BreadcrumbNativeItemType[] = Array.from(
            { length: 6 },
            (_, i) => ({
                label: `Page ${i + 1}`,
                onPress: i === 1 ? onPress : undefined,
            })
        )
        renderBreadcrumb({ items, testID: 'bc' })
        fireEvent.press(screen.getByTestId('bc-overflow-trigger'))
        expect(screen.getByText('Page 2')).toBeTruthy()
        fireEvent.press(screen.getByText('Page 2'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('disables overflow when maxItems is sub-1', () => {
        renderBreadcrumb({ items: many, maxItems: 0 })
        for (const label of ['Page 2', 'Page 5']) {
            expect(screen.getByText(label)).toBeTruthy()
        }
    })
})
