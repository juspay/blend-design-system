import { useMemo, useState, useEffect } from 'react'
import ButtonDemo from './ButtonDemo'
import ButtonV2Demo from './ButtonV2Demo'
import {
    Tag as TagIcon,
    Menu as MenuIcon,
    BarChart2,
    Type,
    Code,
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
    Upload,
    Moon,
    Sun,
    HelpCircle,
    Lightbulb,
    SearchIcon,
} from 'lucide-react'
import { ThemeProvider, Theme } from '../../../../packages/blend/lib/context'
import { SidebarV2 } from '../../../../packages/blend/lib/components/SidebarV2'
import type { SecondarySidebarInfo } from '../../../../packages/blend/lib/components/SidebarV2/types'
import type { DirectoryData } from '../../../../packages/blend/lib/components/Directory/types'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import ButtonGroupDemo from './ButtonGroupDemo'
import ButtonGroupV2Demo from './ButtonGroupV2Demo'
import TagDemo from './TagDemo'
import AvatarDemo from './AvatarDemo'
import BreadcrumbDemo from './BreadcrumbDemo'
import InputDemo from './TextInputDemo'
import UnitInputDemo from './UnitInputDemo'
import NumberInputDemo from './NumberInputDemo'
import TextAreaDemo from './TextAreaDemo'
import AlertDemo from './AlertDemo'
import TabsDemo from './TabsDemo'
import AccordionDemo from './AccordionDemo'
import StatCardDemo from './StatCardDemo'
import SnackbarDemo from './SnackbarDemo'
import AvatarGroupDemo from './AvatarGroupDemo'
import TooltipDemo from './TooltipDemo'
import TooltipV2Demo from './TooltipV2Demo'
import ModalDemo from './ModalDemo'
import RadioDemo from './RadioDemo'
import CheckboxDemo from './CheckboxDemo'
import SwitchDemo from './SwitchDemo'
import ProgressBarDemo from './ProgressBarDemo'
import ALT_FOUNDATION_TOKENS from '../themes/AIT_FOUNDATION_TOKENS'
import HDFC_COMPONENT_TOKENS from '../themes/HDFC_COMPONENT_TOKENS'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    SelectMenuAlignment,
    SelectMenuVariant,
} from '../../../../packages/blend/lib/components/Select'
import MenuDemo from './MenuDemo'
import Menu from '../../../../packages/blend/lib/components/Menu/Menu'
import type { MenuGroupType } from '../../../../packages/blend/lib/components/Menu/types'
import {
    MenuSide,
    MenuAlignment,
} from '../../../../packages/blend/lib/components/Menu/types'
import SingleSelectDemo from './SingleSelectDemo'
import SingleSelectGroupDemo from './SingleSelectGroupDemo'
import TextInputGroupDemo from './TextInputGroupDemo'
import MultiSelectGroupDemo from './MultiSelectGroupDemo'
import MultiSelectDemo from './MultiSelectDemo'
import MultiSelectDemoV2 from './MultiSelectDemoV2'
import DropdownInputDemo from './DropdownInputDemo'
import DrawerDemo from './DrawerDemo'
import DateRangePickerDemo from './DateRangePickerDemo'
import DataTableDemo from './dataTableDemo'
import ChartsDemo from './ChartsDemo'
import PopoverDemo from './PopoverDemo'
import PopoverV2Demo from './PopoverV2Demo'
import MultiValueInputDemo from './MultiValueInputDemo'
import TopbarDemo from './TopbarDemo'
import OTPInputDemo from './OTPInputDemo'
import CardDemo from './CardDemo'
import CardV2Demo from './CardV2Demo'
import {
    TextInput,
    Button,
    BadgeColor,
    BadgeSize,
} from '../../../../packages/blend/lib/main'
import {
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button/types'
import StepperDemo from './StepperDemo'
import KeyValuePairDemo from './KeyValuePairDemo'
import AllComponentsDemo from './AllComponentsDemo'
import SearchInputDemo from './SearchInputDemo'
import VirtualListDemo from './VirtualListDemo'
import UploadDemo from './UploadDemo'
import UploadV2Demo from './UploadV2Demo'
import CodeBlockDemo from './CodeBlockDemo'
import CodeEditorDemo from './CodeEditorDemo'
import ChatInputDemo from './ChatInputDemo'
import FormElementsDemo from './FormElementsDemo'
import SkeletonDemo from './SkeletonDemo'
import AccessibilityDashboard from '../../../../packages/blend/lib/components/shared/accessibility/AccessibilityDashboard'
import OutageChartsDemo from './OutageChartsDemo'
import OutageChartDemoV2 from './OutageChartDemoV2'
import BlendChartDemo from './BlendChartDemo'
import TextInputAutofillTest from './TextInputAutofillTest'
import TagV2Demo from './TagV2Demo'
import TagGroupV2Demo from './TagGroupV2Demo'
import AlertV2Demo from './AlertV2Demo'
import AccordionV2Demo from './AccordionV2Demo'
import SnackbarV2Demo from './SnackbarV2Demo'
import SwitchV2Demo from './SwitchV2Demo'
import SingleSelectDemoV2 from './SingleSelectDemoV2'
import KeyValuePairV2Demo from './KeyValuePairV2Demo'
import AvatarV2Demo from './AvatarV2Demo'
import TextInputV2Demo from './TextInputV2Demo'
import TextInputAutofillTestV2 from './TextInputAutofillTestV2'
import ChartV2Demo from './ChartV2Demo'
import ChartV3Demo from './ChartV3Demo'
import TimelineDemo from './TimelineDemo'
import CheckboxV2Demo from './CheckboxV2Demo'
import RadioV2Demo from './RadioV2Demo'
import DirectoryDemo from './DirectoryDemo'
import {
    SingleSelectV2,
    SingleSelectV2Variant,
} from '../../../../packages/blend/lib/components/SingleSelectV2'

const SidebarV2Demo = () => {
    const [activeComponent, setActiveComponentState] = useState<
        | 'buttons'
        | 'buttonV2'
        | 'accessibility'
        | 'tooltips'
        | 'tags'
        | 'tagV2'
        | 'tagGroupV2'
        | 'breadcrumb'
        | 'tabs'
        | 'checkbox'
        | 'checkboxV2'
        | 'radio'
        | 'radioV2'
        | 'switch'
        | 'textInput'
        | 'alerts'
        | 'avatarGroup'
        | 'charts'
        | 'blendChart'
        | 'chartV2'
        | 'chartV3'
        | 'fonts'
        | 'datePicker'
        | 'selectors'
        | 'buttonGroups'
        | 'buttonGroupV2'
        | 'avatars'
        | 'avatarV2'
        | 'menu'
        | 'dropdown'
        | 'accordion'
        | 'statCard'
        | 'modal'
        | 'input'
        | 'searchInput'
        | 'unitInput'
        | 'numberInput'
        | 'textArea'
        | 'chatInput'
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
        | 'singleSelectGroup'
        | 'multiSelectGroup'
        | 'multiSelect'
        | 'multiSelectV2'
        | 'dropdownInput'
        | 'dataRangePicker'
        | 'multiValueInput'
        | 'topbar'
        | 'otpInput'
        | 'stepper'
        | 'keyValuePair'
        | 'card'
        | 'cardV2'
        | 'dataRangePicker'
        | 'allComponents'
        | 'virtualList'
        | 'skeleton'
        | 'upload'
        | 'uploadV2'
        | 'codeBlock'
        | 'codeEditor'
        | 'formElements'
        | 'outageCharts'
        | 'outageChartV2'
        | 'chartDemoV2'
        | 'textInputAutofillTest'
        | 'alertV2'
        | 'accordionV2'
        | 'snackbarV2'
        | 'switchV2'
        | 'textInputV2'
        | 'textInputAutofillTestV2'
        | 'keyValuePairV2'
        | 'textInputGroup'
        | 'singleSelectV2'
        | 'timeline'
        | 'tooltipV2'
        | 'popoverV2'
        | 'directory'
    >(() => {
        return (window.location.hash.slice(1) || 'popoverV2') as any
    })

    const setActiveComponent = (id: string) => {
        setActiveComponentState(id as any)
        window.location.hash = id
    }

    useEffect(() => {
        const handler = (e: CustomEvent) => {
            const { demoId } = e.detail
            setActiveComponentState(demoId as any)
            window.location.hash = demoId
        }
        window.addEventListener('select-demo', handler as EventListener)
        return () =>
            window.removeEventListener('select-demo', handler as EventListener)
    }, [])

    const [activeTenant, setActiveTenant] = useState<string>('Juspay')
    const [activeMerchant, setActiveMerchant] =
        useState<string>('design-system')

    const [isTopbarControlled, setIsTopbarControlled] = useState<boolean>(true)
    const [topbarVisible, setTopbarVisible] = useState<boolean>(true)
    const [isExpanded, setIsExpanded] = useState<boolean>(true)
    // const [, setSidebarState] = useState('expanded')

    const [brandTheme, setBrandTheme] = useState<'EULER' | 'JUSBIZ'>('EULER')
    const [colorTheme, setColorTheme] = useState<Theme>(Theme.LIGHT)

    const tenants = useMemo(
        (): (SecondarySidebarInfo['items'][number] & {
            showInPanel: boolean
        })[] => [
            {
                label: 'Juspay',
                icon: (
                    <IndianRupee
                        style={{ width: '24px', height: '24px' }}
                        color={FOUNDATION_THEME.colors.gray[600]}
                    />
                ),
                value: 'juspay',
                showInPanel: true,
                badge: {
                    text: 'IN',
                    color: BadgeColor.PRIMARY,
                    size: BadgeSize.SM,
                },
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
                showInPanel: true,
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
                showInPanel: true,
            },
            {
                label: 'PayPal',
                icon: (
                    <UserIcon
                        style={{ width: '24px', height: '24px' }}
                        color={FOUNDATION_THEME.colors.gray[600]}
                    />
                ),
                value: 'paypal',
                showInPanel: true,
                badge: {
                    text: 'US',
                    color: BadgeColor.SUCCESS,
                    size: BadgeSize.SM,
                    position: 'top-right',
                },
            },
            {
                label: 'Square',
                icon: (
                    <Square
                        style={{ width: '24px', height: '24px' }}
                        color={FOUNDATION_THEME.colors.gray[600]}
                    />
                ),
                value: 'square',
                showInPanel: true,
            },
            {
                label: 'Adyen',
                icon: (
                    <IndianRupee
                        style={{ width: '24px', height: '24px' }}
                        color={FOUNDATION_THEME.colors.gray[600]}
                    />
                ),
                value: 'adyen',
                showInPanel: true,
            },
        ],
        []
    )

    const merchants = [
        {
            label: 'Design System',
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
            case 'buttonV2':
                return <ButtonV2Demo />
            case 'accessibility':
                return <AccessibilityDashboard />
            case 'buttonGroups':
                return <ButtonGroupDemo />
            case 'buttonGroupV2':
                return <ButtonGroupV2Demo />
            case 'tags':
                return <TagDemo />
            case 'tagV2':
                return <TagV2Demo />
            case 'tagGroupV2':
                return <TagGroupV2Demo />
            case 'avatars':
                return <AvatarDemo />
            case 'avatarV2':
                return <AvatarV2Demo />
            case 'breadcrumb':
                return <BreadcrumbDemo />
            case 'input':
                return <InputDemo />
            case 'searchInput':
                return <SearchInputDemo />
            case 'unitInput':
                return <UnitInputDemo />
            case 'numberInput':
                return <NumberInputDemo />
            case 'textArea':
                return <TextAreaDemo />
            case 'chatInput':
                return <ChatInputDemo />
            case 'otpInput':
                return <OTPInputDemo />
            case 'alerts':
                return <AlertDemo />
            case 'alertV2':
                return <AlertV2Demo />
            case 'accordionV2':
                return <AccordionV2Demo />
            case 'snackbarV2':
                return <SnackbarV2Demo />
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
            case 'radioV2':
                return <RadioV2Demo />
            case 'checkbox':
                return <CheckboxDemo />
            case 'switch':
                return <SwitchDemo />
            case 'switchV2':
                return <SwitchV2Demo />
            case 'singleSelectV2':
                return <SingleSelectDemoV2 />
            case 'checkboxV2':
                return <CheckboxV2Demo />
            case 'menu':
                return <MenuDemo />
            case 'singleSelect':
                return <SingleSelectDemo />
            case 'singleSelectGroup':
                return <SingleSelectGroupDemo />
            case 'textInputGroup':
                return <TextInputGroupDemo />
            case 'multiSelectGroup':
                return <MultiSelectGroupDemo />
            case 'multiSelect':
                return <MultiSelectDemo />
            case 'multiSelectV2':
                return <MultiSelectDemoV2 />
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
            case 'outageCharts':
                return <OutageChartsDemo />
            case 'outageChartV2':
                return <OutageChartDemoV2 />
            case 'popover':
                return <PopoverDemo />
            case 'popoverV2':
                return <PopoverV2Demo />
            case 'multiValueInput':
                return <MultiValueInputDemo />
            case 'stepper':
                return <StepperDemo />
            case 'topbar':
                return <TopbarDemo />
            case 'keyValuePair':
                return <KeyValuePairDemo />
            case 'card':
                return <CardDemo />
            case 'cardV2':
                return <CardV2Demo />
            case 'skeleton':
                return <SkeletonDemo />
            case 'allComponents':
                return <AllComponentsDemo />
            case 'virtualList':
                return <VirtualListDemo />
            case 'directory':
                return <DirectoryDemo />
            case 'upload':
                return <UploadDemo />
            case 'uploadV2':
                return <UploadV2Demo />
            case 'codeBlock':
                return <CodeBlockDemo />
            case 'codeEditor':
                return <CodeEditorDemo />
            case 'formElements':
                return <FormElementsDemo />
            case 'blendChart':
                return <BlendChartDemo />
            case 'textInputAutofillTest':
                return <TextInputAutofillTest />
            case 'textInputV2':
                return <TextInputV2Demo />
            case 'textInputAutofillTestV2':
                return <TextInputAutofillTestV2 />
            case 'chartV2':
                return <ChartV2Demo />
            case 'chartV3':
                return <ChartV3Demo />
            case 'timeline':
                return <TimelineDemo />
            case 'keyValuePairV2':
                return <KeyValuePairV2Demo />
            case 'tooltipV2':
                return <TooltipV2Demo />
            default:
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Topbar Controlled/Uncontrolled Demo
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
                                <h3 className="text-lg font-semibold mb-4">
                                    Topbar Visibility Controls
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-2">
                                            Mode:{' '}
                                            {isTopbarControlled
                                                ? 'Controlled'
                                                : 'Uncontrolled'}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {isTopbarControlled
                                                ? 'In controlled mode, the parent component manages topbar visibility state.'
                                                : 'In uncontrolled mode, the topbar manages its own visibility state internally.'}
                                        </p>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.MEDIUM}
                                            onClick={() =>
                                                setIsTopbarControlled(
                                                    !isTopbarControlled
                                                )
                                            }
                                        >
                                            Switch to{' '}
                                            {isTopbarControlled
                                                ? 'Uncontrolled'
                                                : 'Controlled'}{' '}
                                            Mode
                                        </Button>
                                    </div>

                                    {isTopbarControlled && (
                                        <div className="pt-4 border-t border-blue-300">
                                            <p className="text-sm font-medium mb-2">
                                                Current Topbar State:{' '}
                                                {topbarVisible
                                                    ? 'Visible ✓'
                                                    : 'Hidden ✗'}
                                            </p>
                                            <div className="flex gap-2">
                                                <Button
                                                    buttonType={
                                                        ButtonType.PRIMARY
                                                    }
                                                    size={ButtonSize.MEDIUM}
                                                    onClick={() =>
                                                        setTopbarVisible(true)
                                                    }
                                                    disabled={topbarVisible}
                                                >
                                                    Show Topbar
                                                </Button>
                                                <Button
                                                    buttonType={
                                                        ButtonType.DANGER
                                                    }
                                                    size={ButtonSize.MEDIUM}
                                                    onClick={() =>
                                                        setTopbarVisible(false)
                                                    }
                                                    disabled={!topbarVisible}
                                                >
                                                    Hide Topbar
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">
                                    Navigation Item Integration
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Click on "Virtual List" in the sidebar to
                                    see how navigation items can hide the
                                    topbar. This is useful for full-screen
                                    views.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Scroll Test
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Scroll down to see the topbar hide
                                    automatically. Scroll back up to see it
                                    reappear. The feature is controlled by the
                                    `enableTopbarAutoHide` prop.
                                </p>
                                <TextInput
                                    placeholder="Type here - shows text cursor"
                                    value=""
                                    onChange={() => {}}
                                    cursor="text"
                                />
                            </div>
                            {Array.from({ length: 50 }, (_, i) => (
                                <div
                                    key={i}
                                    className="p-4 border border-gray-200 rounded-lg"
                                >
                                    <h4 className="font-semibold mb-2">
                                        Content Block {i + 1}
                                    </h4>
                                    <p className="text-gray-600">
                                        This is content block {i + 1}. Keep
                                        scrolling to test the topbar auto-hide
                                        functionality. The topbar should
                                        disappear when scrolling down and
                                        reappear when scrolling up.
                                    </p>
                                    <div className="mt-2">
                                        <TextInput
                                            placeholder={`Input field ${i + 1}`}
                                            value=""
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
        }
    }

    const sampleData: DirectoryData[] = useMemo(
        () => [
            {
                label: 'Basic Components',
                isCollapsible: false,
                items: [
                    {
                        label: 'Button',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'buttons',
                        href: 'https://react.dev',
                        onClick: () => {
                            setActiveComponent('buttons')
                            if (isTopbarControlled) {
                                setTopbarVisible(true)
                            }
                        },
                        showOnMobile: true,
                    },
                    {
                        label: 'Button V2',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'buttonV2',
                        onClick: () => {
                            setActiveComponent('buttonV2')
                            if (isTopbarControlled) {
                                setTopbarVisible(true)
                            }
                        },
                        showOnMobile: true,
                    },
                    {
                        label: 'Button Group',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'buttonGroups',
                        onClick: () => setActiveComponent('buttonGroups'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Button Group V2',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'buttonGroupV2',
                        onClick: () => setActiveComponent('buttonGroupV2'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Tag',
                        leftSlot: (
                            <TagIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'tags',
                        onClick: () => setActiveComponent('tags'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Tag V2',
                        leftSlot: (
                            <TagIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'tagV2',
                        onClick: () => setActiveComponent('tagV2'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Tag Group V2',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'tagGroupV2',
                        onClick: () => setActiveComponent('tagGroupV2'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Avatar',
                        leftSlot: (
                            <Users style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'avatars',
                        onClick: () => setActiveComponent('avatars'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Avatar V2',
                        leftSlot: (
                            <UserIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'avatarV2',
                        onClick: () => {
                            setActiveComponent('avatarV2')
                            if (isTopbarControlled) {
                                setTopbarVisible(true)
                            }
                        },
                        showOnMobile: true,
                    },
                    {
                        label: 'Avatar Group',
                        leftSlot: (
                            <Users style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'avatarGroup',
                        onClick: () => setActiveComponent('avatarGroup'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Breadcrumb',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'breadcrumb',
                        onClick: () => setActiveComponent('breadcrumb'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Virtual List',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'virtualList',
                        onClick: () => {
                            setActiveComponent('virtualList')
                            if (isTopbarControlled) {
                                setTopbarVisible(false)
                            }
                        },
                        showOnMobile: true,
                    },
                    {
                        label: 'Directory',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'directory',
                        onClick: () => setActiveComponent('directory'),
                        showOnMobile: true,
                    },
                    {
                        label: 'File Upload',
                        leftSlot: (
                            <Upload style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'upload',
                        onClick: () => setActiveComponent('upload'),
                    },
                    {
                        label: 'File Upload V2',
                        leftSlot: (
                            <Upload style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'uploadV2',
                        onClick: () => setActiveComponent('uploadV2'),
                    },
                ],
            },
            {
                label: 'Inputs',
                isCollapsible: false,
                items: [
                    {
                        label: 'Text Input Autofill Test',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'textInputAutofillTest',
                        onClick: () =>
                            setActiveComponent('textInputAutofillTest'),
                    },
                    {
                        label: 'Text Input Autofill Test V2',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected:
                            activeComponent === 'textInputAutofillTestV2',
                        onClick: () =>
                            setActiveComponent('textInputAutofillTestV2'),
                    },
                    {
                        label: 'Text Input',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'input',
                        onClick: () => setActiveComponent('input'),
                    },
                    {
                        label: 'Text Input V2',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'textInputV2',
                        onClick: () => setActiveComponent('textInputV2'),
                    },
                    {
                        label: 'Text Input Group',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'textInputGroup',
                        onClick: () => setActiveComponent('textInputGroup'),
                    },
                    {
                        label: 'Search Input',
                        leftSlot: (
                            <Search style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'searchInput',
                        onClick: () => setActiveComponent('searchInput'),
                    },
                    {
                        label: 'OTP Input',
                        leftSlot: (
                            <Shield style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'otpInput',
                        onClick: () => setActiveComponent('otpInput'),
                    },
                    {
                        label: 'Unit Input',
                        leftSlot: (
                            <Weight style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'unitInput',
                        onClick: () => setActiveComponent('unitInput'),
                    },
                    {
                        label: 'Number Input',
                        leftSlot: (
                            <DecimalsArrowRightIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'numberInput',
                        onClick: () => setActiveComponent('numberInput'),
                    },
                    {
                        label: 'Dropdown Input',
                        leftSlot: (
                            <DecimalsArrowRightIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'dropdownInput',
                        onClick: () => setActiveComponent('dropdownInput'),
                    },
                    {
                        label: 'Text Area',
                        leftSlot: (
                            <FileText
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'textArea',
                        onClick: () => setActiveComponent('textArea'),
                    },
                    {
                        label: 'Chat Input',
                        leftSlot: (
                            <MessageCircle
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'chatInput',
                        onClick: () => setActiveComponent('chatInput'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Multi Value Input',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'multiValueInput',
                        onClick: () => setActiveComponent('multiValueInput'),
                    },
                    {
                        label: 'Key Value Pair',
                        isSelected: activeComponent === 'keyValuePair',
                        onClick: () => setActiveComponent('keyValuePair'),
                    },
                    {
                        label: 'Key Value Pair V2',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'keyValuePairV2',
                        onClick: () => setActiveComponent('keyValuePairV2'),
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
                        isSelected: activeComponent === 'topbar',
                        onClick: () => setActiveComponent('topbar'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Menu',
                        leftSlot: (
                            <MenuIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'menu',
                        items: [
                            {
                                label: 'Item 1',
                                leftSlot: (
                                    <Square
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                        }}
                                    />
                                ),
                                isSelected: activeComponent === 'menu',
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
                                        isSelected: activeComponent === 'menu',
                                        onClick: () =>
                                            setActiveComponent('menu'),
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
                                                isSelected:
                                                    activeComponent === 'menu',
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
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                        }}
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
                        isSelected: activeComponent === 'singleSelect',
                        onClick: () => setActiveComponent('singleSelect'),
                    },
                    {
                        label: 'Single Select V2',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'singleSelectV2',
                        onClick: () => setActiveComponent('singleSelectV2'),
                    },
                    {
                        label: 'Single Select Group',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'singleSelectGroup',
                        onClick: () => setActiveComponent('singleSelectGroup'),
                    },
                    {
                        label: 'Multi Select',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'multiSelect',
                        onClick: () => setActiveComponent('multiSelect'),
                    },
                    {
                        label: 'Multi Select V2',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'multiSelectV2',
                        onClick: () => setActiveComponent('multiSelectV2'),
                    },
                    {
                        label: 'Multi Select Group',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'multiSelectGroup',
                        onClick: () => setActiveComponent('multiSelectGroup'),
                    },
                    {
                        label: 'Tabs',
                        leftSlot: (
                            <Layout style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'tabs',
                        onClick: () => setActiveComponent('tabs'),
                    },
                    {
                        label: 'Accordion',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'accordion',
                        onClick: () => setActiveComponent('accordion'),
                    },
                    {
                        label: 'Accordion V2',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'accordionV2',
                        onClick: () => setActiveComponent('accordionV2'),
                    },
                    {
                        label: 'Stepper',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        onClick: () => setActiveComponent('stepper'),
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
                        isSelected: activeComponent === 'alerts',
                        onClick: () => setActiveComponent('alerts'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Alert V2',
                        leftSlot: (
                            <AlertCircle
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'alertV2',
                        onClick: () => setActiveComponent('alertV2'),
                    },
                    {
                        label: 'Snackbar',
                        leftSlot: (
                            <BellIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'snackbar',
                        onClick: () => setActiveComponent('snackbar'),
                    },
                    {
                        label: 'Snackbar V2',
                        leftSlot: (
                            <BellIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'snackbarV2',
                        onClick: () => setActiveComponent('snackbarV2'),
                    },
                    {
                        label: 'Tooltip',
                        leftSlot: (
                            <Info style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'tooltips',
                        onClick: () => setActiveComponent('tooltips'),
                    },
                    {
                        label: 'Tooltip V2',
                        leftSlot: (
                            <Info style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'tooltipV2',
                        onClick: () => setActiveComponent('tooltipV2'),
                    },
                    {
                        label: 'Modal',
                        leftSlot: (
                            <Box style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'modal',
                        onClick: () => setActiveComponent('modal'),
                    },
                    {
                        label: 'Popover',
                        leftSlot: (
                            <MessageCircle
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'popover',
                        onClick: () => setActiveComponent('popover'),
                    },
                    {
                        label: 'Popover V2',
                        leftSlot: (
                            <MessageCircle
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'popoverV2',
                        onClick: () => setActiveComponent('popoverV2'),
                    },
                    {
                        label: 'Drawer',
                        leftSlot: (
                            <Box style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'drawer',
                        onClick: () => setActiveComponent('drawer'),
                        showOnMobile: true,
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
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'charts',
                        onClick: () => {
                            setActiveComponent('charts')
                            if (isTopbarControlled) {
                                setTopbarVisible(true)
                            }
                        },
                        showOnMobile: true,
                    },
                    {
                        label: 'Blend Chart V2',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'blendChart',
                        onClick: () => setActiveComponent('blendChart'),
                    },
                    {
                        label: 'Chart V2',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'chartV2',
                        onClick: () => setActiveComponent('chartV2'),
                    },
                    {
                        label: 'Chart V3',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'chartV3',
                        onClick: () => setActiveComponent('chartV3'),
                    },
                    {
                        label: 'Outage Charts',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'outageCharts',
                        onClick: () => setActiveComponent('outageCharts'),
                    },
                    {
                        label: 'Outage Charts V2',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'outageChartV2',
                        onClick: () => setActiveComponent('outageChartV2'),
                    },
                    {
                        label: 'Stat Card',
                        leftSlot: (
                            <FileText
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'statCard',
                        onClick: () => setActiveComponent('statCard'),
                    },
                    {
                        label: 'Skeleton',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'skeleton',
                        onClick: () => setActiveComponent('skeleton'),
                    },
                    {
                        label: 'Card',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'card',
                        onClick: () => setActiveComponent('card'),
                    },
                    {
                        label: 'Card V2',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'cardV2',
                        onClick: () => setActiveComponent('cardV2'),
                    },
                    {
                        label: 'Progress Bar',
                        leftSlot: (
                            <BarChart2
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'progressBar',
                        onClick: () => setActiveComponent('progressBar'),
                    },
                    {
                        label: 'Data Table',
                        leftSlot: (
                            <Table style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'dataTable',
                        onClick: () => setActiveComponent('dataTable'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Date Picker',
                        leftSlot: (
                            <CalendarIcon
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'dataRangePicker',
                        onClick: () => setActiveComponent('dataRangePicker'),
                        showOnMobile: true,
                    },
                    {
                        label: 'Code Block',
                        leftSlot: (
                            <Code style={{ width: '16px', height: '16px' }} />
                        ),
                        onClick: () => setActiveComponent('codeBlock'),
                    },
                    {
                        label: 'Code Editor',
                        leftSlot: (
                            <Code style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'codeEditor',
                        onClick: () => setActiveComponent('codeEditor'),
                    },
                    {
                        label: 'Timeline',
                        leftSlot: (
                            <List style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'timeline',
                        onClick: () => setActiveComponent('timeline'),
                    },
                ],
            },
            {
                label: 'Form Elements',
                isCollapsible: true,
                defaultOpen: true,
                items: [
                    {
                        label: 'Form Demo',
                        leftSlot: (
                            <FormInput
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'formElements',
                        onClick: () => setActiveComponent('formElements'),
                    },
                    {
                        label: 'Radio',
                        leftSlot: (
                            <Radio style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'radio',
                        onClick: () => setActiveComponent('radio'),
                    },
                    {
                        label: 'Radio V2',
                        leftSlot: (
                            <Radio style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'radioV2',
                        onClick: () => setActiveComponent('radioV2'),
                    },
                    {
                        label: 'Checkbox',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'checkbox',
                        onClick: () => setActiveComponent('checkbox'),
                    },
                    {
                        label: 'Checkbox V2',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'checkboxV2',
                        onClick: () => setActiveComponent('checkboxV2'),
                    },
                    {
                        label: 'Switch',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'switch',
                        onClick: () => setActiveComponent('switch'),
                    },
                    {
                        label: 'Switch V2',
                        leftSlot: (
                            <Square style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'switchV2',
                        onClick: () => setActiveComponent('switchV2'),
                    },
                    {
                        label: 'Selectors',
                        leftSlot: (
                            <ListFilter
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'selectors',
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
                        isSelected: activeComponent === 'fonts',
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
                            <Palette
                                style={{ width: '16px', height: '16px' }}
                            />
                        ),
                        isSelected: activeComponent === 'colorPalette',
                        onClick: () => setActiveComponent('colorPalette'),
                    },
                    {
                        label: '🎨 All Components Demo',
                        leftSlot: (
                            <Grid style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'allComponents',
                        onClick: () => setActiveComponent('allComponents'),
                    },
                    {
                        label: 'Accessibility',
                        leftSlot: (
                            <Shield style={{ width: '16px', height: '16px' }} />
                        ),
                        isSelected: activeComponent === 'accessibility',
                        onClick: () => {
                            setActiveComponent('accessibility')
                            if (isTopbarControlled) {
                                setTopbarVisible(true)
                            }
                        },
                        showOnMobile: true,
                    },
                ],
            },
        ],
        [activeComponent, isTopbarControlled]
    )

    const breakpoints = {
        sm: 480,
        lg: 1440,
    }

    const themeProps =
        brandTheme === 'EULER'
            ? { theme: colorTheme }
            : {
                  foundationTokens: ALT_FOUNDATION_TOKENS,
                  componentTokens: HDFC_COMPONENT_TOKENS,
                  breakpoints: breakpoints,
                  theme: colorTheme,
              }

    return (
        <div className="w-full h-screen">
            <ThemeProvider {...themeProps}>
                <SidebarV2
                    enableTopbarAutoHide={true}
                    isExpanded={isExpanded}
                    onExpandedChange={setIsExpanded}
                    {...(isTopbarControlled
                        ? {
                              isTopbarVisible: topbarVisible,
                              onTopbarVisibilityChange: setTopbarVisible,
                          }
                        : {
                              defaultIsTopbarVisible: true,
                          })}
                    secondarySidebar={{
                        items: tenants,
                        selected: activeTenant,
                        onSelect: (value) => {
                            setActiveTenant(value)
                        },
                        footerSlot: (
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-colors duration-150"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor:
                                            FOUNDATION_THEME.colors.gray[100],
                                    }}
                                    title="Help"
                                    onClick={() => alert('Help clicked!')}
                                >
                                    <HelpCircle
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                        size={20}
                                    />
                                </button>
                                <button
                                    className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-colors duration-150"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor:
                                            FOUNDATION_THEME.colors.gray[100],
                                    }}
                                    title="Tips"
                                    onClick={() => alert('Tips clicked!')}
                                >
                                    <Lightbulb
                                        color={
                                            FOUNDATION_THEME.colors.yellow[600]
                                        }
                                        size={20}
                                    />
                                </button>
                                <Menu
                                    trigger={
                                        <button
                                            className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-200"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[100],
                                            }}
                                            title="Tenant Settings"
                                        >
                                            <Settings
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                                size={20}
                                            />
                                        </button>
                                    }
                                    // asModal
                                    items={[
                                        {
                                            items: [
                                                {
                                                    label: 'Tenant Settings',
                                                    slot1: (
                                                        <Settings size={16} />
                                                    ),
                                                    onClick: () =>
                                                        alert(
                                                            'Tenant settings clicked!'
                                                        ),
                                                },
                                                {
                                                    label: 'User Management',
                                                    slot1: <Users size={16} />,
                                                    onClick: () =>
                                                        alert(
                                                            'User management clicked!'
                                                        ),
                                                },
                                                {
                                                    label: 'Security',
                                                    slot1: <Shield size={16} />,
                                                    onClick: () =>
                                                        alert(
                                                            'Security clicked!'
                                                        ),
                                                },
                                            ],
                                            showSeparator: true,
                                        },
                                        {
                                            items: [
                                                {
                                                    label: 'Preferences',
                                                    slot1: (
                                                        <Settings size={16} />
                                                    ),
                                                    onClick: () =>
                                                        alert(
                                                            'Preferences clicked!'
                                                        ),
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </div>
                        ),
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
                        <SingleSelectV2
                            placeholder="Select Merchant"
                            variant={SingleSelectV2Variant.NO_CONTAINER}
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
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-10 h-10 hover:bg-gray-100 active:bg-gray-200">
                                <BellIcon
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                    size={20}
                                />
                            </button>
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-10 h-10 hover:bg-gray-100 active:bg-gray-200">
                                <TrendingUp
                                    color={FOUNDATION_THEME.colors.green[600]}
                                    size={20}
                                />
                            </button>
                            <button className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-10 h-10 hover:bg-gray-100 active:bg-gray-200">
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
                            <div
                                className=" flex items-center gap-3 cursor-pointer border py-1 px-2 rounded-lg border-gray-300"
                                onClick={() =>
                                    window.dispatchEvent(
                                        new CustomEvent('open-command-search')
                                    )
                                }
                            >
                                {' '}
                                <div className="text-sm text-gray-400 flex items-center gap-1">
                                    <SearchIcon
                                        size={16}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                    />{' '}
                                    Search
                                </div>{' '}
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: FOUNDATION_THEME.colors
                                            .gray[400],
                                    }}
                                >
                                    {`⌘ + K`}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setColorTheme(
                                            colorTheme === Theme.LIGHT
                                                ? Theme.DARK
                                                : Theme.LIGHT
                                        )
                                    }
                                    className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-10 h-10 hover:bg-gray-100 active:bg-gray-200"
                                    title={
                                        colorTheme === Theme.DARK
                                            ? 'Switch to Light Mode'
                                            : 'Switch to Dark Mode'
                                    }
                                    style={{
                                        backgroundColor:
                                            colorTheme === Theme.DARK
                                                ? FOUNDATION_THEME.colors
                                                      .gray[100]
                                                : 'transparent',
                                    }}
                                >
                                    {colorTheme === Theme.DARK ? (
                                        <Sun
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .orange[500]
                                            }
                                            size={20}
                                        />
                                    ) : (
                                        <Moon
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            size={20}
                                        />
                                    )}
                                </button>
                                <div>
                                    <SingleSelect
                                        label="Brand"
                                        placeholder="Select Brand"
                                        minMenuWidth={200}
                                        alignment={SelectMenuAlignment.END}
                                        selected={brandTheme}
                                        onSelect={(value) =>
                                            setBrandTheme(
                                                value as 'EULER' | 'JUSBIZ'
                                            )
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
                        </div>
                    }
                    footer={
                        <Menu
                            trigger={
                                <button
                                    className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-200"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        backgroundColor:
                                            FOUNDATION_THEME.colors.gray[100],
                                    }}
                                    title="Tenant Settings"
                                >
                                    <Settings
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                        size={20}
                                    />
                                </button>
                            }
                            onOpenChange={(open) =>
                                console.log(
                                    '[PrimarySidebar] footer settings menu open',
                                    open
                                )
                            }
                            items={
                                [
                                    {
                                        items: [
                                            {
                                                label: 'Tenant Settings',
                                                slot1: <Settings size={16} />,
                                                onClick: () =>
                                                    alert(
                                                        'Tenant settings clicked!'
                                                    ),
                                            },
                                            {
                                                label: 'User Management',
                                                slot1: <Users size={16} />,
                                                onClick: () =>
                                                    alert(
                                                        'User management clicked!'
                                                    ),
                                            },
                                            {
                                                label: 'Security',
                                                slot1: <Shield size={16} />,
                                                onClick: () =>
                                                    alert('Security clicked!'),
                                            },
                                        ],
                                        showSeparator: true,
                                    },
                                    {
                                        items: [
                                            {
                                                label: 'Preferences',
                                                slot1: <Settings size={16} />,
                                                onClick: () =>
                                                    alert(
                                                        'Preferences clicked!'
                                                    ),
                                            },
                                            {
                                                label: 'Notifications',
                                                slot1: <BellIcon size={16} />,
                                                onClick: () =>
                                                    alert(
                                                        'Notifications clicked!'
                                                    ),
                                            },
                                        ],
                                        showSeparator: true,
                                    },
                                    {
                                        items: [
                                            {
                                                label: 'Help & Support',
                                                slot1: <HelpCircle size={16} />,
                                                onClick: () =>
                                                    alert(
                                                        'Help & Support clicked!'
                                                    ),
                                            },
                                        ],
                                    },
                                ] as MenuGroupType[]
                            }
                            side={MenuSide.TOP}
                            alignment={MenuAlignment.END}
                            sideOffset={8}
                        />
                    }
                    showMobilePrimaryActionButton={true}
                    mobilePrimaryActionButtonProps={{
                        onClick: () => {
                            alert('Primary action button clicked!')
                        },
                        'aria-label': 'Create new item',
                    }}
                >
                    {renderContent()}
                </SidebarV2>
            </ThemeProvider>
        </div>
    )
}

export default SidebarV2Demo
