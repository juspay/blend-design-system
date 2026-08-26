import { useEffect } from 'react'
import { SnackbarVariant, addSnackbar } from 'blend-native'
import type { SnackbarOptions } from 'blend-native'
import { indent } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `addSnackbar` is imperative and has no rendered form, so the spec fires it
 * from an effect when the harness trigger flips `open`, then hands control
 * straight back. There is no component in the stage — the snackbar appears
 * over the whole screen from the provider's outlet.
 *
 * This is the design-system surface. `showToast` is the lower-level host it
 * is built on and is not given a spec of its own.
 */
function SnackbarTrigger({
    options,
    open,
    setOpen,
}: {
    options: SnackbarOptions
    open: boolean
    setOpen: (open: boolean) => void
}) {
    useEffect(() => {
        if (!open) return
        addSnackbar(options)
        setOpen(false)
    }, [open, options, setOpen])

    return null
}

const ACTION = {
    label: 'Undo',
    onPress: () => {},
}

const spec: ComponentSpec<SnackbarOptions> = {
    name: 'Snackbar',
    summary:
        'Bottom-centred and imperative. Web’s six positions need a top outlet first, so `position` is omitted from the native options rather than accepted and ignored.',
    mode: 'overlay',
    triggerLabel: 'Show the snackbar',
    defaults: {
        header: 'Refund initiated',
        description: 'It will reach the customer in 3-5 business days.',
        variant: SnackbarVariant.SUCCESS,
        duration: 4000,
    },
    controls: [
        {
            kind: 'segmented',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(SnackbarVariant, 'SnackbarVariant'),
        },
        {
            kind: 'text',
            key: 'header',
            label: 'Header',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'description',
            label: 'Description',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'actionButton',
            label: 'Action button',
            group: 'Content',
            on: ACTION,
            off: undefined,
            onCode: "{ label: 'Undo', onPress }",
        },
        {
            kind: 'select',
            key: 'duration',
            label: 'Duration',
            group: 'State',
            options: [
                { label: '2s', value: 2000, code: '2000' },
                { label: '4s', value: 4000, code: '4000' },
                { label: '8s', value: 8000, code: '8000' },
                {
                    label: 'Until dismissed',
                    value: null,
                    code: 'null',
                },
            ],
        },
    ],
    render: (props, ctx) => (
        <SnackbarTrigger
            options={props}
            open={ctx.open}
            setOpen={ctx.setOpen}
        />
    ),
}

/**
 * `addSnackbar` is a call, not an element, so the generated tag is reshaped
 * into the options object it actually is. Handles the boolean shorthand
 * (`dismissible` with no `=`) as well as `key={value}` and `key="value"`.
 */
function toEntry(line: string): string {
    const trimmed = line.trim()
    const equals = trimmed.indexOf('=')
    if (equals === -1) return `${trimmed}: true,`

    const key = trimmed.slice(0, equals)
    const raw = trimmed.slice(equals + 1)
    const value =
        raw.startsWith('{') && raw.endsWith('}') ? raw.slice(1, -1) : raw
    return `${key}: ${value},`
}

spec.wrapSnippet = (inner) => {
    const entries = inner
        .split('\n')
        .filter((line) => line.startsWith('    '))
        .map(toEntry)

    if (entries.length === 0) return 'addSnackbar({})'
    return `addSnackbar({\n${indent(entries.join('\n'))}\n})`
}

export default spec
