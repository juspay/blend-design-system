import { HelpCircleIcon } from 'lucide-react'
import Block from '../../../Primitives/Block/Block'
import Text from '../../../Text/Text'
import { Tooltip, TooltipSize } from '../../../Tooltip'
import { InputSizeV2, InputStateV2 } from '../../inputV2.types'
import { CSSObject } from 'styled-components'
import { addPxToValue } from '../../../../global-utils/GlobalUtils'

export type InputLabelsV2Tokens = {
    label: {
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
    subLabel: {
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
    required: {
        color: CSSObject['color']
    }
    helpIcon: {
        width: {
            [key in InputSizeV2]: CSSObject['width']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
}

export type InputLabelsV2Props = {
    label?: string
    sublabel?: string
    helpIconText?: {
        text: string
        onClick?: () => void
    }
    name?: string
    inputId?: string
    required?: boolean
    tokens?: InputLabelsV2Tokens
    labelId?: string
    size?: InputSizeV2
    state?: InputStateV2
}
const InputLabelsV2 = ({
    label,
    sublabel,
    helpIconText,
    name,
    inputId,
    required,
    tokens,
    labelId,
    size = InputSizeV2.SM,
    state = InputStateV2.DEFAULT,
}: InputLabelsV2Props) => {
    return (
        label && (
            <Block display="flex" alignItems="center" gap={4} width={'100%'}>
                <Text
                    id={labelId}
                    data-element="input-label"
                    data-id={label || 'label'}
                    as="label"
                    htmlFor={inputId || name}
                    fontWeight={tokens?.label?.fontWeight[size]}
                    fontSize={tokens?.label?.fontSize[size]}
                    color={tokens?.label?.color?.[state]}
                    lineHeight={addPxToValue(tokens?.label?.lineHeight[size])}
                >
                    {label}
                </Text>
                {required && (
                    <sup
                        data-element="required-icon"
                        aria-hidden="true"
                        style={{
                            color: tokens?.required?.color,
                            top: '-1px',
                            left: '-1px',
                        }}
                    >
                        *
                    </sup>
                )}
                {sublabel && (
                    <Text
                        data-element="input-sublabel"
                        data-id={sublabel || 'sublabel'}
                        fontWeight={tokens?.subLabel?.fontWeight[size]}
                        fontSize={tokens?.subLabel?.fontSize[size]}
                        color={tokens?.subLabel?.color?.[state]}
                        lineHeight={addPxToValue(
                            tokens?.subLabel?.lineHeight[size]
                        )}
                    >
                        ({sublabel})
                    </Text>
                )}

                {helpIconText && (
                    <Block
                        data-element="icon"
                        contentCentered
                        size={16}
                        onClick={helpIconText.onClick}
                    >
                        <Tooltip
                            content={helpIconText.text}
                            size={TooltipSize.SMALL}
                        >
                            <HelpCircleIcon
                                size={tokens?.helpIcon?.width[size]}
                                color={tokens?.helpIcon?.color?.[state]}
                            />
                        </Tooltip>
                    </Block>
                )}
            </Block>
        )
    )
}

export default InputLabelsV2
