import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Breadcrumb from '../../../lib/components/Breadcrumb/Breadcrumb'
import BreadcrumbV2 from '../../../lib/components/BreadcrumbV2/BreadcrumbV2'

const FRENCH: Record<string, string> = {
    'breadcrumb.a11y.navigation': "Fil d'Ariane",
    'breadcrumb.a11y.current-page': 'Page actuelle : {label}',
    'breadcrumb.a11y.navigate-to': 'Aller à {label}',
    'breadcrumb.a11y.navigate-to-unnamed': "Aller à l'élément",
    'breadcrumb.a11y.show-more.one': 'Afficher {count} élément',
    'breadcrumb.a11y.show-more.other': 'Afficher {count} éléments',
}
const t = (key: string) => FRENCH[key]

const itemsOf = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
        label: `Level ${i + 1}`,
        href: `/l${i + 1}`,
    }))

describe('Breadcrumb locale', () => {
    it('renders the English accessible names with no provider locale', () => {
        render(<Breadcrumb items={itemsOf(3)} />)

        expect(
            screen.getByRole('navigation', { name: 'Breadcrumb navigation' })
        ).toBeInTheDocument()
        expect(screen.getByLabelText('Navigate to Level 1')).toBeInTheDocument()
        expect(
            screen.getByLabelText('Current page: Level 3')
        ).toBeInTheDocument()
    })

    it('pluralizes the overflow trigger by count', () => {
        // MAX_ITEMS is 4: five items hide one, six hide two. The singular
        // used to read "Show 1 more breadcrumb items".
        const { unmount } = render(<Breadcrumb items={itemsOf(5)} />)
        expect(
            screen.getByLabelText('Show 1 more breadcrumb item')
        ).toBeInTheDocument()
        unmount()

        render(<Breadcrumb items={itemsOf(6)} />)
        expect(
            screen.getByLabelText('Show 2 more breadcrumb items')
        ).toBeInTheDocument()
    })

    it('translates through the provider and keeps data-id on the label', () => {
        render(<Breadcrumb items={itemsOf(5)} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(
            screen.getByRole('navigation', { name: "Fil d'Ariane" })
        ).toBeInTheDocument()
        expect(screen.getByLabelText('Aller à Level 1')).toHaveAttribute(
            'data-id',
            'Level 1'
        )
        expect(screen.getByLabelText('Afficher 1 élément')).toBeInTheDocument()
    })

    it('translates BreadcrumbV2 item names, named and unnamed', () => {
        render(
            <BreadcrumbV2>
                <BreadcrumbV2.Item href="/a">Alpha</BreadcrumbV2.Item>
                <BreadcrumbV2.Item href="/b">{''}</BreadcrumbV2.Item>
                <BreadcrumbV2.Item isActive>Gamma</BreadcrumbV2.Item>
            </BreadcrumbV2>,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(screen.getByLabelText('Aller à Alpha')).toBeInTheDocument()
        expect(screen.getByLabelText("Aller à l'élément")).toBeInTheDocument()
        expect(
            screen.getByLabelText('Page actuelle : Gamma')
        ).toBeInTheDocument()
    })
})
