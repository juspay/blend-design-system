import React from 'react'
import { figma } from '@figma/code-connect'
import {
    ProgressBarV2,
    ProgressBarV2Size,
    ProgressBarV2Variant,
    ProgressBarV2Appearance,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR PROGRESSBARV2 COMPONENT
 *
 * Two Figma component sets map to the same ProgressBarV2 code component:
 *
 * 1. "Progress bar" (18805:776558) — linear bar
 * 2. "progressCircle" (18805:779973) — circular ring
 *
 * PROP MAPPING DOCUMENTATION
 *
 * RENAMED MAPPINGS:
 * - type (Figma: 'solid' | 'segmented') → appearance (Code:
 *   ProgressBarV2Appearance.SOLID | SEGMENTED)
 *   NOTE: Figma calls the fill style "type"; code calls it "appearance".
 *   Code's "variant" prop (LINEAR | CIRCULAR) is hardcoded per component
 *   set — LINEAR for the bar, CIRCULAR for the ring.
 *
 * VALUE MAPPINGS:
 * - progress (Figma: '0%' | '20%' | '40%' | '60%' | '80%' | '100%')
 *   → value (Code: number 0–100)
 *   The Figma variant option includes a '%' suffix that must be stripped.
 *
 * DIRECT MAPPINGS:
 * - size (Figma) → size (Code)
 *   Bar: 'sm' | 'md' → ProgressBarV2Size.SM | MD
 *   Circle: 'sm' | 'md' | 'lg' → ProgressBarV2Size.SM | MD | LG
 *
 * VARIANT-AS-BOOLEAN MAPPING:
 * - label (Figma VARIANT 'true' | 'false') → showLabel (Code: boolean)
 *   Figma stores this as a VARIANT, not BOOLEAN, so figma.enum is used
 *   instead of figma.boolean.
 */

// ─── Linear Progress Bar ───────────────────────────────────────────

figma.connect(
    ProgressBarV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-776558',
    {
        props: {
            // Hardcoded: this is the linear bar component set
            variant: ProgressBarV2Variant.LINEAR,

            // Renamed: type (Figma) → appearance (Code)
            appearance: figma.enum('type', {
                solid: ProgressBarV2Appearance.SOLID,
                segmented: ProgressBarV2Appearance.SEGMENTED,
            }),

            // Value: strip '%' suffix from Figma variant option
            value: figma.enum('progress', {
                '0%': 0,
                '20%': 20,
                '40%': 40,
                '60%': 60,
                '80%': 80,
                '100%': 100,
            }),

            // Direct mapping
            size: figma.enum('size', {
                sm: ProgressBarV2Size.SM,
                md: ProgressBarV2Size.MD,
            }),

            // VARIANT-as-boolean: label is VARIANT ('true'/'false'), not BOOLEAN
            showLabel: figma.enum('label', {
                true: true,
                false: false,
            }),
        },

        example: ({ variant, appearance, value, size, showLabel }) => (
            <ProgressBarV2
                variant={variant}
                appearance={appearance}
                value={value}
                size={size}
                showLabel={showLabel}
            />
        ),

        imports: [
            "import { ProgressBarV2, ProgressBarV2Variant, ProgressBarV2Appearance, ProgressBarV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ProgressBarV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-progressbarv2--docs',
            },
        ],
    }
)

// ─── Circular Progress Ring ────────────────────────────────────────

figma.connect(
    ProgressBarV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-779973',
    {
        props: {
            // Hardcoded: this is the circular ring component set
            variant: ProgressBarV2Variant.CIRCULAR,

            // Renamed: type (Figma) → appearance (Code)
            appearance: figma.enum('type', {
                solid: ProgressBarV2Appearance.SOLID,
                segmented: ProgressBarV2Appearance.SEGMENTED,
            }),

            // Direct mapping — circle adds 'lg' size
            size: figma.enum('size', {
                sm: ProgressBarV2Size.SM,
                md: ProgressBarV2Size.MD,
                lg: ProgressBarV2Size.LG,
            }),
        },

        example: ({ variant, appearance, size }) => (
            <ProgressBarV2
                variant={variant}
                appearance={appearance}
                value={60}
                size={size}
                showLabel={false}
            />
        ),

        imports: [
            "import { ProgressBarV2, ProgressBarV2Variant, ProgressBarV2Appearance, ProgressBarV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ProgressBarV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-progressbarv2--docs',
            },
        ],
    }
)
