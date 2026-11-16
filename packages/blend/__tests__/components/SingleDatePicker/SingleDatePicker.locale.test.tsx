import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'

const SEP_15 = new Date(2025, 8, 15)

/**
 * The clear button's accessible name came from `PickerClearButton`'s own
 * English default, which SingleDatePicker never overrode, so it stayed
 * "Clear selection" under every locale after the rest of the picker was
 * migrated.
 */
describe('SingleDatePicker clear button locale', () => {
    it('keeps the English name with no provider locale', () => {
        render(
            <SingleDatePicker value={SEP_15} onChange={() => {}} allowClear />
        )

        expect(
            screen.getByRole('button', { name: 'Clear selection' })
        ).toBeInTheDocument()
    })

    it('translates the name through the provider', () => {
        const t = (key: string) =>
            key === 'date-range-picker.a11y.clear-selection'
                ? 'Effacer la sélection'
                : undefined

        render(
            <SingleDatePicker value={SEP_15} onChange={() => {}} allowClear />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByRole('button', { name: 'Effacer la sélection' })
        ).toBeInTheDocument()
    })
})
