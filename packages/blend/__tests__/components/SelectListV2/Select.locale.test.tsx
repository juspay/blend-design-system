import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import {
    SelectListV2,
    MultiSelectListV2,
} from '../../../lib/components/SelectListV2'
import { getFilteredItemsWithCustomValue } from '../../../lib/components/Select/selectUtils'
import { MultiSelect } from '../../../lib/components/MultiSelect'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'

/**
 * Select-family localization, exercised through the list variants because
 * they render inline. The same SELECT_MESSAGES keys and the same
 * `getFilteredItemsWithCustomValue` back SingleSelect, MultiSelect, their V2
 * generations and the mobile drawers.
 */
const items = () => [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
        ],
    },
]

const FRENCH: Record<string, string> = {
    'select.placeholder.search': 'Rechercher des options...',
    'select.label.custom-value': 'Préciser',
    'select.label.custom-value-option': '{label} : « {value} »',
    'select.action.select-all': 'Tout sélectionner',
    'common.empty.no-results': 'Aucun résultat',
}
const t = (key: string) => FRENCH[key]

describe('Select family localization (Accessibility)', () => {
    it('keeps English defaults with no provider configuration', async () => {
        const { user } = render(
            <SelectListV2
                label="Pick"
                items={items()}
                selected=""
                onSelect={() => {}}
                search={{ show: true }}
                allowCustomValue
            />
        )

        const search = screen.getByRole('searchbox')
        expect(search).toHaveAttribute('placeholder', 'Search options...')
        await user.type(search, 'mango')
        expect(await screen.findByText('Specify: "mango"')).toBeInTheDocument()
    })

    it('translates the placeholder and the whole custom-value option', async () => {
        const { user } = render(
            <SelectListV2
                label="Pick"
                items={items()}
                selected=""
                onSelect={() => {}}
                search={{ show: true }}
                allowCustomValue
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        const search = screen.getByRole('searchbox')
        expect(search).toHaveAttribute(
            'placeholder',
            'Rechercher des options...'
        )
        await user.type(search, 'mango')
        // The template, not concatenation: French spacing and guillemets.
        expect(
            await screen.findByText('Préciser : « mango »')
        ).toBeInTheDocument()
    })

    it('translates the empty state through the shared common key', async () => {
        const { user } = render(
            <SelectListV2
                label="Pick"
                items={items()}
                selected=""
                onSelect={() => {}}
                search={{ show: true }}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        await user.type(screen.getByRole('searchbox'), 'zzz')
        expect(await screen.findByText('Aucun résultat')).toBeInTheDocument()
    })

    it('lets explicit props beat the translator', async () => {
        const { user } = render(
            <SelectListV2
                label="Pick"
                items={items()}
                selected=""
                onSelect={() => {}}
                search={{ show: true, placeholder: 'Find a fruit' }}
                allowCustomValue
                customValueLabel="Add"
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        const search = screen.getByRole('searchbox')
        expect(search).toHaveAttribute('placeholder', 'Find a fruit')
        await user.type(search, 'mango')
        // The prop replaces the label; the template still frames it.
        expect(await screen.findByText('Add : « mango »')).toBeInTheDocument()
    })

    it('translates Select All in the multi-select list but keeps its data-id English', () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick"
                items={items()}
                selectedValues={[]}
                onChange={() => {}}
                enableSelectAll
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(screen.getByText('Tout sélectionner')).toBeInTheDocument()
        // The data-id hooks keep the English default so selectors are stable.
        expect(
            container.querySelector('[data-id="Tout sélectionner"]')
        ).toBeNull()
        expect(container.querySelector('[data-id="Select All"]')).not.toBeNull()
    })
})

// The dropdown variants resolve their display text inside the menu, so the
// select-all data-id must be checked through them too, not only through the
// inline list.
describe.each([
    ['MultiSelect', MultiSelect],
    ['MultiSelectV2', MultiSelectV2],
] as const)('%s select-all data-id (Accessibility)', (_, Component) => {
    it('shows the translated label but keeps the English data-id', async () => {
        const { user } = render(
            <Component
                label="Fruit"
                placeholder="Choose"
                items={items()}
                selectedValues={[]}
                onChange={() => {}}
                enableSelectAll
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        await user.click(screen.getByLabelText('Fruit'))
        expect(await screen.findByText('Tout sélectionner')).toBeInTheDocument()
        expect(
            document.querySelector('[data-id="Tout sélectionner"]')
        ).toBeNull()
        expect(document.querySelector('[data-id="Select All"]')).not.toBeNull()
    })

    it('uses the consumer text for both when selectAllText is passed', async () => {
        const { user } = render(
            <Component
                label="Fruit"
                placeholder="Choose"
                items={items()}
                selectedValues={[]}
                onChange={() => {}}
                enableSelectAll
                selectAllText="Pick every fruit"
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        await user.click(screen.getByLabelText('Fruit'))
        expect(await screen.findByText('Pick every fruit')).toBeInTheDocument()
        expect(
            document.querySelector('[data-id="Pick every fruit"]')
        ).not.toBeNull()
    })
})

describe('getFilteredItemsWithCustomValue', () => {
    it('keeps its historical English label for direct callers', () => {
        const [, custom] = getFilteredItemsWithCustomValue(
            items(),
            'mango',
            false,
            true,
            true
        )
        expect(custom.items[0].label).toBe('Specify: "mango"')
    })
})
