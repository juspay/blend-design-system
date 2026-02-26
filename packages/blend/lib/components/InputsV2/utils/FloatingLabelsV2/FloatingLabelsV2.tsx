import Text from '../../../Text/Text'
import Block from '../../../Primitives/Block/Block'
import { InputSizeV2, InputStateV2 } from '../../inputV2.types'
import { CSSObject } from 'styled-components'
import { addPxToValue } from '../../../../global-utils/GlobalUtils'

export type FloatingLabelsV2Tokens = {
    placeholder: {
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
    }
    required: {
        color: CSSObject['color']
    }
}

const FloatingLabelsV2 = ({
    label,
    required,
    name,
    inputId,
    isInputFocusedOrWithValue = false,
    topPadding,
    leftPadding,
    tokens,
    size,
    state,
}: {
    label: string
    required: boolean
    name: string
    inputId: string
    isInputFocusedOrWithValue: boolean
    topPadding: number
    leftPadding: number
    tokens: FloatingLabelsV2Tokens
    size: InputSizeV2
    state: InputStateV2
}) => {
    const top = isInputFocusedOrWithValue ? topPadding : '50%'

    return (
        <Block
            data-element="label"
            position="absolute"
            top={top}
            left={leftPadding}
            height="max-content"
            zIndex={1}
            style={{
                transition: 'all 0.2s ease-in-out',
                transform: 'translateY(-50%)',
                transformOrigin: 'left center',
                pointerEvents: 'none',
            }}
        >
            <Block display="flex" alignItems="center" gap={4} width="100%">
                <Text
                    id={label || 'label'}
                    data-element="floating-label"
                    data-id={label || 'label'}
                    as="label"
                    htmlFor={inputId || name}
                    fontWeight={tokens.placeholder.fontWeight[size]}
                    fontSize={
                        isInputFocusedOrWithValue
                            ? '12px'
                            : tokens.placeholder.fontSize[size]
                    }
                    lineHeight={
                        isInputFocusedOrWithValue
                            ? '18px'
                            : addPxToValue(tokens.placeholder.lineHeight[size])
                    }
                    color={tokens.placeholder.color[state]}
                    style={{
                        transition:
                            'font-size 0.2s ease-in-out, line-height 0.2s ease-in-out, font-weight 0.2s ease-in-out',
                    }}
                >
                    {label}
                </Text>
                {required && (
                    <sup
                        data-element="required-icon"
                        aria-hidden="true"
                        style={{
                            color: tokens.required.color,
                            top: '-1px',
                            left: '-1px',
                        }}
                    >
                        *
                    </sup>
                )}
            </Block>
        </Block>
    )
}

export default FloatingLabelsV2
