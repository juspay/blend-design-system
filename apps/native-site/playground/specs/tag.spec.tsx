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
import { indent, replaceProp } from '../snippet'
import { enumOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `family` and `stacked` are playground-only: they pick which component the
 * stage renders and how the group joins its members. Both are `hidden`, so
 * they never reach the snippet as props of `Tag`; `wrapSnippet` expresses
 * them as the wrapper instead.
 */
type TagFamily = 'Tag' | 'TagGroup'

type TagPlaygroundProps = TagNativeProps & {
    family: TagFamily
    stacked: boolean
}

const noop = () => {}

/**
 * An interactive tag owns its own pressed state, so the toggle the control
 * exists to demonstrate is actually observable. Group members each get their
 * own — pressing one must not move its neighbours.
 *
 * `TagGroup` clones its children to inject `tagGroupPosition`, and the
 * injected prop arrives here in `props` and is spread straight through.
 */
function InteractiveTag(props: TagNativeProps) {
    const [pressed, setPressed] = useState(false)
    return (
        <Tag
            {...props}
            pressed={pressed}
            onPress={() => setPressed((value) => !value)}
        />
    )
}

function TagPreview({ family, stacked, ...props }: TagPlaygroundProps) {
    // Swapping the component type on `onPress` also remounts it, which is
    // what clears a stale pressed state when the toggle goes off and on.
    const Item = props.onPress ? InteractiveTag : Tag

    if (family === 'TagGroup') {
        return (
            <TagGroup stacked={stacked}>
                <Item {...props} text="First" />
                <Item {...props} />
                <Item {...props} text="Last" />
            </TagGroup>
        )
    }

    return <Item {...props} />
}

const spec: ComponentSpec<TagPlaygroundProps> = {
    name: 'Tag',
    summary:
        'Static label, or a pressable toggle once `onPress` is supplied — mirroring web’s `TagElement = onClick ? PrimitiveButton : Block`. A stacked group collapses the radius on joined edges.',
    mode: 'inline',
    gallery: TagShowcase,
    defaults: {
        family: 'Tag',
        stacked: true,
        text: 'Settled',
        type: TagType.SUBTLE,
        color: TagColor.SUCCESS,
        size: TagSize.MD,
        subType: TagSubType.ROUNDED,
    },
    controls: [
        {
            kind: 'select',
            key: 'family',
            label: 'Component',
            hidden: true,
            options: unionOptions<TagFamily>()(['Tag', 'TagGroup']),
        },
        {
            kind: 'toggle',
            key: 'stacked',
            label: 'Stacked (TagGroup only)',
            hidden: true,
        },
        {
            kind: 'select',
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
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(TagSize, 'TagSize'),
        },
        {
            kind: 'select',
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
            on: noop,
            off: undefined,
            onCode: 'handlePress',
        },
    ],
    render: (props) => <TagPreview {...props} />,
    // The stage renders three members in group mode, so the snippet does
    // too — a one-member group is exactly the case where the radius
    // collapsing this mode exists to show does not happen.
    wrapSnippet: (inner, props) => {
        if (props.family !== 'TagGroup') return inner
        const members = [
            replaceProp(inner, 'text', '"First"'),
            inner,
            replaceProp(inner, 'text', '"Last"'),
        ]
        const open = props.stacked ? '<TagGroup stacked>' : '<TagGroup>'
        return `${open}\n${members.map((m) => indent(m)).join('\n')}\n</TagGroup>`
    },
}

export default spec
