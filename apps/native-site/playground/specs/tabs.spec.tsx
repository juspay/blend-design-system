import { Text as RNText, View } from 'react-native'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    TabsSize,
    TabsVariant,
} from 'blend-native'
import type { TabsNativeProps } from 'blend-native'
import { indent } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type TabsPlaygroundProps = Pick<
    TabsNativeProps,
    'variant' | 'size' | 'expanded' | 'disabled'
>

const PANEL = { paddingVertical: 16 }

function TabsPreview(props: TabsPlaygroundProps) {
    return (
        <View style={{ width: 320 }}>
            <Tabs defaultValue="overview" {...props}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="payouts">Payouts</TabsTrigger>
                    <TabsTrigger value="disputes">Disputes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <View style={PANEL}>
                        <RNText>Today's totals at a glance.</RNText>
                    </View>
                </TabsContent>
                <TabsContent value="payouts">
                    <View style={PANEL}>
                        <RNText>Next payout on Friday.</RNText>
                    </View>
                </TabsContent>
                <TabsContent value="disputes">
                    <View style={PANEL}>
                        <RNText>No open disputes.</RNText>
                    </View>
                </TabsContent>
            </Tabs>
        </View>
    )
}

const CHILDREN = [
    '<TabsList>',
    '    <TabsTrigger value="overview">Overview</TabsTrigger>',
    '    <TabsTrigger value="payouts">Payouts</TabsTrigger>',
    '    <TabsTrigger value="disputes">Disputes</TabsTrigger>',
    '</TabsList>',
    '<TabsContent value="overview">…</TabsContent>',
    '<TabsContent value="payouts">…</TabsContent>',
    '<TabsContent value="disputes">…</TabsContent>',
].join('\n')

const spec: ComponentSpec<TabsPlaygroundProps> = {
    name: 'Tabs',
    summary:
        'Compound Tabs/TabsList/TabsTrigger/TabsContent with one animated indicator following the active trigger. Controlled or uncontrolled via value/defaultValue.',
    mode: 'inline',
    defaults: {
        variant: TabsVariant.UNDERLINE,
        size: TabsSize.MD,
    },
    controls: [
        {
            kind: 'select',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(TabsVariant, 'TabsVariant'),
        },
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(TabsSize, 'TabsSize'),
        },
        {
            kind: 'toggle',
            key: 'expanded',
            label: 'Expanded triggers',
        },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
    ],
    render: (props) => <TabsPreview {...props} />,
    wrapSnippet: (inner) => {
        const open = inner.endsWith(' />')
            ? `${inner.slice(0, -3)}>`
            : `${inner.replace(/\n\/>$/, '\n>')}`
        return `${open}\n${indent(CHILDREN)}\n</Tabs>`
    },
}

export default spec
