import { View } from 'react-native'
import { Badge, BadgeColor, BadgeSize } from 'blend-native'
import type { BadgeNativeProps, BadgePosition } from 'blend-native'
import { enumOptions, numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `wrapped` and `position` are playground-only in the sense that `wrapped`
 * picks standalone vs overlay rendering; `position` is a real prop that is
 * only meaningful with children. When `wrapped` is on, the badge hangs off
 * a placeholder box.
 */
type BadgePlaygroundProps = Omit<BadgeNativeProps, 'children'> & {
    wrapped: boolean
    position: BadgePosition
}

function BadgePreview({ wrapped, position, ...props }: BadgePlaygroundProps) {
    if (!wrapped) return <Badge {...props} />

    return (
        <Badge
            {...props}
            position={position}
            isCircular={props.isCircular ?? true}
        >
            <View
                testID="badge-child"
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: 9999,
                    backgroundColor: '#DBEAFE',
                }}
            />
        </Badge>
    )
}

const spec: ComponentSpec<BadgePlaygroundProps> = {
    name: 'Badge',
    summary:
        'Count pill or plain dot, standalone or hung off a corner — web’s `translate(±50%)` overhang is computed as edge insets on native.',
    mode: 'inline',
    defaults: {
        count: 3,
        color: BadgeColor.ALERT,
        size: BadgeSize.MD,
        wrapped: false,
        position: 'top-right',
    },
    controls: [
        {
            kind: 'toggle',
            key: 'wrapped',
            label: 'Over a child',
            hidden: true,
        },
        {
            kind: 'select',
            key: 'position',
            label: 'Position',
            group: 'Appearance',
            options: unionOptions<BadgePosition>()([
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left',
            ]),
        },
        {
            kind: 'toggle',
            key: 'isCircular',
            label: 'Circular child',
            group: 'Appearance',
        },
        {
            kind: 'select',
            key: 'color',
            label: 'Color',
            options: enumOptions(BadgeColor, 'BadgeColor'),
        },
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(BadgeSize, 'BadgeSize'),
        },
        {
            kind: 'select',
            key: 'count',
            label: 'Count',
            group: 'Content',
            options: numberOptions([0, 3, 42, 150]),
        },
        {
            kind: 'select',
            key: 'maxCount',
            label: 'Max count',
            group: 'Content',
            options: numberOptions([9, 99, 999]),
        },
        {
            kind: 'text',
            key: 'text',
            label: 'Text override',
            group: 'Content',
            placeholder: 'e.g. New',
        },
        {
            kind: 'toggle',
            key: 'showZero',
            label: 'Show zero',
            group: 'State',
        },
    ],
    render: (props) => <BadgePreview {...props} />,
}

export default spec
