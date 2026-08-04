import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'
import { isDiffEditorMode } from '../../../lib/components/CodeEditorV2/utils'

// @monaco-editor/react is a heavy dependency that is slow to transform/mount
// in jsdom. These tests only assert on wrapper chrome (header, layout), not
// Monaco internals, so a lightweight textarea stands in for the real editor.
vi.mock('@monaco-editor/react', () => {
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
            <textarea
                aria-label="original code"
                defaultValue={original}
                readOnly
            />
            <textarea
                aria-label="modified code"
                defaultValue={modified}
                readOnly
            />
        </div>
    )

    return {
        __esModule: true,
        default: MockEditor,
        DiffEditor: MockDiffEditor,
    }
})

describe('CodeEditorV2', () => {
    it('renders with basic props', () => {
        render(<CodeEditorV2 value="console.log('hello')" />)

        // Header text is rendered by default
        expect(screen.getByText('Editor')).toBeInTheDocument()
    })

    it('respects custom header and language', () => {
        render(
            <CodeEditorV2
                value="const x: number = 1"
                language="typescript"
                header={{ title: 'TS Editor' }}
            />
        )

        expect(screen.getByText('TS Editor')).toBeInTheDocument()
    })

    it('supports diff variant with original and modified values', () => {
        render(
            <CodeEditorV2
                value="console.log('new')"
                originalValue="console.log('old')"
                diff
                variant={CodeEditorV2Variant.DIFF}
                header={{ title: 'Diff view' }}
            />
        )

        expect(screen.getByText('Diff view')).toBeInTheDocument()
    })

    it('enables diff mode when variant is DIFF without diff prop', () => {
        render(
            <CodeEditorV2
                value="b"
                originalValue="a"
                variant={CodeEditorV2Variant.DIFF}
                header={{ title: 'Variant-only diff' }}
            />
        )

        expect(screen.getByText('Variant-only diff')).toBeInTheDocument()
    })

    it('isDiffEditorMode combines diff flag and variant', () => {
        expect(isDiffEditorMode(false, CodeEditorV2Variant.DIFF)).toBe(true)
        expect(isDiffEditorMode(true, CodeEditorV2Variant.DEFAULT)).toBe(true)
        expect(isDiffEditorMode(false, CodeEditorV2Variant.DEFAULT)).toBe(false)
        expect(isDiffEditorMode(undefined, CodeEditorV2Variant.NO_GUTTER)).toBe(
            false
        )
    })
})
