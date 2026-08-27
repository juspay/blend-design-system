import { Spinner } from 'blend-native'
import type {
    SpinnerColor,
    SpinnerNativeProps,
    SpinnerSize,
} from 'blend-native'
import LoadingShowcase from '../../components/LoadingShowcase'
import { unionOptions } from '../types'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<SpinnerNativeProps> = {
    name: 'Spinner',
    summary:
        'Indeterminate activity. Web animates the arc with SMIL; native rotates the same geometry with Reanimated, and both render it static under reduce-motion.',
    mode: 'inline',
    gallery: LoadingShowcase,
    defaults: { size: 'md', color: 'default' },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: unionOptions<SpinnerSize>()(['sm', 'md', 'lg']),
        },
        {
            kind: 'select',
            key: 'color',
            label: 'Color',
            options: unionOptions<SpinnerColor>()([
                'default',
                'primary',
                'inverse',
            ]),
        },
        {
            kind: 'toggle',
            key: 'overlay',
            label: 'Blocking overlay',
            group: 'State',
        },
        {
            kind: 'text',
            key: 'label',
            label: 'Screen-reader label',
            group: 'Content',
            placeholder: 'Loading',
        },
    ],
    render: (props) => <Spinner {...props} />,
}

export default spec
