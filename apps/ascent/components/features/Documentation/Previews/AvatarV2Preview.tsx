'use client'
import {
    AvatarV2,
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AvatarV2Preview = () => {
    const tsCode = `import {
    AvatarV2,
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <AvatarV2
            src="https://example.com/avatar.jpg"
            alt="User Avatar"
            fallbackText="JD"
            size={AvatarV2Size.MD}
            shape={AvatarV2Shape.CIRCULAR}
            status={{
                type: AvatarV2Status.ONLINE,
                position: AvatarV2StatusPosition.BOTTOM_RIGHT
            }}
        />
    )
}`

    const reCode = `type avatarV2Size = [#sm | #regular | #md | #lg | #xl]
type avatarV2Shape = [#circular | #rounded]
type avatarV2Status = [#none | #online | #offline | #away | #busy]

@react.component
let make = () => {
  <AvatarV2Binding
    src="https://example.com/avatar.jpg"
    alt="User Avatar"
    fallbackText="JD"
    size=#md
    shape=#circular
    status={{type: #online, position: #bottomRight}}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~src: string=?,
  ~alt: string=?,
  ~fallbackText: string=?,
  ~size: [#sm | #regular | #md | #lg | #xl]=?,
  ~shape: [#circular | #rounded]=?,
  ~status: {type: [#none | #online | #offline | #away | #busy], position?: [#topRight | #bottomRight | #topLeft | #bottomLeft]}=?,
  ~disabled: bool=?,
) => React.element = "AvatarV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex items-center gap-4">
                <AvatarV2
                    fallbackText="JD"
                    size={AvatarV2Size.MD}
                    shape={AvatarV2Shape.CIRCULAR}
                    status={{
                        type: AvatarV2Status.ONLINE,
                        position: AvatarV2StatusPosition.BOTTOM_RIGHT,
                    }}
                />
                <AvatarV2
                    fallbackText="AS"
                    size={AvatarV2Size.LG}
                    shape={AvatarV2Shape.ROUNDED}
                    status={{
                        type: AvatarV2Status.BUSY,
                        position: AvatarV2StatusPosition.BOTTOM_RIGHT,
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default AvatarV2Preview
