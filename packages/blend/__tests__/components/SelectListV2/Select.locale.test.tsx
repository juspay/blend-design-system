import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import {
    SelectListV2,
    MultiSelectListV2,
} from '../../../lib/components/SelectListV2'
import { getFilteredItemsWithCustomValue } from '../../../lib/components/Select/selectUtils'

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

describe('Select family localization', () => {
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

    it('translates Select All in the multi-select list', () => {
        render(
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
