'use client'
import {
    SplitTag,
    TagColor,
    TagSize,
    TagShape,
    TagVariant,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const SplitTagPreview = () => {
    const tsCode = `import { SplitTag, TagColor, TagSize, TagShape, TagVariant } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <SplitTag
      primaryTag={{
        text: "Status",
        variant: TagVariant.NO_FILL,
        color: TagColor.PRIMARY
      }}
      secondaryTag={{
        text: "Active",
        variant: TagVariant.ATTENTIVE,
        color: TagColor.SUCCESS
      }}
      size={TagSize.MD}
      shape={TagShape.ROUNDED}
    />
  );
}`

    const reCode = `type tagVariant = [#noFill | #attentive | #subtle]
type tagColor = [#neutral | #primary | #success | #error | #warning | #purple]
type tagSize = [#xs | #sm | #md | #lg]
type tagShape = [#rounded | #squarical]

type tagConfig = {
  text: string,
  variant: option<tagVariant>=?,
  color: option<tagColor>=?,
  onClick: option<unit => unit>=?,
}

@react.component
let make = (
  ~primaryTag: tagConfig,
  ~secondaryTag: option<tagConfig>=?,
  ~leadingSlot: option<React.element>=?,
  ~trailingSlot: option<React.element>=?,
  ~size: option<tagSize>=?,
  ~shape: option<tagShape>=?,
) => {
  <SplitTagBinding
    primaryTag
    ?secondaryTag
    ?leadingSlot
    ?trailingSlot
    ?size
    ?shape
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~primaryTag: tagConfig,
  ~secondaryTag: option<tagConfig>=?,
  ~leadingSlot: option<React.element>=?,
  ~trailingSlot: option<React.element>=?,
  ~size: option<tagSize>=?,
  ~shape: option<tagShape>=?,
) => React.element = "SplitTag"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <SplitTag
                primaryTag={{
                    text: 'Status',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Active',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.MD}
                shape={TagShape.ROUNDED}
            />
        </ComponentPreview>
    )
}

export default SplitTagPreview
