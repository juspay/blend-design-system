import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import CodeEditorV2 from '../../../../../packages/blend/lib/components/CodeEditorV2/CodeEditorV2'
import {
    CodeEditorV2Variant,
    type CodeEditorV2Props,
} from '../../../../../packages/blend/lib/components/CodeEditorV2/codeEditorV2.types'

/** Monaco loads asynchronously; give Chromatic time before screenshots. */
const CODE_EDITOR_CHROMATIC = {
    ...CHROMATIC_CONFIG,
    delay: 1500,
} as const

const SAMPLE_CODE = `function hello(name: string) {
  console.log(\`Hello, \${name}!\`)
}

hello('Blend')`

const DIFF_ORIGINAL = `function hello(name: string) {
  console.log('Hello, ' + name + '!')
}`

const DIFF_MODIFIED = `function hello(name: string) {
  console.log(\`Hello, \${name}!\`)
}`

const SHORT_CODE = `const version = '2'
console.log(version)
`

const VISUAL_DIFF_ORIGINAL = `const a = 1\n`
const VISUAL_DIFF_MODIFIED = `const a = 2\n`

const meta: Meta<typeof CodeEditorV2> = {
    title: 'Components/CodeEditorV2',
    component: CodeEditorV2,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A modern code editor component built on Monaco, with Blend design tokens, light/dark theming, and optional diff view.

## Features
- Monaco-based editor with language support (JS/TS/JSX/TSX, JSON, CSS, etc.)
- Light and dark themes driven by design tokens
- Optional header with title, actions, and copy button
- Configurable height and line numbers
- Diff mode for side‑by‑side or inline comparisons (\`diff={true}\` or \`variant={CodeEditorV2Variant.DIFF}\`—either enables diff)

## Accessibility
- **Header**: Renders as a \`<header>\` with \`aria-labelledby\` when a title is present, or \`aria-label="Code editor header"\` when not.
- **Copy**: Icon button exposes \`aria-label\` (\`Copy code\` / \`Copied\`) and \`title\` for hover tooltips.
- **Editor surface**: Monaco provides its own focus management and keyboard commands inside the editing surface; test keyboard behavior in the **Interactive** story.
- **Verification**: Use the Storybook **Accessibility** panel. Token contrast inside Monaco’s syntax highlighting may surface axe noise; prioritize checks on the Blend chrome (header, buttons).

## Stories
- **Interactive**: Full controls + **play** interaction (copy button).
- **Visual states**: Grid of representative visuals for Chromatic (longer capture delay for Monaco).
- **Accessibility**: Documented scenarios for landmarks, copy control, read-only, and disabled.
`,
            },
        },
    },
    argTypes: {
        value: {
            control: 'text',
            description: 'Code content displayed in the editor',
        },
        language: {
            control: 'select',
            options: [
                'javascript',
                'typescript',
                'jsx',
                'tsx',
                'json',
                'css',
                'html',
                'markdown',
                'yaml',
                'python',
                'rust',
                'haskell',
            ],
            description: 'Language mode for Monaco editor',
        },
        variant: {
            control: 'select',
            options: Object.values(CodeEditorV2Variant),
            description: 'Visual variant (default / no-gutter / diff)',
        },
        showLineNumbers: {
            control: 'boolean',
            description: 'Whether to show line numbers',
        },
        header: {
            control: 'object',
            description:
                'Header config: showHeader, title, leftSlot, rightSlot, showCopyButton',
        },
        readOnly: {
            control: 'boolean',
            description: 'Puts the editor into read-only mode',
        },
        disabled: {
            control: 'boolean',
            description:
                'Visually disables the editor and prevents interaction',
        },
        minHeight: {
            control: 'text',
            description: 'Minimum height of the editor container',
        },
        maxHeight: {
            control: 'text',
            description: 'Maximum height of the editor container',
        },
        height: {
            control: 'text',
            description: 'Explicit height of the editor container',
        },
        diff: {
            control: 'boolean',
            description:
                'Diff view (redundant with variant DIFF; either enables Monaco diff editor)',
        },
        originalValue: {
            control: 'text',
            description: 'Original content for diff mode',
        },
        renderSideBySide: {
            control: 'boolean',
            description:
                'When true, renders diff side-by-side; otherwise inline',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the code changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CodeEditorV2>

export const Default: Story = {
    render: function DefaultCodeEditorV2(args: CodeEditorV2Props) {
        const [code, setCode] = useState<string>(args.value ?? SAMPLE_CODE)

        return (
            <CodeEditorV2
                {...args}
                value={code}
                onChange={(next) => setCode(next)}
            />
        )
    },
    args: {
        value: SAMPLE_CODE,
        language: 'typescript',
        header: {
            showHeader: true,
            title: 'Sample code',
            showCopyButton: true,
        },
        showLineNumbers: true,
        readOnly: false,
        disabled: false,
        minHeight: '300px',
    },
}

export const ReadOnly: Story = {
    args: {
        ...Default.args,
        readOnly: true,
        header: {
            ...Default.args?.header,
            title: 'Read-only code sample',
        },
    },
}

export const DiffSideBySide: Story = {
    args: {
        value: DIFF_MODIFIED,
        originalValue: DIFF_ORIGINAL,
        language: 'typescript',
        variant: CodeEditorV2Variant.DIFF,
        header: {
            showHeader: true,
            title: 'Diff (side by side)',
            showCopyButton: true,
        },
        renderSideBySide: true,
        minHeight: '260px',
    },
}

export const DiffInline: Story = {
    args: {
        value: DIFF_MODIFIED,
        originalValue: DIFF_ORIGINAL,
        language: 'typescript',
        variant: CodeEditorV2Variant.DIFF,
        header: {
            showHeader: true,
            title: 'Diff (inline)',
            showCopyButton: true,
        },
        renderSideBySide: false,
        minHeight: '260px',
    },
}

export const Interactive: Story = {
    ...Default,
    parameters: {
        docs: {
            description: {
                story: `
Use **Controls** to change language, read-only, disabled, diff, dimensions, and header options.

The **play** function clicks **Copy code** and asserts the control announces **Copied** — a minimal interactive smoke test that does not depend on typing inside Monaco.
`,
            },
        },
        chromatic: { disable: true },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const copyBtn = await canvas.findByRole('button', {
            name: /copy code/i,
        })
        await userEvent.click(copyBtn)
        await expect(
            await canvas.findByRole('button', { name: /^copied$/i })
        ).toBeInTheDocument()
    },
}

export const VisualStates: Story = {
    render: () => (
        <div className="flex flex-col gap-7 max-w-[920px] mx-auto">
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    Default — header, line numbers, copy
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    header={{
                        showHeader: true,
                        title: 'Visual — default',
                        showCopyButton: true,
                    }}
                    showLineNumbers
                    minHeight="200px"
                />
            </div>
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    No header
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    header={{ showHeader: false }}
                    showLineNumbers
                    minHeight="180px"
                />
            </div>
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    Read-only
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    readOnly
                    header={{
                        showHeader: true,
                        title: 'Read-only',
                        showCopyButton: true,
                    }}
                    minHeight="180px"
                />
            </div>
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    Disabled
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    disabled
                    header={{
                        showHeader: true,
                        title: 'Disabled',
                        showCopyButton: false,
                    }}
                    minHeight="180px"
                />
            </div>
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    No gutter variant
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    variant={CodeEditorV2Variant.NO_GUTTER}
                    header={{
                        showHeader: true,
                        title: 'No gutter',
                        showCopyButton: true,
                    }}
                    minHeight="180px"
                />
            </div>
            <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-600">
                    Diff (inline)
                </p>
                <CodeEditorV2
                    value={VISUAL_DIFF_MODIFIED}
                    originalValue={VISUAL_DIFF_ORIGINAL}
                    language="typescript"
                    variant={CodeEditorV2Variant.DIFF}
                    renderSideBySide={false}
                    header={{
                        showHeader: true,
                        title: 'Diff inline',
                        showCopyButton: false,
                    }}
                    minHeight="200px"
                />
            </div>
        </div>
    ),
    parameters: {
        chromatic: CODE_EDITOR_CHROMATIC,
        docs: {
            description: {
                story: `
Stack of representative appearances for **visual regression** (Chromatic). Uses an extended delay so Monaco can finish loading before screenshots.

Does not use Controls; each block is fixed for stable snapshots.
`,
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div className="py-2 max-w-[720px] mx-auto font-sans">
            <h2 className="text-xl font-bold mb-2">
                CodeEditorV2 — accessibility scenarios
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Use the Storybook <strong>Accessibility</strong> addon on this
                story. The header and copy button are Blend-owned; Monaco's
                internal markup may add additional axe findings (e.g. contrast
                on token colors).
            </p>

            <section className="mb-7">
                <h3 className="text-[15px] font-semibold mb-2">
                    Landmark and title
                </h3>
                <p className="text-[13px] text-gray-600 mb-2.5">
                    With a title, the header uses <code>aria-labelledby</code>{' '}
                    pointing at the title text.
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    header={{
                        showHeader: true,
                        title: 'Section with visible title',
                        showCopyButton: true,
                    }}
                    minHeight="160px"
                />
            </section>

            <section className="mb-7">
                <h3 className="text-[15px] font-semibold mb-2">
                    Header without title text
                </h3>
                <p className="text-[13px] text-gray-600 mb-2.5">
                    Empty title falls back to{' '}
                    <code>aria-label=&quot;Code editor header&quot;</code> on
                    the <code>header</code> element.
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    header={{
                        showHeader: true,
                        title: '',
                        showCopyButton: true,
                    }}
                    minHeight="160px"
                />
            </section>

            <section className="mb-7">
                <h3 className="text-[15px] font-semibold mb-2">Copy control</h3>
                <p className="text-[13px] text-gray-600 mb-2.5">
                    Icon-only button: <code>aria-label</code> and{' '}
                    <code>title</code> switch between &quot;Copy code&quot; and
                    &quot;Copied&quot;.
                </p>
                <CodeEditorV2
                    value={SHORT_CODE}
                    language="typescript"
                    header={{
                        showHeader: true,
                        title: 'Copy labeling',
                        showCopyButton: true,
                    }}
                    minHeight="160px"
                />
            </section>

            <section className="mb-7">
                <h3 className="text-[15px] font-semibold mb-2">
                    Read-only and disabled
                </h3>
                <p className="text-[13px] text-gray-600 mb-2.5">
                    Read-only still allows focus in the editor surface; disabled
                    blocks interaction and uses token-driven disabled styling.
                </p>
                <div className="flex flex-col gap-4">
                    <CodeEditorV2
                        value={SHORT_CODE}
                        language="typescript"
                        readOnly
                        header={{
                            showHeader: true,
                            title: 'Read-only',
                            showCopyButton: false,
                        }}
                        minHeight="140px"
                    />
                    <CodeEditorV2
                        value={SHORT_CODE}
                        language="typescript"
                        disabled
                        header={{
                            showHeader: true,
                            title: 'Disabled',
                            showCopyButton: false,
                        }}
                        minHeight="140px"
                    />
                </div>
            </section>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('interactive'),
        chromatic: { disable: true },
        docs: {
            description: {
                story: `
Documented scenarios for semantic header labeling, copy **aria-label** behavior, and read-only vs disabled. Run the **Accessibility** panel; treat Monaco-internals warnings in context.
`,
            },
        },
    },
}
