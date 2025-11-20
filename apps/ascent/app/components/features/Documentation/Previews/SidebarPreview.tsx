'use client'
import { Sidebar } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SidebarPreview = () => {
    const tsCode = `import { Sidebar } from "@juspay/blend-design-system";

function MyComponent() {
  const directoryData = [
    {
      id: '1',
      label: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon size={16} />,
    },
    {
      id: '2', 
      label: 'Projects',
      href: '/projects',
      icon: <ProjectsIcon size={16} />,
      children: [
        {
          id: '2-1',
          label: 'Active Projects',
          href: '/projects/active',
        },
        {
          id: '2-2',
          label: 'Completed',
          href: '/projects/completed',
        }
      ]
    },
    {
      id: '3',
      label: 'Settings',
      href: '/settings',
      icon: <SettingsIcon size={16} />,
    }
  ];

  return (
    <Sidebar
      data={directoryData}
      topbar={
        <div className="flex items-center justify-between w-full">
          <h1>My Application</h1>
          <button>Profile</button>
        </div>
      }
      footer={
        <div className="flex items-center gap-2">
          <span>User Name</span>
        </div>
      }
    >
      <div className="p-6">
        <h2>Main Content Area</h2>
        <p>Your main application content goes here.</p>
      </div>
    </Sidebar>
  );
}`

    const reCode = `type leftPanelItem = {
  label: string,
  icon: React.element,
  value: option<string>,
  showInPanel: option<bool>
}

type leftPanelInfo = {
  items: array<leftPanelItem>,
  selected: string,
  onSelect: string => unit
}

@react.component
let make = (
  ~children: React.element,
  ~data: array<directoryData>,
  ~leftPanel: option<leftPanelInfo>=?,
  ~topbar: React.element,
  ~footer: option<React.element>=?,
  ~sidebarTopSlot: option<React.element>=?,
  ~sidebarCollapseKey: option<string>=?,
) => {
  <SidebarBinding
    children
    data
    ?leftPanel
    topbar
    ?footer
    ?sidebarTopSlot
    ?sidebarCollapseKey
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~children: React.element,
  ~data: array<{
    "id": string,
    "label": string,
    "href": string=?,
    "icon": React.element=?,
    "children": array<{
      "id": string,
      "label": string,
      "href": string=?
    }>=?
  }>,
  ~leftPanel: {
    "items": array<{
      "label": string,
      "icon": React.element,
      "value": string=?,
      "showInPanel": bool=?
    }>,
    "selected": string,
    "onSelect": string => unit
  }=?,
  ~topbar: React.element,
  ~footer: React.element=?,
  ~sidebarTopSlot: React.element=?,
  ~sidebarCollapseKey: string=?,
) => React.element = "Sidebar"`

    const mockDirectoryData = [
        {
            id: '1',
            label: 'Dashboard',
            href: '/dashboard',
            icon: '📊',
        },
        {
            id: '2',
            label: 'Projects',
            href: '/projects',
            icon: '📁',
            children: [
                {
                    id: '2-1',
                    label: 'Active',
                    href: '/projects/active',
                },
                {
                    id: '2-2',
                    label: 'Completed',
                    href: '/projects/completed',
                },
            ],
        },
        {
            id: '3',
            label: 'Settings',
            href: '/settings',
            icon: '⚙️',
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    width: '100%',
                    height: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                <Sidebar
                    data={mockDirectoryData}
                    topbar={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                fontSize: '14px',
                                color: '#374151',
                            }}
                        >
                            <span style={{ fontWeight: '600' }}>
                                My Application
                            </span>
                            <button
                                style={{
                                    padding: '4px 8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    background: 'white',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                }}
                            >
                                Profile
                            </button>
                        </div>
                    }
                    footer={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '12px',
                                color: '#6b7280',
                            }}
                        >
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                👤
                            </div>
                            <span>John Doe</span>
                        </div>
                    }
                >
                    <div
                        style={{
                            padding: '24px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#6b7280',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#111827',
                            }}
                        >
                            Main Content Area
                        </h3>
                        <p
                            style={{
                                margin: '0',
                                fontSize: '14px',
                            }}
                        >
                            Your application content goes here
                        </p>
                    </div>
                </Sidebar>
            </div>
        </ComponentPreview>
    )
}

export default SidebarPreview
