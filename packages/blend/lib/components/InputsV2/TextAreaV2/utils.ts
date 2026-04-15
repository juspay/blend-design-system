import { toPixels } from '../../../global-utils/GlobalUtils'
import type { TextAreaTokensType } from './TextAreaV2.tokens'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'

export function getTextAreaAriaDescribedBy(
    hintText: string | undefined,
    error: { show: boolean; message?: string },
    hintId: string,
    errorId: string
): string | undefined {
    const ids = [
        hintText && !error.show ? hintId : null,
        error.show && error.message ? errorId : null,
    ].filter(Boolean) as string[]
    return ids.length > 0 ? ids.join(' ') : undefined
}

export function getTextAreaLabelState(
    disabled: boolean | undefined,
    errorShow: boolean,
    isFocused: boolean
): InputStateV2 {
    if (disabled) return InputStateV2.DISABLED
    if (errorShow) return InputStateV2.ERROR
    if (isFocused) return InputStateV2.FOCUS
    return InputStateV2.DEFAULT
}

export type TextAreaInputPadding = {
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
    /** Base top token — FloatingLabelsV2 anchor (not the scaled focused top). */
    floatingLabelTopPadding: number
    floatingLabelLeftPadding: number
}

/**
 * Computes textarea padding from tokens. On small screens when the field has focus or
 * value, top padding increases and bottom goes to 0 to make room for the floating label.
 */
export function getTextAreaInputPadding({
    inputContainer,
    size,
    isSmallScreen,
    inputFocusedOrWithValue,
}: {
    inputContainer: TextAreaTokensType['inputContainer']
    size: InputSizeV2
    isSmallScreen: boolean
    inputFocusedOrWithValue: boolean
}): TextAreaInputPadding {
    const paddingTopBase = toPixels(inputContainer.padding.top[size])
    const paddingBottomBase = toPixels(inputContainer.padding.bottom[size])
    const paddingLeft = toPixels(inputContainer.padding.left[size])
    const paddingRight = toPixels(inputContainer.padding.right[size])

    const isFloating = isSmallScreen && inputFocusedOrWithValue
    const paddingTop = isFloating
        ? paddingTopBase + paddingTopBase
        : paddingTopBase
    const paddingBottom = isFloating ? 0 : paddingBottomBase

    return {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        floatingLabelTopPadding: paddingTopBase,
        floatingLabelLeftPadding: paddingLeft,
    }
}

export type TextAreaInteractionKeys = {
    borderDefault: 'error' | 'default'
    borderHover: 'error' | 'hover'
    borderFocus: 'error' | 'focus'
    bgDefault: 'error' | 'default'
    bgHover: 'error' | 'hover'
    textColorKey: 'disabled' | 'default'
}

export function getTextAreaInteractionKeys(
    errorShow: boolean,
    disabled: boolean | undefined
): TextAreaInteractionKeys {
    return {
        borderDefault: errorShow ? 'error' : 'default',
        borderHover: errorShow ? 'error' : 'hover',
        borderFocus: errorShow ? 'error' : 'focus',
        bgDefault: errorShow ? 'error' : 'default',
        bgHover: errorShow ? 'error' : 'hover',
        textColorKey: disabled ? 'disabled' : 'default',
    }
}

/**
 * Strips TextAreaV2-only props (and `cols`, which this component does not support) so they are
 * never forwarded to a native {@link HTMLTextAreaElement}.
 * Use after extracting top-level props, as a safety net for spreads / future API fields.
 */
export function omitTextAreaV2PrivateProps(
    props: Record<string, unknown>
): Record<string, unknown> {
    const {
        label: _label,
        sublabel: _sublabel,
        hintText: _hintText,
        helpIconHintText: _helpIconHintText,
        helpIconText: _helpIconText,
        error: _error,
        size: _size,
        cols: _cols,
        ...rest
    } = props
    void _label
    void _sublabel
    void _hintText
    void _helpIconHintText
    void _helpIconText
    void _error
    void _size
    void _cols
    return rest
}
