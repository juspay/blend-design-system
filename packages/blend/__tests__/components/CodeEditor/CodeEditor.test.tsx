import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import CodeEditor from '../../../lib/components/CodeEditor/CodeEditor'
import { render, screen, waitFor } from '../../test-utils'

vi.mock('@monaco-editor/react', () => import('../../mocks/monaco-editor-react'))

describe('CodeEditor', () => {
    it('loads and mounts Monaco from the installed npm package', async () => {
        render(<CodeEditor value="const local = true" />)

        expect(screen.getByText('Loading editor...')).toBeInTheDocument()

        await waitFor(() => {
            expect(loader.config).toHaveBeenCalledWith({ monaco })
        })
        expect(await screen.findByTestId('monaco-editor')).toBeInTheDocument()
    })

    it('does not configure Monaco after it unmounts', async () => {
        vi.mocked(loader.config).mockClear()
        const { unmount } = render(<CodeEditor value="const local = true" />)

        unmount()
        await Promise.resolve()
        await Promise.resolve()

        expect(loader.config).not.toHaveBeenCalled()
    })
})
