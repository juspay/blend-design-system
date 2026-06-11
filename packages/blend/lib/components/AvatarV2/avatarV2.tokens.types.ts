import type { CSSObject } from 'styled-components'
import { AvatarV2Size, AvatarV2Shape, AvatarV2Status } from './avatarV2.types'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type AvatarV2TokensType = {
    gap: CSSObject['gap']
    container: {
        backgroundColor: CSSObject['backgroundColor']
        width: {
            [key in AvatarV2Size]: CSSObject['width']
        }
        height: {
            [key in AvatarV2Size]: CSSObject['height']
        }
        borderRadius: {
            [key in AvatarV2Shape]: CSSObject['borderRadius']
        }
        image: {
            border: CSSObject['border']
        }
        fallbackText: {
            border: CSSObject['border']
            fontSize: {
                [key in AvatarV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in AvatarV2Size]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in AvatarV2Size]: CSSObject['lineHeight']
            }
            color: CSSObject['color']
        }

        status: {
            width: {
                [key in AvatarV2Size]: CSSObject['width']
            }
            height: {
                [key in AvatarV2Size]: CSSObject['height']
            }
            border: {
                [key in AvatarV2Size]: CSSObject['border']
            }
            borderRadius: CSSObject['borderRadius']
            backgroundColor: {
                [key in AvatarV2Status]: CSSObject['backgroundColor']
            }
            boxShadow: CSSObject['boxShadow']
            position: {
                [key in AvatarV2Shape]: {
                    [key in AvatarV2Size]: {
                        top?: CSSObject['top']
                        right?: CSSObject['right']
                        bottom?: CSSObject['bottom']
                        left?: CSSObject['left']
                    }
                }
            }
        }
    }

    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
    }
}

export type ResponsiveAvatarV2Tokens = {
    [key in keyof BreakpointType]: AvatarV2TokensType
}
