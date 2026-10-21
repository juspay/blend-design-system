import { StyleSheet, View } from 'react-native'
import {
    Home,
    MoreHorizontal,
    Plus,
    Receipt,
    User,
    Wallet,
} from 'lucide-react-native'
import { BottomNavigation } from 'blend-native'
import type {
    BottomNavigationItem,
    BottomNavigationNativeProps,
} from 'blend-native'
import type { ComponentSpec } from '../types'

/**
 * `withCenterAction` is playground-only — toggles the raised centre button,
 * whose `icon`/`onPress` the harness can't express as a control.
 */
type BottomNavigationPlaygroundProps = Omit<
    BottomNavigationNativeProps,
    'items' | 'centerAction'
> & { withCenterAction?: boolean }

const ITEMS: BottomNavigationItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    {
        id: 'payments',
        label: 'Payments',
        icon: <Wallet size={20} />,
        badge: 3,
    },
    { id: 'activity', label: 'Activity', icon: <Receipt size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    {
        id: 'more',
        label: 'More',
        icon: <MoreHorizontal size={20} />,
        selectable: false,
    },
]

const spec: ComponentSpec<BottomNavigationPlaygroundProps> = {
    name: 'BottomNavigation',
    summary:
        'Full-width tab bar docked to the bottom edge, padded by the safe-area inset. Optional raised centre action.',
    mode: 'inline',
    defaults: {
        defaultActiveItem: 'home',
        withCenterAction: false,
    },
    controls: [
        {
            kind: 'select',
            key: 'defaultActiveItem',
            label: 'Default active item',
            options: ITEMS.filter((item) => item.selectable !== false).map(
                (item) => ({ label: item.label, value: item.id })
            ),
        },
        {
            kind: 'toggle',
            key: 'withCenterAction',
            label: 'Centre action',
            group: 'Appearance',
            hidden: true,
        },
    ],
    render: ({ withCenterAction, ...props }) => (
        <View style={styles.stage}>
            <BottomNavigation
                {...props}
                items={ITEMS}
                centerAction={
                    withCenterAction
                        ? {
                              icon: <Plus size={24} />,
                              onPress: () => {},
                              accessibilityLabel: 'New payment',
                          }
                        : undefined
                }
                accessibilityLabel="Playground bottom navigation"
            />
        </View>
    ),
}

const styles = StyleSheet.create({
    stage: {
        height: 200,
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
})

export default spec
