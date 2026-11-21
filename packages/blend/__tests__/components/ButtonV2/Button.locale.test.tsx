import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Button from '../../../lib/components/Button/Button'
import ButtonV2 from '../../../lib/components/ButtonV2/ButtonV2'

const t = (key: string) =>
    key === 'button.a11y.loading' ? 'Chargement, veuillez patienter' : undefined
const fr = { providerProps: { locale: 'fr-FR', t } }

describe('Button loading announcement locale (Accessibility)', () => {
    it('keeps the English text with no provider locale', () => {
        render(<ButtonV2 text="Save" loading />)

        expect(screen.getByText('Loading, please wait')).toBeInTheDocument()
    })

    it('translates the ButtonV2 and Button loading text', () => {
        const { unmount } = render(<ButtonV2 text="Save" loading />, fr)
        expect(
            screen.getByText('Chargement, veuillez patienter')
        ).toBeInTheDocument()
        unmount()

        render(<Button text="Save" loading />, fr)
        expect(
            screen.getByText('Chargement, veuillez patienter')
        ).toBeInTheDocument()
    })
})
