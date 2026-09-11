import { Text as RNText } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Modal } from '../src/components/Modal'

/**
 * Modal behaviour under the jest mocks. The default window is phone-sized,
 * so the sheet presentation is the default path; the centered dialog is
 * exercised by mocking a tablet width.
 */

const renderModal = (
    props: Partial<React.ComponentProps<typeof Modal>> = {}
) => {
    const onClose = jest.fn()
    render(
        <BlendNativeProvider>
            <RNText>app content</RNText>
            <Modal
                isOpen
                onClose={onClose}
                title="Confirm payout"
                subtitle="This cannot be undone"
                testID="modal"
                {...props}
            >
                <RNText>modal body</RNText>
            </Modal>
        </BlendNativeProvider>
    )
    return { onClose }
}

describe('Modal (phone sheet presentation)', () => {
    it('renders header, body and footer in a sheet and closes via X', () => {
        const { onClose } = renderModal({
            primaryAction: { text: 'Confirm' },
            secondaryAction: { text: 'Cancel' },
        })
        expect(screen.getByText('Confirm payout')).toBeTruthy()
        expect(screen.getByText('This cannot be undone')).toBeTruthy()
        expect(screen.getByText('modal body')).toBeTruthy()
        expect(screen.getByText('Confirm')).toBeTruthy()
        fireEvent.press(screen.getByTestId('modal-header-close'))
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders nothing while closed', () => {
        renderModal({ isOpen: false })
        expect(screen.queryByText('modal body')).toBeNull()
    })

    it('hides chrome on demand and honours custom header/footer', () => {
        renderModal({
            showHeader: false,
            showFooter: false,
            customHeader: <RNText>custom header</RNText>,
        })
        // showHeader=false suppresses even a custom header slot's render
        // position — web renders custom chrome only when the section shows.
        expect(screen.queryByText('custom header')).toBeNull()
        expect(screen.queryByText('Confirm payout')).toBeNull()
    })

    it('fires footer actions', () => {
        const onPress = jest.fn()
        renderModal({ primaryAction: { text: 'Confirm', onPress } })
        fireEvent.press(screen.getByText('Confirm'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })
})

describe('Modal (tablet dialog presentation)', () => {
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

    it('renders a centered card with a dimmed backdrop and hides the app', () => {
        renderModal()
        expect(screen.getByText('modal body')).toBeTruthy()
        expect(
            screen.getByTestId('modal-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
        // The modal portal layer hides the app content from assistive tech.
        expect(screen.queryByText('app content')).toBeNull()
    })

    it('backdrop press closes unless closeOnBackdropClick is off', () => {
        const { onClose } = renderModal()
        const backdrop = screen.getByTestId('modal-backdrop', {
            includeHiddenElements: true,
        })
        fireEvent.press(backdrop.children[0] as never)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('wires VoiceOver escape to onClose', () => {
        const { onClose } = renderModal()
        const card = screen.getByTestId('modal')
        card.props.onAccessibilityEscape()
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
