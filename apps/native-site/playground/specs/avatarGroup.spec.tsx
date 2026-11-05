import { useState } from 'react'
import { AvatarGroup, AvatarShape, AvatarSize } from 'blend-native'
import type { AvatarGroupNativeProps } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type AvatarGroupPlaygroundProps = Pick<
    AvatarGroupNativeProps,
    'size' | 'shape' | 'maxCount' | 'skeleton'
>

const PEOPLE = [
    'Priya Raman',
    'Arjun Mehta',
    'Sana Qureshi',
    'Dev Patel',
    'Meera Iyer',
    'Rohan Das',
    'Ishaan Nair',
    'Tara Kapoor',
].map((alt, index) => ({ id: index + 1, alt }))

function Preview(props: AvatarGroupPlaygroundProps) {
    const [selected, setSelected] = useState<(string | number)[]>([])
    return (
        <AvatarGroup
            {...props}
            avatars={PEOPLE}
            selectedAvatarIds={selected}
            onSelectionChange={setSelected}
        />
    )
}

const spec: ComponentSpec<AvatarGroupPlaygroundProps> = {
    name: 'AvatarGroup',
    summary:
        'Overlapping avatars that collapse into a +N counter. Press an avatar to select it; the counter opens the rest in a searchable menu.',
    mode: 'inline',
    defaults: {
        size: AvatarSize.MD,
        shape: AvatarShape.CIRCULAR,
        maxCount: 5,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(AvatarSize, 'AvatarSize'),
        },
        {
            kind: 'select',
            key: 'shape',
            label: 'Shape',
            options: enumOptions(AvatarShape, 'AvatarShape'),
        },
        {
            kind: 'select',
            key: 'maxCount',
            label: 'Max visible',
            options: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
                label: String(n),
                value: n,
            })),
        },
        {
            kind: 'toggle',
            key: 'skeleton',
            label: 'Loading skeleton',
            group: 'State',
            on: { show: true },
            off: undefined,
            onCode: '{ show: true }',
        },
    ],
    render: (props) => <Preview {...props} />,
}

export default spec
