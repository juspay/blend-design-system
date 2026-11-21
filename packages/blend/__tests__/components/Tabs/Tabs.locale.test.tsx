import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import Tabs from '../../../lib/components/Tabs/Tabs'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
} from '../../../lib/components/TabsV2'

const FRENCH: Record<string, string> = {
    'tabs.a11y.close': 'Fermer {label}',
    'tabs.label.add-new-tab': 'Ajouter un onglet',
}
const t = (key: string) => FRENCH[key]

// `newItem` is what makes a V1 tab closable.
const ITEMS = [
    { value: 'one', label: 'One', content: <p>Content one</p> },
    { value: 'two', label: 'Two', content: <p>Content two</p>, newItem: true },
]

describe('Tabs locale (Accessibility)', () => {
    it('renders the English close and add labels with no provider locale', () => {
        render(<Tabs items={ITEMS} showAddButton onTabAdd={() => {}} />)

        expect(
            screen.getByRole('button', { name: 'Close Two' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Add new tab' })
        ).toBeInTheDocument()
    })

    it('translates the labels through the provider', () => {
        render(<Tabs items={ITEMS} showAddButton onTabAdd={() => {}} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(
            screen.getByRole('button', { name: 'Fermer Two' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Ajouter un onglet' })
        ).toBeInTheDocument()
    })

    it('lets an explicit addButtonTooltip beat the translation', () => {
        render(
            <Tabs
                items={ITEMS}
                showAddButton
                onTabAdd={() => {}}
                addButtonTooltip="New report"
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByRole('button', { name: 'New report' })
        ).toBeInTheDocument()
    })

    it('still closes without activating the tab once the label is translated', async () => {
        // TabsTrigger recognises close-button clicks partly by an English
        // "Close" in the aria-label; the span[role="button"] check has to
        // keep catching it when that label is French.
        const onTabClose = vi.fn()
        const onValueChange = vi.fn()
        const { user } = render(
            <Tabs
                items={ITEMS}
                defaultValue="one"
                onTabClose={onTabClose}
                onValueChange={onValueChange}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        await user.click(screen.getByRole('button', { name: 'Fermer Two' }))

        expect(onTabClose).toHaveBeenCalledWith('two')
        expect(onValueChange).not.toHaveBeenCalled()
    })

    it('translates the TabsV2 close label', () => {
        render(
            <TabsV2 defaultValue="tab1">
                <TabsV2List>
                    <TabsV2Trigger value="tab1" closable>
                        Tab 1
                    </TabsV2Trigger>
                </TabsV2List>
            </TabsV2>,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            screen.getByRole('button', { name: 'Fermer Tab 1' })
        ).toBeInTheDocument()
    })
})
