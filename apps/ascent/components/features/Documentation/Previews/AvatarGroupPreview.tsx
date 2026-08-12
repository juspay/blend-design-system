'use client'
import { AvatarGroup } from '@juspay/blend-design-system'
import {
    AvatarSize,
    AvatarShape,
} from '@juspay/blend-design-system/deprecated/avatar'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AvatarGroupPreview = () => {
    const tsCode = `import { AvatarGroup } from "@juspay/blend-design-system";
import { AvatarSize, AvatarShape } from "@juspay/blend-design-system/deprecated/avatar";

function MyComponent() {
  const avatars = [
    { id: '1', alt: 'John Doe', fallback: 'JD' },
    { id: '2', alt: 'Jane Smith', fallback: 'JS' },
    { id: '3', alt: 'Bob Johnson', fallback: 'BJ' },
    { id: '4', alt: 'Alice Brown', fallback: 'AB' },
    { id: '5', alt: 'Charlie Wilson', fallback: 'CW' },
  ];

  return (
    <AvatarGroup
      avatars={avatars}
      maxCount={3}
      size={AvatarSize.MD}
      shape={AvatarShape.CIRCULAR}
    />
  );
}`

    const reCode = `type avatarSize = [#sm | #md | #lg | #xl]
type avatarShape = [#circular | #rounded]
type avatarData = {
  id: string,
  alt?: string,
  fallback?: string,
  src?: string,
  online?: bool,
}

@react.component
let make = (
  ~avatars: array<avatarData>,
  ~maxCount: option<int>=?,
  ~size: option<avatarSize>=?,
  ~shape: option<avatarShape>=?,
  ~selectedAvatarIds: option<array<string>>=?,
  ~onSelectionChange: option<array<string> => unit>=?,
  ~className: option<string>=?,
) => {
  <AvatarGroupBinding
    avatars
    ?maxCount
    ?size
    ?shape
    ?selectedAvatarIds
    ?onSelectionChange
    ?className
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system/deprecated/avatar/deprecated/avatar") @react.component
external make: (
  ~avatars: array<{
    "id": string,
    "alt": string,
    "fallback": string,
    "src": string,
    "online": bool,
  }>,
  ~maxCount: int=?,
  ~size: [#sm | #md | #lg | #xl]=?,
  ~shape: [#circular | #rounded]=?,
  ~selectedAvatarIds: array<string>=?,
  ~onSelectionChange: array<string> => unit=?,
  ~className: string=?,
) => React.element = "AvatarGroup"`

    // Sample avatar data for the preview
    const sampleAvatars = [
        { id: '1', alt: 'John Doe', fallback: 'JD' },
        { id: '2', alt: 'Jane Smith', fallback: 'JS' },
        { id: '3', alt: 'Bob Johnson', fallback: 'BJ' },
        { id: '4', alt: 'Alice Brown', fallback: 'AB' },
        { id: '5', alt: 'Charlie Wilson', fallback: 'CW' },
        { id: '6', alt: 'Diana Prince', fallback: 'DP' },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground font-manrope">
                        Basic Group (3 avatars)
                    </span>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 3)}
                        size={AvatarSize.MD}
                        shape={AvatarShape.CIRCULAR}
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground font-manrope">
                        With Overflow (+3 more)
                    </span>
                    <AvatarGroup
                        avatars={sampleAvatars}
                        maxCount={3}
                        size={AvatarSize.MD}
                        shape={AvatarShape.CIRCULAR}
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground font-manrope">
                        Different Sizes
                    </span>
                    <div className="flex items-center gap-4">
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 3)}
                            size={AvatarSize.SM}
                            shape={AvatarShape.CIRCULAR}
                        />
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 3)}
                            size={AvatarSize.LG}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default AvatarGroupPreview
