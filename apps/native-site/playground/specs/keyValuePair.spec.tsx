import { KeyValuePair, KeyValuePairSize } from 'blend-native'
import type {
    KeyValuePairNativeProps,
    KeyValuePairOrientation,
    KeyValuePairTextOverflow,
} from 'blend-native'
import DisplayShowcase from '../../components/DisplayShowcase'
import { CHECK_SLOT } from './slots'
import { enumOptions, numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

const VALUE_RIGHT = { valueRight: CHECK_SLOT.slot }

const spec: ComponentSpec<KeyValuePairNativeProps> = {
    name: 'KeyValuePair',
    summary:
        'Label above or beside a value. Truncation maps to RN `numberOfLines`: truncate is 1 line, wrap-clamp caps at `maxLines`, wrap is unlimited.',
    mode: 'inline',
    gallery: DisplayShowcase,
    defaults: {
        keyString: 'Transaction ID',
        value: 'ord_9f2c41ab77e3',
        size: KeyValuePairSize.MD,
        orientation: 'vertical',
        textOverflow: 'wrap',
        maxLines: 2,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(KeyValuePairSize, 'KeyValuePairSize'),
        },
        {
            kind: 'select',
            key: 'orientation',
            label: 'Orientation',
            options: unionOptions<KeyValuePairOrientation>()([
                'vertical',
                'horizontal',
            ]),
        },
        {
            kind: 'select',
            key: 'textOverflow',
            label: 'Text overflow',
            options: unionOptions<KeyValuePairTextOverflow>()([
                'truncate',
                'wrap',
                'wrap-clamp',
            ]),
        },
        {
            kind: 'select',
            key: 'maxLines',
            label: 'Max lines (wrap-clamp)',
            options: numberOptions([1, 2, 3]),
        },
        {
            kind: 'text',
            key: 'keyString',
            label: 'Key',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'value',
            label: 'Value',
            group: 'Content',
            always: true,
        },
        {
            kind: 'toggle',
            key: 'slots',
            label: 'Trailing slot',
            group: 'Content',
            on: VALUE_RIGHT,
            off: undefined,
            onCode: '{ valueRight: <Check size={14} /> }',
        },
    ],
    render: (props) => (
        // Bounded so `truncate` and `wrap-clamp` have an edge to act against —
        // in an unconstrained stage every value fits and the control looks inert.
        <KeyValuePair {...props} maxWidth={220} />
    ),
}

export default spec
