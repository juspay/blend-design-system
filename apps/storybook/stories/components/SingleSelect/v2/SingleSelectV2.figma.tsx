import React from 'react'
import { figma } from '@figma/code-connect'
import {
    SingleSelectV2,
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SINGLESELECTV2 COMPONENT
 *
 * Figma component set: "dropdown" (18805:506903) — a large set with 262
 * variant combinations. This file maps the `dropdownType=singleSelect` and
 * `dropdownType=iconOnly` variants to SingleSelectV2. The
 * `dropdownType=multiSelect` variant is mapped in MultiSelectV2.figma.tsx.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * DIRECT / RENAMED MAPPINGS:
 * - size (VARIANT: lg | md | sm) → size (Code: SingleSelectV2Size enum)
 * - subType (VARIANT: hasContainer | noContainer) → variant
 *   (Code: SingleSelectV2Variant enum)
 * - mandatory (BOOLEAN) → required (Code: boolean)
 *
 * COMPOUND MAPPINGS:
 * - state (VARIANT: default | hover | open | selected | error | disable):
 *   - error → error: { show: true, message: 'Something went wrong' }
 *   - disable → disabled: true
 *   - default/hover/open/selected → interaction states (CSS-only, unmapped)
 *   Split into two figma.enum calls: errorState + isDisabled.
 *
 * BOOLEAN-GATED TEXT MAPPINGS:
 * - hasLabel (BOOLEAN) → label (Code: string | undefined)
 * - hasSubLabel (BOOLEAN) → subLabel (Code: string | undefined)
 * - hasHint (BOOLEAN) → hintText (Code: string | undefined)
 * - hasHelp (BOOLEAN) → helpIconText (Code: string | undefined)
 *   Figma has no TEXT props for these; sample text provided when true.
 *
 * BOOLEAN-GATED INSTANCE MAPPINGS:
 * - hasLeftIcon (BOOLEAN) + leftIcon (INSTANCE_SWAP) → slot (Code: ReactNode)
 *   The Figma instance is rendered when hasLeftIcon is true.
 *
 * UNMAPPED FIGMA PROPS:
 * - display (VARIANT: mobile | web) — platform flag; mobile is automatic
 *   via breakpoint detection in code, not a prop.
 * - hasClearButton (BOOLEAN) — SingleSelectV2 has no showClearButton prop
 *   (that is a MultiSelectV2-only prop).
 * - selectionType (VARIANT: text | default | count) — MultiSelectV2-only
 *   (selectionTagType); not applicable to SingleSelectV2.
 *
 * CODE-ONLY PROPERTIES (not in Figma):
 * - placeholder: Required string shown when no item is selected.
 * - items: Required data array (SingleSelectV2GroupType[]).
 * - selected: Required string (the currently selected value).
 * - onSelect: Required callback.
 * - customTrigger: ReactElement replacing the default trigger (iconOnly).
 */

const SAMPLE_ITEMS = [
    {
        items: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ],
    },
]

const sampleSelectProps = {
    placeholder: 'Select an option',
    items: SAMPLE_ITEMS,
    selected: 'option1',
    onSelect: () => {},
}

// ─── SingleSelect (dropdownType=singleSelect) ───────────────────────

figma.connect(
    SingleSelectV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-506903',
    {
        variant: { dropdownType: 'singleSelect' },

        props: {
            size: figma.enum('size', {
                lg: SingleSelectV2Size.LG,
                md: SingleSelectV2Size.MD,
                sm: SingleSelectV2Size.SM,
            }),

            variant: figma.enum('subType', {
                hasContainer: SingleSelectV2Variant.CONTAINER,
                noContainer: SingleSelectV2Variant.NO_CONTAINER,
            }),

            label: figma.boolean('hasLabel', {
                true: 'Label',
                false: undefined,
            }),

            subLabel: figma.boolean('hasSubLabel', {
                true: 'Sub label',
                false: undefined,
            }),

            hintText: figma.boolean('hasHint', {
                true: 'Hint text',
                false: undefined,
            }),

            required: figma.boolean('mandatory'),

            helpIconText: figma.boolean('hasHelp', {
                true: 'Help text',
                false: undefined,
            }),

            slot: figma.boolean('hasLeftIcon', {
                true: figma.instance('leftIcon'),
                false: undefined,
            }),

            errorState: figma.enum('state', {
                default: undefined,
                hover: undefined,
                open: undefined,
                selected: undefined,
                error: { show: true, message: 'Something went wrong' },
                disable: undefined,
            }),

            isDisabled: figma.enum('state', {
                default: false,
                hover: false,
                open: false,
                selected: false,
                error: false,
                disable: true,
            }),
        },

        example: ({
            size,
            variant,
            label,
            subLabel,
            hintText,
            required,
            helpIconText,
            slot,
            errorState,
            isDisabled,
        }) => (
            <SingleSelectV2
                {...sampleSelectProps}
                size={size}
                variant={variant}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                helpIconText={helpIconText}
                slot={slot}
                error={errorState}
                disabled={isDisabled}
            />
        ),

        imports: [
            "import { SingleSelectV2, SingleSelectV2Size, SingleSelectV2Variant } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SingleSelectV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-singleselectv2--docs',
            },
        ],
    }
)

// ─── Icon-Only Dropdown (dropdownType=iconOnly) ─────────────────────

figma.connect(
    SingleSelectV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-506903',
    {
        variant: { dropdownType: 'iconOnly' },

        props: {
            size: figma.enum('size', {
                lg: SingleSelectV2Size.LG,
                md: SingleSelectV2Size.MD,
                sm: SingleSelectV2Size.SM,
            }),

            variant: figma.enum('subType', {
                hasContainer: SingleSelectV2Variant.CONTAINER,
                noContainer: SingleSelectV2Variant.NO_CONTAINER,
            }),

            slot: figma.boolean('hasLeftIcon', {
                true: figma.instance('leftIcon'),
                false: undefined,
            }),

            errorState: figma.enum('state', {
                default: undefined,
                hover: undefined,
                open: undefined,
                selected: undefined,
                error: { show: true, message: 'Something went wrong' },
                disable: undefined,
            }),

            isDisabled: figma.enum('state', {
                default: false,
                hover: false,
                open: false,
                selected: false,
                error: false,
                disable: true,
            }),
        },

        example: ({ size, variant, slot, errorState, isDisabled }) => (
            <SingleSelectV2
                {...sampleSelectProps}
                size={size}
                variant={variant}
                slot={slot}
                error={errorState}
                disabled={isDisabled}
                customTrigger={<button aria-label="Open dropdown">⋯</button>}
            />
        ),

        imports: [
            "import { SingleSelectV2, SingleSelectV2Size, SingleSelectV2Variant } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SingleSelectV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-singleselectv2--docs',
            },
        ],
    }
)
