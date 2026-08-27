import { useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

/**
 * The soft keyboard's current height in window points — dependency-free
 * keyboard tracking for overlays.
 *
 * iOS fires `keyboardWillShow/Hide` ahead of the frame change, so an
 * animation started from this state tracks the keyboard closely; Android
 * only has the `Did` events. Height comes from `endCoordinates`, so an iOS
 * keyboard that changes height (emoji pane, autocomplete bar) updates too.
 */
export function useKeyboardHeight(): { height: number; visible: boolean } {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const showEvent =
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        const hideEvent =
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
        const show = Keyboard.addListener(showEvent, (event) => {
            setHeight(event.endCoordinates?.height ?? 0)
        })
        const hide = Keyboard.addListener(hideEvent, () => {
            setHeight(0)
        })
        return () => {
            show.remove()
            hide.remove()
        }
    }, [])

    return { height, visible: height > 0 }
}

export default useKeyboardHeight
