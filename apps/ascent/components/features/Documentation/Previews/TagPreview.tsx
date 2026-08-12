'use client'
import {
    Tag,
    TagVariant,
    TagColor,
    TagSize,
} from '@juspay/blend-design-system/deprecated/tag'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TagPreview = () => {
    const tsCode = `import { Tag, TagVariant, TagColor, TagSize } from "@juspay/blend-design-system/deprecated/tag";

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

    return (
        <ComponentPreview ts={tsCode}>
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
