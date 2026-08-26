import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonSubType,
    ButtonType,
    IconButton,
    LinkButton,
} from 'blend-native'
import type { ButtonNativeProps } from 'blend-native'
import ButtonShowcase from '../../components/ButtonShowcase'
import { BELL_NODE, CHECK_SLOT, STAR_SLOT } from './slots'
import { indent } from '../snippet'
import { enumOptions, numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * Which of the four exported components the stage renders. Playground-only,
 * so it is `hidden` from the snippet; `wrapSnippet` renames the element
 * instead.
 */
type ButtonFamily = 'Button' | 'IconButton' | 'LinkButton' | 'ButtonGroup'

type ButtonPlaygroundProps = ButtonNativeProps & { family: ButtonFamily }

/**
 * Strips props a narrower family does not accept. Spreading them through
 * would not be a type error — TypeScript skips excess-property checks on a
 * JSX spread — but it would reach the component at runtime and undo the
 * thing that makes the family distinct.
 */
function omit<T extends object, K extends keyof T>(
    source: T,
    keys: readonly K[]
): Omit<T, K> {
    const next = { ...source }
    for (const key of keys) delete next[key]
    return next
}

function ButtonFamilyPreview({ family, ...props }: ButtonPlaygroundProps) {
    if (family === 'IconButton') {
        // The icon-only shape cannot be undone from outside: `text`, the
        // slots and `subType` are absent from IconButton's props on purpose.
        return (
            <IconButton
                {...omit(props, ['text', 'subType', 'leftSlot', 'rightSlot'])}
                icon={BELL_NODE}
                accessibilityLabel="Notifications"
            />
        )
    }

    if (family === 'LinkButton') {
        return (
            <LinkButton
                {...omit(props, ['justifyContent', 'buttonGroupPosition'])}
            />
        )
    }

    if (family === 'ButtonGroup') {
        return (
            <ButtonGroup>
                <Button {...props} text="Back" />
                <Button {...props} />
                <Button {...props} text="Next" />
            </ButtonGroup>
        )
    }

    return <Button {...props} />
}

/** Removes whole prop lines from a rendered block. */
function dropProps(jsx: string, keys: readonly string[]): string {
    return jsx
        .split('\n')
        .filter((line) => {
            const trimmed = line.trim()
            return !keys.some(
                (key) => trimmed === key || trimmed.startsWith(`${key}=`)
            )
        })
        .join('\n')
}

const spec: ComponentSpec<ButtonPlaygroundProps> = {
    name: 'Button',
    summary:
        'Four exports over one token slot. LinkButton differs only by announcing as a link — RN has no anchor, so navigation is the app’s job in `onPress`.',
    mode: 'inline',
    gallery: ButtonShowcase,
    defaults: {
        family: 'Button',
        text: 'Continue',
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        subType: ButtonSubType.DEFAULT,
    },
    controls: [
        {
            kind: 'select',
            key: 'family',
            label: 'Component',
            hidden: true,
            options: unionOptions<ButtonFamily>()([
                'Button',
                'IconButton',
                'LinkButton',
                'ButtonGroup',
            ]),
        },
        {
            kind: 'segmented',
            key: 'buttonType',
            label: 'Type',
            options: enumOptions(ButtonType, 'ButtonType'),
        },
        {
            kind: 'segmented',
            key: 'size',
            label: 'Size',
            options: enumOptions(ButtonSize, 'ButtonSize'),
        },
        {
            kind: 'segmented',
            key: 'subType',
            label: 'Sub type',
            options: enumOptions(ButtonSubType, 'ButtonSubType'),
        },
        {
            kind: 'segmented',
            key: 'width',
            label: 'Width',
            // `Auto` writes `undefined`: without it a width, once set, could
            // not be cleared, since no other option produces the unset value.
            options: [
                { label: 'Auto', value: undefined },
                ...numberOptions([120, 200, 280]),
            ],
        },
        {
            kind: 'text',
            key: 'text',
            label: 'Text',
            group: 'Content',
            always: true,
        },
        {
            kind: 'toggle',
            key: 'leftSlot',
            label: 'Left slot',
            group: 'Content',
            on: STAR_SLOT,
            off: undefined,
            onCode: '{ slot: <Star size={14} /> }',
        },
        {
            kind: 'toggle',
            key: 'rightSlot',
            label: 'Right slot',
            group: 'Content',
            on: CHECK_SLOT,
            off: undefined,
            onCode: '{ slot: <Check size={14} /> }',
        },
        {
            kind: 'toggle',
            key: 'loading',
            label: 'Loading',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'disabled',
            label: 'Disabled',
            group: 'State',
        },
    ],
    render: (props) => <ButtonFamilyPreview {...props} />,
    wrapSnippet: (inner, props) => {
        if (props.family === 'ButtonGroup') {
            return `<ButtonGroup>\n${indent(inner)}\n</ButtonGroup>`
        }
        if (props.family === 'IconButton') {
            // IconButton's type omits these, so leaving them in would print
            // JSX that does not compile.
            const stripped = dropProps(inner, [
                'text',
                'subType',
                'leftSlot',
                'rightSlot',
            ])
            return stripped
                .replace('<Button', '<IconButton')
                .replace(
                    /\n\/>$/,
                    '\n    icon={<Bell size={16} />}' +
                        '\n    accessibilityLabel="Notifications"\n/>'
                )
        }
        if (props.family === 'LinkButton') {
            return dropProps(inner, ['justifyContent']).replace(
                '<Button',
                '<LinkButton'
            )
        }
        return inner
    },
}

export default spec
