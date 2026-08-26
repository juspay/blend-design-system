import {
    Avatar,
    AvatarShape,
    AvatarSize,
    AvatarStatusPosition,
    AvatarStatusType,
} from 'blend-native'
import type { AvatarNativeProps } from 'blend-native'
import DisplayShowcase from '../../components/DisplayShowcase'
import { enumOptions, humanize } from '../types'
import type { ComponentSpec } from '../types'

const SAMPLE_IMAGE =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'

/**
 * `status` is one object prop, so type and position share a control rather
 * than getting one each — a second control writing to the same key would
 * clobber the first. The list carries every status plus one off-default
 * position, which is what there is to see.
 */
const STATUSES = [
    { label: 'None', value: undefined },
    ...Object.entries(AvatarStatusType)
        .filter(([, value]) => value !== AvatarStatusType.NONE)
        .map(([key, value]) => ({
            label: humanize(key),
            value: {
                type: value,
                position: AvatarStatusPosition.BOTTOM_RIGHT,
            },
            code: `{ type: AvatarStatusType.${key} }`,
        })),
    {
        label: 'Online, top left',
        value: {
            type: AvatarStatusType.ONLINE,
            position: AvatarStatusPosition.TOP_LEFT,
        },
        code: '{ type: AvatarStatusType.ONLINE, position: AvatarStatusPosition.TOP_LEFT }',
    },
] as const

const spec: ComponentSpec<AvatarNativeProps> = {
    name: 'Avatar',
    summary:
        'Image with an initials fallback. The fallback colour is hashed from the text by the same function web uses, so a person keeps their colour across platforms.',
    mode: 'inline',
    gallery: DisplayShowcase,
    defaults: {
        alt: 'Priya Raman',
        size: AvatarSize.MD,
        shape: AvatarShape.CIRCULAR,
    },
    controls: [
        {
            kind: 'segmented',
            key: 'size',
            label: 'Size',
            options: enumOptions(AvatarSize, 'AvatarSize'),
        },
        {
            kind: 'segmented',
            key: 'shape',
            label: 'Shape',
            options: enumOptions(AvatarShape, 'AvatarShape'),
        },
        {
            kind: 'toggle',
            key: 'src',
            label: 'Load an image',
            group: 'Content',
            on: SAMPLE_IMAGE,
            off: undefined,
            onCode: '"https://..."',
        },
        {
            kind: 'text',
            key: 'alt',
            label: 'Name (drives the initials)',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'fallbackText',
            label: 'Override the initials',
            group: 'Content',
            placeholder: 'PR',
        },
        {
            kind: 'select',
            key: 'status',
            label: 'Status dot',
            group: 'State',
            options: STATUSES,
        },
    ],
    render: (props) => <Avatar {...props} />,
}

export default spec
