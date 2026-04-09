import Block from '../../../Primitives/Block/Block'
import Text from '../../../Text/Text'
import { InputSizeV2 } from '../../inputV2.types'
import { addPxToValue } from '../../../../global-utils/GlobalUtils'
import type { InputFooterV2Tokens } from '../../inputV2.tokens'

type InputFooterV2Props = {
    error?: boolean
    errorMessage?: string
    hintText?: string
    errorId?: string
    hintId?: string
    tokens?: InputFooterV2Tokens
    hintTextId?: string
    errorMessageId?: string
    size?: InputSizeV2
}

const InputFooterV2 = ({
    error,
    errorMessage,
    hintText,
    errorId,
    hintId,
    tokens,
    hintTextId,
    errorMessageId,
    size = InputSizeV2.SM,
}: InputFooterV2Props) => {
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
                        color={tokens?.errorMessage.color}
                        fontSize={tokens?.errorMessage?.fontSize[size]}
                        fontWeight={tokens?.errorMessage?.fontWeight[size]}
                        lineHeight={addPxToValue(
                            tokens?.errorMessage?.lineHeight[size]
                        )}
                    >
                        {errorMessage}
                    </Text>
                )}
                {hintText && (
                    <Text
                        id={hintTextId || hintId}
                        data-element="hint-text"
                        data-id={hintText || 'hint-text'}
                        fontWeight={tokens?.hintText?.fontWeight[size]}
                        fontSize={tokens?.hintText?.fontSize[size]}
                        lineHeight={addPxToValue(
                            tokens?.hintText?.lineHeight[size]
                        )}
                        color={
                            error
                                ? (tokens?.hintText?.color?.error ??
                                  tokens?.errorMessage?.color)
                                : tokens?.hintText?.color?.default
                        }
                    >
                        {hintText}
                    </Text>
                )}
            </Block>
        )
    )
}

export default InputFooterV2
