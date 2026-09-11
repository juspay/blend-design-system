import { Text as RNText } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Popover } from '../src/components/Popover'

/**
 * Popover behaviour under the jest mocks. `useWindowDimensions` reports a
 * phone-sized window by default, so the sheet presentation is the default
 * path; the anchored path is exercised by mocking a tablet width.
 */

const renderPopover = (
    props: Partial<React.ComponentProps<typeof Popover>> = {}
) =>
    render(
        <BlendNativeProvider>
            <Popover
                trigger={<RNText>anchor</RNText>}
                heading="Filters"
                description="Narrow the list"
                testID="pop"
                {...props}
            >
                <RNText>popover body</RNText>
            </Popover>
        </BlendNativeProvider>
    )

describe('Popover (phone sheet presentation)', () => {
    it('opens as a sheet on trigger press and closes via the close button', () => {
        const onClose = jest.fn()
        renderPopover({ onClose })
        expect(screen.queryByText('popover body')).toBeNull()
        fireEvent.press(screen.getByTestId('pop-trigger'))
        expect(screen.getByText('popover body')).toBeTruthy()
        expect(screen.getByText('Filters')).toBeTruthy()
        expect(screen.getByText('Narrow the list')).toBeTruthy()
        fireEvent.press(screen.getByTestId('pop-header-close'))
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(screen.queryByText('popover body')).toBeNull()
    })

    it('renders footer actions and fires them', () => {
        const onPrimary = jest.fn()
        renderPopover({
            open: true,
            primaryAction: { text: 'Apply', onPress: onPrimary },
            secondaryAction: { text: 'Clear' },
        })
        expect(screen.getByText('Clear')).toBeTruthy()
        fireEvent.press(screen.getByText('Apply'))
        expect(onPrimary).toHaveBeenCalledTimes(1)
    })

    it('hides the close button when asked', () => {
        renderPopover({ open: true, showCloseButton: false })
        expect(screen.queryByTestId('pop-header-close')).toBeNull()
    })

    it('supports controlled open', () => {
        const onOpenChange = jest.fn()
        renderPopover({ open: false, onOpenChange })
        fireEvent.press(screen.getByTestId('pop-trigger'))
        expect(onOpenChange).toHaveBeenCalledWith(true)
        expect(screen.queryByText('popover body')).toBeNull()
    })
})

describe('Popover (tablet anchored presentation)', () => {
    const rn = jest.requireActual('react-native')
    let spy: jest.SpyInstance

    beforeEach(() => {
        spy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1194,
            height: 834,
            scale: 2,
            fontScale: 1,
        })
    })
    afterEach(() => spy.mockRestore())

    it('presents anchored content instead of a sheet', () => {
        renderPopover({ open: true })
        // The anchored path parks content invisibly until measurement, so
        // hidden-element queries see it; the sheet's handle testID pattern
        // is absent.
        expect(
            screen.getByText('popover body', { includeHiddenElements: true })
        ).toBeTruthy()
        expect(
            screen.getByTestId('pop-backdrop', { includeHiddenElements: true })
        ).toBeTruthy()
    })
})
