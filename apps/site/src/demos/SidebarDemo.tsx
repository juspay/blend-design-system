import { useState } from 'react'
import ButtonDemo from './ButtonDemo'
import {
    Tag as TagIcon,
    Menu as MenuIcon,
    BarChart2,
    Type,
    Calendar as CalendarIcon,
    ListFilter,
    User as UserIcon,
    Info,
    FormInput,
    AlertCircle,
    Bell as BellIcon,
    Square,
    Users,
    Layout,
    FileText,
    List,
    Grid,
    Box,
    IndianRupee,
    Table,
    Palette,
    MessageCircle,
    CircleDot as Radio,
    Weight,
    DecimalsArrowRightIcon,
    Search,
    Shield,
    Settings,
    TrendingUp,
} from 'lucide-react'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import { Sidebar } from '../../../../packages/blend/lib/components/Sidebar'
import ButtonGroupDemo from './ButtonGroupDemo'
import TagDemo from './TagDemo'
import AvatarDemo from './AvatarDemo'
import BreadcrumbDemo from './BreadcrumbDemo'
import InputDemo from './TextInputDemo'
import UnitInputDemo from './UnitInputDemo'
import type { DirectoryData } from '../../../../packages/blend/lib/components/Directory/types'
import NumberInputDemo from './NumberInputDemo'
import TextAreaDemo from './TextAreaDemo'
import AlertDemo from './AlertDemo'
import TabsDemo from './TabsDemo'
import AccordionDemo from './AccordionDemo'
import StatCardDemo from './StatCardDemo'
import SnackbarDemo from './SnackbarDemo'
import AvatarGroupDemo from './AvatarGroupDemo'
import TooltipDemo from './TooltipDemo'
import ModalDemo from './ModalDemo'
import RadioDemo from './RadioDemo'
import CheckboxDemo from './CheckboxDemo'
import SwitchDemo from './SwitchDemo'
import ProgressBarDemo from './ProgressBarDemo'
import { ThemeProvider } from '../../../../packages/blend/lib/context'
import ALT_FOUNDATION_TOKENS from '../themes/AIT_FOUNDATION_TOKENS'
import HDFC_COMPONENT_TOKENS from '../themes/HDFC_COMPONENT_TOKENS'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    SelectMenuAlignment,
    SelectMenuVariant,
} from '../../../../packages/blend/lib/components/Select'
import MenuDemo from './MenuDemo'
import SingleSelectDemo from './SingleSelectDemo'
import MultiSelectDemo from './MultiSelectDemo'
import DropdownInputDemo from './DropdownInputDemo'
import DrawerDemo from './DrawerDemo'
import DateRangePickerDemo from './DateRangePickerDemo'
import DataTableDemo from './dataTableDemo'
import ChartsDemo from './ChartsDemo'
import PopoverDemo from './PopoverDemo'
import MultiValueInputDemo from './MultiValueInputDemo'
import TopbarDemo from './TopbarDemo'
import OTPInputDemo from './OTPInputDemo'
import CardDemo from './CardDemo'
import {
    Avatar,
    AvatarShape,
    AvatarSize,
    TextInput,
} from '../../../../packages/blend/lib/main'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import KeyValuePairDemo from './KeyValuePairDemo'

const SidebarDemo = () => {
    const [activeComponent, setActiveComponent] = useState<
        | 'buttons'
        | 'tooltips'
        | 'tags'
        | 'splitTags'
        | 'breadcrumb'
        | 'tabs'
        | 'checkbox'
        | 'radio'
        | 'switch'
        | 'textInput'
        | 'alerts'
        | 'avatarGroup'
        | 'charts'
        | 'chartsV2'
        | 'fonts'
        | 'datePicker'
        | 'selectors'
        | 'buttonGroups'
        | 'avatars'
        | 'menu'
        | 'dropdown'
        | 'accordion'
        | 'statCard'
        | 'modal'
        | 'input'
        | 'unitInput'
        | 'numberInput'
        | 'textArea'
        | 'snackbar'
        | 'dataTable'
        | 'drawer'
        | 'colorPalette'
        | 'popover'
        | 'progressBar'
        | 'theme'
        | 'salesKpiDashboard'
        | 'transactionAnalyticsDashboard'
        | 'singleSelect'
        | 'multiSelect'
        | 'dropdownInput'
        | 'dataRangePicker'
        | 'multiValueInput'
        | 'topbar'
        | 'otpInput'
        | 'keyValuePair'
        | 'card'
        | 'dataRangePicker'
    >('avatars')

    const [activeTenant, setActiveTenant] = useState<string>('Juspay')
    const [activeMerchant, setActiveMerchant] =
        useState<string>('design-system')
    const [search, setSearch] = useState<string>('')

    const tenants = [
        {
            label: 'Juspay',
            icon: (
                <IndianRupee
                    style={{ width: '24px', height: '24px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'juspay',
        },
        {
            label: 'Razorpay',
            icon: (
                <UserIcon
                    style={{ width: '24px', height: '24px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'razorpay',
        },
        {
            label: 'Stripe',
            icon: (
                <IndianRupee
                    style={{ width: '24px', height: '24px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'stripe',
        },
        {
            label: 'PayPal',
            icon: (
                <UserIcon
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'paypal',
        },
        {
            label: 'Square',
            icon: (
                <Square
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'square',
        },
        {
            label: 'Adyen',
            icon: (
                <IndianRupee
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'adyen',
        },
        {
            label: 'Braintree',
            icon: (
                <UserIcon
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'braintree',
        },
        {
            label: 'Worldpay',
            icon: (
                <IndianRupee
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'worldpay',
        },
    ]

    const merchants = [
        {
            label: 'Design System',
            icon: <UserIcon style={{ width: '14px', height: '14px' }} />,
            value: 'design-system',
        },
        {
            label: 'Design System 2',
            icon: <UserIcon style={{ width: '14px', height: '14px' }} />,
            value: 'design-system-2',
        },
    ]

    const renderContent = () => {
        switch (activeComponent) {
            case 'buttons':
                return <ButtonDemo />
            case 'buttonGroups':
                return <ButtonGroupDemo />
            case 'tags':
                return <TagDemo />
            case 'avatars':
                return <AvatarDemo />
            case 'breadcrumb':
                return <BreadcrumbDemo />
            case 'input':
                return <InputDemo />
            case 'unitInput':
                return <UnitInputDemo />
            case 'numberInput':
                return <NumberInputDemo />
            case 'textArea':
                return <TextAreaDemo />
            case 'otpInput':
                return <OTPInputDemo />
            case 'alerts':
                return <AlertDemo />
            case 'tabs':
                return <TabsDemo />
            case 'accordion':
                return <AccordionDemo />
            case 'statCard':
                return <StatCardDemo />
            case 'avatarGroup':
                return <AvatarGroupDemo />
            case 'snackbar':
                return <SnackbarDemo />
            case 'tooltips':
                return <TooltipDemo />
            case 'modal':
                return <ModalDemo />
            case 'radio':
                return <RadioDemo />
            case 'checkbox':
                return <CheckboxDemo />
            case 'switch':
                return <SwitchDemo />
            case 'menu':
                return <MenuDemo />
            case 'singleSelect':
                return <SingleSelectDemo />
            case 'multiSelect':
                return <MultiSelectDemo />
            case 'progressBar':
                return <ProgressBarDemo />
            case 'drawer':
                return <DrawerDemo />
            case 'dropdownInput':
                return <DropdownInputDemo />
            case 'dataRangePicker':
                return <DateRangePickerDemo />
            case 'dataTable':
                return <DataTableDemo />
            case 'charts':
                return <ChartsDemo />
            case 'popover':
                return <PopoverDemo />
            case 'multiValueInput':
                return <MultiValueInputDemo />
            case 'topbar':
                return <TopbarDemo />
            case 'keyValuePair':
                return <KeyValuePairDemo />
            case 'card':
                return <CardDemo />
            default:
                return <div>No component selected</div>
        }
    }

    const sampleData: DirectoryData[] = [
        {
            label: 'Basic Components',
            isCollapsible: false,
            items: [
                {
                    label: 'Button',
                    leftSlot: (
                        <Square style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('buttons'),
                },
                {
                    label: 'Button Group',
                    leftSlot: (
                        <Grid style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('buttonGroups'),
                },
                {
                    label: 'Tag',
                    leftSlot: (
                        <TagIcon style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('tags'),
                },
                {
                    label: 'Avatar',
                    leftSlot: (
                        <Users style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('avatars'),
                },
                {
                    label: 'Avatar Group',
                    leftSlot: (
                        <Users style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('avatarGroup'),
                },
                {
                    label: 'Breadcrumb',
                    leftSlot: (
                        <Grid style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('breadcrumb'),
                },
            ],
        },
        {
            label: 'Inputs',
            isCollapsible: false,
            items: [
                {
                    label: 'Text Input',
                    leftSlot: (
                        <FormInput style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('input'),
                },
                {
                    label: 'OTP Input',
                    leftSlot: (
                        <Shield style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('otpInput'),
                },
                {
                    label: 'Unit Input',
                    leftSlot: (
                        <Weight style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('unitInput'),
                },
                {
                    label: 'Number Input',
                    leftSlot: (
                        <DecimalsArrowRightIcon
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('numberInput'),
                },
                {
                    label: 'Dropdown Input',
                    leftSlot: (
                        <DecimalsArrowRightIcon
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('dropdownInput'),
                },
                {
                    label: 'Text Area',
                    leftSlot: (
                        <FileText style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('textArea'),
                },
                {
                    label: 'Multi Value Input',
                    leftSlot: (
                        <ListFilter style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('multiValueInput'),
                },
                {
                    label: 'Key Value Pair',
                    onClick: () => setActiveComponent('keyValuePair'),
                },
            ],
        },
        {
            label: 'Navigation',
            items: [
                {
                    label: 'Topbar',
                    leftSlot: (
                        <Layout style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('topbar'),
                },
                {
                    label: 'Menu',
                    leftSlot: (
                        <MenuIcon style={{ width: '16px', height: '16px' }} />
                    ),
                    items: [
                        {
                            label: 'Item 1',
                            leftSlot: (
                                <Square
                                    style={{ width: '16px', height: '16px' }}
                                />
                            ),
                            onClick: () => setActiveComponent('menu'),
                            items: [
                                {
                                    label: 'Item 1.1',
                                    leftSlot: (
                                        <Square
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                        />
                                    ),
                                    onClick: () => setActiveComponent('menu'),
                                    items: [
                                        {
                                            label: 'Item 1.1.1',
                                            leftSlot: (
                                                <Square
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            ),
                                            onClick: () =>
                                                setActiveComponent('menu'),
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Item 2',
                            leftSlot: (
                                <Square
                                    style={{ width: '16px', height: '16px' }}
                                />
                            ),
                        },
                    ],
                },
                {
                    label: 'Single Select',
                    leftSlot: (
                        <List style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('singleSelect'),
                },
                {
                    label: 'Multi Select',
                    leftSlot: (
                        <ListFilter style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('multiSelect'),
                },
                {
                    label: 'Tabs',
                    leftSlot: (
                        <Layout style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('tabs'),
                },
                {
                    label: 'Accordion',
                    leftSlot: (
                        <List style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('accordion'),
                },
            ],
        },
        {
            label: 'Feedback',
            items: [
                {
                    label: 'Alert',
                    leftSlot: (
                        <AlertCircle
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('alerts'),
                },
                {
                    label: 'Snackbar',
                    leftSlot: (
                        <BellIcon style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('snackbar'),
                },
                {
                    label: 'Tooltip',
                    leftSlot: (
                        <Info style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('tooltips'),
                },
                {
                    label: 'Modal',
                    leftSlot: <Box style={{ width: '16px', height: '16px' }} />,
                    onClick: () => setActiveComponent('modal'),
                },
                {
                    label: 'Popover',
                    leftSlot: (
                        <MessageCircle
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('popover'),
                },
                {
                    label: 'Drawer',
                    leftSlot: <Box style={{ width: '16px', height: '16px' }} />,
                    onClick: () => setActiveComponent('drawer'),
                },
            ],
        },
        {
            label: 'Data Display',
            isCollapsible: true,
            defaultOpen: true,
            items: [
                {
                    label: 'Chart',
                    leftSlot: (
                        <BarChart2 style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('charts'),
                },
                {
                    label: 'Stat Card',
                    leftSlot: (
                        <FileText style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('statCard'),
                },
                {
                    label: 'Card',
                    leftSlot: (
                        <Square style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('card'),
                },
                {
                    label: 'Progress Bar',
                    leftSlot: (
                        <BarChart2 style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('progressBar'),
                },
                {
                    label: 'Data Table',
                    leftSlot: (
                        <Table style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('dataTable'),
                },
                {
                    label: 'Date Picker',
                    leftSlot: (
                        <CalendarIcon
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('dataRangePicker'),
                },
            ],
        },
        {
            label: 'Form Elements',
            isCollapsible: true,
            defaultOpen: true,
            items: [
                {
                    label: 'Radio',
                    leftSlot: (
                        <Radio style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('radio'),
                },
                {
                    label: 'Checkbox',
                    leftSlot: (
                        <Square style={{ width: '16px', height: '16px' }} />
                    ), // Using Square as a placeholder icon
                    onClick: () => setActiveComponent('checkbox'),
                },
                {
                    label: 'Switch',
                    leftSlot: (
                        <Square style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('switch'),
                },
                {
                    label: 'Selectors',
                    leftSlot: (
                        <ListFilter style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('selectors'),
                },
            ],
        },
        {
            label: 'Typography',
            items: [
                {
                    label: 'Fonts',
                    leftSlot: (
                        <Type style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('fonts'),
                },
            ],
        },
        {
            label: 'Design System',
            items: [
                {
                    label: 'Color Palette',
                    leftSlot: (
                        <Palette style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('colorPalette'),
                },
            ],
        },
    ]

    const [theme, setTheme] = useState<'EULER' | 'JUSBIZ'>('EULER')

    const breakpoints = {
        sm: 480,
        lg: 1440,
    }

    const themeProps =
        theme === 'EULER'
            ? {}
            : {
                  foundationTokens: ALT_FOUNDATION_TOKENS,
                  componentTokens: HDFC_COMPONENT_TOKENS,
                  breakpoints: breakpoints,
              }

    return (
        <div className="w-screen h-screen">
            <ThemeProvider {...themeProps}>
                <Sidebar
                    leftPanel={{
                        items: tenants,
                        selected: activeTenant,
                        onSelect: (value) => setActiveTenant(value),
                    }}
                    merchantInfo={{
                        items: merchants.map((merchant) => ({
                            label: merchant.label,
                            value: merchant.value,
                            icon: merchant.icon,
                        })),
                        selected: activeMerchant,
                        onSelect: (value) => setActiveMerchant(value),
                    }}
                    sidebarTopSlot={
                        <SingleSelect
                            placeholder="Select Merchant"
                            variant={SelectMenuVariant.NO_CONTAINER}
                            items={[
                                {
                                    items: merchants,
                                },
                            ]}
                            selected={activeMerchant}
                            onSelect={(value) => setActiveMerchant(value)}
                        />
                    }
                    rightActions={
                        <div className="flex items-center gap-1">
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-[40px] h-[40px] hover:bg-gray-100 active:bg-gray-200">
                                <BellIcon
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                    size={20}
                                />
                            </button>
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-[40px] h-[40px] hover:bg-gray-100 active:bg-gray-200">
                                <TrendingUp
                                    color={FOUNDATION_THEME.colors.green[600]}
                                    size={20}
                                />
                            </button>
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-[40px] h-[40px] hover:bg-gray-100 active:bg-gray-200">
                                <Settings
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                    size={20}
                                />
                            </button>
                        </div>
                    }
                    data={sampleData}
                    topbar={
                        <div className="flex items-center justify-between gap-2">
                            <Block width="350px">
                                <TextInput
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    leftSlot={
                                        <Search
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                        />
                                    }
                                    rightSlot={
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: FOUNDATION_THEME.colors
                                                    .gray[300],
                                            }}
                                        >
                                            ⌘ + K
                                        </span>
                                    }
                                />
                            </Block>
                            <div>
                                <SingleSelect
                                    label="Theme"
                                    placeholder="Select Theme"
                                    minWidth={200}
                                    alignment={SelectMenuAlignment.END}
                                    selected={theme}
                                    onSelect={(value) =>
                                        setTheme(value as 'EULER' | 'JUSBIZ')
                                    }
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    items={[
                                        {
                                            items: [
                                                {
                                                    value: 'EULER',
                                                    label: 'EULER',
                                                },
                                                {
                                                    value: 'JUSBIZ',
                                                    label: 'JUSBIZ',
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    }
                    footer={
                        <div className="flex items-center gap-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                alt="John Doe"
                                size={AvatarSize.SM}
                                shape={AvatarShape.ROUNDED}
                            />
                            <Text
                                variant="body.md"
                                fontWeight={600}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            >
                                John Doe
                            </Text>
                        </div>
                    }
                >
                    <div className="w-full h-full">{renderContent()}</div>
                </Sidebar>
            </ThemeProvider>
        </div>
    )
}

export default SidebarDemo
