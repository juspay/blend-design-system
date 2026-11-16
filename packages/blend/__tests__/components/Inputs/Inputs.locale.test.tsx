import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import TextInput from '../../../lib/components/Inputs/TextInput/TextInput'
import UnitInput from '../../../lib/components/Inputs/UnitInput/UnitInput'
import NumberInputV2 from '../../../lib/components/InputsV2/NumberInputV2/NumberInputV2'
import { getRangeErrorMessage } from '../../../lib/components/InputsV2/NumberInputV2/utils'

const FRENCH: Record<string, string> = {
    'input.a11y.show-password-verbose':
        'Afficher le mot de passe. Le mot de passe est actuellement masqué.',
    'input.a11y.password-group': 'Champ {label} avec bouton de visibilité',
    'input.a11y.increase': 'Augmenter {label}',
    'input.error.range-between':
        'La valeur doit être comprise entre {min} et {max}',
    'input.label.number-input': 'Champ numérique',
}
const t = (key: string) => FRENCH[key]
const noop = () => {}

describe('Inputs locale', () => {
    it('keeps the English password toggle names with no provider locale', () => {
        render(
            <TextInput
                label="Password"
                value="secret"
                onChange={noop}
                type="password"
                passwordToggle
            />
        )

        expect(
            screen.getByRole('button', {
                name: 'Show password. Currently hiding password.',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('group', {
                name: 'Password input with visibility toggle',
            })
        ).toBeInTheDocument()
    })

    it('translates the password toggle names through the provider', () => {
        render(
            <TextInput
                label="Code"
                value="secret"
                onChange={noop}
                type="password"
                passwordToggle
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByRole('button', {
                name: 'Afficher le mot de passe. Le mot de passe est actuellement masqué.',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('group', {
                name: 'Champ Code avec bouton de visibilité',
            })
        ).toBeInTheDocument()
    })

    it('translates the NumberInputV2 range error and stepper names', () => {
        render(
            <NumberInputV2
                label={{ text: 'Qty', subtext: '' }}
                value={150}
                onChange={noop}
                min={0}
                max={100}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByText('La valeur doit être comprise entre 0 et 100')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Augmenter Qty' })
        ).toBeInTheDocument()
    })

    it('keeps getRangeErrorMessage English for direct callers', () => {
        expect(getRangeErrorMessage(0, 100)).toBe(
            'Value must be between 0 and 100'
        )
        expect(getRangeErrorMessage(undefined, 5)).toBe(
            'Value must be at most 5'
        )
        expect(getRangeErrorMessage()).toBe('Invalid value')
    })

    it('translates the UnitInput default label but keeps data-unitinput English', () => {
        const { container } = render(
            <UnitInput value={undefined} onChange={noop} unit="USD" />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(screen.getByText('Champ numérique')).toBeInTheDocument()
        expect(
            container.querySelector('[data-unitinput="Number Input"]')
        ).not.toBeNull()
    })

    it('lets an explicit UnitInput label beat the translation', () => {
        render(
            <UnitInput
                value={undefined}
                onChange={noop}
                unit="USD"
                label="Amount"
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(screen.getByText('Amount')).toBeInTheDocument()
        expect(screen.queryByText('Champ numérique')).toBeNull()
    })
})
