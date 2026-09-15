import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'
import { isDiffEditorMode } from '../../../lib/components/CodeEditorV2/utils'
import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'

vi.mock('@monaco-editor/react', () => import('../../mocks/monaco-editor-react'))

describe('CodeEditorV2', () => {
    it('loads and mounts Monaco from the installed npm package', async () => {
        render(<CodeEditorV2 value="const local = true" />)

        expect(screen.getByText('Loading editor...')).toBeInTheDocument()

        await waitFor(() => {
            expect(loader.config).toHaveBeenCalledWith({ monaco })
        })
        expect(await screen.findByTestId('monaco-editor')).toBeInTheDocument()
    })

    it('does not configure Monaco after it unmounts', async () => {
        vi.mocked(loader.config).mockClear()
        const { unmount } = render(<CodeEditorV2 value="const local = true" />)

        unmount()
        await Promise.resolve()
        await Promise.resolve()

        expect(loader.config).not.toHaveBeenCalled()
    })

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

    it('mounts the diff editor after Monaco loads', async () => {
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
        expect(
            await screen.findByTestId('monaco-diff-editor')
        ).toBeInTheDocument()
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
