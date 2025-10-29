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
    tokens?: InputFooterTokens
}

const InputFooter = ({
    error,
    errorMessage,
    hintText,
    disabled,
    tokens,
}: InputFooterProps) => {
    return (
        ((error && errorMessage) || hintText) && (
            <Block width={'100%'}>
                {error && errorMessage && (
                    <Text
                        // variant="body.md"
                        data-form-error={errorMessage}
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
                        // variant="body.md"
                        data-desc-text={hintText}
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
