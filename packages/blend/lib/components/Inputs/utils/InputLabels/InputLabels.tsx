import { HelpCircleIcon } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../../tokens'
import Block from '../../../Primitives/Block/Block'
import Text from '../../../Text/Text'
import { Tooltip, TooltipSize } from '../../../Tooltip'

type InputLabelTokens = {
    label?: {
        fontWeight?: number | string
        fontSize?: number | string
        color?: { default?: string; disabled?: string }
    }
    subLabel?: {
        fontWeight?: number | string
        fontSize?: number | string
        color?: { default?: string; disabled?: string }
    }
    required?: {
        color?: string
    }
    helpIcon?: {
        width?: number | string
        color?: { default?: string; disabled?: string }
    }
}

type InputLabelsProps<TTokens extends InputLabelTokens = InputLabelTokens> = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    name?: string
    inputId?: string // Unique ID for input association
    required?: boolean
    tokens?: Partial<TTokens>
    labelId?: string
}

/**
 * @description InputLabels is a component that displays a label and sublabel for an input field.
 * @param {string} label - The label for the input field.
 * @param {string} sublabel - The sublabel for the input field.
 * @param {boolean} disabled - Whether the input field is disabled.
 * @param {string} helpIconHintText - The hint text for the help icon.
 * @param {string} inputId - Unique ID for proper label association (WCAG 3.3.2).
 * @param {boolean} required - Whether the input field is required.
 */
const InputLabels = <TTokens extends InputLabelTokens>({
    label,
    sublabel,
    helpIconHintText,
    name,
    inputId,
    required,
    tokens,
    labelId,
}: InputLabelsProps<TTokens>) => {
    return (
        label && (
            <Block display="flex" alignItems="center" gap={4} width={'100%'}>
                <Text
                    id={labelId}
                    data-element="input-label"
                    data-id={label || 'label'}
                    as="label"
                    htmlFor={inputId || name}
                    // variant="body.md"
                    fontWeight={tokens?.label?.fontWeight}
                    fontSize={
                        tokens?.label?.fontSize ||
                        FOUNDATION_THEME.font.size.body.md.fontSize
                    }
                    color={
                        tokens?.label?.color?.default ||
                        FOUNDATION_THEME.colors.gray[700]
                    }
                    style={{ margin: 0, padding: 0 }}
                >
                    {label}
                </Text>
                {required && (
                    <sup
                        data-element="required-icon"
                        aria-hidden="true"
                        style={{
                            color:
                                tokens?.required?.color ||
                                FOUNDATION_THEME.colors.red[600],
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
                        // variant="body.md"
                        fontWeight={
                            tokens?.subLabel?.fontWeight ||
                            FOUNDATION_THEME.font.weight[400]
                        }
                        fontSize={
                            tokens?.subLabel?.fontSize ||
                            FOUNDATION_THEME.font.size.body.md.fontSize
                        }
                        color={
                            tokens?.subLabel?.color?.default ||
                            FOUNDATION_THEME.colors.gray[400]
                        }
                        margin={0}
                    >
                        ({sublabel})
                    </Text>
                )}

                {helpIconHintText && (
                    <Block data-element="icon" contentCentered size={16}>
                        <Tooltip
                            content={helpIconHintText}
                            size={TooltipSize.SMALL}
                        >
                            <HelpCircleIcon
                                size={
                                    tokens?.helpIcon?.width ||
                                    FOUNDATION_THEME.unit[14]
                                }
                                color={
                                    tokens?.helpIcon?.color?.default ||
                                    FOUNDATION_THEME.colors.gray[400]
                                }
                            />
                        </Tooltip>
                    </Block>
                )}
            </Block>
        )
    )
}

export default InputLabels
