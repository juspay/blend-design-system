import type { BlendTokenOverrides } from './types'

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
export const manualDarkOverrides: BlendTokenOverrides = {}
