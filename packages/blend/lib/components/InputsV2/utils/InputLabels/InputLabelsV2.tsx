import { HelpCircleIcon } from 'lucide-react'
import Block from '../../../Primitives/Block/Block'
import Text from '../../../Text/Text'
import { Tooltip, TooltipSize } from '../../../Tooltip'
import { InputSizeV2, InputStateV2 } from '../../inputV2.types'
import { addPxToValue } from '../../../../global-utils/GlobalUtils'
import type { InputLabelsV2Tokens } from '../../inputV2.tokens'

export type InputLabelsV2Props = {
    label?: string
    sublabel?: string
    helpIconText?: string
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
                    <Block data-element="icon" contentCentered size={16}>
                        <Tooltip
                            content={helpIconText}
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
