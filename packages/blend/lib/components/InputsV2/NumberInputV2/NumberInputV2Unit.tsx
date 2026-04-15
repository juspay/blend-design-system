import Block from '../../Primitives/Block/Block'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import Text from '../../Text/Text'
import { NumberInputV2TokensType } from './numberInputV2.tokens'
import { NumberInputV2Direction } from './numberInputV2.types'
import { forwardRef } from 'react'

export type NumberInputV2UnitProps = {
    unit: string
    inputState: InputStateV2
    inputContainerTokens: NumberInputV2TokensType
    size: InputSizeV2
    disabled?: boolean
    unitDirection?: NumberInputV2Direction
}

const NumberInputV2Unit = forwardRef<HTMLDivElement, NumberInputV2UnitProps>(
    function NumberInputV2Unit(
        {
            unit,
            inputState = InputStateV2.DEFAULT,
            inputContainerTokens,
            size,
            disabled,
            unitDirection = NumberInputV2Direction.RIGHT,
        },
        ref
    ) {
        const borderRadius =
            unitDirection === NumberInputV2Direction.RIGHT
                ? `0px ${inputContainerTokens.inputContainer.borderRadius[size]} ${inputContainerTokens.inputContainer.borderRadius[size]} 0px`
                : `${inputContainerTokens.inputContainer.borderRadius[size]} 0px 0px  ${inputContainerTokens.inputContainer.borderRadius[size]}`

        return (
            <Block
                ref={ref}
                data-element="unit"
                data-id={unit || 'unit'}
                position="absolute"
                top={0}
                right={
                    unitDirection === NumberInputV2Direction.RIGHT
                        ? 0
                        : undefined
                }
                bottom={0}
                paddingLeft={inputContainerTokens.unit.paddingLeft[size]}
                paddingRight={inputContainerTokens.unit.paddingRight[size]}
                contentCentered
                borderRadius={borderRadius}
                borderLeft={
                    unitDirection === NumberInputV2Direction.RIGHT
                        ? inputContainerTokens.unit.border[inputState]
                        : undefined
                }
                borderRight={
                    unitDirection === NumberInputV2Direction.LEFT
                        ? inputContainerTokens.unit.border[inputState]
                        : undefined
                }
            >
                <Text
                    fontSize={inputContainerTokens.unit.fontSize[size]}
                    fontWeight={inputContainerTokens.unit.fontWeight[size]}
                    color={
                        inputContainerTokens.unit.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                >
                    {unit}
                </Text>
            </Block>
        )
    }
)

export default NumberInputV2Unit
