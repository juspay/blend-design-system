import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { CodeEditorV2Variant } from '../../../lib/components/CodeEditorV2/codeEditorV2.types'

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
                    header="Read-only editor"
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
                    diff
                    variant={CodeEditorV2Variant.DIFF}
                    header="Diff editor"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
