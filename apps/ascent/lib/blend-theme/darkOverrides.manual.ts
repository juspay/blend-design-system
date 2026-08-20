import type { BlendTokenOverrides } from './types'

const WHITE = '#FFFFFF'

/**
 * ChartsV2's dark tokens, after neutralisation: gray[800] for rules and
 * borders, gray[400] for axis labels. V1 is pinned to the same values so the
 * two generations read identically in the docs.
 */
const CHART_RULE = '#1F1F1F'
const CHART_LABEL = '#959595'

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

/**
 * V1's axis colours were hardcoded foundation greys until they were tokenised;
 * the inversion would otherwise land them on #292929, which does not match V2.
 * Both the rules and the surrounding chrome are pinned to V2's resolved values.
 */
const chartDividers = {
    border: `1px solid ${CHART_RULE}`,
    header: {
        borderBottom: `1px solid ${CHART_RULE}`,
    },
    axis: {
        lineColor: CHART_RULE,
        gridLineColor: CHART_RULE,
        labelColor: CHART_LABEL,
    },
}

export const manualDarkOverrides: BlendTokenOverrides = {
    RADIO: {
        sm: radioDot,
        lg: radioDot,
    },
    CHARTS: {
        sm: chartDividers,
        lg: chartDividers,
    },
} as unknown as BlendTokenOverrides
