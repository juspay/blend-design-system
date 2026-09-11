import { StyleSheet, Text } from 'react-native'
import { Modal } from 'blend-native'
import type { ModalNativeProps } from 'blend-native'
import type { ComponentSpec } from '../types'

/** `isOpen`/`onClose` come from the harness — the stage owns visibility. */
type ModalPlaygroundProps = Omit<ModalNativeProps, 'isOpen' | 'onClose'>

const CONFIRM = { text: 'Confirm' }
const CANCEL = { text: 'Cancel' }

const spec: ComponentSpec<ModalPlaygroundProps> = {
    name: 'Modal',
    summary:
        'On phones it presents as a bottom sheet (web renders vaul under 1024px); on tablets it is a centered dialog. Backdrop press, drag, Android back and VoiceOver escape all dismiss.',
    mode: 'overlay',
    triggerLabel: 'Open the modal',
    defaults: {
        title: 'Confirm payout',
        subtitle: 'This cannot be undone',
        showHeader: true,
        showFooter: true,
        showDivider: true,
        showCloseButton: true,
        closeOnBackdropClick: true,
        primaryAction: CONFIRM,
        secondaryAction: CANCEL,
    },
    controls: [
        { kind: 'text', key: 'title', label: 'Title', group: 'Content' },
        {
            kind: 'text',
            key: 'subtitle',
            label: 'Subtitle',
            group: 'Content',
        },
        { kind: 'toggle', key: 'showHeader', label: 'Header', group: 'State' },
        { kind: 'toggle', key: 'showFooter', label: 'Footer', group: 'State' },
        {
            kind: 'toggle',
            key: 'showDivider',
            label: 'Dividers',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'showCloseButton',
            label: 'Close button',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'closeOnBackdropClick',
            label: 'Backdrop dismiss',
            group: 'State',
        },
    ],
    render: (props, ctx) => (
        <Modal {...props} isOpen={ctx.open} onClose={() => ctx.setOpen(false)}>
            <Text style={styles.body}>
                Review the payout details before confirming. The body scrolls
                when content outgrows the surface.
            </Text>
        </Modal>
    ),
}

const styles = StyleSheet.create({
    body: { fontSize: 14, lineHeight: 21, color: '#374151' },
})

export default spec
