import { Breadcrumb } from 'blend-native'
import type { BreadcrumbNativeProps } from 'blend-native'
import type { ComponentSpec } from '../types'

type BreadcrumbPlaygroundProps = Pick<
    BreadcrumbNativeProps,
    'maxItems' | 'separator' | 'minVisibleItems'
>

const ITEMS = [
    { label: 'Home' },
    { label: 'Payments' },
    { label: 'Settlements' },
    { label: 'Disputes' },
    { label: 'Chargebacks' },
    { label: 'Current page' },
]

/**
 * The separator prop accepts any node; the playground controls only deal in
 * strings, so expose the two that matter — the web default "/" and "›".
 */
const SEPARATORS = [
    { label: '/ (web default)', value: '/', code: '" /"'.trim() },
    { label: '›', value: '›', code: '"›"' },
].map((option) => ({ ...option, code: `"${option.value}"` }))

const spec: ComponentSpec<BreadcrumbPlaygroundProps> = {
    name: 'Breadcrumb',
    summary:
        'Scrollable crumb trail. Past maxItems the trail collapses to first crumb + ellipsis menu + trailing segments. minVisibleItems is a floor on how many crumbs must stay visible after a collapse — below it the trail stays inline. 1 is web parity. The last crumb is the current page; the rest are link-role pressables.',
    mode: 'inline',
    defaults: {
        maxItems: 4,
        minVisibleItems: 1,
        separator: '/',
    },
    controls: [
        {
            kind: 'select',
            key: 'maxItems',
            label: 'Max items',
            options: [
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '6 (no overflow)', value: 6 },
            ],
        },
        {
            kind: 'select',
            key: 'minVisibleItems',
            label: 'Keep at least (visible)',
            options: [
                { label: '1 (web parity)', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
            ],
        },
        {
            kind: 'select',
            key: 'separator',
            label: 'Separator',
            options: SEPARATORS,
        },
    ],
    render: (props) => (
        <Breadcrumb
            items={ITEMS}
            maxItems={props.maxItems}
            minVisibleItems={props.minVisibleItems}
            separator={props.separator}
        />
    ),
}

export default spec
