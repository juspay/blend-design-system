import { SplitTag, TagColor, TagSize, TagSubType } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type SplitTagPlaygroundProps = {
    size: TagSize
    subType: TagSubType
    primaryText: string
    secondaryText: string
    primaryColor: TagColor
    secondaryColor: TagColor
    hasSecondary: boolean
}

const spec: ComponentSpec<SplitTagPlaygroundProps> = {
    name: 'SplitTag',
    summary:
        'Two tags joined edge to edge: a quiet primary beside an emphasised secondary. Built on Tag’s own group position, so the shared corners square off.',
    mode: 'inline',
    defaults: {
        size: TagSize.MD,
        subType: TagSubType.SQUARICAL,
        primaryText: 'Status',
        secondaryText: 'Settled',
        primaryColor: TagColor.PRIMARY,
        secondaryColor: TagColor.SUCCESS,
        hasSecondary: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            hidden: true,
            options: enumOptions(TagSize, 'TagSize'),
        },
        {
            kind: 'select',
            key: 'subType',
            label: 'Shape',
            hidden: true,
            options: enumOptions(TagSubType, 'TagSubType'),
        },
        {
            kind: 'select',
            key: 'primaryColor',
            label: 'Primary color',
            hidden: true,
            options: enumOptions(TagColor, 'TagColor'),
        },
        {
            kind: 'select',
            key: 'secondaryColor',
            label: 'Secondary color',
            hidden: true,
            options: enumOptions(TagColor, 'TagColor'),
        },
        {
            kind: 'text',
            key: 'primaryText',
            label: 'Primary text',
            group: 'Content',
            hidden: true,
        },
        {
            kind: 'text',
            key: 'secondaryText',
            label: 'Secondary text',
            group: 'Content',
            hidden: true,
        },
        {
            kind: 'toggle',
            key: 'hasSecondary',
            label: 'Secondary tag',
            group: 'Content',
            hidden: true,
        },
    ],
    render: (props) => (
        <SplitTag
            size={props.size}
            subType={props.subType}
            primaryTag={{
                text: props.primaryText,
                color: props.primaryColor,
            }}
            secondaryTag={
                props.hasSecondary
                    ? {
                          text: props.secondaryText,
                          color: props.secondaryColor,
                      }
                    : undefined
            }
        />
    ),
    wrapSnippet: (_inner, props) => {
        const side = (text: string, color: TagColor) =>
            `{ text: "${text}", color: TagColor.${Object.entries(TagColor).find(([, v]) => v === color)?.[0]} }`
        const lines = [
            props.size !== TagSize.MD
                ? `size={TagSize.${Object.entries(TagSize).find(([, v]) => v === props.size)?.[0]}}`
                : null,
            props.subType !== TagSubType.SQUARICAL
                ? `subType={TagSubType.${Object.entries(TagSubType).find(([, v]) => v === props.subType)?.[0]}}`
                : null,
            `primaryTag={${side(props.primaryText, props.primaryColor)}}`,
            props.hasSecondary
                ? `secondaryTag={${side(props.secondaryText, props.secondaryColor)}}`
                : null,
        ].filter(Boolean)
        return `<SplitTag\n${lines.map((l) => `    ${l}`).join('\n')}\n/>`
    },
}

export default spec
