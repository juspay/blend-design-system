'use client'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TabsPreview = () => {
    const tsCode = `import { Tabs, TabsList, TabsTrigger, TabsContent, TabsVariant, TabsSize } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant={TabsVariant.UNDERLINE} size={TabsSize.MD}>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Account content goes here</TabsContent>
      <TabsContent value="tab2">Password content goes here</TabsContent>
      <TabsContent value="tab3">Settings content goes here</TabsContent>
    </Tabs>
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="m-4 min-w-100">
                <Tabs defaultValue="account">
                    <TabsList
                        variant={TabsVariant.UNDERLINE}
                        size={TabsSize.MD}
                    >
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Account Information
                            </h3>
                            <p className="text-gray-600">
                                Manage your account settings and preferences.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Password Settings
                            </h3>
                            <p className="text-gray-600">
                                Update your password and security settings.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                                General Settings
                            </h3>
                            <p className="text-gray-600">
                                Configure your application preferences.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ComponentPreview>
    )
}

export default TabsPreview
