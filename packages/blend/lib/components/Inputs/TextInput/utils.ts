import { TextInputTokensType } from './textInput.tokens'
import { TextInputGroupPosition, TextInputSize } from './types'

export const getTextInputBorderRadius = (
    size: TextInputSize,
    textInputGroupPosition: TextInputGroupPosition | undefined,
    tokens: TextInputTokensType
): { borderRadius: string; borderRight?: string } => {
    const variantBorderRadius = String(tokens.inputContainer.borderRadius[size])
    const styles = {
        borderRadius: '',
        borderRight: '',
    }
    if (textInputGroupPosition === undefined) {
        return {
            ...styles,
            borderRadius: variantBorderRadius,
            borderRight: '',
        }
    }

    if (textInputGroupPosition === TextInputGroupPosition.LEFT) {
        return {
            ...styles,
            borderRadius: `${variantBorderRadius} 0 0 ${variantBorderRadius}`,
            borderRight: '0px ',
        }
    }

    if (textInputGroupPosition === TextInputGroupPosition.RIGHT) {
        return {
            ...styles,
            borderRadius: `0 ${variantBorderRadius} ${variantBorderRadius} 0`,
            borderRight: '',
        }
    }

    return {
        ...styles,
        borderRadius: '0px 0px 0px 0px',
        borderRight: '0px ',
    }
}
