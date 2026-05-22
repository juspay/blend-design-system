'use client'
import {
    TagGroupV2,
    TagV2,
    TagV2Color,
    TagV2Size,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TagGroupV2Preview = () => {
    const tsCode = `import { TagGroupV2, TagV2, TagV2Color } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <TagGroupV2 stacked={false} gap="8px">
            <TagV2 text="React" color={TagV2Color.PRIMARY} />
            <TagV2 text="TypeScript" color={TagV2Color.SUCCESS} />
            <TagV2 text="NextJS" color={TagV2Color.NEUTRAL} />
            <TagV2 text="Tailwind" color={TagV2Color.WARNING} />
        </TagGroupV2>
    )
}`

    const reCode = `@react.component
let make = () => {
  <TagGroupV2Binding stacked={false} gap="8px">
    <TagV2Binding text="React" color=#primary />
    <TagV2Binding text="TypeScript" color=#success />
    <TagV2Binding text="NextJS" color=#neutral />
  </TagGroupV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~stacked: bool=?,
  ~gap: string=?,
  ~children: React.element,
) => React.element = "TagGroupV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <TagGroupV2 stacked={false} gap="8px">
                <TagV2
                    text="React"
                    size={TagV2Size.SM}
                    color={TagV2Color.PRIMARY}
                />
                <TagV2
                    text="TypeScript"
                    size={TagV2Size.SM}
                    color={TagV2Color.SUCCESS}
                />
                <TagV2
                    text="NextJS"
                    size={TagV2Size.SM}
                    color={TagV2Color.NEUTRAL}
                />
                <TagV2
                    text="Tailwind"
                    size={TagV2Size.SM}
                    color={TagV2Color.WARNING}
                />
            </TagGroupV2>
        </ComponentPreview>
    )
}

export default TagGroupV2Preview
