import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { UnitInputV2Position } from './UnitInputV2.types'
import { UnitSideSlotProps } from './UnitInputV2.types'

const UnitSideSlot = ({
    side,
    unitLabel,
    size,
    disabled,
    unitRef,
    ic,
}: UnitSideSlotProps) => {
    const isRight = side === UnitInputV2Position.RIGHT
    const radius = ic.borderRadius[size]
    const borderRadius = isRight
        ? `0px ${radius} ${radius} 0px`
        : `${radius} 0px 0px ${radius}`

    return (
        <Block
            data-element="unit"
            data-id={unitLabel || 'unit'}
            ref={unitRef}
            position="absolute"
            top={0}
            bottom={0}
            {...(isRight ? { right: 0 } : { left: 0 })}
            paddingX={ic.unit.padding[size]}
            margin={1}
            contentCentered
            backgroundColor={ic.unit.backgroundColor.default}
            borderLeft={isRight ? ic.border.default : undefined}
            borderRight={isRight ? undefined : ic.border.default}
            borderRadius={borderRadius}
        >
            <Text
                fontSize={ic.unit.fontSize[size]}
                fontWeight={ic.unit.fontWeight[size]}
                color={ic.unit.color[disabled ? 'disabled' : 'default']}
            >
                {unitLabel}
            </Text>
        </Block>
    )
}

export default UnitSideSlot
