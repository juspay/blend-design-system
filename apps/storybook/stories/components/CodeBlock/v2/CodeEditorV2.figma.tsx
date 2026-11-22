import React from 'react'
import { figma } from '@figma/code-connect'
import { CodeEditorV2, CodeEditorV2Variant } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CODEEDITORV2 COMPONENT
 *
 * Figma component set: "Code Block" (24732:6095) with 3 variants:
 *   - Code (24732:6094)        → variant={CodeEditorV2Variant.DEFAULT}
 *   - codeDiff (24732:6096)    → variant={CodeEditorV2Variant.DIFF}
 *   - valueChange (25234:6077) → variant={CodeEditorV2Variant.DIFF}
 *
 * PROP MAPPING DOCUMENTATION
 *
 * DIRECT MAPPINGS:
 * - Variant (VARIANT: Code | codeDiff | valueChange) → variant (Code)
 *   Code → CodeEditorV2Variant.DEFAULT ('default')
 *   codeDiff → CodeEditorV2Variant.DIFF ('diff')
 *   valueChange → CodeEditorV2Variant.DIFF ('diff')
 *   Note: There is no VALUE_CHANGE variant in code — valueChange is a
 *   design-only representation of a diff showing value changes; it maps
 *   to the DIFF variant with appropriate sample content.
 * - hasGutter (BOOLEAN) → showLineNumbers (Code: boolean)
 *   Controls whether Monaco renders the line-number gutter.
 * - hasCopyButton (BOOLEAN) → header.showCopyButton (Code: boolean)
 * - headerLabel (TEXT) → header.title (Code: string)
 * - hasHeader (BOOLEAN) → header.showHeader (Code: boolean)
 *
 * BOOLEAN-GATED SLOTS:
 * - hasHeaderLSlot (BOOLEAN) → header.leftSlot (Code: ReactNode)
 *   No INSTANCE_SWAP property in Figma; returns sample content when true.
 * - hasHeaderRSlot (BOOLEAN) → header.rightSlot (Code: ReactNode)
 *   No INSTANCE_SWAP property in Figma; returns sample content when true.
 *
 * UNMAPPED FIGMA PROPS:
 * - hasRightSlot (BOOLEAN) — no right-slot outside the header in code;
 *   the CodeEditorV2 only has header.leftSlot and header.rightSlot.
 *
 * CODE-ONLY PROPERTIES (not in Figma):
 * - value: The code string to display (required). Provided as sample content.
 * - onChange: Callback when the editor value changes.
 * - language: Monaco language ID (defaults to 'javascript').
 * - readOnly / disabled: View-only modes.
 * - originalValue: The original source for diff mode.
 * - renderSideBySide: Inline vs side-by-side diff.
 * - Various diff configuration props (isDiffUnchangedCollapsed, etc.).
 */

const SAMPLE_CODE = `const greeting = "Hello, World!";\nconsole.log(greeting);`

const SAMPLE_DIFF_ORIGINAL = `const config = {\n  timeout: 5000,\n  retries: 3,\n};`

const SAMPLE_DIFF_MODIFIED = `const config = {\n  timeout: 10000,\n  retries: 5,\n  log: true,\n};`

figma.connect(
    CodeEditorV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=24732-6095',
    {
        props: {
            variant: figma.enum('Variant', {
                Code: CodeEditorV2Variant.DEFAULT,
                codeDiff: CodeEditorV2Variant.DIFF,
                valueChange: CodeEditorV2Variant.DIFF,
            }),

            showLineNumbers: figma.boolean('hasGutter'),

            showHeader: figma.boolean('hasHeader'),

            title: figma.string('headerLabel'),

            showCopyButton: figma.boolean('hasCopyButton'),

            leftSlot: figma.boolean('hasHeaderLSlot', {
                true: <span>Left slot</span>,
                false: undefined,
            }),

            rightSlot: figma.boolean('hasHeaderRSlot', {
                true: <span>Right slot</span>,
                false: undefined,
            }),

            value: figma.enum('Variant', {
                Code: SAMPLE_CODE,
                codeDiff: SAMPLE_DIFF_MODIFIED,
                valueChange: SAMPLE_DIFF_MODIFIED,
            }),

            diff: figma.enum('Variant', {
                Code: false,
                codeDiff: true,
                valueChange: true,
            }),

            originalValue: figma.enum('Variant', {
                Code: undefined,
                codeDiff: SAMPLE_DIFF_ORIGINAL,
                valueChange: SAMPLE_DIFF_ORIGINAL,
            }),
        },

        example: ({
            variant,
            showLineNumbers,
            showHeader,
            title,
            showCopyButton,
            leftSlot,
            rightSlot,
            value,
            diff,
            originalValue,
        }) => (
            <CodeEditorV2
                value={value}
                variant={variant}
                showLineNumbers={showLineNumbers}
                header={{
                    showHeader,
                    title,
                    leftSlot,
                    rightSlot,
                    showCopyButton,
                }}
                diff={diff}
                originalValue={originalValue}
            />
        ),

        imports: [
            "import { CodeEditorV2, CodeEditorV2Variant } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/CodeEditorV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-codeeditorv2--docs',
            },
        ],
    }
)
