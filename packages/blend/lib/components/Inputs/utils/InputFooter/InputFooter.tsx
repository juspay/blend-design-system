import Block from '../../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../../tokens'
import Text from '../../../Text/Text'

type InputFooterTokens = {
    hintText?: {
        fontWeight?: number | string
        fontSize?: number | string
        color?: { default?: string; disabled?: string }
    }
    errorMessage?: {
        fontWeight?: number | string
        fontSize?: number | string
        color?: string
    }
}

type InputFooterProps = {
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    errorId?: string // Unique ID for error association (WCAG 3.3.1)
    hintId?: string // Unique ID for hint association (WCAG 3.3.2)
    tokens?: InputFooterTokens
    hintTextId?: string
    errorMessageId?: string
}

const InputFooter = ({
    error,
    errorMessage,
    hintText,
    disabled,
    errorId,
    hintId,
    tokens,
    hintTextId,
    errorMessageId,
}: InputFooterProps) => {
    return (
        ((error && errorMessage) || hintText) && (
            <Block width={'100%'}>
                {error && errorMessage && (
                    <Text
                        id={errorMessageId || errorId}
                        role="alert"
                        aria-live="polite"
                        data-element="form-error"
                        data-id={errorMessage || 'error-message'}
                        color={
                            tokens?.errorMessage?.color ||
                            FOUNDATION_THEME.colors.red[600]
                        }
                        fontSize={
                            tokens?.errorMessage?.fontSize ||
                            FOUNDATION_THEME.font.size.body.md.fontSize
                        }
                        fontWeight={
                            tokens?.errorMessage?.fontWeight ||
                            FOUNDATION_THEME.font.weight[500]
                        }
                    >
                        {errorMessage}
                    </Text>
                )}
                {hintText && !error && (
                    <Text
                        id={hintTextId || hintId}
                        // variant="body.md"
                        data-element="hint-text"
                        data-id={hintText || 'hint-text'}
                        fontWeight={
                            tokens?.hintText?.fontWeight ||
                            FOUNDATION_THEME.font.weight[400]
                        }
                        fontSize={
                            tokens?.hintText?.fontSize ||
                            FOUNDATION_THEME.font.size.body.md.fontSize
                        }
                        color={
                            disabled
                                ? tokens?.hintText?.color?.disabled ||
                                  FOUNDATION_THEME.colors.gray[400]
                                : tokens?.hintText?.color?.default ||
                                  FOUNDATION_THEME.colors.gray[500]
                        }
                    >
                        {hintText}
                    </Text>
                )}
            </Block>
        )
    )
}

export default InputFooter
