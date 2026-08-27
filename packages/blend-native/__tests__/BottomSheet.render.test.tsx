import { ScrollView, Text } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { BottomSheet } from '../src/overlay/sheet/BottomSheet'
import { BottomSheetScrollable } from '../src/overlay/sheet/SheetScrollable'

/**
 * BottomSheet behaviour under the Reanimated jest mock (animations resolve
 * synchronously) and the Gesture Handler jest mock (gestures inert). What
 * these prove: mount/unmount around the open prop, backdrop dismissal,
 * portal layering, and the modal accessibility posture. The gesture physics
 * are covered by the pure sheetMath suite; the feel is verified on device.
 */

const renderSheet = (open: boolean, onClose = jest.fn()) => {
    const ui = (isOpen: boolean) => (
        <BlendNativeProvider>
            <Text>app content</Text>
            <BottomSheet open={isOpen} onClose={onClose} testID="sheet">
                <Text>sheet content</Text>
            </BottomSheet>
        </BlendNativeProvider>
    )
    return { ...render(ui(open)), ui, onClose }
}

describe('BottomSheet', () => {
    it('renders nothing while closed', () => {
        renderSheet(false)
        expect(screen.queryByText('sheet content')).toBeNull()
        expect(screen.getByText('app content')).toBeTruthy()
    })

    it('presents its content when open', () => {
        renderSheet(true)
        expect(screen.getByText('sheet content')).toBeTruthy()
        expect(screen.getByTestId('sheet')).toBeTruthy()
        expect(
            screen.getByTestId('sheet-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
    })

    it('unmounts after the exit animation when open flips off', () => {
        const { rerender, ui } = renderSheet(true)
        expect(screen.getByText('sheet content')).toBeTruthy()
        // The Reanimated mock completes the exit animation synchronously.
        rerender(ui(false))
        expect(screen.queryByText('sheet content')).toBeNull()
    })

    it('requests close on backdrop press', () => {
        const onClose = jest.fn()
        renderSheet(true, onClose)
        const backdrop = screen.getByTestId('sheet-backdrop', {
            includeHiddenElements: true,
        })
        // The pressable fills the backdrop layer.
        fireEvent.press(backdrop.children[0] as never)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('can disable backdrop dismissal', () => {
        const onClose = jest.fn()
        render(
            <BlendNativeProvider>
                <BottomSheet
                    open
                    onClose={onClose}
                    dismissOnBackdropPress={false}
                    testID="sheet"
                />
            </BlendNativeProvider>
        )
        const backdrop = screen.getByTestId('sheet-backdrop', {
            includeHiddenElements: true,
        })
        fireEvent.press(backdrop.children[0] as never)
        expect(onClose).not.toHaveBeenCalled()
    })

    it('wires VoiceOver escape to onClose', () => {
        const onClose = jest.fn()
        renderSheet(true, onClose)
        const sheet = screen.getByTestId('sheet')
        expect(sheet.props.onAccessibilityEscape).toBeDefined()
        sheet.props.onAccessibilityEscape()
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('hides the app content from assistive tech while open', () => {
        renderSheet(true)
        // The portal's modal layer hides everything painted below it; RNTL's
        // default queries respect that.
        expect(screen.queryByText('app content')).toBeNull()
        expect(
            screen.getByText('app content', { includeHiddenElements: true })
        ).toBeTruthy()
    })

    it('marks the surface modal for assistive tech', () => {
        renderSheet(true)
        expect(screen.getByTestId('sheet').props.accessibilityViewIsModal).toBe(
            true
        )
    })

    it('hides the backdrop from assistive tech', () => {
        renderSheet(true)
        const backdrop = screen.getByTestId('sheet-backdrop', {
            includeHiddenElements: true,
        })
        expect(backdrop.props.importantForAccessibility).toBe(
            'no-hide-descendants'
        )
    })

    it('hides the drag handle when asked', () => {
        render(
            <BlendNativeProvider>
                <BottomSheet
                    open
                    onClose={jest.fn()}
                    showHandle={false}
                    testID="sheet"
                >
                    <Text>content</Text>
                </BottomSheet>
            </BlendNativeProvider>
        )
        const sheet = screen.getByTestId('sheet')
        // Only the content remains inside the sheet surface.
        expect(sheet.children).toHaveLength(1)
    })
})

describe('BottomSheetScrollable', () => {
    it('renders its scrollable inside a sheet with the scroll plumbing attached', () => {
        render(
            <BlendNativeProvider>
                <BottomSheet open onClose={jest.fn()} testID="sheet">
                    <BottomSheetScrollable>
                        <ScrollView testID="list">
                            <Text>row</Text>
                        </ScrollView>
                    </BottomSheetScrollable>
                </BottomSheet>
            </BlendNativeProvider>
        )
        const list = screen.getByTestId('list')
        expect(screen.getByText('row')).toBeTruthy()
        // The offset plumbing replaces onScroll and sets the throttle.
        expect(list.props.scrollEventThrottle).toBe(16)
        expect(list.props.onScroll).toBeDefined()
    })

    it('is a passthrough outside a sheet', () => {
        render(
            <BlendNativeProvider>
                <BottomSheetScrollable>
                    <ScrollView testID="list">
                        <Text>row</Text>
                    </ScrollView>
                </BottomSheetScrollable>
            </BlendNativeProvider>
        )
        expect(screen.getByText('row')).toBeTruthy()
        // No sheet, no injected throttle — the child renders unchanged.
        expect(
            screen.getByTestId('list').props.scrollEventThrottle
        ).toBeUndefined()
    })
})
