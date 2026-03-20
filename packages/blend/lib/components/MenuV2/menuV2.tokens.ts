import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import type { SelectV2ItemStates } from '../SelectV2/selectV2.tokenStates'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'
import { getMenuV2LightTokens } from './menuV2.light.tokens'
import { getMenuV2DarkTokens } from './menuV2.dark.tokens'

export type { SelectV2ItemStates as MenuV2ItemStates } from '../SelectV2/selectV2.tokenStates'

type StateToken<T> = Record<SelectV2ItemStates, T>

type MenuV2VariantToken<T> = {
    [MenuV2ItemVariant.DEFAULT]: T
    [MenuV2ItemVariant.ACTION]: {
        [MenuV2ItemActionType.PRIMARY]: T
        [MenuV2ItemActionType.DANGER]: T
    }
}

export type MenuV2TokensType = {
    backgroundColor: CSSObject['backgroundColor']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    zIndex: CSSObject['zIndex']

    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']

    paddingTop: CSSObject['paddingTop']
    paddingRight: CSSObject['paddingRight']
    paddingBottom: CSSObject['paddingBottom']
    paddingLeft: CSSObject['paddingLeft']

    searchIcon: {
        width: CSSObject['width']
    }

    group: {
        label: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']

            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']

            marginTop: CSSObject['marginTop']
            marginRight: CSSObject['marginRight']
            marginBottom: CSSObject['marginBottom']
            marginLeft: CSSObject['marginLeft']
        }
        item: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']

            marginTop: CSSObject['marginTop']
            marginRight: CSSObject['marginRight']
            marginBottom: CSSObject['marginBottom']
            marginLeft: CSSObject['marginLeft']

            gap: CSSObject['gap']
            borderRadius: CSSObject['borderRadius']

            backgroundColor: MenuV2VariantToken<
                StateToken<CSSObject['backgroundColor']>
            >

            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']

                color: MenuV2VariantToken<StateToken<CSSObject['color']>>

                subText: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']

                    color: MenuV2VariantToken<StateToken<CSSObject['color']>>
                }

                leftSlot: {
                    maxWidth: CSSObject['maxWidth']
                    maxHeight: CSSObject['maxHeight']
                }

                rightChevron: {
                    color: CSSObject['color']
                    width: CSSObject['width']
                }
            }
        }
    }
    separator: {
        color: CSSObject['color']
        height: CSSObject['height']

        marginTop: CSSObject['marginTop']
        marginRight: CSSObject['marginRight']
        marginBottom: CSSObject['marginBottom']
        marginLeft: CSSObject['marginLeft']
    }
}

export type ResponsiveMenuV2TokensType = {
    [key in keyof BreakpointType]: MenuV2TokensType
}

export const getMenuV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMenuV2TokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMenuV2DarkTokens(foundationToken)
    }
    return getMenuV2LightTokens(foundationToken)
}
