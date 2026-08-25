import {
    InputSizeV2,
    InputStateV2,
    type TextInputV2TokensType,
} from '@juspay/blend-design-system/node'

/**
 * Native TextInputV2 style resolver.
 *
 * Reimplements the inline resolution `TextInputV2.tsx` performs for RN. Web
 * expresses hover/focus through styled-components pseudo-state objects; on
 * native the field re-resolves against the current visual state (focus
 * tracked in component state), so this returns plain token strings for one
 * state at a time — the pattern `getButtonNativeStyles` set.
 */

export type TextInputNativeStyles = {
    /** Outer column: label / field / footer. */
    gap: string
    /** The bordered field row. */
    container: {
        border: string
        backgroundColor: string
        borderRadius: string
        gap: string
        paddingTop: string
        paddingRight: string
        paddingBottom: string
        paddingLeft: string
    }
    /** The editable text. */
    text: {
        fontSize: string
        fontWeight: string
        lineHeight: string
        color: string
    }
    placeholderColor: string
}

export function getTextInputNativeStyles(
    tokens: TextInputV2TokensType,
    size: InputSizeV2,
    visualState: InputStateV2
): TextInputNativeStyles {
    const container = tokens.inputContainer

    return {
        gap: String(tokens.gap),
        container: {
            border: String(container.border[visualState]),
            backgroundColor: String(container.backgroundColor[visualState]),
            borderRadius: String(container.borderRadius[size]),
            gap: String(container.gap),
            paddingTop: String(container.padding.top[size]),
            paddingRight: String(container.padding.right[size]),
            paddingBottom: String(container.padding.bottom[size]),
            paddingLeft: String(container.padding.left[size]),
        },
        text: {
            fontSize: String(container.inputText.fontSize[size]),
            fontWeight: String(container.inputText.fontWeight[size]),
            lineHeight: String(container.inputText.lineHeight[size]),
            color: String(container.inputText.color[visualState]),
        },
        placeholderColor: String(container.placeholder.color[visualState]),
    }
}
