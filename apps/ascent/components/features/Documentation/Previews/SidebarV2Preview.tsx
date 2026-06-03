'use client'
import { SidebarV2 } from '@juspay/blend-design-system'
import React from 'react'
import { Home, ChartBar, Settings } from 'lucide-react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SidebarV2Preview = () => {
    const tsCode = `import { SidebarV2 } from '@juspay/blend-design-system'

function MyComponent() {
    const directoryData = [
        {
            id: 'home',
            label: 'Home',
            icon: <HomeIcon />,
            href: '/',
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: <ChartIcon />,
            href: '/analytics',
        },
    ]

    return (
        <SidebarV2
            data={directoryData}
            isExpanded={true}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let directoryData = [
    {id: "home", label: "Home", icon: <HomeIcon />},
    {id: "analytics", label: "Analytics", icon: <ChartIcon />}
  ]

  <SidebarV2Binding data={directoryData} isExpanded={true} />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~data: array<'a>=?,
  ~secondarySidebar: 'b=?,
  ~isExpanded: bool=?,
  ~onExpandedChange: bool => unit=?,
  ~height: string=?,
) => React.element = "SidebarV2"`

    const directoryData = [
        {
            id: 'home',
            label: 'Home',
            icon: (
                <div className="w-4 h-4">
                    <Home />
                </div>
            ),
            href: '/',
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: (
                <div className="w-4 h-4">
                    <ChartBar />
                </div>
            ),
            href: '/analytics',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: (
                <div className="w-4 h-4">
                    <Settings />
                </div>
            ),
            href: '/settings',
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full h-64 bg-gray-100 rounded overflow-hidden">
                <SidebarV2
                    data={directoryData}
                    isExpanded={true}
                    height="100%"
                />
            </div>
        </ComponentPreview>
    )
}

export default SidebarV2Preview
