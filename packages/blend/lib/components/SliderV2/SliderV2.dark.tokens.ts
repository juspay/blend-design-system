import { SliderV2TokenType } from './SliderV2.tokens'
import { SliderV2Size, SliderV2Variant, SliderV2State } from './SliderV2.types'
import { FoundationTokenType } from '../../tokens/theme.token'

export const getSliderV2DarkTokens = (
    foundationToken: FoundationTokenType
): SliderV2TokenType => {
    return {
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            touchAction: 'none',
            width: {
                [SliderV2Size.SM]: foundationToken.unit[20],
                [SliderV2Size.MD]: foundationToken.unit[24],
                [SliderV2Size.LG]: foundationToken.unit[28],
            },
            height: {
                [SliderV2Size.SM]: foundationToken.unit[20],
                [SliderV2Size.MD]: foundationToken.unit[24],
                [SliderV2Size.LG]: foundationToken.unit[28],
            },
        },
        track: {
            position: 'relative',
            flexGrow: 1,
            backgroundColor: {
                [SliderV2Variant.PRIMARY]: foundationToken.colors.gray[200],
                [SliderV2Variant.SECONDARY]: foundationToken.colors.gray[800],
            },
            height: {
                [SliderV2Size.SM]: foundationToken.unit[4],
                [SliderV2Size.MD]: foundationToken.unit[6],
                [SliderV2Size.LG]: foundationToken.unit[8],
            },
            borderRadius: foundationToken.border.radius[8],
        },
        range: {
            position: 'absolute',
            backgroundColor: {
                [SliderV2Variant.PRIMARY]: foundationToken.colors.gray[200],
                [SliderV2Variant.SECONDARY]: foundationToken.colors.gray[800],
            },
            height: {
                [SliderV2Size.SM]: foundationToken.unit[4],
                [SliderV2Size.MD]: foundationToken.unit[6],
                [SliderV2Size.LG]: foundationToken.unit[8],
            },
            borderRadius: foundationToken.border.radius[8],
        },
        thumb: {
            display: 'block',
            width: {
                [SliderV2Size.SM]: foundationToken.unit[20],
                [SliderV2Size.MD]: foundationToken.unit[24],
                [SliderV2Size.LG]: foundationToken.unit[28],
            },
            height: {
                [SliderV2Size.SM]: foundationToken.unit[20],
                [SliderV2Size.MD]: foundationToken.unit[24],
                [SliderV2Size.LG]: foundationToken.unit[28],
            },
            backgroundColor: {
                [SliderV2Variant.PRIMARY]: foundationToken.colors.primary[500],
                [SliderV2Variant.SECONDARY]: foundationToken.colors.gray[600],
            },
            border: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius.full,
            boxShadow: foundationToken.shadows.sm,
            cursor: 'pointer',
        },
        cursor: {
            [SliderV2State.DEFAULT]: 'pointer',
            [SliderV2State.HOVER]: 'pointer',
            [SliderV2State.FOCUS]: 'pointer',
            [SliderV2State.FOCUS_VISIBLE]: 'pointer',
            [SliderV2State.ACTIVE]: 'grabbing',
            [SliderV2State.DISABLED]: 'not-allowed',
        },
        boxShadow: {
            [SliderV2State.DEFAULT]: foundationToken.shadows.sm,
            [SliderV2State.HOVER]: foundationToken.shadows.md,
            [SliderV2State.FOCUS]: foundationToken.shadows.md,
            [SliderV2State.FOCUS_VISIBLE]: foundationToken.shadows.md,
            [SliderV2State.ACTIVE]: foundationToken.shadows.md,
            [SliderV2State.DISABLED]: foundationToken.shadows.sm,
        },
        outline: {
            [SliderV2State.DEFAULT]: 'none',
            [SliderV2State.HOVER]: 'none',
            [SliderV2State.FOCUS]: 'none',
            [SliderV2State.FOCUS_VISIBLE]: 'none',
            [SliderV2State.ACTIVE]: 'none',
            [SliderV2State.DISABLED]: 'none',
        },
        opacity: {
            [SliderV2State.DEFAULT]: foundationToken.opacity[100],
            [SliderV2State.HOVER]: foundationToken.opacity[100],
            [SliderV2State.FOCUS]: foundationToken.opacity[100],
            [SliderV2State.FOCUS_VISIBLE]: foundationToken.opacity[100],
            [SliderV2State.ACTIVE]: foundationToken.opacity[100],
            [SliderV2State.DISABLED]: foundationToken.opacity[50],
        },
    }
}
