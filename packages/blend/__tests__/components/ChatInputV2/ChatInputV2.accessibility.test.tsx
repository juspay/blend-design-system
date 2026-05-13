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
import {
    render,
    screen,
    act,
    fireEvent,
    within,
    waitFor,
    MockIcon,
} from '../../test-utils'
import { axe } from 'jest-axe'
import ChatInputV2 from '../../../lib/components/InputsV2/ChatInputV2/ChatInputV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'
import * as SnackbarV2 from '../../../lib/components/SnackbarV2'

const noopChange = () => {}
const noopAttachmentHandlers = {
    onFileRemove: () => {},
    onFileClick: () => {},
}

describe('ChatInputV2 Accessibility', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            innerWidth: 1280,
            breakPointLabel: 'lg',
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        vi.spyOn(SnackbarV2, 'addSnackbarV2').mockImplementation(() => 0)
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    const baseProps = {
        value: '',
        onChange: noopChange,
        'aria-label': 'Message composer',
        placeholder: 'Type a message…',
    } as const

    describe('WCAG 2.1/2.2 Compliance (Level A, AA) — axe-core', () => {
        it('meets WCAG standards for default composer (axe-core validation)', async () => {
            const { container } = render(
                <ChatInputV2 {...baseProps} secondaryAction={<MockIcon />} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(
                <ChatInputV2
                    {...baseProps}
                    disabled
                    value="Read-only"
                    secondaryAction={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with attachment chips', async () => {
            const { container } = render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={[
                        {
                            id: 'a1',
                            name: 'notes.txt',
                            type: 'text',
                            size: 12,
                        },
                    ]}
                    {...noopAttachmentHandlers}
                    secondaryAction={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with top queries', async () => {
            const { container } = render(
                <ChatInputV2
                    {...baseProps}
                    topQueries={[
                        { id: 'q1', text: 'Summarize the doc' },
                        { id: 'q2', text: 'List action items' },
                    ]}
                    onTopQuerySelect={() => {}}
                    secondaryAction={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with topContent and attachments', async () => {
            const { container } = render(
                <ChatInputV2
                    {...baseProps}
                    topContent={<span>Context banner</span>}
                    attachedFiles={[
                        { id: 'p1', name: 'file.pdf', type: 'pdf', size: 100 },
                    ]}
                    {...noopAttachmentHandlers}
                    secondaryAction={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('exposes stable name on the textarea via name attribute', () => {
            render(<ChatInputV2 {...baseProps} />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'chat-input'
            )
        })

        it('forwards aria-label to the textarea for accessible name', () => {
            render(
                <ChatInputV2
                    value=""
                    onChange={noopChange}
                    aria-label="Team chat reply"
                />
            )
            expect(
                screen.getByRole('textbox', { name: 'Team chat reply' })
            ).toBeInTheDocument()
        })

        it('exposes placeholder as a hint when no visible label is present', () => {
            render(
                <ChatInputV2
                    value=""
                    onChange={noopChange}
                    placeholder="Ask anything…"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Ask anything…'
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes textbox role for the textarea', () => {
            render(<ChatInputV2 {...baseProps} />)
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('sets aria-disabled when disabled', () => {
            render(<ChatInputV2 {...baseProps} disabled value="x" />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
        })

        it('exposes the hidden file input with an accessible name', () => {
            render(<ChatInputV2 {...baseProps} />)
            expect(
                screen.getByLabelText('Attach files', { selector: 'input' })
            ).toHaveAttribute('type', 'file')
        })

        it('exposes visible attach and secondary controls with accessible names (desktop)', () => {
            render(
                <ChatInputV2 {...baseProps} secondaryAction={<MockIcon />} />
            )
            expect(
                screen.getByRole('button', { name: 'Attach files' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Secondary action' })
            ).toBeInTheDocument()
        })

        it('exposes attachment row as a named region when files exist', () => {
            render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={[
                        { id: 'f1', name: 'a.txt', type: 'text', size: 1 },
                    ]}
                    {...noopAttachmentHandlers}
                />
            )
            expect(
                screen.getByRole('region', { name: /1 file attached/i })
            ).toBeInTheDocument()
        })

        it('gives the attachment remove control a discernible name (chip)', () => {
            render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={[
                        {
                            id: 'f1',
                            name: 'notes.txt',
                            type: 'text',
                            size: 1,
                        },
                    ]}
                    {...noopAttachmentHandlers}
                />
            )
            const region = screen.getByRole('region', {
                name: /1 file attached/i,
            })
            expect(
                within(region).getByRole('button', { name: 'Remove notes.txt' })
            ).toBeInTheDocument()
        })
    })

    describe('Attachment overflow menu (accessibility)', () => {
        const manyAttachedFiles = [
            { id: 'f1', name: 'a.txt', type: 'text' as const, size: 1 },
            { id: 'f2', name: 'b.txt', type: 'text' as const, size: 1 },
            { id: 'f3', name: 'c.txt', type: 'text' as const, size: 1 },
            { id: 'f4', name: 'd.txt', type: 'text' as const, size: 1 },
            { id: 'f5', name: 'e.txt', type: 'text' as const, size: 1 },
        ]

        let rectSpy: MockInstance

        beforeEach(() => {
            rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
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

        it('exposes aria-haspopup and toggles aria-expanded; aria-controls targets the list when open', async () => {
            const { user } = render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={manyAttachedFiles}
                    {...noopAttachmentHandlers}
                />
            )
            const moreBtn = await waitFor(() =>
                screen.getByRole('button', {
                    name: /show 4 more attached files/i,
                })
            )
            expect(moreBtn).toHaveAttribute('aria-haspopup', 'true')
            expect(moreBtn).toHaveAttribute('aria-expanded', 'false')
            expect(moreBtn).not.toHaveAttribute('aria-controls')

            await user.click(moreBtn)
            expect(moreBtn).toHaveAttribute('aria-expanded', 'true')
            const controlsId = moreBtn.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            expect(document.getElementById(controlsId!)).toBeTruthy()
        })

        it('meets WCAG standards with the overflow menu open (axe-core)', async () => {
            const { user, container } = render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={manyAttachedFiles}
                    {...noopAttachmentHandlers}
                    secondaryAction={<MockIcon />}
                />
            )
            const moreBtn = await waitFor(() =>
                screen.getByRole('button', {
                    name: /show 4 more attached files/i,
                })
            )
            await user.click(moreBtn)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Top queries visibility (aria-hidden)', () => {
        it('sets aria-hidden on the suggestions container when the field is not focused', () => {
            render(
                <ChatInputV2
                    {...baseProps}
                    topQueries={[{ id: '1', text: 'Suggestion' }]}
                    onTopQuerySelect={() => {}}
                />
            )
            const heading = screen.getByText('Top Queries')
            const panel = heading.closest('[aria-hidden]')
            expect(panel).toHaveAttribute('aria-hidden', 'true')
        })

        it('clears aria-hidden when the textarea is focused', async () => {
            const { user } = render(
                <ChatInputV2
                    {...baseProps}
                    topQueries={[{ id: '1', text: 'Suggestion' }]}
                    onTopQuerySelect={() => {}}
                />
            )
            const ta = screen.getByRole('textbox')
            await user.click(ta)
            const heading = screen.getByText('Top Queries')
            const panel = heading.closest('[aria-hidden]')
            expect(panel).toHaveAttribute('aria-hidden', 'false')
        })

        it('restores aria-hidden when the textarea loses focus', async () => {
            const { user } = render(
                <ChatInputV2
                    {...baseProps}
                    topQueries={[{ id: '1', text: 'Suggestion' }]}
                    onTopQuerySelect={() => {}}
                />
            )
            const ta = screen.getByRole('textbox')
            const heading = screen.getByText('Top Queries')
            const panel = heading.closest('[aria-hidden]')
            await user.click(ta)
            expect(panel).toHaveAttribute('aria-hidden', 'false')
            fireEvent.blur(ta)
            expect(panel).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('moves focus to the textarea', () => {
            render(<ChatInputV2 {...baseProps} />)
            const ta = screen.getByRole('textbox')
            act(() => {
                ta.focus()
            })
            expect(document.activeElement).toBe(ta)
        })

        it('does not submit on Shift+Enter (allows newline intent)', () => {
            const onEnter = vi.fn()
            render(<ChatInputV2 {...baseProps} onEnter={onEnter} />)
            const ta = screen.getByRole('textbox')
            fireEvent.keyDown(ta, { key: 'Enter', shiftKey: true })
            expect(onEnter).not.toHaveBeenCalled()
        })

        it('invokes onEnter on Enter without Shift', () => {
            const onEnter = vi.fn()
            render(<ChatInputV2 {...baseProps} onEnter={onEnter} />)
            const ta = screen.getByRole('textbox')
            fireEvent.keyDown(ta, { key: 'Enter', shiftKey: false })
            expect(onEnter).toHaveBeenCalledTimes(1)
        })
    })

    describe('Mobile layout (narrow viewport)', () => {
        beforeEach(() => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                innerWidth: 480,
                breakPointLabel: 'sm',
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        })

        it('meets WCAG standards for mobile shell (axe-core)', async () => {
            const { container } = render(
                <ChatInputV2 {...baseProps} secondaryAction={<MockIcon />} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('exposes attach control as a named button', () => {
            render(<ChatInputV2 {...baseProps} />)
            expect(
                screen.getByRole('button', { name: /attach files/i })
            ).toBeInTheDocument()
        })

        it('exposes the secondary action slot with an accessible name', () => {
            render(
                <ChatInputV2 {...baseProps} secondaryAction={<MockIcon />} />
            )
            expect(
                screen.getByRole('button', { name: 'Secondary action' })
            ).toBeInTheDocument()
        })

        it('forwards native textarea attributes (e.g. aria-label, inputMode) to the textbox', () => {
            render(
                <ChatInputV2
                    value=""
                    onChange={noopChange}
                    aria-label="Mobile composer"
                    inputMode="search"
                />
            )
            const ta = screen.getByRole('textbox', { name: 'Mobile composer' })
            expect(ta).toHaveAttribute('inputMode', 'search')
        })

        it('keeps attachment region and handlers without axe regressions', async () => {
            const { container } = render(
                <ChatInputV2
                    {...baseProps}
                    attachedFiles={[
                        {
                            id: 'm1',
                            name: 'mobile.txt',
                            type: 'text',
                            size: 10,
                        },
                    ]}
                    {...noopAttachmentHandlers}
                    secondaryAction={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            expect(
                screen.getByRole('region', { name: /1 file attached/i })
            ).toBeInTheDocument()
        })
    })
})
