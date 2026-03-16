import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'

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
                header="TS Editor"
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
                header="Diff view"
            />
        )

        expect(screen.getByText('Diff view')).toBeInTheDocument()
    })
})
