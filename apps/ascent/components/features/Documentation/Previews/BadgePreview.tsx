'use client'
import { Badge, BadgeColor, BadgeSize } from '@juspay/blend-design-system'
import { BellIcon, EnvelopeIcon } from '@phosphor-icons/react'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const BadgePreview = () => {
    const tsCode = `import { Badge, BadgeColor, BadgeSize } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <>
            <Badge count={5} color={BadgeColor.ALERT} size={BadgeSize.MD} />
            <Badge text="New" color={BadgeColor.SUCCESS} />
            <Badge color={BadgeColor.PRIMARY} />
            {/* Wrapped badge on an icon */}
            <Badge count={10} position="top-right">
                <BellIcon size={24} />
            </Badge>
        </>
    )
}`

    const reCode = `type badgeColor = [#alert | #neutral | #warning | #primary | #success]
type badgeSize = [#sm | #md | #lg]
type badgePosition = [#"top-right" | #"top-left" | #"bottom-right" | #"bottom-left"]

@react.component
let make = () => {
  <>
    <BadgeBinding count={5} color=#alert size=#md />
    <BadgeBinding text="New" color=#success />
    <BadgeBinding color=#primary />
    <BadgeBinding count={10} position=#"top-right">
      <BellIcon size={24} />
    </BadgeBinding>
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~count: int=?,
  ~maxCount: int=?,
  ~size: [#sm | #md | #lg]=?,
  ~color: [#alert | #neutral | #warning | #primary | #success]=?,
  ~text: string=?,
  ~showBadge: bool=?,
  ~showZero: bool=?,
  ~position: [#"top-right" | #"top-left" | #"bottom-right" | #"bottom-left"]=?,
  ~offset: (int, int)=?,
  ~isCircular: bool=?,
  ~children: React.element=?,
) => React.element = "Badge"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-wrap items-center gap-6">
                {/* Count badges with different colors */}
                <div className="flex items-center gap-4">
                    <Badge
                        count={5}
                        color={BadgeColor.ALERT}
                        size={BadgeSize.MD}
                    />
                    <Badge
                        count={100}
                        color={BadgeColor.SUCCESS}
                        size={BadgeSize.MD}
                    />
                    <Badge
                        count={8}
                        color={BadgeColor.WARNING}
                        size={BadgeSize.MD}
                    />
                    <Badge
                        count={3}
                        color={BadgeColor.PRIMARY}
                        size={BadgeSize.MD}
                    />
                </div>

                {/* Text badges */}
                <div className="flex items-center gap-4">
                    <Badge text="New" color={BadgeColor.SUCCESS} />
                    <Badge text="Beta" color={BadgeColor.PRIMARY} />
                    <Badge text="Soon" color={BadgeColor.WARNING} />
                </div>

                {/* Dot badges */}
                <div className="flex items-center gap-4">
                    <Badge color={BadgeColor.ALERT} />
                    <Badge color={BadgeColor.SUCCESS} />
                    <Badge color={BadgeColor.PRIMARY} />
                </div>

                {/* Size variations */}
                <div className="flex items-center gap-4">
                    <Badge count={5} size={BadgeSize.SM} />
                    <Badge count={5} size={BadgeSize.MD} />
                    <Badge count={5} size={BadgeSize.LG} />
                </div>

                {/* Wrapped badges on icons */}
                <div className="flex items-center gap-6">
                    <Badge count={10} position="top-right">
                        <div className="p-2 border border-border rounded-lg">
                            <BellIcon size={24} />
                        </div>
                    </Badge>
                    <Badge
                        count={5}
                        color={BadgeColor.SUCCESS}
                        position="top-right"
                    >
                        <div className="p-2 border border-border rounded-lg">
                            <EnvelopeIcon size={24} />
                        </div>
                    </Badge>
                    <Badge color={BadgeColor.ALERT} position="top-right">
                        <div className="p-2 border border-border rounded-lg">
                            <BellIcon size={24} />
                        </div>
                    </Badge>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default BadgePreview
