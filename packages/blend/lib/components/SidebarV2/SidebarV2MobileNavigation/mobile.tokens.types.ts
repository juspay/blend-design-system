import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type MobileNavigationV2State = 'default' | 'active'

export type MobileNavigationV2TokenType = {
    /**
     * MobileNavigationV2 anatomy
     * - container: floating dock surface
     * - layout: padding/gaps/safe-area offsets used for height calculations
     * - row: a horizontal strip of items (primary and optional secondary rows)
     * - item: each navigation button
     * - primaryAction: optional center primary action button
     */
    container: {
        zIndex: CSSObject['zIndex']
        /** Base/fallback dock fill; use a color that already includes alpha (e.g. `#RRGGBBAA`). */
        backgroundColor: CSSObject['backgroundColor']
        /** Optional fill when `backdrop-filter` is supported (typically slightly lower alpha). */
        background?: CSSObject['background']
        border: CSSObject['border']
        borderWidth: CSSObject['borderWidth']
        borderRadius: CSSObject['borderRadius']
        backdropFilter: CSSObject['backdropFilter']
        transition: CSSObject['transition']
    }
    layout: {
        safeAreaOffset: CSSObject['padding']
        floatingPadding: CSSObject['padding']
        primaryActionMarginX: CSSObject['margin']
        itemLabelMarginTop: CSSObject['margin']
        itemLabelLineHeight: CSSObject['lineHeight']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        gap: CSSObject['gap']
        rowPaddingTop: CSSObject['paddingTop']
        rowPaddingBottom: CSSObject['paddingBottom']
        rowPaddingLeft: CSSObject['paddingLeft']
        rowPaddingRight: CSSObject['paddingRight']
        rowGap: CSSObject['gap']
    }
    item: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        gap: CSSObject['gap']
        backgroundColor: {
            [key in MobileNavigationV2State]: CSSObject['backgroundColor']
        }
        color: { [key in MobileNavigationV2State]: CSSObject['color'] }
        fontWeight: CSSObject['fontWeight']
        icon: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            transition: CSSObject['transition']
            /** SVG stroke width for Lucide-style icons. */
            strokeWidth: number
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            textAlign: CSSObject['textAlign']
        }
    }
    primaryAction: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        background: CSSObject['background']
        boxShadow: CSSObject['boxShadow']
        color: CSSObject['color']
        icon: {
            width: CSSObject['width']
            height: CSSObject['height']
            strokeWidth: number
        }
    }
}

export type ResponsiveMobileNavigationV2Tokens = {
    [key in keyof BreakpointType]: MobileNavigationV2TokenType
}
