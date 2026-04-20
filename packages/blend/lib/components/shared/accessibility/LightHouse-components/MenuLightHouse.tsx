import {
    Menu,
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
} from '../../../Menu'
import { Button, ButtonType, ButtonSize } from '../../../Button'
import { Settings, User, LogOut, Trash2 } from 'lucide-react'

const MenuLightHouse = () => {
    const basicItems = [
        {
            items: [
                { label: 'Option 1', onClick: () => console.log('Option 1') },
                { label: 'Option 2', onClick: () => console.log('Option 2') },
                { label: 'Option 3', onClick: () => console.log('Option 3') },
            ],
        },
    ]

    const groupedItems = [
        {
            label: 'Group 1',
            items: [
                { label: 'Item 1', onClick: () => console.log('Item 1') },
                { label: 'Item 2', onClick: () => console.log('Item 2') },
            ],
        },
        {
            label: 'Group 2',
            items: [
                { label: 'Item 3', onClick: () => console.log('Item 3') },
                { label: 'Item 4', onClick: () => console.log('Item 4') },
            ],
            showSeparator: true,
        },
    ]

    return (
        <>
            {/* Basic Menu */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Open Menu"
                    />
                }
                items={basicItems}
            />

            {/* With Grouped Items */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Grouped Menu"
                    />
                }
                items={groupedItems}
            />

            {/* With Search */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Menu with Search"
                    />
                }
                items={[
                    {
                        items: [
                            { label: 'Apple', onClick: () => {} },
                            { label: 'Banana', onClick: () => {} },
                            { label: 'Cherry', onClick: () => {} },
                            { label: 'Date', onClick: () => {} },
                            { label: 'Elderberry', onClick: () => {} },
                        ],
                    },
                ]}
                enableSearch={true}
                searchPlaceholder="Search items..."
            />

            {/* With SubMenu */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Menu with SubMenu"
                    />
                }
                items={[
                    {
                        items: [
                            {
                                label: 'Parent Item',
                                subMenu: [
                                    { label: 'Sub Item 1', onClick: () => {} },
                                    { label: 'Sub Item 2', onClick: () => {} },
                                ],
                            },
                            { label: 'Regular Item', onClick: () => {} },
                        ],
                    },
                ]}
            />

            {/* With Slots */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Menu with Icons"
                    />
                }
                items={[
                    {
                        items: [
                            {
                                label: 'Settings',
                                slot1: <Settings size={16} />,
                                onClick: () => {},
                            },
                            {
                                label: 'Profile',
                                slot1: <User size={16} />,
                                onClick: () => {},
                            },
                            {
                                label: 'Logout',
                                slot1: <LogOut size={16} />,
                                onClick: () => {},
                            },
                        ],
                    },
                ]}
            />

            {/* With SubLabel */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Menu with SubLabels"
                    />
                }
                items={[
                    {
                        items: [
                            {
                                label: 'Option 1',
                                subLabel: 'Description for option 1',
                                onClick: () => {},
                            },
                            {
                                label: 'Option 2',
                                subLabel: 'Description for option 2',
                                onClick: () => {},
                            },
                        ],
                    },
                ]}
            />

            {/* With Disabled Items */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Menu with Disabled"
                    />
                }
                items={[
                    {
                        items: [
                            { label: 'Enabled Item', onClick: () => {} },
                            {
                                label: 'Disabled Item',
                                disabled: true,
                                onClick: () => {},
                            },
                            { label: 'Another Enabled', onClick: () => {} },
                        ],
                    },
                ]}
            />

            {/* With Action Variant */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Action Menu"
                    />
                }
                items={[
                    {
                        items: [
                            {
                                label: 'Primary Action',
                                variant: MenuItemVariant.ACTION,
                                actionType: MenuItemActionType.PRIMARY,
                                onClick: () => {},
                            },
                            {
                                label: 'Danger Action',
                                variant: MenuItemVariant.ACTION,
                                actionType: MenuItemActionType.DANGER,
                                onClick: () => {},
                            },
                        ],
                    },
                ]}
            />

            {/* All Sides */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Top Menu"
                    />
                }
                items={basicItems}
                side={MenuSide.TOP}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Right Menu"
                    />
                }
                items={basicItems}
                side={MenuSide.RIGHT}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Bottom Menu"
                    />
                }
                items={basicItems}
                side={MenuSide.BOTTOM}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Left Menu"
                    />
                }
                items={basicItems}
                side={MenuSide.LEFT}
            />

            {/* All Alignments */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Start Aligned"
                    />
                }
                items={basicItems}
                alignment={MenuAlignment.START}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Center Aligned"
                    />
                }
                items={basicItems}
                alignment={MenuAlignment.CENTER}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="End Aligned"
                    />
                }
                items={basicItems}
                alignment={MenuAlignment.END}
            />

            {/* With Max Height */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Scrollable Menu"
                    />
                }
                items={[
                    {
                        items: Array.from({ length: 20 }, (_, i) => ({
                            label: `Item ${i + 1}`,
                            onClick: () => {},
                        })),
                    },
                ]}
                maxHeight={200}
            />

            {/* With Custom Width */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Custom Width"
                    />
                }
                items={basicItems}
                minWidth={300}
                maxWidth={400}
            />

            {/* Controlled Open */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Controlled Menu"
                    />
                }
                items={basicItems}
                open={false}
                onOpenChange={(open) => {
                    console.log('Menu open changed:', open)
                }}
            />

            {/* As Modal */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Modal Menu"
                    />
                }
                items={basicItems}
                asModal={true}
            />

            {/* With Skeleton */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Loading Menu"
                    />
                }
                items={basicItems}
                skeleton={{
                    show: true,
                    count: 5,
                    variant: 'pulse',
                }}
            />

            {/* Complex Example */}
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Complex Menu"
                    />
                }
                items={[
                    {
                        label: 'Actions',
                        items: [
                            {
                                label: 'Settings',
                                subLabel: 'Manage settings',
                                slot1: <Settings size={16} />,
                                onClick: () => {},
                            },
                            {
                                label: 'Profile',
                                subLabel: 'View profile',
                                slot1: <User size={16} />,
                                onClick: () => {},
                            },
                        ],
                    },
                    {
                        label: 'Danger Zone',
                        items: [
                            {
                                label: 'Delete',
                                variant: MenuItemVariant.ACTION,
                                actionType: MenuItemActionType.DANGER,
                                slot1: <Trash2 size={16} />,
                                onClick: () => {},
                            },
                        ],
                        showSeparator: true,
                    },
                ]}
                enableSearch={true}
                searchPlaceholder="Search menu items..."
                side={MenuSide.BOTTOM}
                alignment={MenuAlignment.START}
                maxHeight={300}
                minWidth={250}
                maxWidth={350}
            />
        </>
    )
}

export default MenuLightHouse
