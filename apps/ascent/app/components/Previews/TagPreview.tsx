'use client'
import { Tag, TagVariant, TagColor, TagSize } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const TagPreview = () => {
    const tsCode = `import { Tag, TagVariant, TagColor, TagSize } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Tag
      text="Success"
      variant={TagVariant.SUBTLE}
      color={TagColor.SUCCESS}
      size={TagSize.MD}
      onClick={() => console.log("tag clicked")}
    />
  );
}`

    const reCode = `type tagVariant = [#noFill | #attentive | #subtle]
type tagColor = [#neutral | #primary | #success | #error | #warning | #purple]
type tagSize = [#xs | #sm | #md | #lg]
type tagShape = [#rounded | #squarical]

@react.component
let make = (
  ~text: string,
  ~variant: option<tagVariant>=?,
  ~color: option<tagColor>=?,
  ~size: option<tagSize>=?,
  ~shape: option<tagShape>=?,
  ~leftSlot: option<React.element>=?,
  ~rightSlot: option<React.element>=?,
  ~onClick: option<unit => unit>=?,
  ~splitTagPosition: option<[#left | #right]>=?,
) => {
  <TagBinding
    ?text
    ?variant
    ?color
    ?size
    ?shape
    ?leftSlot
    ?rightSlot
    ?onClick
    ?splitTagPosition
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~text: string,
  ~variant: [#noFill | #attentive | #subtle]=?,
  ~color: [#neutral | #primary | #success | #error | #warning | #purple]=?,
  ~size: [#xs | #sm | #md | #lg]=?,
  ~shape: [#rounded | #squarical]=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~onClick: unit => unit=?,
  ~splitTagPosition: [#left | #right]=?,
) => React.element = "Tag"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Tag
                text="Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
                size={TagSize.MD}
                onClick={() => console.log('tag clicked')}
            />
        </ComponentPreview>
    )
}

export default TagPreview
