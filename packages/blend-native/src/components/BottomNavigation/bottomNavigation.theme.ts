import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'

/**
 * BottomNavigation's design constants. Web has no bottom tab bar to port
 * tokens from, so — like `sidebar.theme.ts` — this is a small,
 * self-contained set rather than a `useNativeTokens` slot, with every
 * value read straight from `FOUNDATION_THEME` so it tracks the foundation.
 */

const { colors, font, unit, shadows } = FOUNDATION_THEME

/** Foundation units are CSS strings (`"20px"`); the fallback mirrors the key. */
const px = (value: unknown, fallback: number) =>
    parseDimension(String(value)) ?? fallback

export const BOTTOM_NAVIGATION_METRICS = {
    /** Item row height. Clears the 44pt touch-target minimum (`MIN_TOUCH_TARGET`). */
    itemMinHeight: 56,
    /** `unit[20]`. */
    iconSize: px(unit[20], 20),
    /** Icon-to-label gap. `unit[4]`. */
    itemGap: px(unit[4], 4),
    /** `unit[8]`. */
    paddingX: px(unit[8], 8),
    /** Vertical padding around the item row. */
    paddingY: 0,
    /** `font.size.body.xs` — the package's small label size. */
    labelFontSize: px(font.size.body.xs.fontSize, 10),
    labelLineHeight: px(font.size.body.xs.lineHeight, 14),
    /** `font.weight[500]`. */
    labelFontWeight: '500' as const,
    /** `unit[56]` — Material's FAB size. */
    centerActionSize: px(unit[56], 56),
    /** How far the centre button rises above the bar's top edge. `unit[20]`. */
    centerActionLift: px(unit[20], 20),
    /** `unit[24]`. */
    centerActionIconSize: px(unit[24], 24),
    /** Opacity applied to a disabled item. */
    disabledOpacity: 0.5,
}

export type BottomNavigationPalette = {
    background: string
    /** Hairline top border. */
    border: string
    /** Inactive item icon/label. */
    foreground: string
    /** Active item icon/label. */
    activeForeground: string
    /** Pressed-item feedback bg. */
    pressedBackground: string
    centerActionBackground: string
    centerActionPressedBackground: string
    centerActionForeground: string
    /** CSS box-shadow string — `Pressable` translates it per platform. */
    centerActionShadow: string
}

const LIGHT_PALETTE: BottomNavigationPalette = {
    background: String(colors.gray[0]), // gray/0
    border: String(colors.gray[200]), // gray/200
    foreground: String(colors.gray[500]), // gray/500
    activeForeground: String(colors.primary[500]), // primary/500
    pressedBackground: String(colors.gray[50]), // gray/50
    centerActionBackground: String(colors.primary[500]), // primary/500
    centerActionPressedBackground: String(colors.primary[600]), // primary/600
    centerActionForeground: String(colors.gray[0]), // gray/0
    centerActionShadow: String(shadows.lg), // shadows.lg
}

const DARK_PALETTE: BottomNavigationPalette = {
    background: String(colors.gray[900]), // gray/900
    border: String(colors.gray[800]), // gray/800
    foreground: String(colors.gray[400]), // gray/400
    activeForeground: String(colors.primary[400]), // primary/400 — lifted for contrast on gray/900
    pressedBackground: String(colors.gray[800]), // gray/800
    centerActionBackground: String(colors.primary[500]), // primary/500
    centerActionPressedBackground: String(colors.primary[600]), // primary/600
    centerActionForeground: String(colors.gray[0]), // gray/0
    centerActionShadow: String(shadows.lg), // shadows.lg
}

export function getBottomNavigationPalette(
    theme: 'light' | 'dark' | string
): BottomNavigationPalette {
    return theme === 'dark' ? DARK_PALETTE : LIGHT_PALETTE
}
