'use client'
import {
    SplitTag,
    TagColor,
    TagSize,
    TagShape,
    TagVariant,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

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

    return (
        <ComponentPreview ts={tsCode}>
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
