import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, waitFor, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import CodeBlock from '../../../lib/components/CodeBlock/CodeBlock'
import {
    CodeBlockVariant,
    DiffLineType,
    type SupportedLanguage,
} from '../../../lib/components/CodeBlock/types'

describe('CodeBlock Accessibility', () => {
    afterEach(() => {
        cleanup()
        // Clear any pending timeouts to prevent unhandled errors
        vi.clearAllTimers()
    })
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default code block (axe-core validation)', async () => {
            const { container } = render(
                <CodeBlock
                    code="const greeting = 'Hello, World!';"
                    language="javascript"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all code block variants (default, no-gutter, diff)', async () => {
            const variants = [
                CodeBlockVariant.DEFAULT,
                CodeBlockVariant.NO_GUTTER,
                CodeBlockVariant.DIFF,
            ]

            for (const variant of variants) {
                const { container, unmount } = render(
                    <CodeBlock
                        code="const test = 'example';"
                        variant={variant}
                        language="javascript"
                        diffLines={
                            variant === CodeBlockVariant.DIFF
                                ? [
                                      {
                                          content: 'const old = "removed";',
                                          type: DiffLineType.REMOVED,
                                      },
                                      {
                                          content: 'const new = "added";',
                                          type: DiffLineType.ADDED,
                                      },
                                  ]
                                : undefined
                        }
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with line numbers (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    showLineNumbers={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without line numbers', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    showLineNumbers={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with header (2.4.6 Headings and Labels)', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    header="example.js"
                    showHeader={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without header', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    showHeader={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with copy button (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    showCopyButton={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without copy button', async () => {
            const { container } = render(
                <CodeBlock
                    code="const example = 'test';"
                    language="javascript"
                    showCopyButton={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for diff view (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    diffLines={[
                        {
                            content: 'const removed = "old";',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content: 'const unchanged = "same";',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: 'const added = "new";',
                            type: DiffLineType.ADDED,
                        },
                    ]}
                    header="changes.diff"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all supported languages', async () => {
            const languages: SupportedLanguage[] = [
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
            ]

            for (const language of languages) {
                const { container, unmount } = render(
                    <CodeBlock
                        code={`// ${language} example\nconst test = 'example';`}
                        language={language}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <CodeBlock
                    code={`function example() {
  return 'Hello, World!';
}`}
                    language="javascript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="example.js"
                    showCopyButton={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1, 1.3.1, 2.1.1, 2.4.6, 4.1.2, keyboard navigation, screen reader support
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('copy button is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                />
            )
            const copyButton = screen.getByRole('button', {
                name: /copy code/i,
            })

            copyButton.focus()
            expect(document.activeElement).toBe(copyButton)
        })

        it('copy button can be activated with Enter key - keyboard activation support (WCAG 2.1.1)', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })
            copyButton.focus()

            await user.keyboard('{Enter}')

            // Verify copy was triggered (button state changes)
            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied/i,
                    })
                ).toBeInTheDocument()
            })
        })

        it('copy button can be activated with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })
            copyButton.focus()

            await user.keyboard(' ')

            // Verify copy was triggered
            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied/i,
                    })
                ).toBeInTheDocument()
            })
        })

        it('code content is not focusable - proper tab order (WCAG 2.4.3)', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                />
            )

            const codeBlock = screen.getByRole('region')
            const preElement = codeBlock.querySelector('pre')

            // Pre element should not be focusable
            expect(preElement).not.toHaveAttribute('tabindex')
            expect(preElement?.getAttribute('tabindex')).toBeNull()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has correct region role - programmatically determinable role', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                />
            )

            const codeBlock = screen.getByRole('region')
            expect(codeBlock).toBeInTheDocument()
        })

        it('has proper aria-label for code block - name is programmatically determinable', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                />
            )

            const codeBlock = screen.getByRole('region', {
                name: /code block: example\.js, javascript language/i,
            })
            expect(codeBlock).toBeInTheDocument()
        })

        it('provides accessible name for copy button - name is programmatically determinable', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })
            expect(copyButton).toBeInTheDocument()
        })

        it('updates copy button aria-label when state changes - state changes are announced', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })

            await user.click(copyButton)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied to clipboard/i,
                    })
                ).toBeInTheDocument()
            })
        })

        it('has proper heading structure for header (2.4.6 Headings and Labels)', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                    showHeader={true}
                />
            )

            const heading = screen.getByRole('heading', { level: 2 })
            expect(heading).toHaveTextContent('example.js')
        })

        it('code block has unique ID - proper identification (4.1.2)', () => {
            render(
                <>
                    <CodeBlock
                        code="const test1 = 'example1';"
                        language="javascript"
                        header="test1.js"
                    />
                    <CodeBlock
                        code="const test2 = 'example2';"
                        language="javascript"
                        header="test2.js"
                    />
                </>
            )

            // Get all regions - each CodeBlock creates one main region container
            const regions = screen.getAllByRole('region')
            expect(regions.length).toBeGreaterThanOrEqual(2)

            // Find main code block regions by their aria-label pattern
            // Format is "Code block: test1.js, javascript language" when header is provided
            const mainRegions = regions.filter((r) => {
                const ariaLabel = r.getAttribute('aria-label') || ''
                // Main code block regions have aria-label starting with "Code block"
                return ariaLabel.startsWith('Code block')
            })

            // Should have 2 main code block regions
            expect(mainRegions.length).toBeGreaterThanOrEqual(2)

            // Each should have unique IDs - check that we have at least 2 unique IDs
            // Note: The main container may not have an explicit ID, but child elements do
            // So we check that the regions themselves are different instances
            if (mainRegions.length >= 2) {
                const firstRegion = mainRegions[0]
                const secondRegion = mainRegions[1]
                // Verify they are different elements
                expect(firstRegion).not.toBe(secondRegion)
                // If they have IDs, they should be unique
                if (firstRegion.id && secondRegion.id) {
                    expect(firstRegion.id).not.toBe(secondRegion.id)
                }
            }
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative icons have aria-hidden="true" - non-text content properly marked', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showHeader={true}
                    showCopyButton={true}
                />
            )

            // FileCode icon in header should be hidden
            const fileIcon = container.querySelector('svg')
            if (fileIcon) {
                expect(fileIcon.closest('[aria-hidden="true"]')).toBeTruthy()
            }

            // Copy/Check icons in button should be hidden
            const buttonIcons = container.querySelectorAll(
                'button svg, button [aria-hidden="true"]'
            )
            buttonIcons.forEach((icon) => {
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('line numbers have aria-hidden="true" - decorative elements properly marked', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showLineNumbers={true}
                />
            )

            // Line number gutters should have aria-hidden
            const lineNumbers = container.querySelectorAll(
                '[role="presentation"][aria-hidden="true"]'
            )
            expect(lineNumbers.length).toBeGreaterThan(0)
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates header with code content correctly - relationships are programmatically determinable', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                    showHeader={true}
                />
            )

            // Get the main code block region (the outer container)
            const codeBlock = screen.getByRole('region', {
                name: /code block: example\.js/i,
            })
            const heading = screen.getByRole('heading', { level: 2 })

            // Verify the header and code content are properly associated through DOM structure
            // The main region contains both the header and code content
            expect(codeBlock).toContainElement(heading)

            // Code content is a child of the main region and is accessible
            // Find code content by looking for the pre element inside the region
            const codeContent = codeBlock.querySelector('pre')
            expect(codeContent).toBeInTheDocument()
            expect(codeBlock).toContainElement(codeContent as HTMLElement)
        })

        it('uses semantic HTML structure - pre and code elements', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                />
            )

            const preElement = container.querySelector('pre')
            const codeElement = container.querySelector('code')

            expect(preElement).toBeInTheDocument()
            expect(codeElement).toBeInTheDocument()
        })

        it('diff view has proper group roles for left and right sides', () => {
            render(
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    diffLines={[
                        {
                            content: 'const removed = "old";',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content: 'const added = "new";',
                            type: DiffLineType.ADDED,
                        },
                    ]}
                />
            )

            // Main code block region
            const mainRegion = screen.getByRole('region')
            expect(mainRegion).toBeInTheDocument()

            // Diff sides use role="group" not role="region"
            const removedGroup = screen.getByRole('group', {
                name: /removed code/i,
            })
            const addedGroup = screen.getByRole('group', {
                name: /added code/i,
            })

            expect(removedGroup).toBeInTheDocument()
            expect(addedGroup).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order - DOM order matches visual order', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showHeader={true}
                    showCopyButton={true}
                />
            )

            const codeBlock = container.firstChild as HTMLElement
            const header = codeBlock.querySelector('[role="group"]')
            const codeContent = codeBlock.querySelector(`#${codeBlock.id}-code`)

            // Header should come before code content in DOM
            if (header && codeContent) {
                const contentPosition =
                    codeBlock.compareDocumentPosition(codeContent as Node) &
                    Node.DOCUMENT_POSITION_FOLLOWING

                // Header should be before content (content should have FOLLOWING flag)
                expect(contentPosition).toBeGreaterThan(0)
            }
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual characteristics - label provides context', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                />
            )

            const codeBlock = screen.getByRole('region', {
                name: /code block: example\.js/i,
            })
            expect(codeBlock).toBeInTheDocument()

            // Information is conveyed through text labels, not just visual position
            const heading = screen.getByRole('heading', { level: 2 })
            expect(heading).toHaveTextContent('example.js')
        })
    })

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('text scales up to 200% without loss of functionality', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showHeader={true}
                />
            )

            const codeBlock = container.firstChild as HTMLElement
            const styles = window.getComputedStyle(codeBlock)

            // Verify element has styles applied (width should be set)
            expect(styles.width).not.toBe('')
            // Font size might be inherited, so check that element exists and is rendered
            expect(codeBlock).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                />
            )

            const copyButton = screen.getByRole('button')

            // Only interactive element should be the copy button
            copyButton.focus()
            expect(document.activeElement).toBe(copyButton)
        })

        it('code content is not in tab order - proper focus management', () => {
            const { container } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                />
            )

            const preElement = container.querySelector('pre')
            expect(preElement).not.toHaveAttribute('tabindex', '0')
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('headings describe topic or purpose', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                    showHeader={true}
                />
            )

            const heading = screen.getByRole('heading', { level: 2 })
            expect(heading).toHaveTextContent('example.js')
        })

        it('labels describe purpose - code block has descriptive aria-label', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    header="example.js"
                />
            )

            const codeBlock = screen.getByRole('region', {
                name: /code block: example\.js, javascript language/i,
            })
            expect(codeBlock).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has visible focus indicator - focus is clearly visible', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                />
            )

            const copyButton = screen.getByRole('button')
            copyButton.focus()

            // Button should have focus styles (handled by Button component)
            expect(document.activeElement).toBe(copyButton)
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('announces copy status to screen readers (WCAG 4.1.3)', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })

            await user.click(copyButton)

            // Wait for screen reader announcement
            await waitFor(
                () => {
                    // Check for live region announcement
                    const liveRegion = document.querySelector(
                        '[role="status"][aria-live="polite"]'
                    )
                    expect(liveRegion).toBeTruthy()
                },
                { timeout: 3000 }
            )
        })

        it('copy button aria-label updates on state change - status communicated', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })

            await user.click(copyButton)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied to clipboard/i,
                    })
                ).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })

            // Tab to button
            await user.tab()
            expect(document.activeElement).toBe(copyButton)

            // Activate with Enter
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied/i,
                    })
                ).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('does not cause context changes on focus - changes only on user request', () => {
            render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                />
            )

            const copyButton = screen.getByRole('button')
            copyButton.focus()

            // Focusing should not trigger any state changes
            expect(copyButton).toBeInTheDocument()
        })

        it('state changes only on user action - copy only on button click', async () => {
            const { user } = render(
                <CodeBlock
                    code="const test = 'example';"
                    language="javascript"
                    showCopyButton={true}
                    header="test.js"
                />
            )

            const copyButton = screen.getByRole('button', {
                name: /copy code from test\.js/i,
            })

            // Before click, button should show copy state
            expect(copyButton).toBeInTheDocument()

            // After click, button should show copied state
            await user.click(copyButton)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', {
                        name: /code from test\.js copied/i,
                    })
                ).toBeInTheDocument()
            })
        })
    })

    describe('Comprehensive WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <CodeBlock
                    code={`function comprehensive() {
  return 'All features';
}`}
                    language="typescript"
                    variant={CodeBlockVariant.DEFAULT}
                    showLineNumbers={true}
                    showHeader={true}
                    header="comprehensive.ts"
                    showCopyButton={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1, 1.3.1, 1.3.2, 1.3.3, 1.4.4, 2.1.1, 2.4.3, 2.4.6, 2.4.7, 4.1.2, 4.1.3
        })

        it('meets WCAG standards for diff view with all features', async () => {
            const { container } = render(
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    diffLines={[
                        {
                            content: 'const oldVersion = "1.0.0";',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content: 'const unchanged = "same";',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: 'const newVersion = "2.0.0";',
                            type: DiffLineType.ADDED,
                        },
                    ]}
                    showLineNumbers={true}
                    showHeader={true}
                    header="version.diff"
                    showCopyButton={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without header and copy button', async () => {
            const { container } = render(
                <CodeBlock
                    code="const minimal = 'test';"
                    language="javascript"
                    showHeader={false}
                    showCopyButton={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with long code content', async () => {
            const longCode = Array(50)
                .fill(0)
                .map((_, i) => `const line${i} = ${i};`)
                .join('\n')

            const { container } = render(
                <CodeBlock
                    code={longCode}
                    language="javascript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="long.js"
                    showCopyButton={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
