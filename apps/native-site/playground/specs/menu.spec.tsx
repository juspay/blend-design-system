import { useState } from 'react'
import { View } from 'react-native'
import { Button, Menu } from 'blend-native'
import type { MenuGroupType } from 'blend-native'
import { MenuAlignment, MenuSide } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type MenuPlaygroundProps = {
    alignment: MenuAlignment
    side: MenuSide
    closeOnSelect: boolean
    enableSearch: boolean
}

const MENU_GROUPS: MenuGroupType[] = [
    {
        label: 'Transactions',
        items: [
            { id: 'refund', label: { text: 'Refund' }, onClick: () => {} },
            {
                id: 'receipt',
                label: { text: 'Download receipt' },
                onClick: () => {},
            },
        ],
    },
    {
        label: 'Account',
        items: [
            {
                id: 'settings',
                label: { text: 'Settings' },
                onClick: () => {},
            },
            {
                id: 'signout',
                label: { text: 'Sign out' },
                onClick: () => {},
            },
        ],
    },
]

function MenuPreview({
    alignment,
    side,
    closeOnSelect,
    enableSearch,
}: MenuPlaygroundProps) {
    const [open, setOpen] = useState(false)
    return (
        <View style={{ width: 280, alignItems: 'flex-start' }}>
            <Menu
                trigger={
                    <Button
                        text={open ? 'Close menu' : 'Open menu'}
                        onPress={() => setOpen(true)}
                    />
                }
                items={MENU_GROUPS}
                open={open}
                onOpenChange={setOpen}
                alignment={alignment}
                side={side}
                closeOnSelect={closeOnSelect}
                enableSearch={enableSearch}
            />
        </View>
    )
}

const spec: ComponentSpec<MenuPlaygroundProps> = {
    name: 'Menu',
    summary:
        'Anchored dropdown menu with grouped items, per-item selection state and search filtering. Renders a bottom sheet on small screens.',
    mode: 'inline',
    defaults: {
        alignment: MenuAlignment.START,
        side: MenuSide.BOTTOM,
        closeOnSelect: true,
        enableSearch: false,
    },
    controls: [
        {
            kind: 'select',
            key: 'alignment',
            label: 'Alignment',
            options: enumOptions(MenuAlignment, 'MenuAlignment'),
        },
        {
            kind: 'select',
            key: 'side',
            label: 'Side',
            options: enumOptions(MenuSide, 'MenuSide'),
        },
        { kind: 'toggle', key: 'closeOnSelect', label: 'Close on select' },
        {
            kind: 'toggle',
            key: 'enableSearch',
            label: 'Search',
            group: 'Content',
        },
    ],
    render: (props) => <MenuPreview {...props} />,
    wrapSnippet: (inner) =>
        inner.replace(
            /\n\/>$/,
            '\n    trigger={<Button text="Open menu" />}\n    items={MENU_GROUPS}\n/>'
        ),
}

export default spec
