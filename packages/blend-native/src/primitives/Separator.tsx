import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'
import { parseDimension } from '../adapters/cssStringAdapter'

/**
 * Decorative divider.
 *
 * Native counterpart of web's `components/common/Seperator.tsx` — a fixed-size
 * block of colour used to separate adjacent content. Alert renders one between
 * its actions and its close button when the actions sit inline.
 *
 * Always hidden from assistive tech: it carries no information that the
 * surrounding content does not already convey.
 */

export type SeparatorProps = {
    /** Which way the line runs. Defaults to vertical, as Alert needs. */
    orientation?: 'vertical' | 'horizontal'
    /** Length along the run of the line. Token string or number. */
    length?: string | number
    /** Thickness across the line. Token string or number. */
    thickness?: string | number
    color?: string
    style?: StyleProp<ViewStyle>
    testID?: string
}

const DEFAULT_LENGTH = FOUNDATION_THEME.unit[16]
const DEFAULT_THICKNESS = 1
const DEFAULT_COLOR = String(FOUNDATION_THEME.colors.gray[300])

export function Separator({
    orientation = 'vertical',
    length = DEFAULT_LENGTH,
    thickness = DEFAULT_THICKNESS,
    color = DEFAULT_COLOR,
    style,
    testID,
}: SeparatorProps) {
    const resolvedLength = parseDimension(length as string | number)
    const resolvedThickness = parseDimension(thickness)

    const sizing: ViewStyle =
        orientation === 'vertical'
            ? { width: resolvedThickness, height: resolvedLength }
            : { width: resolvedLength, height: resolvedThickness }

    return (
        <View
            testID={testID}
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={StyleSheet.flatten([
                sizing,
                { backgroundColor: color },
                style,
            ])}
        />
    )
}

Separator.displayName = 'Separator'

export default Separator
