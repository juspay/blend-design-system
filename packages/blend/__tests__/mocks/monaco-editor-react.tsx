import React from 'react'
import { vi } from 'vitest'

export const loader = { config: vi.fn() }

/**
 * Lightweight stand-in for @monaco-editor/react in jsdom tests.
 * CodeEditorV2 tests assert wrapper chrome (header, layout), not Monaco internals.
 */
const MockEditor = ({
    value,
    onChange,
}: {
    value?: string
    onChange?: (value: string | undefined) => void
}) => (
    <textarea
        data-testid="monaco-editor"
        aria-label="code editor"
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
    />
)

const MockDiffEditor = ({
    original,
    modified,
}: {
    original?: string
    modified?: string
}) => (
    <div data-testid="monaco-diff-editor">
        <textarea aria-label="original code" defaultValue={original} readOnly />
        <textarea aria-label="modified code" defaultValue={modified} readOnly />
    </div>
)

export default MockEditor
export { MockDiffEditor as DiffEditor }
