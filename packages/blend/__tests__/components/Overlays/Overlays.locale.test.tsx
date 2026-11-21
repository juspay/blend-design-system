import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Alert from '../../../lib/components/Alert/Alert'
import Spinner from '../../../lib/components/Spinner/Spinner'
import { ProgressBarV2 } from '../../../lib/components/ProgressBarV2'
import { MultiSelectDrawer } from '../../../lib/components/Drawer'

const FRENCH: Record<string, string> = {
    'alert.a11y.close': 'Fermer',
    'alert.a11y.action': 'Action {label}',
    'spinner.label.loading': 'Chargement',
    'drawer.placeholder.search': 'Rechercher',
    'drawer.action.clear-all': 'Tout effacer',
    'drawer.action.done': 'Terminé',
}
const t = (key: string) => FRENCH[key]
const fr = { providerProps: { locale: 'fr-FR', t } }

describe('overlay and feedback locale (Accessibility)', () => {
    it('keeps the English Alert names with no provider locale', () => {
        render(
            <Alert
                heading="Heads up"
                description="Body"
                primaryAction={{ label: 'Retry', onClick: () => {} }}
                onClose={() => {}}
            />
        )

        expect(
            screen.getByRole('button', { name: 'Retry action' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Close' })
        ).toBeInTheDocument()
    })

    it('translates the Alert names through the provider', () => {
        render(
            <Alert
                heading="Heads up"
                description="Body"
                primaryAction={{ label: 'Retry', onClick: () => {} }}
                onClose={() => {}}
            />,
            fr
        )

        expect(
            screen.getByRole('button', { name: 'Action Retry' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Fermer' })
        ).toBeInTheDocument()
    })

    it('translates the Spinner default label but lets the prop win', () => {
        const { unmount } = render(<Spinner />, fr)
        expect(
            screen.getByRole('status', { name: 'Chargement' })
        ).toBeInTheDocument()
        unmount()

        render(<Spinner label="Saving" />, fr)
        expect(
            screen.getByRole('status', { name: 'Saving' })
        ).toBeInTheDocument()
    })

    it('formats the visible ProgressBar percentage by locale but keeps data-id', () => {
        const { unmount } = render(<ProgressBarV2 value={40} showLabel />)
        expect(screen.getByText('40%')).toBeInTheDocument()
        unmount()

        const fresh = render(<ProgressBarV2 value={40} showLabel />, fr)
        // French puts a no-break space before the sign; ICU versions differ
        // on which one.
        expect(screen.getByText(/^40\s%$/)).toBeInTheDocument()
        expect(fresh.container.querySelector('[data-id="40%"]')).not.toBeNull()
    })

    it('translates the select drawer defaults', () => {
        render(
            <MultiSelectDrawer
                open
                onOpenChange={() => {}}
                items={[{ items: [{ value: 'a', label: 'Alpha' }] }]}
                enableSearch
            />,
            fr
        )

        expect(screen.getByPlaceholderText('Rechercher')).toBeInTheDocument()
        expect(screen.getByText('Tout effacer')).toBeInTheDocument()
        expect(screen.getByText('Terminé')).toBeInTheDocument()
    })
})
