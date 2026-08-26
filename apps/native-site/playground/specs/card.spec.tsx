import { Card, CardOrientation, CardPadding, CardVariant } from 'blend-native'
import type { CardNativeProps } from 'blend-native'
import DisplayShowcase from '../../components/DisplayShowcase'
import { MEDIA_NODE } from './slots'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const noop = () => {}

const spec: ComponentSpec<CardNativeProps> = {
    name: 'Card',
    summary:
        'Surface for grouped content. Web’s `interactive` becomes `onPress` here: providing it renders a Pressable card with a button role.',
    mode: 'inline',
    gallery: DisplayShowcase,
    defaults: {
        variant: CardVariant.OUTLINED,
        orientation: CardOrientation.VERTICAL,
        padding: CardPadding.COMFORTABLE,
        title: 'Settlement summary',
        subtitle: 'Updated 4 minutes ago',
        description:
            'Payouts for the current cycle have been reconciled against the acquirer statement.',
    },
    controls: [
        {
            kind: 'segmented',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(CardVariant, 'CardVariant'),
        },
        {
            kind: 'segmented',
            key: 'orientation',
            label: 'Orientation',
            options: enumOptions(CardOrientation, 'CardOrientation'),
        },
        {
            kind: 'segmented',
            key: 'padding',
            label: 'Padding',
            options: enumOptions(CardPadding, 'CardPadding'),
        },
        { kind: 'toggle', key: 'centered', label: 'Centered' },
        {
            kind: 'text',
            key: 'eyebrow',
            label: 'Eyebrow',
            group: 'Content',
            placeholder: 'PAYOUTS',
        },
        {
            kind: 'text',
            key: 'title',
            label: 'Title',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'subtitle',
            label: 'Subtitle',
            group: 'Content',
        },
        {
            kind: 'text',
            key: 'description',
            label: 'Description',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'media',
            label: 'Media',
            group: 'Content',
            on: MEDIA_NODE,
            off: undefined,
            onCode: '<Image ... />',
        },
        {
            kind: 'toggle',
            key: 'truncateTitle',
            label: 'Truncate title',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'onPress',
            label: 'Pressable',
            group: 'State',
            on: noop,
            off: undefined,
            onCode: 'handlePress',
        },
        {
            // Web parity: selected chrome and the selected a11y state only
            // apply to a pressable card, so this does nothing on its own.
            // Surfacing that is more useful than hiding it.
            kind: 'toggle',
            key: 'selected',
            label: 'Selected (needs Pressable)',
            group: 'State',
        },
    ],
    render: (props) => <Card {...props} maxWidth={280} />,
}

export default spec
