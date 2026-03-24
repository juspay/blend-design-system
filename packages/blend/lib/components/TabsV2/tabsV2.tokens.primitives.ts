import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'

/**
 * Foundation-backed primitives for TabsV2 (avoids scattering raw CSS keywords in theme files).
 */
export const getTabsV2Primitives = (f: FoundationTokenType) => ({
    /** CSS transparent background */
    clearBg: 'transparent' as CSSObject['backgroundColor'],
    hiddenBorder: 'none' as CSSObject['border'],
    hiddenBorderBottom: 'none' as CSSObject['borderBottom'],
    space0: f.unit[0],
    radiusSharp: f.border.radius[0],
    hairlineSolid: (edgeColor: string) =>
        `${f.border.width[1]} solid ${edgeColor}` as CSSObject['border'],
})
