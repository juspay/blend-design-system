import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
} from '../../../Tabs'
import { Settings, User, X } from 'lucide-react'

const TabsLightHouse = () => {
    const basicItems = [
        {
            value: 'tab1',
            label: 'Tab 1',
            content: <div>Content for Tab 1</div>,
        },
        {
            value: 'tab2',
            label: 'Tab 2',
            content: <div>Content for Tab 2</div>,
        },
        {
            value: 'tab3',
            label: 'Tab 3',
            content: <div>Content for Tab 3</div>,
        },
    ]

    return (
        <>
            {/* Basic Tabs - Underline Variant */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                size={TabsSize.MD}
            />

            {/* Boxed Variant */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.BOXED}
                size={TabsSize.MD}
            />

            {/* Floating Variant */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.FLOATING}
                size={TabsSize.MD}
            />

            {/* Pills Variant */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.PILLS}
                size={TabsSize.MD}
            />

            {/* Large Size */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                size={TabsSize.LG}
            />

            {/* Expanded */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                expanded={true}
            />

            {/* Fit Content */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                fitContent={true}
            />

            {/* With Default Value */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                defaultValue="tab2"
            />

            {/* Controlled */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                value="tab1"
                onValueChange={(value) => {
                    console.log('Tab changed:', value)
                }}
            />

            {/* With Closable Tabs */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Tab 1',
                        content: <div>Content for Tab 1</div>,
                        closable: true,
                    },
                    {
                        value: 'tab2',
                        label: 'Tab 2',
                        content: <div>Content for Tab 2</div>,
                        closable: true,
                    },
                    {
                        value: 'tab3',
                        label: 'Tab 3',
                        content: <div>Content for Tab 3</div>,
                        closable: false,
                    },
                ]}
                variant={TabsVariant.UNDERLINE}
                onTabClose={(value) => {
                    console.log('Tab closed:', value)
                }}
            />

            {/* With Dropdown */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Tab 1',
                        content: <div>Content 1</div>,
                    },
                    {
                        value: 'tab2',
                        label: 'Tab 2',
                        content: <div>Content 2</div>,
                    },
                    {
                        value: 'tab3',
                        label: 'Tab 3',
                        content: <div>Content 3</div>,
                    },
                    {
                        value: 'tab4',
                        label: 'Tab 4',
                        content: <div>Content 4</div>,
                    },
                    {
                        value: 'tab5',
                        label: 'Tab 5',
                        content: <div>Content 5</div>,
                    },
                    {
                        value: 'tab6',
                        label: 'Tab 6',
                        content: <div>Content 6</div>,
                    },
                    {
                        value: 'tab7',
                        label: 'Tab 7',
                        content: <div>Content 7</div>,
                    },
                ]}
                variant={TabsVariant.UNDERLINE}
                showDropdown={true}
            />

            {/* With Add Button */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                showAddButton={true}
                onTabAdd={() => {
                    console.log('Add tab clicked')
                }}
            />

            {/* With Slots */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Tab 1',
                        content: <div>Content for Tab 1</div>,
                        leftSlot: <Settings size={16} />,
                    },
                    {
                        value: 'tab2',
                        label: 'Tab 2',
                        content: <div>Content for Tab 2</div>,
                        rightSlot: <User size={16} />,
                    },
                    {
                        value: 'tab3',
                        label: 'Tab 3',
                        content: <div>Content for Tab 3</div>,
                        leftSlot: <Settings size={16} />,
                        rightSlot: <X size={16} />,
                    },
                ]}
                variant={TabsVariant.UNDERLINE}
            />

            {/* Disabled Tab */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Tab 1',
                        content: <div>Content for Tab 1</div>,
                    },
                    {
                        value: 'tab2',
                        label: 'Tab 2',
                        content: <div>Content for Tab 2</div>,
                        disable: true,
                    },
                    {
                        value: 'tab3',
                        label: 'Tab 3',
                        content: <div>Content for Tab 3</div>,
                    },
                ]}
                variant={TabsVariant.UNDERLINE}
            />

            {/* All Disabled */}
            <Tabs
                items={basicItems}
                variant={TabsVariant.UNDERLINE}
                disable={true}
            />

            {/* With Children (Composition API) */}
            <Tabs variant={TabsVariant.UNDERLINE} defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">Content for Tab 1</TabsContent>
                <TabsContent value="tab2">Content for Tab 2</TabsContent>
                <TabsContent value="tab3">Content for Tab 3</TabsContent>
            </Tabs>

            {/* With Children - Closable */}
            <Tabs variant={TabsVariant.BOXED} defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1" closable={true}>
                        Tab 1
                    </TabsTrigger>
                    <TabsTrigger value="tab2" closable={true}>
                        Tab 2
                    </TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">Content for Tab 1</TabsContent>
                <TabsContent value="tab2">Content for Tab 2</TabsContent>
                <TabsContent value="tab3">Content for Tab 3</TabsContent>
            </Tabs>

            {/* With Children - Slots */}
            <Tabs variant={TabsVariant.FLOATING} defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1" leftSlot={<Settings size={16} />}>
                        Tab 1
                    </TabsTrigger>
                    <TabsTrigger value="tab2" rightSlot={<User size={16} />}>
                        Tab 2
                    </TabsTrigger>
                    <TabsTrigger
                        value="tab3"
                        leftSlot={<Settings size={16} />}
                        rightSlot={<X size={16} />}
                    >
                        Tab 3
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">Content for Tab 1</TabsContent>
                <TabsContent value="tab2">Content for Tab 2</TabsContent>
                <TabsContent value="tab3">Content for Tab 3</TabsContent>
            </Tabs>

            {/* Complex Example */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Settings',
                        content: <div>Settings Content</div>,
                        leftSlot: <Settings size={16} />,
                        closable: true,
                    },
                    {
                        value: 'tab2',
                        label: 'Profile',
                        content: <div>Profile Content</div>,
                        rightSlot: <User size={16} />,
                        closable: true,
                    },
                    {
                        value: 'tab3',
                        label: 'Disabled Tab',
                        content: <div>Disabled Content</div>,
                        disable: true,
                    },
                ]}
                variant={TabsVariant.PILLS}
                size={TabsSize.LG}
                expanded={true}
                showAddButton={true}
                onTabAdd={() => {
                    console.log('Add tab clicked')
                }}
                onTabClose={(value) => {
                    console.log('Tab closed:', value)
                }}
                onValueChange={(value) => {
                    console.log('Tab changed:', value)
                }}
            />

            {/* Single Tab */}
            <Tabs
                items={[
                    {
                        value: 'tab1',
                        label: 'Single Tab',
                        content: <div>Single Tab Content</div>,
                    },
                ]}
                variant={TabsVariant.UNDERLINE}
            />
        </>
    )
}

export default TabsLightHouse
