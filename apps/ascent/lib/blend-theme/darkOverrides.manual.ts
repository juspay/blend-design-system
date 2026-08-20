import type { BlendTokenOverrides } from './types'

const WHITE = '#FFFFFF'

/**
 * Hand-authored corrections merged OVER darkOverrides.generated.ts.
 *
 * The generated values come from a mechanical scale inversion, which is right
 * for most surfaces but cannot know design intent. Put fixes here rather than
 * editing the generated file, which is overwritten on every regeneration.
 *
 * Known candidates for review:
 * - TOOLTIP is already inverted in light mode (dark surface, light text), so
 *   inverting it again yields a white tooltip on a dark page. That is a
 *   conventional treatment, but it is a design call rather than a derivation.
 */

/**
 * The radio's centre dot is primary[600] in light mode -- a blue dot inside a
 * pale blue circle. Inverting keeps it blue, but on dark it should read as a
 * white mark on an accent fill, matching the checkbox tick and switch thumb.
 * Those two are gray[0] already and are excluded from inversion in the
 * generator; this one has to be stated because white is not its light value.
 */
const radioDot = {
    activeIndicator: {
        active: {
            backgroundColor: {
                default: WHITE,
                disabled: WHITE,
            },
        },
    },
}

export const manualDarkOverrides: BlendTokenOverrides = {
    RADIO: {
        sm: radioDot,
        lg: radioDot,
    },
} as unknown as BlendTokenOverrides
