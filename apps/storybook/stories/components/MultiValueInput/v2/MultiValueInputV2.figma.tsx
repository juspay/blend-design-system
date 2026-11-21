import React from 'react'
import { figma } from '@figma/code-connect'
import {
    MultiValueInputV2,
    InputSizeV2,
    TagSize,
    TagShape,
    TagVariant,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR MULTIVALUEINPUTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - size (Figma) → size (Code), but enum changed: TextInputSize → InputSizeV2
 *      - md → InputSizeV2.MD
 *      - lg → InputSizeV2.LG
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - label → label
 *    - sublabel → sublabel (V2 keeps the lowercase `sublabel` prop name)
 *    - hintText → hintText
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      The V2 component has no `state` prop; it derives state internally from
 *      the `error` and `disabled` booleans. `InputStateV2` is an internal enum
 *      (not exported from the package), so each Figma state value maps to the
 *      corresponding boolean flags:
 *      - state=error → error=true, disabled=false
 *      - state=disabled → error=false, disabled=true
 *      - state=default/hover/active/focussed → error=false, disabled=false
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction states (hover, focus, active) are handled
 *      automatically by the component; only error/disabled are exposed.
 *    - placeholder: Not a component property on this layer.
 *    - rightSlot, leftSlot, showRightSlot, showLeftSlot: Slot visibility is
 *      derived from whether a slot is passed.
 *    - showInfo: Help icon is shown when `helpIconHintText` is provided.
 *    - showLabel, showSublabel, showHint: Visibility is derived from presence
 *      of the corresponding text prop.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled input value.
 *    - tags: Object of shape { value: string[], size: TagSize, shape: TagShape,
 *      variant: TagVariant } (V2 changed from a plain string[] to a structured
 *      object so each chip's appearance is configurable).
 *    - onChange: Input change callback.
 *    - onTagAdd, onTagRemove: Tag add/remove callbacks.
 *    - errorMessage: Error message text shown when `error` is true.
 *    - helpIconHintText: Tooltip text for the help icon.
 *    - leftSlot, rightSlot: ReactNode content slots.
 */

// Base connection
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping (enum changed from TextInputSize to InputSizeV2)
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // State → error/disabled boolean flags (no `state` prop in V2)
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by the component
            // - placeholder: Not available on this layer
            // - rightSlot, leftSlot: Derived from presence of slot content
            // - showRightSlot, showLeftSlot: Derived from slot presence
            // - showInfo: Derived from helpIconHintText presence
            // - showLabel, showSublabel, showHint: Derived from text presence
        },

        example: ({ size, label, sublabel, hintText, error, disabled }) => (
            <MultiValueInputV2
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),

        imports: [
            "import { MultiValueInputV2, InputSizeV2, TagSize, TagShape, TagVariant } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/MultiValueInputV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-multivalueinputv2--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: true },
        props: {
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ size, label, sublabel, hintText, error, disabled }) => (
            <MultiValueInputV2
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ size, hintText, error, disabled }) => (
            <MultiValueInputV2
                size={size}
                hintText={hintText}
                error={error}
                disabled={disabled}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Error state
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { state: 'error' },
        props: {
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            disabled: false,
        },
        example: ({ size, label, sublabel, hintText }) => (
            <MultiValueInputV2
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={true}
                disabled={false}
                errorMessage="Please add at least one value"
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Disabled state
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { state: 'disabled' },
        props: {
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: false,
        },
        example: ({ size, label, sublabel, hintText }) => (
            <MultiValueInputV2
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={false}
                disabled={true}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ label, sublabel, hintText, error, disabled }) => (
            <MultiValueInputV2
                size={InputSizeV2.MD}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    MultiValueInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12827&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ label, sublabel, hintText, error, disabled }) => (
            <MultiValueInputV2
                size={InputSizeV2.LG}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                value=""
                tags={{
                    value: ['Design', 'Research'],
                    size: TagSize.XS,
                    shape: TagShape.ROUNDED,
                    variant: TagVariant.SUBTLE,
                }}
                onChange={() => {}}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

/**
 * Example of MultiValueInputV2 usage in code:
 *
 * import { useState } from 'react'
 * import {
 *   MultiValueInputV2,
 *   InputSizeV2,
 *   TagSize,
 *   TagShape,
 *   TagVariant,
 * } from '@juspay/blend-design-system'
 *
 * // Basic usage
 * const [value, setValue] = useState('')
 * const [tags, setTags] = useState<string[]>(['Design', 'Research'])
 *
 * <MultiValueInputV2
 *   label="Skills"
 *   sublabel="Add your skills"
 *   hintText="Press Enter to add a skill"
 *   size={InputSizeV2.MD}
 *   value={value}
 *   onChange={setValue}
 *   tags={{
 *     value: tags,
 *     size: TagSize.XS,
 *     shape: TagShape.ROUNDED,
 *     variant: TagVariant.SUBTLE,
 *   }}
 *   onTagAdd={(tag) => setTags((prev) => [...prev, tag])}
 *   onTagRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
 * />
 *
 * // With error state
 * <MultiValueInputV2
 *   label="Keywords"
 *   error
 *   errorMessage="At least 3 keywords are required"
 *   value={value}
 *   onChange={setValue}
 *   tags={{ value: tags, size: TagSize.XS, shape: TagShape.ROUNDED, variant: TagVariant.SUBTLE }}
 *   onTagAdd={handleAdd}
 *   onTagRemove={handleRemove}
 * />
 *
 * // Disabled state
 * <MultiValueInputV2
 *   label="Categories"
 *   disabled
 *   hintText="Categories cannot be edited"
 *   value=""
 *   tags={{ value: tags, size: TagSize.XS, shape: TagShape.ROUNDED, variant: TagVariant.SUBTLE }}
 *   onChange={() => {}}
 *   onTagAdd={() => {}}
 *   onTagRemove={() => {}}
 * />
 *
 * // With help icon
 * <MultiValueInputV2
 *   label="Email Recipients"
 *   sublabel="Add email addresses"
 *   helpIconHintText="Enter valid email addresses and press Enter"
 *   value={value}
 *   onChange={setValue}
 *   tags={{ value: tags, size: TagSize.XS, shape: TagShape.ROUNDED, variant: TagVariant.SUBTLE }}
 *   onTagAdd={handleAdd}
 *   onTagRemove={handleRemove}
 *   size={InputSizeV2.LG}
 * />
 */
