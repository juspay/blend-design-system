'use client'
import { Avatar, AvatarSize, AvatarShape } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AvatarPreview = () => {
    const tsCode = `import { Avatar, AvatarSize, AvatarShape } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Avatar
      src="https://example.com/user-avatar.jpg"
      alt="John Doe"
      size={AvatarSize.MD}
      shape={AvatarShape.CIRCULAR}
      online={true}
    />
  );
}`

    const reCode = `type avatarSize = [#sm | #md | #lg | #xl]
type avatarShape = [#circular | #rounded]

@react.component
let make = (
  ~src: option<string>=?,
  ~alt: option<string>=?,
  ~fallback: option<React.element>=?,
  ~size: option<avatarSize>=?,
  ~shape: option<avatarShape>=?,
  ~online: option<bool>=?,
  ~leadingSlot: option<React.element>=?,
  ~trailingSlot: option<React.element>=?,
  ~className: option<string>=?,
) => {
  <AvatarBinding
    ?src
    ?alt
    ?fallback
    ?size
    ?shape
    ?online
    ?leadingSlot
    ?trailingSlot
    ?className
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~src: string=?,
  ~alt: string=?,
  ~fallback: React.element=?,
  ~size: [#sm | #md | #lg | #xl]=?,
  ~shape: [#circular | #rounded]=?,
  ~online: bool=?,
  ~leadingSlot: React.element=?,
  ~trailingSlot: React.element=?,
  ~className: string=?,
) => React.element = "Avatar"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex items-center gap-4">
                <Avatar
                    alt="John Doe"
                    size={AvatarSize.SM}
                    shape={AvatarShape.CIRCULAR}
                />
                <Avatar
                    alt="Jane Smith"
                    size={AvatarSize.MD}
                    shape={AvatarShape.CIRCULAR}
                    online={true}
                />
                <Avatar
                    alt="Alex Johnson"
                    size={AvatarSize.LG}
                    shape={AvatarShape.ROUNDED}
                />
                <Avatar
                    alt="Sarah Wilson"
                    size={AvatarSize.XL}
                    shape={AvatarShape.CIRCULAR}
                    online={true}
                />
            </div>
        </ComponentPreview>
    )
}

export default AvatarPreview
