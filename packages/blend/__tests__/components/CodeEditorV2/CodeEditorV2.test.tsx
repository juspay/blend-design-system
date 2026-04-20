import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'
import { isDiffEditorMode } from '../../../lib/components/CodeEditorV2/utils'

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
