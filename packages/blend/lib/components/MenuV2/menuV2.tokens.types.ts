import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import type { SelectV2ItemStates } from '../SelectV2/selectV2.tokenStates'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'

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

                /**
                 * Checkmark indicator for `selectionStyle="checkmark"`.
                 * `position` controls leading vs trailing placement.
                 */
                checkmark?: {
                    position: 'leading' | 'trailing'
                    width: CSSObject['width']
                    color: CSSObject['color']
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
