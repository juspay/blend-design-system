import { type DimensionValue } from 'react-native'
import { parseDimension } from '../../../adapters/cssStringAdapter'
import { Separator } from '../../../primitives/Separator'

/**
 * Divider between dropdown groups. Renders as a thin horizontal line.
 */
export type DropdownSeparatorProps = {
    color: string
    height?: string | number
    margin?: string | number
    testID?: string
}

export function DropdownSeparator({
    color,
    height = 1,
    margin,
    testID,
}: DropdownSeparatorProps) {
    const marginValue = parseDimension(margin) as DimensionValue | undefined
    return (
        <Separator
            orientation="horizontal"
            length="100%"
            thickness={height}
            color={color}
            style={
                marginValue != null
                    ? { marginVertical: marginValue }
                    : undefined
            }
            testID={testID}
        />
    )
}

DropdownSeparator.displayName = 'DropdownSeparator'
