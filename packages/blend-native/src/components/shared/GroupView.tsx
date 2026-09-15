import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import { View } from 'react-native'
import type { View as RNView, StyleProp, ViewStyle } from 'react-native'
import type { ReactNode, ReactElement } from 'react'
import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { getGroupPosition } from './group'

/**
 * Internal container behind `ButtonGroup` and `TagGroup` — the native
 * analogue of web's `Primitives/Group`. Not exported from the package.
 *
 * Mirrors web's behavior exactly:
 * - `stacked` joins members edge to edge (zero gap) and injects each child's
 *   position through `positionProp` via `cloneElement`; the child collapses
 *   its own radius/borders from that prop.
 * - Non-stacked renders children verbatim with a gap — no injection.
 * - Non-element children pass through untouched.
 *
 * Divergence from web's `role="group"` + `aria-label`: the container is
 * deliberately NOT `accessible` — on RN that collapses every member into one
 * accessibility node and makes them individually unreachable (the Alert
 * container regression). `accessibilityLabel` is still set for test hooks
 * and future platform support.
 */

/** Web's Group default gap: `FOUNDATION_THEME.unit[10]`. */
const DEFAULT_GAP = parseDimension(String(FOUNDATION_THEME.unit[10])) ?? 10

export type GroupViewProps = {
    stacked?: boolean
    gap?: number | string
    positionProp: 'buttonGroupPosition' | 'tagGroupPosition'
    children: ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

const GroupView = forwardRef<RNView, GroupViewProps>(function GroupView(
    {
        stacked = false,
        gap,
        positionProp,
        children,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const resolvedGap = stacked ? 0 : (parseDimension(gap) ?? DEFAULT_GAP)

    const totalChildren = Children.count(children)
    const content = stacked
        ? Children.map(children, (child, index) => {
              if (!isValidElement(child)) return child
              return cloneElement(
                  child as ReactElement<Record<string, unknown>>,
                  {
                      [positionProp]: getGroupPosition(index, totalChildren),
                  }
              )
          })
        : children

    return (
        <View
            ref={ref}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    gap: resolvedGap,
                },
                style,
            ]}
        >
            {content}
        </View>
    )
})

export default GroupView
