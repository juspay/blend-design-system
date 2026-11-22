import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import UploadV2 from '../../../lib/components/InputsV2/UploadV2/UploadV2'

/**
 * Pins the tier boundary that made UploadV2 look unmigrated in the demo app.
 *
 * The header resolves through `pick(uploadHeaderText, …)`, so an explicit
 * prop beats the provider's translator by design. The demo passed an English
 * `uploadHeaderText` on every card, which pinned the header to English under
 * every locale — the library was correct and the caller was masking it.
 *
 * Both halves are asserted here, because the bug is only visible as the pair:
 * without a prop the header must follow `t`, and with one it must not.
 */
describe('UploadV2 localization tiers', () => {
    const FRENCH: Record<string, string> = {
        'upload-v2.label.drop-hint': 'Choisissez un fichier',
        'upload-v2.action.browse-files': 'Parcourir les fichiers',
    }
    const t = (key: string) => FRENCH[key]

    it('follows the provider translator when no header prop is passed', () => {
        render(<UploadV2 label="Upload" onChange={() => {}} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(screen.getByText('Choisissez un fichier')).toBeInTheDocument()
        expect(
            screen.queryByText('Choose a file or drag & drop it here')
        ).not.toBeInTheDocument()
    })

    it('lets an explicit uploadHeaderText win over the translator', () => {
        render(
            <UploadV2
                label="Upload"
                uploadHeaderText="Choose a file or drag & drop it here"
                onChange={() => {}}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        // Tier 1 beats tier 2. This is the designed behaviour, and the reason
        // a caller that hardcodes this prop sees English under every locale.
        expect(
            screen.getByText('Choose a file or drag & drop it here')
        ).toBeInTheDocument()
        expect(
            screen.queryByText('Choisissez un fichier')
        ).not.toBeInTheDocument()
    })

    it('still localizes the sibling button when the header is overridden', () => {
        render(
            <UploadV2
                label="Upload"
                uploadHeaderText="Pinned header"
                onChange={() => {}}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        // An override is per-string, not per-component: everything the caller
        // did not pass a prop for keeps following the locale.
        expect(
            screen.getByRole('button', { name: 'Parcourir les fichiers' })
        ).toBeInTheDocument()
    })

    it('falls back to English when the translator has no entry', () => {
        render(<UploadV2 label="Upload" onChange={() => {}} />, {
            providerProps: { locale: 'fr-FR', t: () => undefined },
        })

        expect(
            screen.getByText('Choose a file or drag & drop it here')
        ).toBeInTheDocument()
    })
})
