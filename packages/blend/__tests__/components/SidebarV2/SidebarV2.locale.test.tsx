import { describe, it, expect, afterEach } from 'vitest'
import { render, screen } from '../../test-utils'
import SidebarV2 from '../../../lib/components/SidebarV2/SidebarV2'
import TopbarV2 from '../../../lib/components/TopbarV2/TopbarV2'
import type { DirectoryData } from '../../../lib/components/Directory/types'

const FRENCH: Record<string, string> = {
    'navigation.a11y.main-content': 'Contenu principal',
    'navigation.a11y.navigation-menu': 'Menu de navigation',
    'sidebar.a11y.collapse-toggle':
        'Réduire la barre latérale. Appuyez sur {shortcut} pour basculer.',
    'sidebar.action.collapse': 'Réduire la barre latérale',
    'topbar.a11y.go-back': 'Retour',
}
const t = (key: string) => FRENCH[key]

const DATA: DirectoryData[] = [
    { label: 'Main', items: [{ label: 'Dashboard' }] },
]

describe('SidebarV2 and TopbarV2 locale', () => {
    it('renders the English names with no provider locale', () => {
        render(
            <SidebarV2 data={DATA}>
                <p>Page</p>
            </SidebarV2>
        )

        expect(
            screen.getByRole('main', { name: 'Main content' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('region', { name: 'Navigation menu' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', {
                name: 'Collapse sidebar. Press / to toggle.',
            })
        ).toBeInTheDocument()
    })

    it('translates through the provider and interpolates the shortcut', () => {
        render(
            <SidebarV2 data={DATA}>
                <p>Page</p>
            </SidebarV2>,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByRole('main', { name: 'Contenu principal' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('region', { name: 'Menu de navigation' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', {
                name: 'Réduire la barre latérale. Appuyez sur / pour basculer.',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText('Réduire la barre latérale')
        ).toBeInTheDocument()
    })

    describe('on a narrow viewport', () => {
        const originalWidth = window.innerWidth
        afterEach(() => {
            window.innerWidth = originalWidth
        })

        // The back button only renders on the mobile layout (< 1024px).
        it('translates the TopbarV2 back button', () => {
            window.innerWidth = 500
            render(<TopbarV2 showBackButton onBackClick={() => {}} />, {
                providerProps: { locale: 'fr-FR', t },
            })

            expect(
                screen.getByRole('button', { name: 'Retour' })
            ).toBeInTheDocument()
        })
    })
})
