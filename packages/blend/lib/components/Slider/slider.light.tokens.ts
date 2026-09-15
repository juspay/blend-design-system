import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSliderTokens } from './slider.tokens.types'
import { SliderSize, SliderVariant } from './types'

export const getSliderLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSliderTokens => {
    return {
        sm: {
            [SliderSize.SMALL]: {
                height: foundationToken.unit[20],
                trackHeight: foundationToken.unit[4],
                thumbSize: foundationToken.unit[16],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderSize.MEDIUM]: {
                height: foundationToken.unit[24],
                trackHeight: foundationToken.unit[6],
                thumbSize: foundationToken.unit[20],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderSize.LARGE]: {
                height: foundationToken.unit[28],
                trackHeight: foundationToken.unit[8],
                thumbSize: foundationToken.unit[24],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderVariant.PRIMARY]: {
                trackBackground: foundationToken.colors.gray[200],
                rangeBackground: foundationToken.colors.primary[500],
                thumbBackground: foundationToken.colors.gray[0],
                thumbBorder: foundationToken.colors.primary[500],
                thumbFocusRing: foundationToken.colors.primary[500],
            },
            [SliderVariant.SECONDARY]: {
                trackBackground: foundationToken.colors.gray[200],
                rangeBackground: foundationToken.colors.gray[600],
                thumbBackground: foundationToken.colors.gray[0],
                thumbBorder: foundationToken.colors.gray[600],
                thumbFocusRing: foundationToken.colors.gray[600],
            },
            borderRadius: foundationToken.border.radius[8],
            thumbBorderRadius: foundationToken.border.radius.full,
            thumbBoxShadow: foundationToken.shadows.sm,
            thumbHoverBoxShadow: foundationToken.shadows.md,
            disabledOpacity: foundationToken.opacity[50],
            label: {
                color: foundationToken.colors.gray[600],
                fontSize: foundationToken.font.size.body.xs.fontSize,
                fontWeight: 500,
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                boxShadow: foundationToken.shadows.sm,
                borderRadius: foundationToken.border.radius[4],
                padding: `${foundationToken.unit[2]} ${foundationToken.unit[4]}`,
                margin: foundationToken.unit[4],
            },
        },
        lg: {
            [SliderSize.SMALL]: {
                height: foundationToken.unit[20],
                trackHeight: foundationToken.unit[4],
                thumbSize: foundationToken.unit[16],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderSize.MEDIUM]: {
                height: foundationToken.unit[24],
                trackHeight: foundationToken.unit[6],
                thumbSize: foundationToken.unit[20],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderSize.LARGE]: {
                height: foundationToken.unit[28],
                trackHeight: foundationToken.unit[8],
                thumbSize: foundationToken.unit[24],
                thumbBorder: foundationToken.unit[2],
            },
            [SliderVariant.PRIMARY]: {
                trackBackground: foundationToken.colors.gray[200],
                rangeBackground: foundationToken.colors.primary[500],
                thumbBackground: foundationToken.colors.gray[0],
                thumbBorder: foundationToken.colors.primary[500],
                thumbFocusRing: foundationToken.colors.primary[500],
            },
            [SliderVariant.SECONDARY]: {
                trackBackground: foundationToken.colors.gray[200],
                rangeBackground: foundationToken.colors.gray[600],
                thumbBackground: foundationToken.colors.gray[0],
                thumbBorder: foundationToken.colors.gray[600],
                thumbFocusRing: foundationToken.colors.gray[600],
            },
            borderRadius: foundationToken.border.radius[8],
            thumbBorderRadius: foundationToken.border.radius.full,
            thumbBoxShadow: foundationToken.shadows.sm,
            thumbHoverBoxShadow: foundationToken.shadows.md,
            disabledOpacity: foundationToken.opacity[50],
            label: {
                color: foundationToken.colors.gray[600],
                fontSize: foundationToken.font.size.body.xs.fontSize,
                fontWeight: 500,
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                boxShadow: foundationToken.shadows.sm,
                borderRadius: foundationToken.border.radius[4],
                padding: `${foundationToken.unit[2]} ${foundationToken.unit[4]}`,
                margin: foundationToken.unit[4],
            },
        },
    }
}
