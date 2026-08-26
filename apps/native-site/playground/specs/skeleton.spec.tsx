import { Skeleton } from 'blend-native'
import type {
    SkeletonNativeProps,
    SkeletonShape,
    SkeletonVariant,
} from 'blend-native'
import LoadingShowcase from '../../components/LoadingShowcase'
import { numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<SkeletonNativeProps> = {
    name: 'Skeleton',
    summary:
        'Placeholder box while content loads. `pulse` breathes; `wave` and `shimmer` sweep a gradient across it.',
    mode: 'inline',
    gallery: LoadingShowcase,
    defaults: { variant: 'pulse', shape: 'rounded', width: 200, height: 20 },
    controls: [
        {
            kind: 'segmented',
            key: 'variant',
            label: 'Variant',
            options: unionOptions<SkeletonVariant>()([
                'pulse',
                'wave',
                'shimmer',
            ]),
        },
        {
            kind: 'segmented',
            key: 'shape',
            label: 'Shape',
            options: unionOptions<SkeletonShape>()([
                'rectangle',
                'rounded',
                'circle',
            ]),
        },
        {
            kind: 'segmented',
            key: 'width',
            label: 'Width',
            options: numberOptions([80, 140, 200, 260]),
        },
        {
            kind: 'segmented',
            key: 'height',
            label: 'Height',
            options: numberOptions([12, 20, 48, 80]),
        },
    ],
    render: (props) => <Skeleton {...props} />,
}

export default spec
