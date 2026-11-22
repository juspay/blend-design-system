import React from 'react'
import { figma } from '@figma/code-connect'
import {
    MultiSelectV2,
    MultiSelectV2Size,
    MultiSelectV2Variant,
    MultiSelectV2SelectionTagType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR MULTISELECTV2 COMPONENT
 *
 * Figma component set: "dropdown" (18805:506903) — maps the
 * `dropdownType=multiSelect` variant to MultiSelectV2. The
 * `dropdownType=singleSelect` and `dropdownType=iconOnly` variants are
 * mapped in SingleSelectV2.figma.tsx.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * DIRECT / RENAMED MAPPINGS:
 * - size (VARIANT: lg | md | sm) → size (Code: MultiSelectV2Size enum)
 * - subType (VARIANT: hasContainer | noContainer) → variant
 *   (Code: MultiSelectV2Variant enum)
 * - mandatory (BOOLEAN) → required (Code: boolean)
 * - hasClearButton (BOOLEAN) → showClearButton (Code: boolean)
 * - selectionType (VARIANT: text | default | count) → selectionTagType
 *   (Code: MultiSelectV2SelectionTagType enum)
 *   text → TEXT, count → COUNT, default → COUNT (code default)
 *
 * COMPOUND MAPPINGS:
 * - state (VARIANT: default | hover | open | selected | error | disable):
 *   - error → error: { show: true, message: 'Something went wrong' }
 *   - disable → disabled: true
 *   - default/hover/open/selected → interaction states (CSS-only, unmapped)
 *   Split into two figma.enum calls: errorState + isDisabled.
 *
 * BOOLEAN-GATED TEXT MAPPINGS:
 * - hasLabel (BOOLEAN) → label (Code: string, always provided)
 *   label is a required prop in MultiSelectV2; hasLabel is a design toggle
 *   that controls visibility in Figma. A sample 'Label' is always provided.
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
 *
 * CODE-ONLY PROPERTIES (not in Figma):
 * - placeholder: Required string shown when no items are selected.
 * - items: Data array (MultiSelectV2GroupType[]).
 * - selectedValues: Required string array (currently selected values).
 * - onSelectionChange: Callback receiving the full selection array.
 * - search: Search configuration object.
 * - Various action/virtualization props.
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

figma.connect(
    MultiSelectV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-506903',
    {
        variant: { dropdownType: 'multiSelect' },

        props: {
            size: figma.enum('size', {
                lg: MultiSelectV2Size.LG,
                md: MultiSelectV2Size.MD,
                sm: MultiSelectV2Size.SM,
            }),

            variant: figma.enum('subType', {
                hasContainer: MultiSelectV2Variant.CONTAINER,
                noContainer: MultiSelectV2Variant.NO_CONTAINER,
            }),

            label: figma.boolean('hasLabel', {
                true: 'Label',
                false: 'Label',
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

            showClearButton: figma.boolean('hasClearButton'),

            selectionTagType: figma.enum('selectionType', {
                text: MultiSelectV2SelectionTagType.TEXT,
                default: MultiSelectV2SelectionTagType.COUNT,
                count: MultiSelectV2SelectionTagType.COUNT,
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
            showClearButton,
            selectionTagType,
            errorState,
            isDisabled,
        }) => (
            <MultiSelectV2
                label={label}
                placeholder="Select options"
                items={SAMPLE_ITEMS}
                selectedValues={['option1']}
                onSelectionChange={() => {}}
                size={size}
                variant={variant}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                helpIconText={helpIconText}
                slot={slot}
                showClearButton={showClearButton}
                selectionTagType={selectionTagType}
                error={errorState}
                disabled={isDisabled}
            />
        ),

        imports: [
            "import { MultiSelectV2, MultiSelectV2Size, MultiSelectV2Variant, MultiSelectV2SelectionTagType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/MultiSelectV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-multiselectv2--docs',
            },
        ],
    }
)
