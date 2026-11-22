import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Directory from '../../../lib/components/Directory/Directory'
import type { DirectoryData } from '../../../lib/components/Directory/types'

const FRENCH: Record<string, string> = {
    'directory.a11y.navigation': 'Navigation du répertoire',
    'directory.a11y.section': 'Navigation {label}',
}
const t = (key: string) => FRENCH[key]

const DATA: DirectoryData[] = [
    { label: 'Organizations', items: [{ label: 'Acme' }, { label: 'Orbit' }] },
]

describe('Directory locale (Accessibility)', () => {
    it('renders the English landmark and section names with no provider locale', () => {
        render(<Directory directoryData={DATA} />)

        expect(
            screen.getByLabelText('Directory navigation')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('list', { name: 'Organizations navigation' })
        ).toBeInTheDocument()
    })

    it('translates them through the provider and keeps data-id English', () => {
        const { container } = render(<Directory directoryData={DATA} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(
            screen.getByLabelText('Navigation du répertoire')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('list', { name: 'Navigation Organizations' })
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-id="Organizations"]')
        ).not.toBeNull()
    })
})
