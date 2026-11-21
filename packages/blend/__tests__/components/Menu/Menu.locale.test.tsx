import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Menu from '../../../lib/components/Menu/Menu'
import MenuV2 from '../../../lib/components/MenuV2/MenuV2'

const FRENCH: Record<string, string> = {
    'menu.placeholder.search': 'Rechercher',
    'menu.a11y.search-with-placeholder':
        'Rechercher dans le menu : {placeholder}',
}
const t = (key: string) => FRENCH[key]

const ITEMS = [{ items: [{ label: 'Mumbai' }, { label: 'Moscow' }] }]
const ITEMS_V2 = [
    { items: [{ label: { text: 'Mumbai' } }, { label: { text: 'Moscow' } }] },
]

describe('Menu locale (Accessibility)', () => {
    it('defaults the V1 search placeholder and its name to English', async () => {
        const { user } = render(
            <Menu
                trigger={<button type="button">Open</button>}
                items={ITEMS}
                enableSearch
            />
        )
        await user.click(screen.getByRole('button', { name: 'Open' }))

        const input = await screen.findByPlaceholderText('Search')
        expect(input).toHaveAttribute('aria-label', 'Search menu items: Search')
    })

    it('translates the V1 default placeholder through the provider', async () => {
        const { user } = render(
            <Menu
                trigger={<button type="button">Open</button>}
                items={ITEMS}
                enableSearch
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )
        await user.click(screen.getByRole('button', { name: 'Open' }))

        const input = await screen.findByPlaceholderText('Rechercher')
        expect(input).toHaveAttribute(
            'aria-label',
            'Rechercher dans le menu : Rechercher'
        )
    })

    it('keeps an explicit searchPlaceholder over the translation', async () => {
        const { user } = render(
            <MenuV2
                trigger={<button type="button">Open</button>}
                items={ITEMS_V2}
                enableSearch
                searchPlaceholder="Search cities..."
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )
        await user.click(screen.getByRole('button', { name: 'Open' }))

        const input = await screen.findByPlaceholderText('Search cities...')
        expect(input).toHaveAttribute(
            'aria-label',
            'Rechercher dans le menu : Search cities...'
        )
    })

    it('translates the MenuV2 default placeholder', async () => {
        const { user } = render(
            <MenuV2
                trigger={<button type="button">Open</button>}
                items={ITEMS_V2}
                enableSearch
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )
        await user.click(screen.getByRole('button', { name: 'Open' }))

        expect(
            await screen.findByPlaceholderText('Rechercher')
        ).toBeInTheDocument()
    })
})
