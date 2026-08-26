import { useState } from 'react'
import {
    Tag,
    TagColor,
    TagGroup,
    TagSize,
    TagSubType,
    TagType,
} from 'blend-native'
import type { TagNativeProps } from 'blend-native'
import TagShowcase from '../../components/TagShowcase'
import { CHECK_SLOT, STAR_SLOT } from './slots'
import { indent } from '../snippet'
import { enumOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `family` is a playground-only prop: it picks which of the two exported
 * components the stage renders, and is stripped before either of them sees
 * it. It carries no control `code`, so it never reaches the snippet.
 */
type TagFamily = 'Tag' | 'TagGroup'

type TagPlaygroundProps = TagNativeProps & { family: TagFamily }

/** Interactive tags own their pressed state so the toggle is observable. */
function PressableTag({ family, ...props }: TagPlaygroundProps) {
    const [pressed, setPressed] = useState(false)

    if (family === 'TagGroup') {
        return (
            <TagGroup>
                <Tag {...props} text="First" />
                <Tag {...props} text={props.text} />
                <Tag {...props} text="Last" />
            </TagGroup>
        )
    }

    if (!props.onPress) return <Tag {...props} />

    return (
        <Tag
            {...props}
            pressed={pressed}
            onPress={() => setPressed((value) => !value)}
        />
    )
}

const spec: ComponentSpec<TagPlaygroundProps> = {
    name: 'Tag',
    summary:
        'Static label, or a pressable toggle once `onPress` is supplied — mirroring web’s `TagElement = onClick ? PrimitiveButton : Block`. Grouped tags collapse the radius on joined edges.',
    mode: 'inline',
    gallery: TagShowcase,
    defaults: {
        family: 'Tag',
        text: 'Settled',
        type: TagType.SUBTLE,
        color: TagColor.SUCCESS,
        size: TagSize.MD,
        subType: TagSubType.ROUNDED,
    },
    controls: [
        {
            kind: 'segmented',
            key: 'family',
            label: 'Component',
            hidden: true,
            options: unionOptions<TagFamily>()(['Tag', 'TagGroup']),
        },
        {
            kind: 'segmented',
            key: 'type',
            label: 'Type',
            options: enumOptions(TagType, 'TagType'),
        },
        {
            kind: 'select',
            key: 'color',
            label: 'Color',
            options: enumOptions(TagColor, 'TagColor'),
        },
        {
            kind: 'segmented',
            key: 'size',
            label: 'Size',
            options: enumOptions(TagSize, 'TagSize'),
        },
        {
            kind: 'segmented',
            key: 'subType',
            label: 'Shape',
            options: enumOptions(TagSubType, 'TagSubType'),
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
            key: 'onPress',
            label: 'Interactive',
            group: 'State',
            on: () => {},
            off: undefined,
            onCode: 'handlePress',
        },
    ],
    render: (props) => <PressableTag {...props} />,
    wrapSnippet: (inner, props) =>
        props.family === 'TagGroup'
            ? `<TagGroup>\n${indent(inner)}\n</TagGroup>`
            : inner,
}

export default spec
