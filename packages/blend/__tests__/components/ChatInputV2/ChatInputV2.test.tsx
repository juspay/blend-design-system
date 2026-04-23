import React from 'react'
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
    type MockInstance,
} from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '../../test-utils'
import ChatInputV2 from '../../../lib/components/InputsV2/ChatInputV2/ChatInputV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'
import * as SnackbarV2 from '../../../lib/components/SnackbarV2'

describe('ChatInputV2', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            innerWidth: 1280,
            breakPointLabel: 'lg',
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        vi.spyOn(SnackbarV2, 'addSnackbarV2').mockImplementation(() => 0)
    })

    afterEach(() => {
        // Do not use restoreAllMocks() — it resets global ResizeObserver from vitest.setup.ts
        vi.clearAllMocks()
    })

    const defaultProps = {
        value: '',
        onChange: () => {},
    }

    describe('Rendering (desktop)', () => {
        it('renders textarea with name and placeholder', () => {
            render(
                <ChatInputV2 {...defaultProps} placeholder="Say something…" />
            )
            const ta = screen.getByRole('textbox')
            expect(ta).toHaveAttribute('name', 'chat-input')
            expect(ta).toHaveAttribute('placeholder', 'Say something…')
        })

        it('displays controlled value', () => {
            render(<ChatInputV2 {...defaultProps} value="Hello world" />)
            expect(screen.getByRole('textbox')).toHaveValue('Hello world')
        })

        it('renders topContent when provided', () => {
            render(
                <ChatInputV2
                    {...defaultProps}
                    topContent={<span data-testid="top-content">Context</span>}
                />
            )
            expect(screen.getByTestId('top-content')).toHaveTextContent(
                'Context'
            )
        })

        it('renders hidden file input with aria-label', () => {
            render(<ChatInputV2 {...defaultProps} />)
            expect(
                screen.getByLabelText('Attach files', { selector: 'input' })
            ).toHaveAttribute('type', 'file')
        })

        it('exposes attach and secondary icon buttons with aria-label', () => {
            render(
                <ChatInputV2
                    {...defaultProps}
                    secondaryAction={
                        <span data-testid="secondary-action">S</span>
                    }
                />
            )
            expect(
                screen.getByRole('button', { name: 'Attach files' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Secondary action' })
            ).toBeInTheDocument()
        })

        it('forwards native textarea attributes such as aria-label', () => {
            render(<ChatInputV2 {...defaultProps} aria-label="Composer" />)
            expect(
                screen.getByRole('textbox', { name: 'Composer' })
            ).toBeInTheDocument()
        })

        it('forwards ref to outer container element', () => {
            const ref = vi.fn()
            render(<ChatInputV2 {...defaultProps} ref={ref} />)
            expect(ref).toHaveBeenCalled()
            const node = ref.mock.calls[0]?.[0]
            expect(node).toBeInstanceOf(HTMLDivElement)
        })
    })

    describe('Typing and onChange', () => {
        it('calls onChange when the textarea value changes', () => {
            const onChange = vi.fn()
            render(<ChatInputV2 value="" onChange={onChange} />)
            const ta = screen.getByRole('textbox')
            fireEvent.change(ta, { target: { value: 'hello' } })
            expect(onChange).toHaveBeenCalledWith('hello')
        })
    })

    describe('Keyboard: Enter vs Shift+Enter', () => {
        it('calls onEnter when Enter is pressed without Shift', () => {
            const onEnter = vi.fn()
            render(<ChatInputV2 {...defaultProps} onEnter={onEnter} />)
            const ta = screen.getByRole('textbox')
            fireEvent.keyDown(ta, { key: 'Enter', shiftKey: false })
            expect(onEnter).toHaveBeenCalledTimes(1)
        })

        it('does not call onEnter when Shift+Enter is pressed', () => {
            const onEnter = vi.fn()
            render(<ChatInputV2 {...defaultProps} onEnter={onEnter} />)
            const ta = screen.getByRole('textbox')
            fireEvent.keyDown(ta, { key: 'Enter', shiftKey: true })
            expect(onEnter).not.toHaveBeenCalled()
        })
    })

    describe('Disabled', () => {
        it('disables textarea and sets aria-disabled', () => {
            render(<ChatInputV2 {...defaultProps} disabled value="x" />)
            const ta = screen.getByRole('textbox')
            expect(ta).toBeDisabled()
            expect(ta).toHaveAttribute('aria-disabled', 'true')
        })
    })

    describe('Secondary action', () => {
        it('calls onSecondaryActionClick when secondary action is activated', async () => {
            const onSecondaryActionClick = vi.fn()
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    secondaryAction={
                        <span data-testid="secondary-action-icon">Go</span>
                    }
                    onSecondaryActionClick={onSecondaryActionClick}
                />
            )
            const btn = screen
                .getByTestId('secondary-action-icon')
                .closest('button')
            expect(btn).toBeTruthy()
            await user.click(btn!)
            expect(onSecondaryActionClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('Attachments', () => {
        it('shows file region when files are attached', () => {
            render(
                <ChatInputV2
                    {...defaultProps}
                    attachedFiles={[
                        {
                            id: '1',
                            name: 'note.txt',
                            type: 'text',
                            size: 100,
                        },
                    ]}
                    onFileRemove={() => {}}
                />
            )
            expect(
                screen.getByRole('region', { name: /1 file attached/i })
            ).toBeInTheDocument()
            expect(screen.getByText('note.txt')).toBeInTheDocument()
        })

        it('calls onFileClick when the chip label is clicked', async () => {
            const onFileClick = vi.fn()
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    attachedFiles={[
                        {
                            id: 'chip-1',
                            name: 'a.txt',
                            type: 'text',
                        },
                    ]}
                    onFileRemove={() => {}}
                    onFileClick={onFileClick}
                />
            )
            await user.click(screen.getByRole('button', { name: 'a.txt' }))
            expect(onFileClick).toHaveBeenCalledWith({
                id: 'chip-1',
                name: 'a.txt',
                type: 'text',
            })
        })

        it('calls onFileRemove when the chip dismiss control is clicked', async () => {
            const onFileRemove = vi.fn()
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    attachedFiles={[
                        {
                            id: 'chip-1',
                            name: 'a.txt',
                            type: 'text',
                        },
                    ]}
                    onFileRemove={onFileRemove}
                />
            )
            const region = screen.getByRole('region', {
                name: /1 file attached/i,
            })
            // ChatInputTagV2: filename ButtonV2, then icon-only remove ButtonV2
            const chipButtons = within(region).getAllByRole('button')
            expect(chipButtons).toHaveLength(2)
            await user.click(chipButtons[1]!)
            expect(onFileRemove).toHaveBeenCalledWith('chip-1')
        })

        it('calls onAttachFiles when files are selected on hidden input', () => {
            const onAttachFiles = vi.fn()
            render(
                <ChatInputV2 {...defaultProps} onAttachFiles={onAttachFiles} />
            )
            const input = screen.getByLabelText('Attach files', {
                selector: 'input',
            }) as HTMLInputElement
            const file = new File(['x'], 'doc.pdf', {
                type: 'application/pdf',
            })
            fireEvent.change(input, { target: { files: [file] } })
            expect(onAttachFiles).toHaveBeenCalledWith([file])
        })

        it('shows snackbar and does not call onAttachFiles when name and size match an attachment', () => {
            const onAttachFiles = vi.fn()
            const bytes = new Uint8Array([1, 2, 3])
            render(
                <ChatInputV2
                    {...defaultProps}
                    attachedFiles={[
                        {
                            id: 'existing',
                            name: 'same.pdf',
                            type: 'pdf',
                            size: bytes.length,
                        },
                    ]}
                    onAttachFiles={onAttachFiles}
                />
            )
            const input = screen.getByLabelText('Attach files', {
                selector: 'input',
            }) as HTMLInputElement
            const dup = new File([bytes], 'same.pdf', {
                type: 'application/pdf',
            })
            fireEvent.change(input, { target: { files: [dup] } })
            expect(onAttachFiles).not.toHaveBeenCalled()
            expect(SnackbarV2.addSnackbarV2).toHaveBeenCalled()
        })

        describe('Overflow menu (narrow row)', () => {
            // With 3 or 4 files, `computeAttachmentRowCutoff` can merge a *single* hidden
            // file into the row (see utils), so no "+N more". Use 5+ files so ≥2 stay hidden.
            const manyAttachedFiles = [
                { id: 'f1', name: 'a.txt', type: 'text' as const, size: 1 },
                { id: 'f2', name: 'b.txt', type: 'text' as const, size: 1 },
                { id: 'f3', name: 'c.txt', type: 'text' as const, size: 1 },
                { id: 'f4', name: 'd.txt', type: 'text' as const, size: 1 },
                { id: 'f5', name: 'e.txt', type: 'text' as const, size: 1 },
            ]

            let rectSpy: MockInstance
            beforeEach(() => {
                // jsdom can report a wide row; force a zero-width box so a "+N more" control appears.
                rectSpy = vi.spyOn(
                    HTMLElement.prototype,
                    'getBoundingClientRect'
                )
                rectSpy.mockImplementation(
                    () =>
                        ({
                            width: 0,
                            height: 0,
                            x: 0,
                            y: 0,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            toJSON: () => ({}),
                        }) as DOMRect
                )
            })

            afterEach(() => {
                rectSpy.mockRestore()
            })

            it('exposes the overflow “more” control when not all chips fit the row', async () => {
                render(
                    <ChatInputV2
                        {...defaultProps}
                        attachedFiles={manyAttachedFiles}
                        onFileRemove={() => {}}
                    />
                )
                // Initial cutoff is `attachedFiles.length` (all chips); `handleResize` runs in
                // `requestAnimationFrame` and recomputes — wait for the overflow control.
                const more = await waitFor(() =>
                    screen.getByRole('button', {
                        name: /show 4 more attached files/i,
                    })
                )
                expect(more).toHaveAttribute(
                    'aria-label',
                    'Show 4 more attached files'
                )
            })

            it('closes the overflow menu on Escape', async () => {
                const { user } = render(
                    <ChatInputV2
                        {...defaultProps}
                        attachedFiles={manyAttachedFiles}
                        onFileRemove={() => {}}
                    />
                )
                const moreBtn = await waitFor(() =>
                    screen.getByRole('button', {
                        name: /show 4 more attached files/i,
                    })
                )
                await user.click(moreBtn)
                expect(moreBtn).toHaveAttribute('aria-expanded', 'true')
                fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
                expect(moreBtn).toHaveAttribute('aria-expanded', 'false')
            })

            it('closes the overflow menu on mousedown outside', async () => {
                const { user } = render(
                    <ChatInputV2
                        {...defaultProps}
                        attachedFiles={manyAttachedFiles}
                        onFileRemove={() => {}}
                    />
                )
                const moreBtn = await waitFor(() =>
                    screen.getByRole('button', {
                        name: /show 4 more attached files/i,
                    })
                )
                await user.click(moreBtn)
                expect(moreBtn).toHaveAttribute('aria-expanded', 'true')
                fireEvent.mouseDown(document.body)
                expect(moreBtn).toHaveAttribute('aria-expanded', 'false')
            })
        })
    })

    describe('Top queries', () => {
        it('toggles top-queries region aria-hidden on focus and blur', async () => {
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    topQueries={[{ id: 'q1', text: 'First suggestion' }]}
                    onTopQuerySelect={() => {}}
                />
            )
            const ta = screen.getByRole('textbox')
            const heading = screen.getByText('Top Queries')
            const region = heading.closest('[aria-hidden]')
            expect(region).toHaveAttribute('aria-hidden', 'true')

            await user.click(ta)
            expect(region).toHaveAttribute('aria-hidden', 'false')

            fireEvent.blur(ta)
            expect(region).toHaveAttribute('aria-hidden', 'true')
        })

        it('calls onTopQuerySelect when a top query row is activated', async () => {
            const onTopQuerySelect = vi.fn()
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    topQueries={[{ id: 'q1', text: 'Pick me' }]}
                    onTopQuerySelect={onTopQuerySelect}
                />
            )
            const ta = screen.getByRole('textbox')
            await user.click(ta)
            const queryButton = screen.getByRole('button', { name: 'Pick me' })
            await user.click(queryButton)
            expect(onTopQuerySelect).toHaveBeenCalledWith({
                id: 'q1',
                text: 'Pick me',
            })
        })
    })

    describe('Mobile layout', () => {
        beforeEach(() => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                innerWidth: 480,
                breakPointLabel: 'sm',
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        })

        it('renders textarea and attach control', () => {
            render(<ChatInputV2 {...defaultProps} />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'chat-input'
            )
            expect(
                screen.getByRole('button', { name: /attach files/i })
            ).toBeInTheDocument()
        })

        it('passes onFileClick through to attachment chips', async () => {
            const onFileClick = vi.fn()
            const { user } = render(
                <ChatInputV2
                    {...defaultProps}
                    attachedFiles={[
                        { id: 'm1', name: 'mob.txt', type: 'text', size: 1 },
                    ]}
                    onFileRemove={() => {}}
                    onFileClick={onFileClick}
                />
            )
            await user.click(screen.getByRole('button', { name: 'mob.txt' }))
            expect(onFileClick).toHaveBeenCalledWith(
                expect.objectContaining({ id: 'm1', name: 'mob.txt' })
            )
        })

        it('composes onKeyDown with onEnter and forwards other keys to onKeyDown', () => {
            const onKeyDown = vi.fn()
            const onEnter = vi.fn()
            render(
                <ChatInputV2
                    {...defaultProps}
                    onKeyDown={onKeyDown}
                    onEnter={onEnter}
                />
            )
            const ta = screen.getByRole('textbox')
            fireEvent.keyDown(ta, { key: 'a', shiftKey: false })
            expect(onKeyDown).toHaveBeenCalled()
            onKeyDown.mockClear()
            fireEvent.keyDown(ta, { key: 'Enter', shiftKey: false })
            expect(onKeyDown).toHaveBeenCalled()
            expect(onEnter).toHaveBeenCalledTimes(1)
        })
    })
})
