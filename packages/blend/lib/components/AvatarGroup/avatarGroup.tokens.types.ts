import type { CSSObject } from 'styled-components'
import { AvatarSize, AvatarShape } from '../Avatar/types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

/**
 * AvatarGroup Tokens following the design system pattern
 *
 * Structure:
 * - gap: Spacing between avatars in the group
 * - container: Group container properties
 * - avatar: Individual avatar styling within the group
 * - overflowCounter: Overflow counter styling
 */
export type AvatarGroupTokensType = {
    gap: CSSObject['gap']

    container: {
        // Pattern: container.spacing.[size]
        marginLeft: {
            [key in AvatarSize]: CSSObject['margin']
        }
    }

    avatar: {
        // Pattern: avatar.selected
        selected: {
            ringColor: CSSObject['borderColor']
            ringWidth: CSSObject['borderWidth']
            ringOffset: CSSObject['outlineOffset']
            outlineColor: CSSObject['outlineColor']
        }
        // Pattern: avatar.border
        border: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
        }
    }

    overflowCounter: {
        // Pattern: overflowCounter.background.[state]
        background: {
            default: CSSObject['backgroundColor']
            hover: CSSObject['backgroundColor']
            active: CSSObject['backgroundColor']
        }
        // Pattern: overflowCounter.text
        text: {
            color: CSSObject['color']
        }
        // Pattern: overflowCounter.border
        border: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
        }
        // Pattern: overflowCounter.size.[size] (uses avatar sizing)
        size: {
            [key in AvatarSize]: {
                width: CSSObject['width']
                height: CSSObject['height']
                fontSize: CSSObject['fontSize']
            }
        }
        // Pattern: overflowCounter.borderRadius.[shape] (uses avatar shapes)
        borderRadius: {
            [key in AvatarShape]: CSSObject['borderRadius']
        }
    }

    menu: {
        marginTop: CSSObject['margin']
    }
}

export type ResponsiveAvatarGroupTokens = {
    [key in keyof BreakpointType]: AvatarGroupTokensType
}
