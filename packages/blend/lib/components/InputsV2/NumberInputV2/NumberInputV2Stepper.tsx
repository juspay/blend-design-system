import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { NumberInputV2TokensType } from './numberInputV2.tokens'
import { InputSizeV2 } from '../inputV2.types'
import { StepperArrow } from './StepperArrow'

type NumberInputV2StepperProps = {
    labelText: string
    disabled?: boolean
    borderState: 'default' | 'error'
    isUpButtonDisabled: boolean
    isDownButtonDisabled: boolean
    onStep: (direction: 'up' | 'down') => void
    inputContainerTokens: NumberInputV2TokensType
    size: InputSizeV2
}

const NumberInputV2Stepper = ({
    labelText,
    disabled,
    borderState,
    isUpButtonDisabled,
    isDownButtonDisabled,
    onStep,
    inputContainerTokens,
    size,
}: NumberInputV2StepperProps) => {
    const sb = inputContainerTokens.inputContainer.stepperButton
    const border = inputContainerTokens.inputContainer.border
    const radius = inputContainerTokens.inputContainer.borderRadius[size]
    const stepperSize = sb.width[size]
    const iconSize = sb.icon.width[size] ?? 0
    const iconDefault = sb.icon.color.default
    const iconDisabled = sb.icon.color.disabled

    const stepperArrowProps = {
        size: iconSize,
        colorDefault: iconDefault,
        colorDisabled: iconDisabled,
    }

    return (
        <Block
            data-element="stepper"
            display="flex"
            flexDirection="column"
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            margin={1}
        >
            <Block
                display="flex"
                flexDirection="column"
                gap={1}
                as="span"
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                zIndex={1}
                borderLeft={disabled ? border.disabled : border[borderState]}
            />
            <PrimitiveButton
                type="button"
                aria-label={
                    labelText ? `Increase ${labelText}` : 'Increase value'
                }
                onClick={() => onStep('up')}
                backgroundColor={sb.backgroundColor.default}
                width={stepperSize}
                height={stepperSize}
                contentCentered
                borderRadius={`0 ${radius} 0 0`}
                disabled={disabled || isUpButtonDisabled}
                _focus={{
                    backgroundColor: sb.backgroundColor.focus,
                }}
                _hover={{
                    backgroundColor: sb.backgroundColor.hover,
                }}
                _disabled={{
                    backgroundColor: disabled
                        ? sb.backgroundColor.disabled
                        : sb.backgroundColor.default,
                    cursor: 'not-allowed',
                }}
            >
                <StepperArrow
                    disabled={disabled}
                    dimmed={isUpButtonDisabled}
                    {...stepperArrowProps}
                />
            </PrimitiveButton>
            <PrimitiveButton
                type="button"
                aria-label={
                    labelText ? `Decrease ${labelText}` : 'Decrease value'
                }
                onClick={() => onStep('down')}
                backgroundColor={sb.backgroundColor.default}
                width={stepperSize}
                height={stepperSize}
                contentCentered
                borderRadius={`0 0 ${radius} 0`}
                _focus={{
                    backgroundColor: sb.backgroundColor.focus,
                }}
                _hover={{
                    backgroundColor: sb.backgroundColor.hover,
                    borderTop: border.disabled,
                }}
                _disabled={{
                    backgroundColor: disabled
                        ? sb.backgroundColor.disabled
                        : sb.backgroundColor.default,
                    borderTop: border.disabled,
                    cursor: 'not-allowed',
                }}
                borderTop={border.disabled}
                disabled={disabled || isDownButtonDisabled}
            >
                <StepperArrow
                    disabled={disabled}
                    dimmed={isDownButtonDisabled}
                    flip
                    {...stepperArrowProps}
                />
            </PrimitiveButton>
        </Block>
    )
}

export default NumberInputV2Stepper
