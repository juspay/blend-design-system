import { render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Badge } from '../src/components/Badge'
import { View } from 'react-native'

/**
 * Badge render behaviour: the pill renders its formatted count, the dot
 * renders when there is no content, zero hides unless showZero, showBadge
 * force-hides, and the wrapped form overlays children at a corner. 
 */

const renderBadge = (props: React.ComponentProps<typeof Badge> = {}) =>
    render(
        <BlendNativeProvider>
            <Badge testID="badge" {...props} />
        </BlendNativeProvider>
    )

describe('Badge rendering', () => {
    it('renders the formatted count in a pill', () => {
        renderBadge({ count: 5 })
        expect(screen.getByText('5')).toBeTruthy()
        expect(screen.getByTestId('badge')).toBeTruthy()
        expect(screen.queryByTestId('badge-dot')).toBeNull()
    })

    it('overflows the count to "99+" beyond maxCount', () => {
        renderBadge({ count: 150 })
        expect(screen.getByText('99+')).toBeTruthy()
    })

    it('honours a custom maxCount', () => {
        renderBadge({ count: 50, maxCount: 10 })
        expect(screen.getByText('10+')).toBeTruthy()
    })

    it('renders text instead of the count when given', () => {
        renderBadge({ count: 5, text: 'New' })
        expect(screen.getByText('New')).toBeTruthy()
        expect(screen.queryByText('5')).toBeNull()
    })

    it('renders a dot when there is no count or text', () => {
        renderBadge()
        // The dot is hidden from assistive tech (the wrapper label carries
        // the name), so it only matches with hidden elements included.
        expect(
            screen.getByTestId('badge-dot', { includeHiddenElements: true })
        ).toBeTruthy()
    })

    it('renders nothing for count 0 without showZero', () => {
        renderBadge({ count: 0 })
        expect(screen.queryByTestId('badge')).toBeNull()
        expect(screen.queryByTestId('badge-dot')).toBeNull()
        expect(screen.queryByText('0')).toBeNull()
    })

    it('renders "0" for count 0 with showZero', () => {
        renderBadge({ count: 0, showZero: true })
        expect(screen.getByText('0')).toBeTruthy()
    })

    it('renders nothing when showBadge is false', () => {
        renderBadge({ count: 5, showBadge: false })
        expect(screen.queryByText('5')).toBeNull()
        expect(screen.queryByTestId('badge')).toBeNull()
    })

    it('exposes the accessible label', () => {
        renderBadge({ count: 5 })
        expect(screen.getByTestId('badge').props.accessibilityLabel).toBe('5')
    })
})

describe('Badge wrapped over children', () => {
    it('renders children and the overlay anchor', () => {
        renderBadge({
            count: 3,
            position: 'top-right',
            children: (
                <View testID="badge-child" style={{ width: 40, height: 40 }} />
            ),
        })
        expect(screen.getByTestId('badge-child')).toBeTruthy()
        expect(
            screen.getByTestId('badge-anchor', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
        expect(
            screen.getByText('3', { includeHiddenElements: true })
        ).toBeTruthy()
    })

    it('positions the overlay absolutely', () => {
        renderBadge({
            children: <View testID="badge-child" />,
        })
        const anchor = screen.getByTestId('badge-anchor', {
            includeHiddenElements: true,
        })
        const flat = Object.assign(
            {},
            ...(Array.isArray(anchor.props.style)
                ? anchor.props.style.flat(Infinity)
                : [anchor.props.style])
        )
        expect(flat.position).toBe('absolute')
    })

    it('hides the overlay the same as the standalone form', () => {
        renderBadge({
            count: 0,
            children: <View testID="badge-child" />,
        })
        expect(screen.getByTestId('badge-child')).toBeTruthy()
        expect(
            screen.queryByTestId('badge-anchor', {
                includeHiddenElements: true,
            })
        ).toBeNull()
        expect(
            screen.queryByTestId('badge-dot', { includeHiddenElements: true })
        ).toBeNull()
    })
})
