'use client'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TabsV2Preview = () => {
    const tsCode = `import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <TabsV2 defaultValue="tab1" variant={TabsV2Variant.BOXED}>
            <TabsV2List>
                <TabsV2Trigger value="tab1">Overview</TabsV2Trigger>
                <TabsV2Trigger value="tab2">Details</TabsV2Trigger>
                <TabsV2Trigger value="tab3">Settings</TabsV2Trigger>
            </TabsV2List>
            <TabsV2Content value="tab1">
                Overview content here
            </TabsV2Content>
            <TabsV2Content value="tab2">
                Details content here
            </TabsV2Content>
            <TabsV2Content value="tab3">
                Settings content here
            </TabsV2Content>
        </TabsV2>
    )
}`

    const reCode = `type tabsV2Variant = [#boxed | #floating | #underline | #pills]

@react.component
let make = () => {
  <TabsV2Binding defaultValue="tab1" variant=#boxed>
    <TabsV2ListBinding>
      <TabsV2TriggerBinding value="tab1">
        {React.string("Overview")}
      </TabsV2TriggerBinding>
      <TabsV2TriggerBinding value="tab2">
        {React.string("Details")}
      </TabsV2TriggerBinding>
    </TabsV2ListBinding>
    <TabsV2ContentBinding value="tab1">
      {React.string("Overview content")}
    </TabsV2ContentBinding>
  </TabsV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~defaultValue: string=?,
  ~value: string=?,
  ~onValueChange: string => unit=?,
  ~variant: [#boxed | #floating | #underline | #pills]=?,
  ~children: React.element,
) => React.element = "TabsV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-md">
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.BOXED}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Overview</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Details</TabsV2Trigger>
                        <TabsV2Trigger value="tab3">Settings</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-4 text-sm text-muted-foreground">
                            Overview content here
                        </div>
                    </TabsV2Content>
                    <TabsV2Content value="tab2">
                        <div className="p-4 text-sm text-muted-foreground">
                            Details content here
                        </div>
                    </TabsV2Content>
                    <TabsV2Content value="tab3">
                        <div className="p-4 text-sm text-muted-foreground">
                            Settings content here
                        </div>
                    </TabsV2Content>
                </TabsV2>
            </div>
        </ComponentPreview>
    )
}

export default TabsV2Preview
