import {
    Alert,
    AlertActionPosition,
    AlertSubType,
    AlertType,
} from 'blend-native'
import type { AlertActions, AlertNativeProps } from 'blend-native'
import { BELL_NODE } from './slots'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const noop = () => {}

/**
 * `actions` is one object, so position and the two buttons share a control.
 * The list is the shapes worth seeing rather than every permutation.
 */
const ACTION_SETS: readonly {
    label: string
    value: AlertActions | undefined
    code?: string
}[] = [
    { label: 'None', value: undefined },
    {
        label: 'Primary',
        value: { primaryAction: { text: 'Retry', onPress: noop } },
        code: "{ primaryAction: { text: 'Retry', onPress } }",
    },
    {
        label: 'Primary + secondary',
        value: {
            primaryAction: { text: 'Retry', onPress: noop },
            secondaryAction: { text: 'Dismiss', onPress: noop },
        },
        code: "{ primaryAction: { text: 'Retry', onPress }, secondaryAction: { text: 'Dismiss', onPress } }",
    },
    {
        label: 'Inline (right)',
        value: {
            position: AlertActionPosition.RIGHT,
            primaryAction: { text: 'Retry', onPress: noop },
        },
        code: "{ position: AlertActionPosition.RIGHT, primaryAction: { text: 'Retry', onPress } }",
    },
]

const CLOSE_BUTTON = { show: true, onPress: noop }
const ALERT_SLOT = { slot: BELL_NODE }

const spec: ComponentSpec<AlertNativeProps> = {
    name: 'Alert',
    summary:
        'Announced to assistive tech on appearance, matching web’s hard-coded assertive live region. Turn `announce` off for alerts that are part of a screen’s initial content, or several of them talk over each other.',
    mode: 'inline',
    defaults: {
        type: AlertType.PRIMARY,
        subType: AlertSubType.SUBTLE,
        heading: 'Settlement delayed',
        description:
            'The acquirer has not confirmed this batch yet. Payouts will resume once it does.',
        // Off by default: every control change remounts the alert, and an
        // announcement on each one would make the screen reader unusable.
        announce: false,
    },
    controls: [
        {
            kind: 'select',
            key: 'type',
            label: 'Type',
            options: enumOptions(AlertType, 'AlertType'),
        },
        {
            kind: 'select',
            key: 'subType',
            label: 'Sub type',
            options: enumOptions(AlertSubType, 'AlertSubType'),
        },
        {
            kind: 'text',
            key: 'heading',
            label: 'Heading',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'description',
            label: 'Description',
            group: 'Content',
            always: true,
        },
        {
            kind: 'select',
            key: 'actions',
            label: 'Actions',
            group: 'Content',
            options: ACTION_SETS,
        },
        {
            kind: 'toggle',
            key: 'slot',
            label: 'Leading slot',
            group: 'Content',
            on: ALERT_SLOT,
            off: undefined,
            onCode: '{ slot: <Bell size={16} /> }',
        },
        {
            kind: 'toggle',
            key: 'closeButton',
            label: 'Close button',
            group: 'Content',
            on: CLOSE_BUTTON,
            off: undefined,
            onCode: '{ show: true, onPress }',
        },
        {
            kind: 'toggle',
            key: 'announce',
            label: 'Announce on appear',
            group: 'State',
        },
    ],
    render: (props) => <Alert {...props} />,
}

export default spec
