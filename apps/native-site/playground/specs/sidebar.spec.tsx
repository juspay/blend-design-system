import { StyleSheet, Text, View } from 'react-native'
import {
    Home,
    Settings,
    FileText,
    Users,
    Bell,
    Briefcase,
    Rocket,
} from 'lucide-react-native'
import { Sidebar } from 'blend-native'
import type { SidebarNativeProps, SidebarSectionData } from 'blend-native'
import { numberOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `open` and `onOpenChange` come from the harness, like every other overlay
 * spec — the stage owns visibility. On a wide ('lg') preview `Sidebar` docks
 * as a rail regardless of `open` (it only governs the 'sm' drawer), so the
 * trigger is only meaningful in the Mobile preview.
 *
 * `useMerchantPicker` is playground-only (not a real `Sidebar` prop) —
 * toggles between the custom-`header` demo and the built-in `merchantInfo`
 * picker, since the two are mutually exclusive on the real component.
 */
type SidebarPlaygroundProps = Omit<
    SidebarNativeProps,
    'open' | 'onOpenChange' | 'data' | 'header' | 'footer'
> & { useMerchantPicker?: boolean }

const DATA: SidebarSectionData[] = [
    {
        label: 'Overview',
        items: [
            {
                id: 'home',
                label: 'Home',
                leftSlot: <Home size={18} />,
                showOnMobile: true,
            },
            {
                id: 'notifications',
                label: 'Notifications',
                leftSlot: <Bell size={18} />,
                showOnMobile: true,
            },
        ],
    },
    {
        label: 'Workspace',
        items: [
            {
                id: 'reports',
                label: 'Reports',
                leftSlot: <FileText size={18} />,
                items: [
                    {
                        id: 'reports-daily',
                        label: 'Daily',
                        showOnMobile: true,
                    },
                    { id: 'reports-weekly', label: 'Weekly' },
                    { id: 'reports-monthly', label: 'Monthly' },
                ],
            },
            {
                id: 'team',
                label: 'Team',
                leftSlot: <Users size={18} />,
                showOnMobile: true,
            },
        ],
    },
    {
        label: 'Settings',
        items: [
            {
                id: 'settings',
                label: 'Settings',
                leftSlot: <Settings size={18} />,
                showOnMobile: true,
            },
        ],
    },
]

const MERCHANTS = [
    { label: 'Acme Inc', value: 'acme', icon: <Briefcase size={16} /> },
    { label: 'Beta Labs', value: 'beta', icon: <Rocket size={16} /> },
]

const spec: ComponentSpec<SidebarPlaygroundProps> = {
    name: 'Sidebar',
    summary:
        'Collapsible nav rail on wide screens, a slide-in drawer on narrow ones — both driven by the same data. Nested items expand in place; there is no icon-only flyout (see the component docblock).',
    mode: 'overlay',
    triggerLabel: 'Open the sidebar (mobile)',
    defaults: {
        defaultIsExpanded: true,
        hideToggleButton: false,
        drawerWidth: 280,
        defaultActiveItem: 'reports/reports-daily',
        highlightActivePath: false,
        showHierarchyLines: false,
        showMobileBottomNav: false,
        useMerchantPicker: false,
    },
    controls: [
        {
            kind: 'select',
            key: 'drawerWidth',
            label: 'Drawer width',
            options: numberOptions([240, 280, 320]),
        },
        {
            kind: 'toggle',
            key: 'defaultIsExpanded',
            label: 'Expanded by default (desktop)',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'hideToggleButton',
            label: 'Hide collapse toggle',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'useMerchantPicker',
            label: 'Built-in merchant picker (replaces header)',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'highlightActivePath',
            label: 'Highlight active path',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'showHierarchyLines',
            label: 'Hierarchy connector lines',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'showMobileBottomNav',
            label: 'Mobile bottom nav',
            group: 'State',
        },
    ],
    render: (props, ctx) => {
        const { useMerchantPicker, ...sidebarProps } = props
        return (
            <View style={styles.stage}>
                <Sidebar
                    {...sidebarProps}
                    data={DATA}
                    {...(useMerchantPicker
                        ? {
                              merchantInfo: {
                                  items: MERCHANTS,
                                  selected: 'acme',
                                  onSelect: () => {},
                              },
                          }
                        : {
                              header: (
                                  <Text style={styles.brand}>Acme Inc</Text>
                              ),
                          })}
                    footer={<Text style={styles.footer}>v1.0.0</Text>}
                    secondarySidebar={{
                        items: [
                            {
                                label: 'Acme Inc',
                                value: 'acme',
                                icon: <Briefcase size={16} />,
                            },
                            {
                                label: 'Beta Labs',
                                value: 'beta',
                                icon: <Rocket size={16} />,
                                badge: { text: '3' },
                            },
                        ],
                        selected: 'acme',
                        onSelect: () => {},
                    }}
                    open={ctx.open}
                    onOpenChange={ctx.setOpen}
                    accessibilityLabel="Playground sidebar"
                />
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Main content</Text>
                    <Text style={styles.contentBody}>
                        On a wide preview the sidebar docks to the left,
                        permanently in the layout. On the Mobile preview it is
                        absent until the trigger above opens it as a drawer.
                    </Text>
                </View>
            </View>
        )
    },
    wrapSnippet: (inner) => {
        const withRequired = inner.replace(
            /\n?\/>$/,
            '\n    open={open}\n    onOpenChange={setOpen}\n/>'
        )
        return `<View style={{ flexDirection: 'row', flex: 1 }}>\n  ${withRequired}\n  <MainContent />\n</View>`
    },
}

const styles = StyleSheet.create({
    stage: { flexDirection: 'row', flex: 1, minHeight: 420 },
    content: { flex: 1, padding: 24, gap: 8 },
    contentTitle: { fontSize: 17, fontWeight: '700' },
    contentBody: { fontSize: 14, lineHeight: 21, color: '#666' },
    brand: { fontSize: 15, fontWeight: '700' },
    footer: { fontSize: 12, color: '#999' },
})

export default spec
