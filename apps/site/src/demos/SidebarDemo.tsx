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
} from 'lucide-react'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import { Sidebar } from '../../../../packages/blend/lib/components/Sidebar'
import ButtonGroupDemo from './ButtonGroupDemo'
import TagDemo from './TagDemo'
import AvatarDemo from './AvatarDemo'
import BreadcrumbDemo from './BreadcrumbDemo'
import InputDemo from './TextInputDemo'
import UnitInputDemo from './UnitInputDemo'
import type { DirectoryData } from '../../../../packages/blend/dist/components/Directory/types'
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
import { Snackbar } from '../../../../packages/blend/lib/components/Snackbar'
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
        | 'colorPalette'
        | 'popover'
        | 'progressBar'
        | 'theme'
        | 'salesKpiDashboard'
        | 'transactionAnalyticsDashboard'
        | 'singleSelect'
        | 'multiSelect'
    >('buttons')

    const [activeTenant, setActiveTenant] = useState<string>('Juspay')
    const [activeMerchant, setActiveMerchant] = useState<string | undefined>(
        'Design System'
    )

    const tenants = [
        {
            label: 'Juspay',
            icon: (
                <IndianRupee
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            id: 'juspay',
        },
        {
            label: 'Razorpay',
            icon: (
                <UserIcon
                    style={{ width: '16px', height: '16px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            id: 'razorpay',
        },
    ]

    const merchants = [
        {
            label: 'Design System',
            icon: <UserIcon style={{ width: '16px', height: '16px' }} />,
            id: 'design-system',
        },
        {
            label: 'Design System 2',
            icon: <UserIcon style={{ width: '16px', height: '16px' }} />,
            id: 'design-system-2',
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
                    label: 'Text Area',
                    leftSlot: (
                        <FileText style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => setActiveComponent('textArea'),
                },
            ],
        },
        {
            label: 'Navigation',
            items: [
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
            ],
        },
        {
            label: 'Form Elements',
            isCollapsible: true,
            defaultOpen: true,
            items: [
                {
                    label: 'Date Picker',
                    leftSlot: (
                        <CalendarIcon
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    onClick: () => setActiveComponent('datePicker'),
                },
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
                <Snackbar />
                <Sidebar
                    activeTenant={activeTenant}
                    setActiveTenant={setActiveTenant}
                    tenants={tenants}
                    activeMerchant={activeMerchant}
                    setActiveMerchant={setActiveMerchant}
                    merchants={merchants}
                    data={sampleData}
                    topbar={
                        <div className="flex justify-end">
                            <div>
                                <SingleSelect
                                    slot={
                                        <kbd
                                            style={{
                                                fontSize: 10,
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[25],
                                                padding: '2px 4px',
                                                borderRadius: 4,
                                            }}
                                        >
                                            CMD + E
                                        </kbd>
                                    }
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
                >
                    <div className="w-full h-full">{renderContent()}</div>
                </Sidebar>
            </ThemeProvider>
        </div>
    )
}

export default SidebarDemo
