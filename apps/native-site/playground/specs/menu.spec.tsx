import { StyleSheet, Text, View } from 'react-native'
import { Menu } from 'blend-native'
import type { MenuGroupType, MenuNativeProps } from 'blend-native'
import type { ComponentSpec } from '../types'

/** The menu owns its trigger, so the spec is inline like Popover's. */
type MenuPlaygroundProps = Omit<MenuNativeProps, 'trigger'>

const GROUPS: MenuGroupType[] = [
    {
        label: 'Payouts',
        items: [
            { label: { text: 'Settle now' } },
            { label: { text: 'Schedule' }, subLabel: 'Pick a date' },
        ],
        showSeparator: true,
    },
    {
        items: [
            {
                label: { text: 'More' },
                subMenu: [
                    { label: { text: 'Export CSV' } },
                    { label: { text: 'Export PDF' } },
                ],
            },
            {
                label: { text: 'Deactivate' },
                variant: 'action',
                actionType: 'danger',
            } as MenuGroupType['items'][number],
        ],
    },
]

const spec: ComponentSpec<MenuPlaygroundProps> = {
    name: 'Menu',
    summary:
        'Sheet on phones, anchored on tablets (web anchors at every size — a documented divergence). Sub-menus push in as a pane with a back row; selection stays controlled by the caller.',
    mode: 'inline',
    defaults: {
        items: GROUPS,
        closeOnSelect: true,
    },
    controls: [
        {
            kind: 'toggle',
            key: 'enableSearch',
            label: 'Search',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'closeOnSelect',
            label: 'Close on select',
            group: 'State',
        },
    ],
    render: (props) => (
        <Menu
            {...props}
            trigger={
                <View style={styles.trigger}>
                    <Text style={styles.triggerText}>Open the menu</Text>
                </View>
            }
        />
    ),
}

const styles = StyleSheet.create({
    trigger: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#1D4ED8',
        alignSelf: 'center',
    },
    triggerText: { color: '#FFFFFF', fontWeight: '600' },
})

export default spec
