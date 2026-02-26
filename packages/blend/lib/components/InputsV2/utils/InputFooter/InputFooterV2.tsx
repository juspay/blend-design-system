import { CSSObject } from 'styled-components'
import Block from '../../../Primitives/Block/Block'
import Text from '../../../Text/Text'
import { InputSizeV2, InputStateV2 } from '../../inputV2.types'
import { addPxToValue } from '../../../../global-utils/GlobalUtils'

type InputFooterV2Tokens = {
    hintText: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: CSSObject['color']
    }
}

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
                {hintText && !error && (
                    <Text
                        id={hintTextId || hintId}
                        data-element="hint-text"
                        data-id={hintText || 'hint-text'}
                        fontWeight={tokens?.hintText?.fontWeight[size]}
                        fontSize={tokens?.hintText?.fontSize[size]}
                        color={tokens?.hintText?.color?.default}
                    >
                        {hintText}
                    </Text>
                )}
            </Block>
        )
    )
}

export default InputFooterV2
