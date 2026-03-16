import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import CodeEditorV2 from '../../../../../packages/blend/lib/components/CodeEditorV2/CodeEditorV2'
import {
    CodeEditorV2Variant,
    type CodeEditorV2Props,
} from '../../../../../packages/blend/lib/components/CodeEditorV2/codeEditorV2.types'

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

const meta: Meta<typeof CodeEditorV2> = {
    title: 'Components/CodeEditorV2',
    component: CodeEditorV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
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
- Diff mode for side‑by‑side or inline comparisons
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
        showHeader: {
            control: 'boolean',
            description: 'Whether to render the header section',
        },
        header: {
            control: 'text',
            description: 'Header title text',
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
            description: 'When true, shows the diff view',
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
        showHeader: true,
        header: 'Sample code',
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
        header: 'Read-only code sample',
    },
}

export const DiffSideBySide: Story = {
    args: {
        value: DIFF_MODIFIED,
        originalValue: DIFF_ORIGINAL,
        language: 'typescript',
        showHeader: true,
        header: 'Diff (side by side)',
        diff: true,
        renderSideBySide: true,
        minHeight: '260px',
    },
}

export const DiffInline: Story = {
    args: {
        value: DIFF_MODIFIED,
        originalValue: DIFF_ORIGINAL,
        language: 'typescript',
        showHeader: true,
        header: 'Diff (inline)',
        diff: true,
        renderSideBySide: false,
        minHeight: '260px',
    },
}
