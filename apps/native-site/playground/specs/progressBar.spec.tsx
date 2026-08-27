import {
    ProgressBar,
    ProgressBarAppearance,
    ProgressBarSize,
    ProgressBarVariant,
} from 'blend-native'
import type { ProgressBarNativeProps } from 'blend-native'
import LoadingShowcase from '../../components/LoadingShowcase'
import { enumOptions, numberOptions } from '../types'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<ProgressBarNativeProps> = {
    name: 'ProgressBar',
    summary:
        'Determinate progress only, like web. Native draws discrete ticks for the segmented track — RN has no repeating-linear-gradient.',
    mode: 'inline',
    gallery: LoadingShowcase,
    defaults: {
        value: 60,
        size: ProgressBarSize.MD,
        variant: ProgressBarVariant.LINEAR,
        appearance: ProgressBarAppearance.SOLID,
        showLabel: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'value',
            label: 'Value',
            always: true,
            options: numberOptions([0, 25, 60, 100]),
        },
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(ProgressBarSize, 'ProgressBarSize'),
        },
        {
            kind: 'select',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(ProgressBarVariant, 'ProgressBarVariant'),
        },
        {
            kind: 'select',
            key: 'appearance',
            label: 'Appearance',
            options: enumOptions(
                ProgressBarAppearance,
                'ProgressBarAppearance'
            ),
        },
        {
            kind: 'toggle',
            key: 'showLabel',
            label: 'Show label',
            group: 'Content',
        },
    ],
    render: (props) => (
        <ProgressBar
            {...props}
            // The circular variant sizes itself from tokens; only the linear
            // track needs a width to stretch into.
            style={
                props.variant === ProgressBarVariant.LINEAR
                    ? { width: 240 }
                    : undefined
            }
        />
    ),
}

export default spec
