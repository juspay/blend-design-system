import { cloneElement, isValidElement } from 'react'
import type { ReactNode, ReactElement } from 'react'

/**
 * Icon tinting.
 *
 * Kept in its own leaf module — importing nothing from `react-native` — so it
 * stays unit-testable outside a renderer, the same split as
 * `theme/breakpoint.ts` and `primitives/touchTarget.ts`.
 */

/**
 * Props an icon element may accept for tinting.
 *
 * `color` is the channel every mainstream RN icon library understands —
 * `lucide-react-native`, `phosphor-react-native`, `react-native-vector-icons`
 * — and is what `Slot` sets.
 *
 * `fill` is deliberately NOT set. Lucide renders stroke-based artwork with
 * `fill: "none"`, and its `Icon` spreads unknown props over both the root
 * `Svg` and every child path *after* those defaults, so supplying a `fill`
 * overrides `"none"` and floods the glyph solid — an outlined X becomes a
 * filled block. Artwork that genuinely needs a fill should set it itself.
 */
type TintableProps = { color?: string }

/**
 * Apply a tint to an icon element.
 *
 * Only sets `color`, and only when the element has not set it explicitly —
 * an icon rendered as `<Icon color="red" />` keeps red. Non-element children
 * (a bare string, a number, `null`) are returned untouched.
 */
export function tintSlot(
    node: ReactNode,
    color: string | undefined
): ReactNode {
    if (!color || !isValidElement(node)) return node

    const element = node as ReactElement<TintableProps>
    if (element.props.color !== undefined) return node

    return cloneElement(element, { color })
}
