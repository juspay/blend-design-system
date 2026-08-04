import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'

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

describe('CodeEditorV2 Accessibility', () => {
    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic editor (axe-core validation)', async () => {
            const { container } = render(
                <CodeEditorV2 value="console.log('hello world')" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for read-only editor (axe-core validation)', async () => {
            const { container } = render(
                <CodeEditorV2
                    value="const answer = 42"
                    readOnly
                    header={{ title: 'Read-only editor' }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for diff editor (axe-core validation)', async () => {
            const { container } = render(
                <CodeEditorV2
                    value="console.log('new')"
                    originalValue="console.log('old')"
                    variant={CodeEditorV2Variant.DIFF}
                    header={{ title: 'Diff editor' }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
