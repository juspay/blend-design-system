import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import ChatInput from '../../../lib/components/ChatInput/ChatInput'
import type { AttachedFile } from '../../../lib/components/ChatInput/types'
import CodeBlock from '../../../lib/components/CodeBlock/CodeBlock'
import CodeEditorV2 from '../../../lib/components/CodeEditorV2/CodeEditorV2'
import { notifyChatInputV2DuplicateFiles } from '../../../lib/components/InputsV2/ChatInputV2/utils'
import * as snackbarV2 from '../../../lib/components/SnackbarV2'
import { useMessages } from '../../../lib/i18n/useMessages'
import { CHAT_INPUT_MESSAGES } from '../../../lib/i18n/catalog/chatInput.messages'

vi.mock('@monaco-editor/react', () => import('../../mocks/monaco-editor-react'))

const FRENCH: Record<string, string> = {
    'chat-input.placeholder.message': 'Écrire un message...',
    'chat-input.label.top-queries': 'Requêtes fréquentes',
    'chat-input.a11y.remove-file': 'Supprimer le fichier {name}',
    'code-block.label.header': 'En-tête',
    'code-block.a11y.copy-from': 'Copier le code de {header}',
    'code-editor.label.title': 'Éditeur',
    'code-editor.status.loading': 'Chargement de l’éditeur...',
}
const t = (key: string) => FRENCH[key]
const fr = { providerProps: { locale: 'fr-FR', t } }

const FILES: AttachedFile[] = [{ id: '1', name: 'report.pdf', type: 'pdf' }]

describe('ChatInput and code components locale', () => {
    it('translates the default placeholder but keeps data-chatinput English', () => {
        const { container } = render(
            <ChatInput value="" onChange={() => {}} />,
            fr
        )

        expect(
            screen.getByPlaceholderText('Écrire un message...')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-chatinput="Type a message..."]')
        ).not.toBeNull()
    })

    it('translates the visible Top Queries heading', async () => {
        const { user } = render(
            <ChatInput
                value=""
                onChange={() => {}}
                topQueries={[{ id: '1', text: 'Status?' }]}
                onTopQuerySelect={() => {}}
            />,
            fr
        )
        // The suggestions only show while the textarea is focused.
        await user.click(screen.getByRole('textbox'))

        expect(screen.getByText('Requêtes fréquentes')).toBeInTheDocument()
    })

    it('still treats a click on the translated remove icon as remove, not open', async () => {
        // AttachmentFile used to recognise the remove icon only by an English
        // "Remove" in its aria-label.
        const onFileClick = vi.fn()
        const onFileRemove = vi.fn()
        const { user } = render(
            <ChatInput
                value=""
                onChange={() => {}}
                attachedFiles={FILES}
                onFileClick={onFileClick}
                onFileRemove={onFileRemove}
            />,
            fr
        )

        await user.click(
            screen.getByLabelText('Supprimer le fichier report.pdf')
        )

        expect(onFileRemove).toHaveBeenCalledWith('1')
        expect(onFileClick).not.toHaveBeenCalled()
    })

    it('keeps the ChatInputV2 duplicate snackbar English for direct callers', () => {
        const spy = vi
            .spyOn(snackbarV2, 'addSnackbarV2')
            .mockImplementation(() => '')
        notifyChatInputV2DuplicateFiles(['a.pdf'])
        notifyChatInputV2DuplicateFiles(['a.pdf', 'b.pdf'])

        expect(spy.mock.calls[0][0]).toMatchObject({
            header: 'Duplicate File',
            description: 'File "a.pdf" is already attached',
        })
        expect(spy.mock.calls[1][0]).toMatchObject({
            description: '2 duplicate file(s) were not added',
        })
        spy.mockRestore()
    })

    it('uses real plural forms for the duplicate-files message', () => {
        // The components resolve this through `mp`; English no longer
        // carries "file(s)".
        const Probe = ({ count }: { count: number }) => {
            const { mp } = useMessages(CHAT_INPUT_MESSAGES)
            return <p>{mp('chat-input.status.duplicates-not-added', count)}</p>
        }
        render(<Probe count={3} />)

        expect(
            screen.getByText('3 duplicate files were not added')
        ).toBeInTheDocument()
    })

    it('translates the CodeBlock default header but keeps data-codeblock English', () => {
        const { container } = render(<CodeBlock code="const a = 1" />, fr)

        expect(screen.getByText('En-tête')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Copier le code de En-tête' })
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-codeblock="Header"]')
        ).not.toBeNull()
    })

    it('translates the CodeEditorV2 title and loading text', () => {
        const { container } = render(<CodeEditorV2 value="x" />, fr)

        expect(
            screen.getByText('Chargement de l’éditeur...')
        ).toBeInTheDocument()
        expect(screen.getByText('Éditeur')).toBeInTheDocument()
        expect(
            container.querySelector('[data-codeeditor="Editor"]')
        ).not.toBeNull()
    })
})
