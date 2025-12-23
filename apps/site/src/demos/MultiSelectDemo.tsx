import {
    User,
    Star,
    Shield,
    Code,
    Server,
    Database,
    Settings,
    Crown,
    Users,
    Target,
    Lightbulb,
    Circle,
    CreditCard,
    Wallet,
    Building,
    Globe,
    Smartphone,
    Banknote,
    Coins,
    ShoppingCart,
} from 'lucide-react'
import { useState } from 'react'
import { MultiSelect } from '../../../../packages/blend/lib/components/MultiSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/Button'
import {
    type MultiSelectMenuGroupType,
    MultiSelectMenuSize,
    MultiSelectVariant,
    MultiSelectMenuAlignment,
    MultiSelectMenuSide,
    MultiSelectSelectionTagType,
} from '../../../../packages/blend/lib/components/MultiSelect'
import {
    Tooltip,
    TooltipSide,
    TooltipSize,
} from '../../../../packages/blend/lib/components/Tooltip'

const MultiSelectDemo = () => {
    // Playground state
    const [playgroundLabel, setPlaygroundLabel] = useState('Your label')
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundErrorMessage, setPlaygroundErrorMessage] = useState(
        'This is an error message'
    )
    const [playgroundSubLabel, setPlaygroundSubLabel] = useState(
        'Choose your preferences'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This is a hint text'
    )
    const [playgroundPlaceholder, setPlaygroundPlaceholder] =
        useState('Placeholder')
    const [playgroundSize, setPlaygroundSize] = useState<MultiSelectMenuSize>(
        MultiSelectMenuSize.LARGE
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<MultiSelectVariant>(MultiSelectVariant.CONTAINER)
    const [playgroundAlignment, setPlaygroundAlignment] =
        useState<MultiSelectMenuAlignment>(MultiSelectMenuAlignment.START)
    const [playgroundSide, setPlaygroundSide] = useState<MultiSelectMenuSide>(
        MultiSelectMenuSide.BOTTOM
    )
    const [playgroundSelectionTagType, setPlaygroundSelectionTagType] =
        useState<MultiSelectSelectionTagType>(MultiSelectSelectionTagType.COUNT)
    const [playgroundSelected, setPlaygroundSelected] = useState<string[]>([])
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundShowSlot, setPlaygroundShowSlot] = useState(false)

    // Basic Examples state
    const [basicSimpleSelected, setBasicSimpleSelected] = useState<string[]>([])
    const [basicCountSelected, setBasicCountSelected] = useState<string[]>([])
    const [basicTextSelected, setBasicTextSelected] = useState<string[]>([])
    const [basicIconSelected, setBasicIconSelected] = useState<string[]>([])
    const [basicRequiredSelected, setBasicRequiredSelected] = useState<
        string[]
    >([])
    const [basicNoContainerSelected, setBasicNoContainerSelected] = useState<
        string[]
    >([])

    // Size Examples state
    const [smallSizeSelected, setSmallSizeSelected] = useState<string[]>([])
    const [mediumSizeSelected, setMediumSizeSelected] = useState<string[]>([])
    const [largeSizeSelected, setLargeSizeSelected] = useState<string[]>([])

    // Advanced Examples state
    const [skillsSelected, setSkillsSelected] = useState<string[]>([])
    const [permissionsSelected, setPermissionsSelected] = useState<string[]>([])
    const [preSelectedValues, setPreSelectedValues] = useState<string[]>([
        'react',
        'nodejs',
        'postgresql',
    ])
    const [apiCallLoadingSkeleton, setApiCallLoadingSkeleton] = useState(false)

    // Action Buttons Examples state
    const [actionButtonsSelected, setActionButtonsSelected] = useState<
        string[]
    >([])
    const [actionButtonsMobileSelected, setActionButtonsMobileSelected] =
        useState<string[]>([])
    const [filterWithActionsSelected, setFilterWithActionsSelected] = useState<
        string[]
    >([])

    // Search Examples state
    const [searchDesktopSelected, setSearchDesktopSelected] = useState<
        string[]
    >([])
    const [searchMobileSelected, setSearchMobileSelected] = useState<string[]>(
        []
    )
    const [searchWithSelectAllSelected, setSearchWithSelectAllSelected] =
        useState<string[]>([])
    const [searchLargeDatasetSelected, setSearchLargeDatasetSelected] =
        useState<string[]>([])

    // Item Dividers Examples state
    const [dividersEnabledSelected, setDividersEnabledSelected] = useState<
        string[]
    >([])
    const [dividersDisabledSelected, setDividersDisabledSelected] = useState<
        string[]
    >([])
    const [dividersMobileSelected, setDividersMobileSelected] = useState<
        string[]
    >([])
    const [dividersComparisonSelected, setDividersComparisonSelected] =
        useState<string[]>([])

    // Position & Alignment state
    const [topSideSelected, setTopSideSelected] = useState<string[]>([])
    const [bottomSideSelected, setBottomSideSelected] = useState<string[]>([])
    const [leftSideSelected, setLeftSideSelected] = useState<string[]>([])
    const [rightSideSelected, setRightSideSelected] = useState<string[]>([])
    const [startAlignSelected, setStartAlignSelected] = useState<string[]>([])
    const [centerAlignSelected, setCenterAlignSelected] = useState<string[]>([])
    const [endAlignSelected, setEndAlignSelected] = useState<string[]>([])

    // Use Cases state
    const [formNameValue, setFormNameValue] = useState('')
    const [formSkillsSelected, setFormSkillsSelected] = useState<string[]>([])
    const [formInterestsSelected, setFormInterestsSelected] = useState<
        string[]
    >([])
    const [formPermissionsSelected, setFormPermissionsSelected] = useState<
        string[]
    >([])
    const [filterStatusSelected, setFilterStatusSelected] = useState<string[]>(
        []
    )
    const [filterColumnsSelected, setFilterColumnsSelected] = useState<
        string[]
    >(['name', 'email', 'role'])

    // New feature demo state
    const [headerBorderSelected, setHeaderBorderSelected] = useState<string[]>(
        []
    )
    const [itemDividersSelected, setItemDividersSelected] = useState<string[]>(
        []
    )
    const [combinedFeaturesSelected, setCombinedFeaturesSelected] = useState<
        string[]
    >([])

    const [maxSelectionsBasicSelected, setMaxSelectionsBasicSelected] =
        useState<string[]>([])
    const [maxSelectionsAdvancedSelected, setMaxSelectionsAdvancedSelected] =
        useState<string[]>([])
    const [borderRadiusFixSelected, setBorderRadiusFixSelected] = useState<
        string[]
    >([])

    // Always Selected demo state
    const [alwaysSelectedBasicSelected, setAlwaysSelectedBasicSelected] =
        useState<string[]>(['react', 'nodejs']) // Pre-select some items that are always selected
    const [alwaysSelectedAdvancedSelected, setAlwaysSelectedAdvancedSelected] =
        useState<string[]>(['users.view', 'content.create']) // Pre-select some permissions

    // Truncation demo state
    const [truncationBasicSelected, setTruncationBasicSelected] = useState<
        string[]
    >([])
    const [truncationCustomSelected, setTruncationCustomSelected] = useState<
        string[]
    >([])
    const [truncationMixedSelected, setTruncationMixedSelected] = useState<
        string[]
    >([])

    // Custom value demo state
    const [customValueBasicSelected, setCustomValueBasicSelected] = useState<
        string[]
    >([])
    const [customValueWithLabelSelected, setCustomValueWithLabelSelected] =
        useState<string[]>([])
    const [customValueFormSelected, setCustomValueFormSelected] = useState<
        string[]
    >([])

    // Payment Gateway demo state
    const [gatewaySelected, setGatewaySelected] = useState<string[]>([])

    // Clear Button Control demo state
    const [clearButtonDemoSelected, setClearButtonDemoSelected] = useState<
        string[]
    >([])
    const [
        clearButtonWithCallbackSelected,
        setClearButtonWithCallbackSelected,
    ] = useState<string[]>([])

    // Helper function to get icon for gateway
    const getGatewayIcon = (gateway: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            ADYEN: <CreditCard size={16} />,
            AIRPAY: <Wallet size={16} />,
            AIRWALLEX: <Globe size={16} />,
            AMAZONPAY: <ShoppingCart size={16} />,
            AMEX: <CreditCard size={16} />,
            AMEX_DI: <CreditCard size={16} />,
            AMPS: <Building size={16} />,
            AXISNB: <Building size={16} />,
            AXIS_BIZ: <Building size={16} />,
            BILLDESK: <Banknote size={16} />,
            CAMSPAY: <Smartphone size={16} />,
            CAREEMPAY: <Smartphone size={16} />,
            CCAVENUE_V2: <CreditCard size={16} />,
            CYBERSOURCE: <Shield size={16} />,
            DIGIO: <Smartphone size={16} />,
            DUMMY: <Circle size={16} />,
            GOCASHFREE: <Wallet size={16} />,
            GPAY_IMF: <Smartphone size={16} />,
            HDFC: <Building size={16} />,
            HDFCBANK_SMARTGATEWAY: <Building size={16} />,
            HDFC_CC_EMI: <CreditCard size={16} />,
            HSBC: <Building size={16} />,
            HSBC_BIZ: <Building size={16} />,
            HYPERPAY: <CreditCard size={16} />,
            HYPERPG: <CreditCard size={16} />,
            IATAPAY: <Globe size={16} />,
            LOTUSPAY: <CreditCard size={16} />,
            LSP_ETB: <Building size={16} />,
            MPGS: <CreditCard size={16} />,
            MYFATOORAH: <Globe size={16} />,
            PAYAMIGO: <CreditCard size={16} />,
            PAYFORT: <Globe size={16} />,
            PAYTM_V2: <Wallet size={16} />,
            PAYU: <CreditCard size={16} />,
            PHONEPE: <Smartphone size={16} />,
            PINELABS: <CreditCard size={16} />,
            PINELABS_ONLINE: <CreditCard size={16} />,
            QWIKCILVER: <Wallet size={16} />,
            RAZORPAY: <CreditCard size={16} />,
            SETU: <Building size={16} />,
            SODEXO: <Coins size={16} />,
            STRIPE: <CreditCard size={16} />,
            TABBY: <CreditCard size={16} />,
            TATA_PA: <Building size={16} />,
            TPSL: <CreditCard size={16} />,
            TWOC_TWOP: <CreditCard size={16} />,
            UNIPG: <CreditCard size={16} />,
            YES_BIZ: <Building size={16} />,
            YPP: <CreditCard size={16} />,
            ZAAKPAY: <CreditCard size={16} />,
        }
        return iconMap[gateway] || <CreditCard size={16} />
    }

    // Payment Gateway items
    const gatewayItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Payment Gateways',
            items: [
                {
                    label: 'ADYEN',
                    value: 'ADYEN',
                    slot1: getGatewayIcon('ADYEN'),
                },
                {
                    label: 'AIRPAY',
                    value: 'AIRPAY',
                    slot1: getGatewayIcon('AIRPAY'),
                },
                {
                    label: 'AIRWALLEX',
                    value: 'AIRWALLEX',
                    slot1: getGatewayIcon('AIRWALLEX'),
                },
                {
                    label: 'AMAZONPAY',
                    value: 'AMAZONPAY',
                    slot1: getGatewayIcon('AMAZONPAY'),
                },
                { label: 'AMEX', value: 'AMEX', slot1: getGatewayIcon('AMEX') },
                {
                    label: 'AMEX_DI',
                    value: 'AMEX_DI',
                    slot1: getGatewayIcon('AMEX_DI'),
                },
                { label: 'AMPS', value: 'AMPS', slot1: getGatewayIcon('AMPS') },
                {
                    label: 'AXISNB',
                    value: 'AXISNB',
                    slot1: getGatewayIcon('AXISNB'),
                },
                {
                    label: 'AXIS_BIZ',
                    value: 'AXIS_BIZ',
                    slot1: getGatewayIcon('AXIS_BIZ'),
                },
                {
                    label: 'BILLDESK',
                    value: 'BILLDESK',
                    slot1: getGatewayIcon('BILLDESK'),
                },
                {
                    label: 'CAMSPAY',
                    value: 'CAMSPAY',
                    slot1: getGatewayIcon('CAMSPAY'),
                },
                {
                    label: 'CAREEMPAY',
                    value: 'CAREEMPAY',
                    slot1: getGatewayIcon('CAREEMPAY'),
                },
                {
                    label: 'CCAVENUE_V2',
                    value: 'CCAVENUE_V2',
                    slot1: getGatewayIcon('CCAVENUE_V2'),
                },
                {
                    label: 'CYBERSOURCE',
                    value: 'CYBERSOURCE',
                    slot1: getGatewayIcon('CYBERSOURCE'),
                },
                {
                    label: 'DIGIO',
                    value: 'DIGIO',
                    slot1: getGatewayIcon('DIGIO'),
                },
                {
                    label: 'DUMMY',
                    value: 'DUMMY',
                    slot1: getGatewayIcon('DUMMY'),
                },
                {
                    label: 'GOCASHFREE',
                    value: 'GOCASHFREE',
                    slot1: getGatewayIcon('GOCASHFREE'),
                },
                {
                    label: 'GPAY_IMF',
                    value: 'GPAY_IMF',
                    slot1: getGatewayIcon('GPAY_IMF'),
                },
                { label: 'HDFC', value: 'HDFC', slot1: getGatewayIcon('HDFC') },
                {
                    label: 'HDFCBANK_SMARTGATEWAY',
                    value: 'HDFCBANK_SMARTGATEWAY',
                    slot1: getGatewayIcon('HDFCBANK_SMARTGATEWAY'),
                },
                {
                    label: 'HDFC_CC_EMI',
                    value: 'HDFC_CC_EMI',
                    slot1: getGatewayIcon('HDFC_CC_EMI'),
                },
                { label: 'HSBC', value: 'HSBC', slot1: getGatewayIcon('HSBC') },
                {
                    label: 'HSBC_BIZ',
                    value: 'HSBC_BIZ',
                    slot1: getGatewayIcon('HSBC_BIZ'),
                },
                {
                    label: 'HYPERPAY',
                    value: 'HYPERPAY',
                    slot1: getGatewayIcon('HYPERPAY'),
                },
                {
                    label: 'HYPERPG',
                    value: 'HYPERPG',
                    slot1: getGatewayIcon('HYPERPG'),
                },
                {
                    label: 'IATAPAY',
                    value: 'IATAPAY',
                    slot1: getGatewayIcon('IATAPAY'),
                },
                {
                    label: 'LOTUSPAY',
                    value: 'LOTUSPAY',
                    slot1: getGatewayIcon('LOTUSPAY'),
                },
                {
                    label: 'LSP_ETB',
                    value: 'LSP_ETB',
                    slot1: getGatewayIcon('LSP_ETB'),
                },
                { label: 'MPGS', value: 'MPGS', slot1: getGatewayIcon('MPGS') },
                {
                    label: 'MYFATOORAH',
                    value: 'MYFATOORAH',
                    slot1: getGatewayIcon('MYFATOORAH'),
                },
                {
                    label: 'PAYAMIGO',
                    value: 'PAYAMIGO',
                    slot1: getGatewayIcon('PAYAMIGO'),
                },
                {
                    label: 'PAYFORT',
                    value: 'PAYFORT',
                    slot1: getGatewayIcon('PAYFORT'),
                },
                {
                    label: 'PAYTM_V2',
                    value: 'PAYTM_V2',
                    slot1: getGatewayIcon('PAYTM_V2'),
                },
                { label: 'PAYU', value: 'PAYU', slot1: getGatewayIcon('PAYU') },
                {
                    label: 'PHONEPE',
                    value: 'PHONEPE',
                    slot1: getGatewayIcon('PHONEPE'),
                },
                {
                    label: 'PINELABS',
                    value: 'PINELABS',
                    slot1: getGatewayIcon('PINELABS'),
                },
                {
                    label: 'PINELABS_ONLINE',
                    value: 'PINELABS_ONLINE',
                    slot1: getGatewayIcon('PINELABS_ONLINE'),
                },
                {
                    label: 'QWIKCILVER',
                    value: 'QWIKCILVER',
                    slot1: getGatewayIcon('QWIKCILVER'),
                },
                {
                    label: 'RAZORPAY',
                    value: 'RAZORPAY',
                    slot1: getGatewayIcon('RAZORPAY'),
                },
                { label: 'SETU', value: 'SETU', slot1: getGatewayIcon('SETU') },
                {
                    label: 'SODEXO',
                    value: 'SODEXO',
                    slot1: getGatewayIcon('SODEXO'),
                },
                {
                    label: 'STRIPE',
                    value: 'STRIPE',
                    slot1: getGatewayIcon('STRIPE'),
                },
                {
                    label: 'TABBY',
                    value: 'TABBY',
                    slot1: getGatewayIcon('TABBY'),
                },
                {
                    label: 'TATA_PA',
                    value: 'TATA_PA',
                    slot1: getGatewayIcon('TATA_PA'),
                },
                { label: 'TPSL', value: 'TPSL', slot1: getGatewayIcon('TPSL') },
                {
                    label: 'TWOC_TWOP',
                    value: 'TWOC_TWOP',
                    slot1: getGatewayIcon('TWOC_TWOP'),
                },
                {
                    label: 'UNIPG',
                    value: 'UNIPG',
                    slot1: getGatewayIcon('UNIPG'),
                },
                {
                    label: 'YES_BIZ',
                    value: 'YES_BIZ',
                    slot1: getGatewayIcon('YES_BIZ'),
                },
                { label: 'YPP', value: 'YPP', slot1: getGatewayIcon('YPP') },
                {
                    label: 'ZAAKPAY',
                    value: 'ZAAKPAY',
                    slot1: getGatewayIcon('ZAAKPAY'),
                },
            ],
        },
    ]

    // Sample data
    const simpleItems: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
                { label: 'Option 5', value: 'option5' },
            ],
        },
    ]

    const skillItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Frontend',
            showSeparator: true,
            items: [
                { label: 'React', value: 'react', slot1: <Code size={16} /> },
                { label: 'Vue.js', value: 'vue', slot1: <Code size={16} /> },
                {
                    label: 'Angular',
                    value: 'angular',
                    slot1: <Code size={16} />,
                },
                { label: 'Svelte', value: 'svelte', slot1: <Code size={16} /> },
                {
                    label: 'Next.js',
                    value: 'nextjs',
                    slot1: <Code size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Backend',
            showSeparator: true,
            items: [
                {
                    label: 'Node.js',
                    value: 'nodejs',
                    slot1: <Server size={16} />,
                },
                {
                    label: 'Python',
                    value: 'python',
                    slot1: <Server size={16} />,
                },
                { label: 'Java', value: 'java', slot1: <Server size={16} /> },
                { label: 'C#', value: 'csharp', slot1: <Server size={16} /> },
                { label: 'Go', value: 'go', slot1: <Server size={16} /> },
            ],
        },
        {
            groupLabel: 'Database',
            items: [
                {
                    label: 'PostgreSQL',
                    value: 'postgresql',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'MySQL',
                    value: 'mysql',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'MongoDB',
                    value: 'mongodb',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'Redis',
                    value: 'redis',
                    slot1: <Database size={16} />,
                },
            ],
        },
    ]

    const permissionItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'User Management',
            showSeparator: true,
            items: [
                {
                    label: 'View Users',
                    value: 'users.view',
                    subLabel: 'Read-only access',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Edit Users',
                    value: 'users.edit',
                    subLabel: 'Modify user data',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Delete Users',
                    value: 'users.delete',
                    subLabel: 'Remove users',
                    slot1: <Users size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Content Management',
            showSeparator: true,
            items: [
                {
                    label: 'Create Content',
                    value: 'content.create',
                    subLabel: 'Add new content',
                    slot1: <Star size={16} />,
                },
                {
                    label: 'Edit Content',
                    value: 'content.edit',
                    subLabel: 'Modify existing',
                    slot1: <Star size={16} />,
                },
                {
                    label: 'Publish Content',
                    value: 'content.publish',
                    subLabel: 'Make content live',
                    slot1: <Star size={16} />,
                },
            ],
        },
        {
            groupLabel: 'System Settings',
            items: [
                {
                    label: 'View Settings',
                    value: 'settings.view',
                    subLabel: 'Read-only access',
                    slot1: <Settings size={16} />,
                },
                {
                    label: 'Edit Settings',
                    value: 'settings.edit',
                    subLabel: 'Modify settings',
                    slot1: <Settings size={16} />,
                },
                {
                    label: 'Advanced Settings',
                    value: 'settings.advanced',
                    subLabel: 'System config',
                    slot1: <Shield size={16} />,
                },
            ],
        },
    ]

    const interestItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Professional',
            items: [
                {
                    label: 'Leadership',
                    value: 'leadership',
                    slot1: <Crown size={16} />,
                },
                {
                    label: 'Management',
                    value: 'management',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Strategy',
                    value: 'strategy',
                    slot1: <Target size={16} />,
                },
                {
                    label: 'Innovation',
                    value: 'innovation',
                    slot1: <Lightbulb size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Technical',
            items: [
                {
                    label: 'Development',
                    value: 'development',
                    slot1: <Code size={16} />,
                },
                {
                    label: 'DevOps',
                    value: 'devops',
                    slot1: <Server size={16} />,
                },
                {
                    label: 'Data Science',
                    value: 'datascience',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'Security',
                    value: 'security',
                    slot1: <Shield size={16} />,
                },
            ],
        },
    ]

    const statusItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'User Status',
            items: [
                {
                    label: 'Active',
                    value: 'active',
                    slot1: <Circle size={16} color="#10b981" fill="#10b981" />,
                },
                {
                    label: 'Inactive',
                    value: 'inactive',
                    slot1: <Circle size={16} color="#ef4444" fill="#ef4444" />,
                },
                {
                    label: 'Pending',
                    value: 'pending',
                    slot1: <Circle size={16} color="#f59e0b" fill="#f59e0b" />,
                },
                {
                    label: 'Suspended',
                    value: 'suspended',
                    slot1: <Circle size={16} color="#6b7280" fill="#6b7280" />,
                },
            ],
        },
    ]

    const columnItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Basic Info',
            items: [
                { label: 'Name', value: 'name' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Role', value: 'role' },
            ],
        },
        {
            groupLabel: 'Metadata',
            items: [
                { label: 'Created Date', value: 'created' },
                { label: 'Last Login', value: 'lastLogin' },
                { label: 'Status', value: 'status' },
                { label: 'Department', value: 'department' },
            ],
        },
    ]

    // Truncation test data
    const truncationItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Long Text Examples with Automatic Tooltips',
            showSeparator: true,
            items: [
                {
                    label: 'This is an extremely long label that will definitely be truncated in most dropdown configurations and should automatically show a tooltip',
                    value: 'long-auto-1',
                    subLabel:
                        'This is also a very long sublabel that might get truncated and should show tooltip content automatically when hovered',
                },
                {
                    label: 'Another exceptionally long option name that exceeds typical dropdown width limits and demonstrates automatic truncation detection',
                    value: 'long-auto-2',
                    subLabel: 'Short sub',
                },
                {
                    label: 'Medium length option that might truncate on smaller screens',
                    value: 'medium-auto-1',
                    subLabel:
                        'This sublabel is quite long and will likely be truncated on smaller containers or narrow dropdowns',
                },
            ],
        },
        {
            groupLabel: 'Custom Tooltip Examples',
            showSeparator: true,
            items: [
                {
                    label: 'Database Configuration Manager',
                    value: 'custom-tooltip-1',
                    subLabel: 'Advanced settings',
                    slot1: <Database size={16} />,
                    tooltip:
                        'This option configures database connections, connection pooling, transaction handling, and backup settings for your application',
                    tooltipProps: {
                        side: TooltipSide.RIGHT,
                        size: TooltipSize.LARGE,
                    },
                },
                {
                    label: 'Cloud Storage Integration Service',
                    value: 'custom-tooltip-2',
                    subLabel: 'File management',
                    slot1: <Server size={16} />,
                    tooltip: (
                        <div>
                            <strong>Cloud Storage Service</strong>
                            <br />
                            <br />
                            <strong>Supported Providers:</strong>
                            <br />
                            • AWS S3 - Scalable object storage
                            <br />
                            • Google Cloud Storage - Enterprise-grade
                            <br />
                            • Azure Blob Storage - Microsoft cloud
                            <br />
                            <br />
                            <strong>Features:</strong>
                            <br />
                            • Automatic file upload/download
                            <br />
                            • Real-time synchronization
                            <br />• Advanced security and encryption
                        </div>
                    ),
                },
                {
                    label: 'API Gateway and Rate Limiting System',
                    value: 'custom-tooltip-3',
                    subLabel: 'Security & performance',
                    slot1: <Shield size={16} />,
                    tooltip:
                        'Manages API requests, implements rate limiting, handles authentication, and provides detailed analytics for all API endpoints in your system',
                },
            ],
        },
        {
            groupLabel: 'Mixed Content Examples',
            items: [
                {
                    label: 'Short item',
                    value: 'short-1',
                    subLabel: 'Brief description',
                },
                {
                    label: 'This is a longer item name that demonstrates mixed content lengths',
                    value: 'mixed-1',
                    subLabel: 'Short',
                    slot1: <Star size={16} />,
                    slot2: (
                        <span style={{ color: 'green', fontSize: '12px' }}>
                            ●
                        </span>
                    ),
                },
                {
                    label: 'No Truncation Example',
                    value: 'no-truncate-1',
                    subLabel:
                        "This item has truncation disabled so it won't show automatic tooltips even if the text is very long",
                    disableTruncation: true,
                    tooltip:
                        'This item has truncation disabled but still shows this custom tooltip when you hover over it',
                },
                {
                    label: 'Very Long Item Name That Will Be Truncated With Multiple Slots And Custom Tooltip Content',
                    value: 'complex-1',
                    subLabel:
                        'This is a complex item with multiple slots, long text, and custom tooltip functionality',
                    slot1: <Settings size={16} />,
                    slot2: (
                        <span
                            style={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                            }}
                        >
                            NEW
                        </span>
                    ),
                    slot3: <Target size={14} />,
                    tooltip:
                        'This complex item demonstrates how tooltips work with multiple slots, long labels, and various UI elements combined together',
                },
            ],
        },
    ]

    // Option arrays for controls
    const sizeOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Small', value: MultiSelectMenuSize.SMALL },
                { label: 'Medium', value: MultiSelectMenuSize.MEDIUM },
                { label: 'Large', value: MultiSelectMenuSize.LARGE },
            ],
        },
    ]

    const variantOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Container', value: MultiSelectVariant.CONTAINER },
                {
                    label: 'No Container',
                    value: MultiSelectVariant.NO_CONTAINER,
                },
            ],
        },
    ]

    const alignmentOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Start', value: MultiSelectMenuAlignment.START },
                { label: 'Center', value: MultiSelectMenuAlignment.CENTER },
                { label: 'End', value: MultiSelectMenuAlignment.END },
            ],
        },
    ]

    const sideOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Top', value: MultiSelectMenuSide.TOP },
                { label: 'Bottom', value: MultiSelectMenuSide.BOTTOM },
                { label: 'Left', value: MultiSelectMenuSide.LEFT },
                { label: 'Right', value: MultiSelectMenuSide.RIGHT },
            ],
        },
    ]

    const selectionTagTypeOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Count', value: MultiSelectSelectionTagType.COUNT },
                { label: 'Text', value: MultiSelectSelectionTagType.TEXT },
            ],
        },
    ]

    const [playgroundShowSkeleton, setPlaygroundShowSkeleton] = useState(false)
    const [playgroundSkeletonCount, setPlaygroundSkeletonCount] = useState('3')

    // Helper function to handle multi-select changes
    const handleMultiSelectChange =
        (
            _: string[],
            setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
        ) =>
        (value: string) => {
            if (value === '') {
                setSelectedValues([])
            } else {
                setSelectedValues((prev) =>
                    prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                )
            }
        }

    // Helper function to clear all selections
    const clearAllSelections = () => {
        setPlaygroundSelected([])
        setBasicSimpleSelected([])
        setBasicCountSelected([])
        setBasicTextSelected([])
        setBasicIconSelected([])
        setBasicRequiredSelected([])
        setBasicNoContainerSelected([])
        setSmallSizeSelected([])
        setMediumSizeSelected([])
        setLargeSizeSelected([])
        setSkillsSelected([])
        setPermissionsSelected([])
        setPreSelectedValues([])
        setTopSideSelected([])
        setBottomSideSelected([])
        setLeftSideSelected([])
        setRightSideSelected([])
        setStartAlignSelected([])
        setCenterAlignSelected([])
        setEndAlignSelected([])
        setFormNameValue('')
        setFormSkillsSelected([])
        setFormInterestsSelected([])
        setFormPermissionsSelected([])
        setFilterStatusSelected([])
        setFilterColumnsSelected([])
        setSearchDesktopSelected([])
        setSearchMobileSelected([])
        setSearchWithSelectAllSelected([])
        setSearchLargeDatasetSelected([])
        setDividersEnabledSelected([])
        setDividersDisabledSelected([])
        setDividersMobileSelected([])
        setDividersComparisonSelected([])
        setTruncationBasicSelected([])
        setTruncationCustomSelected([])
        setTruncationMixedSelected([])
        setMaxSelectionsBasicSelected([])
        setMaxSelectionsAdvancedSelected([])
        setBorderRadiusFixSelected([])
        setCustomValueBasicSelected([])
        setCustomValueWithLabelSelected([])
        setCustomValueFormSelected([])
        addSnackbar({
            header: 'All Selections Cleared',
            description: 'All multi-select values have been reset',
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            {/* Header with Clear Button */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">MultiSelect Playground</h1>
                <button
                    onClick={clearAllSelections}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Clear All Selections
                </button>
            </div>

            {/* Playground */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Controls</h2>

                        <div className="space-y-4">
                            <Switch
                                label="Show Skeleton"
                                checked={playgroundShowSkeleton}
                                onChange={() =>
                                    setPlaygroundShowSkeleton(
                                        !playgroundShowSkeleton
                                    )
                                }
                            />
                            <TextInput
                                label="Skeleton Count"
                                value={playgroundSkeletonCount.toString()}
                                onChange={(e) =>
                                    setPlaygroundSkeletonCount(e.target.value)
                                }
                                placeholder="Enter skeleton count"
                            />
                            <TextInput
                                label="Label"
                                value={playgroundLabel}
                                onChange={(e) =>
                                    setPlaygroundLabel(e.target.value)
                                }
                                placeholder="Enter label"
                            />

                            <TextInput
                                label="Error"
                                value={playgroundErrorMessage}
                                onChange={(e) =>
                                    setPlaygroundErrorMessage(e.target.value)
                                }
                            />

                            <TextInput
                                label="Sub Label"
                                value={playgroundSubLabel}
                                onChange={(e) =>
                                    setPlaygroundSubLabel(e.target.value)
                                }
                                placeholder="Enter sub label"
                            />

                            <TextInput
                                label="Hint Text"
                                value={playgroundHintText}
                                onChange={(e) =>
                                    setPlaygroundHintText(e.target.value)
                                }
                                placeholder="Enter hint text"
                            />

                            <TextInput
                                label="Placeholder"
                                value={playgroundPlaceholder}
                                onChange={(e) =>
                                    setPlaygroundPlaceholder(e.target.value)
                                }
                                placeholder="Enter placeholder"
                            />

                            <MultiSelect
                                label="Size"
                                items={sizeOptions}
                                selectedValues={
                                    playgroundSize ? [playgroundSize] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSize(
                                        value as MultiSelectMenuSize
                                    )
                                }
                                placeholder="Select size"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Variant"
                                items={variantOptions}
                                selectedValues={
                                    playgroundVariant ? [playgroundVariant] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundVariant(
                                        value as MultiSelectVariant
                                    )
                                }
                                placeholder="Select variant"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Alignment"
                                items={alignmentOptions}
                                selectedValues={
                                    playgroundAlignment
                                        ? [playgroundAlignment]
                                        : []
                                }
                                onChange={(value) =>
                                    setPlaygroundAlignment(
                                        value as MultiSelectMenuAlignment
                                    )
                                }
                                placeholder="Select alignment"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Side"
                                items={sideOptions}
                                selectedValues={
                                    playgroundSide ? [playgroundSide] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSide(
                                        value as MultiSelectMenuSide
                                    )
                                }
                                placeholder="Select side"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Selection Tag Type"
                                items={selectionTagTypeOptions}
                                selectedValues={
                                    playgroundSelectionTagType
                                        ? [playgroundSelectionTagType]
                                        : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSelectionTagType(
                                        value as MultiSelectSelectionTagType
                                    )
                                }
                                placeholder="Select tag type"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Preview</h2>

                        <div
                            className="border rounded-lg p-6 bg-gray-50"
                            style={{ width: '400px' }}
                        >
                            <form>
                                <MultiSelect
                                    skeleton={{
                                        count: parseInt(
                                            playgroundSkeletonCount
                                        ),
                                        show: playgroundShowSkeleton,
                                        variant: 'pulse',
                                    }}
                                    fullWidth={true}
                                    minMenuWidth={400}
                                    showActionButtons={true}
                                    primaryAction={{
                                        text: 'Apply',
                                        onClick: (selected) => {
                                            console.log('Applied', selected)
                                        },
                                    }}
                                    secondaryAction={{
                                        text: 'Reset',
                                        onClick: () => {
                                            console.log('Reset')
                                        },
                                    }}
                                    error={playgroundError}
                                    errorMessage={playgroundErrorMessage}
                                    onBlur={() => {
                                        console.log('MultiSelect blur')
                                    }}
                                    onFocus={() => {
                                        console.log('MultiSelect focus')
                                    }}
                                    useDrawerOnMobile={true}
                                    height={62}
                                    enableSelectAll={true}
                                    enableSearch={true}
                                    label={playgroundLabel}
                                    sublabel={playgroundSubLabel}
                                    hintText={playgroundHintText}
                                    placeholder={playgroundPlaceholder}
                                    size={playgroundSize}
                                    variant={playgroundVariant}
                                    alignment={playgroundAlignment}
                                    side={playgroundSide}
                                    selectionTagType={
                                        playgroundSelectionTagType
                                    }
                                    items={skillItems}
                                    selectedValues={playgroundSelected}
                                    onChange={handleMultiSelectChange(
                                        playgroundSelected,
                                        setPlaygroundSelected
                                    )}
                                    required={playgroundRequired}
                                    disabled={playgroundDisabled}
                                    slot={
                                        playgroundShowSlot ? (
                                            <User size={16} />
                                        ) : undefined
                                    }
                                />
                            </form>
                            {playgroundSelected.length > 0 && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        <strong>
                                            Selected (
                                            {playgroundSelected.length}):
                                        </strong>{' '}
                                        {playgroundSelected.join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Switch
                                label="Required"
                                checked={playgroundRequired}
                                onChange={() =>
                                    setPlaygroundRequired(!playgroundRequired)
                                }
                            />

                            <Switch
                                label="Error"
                                checked={playgroundError}
                                onChange={() =>
                                    setPlaygroundError(!playgroundError)
                                }
                            />

                            <Switch
                                label="Disabled"
                                checked={playgroundDisabled}
                                onChange={() =>
                                    setPlaygroundDisabled(!playgroundDisabled)
                                }
                            />

                            <Switch
                                label="Show Icon Slot"
                                checked={playgroundShowSlot}
                                onChange={() =>
                                    setPlaygroundShowSlot(!playgroundShowSlot)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* New Defaults Showcase */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">✨ New Defaults Showcase</h2>
                <p className="text-gray-600">
                    <strong>
                        Search and Action Buttons are now enabled by default!
                    </strong>
                    All MultiSelect components now include search functionality
                    and action buttons out of the box, providing a better user
                    experience without additional configuration.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Default Desktop Experience
                        </h3>
                        <MultiSelect
                            label="Technologies (Default Settings)"
                            sublabel="Search and action buttons enabled by default"
                            items={skillItems}
                            selectedValues={basicSimpleSelected}
                            onChange={handleMultiSelectChange(
                                basicSimpleSelected,
                                setBasicSimpleSelected
                            )}
                            placeholder="Start typing to search..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {basicSimpleSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Selected ({basicSimpleSelected.length}):
                                    </strong>{' '}
                                    {basicSimpleSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    ✓ Search enabled by default • ✓ Action
                                    buttons included
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Default Mobile Experience
                        </h3>
                        <MultiSelect
                            label="Permissions (Default Settings)"
                            sublabel="Mobile drawer with search and actions"
                            items={permissionItems}
                            selectedValues={basicCountSelected}
                            onChange={handleMultiSelectChange(
                                basicCountSelected,
                                setBasicCountSelected
                            )}
                            placeholder="Search permissions..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {basicCountSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected ({basicCountSelected.length}):
                                    </strong>{' '}
                                    {basicCountSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    ✓ Mobile search included • ✓ Apply/Clear
                                    buttons ready
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">
                        🎉 What's New in MultiSelect Defaults:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>
                                • <strong>enableSearch = true</strong> (was
                                false)
                            </li>
                            <li>
                                • <strong>Action buttons auto-show</strong> when
                                primaryAction or secondaryAction is provided
                            </li>
                            <li>
                                • <strong>No default action buttons</strong> -
                                only show when explicitly provided
                            </li>
                        </ul>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>
                                •{' '}
                                <strong>Consistent across all variants</strong>{' '}
                                (Desktop, Mobile, Menu)
                            </li>
                            <li>
                                • <strong>Backward compatible</strong> - can
                                still be disabled
                            </li>
                            <li>
                                • <strong>Better UX out of the box</strong> - no
                                configuration needed
                            </li>
                            <li>
                                • <strong>Mobile drawer improvements</strong> -
                                centered title when actions present
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-green-400">
                        <p className="text-sm text-green-700">
                            <strong>Migration Note:</strong> Action buttons are
                            now hidden by default and only show when
                            primaryAction or secondaryAction props are provided.
                            This is a breaking change from previous versions.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Action Button Behavior</h2>
                <p className="text-gray-600">
                    Action buttons are now hidden by default and only appear
                    when primaryAction or secondaryAction props are provided.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            No Action Buttons (Default)
                        </h3>
                        <p className="text-sm text-gray-600">
                            Without primaryAction or secondaryAction, no action
                            buttons are shown.
                        </p>
                        <MultiSelect
                            label="Select Skills"
                            items={skillItems}
                            selectedValues={basicSimpleSelected}
                            onChange={handleMultiSelectChange(
                                basicSimpleSelected,
                                setBasicSimpleSelected
                            )}
                            placeholder="Choose skills"
                            enableSearch={true}
                            enableSelectAll={true}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Primary Action</h3>
                        <p className="text-sm text-gray-600">
                            Action buttons automatically appear when
                            primaryAction is provided.
                        </p>
                        <MultiSelect
                            label="Select Skills"
                            items={skillItems}
                            selectedValues={actionButtonsSelected}
                            onChange={handleMultiSelectChange(
                                actionButtonsSelected,
                                setActionButtonsSelected
                            )}
                            placeholder="Choose skills"
                            enableSearch={true}
                            enableSelectAll={true}
                            primaryAction={{
                                text: 'Apply Selection',
                                onClick: () => {
                                    console.log(
                                        'Applied skills:',
                                        actionButtonsSelected
                                    )
                                },
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Both Actions</h3>
                        <p className="text-sm text-gray-600">
                            Both primary and secondary action buttons are shown
                            when provided.
                        </p>
                        <MultiSelect
                            label="Select Skills"
                            items={skillItems}
                            selectedValues={searchMobileSelected}
                            onChange={handleMultiSelectChange(
                                searchMobileSelected,
                                setSearchMobileSelected
                            )}
                            placeholder="Choose skills"
                            enableSearch={true}
                            enableSelectAll={true}
                            primaryAction={{
                                text: 'Apply',
                                onClick: () => {
                                    console.log(
                                        'Applied skills:',
                                        searchMobileSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Reset',
                                onClick: () => {
                                    setSearchMobileSelected([])
                                },
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Explicit Control</h3>
                        <p className="text-sm text-gray-600">
                            You can still explicitly control with
                            showActionButtons={false} even when actions are
                            provided.
                        </p>
                        <MultiSelect
                            label="Select Skills"
                            items={skillItems}
                            selectedValues={basicTextSelected}
                            onChange={handleMultiSelectChange(
                                basicTextSelected,
                                setBasicTextSelected
                            )}
                            placeholder="Choose skills"
                            enableSearch={true}
                            enableSelectAll={true}
                            showActionButtons={false}
                            primaryAction={{
                                text: "This Won't Show",
                                onClick: () => {},
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Examples</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Simple Multi-Select</h3>
                        <MultiSelect
                            enableSearch={true}
                            enableSelectAll={true}
                            label="Basic Options"
                            items={simpleItems}
                            selectedValues={basicSimpleSelected}
                            onChange={handleMultiSelectChange(
                                basicSimpleSelected,
                                setBasicSimpleSelected
                            )}
                            placeholder="Choose multiple options"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicSimpleSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Selected ({basicSimpleSelected.length}):{' '}
                                {basicSimpleSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Count Display</h3>
                        <MultiSelect
                            label="Show Count"
                            items={skillItems}
                            selectedValues={basicCountSelected}
                            onChange={handleMultiSelectChange(
                                basicCountSelected,
                                setBasicCountSelected
                            )}
                            placeholder="Select skills"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicCountSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Count: {basicCountSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Text Display</h3>
                        <MultiSelect
                            label="Show Text"
                            items={simpleItems}
                            selectedValues={basicTextSelected}
                            onChange={handleMultiSelectChange(
                                basicTextSelected,
                                setBasicTextSelected
                            )}
                            placeholder="Select options"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        {basicTextSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Text display: {basicTextSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Icons</h3>
                        <MultiSelect
                            label="Tech Stack"
                            items={skillItems}
                            selectedValues={basicIconSelected}
                            onChange={handleMultiSelectChange(
                                basicIconSelected,
                                setBasicIconSelected
                            )}
                            placeholder="Select technologies"
                            slot={<Code size={16} />}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicIconSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Tech: {basicIconSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Required</h3>
                        <MultiSelect
                            label="Required Skills"
                            items={skillItems}
                            selectedValues={basicRequiredSelected}
                            onChange={handleMultiSelectChange(
                                basicRequiredSelected,
                                setBasicRequiredSelected
                            )}
                            placeholder="Must select at least one"
                            required
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicRequiredSelected.length > 0 && (
                            <p className="text-xs text-green-600">
                                ✓ Requirement met:{' '}
                                {basicRequiredSelected.length} selected
                            </p>
                        )}
                        {basicRequiredSelected.length === 0 && (
                            <p className="text-xs text-red-600">
                                ⚠ At least one selection required
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">No Container</h3>
                        <MultiSelect
                            label="Minimal Style"
                            items={simpleItems}
                            selectedValues={basicNoContainerSelected}
                            onChange={handleMultiSelectChange(
                                basicNoContainerSelected,
                                setBasicNoContainerSelected
                            )}
                            placeholder="Minimal select"
                            variant={MultiSelectVariant.NO_CONTAINER}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicNoContainerSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Minimal: {basicNoContainerSelected.length}{' '}
                                selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Small</h3>
                        <MultiSelect
                            label="Small Multi-Select"
                            size={MultiSelectMenuSize.SMALL}
                            items={simpleItems}
                            selectedValues={smallSizeSelected}
                            onChange={handleMultiSelectChange(
                                smallSizeSelected,
                                setSmallSizeSelected
                            )}
                            placeholder="Small size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {smallSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Small: {smallSizeSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Medium (Default)</h3>
                        <MultiSelect
                            label="Medium Multi-Select"
                            size={MultiSelectMenuSize.MEDIUM}
                            items={simpleItems}
                            selectedValues={mediumSizeSelected}
                            onChange={handleMultiSelectChange(
                                mediumSizeSelected,
                                setMediumSizeSelected
                            )}
                            placeholder="Medium size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {mediumSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Medium: {mediumSizeSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Large</h3>
                        <MultiSelect
                            label="Large Multi-Select"
                            size={MultiSelectMenuSize.LARGE}
                            items={simpleItems}
                            selectedValues={largeSizeSelected}
                            onChange={handleMultiSelectChange(
                                largeSizeSelected,
                                setLargeSizeSelected
                            )}
                            placeholder="Large size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {largeSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Large: {largeSizeSelected.length} selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Action Buttons Examples</h2>
                <p className="text-gray-600">
                    Use action buttons to provide Apply and Clear All
                    functionality. Perfect for filter scenarios where users want
                    to confirm their selections.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Desktop with Action Buttons
                        </h3>
                        <MultiSelect
                            label="Filter Technologies"
                            sublabel="Select technologies to filter by"
                            items={skillItems}
                            selectedValues={actionButtonsSelected}
                            onChange={handleMultiSelectChange(
                                actionButtonsSelected,
                                setActionButtonsSelected
                            )}
                            placeholder="Choose technologies"
                            enableSearch={true}
                            enableSelectAll={true}
                            primaryAction={{
                                text: 'Apply Filters',
                                onClick: () => {
                                    // Apply filters logic here
                                    console.log(
                                        'Applied filters:',
                                        actionButtonsSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Clear All',
                                onClick: () => {
                                    setActionButtonsSelected([])
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {actionButtonsSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected Technologies (
                                        {actionButtonsSelected.length}):
                                    </strong>{' '}
                                    {actionButtonsSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Click "Apply Filters" to confirm your
                                    selection
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Mobile Drawer with Action Buttons
                        </h3>
                        <MultiSelect
                            label="User Permissions"
                            sublabel="Grant permissions to user"
                            items={permissionItems}
                            selectedValues={actionButtonsMobileSelected}
                            onChange={handleMultiSelectChange(
                                actionButtonsMobileSelected,
                                setActionButtonsMobileSelected
                            )}
                            placeholder="Select permissions"
                            enableSelectAll={true}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Grant Permissions',
                                onClick: () => {
                                    // Grant permissions logic here
                                    console.log(
                                        'Granted permissions:',
                                        actionButtonsMobileSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Remove All',
                                onClick: () => {
                                    setActionButtonsMobileSelected([])
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {actionButtonsMobileSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Pending Permissions (
                                        {actionButtonsMobileSelected.length}):
                                    </strong>{' '}
                                    {actionButtonsMobileSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    On mobile, the drawer will show action
                                    buttons and hide the X icon
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Filter Use Case</h3>
                        <MultiSelect
                            label="Advanced Filters"
                            items={statusItems}
                            selectedValues={filterWithActionsSelected}
                            onChange={handleMultiSelectChange(
                                filterWithActionsSelected,
                                setFilterWithActionsSelected
                            )}
                            placeholder="Select status filters"
                            variant={MultiSelectVariant.NO_CONTAINER}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Apply',
                                onClick: () => {
                                    console.log(
                                        'Applied status filters:',
                                        filterWithActionsSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Reset',
                                onClick: () => {
                                    setFilterWithActionsSelected([])
                                    console.log('Reset status filters')
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        {filterWithActionsSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>Active Filters:</strong>{' '}
                                    {filterWithActionsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                        Action Buttons Features:
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                        <li>
                            • <strong>Apply Button:</strong> Primary button to
                            confirm selections and close dropdown/drawer
                        </li>
                        <li>
                            • <strong>Clear All Button:</strong> Secondary
                            button to clear all selections
                        </li>
                        <li>
                            • <strong>Mobile Behavior:</strong> In mobile
                            drawer, hides the X icon and centers the title
                        </li>
                        <li>
                            • <strong>Customizable Text:</strong> Both button
                            texts can be customized via props
                        </li>
                        <li>
                            • <strong>Border Separation:</strong> Action buttons
                            are separated with a top border
                        </li>
                        <li>
                            • <strong>Perfect for Filters:</strong> Ideal for
                            filter scenarios where confirmation is needed
                        </li>
                    </ul>
                </div>
            </div>

            {/* Search Functionality Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Search Functionality Examples
                </h2>
                <p className="text-gray-600">
                    Enable search functionality to help users quickly find
                    options in large datasets. Works seamlessly on both desktop
                    dropdown and mobile drawer.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Desktop Search</h3>
                        <MultiSelect
                            label="Search Technologies"
                            sublabel="Type to filter options"
                            items={skillItems}
                            selectedValues={searchDesktopSelected}
                            onChange={handleMultiSelectChange(
                                searchDesktopSelected,
                                setSearchDesktopSelected
                            )}
                            placeholder="Search and select technologies"
                            enableSearch={true}
                            searchPlaceholder="Type to search technologies..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {searchDesktopSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Found & Selected (
                                        {searchDesktopSelected.length}):
                                    </strong>{' '}
                                    {searchDesktopSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Search filters options in real-time as you
                                    type
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Mobile Search (Drawer)
                        </h3>
                        <MultiSelect
                            label="Mobile Search"
                            sublabel="Search works in mobile drawer too"
                            items={permissionItems}
                            selectedValues={searchMobileSelected}
                            onChange={handleMultiSelectChange(
                                searchMobileSelected,
                                setSearchMobileSelected
                            )}
                            placeholder="Search permissions"
                            enableSearch={true}
                            searchPlaceholder="Search permissions..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Apply',
                                onClick: () => {
                                    console.log(
                                        'Applied mobile search:',
                                        searchMobileSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Clear All',
                                onClick: () => {
                                    setSearchMobileSelected([])
                                },
                            }}
                        />
                        {searchMobileSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Mobile Search Results (
                                        {searchMobileSelected.length}):
                                    </strong>{' '}
                                    {searchMobileSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Mobile drawer includes TextInput for search
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Search with Select All
                        </h3>
                        <MultiSelect
                            maxTriggerWidth={200}
                            minTriggerWidth={200}
                            label="Search + Select All"
                            sublabel="Combine search with select all functionality"
                            items={skillItems}
                            selectedValues={searchWithSelectAllSelected}
                            onChange={handleMultiSelectChange(
                                searchWithSelectAllSelected,
                                setSearchWithSelectAllSelected
                            )}
                            placeholder="Search and select all"
                            enableSearch={true}
                            enableSelectAll={true}
                            searchPlaceholder="Search to filter, then select all..."
                            selectAllText="Select All Filtered"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        {searchWithSelectAllSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Search + Select All (
                                        {searchWithSelectAllSelected.length}):
                                    </strong>{' '}
                                    {searchWithSelectAllSelected.join(', ')}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    Select All works on filtered results only
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Large Dataset Search</h3>
                        <MultiSelect
                            label="Large Dataset"
                            sublabel="Search is essential for large option lists"
                            items={[
                                ...skillItems,
                                ...permissionItems,
                                ...interestItems,
                                {
                                    groupLabel: 'Additional Options',
                                    items: [
                                        {
                                            label: 'Machine Learning',
                                            value: 'ml',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'Artificial Intelligence',
                                            value: 'ai',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'Blockchain',
                                            value: 'blockchain',
                                            slot1: <Shield size={16} />,
                                        },
                                        {
                                            label: 'Cloud Computing',
                                            value: 'cloud',
                                            slot1: <Server size={16} />,
                                        },
                                        {
                                            label: 'Cybersecurity',
                                            value: 'cybersecurity',
                                            slot1: <Shield size={16} />,
                                        },
                                        {
                                            label: 'Data Analytics',
                                            value: 'analytics',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'Mobile Development',
                                            value: 'mobile',
                                            slot1: <Code size={16} />,
                                        },
                                        {
                                            label: 'Game Development',
                                            value: 'gamedev',
                                            slot1: <Code size={16} />,
                                        },
                                        {
                                            label: 'UI/UX Design',
                                            value: 'design',
                                            slot1: <Star size={16} />,
                                        },
                                        {
                                            label: 'Product Management',
                                            value: 'product',
                                            slot1: <Target size={16} />,
                                        },
                                        {
                                            label: 'Mobile Development11',
                                            value: 'mobile',
                                            slot1: <Code size={16} />,
                                        },
                                        {
                                            label: 'Game Development1',
                                            value: 'gamedev1',
                                            slot1: <Code size={16} />,
                                        },
                                        {
                                            label: 'UI/UX Design1',
                                            value: 'design1',
                                            slot1: <Star size={16} />,
                                        },
                                        {
                                            label: 'Product Management1',
                                            value: 'product1',
                                            slot1: <Target size={16} />,
                                        },
                                        {
                                            label: 'Machine Learning1',
                                            value: 'ml1',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'Artificial Intelligence1',
                                            value: 'ai1',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'Blockchain1',
                                            value: 'blockchain1',
                                            slot1: <Shield size={16} />,
                                        },
                                        {
                                            label: 'Cloud Computing1',
                                            value: 'cloud1',
                                            slot1: <Server size={16} />,
                                        },
                                        {
                                            label: 'Cybersecurity1',
                                            value: 'cybersecurity1',
                                            slot1: <Shield size={16} />,
                                        },
                                    ],
                                },
                            ]}
                            selectedValues={searchLargeDatasetSelected}
                            onChange={handleMultiSelectChange(
                                searchLargeDatasetSelected,
                                setSearchLargeDatasetSelected
                            )}
                            placeholder="Search through many options"
                            enableSearch={true}
                            enableSelectAll={true}
                            searchPlaceholder="Search through 30+ options..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {searchLargeDatasetSelected.length > 0 && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm text-orange-700">
                                    <strong>
                                        Large Dataset Selection (
                                        {searchLargeDatasetSelected.length}):
                                    </strong>{' '}
                                    {searchLargeDatasetSelected
                                        .slice(0, 5)
                                        .join(', ')}
                                    {searchLargeDatasetSelected.length > 5 &&
                                        ` +${searchLargeDatasetSelected.length - 5} more`}
                                </p>
                                <p className="text-xs text-orange-600 mt-1">
                                    Search makes large datasets manageable
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-cyan-50 rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-2">
                        Search Features:
                    </h4>
                    <ul className="text-sm text-cyan-800 space-y-1">
                        <li>
                            • <strong>Real-time Filtering:</strong> Options are
                            filtered as you type
                        </li>
                        <li>
                            • <strong>Label & SubLabel Search:</strong> Searches
                            both main label and sub-label text
                        </li>
                        <li>
                            • <strong>Group Preservation:</strong> Maintains
                            group structure in filtered results
                        </li>
                        <li>
                            • <strong>Mobile Support:</strong> Uses TextInput
                            component in mobile drawer
                        </li>
                        <li>
                            • <strong>Select All Integration:</strong> Select
                            All works on filtered results only
                        </li>
                        <li>
                            • <strong>Custom Placeholder:</strong> Customize
                            search input placeholder text
                        </li>
                        <li>
                            • <strong>Performance:</strong> Efficient filtering
                            for large datasets
                        </li>
                    </ul>
                </div>
            </div>

            {/* Item Dividers Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Item Dividers Examples</h2>
                <p className="text-gray-600">
                    Control the display of dividers between items using the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        showItemDividers
                    </code>{' '}
                    prop. This feature works in both desktop dropdown and mobile
                    drawer.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">With Item Dividers</h3>
                        <MultiSelect
                            label="Dividers Enabled"
                            sublabel="Shows dividers between items"
                            items={skillItems}
                            selectedValues={dividersEnabledSelected}
                            onChange={handleMultiSelectChange(
                                dividersEnabledSelected,
                                setDividersEnabledSelected
                            )}
                            placeholder="Select with dividers"
                            showItemDividers={true}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {dividersEnabledSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        With Dividers (
                                        {dividersEnabledSelected.length}):
                                    </strong>{' '}
                                    {dividersEnabledSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Notice the subtle dividers between items
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Without Item Dividers</h3>
                        <MultiSelect
                            label="Dividers Disabled"
                            sublabel="Clean list without dividers"
                            items={skillItems}
                            selectedValues={dividersDisabledSelected}
                            onChange={handleMultiSelectChange(
                                dividersDisabledSelected,
                                setDividersDisabledSelected
                            )}
                            placeholder="Select without dividers"
                            showItemDividers={false}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {dividersDisabledSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Without Dividers (
                                        {dividersDisabledSelected.length}):
                                    </strong>{' '}
                                    {dividersDisabledSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Clean appearance without visual separators
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Mobile Drawer with Dividers
                        </h3>
                        <MultiSelect
                            label="Mobile Dividers"
                            sublabel="Dividers work in mobile drawer too"
                            items={permissionItems}
                            selectedValues={dividersMobileSelected}
                            onChange={handleMultiSelectChange(
                                dividersMobileSelected,
                                setDividersMobileSelected
                            )}
                            placeholder="Mobile with dividers"
                            showItemDividers={true}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {dividersMobileSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Mobile with Dividers (
                                        {dividersMobileSelected.length}):
                                    </strong>{' '}
                                    {dividersMobileSelected.join(', ')}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    Dividers enhance readability in mobile
                                    drawer
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Comparison View</h3>
                        <MultiSelect
                            label="Large Dataset with Dividers"
                            sublabel="Dividers help with long lists"
                            items={[
                                ...skillItems,
                                ...permissionItems,
                                {
                                    groupLabel: 'Additional Items',
                                    items: [
                                        { label: 'Item A', value: 'item-a' },
                                        { label: 'Item B', value: 'item-b' },
                                        { label: 'Item C', value: 'item-c' },
                                        { label: 'Item D', value: 'item-d' },
                                        { label: 'Item E', value: 'item-e' },
                                    ],
                                },
                            ]}
                            selectedValues={dividersComparisonSelected}
                            onChange={handleMultiSelectChange(
                                dividersComparisonSelected,
                                setDividersComparisonSelected
                            )}
                            placeholder="Large list with dividers"
                            showItemDividers={true}
                            enableSearch={true}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {dividersComparisonSelected.length > 0 && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm text-orange-700">
                                    <strong>
                                        Large List Selection (
                                        {dividersComparisonSelected.length}):
                                    </strong>{' '}
                                    {dividersComparisonSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {dividersComparisonSelected.length > 3 &&
                                        ` +${dividersComparisonSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-orange-600 mt-1">
                                    Dividers improve scanning in long lists
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                        Item Dividers Features:
                    </h4>
                    <ul className="text-sm text-indigo-800 space-y-1">
                        <li>
                            • <strong>Controllable:</strong> Use
                            showItemDividers prop to enable/disable
                        </li>
                        <li>
                            • <strong>Responsive:</strong> Works in both desktop
                            dropdown and mobile drawer
                        </li>
                        <li>
                            • <strong>Smart Positioning:</strong> Dividers
                            appear between items, not at edges
                        </li>
                        <li>
                            • <strong>Group Aware:</strong> Respects group
                            boundaries and separators
                        </li>
                        <li>
                            • <strong>Performance:</strong> Minimal impact on
                            rendering performance
                        </li>
                        <li>
                            • <strong>Accessibility:</strong> Maintains proper
                            focus and navigation
                        </li>
                        <li>
                            • <strong>Design Consistency:</strong> Uses design
                            system tokens for styling
                        </li>
                    </ul>
                </div>
            </div>

            {/* Advanced Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Examples</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Technical Skills</h3>
                        <MultiSelect
                            label="Skills & Technologies"
                            sublabel="Select your expertise areas"
                            hintText="Choose multiple technologies you're proficient in"
                            items={skillItems}
                            selectedValues={skillsSelected}
                            onChange={handleMultiSelectChange(
                                skillsSelected,
                                setSkillsSelected
                            )}
                            placeholder="Select your skills"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            helpIconHintText="This helps us match you with relevant projects"
                        />
                        {skillsSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Skills ({skillsSelected.length}):
                                    </strong>{' '}
                                    {skillsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">User Permissions</h3>
                        <MultiSelect
                            label="Access Control"
                            sublabel="Grant appropriate permissions"
                            hintText="Select permissions based on user role"
                            items={permissionItems}
                            selectedValues={permissionsSelected}
                            onChange={handleMultiSelectChange(
                                permissionsSelected,
                                setPermissionsSelected
                            )}
                            placeholder="Select permissions"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            slot={<Shield size={16} />}
                        />
                        {permissionsSelected.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    <strong>Permissions:</strong>{' '}
                                    {permissionsSelected.length} granted
                                </p>
                                <p className="text-xs text-yellow-600 mt-1">
                                    {permissionsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Pre-selected Values</h3>
                        <MultiSelect
                            label="Current Tech Stack"
                            sublabel="Modify your current setup"
                            items={skillItems}
                            selectedValues={preSelectedValues}
                            onChange={handleMultiSelectChange(
                                preSelectedValues,
                                setPreSelectedValues
                            )}
                            placeholder="Update tech stack"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Current Stack:</strong>{' '}
                                {preSelectedValues.join(', ') ||
                                    'None selected'}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">API Call Example</h3>
                        <MultiSelect
                            label="Current Tech Stack"
                            sublabel="Modify your current setup"
                            items={skillItems}
                            selectedValues={preSelectedValues}
                            onChange={handleMultiSelectChange(
                                preSelectedValues,
                                setPreSelectedValues
                            )}
                            placeholder="Update tech stack"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            onFocus={() => {
                                setApiCallLoadingSkeleton(true)
                                setTimeout(() => {
                                    setApiCallLoadingSkeleton(false)
                                }, 2000)
                            }}
                            skeleton={{
                                count: 4,
                                show: apiCallLoadingSkeleton,
                                variant: 'pulse',
                            }}
                        />
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Current Stack:</strong>{' '}
                                {preSelectedValues.join(', ') ||
                                    'None selected'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Trigger Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Custom Trigger Examples</h2>
                <p className="text-gray-600">
                    Use the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        customTrigger
                    </code>{' '}
                    prop to provide your own trigger element for opening the
                    MultiSelect dropdown.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Button Component Trigger
                        </h3>
                        <MultiSelect
                            label="Skills Selection"
                            items={skillItems}
                            selectedValues={skillsSelected}
                            onChange={handleMultiSelectChange(
                                skillsSelected,
                                setSkillsSelected
                            )}
                            placeholder="Select your skills"
                            customTrigger={
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Select Skills"
                                    leadingIcon={<Code size={16} />}
                                />
                            }
                            onFocus={() => {
                                setApiCallLoadingSkeleton(true)
                                setTimeout(() => {
                                    setApiCallLoadingSkeleton(false)
                                }, 2000)
                            }}
                            skeleton={{
                                count: 4,
                                show: apiCallLoadingSkeleton,
                                variant: 'pulse',
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Secondary Button Trigger
                        </h3>
                        <MultiSelect
                            label="Permissions"
                            items={permissionItems}
                            selectedValues={permissionsSelected}
                            onChange={handleMultiSelectChange(
                                permissionsSelected,
                                setPermissionsSelected
                            )}
                            placeholder="Select permissions"
                            customTrigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Manage Permissions"
                                    leadingIcon={<Shield size={16} />}
                                    trailingIcon={<Settings size={16} />}
                                />
                            }
                        />
                        {permissionsSelected.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    <strong>
                                        Selected via Button (
                                        {permissionsSelected.length}):
                                    </strong>{' '}
                                    {permissionsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Icon-Only Button Trigger
                        </h3>
                        <MultiSelect
                            label="Tech Stack"
                            items={skillItems}
                            selectedValues={preSelectedValues}
                            onChange={handleMultiSelectChange(
                                preSelectedValues,
                                setPreSelectedValues
                            )}
                            placeholder="Update tech stack"
                            customTrigger={
                                <div className="flex items-center gap-2">
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.MEDIUM}
                                        subType={ButtonSubType.ICON_ONLY}
                                        leadingIcon={<Database size={16} />}
                                    />
                                    <span className="text-sm text-gray-700">
                                        Click to edit tech stack
                                    </span>
                                </div>
                            }
                        />
                        {preSelectedValues.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Current Stack (
                                        {preSelectedValues.length}):
                                    </strong>{' '}
                                    {preSelectedValues.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Button with Tooltip Trigger
                        </h3>
                        <MultiSelect
                            label="Skills Selection"
                            items={skillItems}
                            selectedValues={skillsSelected}
                            onChange={handleMultiSelectChange(
                                skillsSelected,
                                setSkillsSelected
                            )}
                            placeholder="Select your skills"
                            customTrigger={
                                <Tooltip
                                    content="Click this button to select skills from the dropdown menu. Hover over the button to see this tooltip."
                                    side={TooltipSide.TOP}
                                    size={TooltipSize.LARGE}
                                    delayDuration={300}
                                >
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        text="Select Skills"
                                        leadingIcon={<Code size={16} />}
                                    />
                                </Tooltip>
                            }
                        />
                        {skillsSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Selected via Tooltip Button (
                                        {skillsSelected.length}):
                                    </strong>{' '}
                                    {skillsSelected.join(', ')}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    💡 Hover over the button to see the tooltip
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Custom Styled Trigger</h3>
                        <MultiSelect
                            label="Filter Status"
                            items={statusItems}
                            selectedValues={filterStatusSelected}
                            onChange={handleMultiSelectChange(
                                filterStatusSelected,
                                setFilterStatusSelected
                            )}
                            placeholder="All statuses"
                            customTrigger={
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                                    <Target
                                        size={14}
                                        className="text-gray-600"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Status Filter
                                    </span>
                                    {filterStatusSelected.length > 0 && (
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                                            {filterStatusSelected.length}
                                        </span>
                                    )}
                                </div>
                            }
                        />
                        {filterStatusSelected.length > 0 && (
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Active Filters:</strong>{' '}
                                    {filterStatusSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                        Custom Trigger Benefits:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                            • Use any React element as a trigger (buttons,
                            icons, cards, etc.)
                        </li>
                        <li>• Maintain full control over styling and layout</li>
                        <li>
                            • Works seamlessly with all MultiSelect features
                        </li>
                        <li>• Supports both desktop and mobile versions</li>
                        <li>• Perfect for integrating with design systems</li>
                    </ul>
                </div>
            </div>

            {/* Position & Alignment */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Position & Alignment</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Top Side</h3>
                        <MultiSelect
                            label="Top"
                            items={simpleItems}
                            selectedValues={topSideSelected}
                            onChange={handleMultiSelectChange(
                                topSideSelected,
                                setTopSideSelected
                            )}
                            placeholder="Opens upward"
                            side={MultiSelectMenuSide.TOP}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {topSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ↑ {topSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Bottom Side</h3>
                        <MultiSelect
                            label="Bottom"
                            items={simpleItems}
                            selectedValues={bottomSideSelected}
                            onChange={handleMultiSelectChange(
                                bottomSideSelected,
                                setBottomSideSelected
                            )}
                            placeholder="Opens downward"
                            side={MultiSelectMenuSide.BOTTOM}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {bottomSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ↓ {bottomSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Left Side</h3>
                        <MultiSelect
                            label="Left"
                            items={simpleItems}
                            selectedValues={leftSideSelected}
                            onChange={handleMultiSelectChange(
                                leftSideSelected,
                                setLeftSideSelected
                            )}
                            placeholder="Opens left"
                            side={MultiSelectMenuSide.LEFT}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {leftSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ← {leftSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Right Side</h3>
                        <MultiSelect
                            label="Right"
                            items={simpleItems}
                            selectedValues={rightSideSelected}
                            onChange={handleMultiSelectChange(
                                rightSideSelected,
                                setRightSideSelected
                            )}
                            placeholder="Opens right"
                            side={MultiSelectMenuSide.RIGHT}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {rightSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                → {rightSideSelected.length} selected
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Start Alignment
                        </h3>
                        <MultiSelect
                            label="Start Aligned"
                            items={simpleItems}
                            selectedValues={startAlignSelected}
                            onChange={handleMultiSelectChange(
                                startAlignSelected,
                                setStartAlignSelected
                            )}
                            placeholder="Aligned to start"
                            alignment={MultiSelectMenuAlignment.START}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {startAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊢ {startAlignSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Center Alignment
                        </h3>
                        <MultiSelect
                            label="Center Aligned"
                            items={simpleItems}
                            selectedValues={centerAlignSelected}
                            onChange={handleMultiSelectChange(
                                centerAlignSelected,
                                setCenterAlignSelected
                            )}
                            placeholder="Aligned to center"
                            alignment={MultiSelectMenuAlignment.CENTER}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {centerAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊣ {centerAlignSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">End Alignment</h3>
                        <MultiSelect
                            label="End Aligned"
                            items={simpleItems}
                            selectedValues={endAlignSelected}
                            onChange={handleMultiSelectChange(
                                endAlignSelected,
                                setEndAlignSelected
                            )}
                            placeholder="Aligned to end"
                            alignment={MultiSelectMenuAlignment.END}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {endAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊣ {endAlignSelected.length} selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Max Selections Feature */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🎯 Max Selections Feature
                </h2>
                <p className="text-gray-600">
                    <strong>
                        NEW: Limit the maximum number of selections!
                    </strong>
                    Use the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        maxSelections
                    </code>{' '}
                    prop to restrict how many items users can select. Items
                    become disabled when the limit is reached.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Max 3 Selections</h3>
                        <MultiSelect
                            label="Choose up to 3 skills"
                            sublabel="Selection limit: 3 items"
                            items={skillItems}
                            selectedValues={maxSelectionsBasicSelected}
                            onChange={handleMultiSelectChange(
                                maxSelectionsBasicSelected,
                                setMaxSelectionsBasicSelected
                            )}
                            placeholder="Select up to 3 skills"
                            maxSelections={3}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {maxSelectionsBasicSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected (
                                        {maxSelectionsBasicSelected.length}/3):
                                    </strong>{' '}
                                    {maxSelectionsBasicSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    {maxSelectionsBasicSelected.length >= 3
                                        ? '🚫 Maximum reached - other items are disabled'
                                        : `✅ ${3 - maxSelectionsBasicSelected.length} more selections allowed`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Max 5 Permissions</h3>
                        <MultiSelect
                            label="Grant up to 5 permissions"
                            sublabel="Security limit: 5 permissions max"
                            items={permissionItems}
                            selectedValues={maxSelectionsAdvancedSelected}
                            onChange={handleMultiSelectChange(
                                maxSelectionsAdvancedSelected,
                                setMaxSelectionsAdvancedSelected
                            )}
                            placeholder="Select up to 5 permissions"
                            maxSelections={5}
                            enableSearch={true}
                            enableSelectAll={false}
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            useDrawerOnMobile={false}
                        />
                        {maxSelectionsAdvancedSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Granted (
                                        {maxSelectionsAdvancedSelected.length}
                                        /5):
                                    </strong>{' '}
                                    {maxSelectionsAdvancedSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {maxSelectionsAdvancedSelected.length > 3 &&
                                        ` +${maxSelectionsAdvancedSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    {maxSelectionsAdvancedSelected.length >= 5
                                        ? '🔒 Security limit reached'
                                        : `🔓 ${5 - maxSelectionsAdvancedSelected.length} more permissions can be granted`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Border Radius Fix Demo
                        </h3>
                        <MultiSelect
                            label="Select multiple items"
                            sublabel="Notice the improved border radius on selected items"
                            items={simpleItems}
                            selectedValues={borderRadiusFixSelected}
                            onChange={handleMultiSelectChange(
                                borderRadiusFixSelected,
                                setBorderRadiusFixSelected
                            )}
                            placeholder="Select multiple to see border fix"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {borderRadiusFixSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Selected (
                                        {borderRadiusFixSelected.length}):
                                    </strong>{' '}
                                    {borderRadiusFixSelected.join(', ')}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    {borderRadiusFixSelected.length > 1
                                        ? '🎨 Border radius applied only to first/last selected items'
                                        : '🎨 Single selection gets full border radius'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                        🎯 Max Selections Features:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Flexible Limits:</strong> Set any
                                number as maximum (e.g., maxSelections={3})
                            </li>
                            <li>
                                • <strong>Smart Disabling:</strong> Unselected
                                items become disabled when limit is reached
                            </li>
                            <li>
                                • <strong>Selected Items Stay Active:</strong>{' '}
                                Already selected items can still be deselected
                            </li>
                            <li>
                                • <strong>Visual Feedback:</strong> Disabled
                                items show appropriate styling
                            </li>
                        </ul>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Works Everywhere:</strong> Desktop
                                dropdown, mobile drawer, and submenus
                            </li>
                            <li>
                                • <strong>Search Compatible:</strong> Limit
                                applies to filtered results too
                            </li>
                            <li>
                                • <strong>Border Radius Fix:</strong> Selected
                                items now have proper border radius
                            </li>
                            <li>
                                • <strong>Accessibility:</strong> Screen readers
                                understand disabled state
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-700">
                            <strong>Border Radius Improvement:</strong> When
                            multiple items are selected, only the first item
                            gets top border radius and the last item gets bottom
                            border radius. Middle items have no border radius
                            for a seamless connected appearance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Always Selected Feature */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔒 Always Selected Feature
                </h2>
                <p className="text-gray-600">
                    <strong>
                        NEW: Force certain items to always be selected and
                        disabled!
                    </strong>
                    Use the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        alwaysSelected: true
                    </code>{' '}
                    property on items to make them permanently selected and
                    non-deselectable. Perfect for mandatory requirements or core
                    permissions.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Core Technologies (Always Selected)
                        </h3>
                        <MultiSelect
                            label="Required Tech Stack"
                            sublabel="Some technologies are mandatory for this project"
                            items={[
                                {
                                    groupLabel: 'Frontend (Required)',
                                    showSeparator: true,
                                    items: [
                                        {
                                            label: 'React',
                                            value: 'react',
                                            slot1: <Code size={16} />,
                                            alwaysSelected: true,
                                        },
                                        {
                                            label: 'Vue.js',
                                            value: 'vue',
                                            slot1: <Code size={16} />,
                                        },
                                        {
                                            label: 'Angular',
                                            value: 'angular',
                                            slot1: <Code size={16} />,
                                        },
                                    ],
                                },
                                {
                                    groupLabel: 'Backend (Required)',
                                    showSeparator: true,
                                    items: [
                                        {
                                            label: 'Node.js',
                                            value: 'nodejs',
                                            slot1: <Server size={16} />,
                                            alwaysSelected: true,
                                        },
                                        {
                                            label: 'Python',
                                            value: 'python',
                                            slot1: <Server size={16} />,
                                        },
                                        {
                                            label: 'Java',
                                            value: 'java',
                                            slot1: <Server size={16} />,
                                        },
                                    ],
                                },
                                {
                                    groupLabel: 'Database (Optional)',
                                    items: [
                                        {
                                            label: 'PostgreSQL',
                                            value: 'postgresql',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'MySQL',
                                            value: 'mysql',
                                            slot1: <Database size={16} />,
                                        },
                                        {
                                            label: 'MongoDB',
                                            value: 'mongodb',
                                            slot1: <Database size={16} />,
                                        },
                                    ],
                                },
                            ]}
                            selectedValues={alwaysSelectedBasicSelected}
                            onChange={handleMultiSelectChange(
                                alwaysSelectedBasicSelected,
                                setAlwaysSelectedBasicSelected
                            )}
                            placeholder="Select additional technologies"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {alwaysSelectedBasicSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Tech Stack (
                                        {alwaysSelectedBasicSelected.length}):
                                    </strong>{' '}
                                    {alwaysSelectedBasicSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    🔒 React and Node.js are always selected
                                    (mandatory)
                                </p>
                                <p className="text-xs text-blue-600">
                                    ✅ You can select additional optional
                                    technologies
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Base Permissions (Always Selected)
                        </h3>
                        <MultiSelect
                            label="User Access Control"
                            sublabel="Basic permissions are mandatory for all users"
                            items={[
                                {
                                    groupLabel: 'Basic Access (Required)',
                                    showSeparator: true,
                                    items: [
                                        {
                                            label: 'View Users',
                                            value: 'users.view',
                                            subLabel: 'Read-only access',
                                            slot1: <Users size={16} />,
                                            alwaysSelected: true,
                                        },
                                        {
                                            label: 'Edit Users',
                                            value: 'users.edit',
                                            subLabel: 'Modify user data',
                                            slot1: <Users size={16} />,
                                        },
                                        {
                                            label: 'Delete Users',
                                            value: 'users.delete',
                                            subLabel: 'Remove users',
                                            slot1: <Users size={16} />,
                                        },
                                    ],
                                },
                                {
                                    groupLabel: 'Content Management (Required)',
                                    showSeparator: true,
                                    items: [
                                        {
                                            label: 'Create Content',
                                            value: 'content.create',
                                            subLabel: 'Add new content',
                                            slot1: <Star size={16} />,
                                            alwaysSelected: true,
                                        },
                                        {
                                            label: 'Edit Content',
                                            value: 'content.edit',
                                            subLabel: 'Modify existing',
                                            slot1: <Star size={16} />,
                                        },
                                        {
                                            label: 'Publish Content',
                                            value: 'content.publish',
                                            subLabel: 'Make content live',
                                            slot1: <Star size={16} />,
                                        },
                                    ],
                                },
                                {
                                    groupLabel: 'System Settings (Optional)',
                                    items: [
                                        {
                                            label: 'View Settings',
                                            value: 'settings.view',
                                            subLabel: 'Read-only access',
                                            slot1: <Settings size={16} />,
                                        },
                                        {
                                            label: 'Edit Settings',
                                            value: 'settings.edit',
                                            subLabel: 'Modify settings',
                                            slot1: <Settings size={16} />,
                                        },
                                        {
                                            label: 'Advanced Settings',
                                            value: 'settings.advanced',
                                            subLabel: 'System config',
                                            slot1: <Shield size={16} />,
                                        },
                                    ],
                                },
                            ]}
                            selectedValues={alwaysSelectedAdvancedSelected}
                            onChange={handleMultiSelectChange(
                                alwaysSelectedAdvancedSelected,
                                setAlwaysSelectedAdvancedSelected
                            )}
                            placeholder="Grant additional permissions"
                            enableSearch={true}
                            enableSelectAll={false}
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            useDrawerOnMobile={false}
                        />
                        {alwaysSelectedAdvancedSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Granted Permissions (
                                        {alwaysSelectedAdvancedSelected.length}
                                        ):
                                    </strong>{' '}
                                    {alwaysSelectedAdvancedSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {alwaysSelectedAdvancedSelected.length >
                                        3 &&
                                        ` +${alwaysSelectedAdvancedSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    🔒 View Users and Create Content are always
                                    granted (mandatory)
                                </p>
                                <p className="text-xs text-green-600">
                                    ✅ Additional permissions can be granted as
                                    needed
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">
                        🔒 Always Selected Features:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-orange-800 space-y-1">
                            <li>
                                • <strong>Mandatory Items:</strong> Set
                                alwaysSelected: true to make items permanently
                                selected
                            </li>
                            <li>
                                • <strong>Visual Indication:</strong> Always
                                selected items appear disabled but selected
                            </li>
                            <li>
                                • <strong>Cannot be Deselected:</strong> Users
                                cannot uncheck these items
                            </li>
                            <li>
                                • <strong>Select All Exclusion:</strong> Always
                                selected items are excluded from "Select All"
                                logic
                            </li>
                        </ul>
                        <ul className="text-sm text-orange-800 space-y-1">
                            <li>
                                • <strong>Works Everywhere:</strong> Desktop
                                dropdown, mobile drawer, and submenus
                            </li>
                            <li>
                                • <strong>Search Compatible:</strong> Always
                                selected items remain visible in search results
                            </li>
                            <li>
                                • <strong>Max Selections Compatible:</strong>{' '}
                                Always selected items don't count toward
                                maxSelections limit
                            </li>
                            <li>
                                • <strong>Perfect for Requirements:</strong>{' '}
                                Ideal for mandatory permissions, core features,
                                etc.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-orange-400">
                        <p className="text-sm text-orange-700">
                            <strong>Use Cases:</strong> Core permissions that
                            all users must have, mandatory project requirements,
                            essential features that cannot be disabled,
                            compliance requirements, or baseline configurations.
                        </p>
                    </div>
                </div>
            </div>

            {/* New Features Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Other New Features</h2>
                <p className="text-gray-600">
                    Additional latest features: controllable header border and
                    improved item dividers.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Header Border Control</h3>
                        <MultiSelect
                            label="With Header Border"
                            sublabel="Mobile drawer shows header border"
                            items={skillItems}
                            selectedValues={headerBorderSelected}
                            onChange={handleMultiSelectChange(
                                headerBorderSelected,
                                setHeaderBorderSelected
                            )}
                            placeholder="Select with header border"
                            showHeaderBorder={true}
                            enableSearch={true}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Apply',
                                onClick: () => {
                                    console.log(
                                        'Applied with header border:',
                                        headerBorderSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Clear',
                                onClick: () => {
                                    setHeaderBorderSelected([])
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {headerBorderSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        With Header Border (
                                        {headerBorderSelected.length}):
                                    </strong>{' '}
                                    {headerBorderSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Mobile drawer shows border below header
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Enhanced Item Dividers
                        </h3>
                        <MultiSelect
                            label="All Item Dividers"
                            sublabel="Dividers between every item"
                            items={permissionItems}
                            selectedValues={itemDividersSelected}
                            onChange={handleMultiSelectChange(
                                itemDividersSelected,
                                setItemDividersSelected
                            )}
                            placeholder="Select with item dividers"
                            showItemDividers={true}
                            enableSearch={true}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {itemDividersSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        With Item Dividers (
                                        {itemDividersSelected.length}):
                                    </strong>{' '}
                                    {itemDividersSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Dividers appear between all items, not just
                                    sections
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Combined Features</h3>
                        <MultiSelect
                            label="All New Features"
                            sublabel="Header border + item dividers + actions"
                            items={skillItems}
                            selectedValues={combinedFeaturesSelected}
                            onChange={handleMultiSelectChange(
                                combinedFeaturesSelected,
                                setCombinedFeaturesSelected
                            )}
                            placeholder="All features combined"
                            showHeaderBorder={true}
                            showItemDividers={true}
                            enableSearch={true}
                            enableSelectAll={true}
                            primaryAction={{
                                text: 'Apply All',
                                onClick: () => {
                                    console.log(
                                        'Applied combined features:',
                                        combinedFeaturesSelected
                                    )
                                },
                            }}
                            secondaryAction={{
                                text: 'Clear All',
                                onClick: () => {
                                    setCombinedFeaturesSelected([])
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={true}
                        />
                        {combinedFeaturesSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Combined Features (
                                        {combinedFeaturesSelected.length}):
                                    </strong>{' '}
                                    {combinedFeaturesSelected.join(', ')}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    All new features working together
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-emerald-900 mb-2">
                        New Features Summary:
                    </h4>
                    <ul className="text-sm text-emerald-800 space-y-1">
                        <li>
                            • <strong>Header Border Control:</strong> Use
                            showHeaderBorder prop to control border in mobile
                            drawer header
                        </li>
                        <li>
                            • <strong>Enhanced Item Dividers:</strong>{' '}
                            showItemDividers now shows dividers between ALL
                            items, not just sections
                        </li>
                        <li>
                            • <strong>Better Mobile UX:</strong> When action
                            buttons are present, X icon is hidden and title is
                            centered
                        </li>
                        <li>
                            • <strong>Improved Search:</strong> Mobile drawer
                            includes proper search functionality with TextInput
                        </li>
                        <li>
                            • <strong>Flexible Styling:</strong> Both features
                            work with all existing props and variants
                        </li>
                    </ul>
                </div>
            </div>

            {/* Truncation & Tooltip Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ✨ Truncation & Tooltip Examples
                </h2>
                <p className="text-gray-600">
                    <strong>
                        NEW: Automatic truncation detection with tooltips!
                    </strong>
                    MultiSelect now automatically detects when text is truncated
                    and shows helpful tooltips. You can also add custom tooltips
                    for enhanced user experience.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Automatic Truncation Tooltips
                        </h3>
                        <MultiSelect
                            label="Long Text Options"
                            sublabel="Hover over truncated items to see full text"
                            items={truncationItems.slice(0, 1)} // First group only
                            selectedValues={truncationBasicSelected}
                            onChange={handleMultiSelectChange(
                                truncationBasicSelected,
                                setTruncationBasicSelected
                            )}
                            placeholder="Select items with long text..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {truncationBasicSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Auto-Tooltip Items (
                                        {truncationBasicSelected.length}):
                                    </strong>{' '}
                                    {truncationBasicSelected
                                        .slice(0, 2)
                                        .join(', ')}
                                    {truncationBasicSelected.length > 2 &&
                                        ` +${truncationBasicSelected.length - 2} more`}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    🔍 Tooltips appear automatically when text
                                    is truncated
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Custom Tooltip Content
                        </h3>
                        <MultiSelect
                            label="Enhanced Options"
                            sublabel="Custom tooltips with rich content"
                            items={truncationItems.slice(1, 2)} // Second group only
                            selectedValues={truncationCustomSelected}
                            onChange={handleMultiSelectChange(
                                truncationCustomSelected,
                                setTruncationCustomSelected
                            )}
                            placeholder="Select enhanced options..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {truncationCustomSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Custom Tooltip Items (
                                        {truncationCustomSelected.length}):
                                    </strong>{' '}
                                    {truncationCustomSelected.join(', ')}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    💡 Rich tooltip content with formatting and
                                    details
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Mixed Content & Options
                        </h3>
                        <MultiSelect
                            label="Advanced Examples"
                            sublabel="Mix of auto, custom, and disabled tooltips"
                            items={truncationItems.slice(2)} // Third group only
                            selectedValues={truncationMixedSelected}
                            onChange={handleMultiSelectChange(
                                truncationMixedSelected,
                                setTruncationMixedSelected
                            )}
                            placeholder="Select mixed content..."
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            useDrawerOnMobile={false}
                        />
                        {truncationMixedSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Mixed Content (
                                        {truncationMixedSelected.length}):
                                    </strong>{' '}
                                    {truncationMixedSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {truncationMixedSelected.length > 3 &&
                                        ` +${truncationMixedSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    ⚙️ Demonstrates various tooltip
                                    configurations
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                        🎉 Truncation & Tooltip Features:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Automatic Detection:</strong> Uses
                                ResizeObserver to detect truncation
                            </li>
                            <li>
                                • <strong>Smart Tooltips:</strong> Only shows
                                tooltips when text is actually cut off
                            </li>
                            <li>
                                • <strong>Custom Content:</strong> Support for
                                rich tooltip content with formatting
                            </li>
                            <li>
                                • <strong>Responsive:</strong> Updates
                                automatically when container size changes
                            </li>
                        </ul>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Both Labels:</strong> Works for main
                                labels and sublabels independently
                            </li>
                            <li>
                                • <strong>Configurable:</strong> Disable
                                truncation detection per item if needed
                            </li>
                            <li>
                                • <strong>Performance:</strong> Efficient
                                detection with proper cleanup
                            </li>
                            <li>
                                • <strong>Accessible:</strong> Maintains proper
                                focus and navigation
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-700">
                            <strong>API Usage:</strong> Add <code>tooltip</code>{' '}
                            property for custom content,
                            <code>tooltipProps</code> for configuration, or{' '}
                            <code>disableTruncation: true</code> to disable
                            auto-tooltips.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Value Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">✨ Custom Value Examples</h2>
                <p className="text-gray-600">
                    <strong>
                        NEW: Allow users to specify custom values that aren't in
                        the predefined options!
                    </strong>
                    Use the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        allowCustomValue
                    </code>{' '}
                    prop to enable typing custom values. When users type text
                    that doesn't match any existing option, a "Specify: [text]"
                    option appears automatically.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Basic Custom Value</h3>
                        <MultiSelect
                            label="Select Technologies"
                            sublabel="You can add technologies not in the list"
                            items={skillItems}
                            selectedValues={customValueBasicSelected}
                            onChange={handleMultiSelectChange(
                                customValueBasicSelected,
                                setCustomValueBasicSelected
                            )}
                            placeholder="Select or type custom technology"
                            allowCustomValue={true}
                            enableSearch={true}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {customValueBasicSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected (
                                        {customValueBasicSelected.length}):
                                    </strong>{' '}
                                    {customValueBasicSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    💡 Try typing a technology not in the list!
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Custom Label Text</h3>
                        <MultiSelect
                            label="Select Permissions"
                            sublabel="Add custom permissions as needed"
                            items={permissionItems}
                            selectedValues={customValueWithLabelSelected}
                            onChange={handleMultiSelectChange(
                                customValueWithLabelSelected,
                                setCustomValueWithLabelSelected
                            )}
                            placeholder="Select or add custom permission"
                            allowCustomValue={true}
                            customValueLabel="Add custom"
                            enableSearch={true}
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            useDrawerOnMobile={false}
                        />
                        {customValueWithLabelSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Custom Label Example (
                                        {customValueWithLabelSelected.length}):
                                    </strong>{' '}
                                    {customValueWithLabelSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {customValueWithLabelSelected.length > 3 &&
                                        ` +${customValueWithLabelSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    ✏️ Custom label shows "Add custom: [text]"
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Form Use Case</h3>
                        <MultiSelect
                            label="Select Skills"
                            sublabel="Add any skills you have"
                            items={skillItems}
                            selectedValues={customValueFormSelected}
                            onChange={handleMultiSelectChange(
                                customValueFormSelected,
                                setCustomValueFormSelected
                            )}
                            placeholder="Select or type custom skills"
                            allowCustomValue={true}
                            enableSearch={true}
                            enableSelectAll={true}
                            required={true}
                            slot={<Code size={16} />}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                        />
                        {customValueFormSelected.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <strong>
                                        Form Skills (
                                        {customValueFormSelected.length}
                                        ):
                                    </strong>{' '}
                                    {customValueFormSelected
                                        .slice(0, 4)
                                        .join(', ')}
                                    {customValueFormSelected.length > 4 &&
                                        ` +${customValueFormSelected.length - 4} more`}
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                    ⭐ Perfect for forms with required fields
                                </p>
                            </div>
                        )}
                        {customValueFormSelected.length === 0 && (
                            <p className="text-xs text-red-600">
                                ⚠ At least one skill required
                            </p>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">
                        🎉 Custom Value Features:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>
                                • <strong>Flexible Input:</strong> Users can
                                type values not in the predefined list
                            </li>
                            <li>
                                • <strong>Smart Detection:</strong> Only shows
                                custom option when typed text doesn't match
                                existing items
                            </li>
                            <li>
                                • <strong>Custom Label:</strong> Customize the
                                prefix with customValueLabel prop
                            </li>
                            <li>
                                • <strong>Search Integration:</strong> Works
                                seamlessly with search functionality
                            </li>
                        </ul>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>
                                • <strong>Mobile Support:</strong> Works in both
                                desktop dropdown and mobile drawer
                            </li>
                            <li>
                                • <strong>Callback Compatible:</strong> Custom
                                values are passed to onChange callback
                            </li>
                            <li>
                                • <strong>Display Handling:</strong> Custom
                                values display correctly on trigger and in tags
                            </li>
                            <li>
                                • <strong>Form Friendly:</strong> Perfect for
                                forms requiring flexible user input
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-green-400">
                        <p className="text-sm text-green-700">
                            <strong>Usage:</strong> Set{' '}
                            <code>allowCustomValue=true</code> to enable. The
                            custom value appears as "Specify: [text]" by
                            default, or customize with{' '}
                            <code>customValueLabel="Your label"</code>. Custom
                            values are returned in the onChange callback and
                            display correctly in all selection modes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Use Cases</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Form Integration
                        </h3>
                        <div className="space-y-4 p-6 border rounded-lg">
                            <TextInput
                                label="Full Name"
                                placeholder="Enter your name"
                                value={formNameValue}
                                onChange={(e) =>
                                    setFormNameValue(e.target.value)
                                }
                            />

                            <MultiSelect
                                label="Technical Skills"
                                sublabel="Required"
                                items={skillItems}
                                selectedValues={formSkillsSelected}
                                onChange={handleMultiSelectChange(
                                    formSkillsSelected,
                                    setFormSkillsSelected
                                )}
                                placeholder="Select your skills"
                                required
                                hintText="Select at least 3 skills"
                                selectionTagType={
                                    MultiSelectSelectionTagType.COUNT
                                }
                            />

                            <MultiSelect
                                label="Areas of Interest"
                                items={interestItems}
                                selectedValues={formInterestsSelected}
                                onChange={handleMultiSelectChange(
                                    formInterestsSelected,
                                    setFormInterestsSelected
                                )}
                                placeholder="Select your interests"
                                helpIconHintText="This helps us recommend relevant content"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="User Permissions"
                                items={permissionItems}
                                selectedValues={formPermissionsSelected}
                                onChange={handleMultiSelectChange(
                                    formPermissionsSelected,
                                    setFormPermissionsSelected
                                )}
                                placeholder="Assign permissions"
                                hintText="Grant appropriate access levels"
                                selectionTagType={
                                    MultiSelectSelectionTagType.COUNT
                                }
                            />

                            {/* Form Summary */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">
                                    Form Summary:
                                </h4>
                                <div className="space-y-1 text-xs">
                                    <p>
                                        <strong>Name:</strong>{' '}
                                        {formNameValue || 'Not entered'}
                                    </p>
                                    <p>
                                        <strong>Skills:</strong>{' '}
                                        {formSkillsSelected.length} selected
                                    </p>
                                    <p>
                                        <strong>Interests:</strong>{' '}
                                        {formInterestsSelected.length} selected
                                    </p>
                                    <p>
                                        <strong>Permissions:</strong>{' '}
                                        {formPermissionsSelected.length} granted
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p
                                        className={`text-xs ${
                                            formNameValue &&
                                            formSkillsSelected.length >= 3 &&
                                            formInterestsSelected.length > 0
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        Form Status:{' '}
                                        {formNameValue &&
                                        formSkillsSelected.length >= 3 &&
                                        formInterestsSelected.length > 0
                                            ? '✓ Complete'
                                            : '⚠ Incomplete'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Data Filtering & Management
                        </h3>
                        <div className="space-y-4 p-6 border rounded-lg">
                            <div className="space-y-4">
                                <MultiSelect
                                    label="Filter by Status"
                                    variant={MultiSelectVariant.NO_CONTAINER}
                                    items={statusItems}
                                    selectedValues={filterStatusSelected}
                                    onChange={handleMultiSelectChange(
                                        filterStatusSelected,
                                        setFilterStatusSelected
                                    )}
                                    placeholder="All statuses"
                                    selectionTagType={
                                        MultiSelectSelectionTagType.COUNT
                                    }
                                    size={MultiSelectMenuSize.SMALL}
                                />

                                <MultiSelect
                                    label="Visible Columns"
                                    variant={MultiSelectVariant.NO_CONTAINER}
                                    items={columnItems}
                                    selectedValues={filterColumnsSelected}
                                    onChange={handleMultiSelectChange(
                                        filterColumnsSelected,
                                        setFilterColumnsSelected
                                    )}
                                    placeholder="Select columns"
                                    selectionTagType={
                                        MultiSelectSelectionTagType.COUNT
                                    }
                                    size={MultiSelectMenuSize.SMALL}
                                />
                            </div>

                            {/* Filter Summary */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">
                                    Active Filters:
                                </h4>
                                <div className="space-y-1 text-xs">
                                    <p>
                                        <strong>Status Filters:</strong>{' '}
                                        {filterStatusSelected.length > 0
                                            ? filterStatusSelected.join(', ')
                                            : 'All'}
                                    </p>
                                    <p>
                                        <strong>Visible Columns:</strong>{' '}
                                        {filterColumnsSelected.length > 0
                                            ? filterColumnsSelected.join(', ')
                                            : 'None'}
                                    </p>
                                </div>
                                {(filterStatusSelected.length > 0 ||
                                    filterColumnsSelected.length > 0) && (
                                    <button
                                        onClick={() => {
                                            setFilterStatusSelected([])
                                            setFilterColumnsSelected([])
                                            addSnackbar({
                                                header: 'Filters cleared',
                                            })
                                        }}
                                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>

                            {/* Mock Data Table */}
                            <div className="mt-4 p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">
                                    User Data Table
                                </h4>
                                <div className="text-xs text-gray-600">
                                    <p>Showing filtered results:</p>
                                    <p>
                                        • Status:{' '}
                                        {filterStatusSelected.length > 0
                                            ? `${filterStatusSelected.length} filters`
                                            : 'All users'}
                                    </p>
                                    <p>
                                        • Columns:{' '}
                                        {filterColumnsSelected.length > 0
                                            ? `${filterColumnsSelected.length} visible`
                                            : 'Default view'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clear Button Control Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🎯 Clear Button Control Examples
                </h2>
                <p className="text-gray-600">
                    <strong>
                        NEW: Control the X icon (clear button) visibility and
                        behavior!
                    </strong>
                    Use the{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        showClearButton
                    </code>{' '}
                    prop to show/hide the clear button, and{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        onClearAllClick
                    </code>{' '}
                    for a separate callback when the X icon is clicked. Perfect
                    for analytics filters where API calls should only happen on
                    explicit actions.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Hidden Clear Button (showClearButton=false)
                        </h3>
                        <p className="text-sm text-gray-600">
                            Clear button is hidden. Users can only clear via
                            action buttons or by deselecting items.
                        </p>
                        <MultiSelect
                            label="Analytics Filters"
                            sublabel="Clear button hidden - use Apply/Reset buttons"
                            items={skillItems}
                            selectedValues={clearButtonDemoSelected}
                            onChange={handleMultiSelectChange(
                                clearButtonDemoSelected,
                                setClearButtonDemoSelected
                            )}
                            placeholder="Select filters"
                            enableSearch={true}
                            showClearButton={false}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Apply Filters',
                                onClick: () => {
                                    console.log(
                                        'API Call: Applied filters:',
                                        clearButtonDemoSelected
                                    )
                                    addSnackbar({
                                        header: 'Filters Applied',
                                        description: `Applied ${clearButtonDemoSelected.length} filters`,
                                    })
                                },
                            }}
                            secondaryAction={{
                                text: 'Reset',
                                onClick: () => {
                                    setClearButtonDemoSelected([])
                                    console.log('API Call: Reset filters')
                                    addSnackbar({
                                        header: 'Filters Reset',
                                    })
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {clearButtonDemoSelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected Filters (
                                        {clearButtonDemoSelected.length}):
                                    </strong>{' '}
                                    {clearButtonDemoSelected.join(', ')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    ✅ No X icon visible • ✅ Use Apply/Reset
                                    buttons for API calls
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Clear Button with Separate Callback
                        </h3>
                        <p className="text-sm text-gray-600">
                            Clear button visible with separate onClearAllClick
                            callback. Perfect for tracking when users clear
                            filters.
                        </p>
                        <MultiSelect
                            label="Filter Analytics"
                            sublabel="X icon triggers separate callback"
                            items={permissionItems}
                            selectedValues={clearButtonWithCallbackSelected}
                            onChange={handleMultiSelectChange(
                                clearButtonWithCallbackSelected,
                                setClearButtonWithCallbackSelected
                            )}
                            placeholder="Select filters"
                            enableSearch={true}
                            showClearButton={true}
                            onClearAllClick={() => {
                                console.log(
                                    'API Call: Clear button clicked - clearing filters'
                                )
                                setClearButtonWithCallbackSelected([])
                                addSnackbar({
                                    header: 'Filters Cleared',
                                    description:
                                        'Clear button callback triggered',
                                })
                            }}
                            showActionButtons={true}
                            primaryAction={{
                                text: 'Apply',
                                onClick: () => {
                                    console.log(
                                        'API Call: Apply button clicked:',
                                        clearButtonWithCallbackSelected
                                    )
                                    addSnackbar({
                                        header: 'Filters Applied',
                                        description: `Applied ${clearButtonWithCallbackSelected.length} filters`,
                                    })
                                },
                            }}
                            secondaryAction={{
                                text: 'Reset',
                                onClick: () => {
                                    console.log(
                                        'API Call: Reset button clicked'
                                    )
                                    setClearButtonWithCallbackSelected([])
                                    addSnackbar({
                                        header: 'Filters Reset',
                                    })
                                },
                            }}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {clearButtonWithCallbackSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Selected Filters (
                                        {clearButtonWithCallbackSelected.length}
                                        ):
                                    </strong>{' '}
                                    {clearButtonWithCallbackSelected
                                        .slice(0, 3)
                                        .join(', ')}
                                    {clearButtonWithCallbackSelected.length >
                                        3 &&
                                        ` +${clearButtonWithCallbackSelected.length - 3} more`}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    ✅ X icon visible • ✅ Separate callback for
                                    X icon • ✅ Different callback for Apply
                                    button
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                        🎯 Clear Button Control Features:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Show/Hide Control:</strong> Use
                                showClearButton prop to control visibility
                            </li>
                            <li>
                                • <strong>Default Behavior:</strong> Clear
                                button shows by default when variant=CONTAINER
                                and items are selected
                            </li>
                            <li>
                                • <strong>Separate Callback:</strong>{' '}
                                onClearAllClick provides dedicated callback for
                                X icon clicks
                            </li>
                            <li>
                                • <strong>Fallback:</strong> If onClearAllClick
                                not provided, falls back to onChange('')
                            </li>
                        </ul>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • <strong>Analytics Use Case:</strong> Perfect
                                for filters where API calls should only happen
                                on explicit actions
                            </li>
                            <li>
                                • <strong>Action Buttons:</strong> Works
                                seamlessly with Apply/Reset action buttons
                            </li>
                            <li>
                                • <strong>State Management:</strong> onChange
                                still updates local state, onClearAllClick
                                handles API calls
                            </li>
                            <li>
                                • <strong>Accessibility:</strong> Maintains
                                proper aria-labels and keyboard navigation
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-700">
                            <strong>Usage Example:</strong> For analytics
                            filters, set <code>showClearButton={false}</code> to
                            hide the X icon, and use <code>primaryAction</code>{' '}
                            and <code>secondaryAction</code> for Apply/Reset
                            buttons that trigger API calls. Alternatively, use{' '}
                            <code>onClearAllClick</code> to handle X icon clicks
                            separately from onChange.
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Gateway Demo - Large Dataset Test */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    💳 Payment Gateway Selection (Large Dataset Test)
                </h2>
                <p className="text-gray-600">
                    This demo showcases MultiSelect with a large dataset of 50+
                    payment gateways. Perfect for testing search functionality,
                    ResizeObserver performance, and handling rapid filtering
                    without errors. Try typing in the search box to filter
                    gateways!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            Payment Gateway Selection
                        </h3>
                        <p className="text-sm text-gray-600">
                            Select from 50+ payment gateways. This large dataset
                            tests the ResizeObserver fix with rapid search and
                            filtering.
                        </p>
                        <MultiSelect
                            label="Select Payment Gateways"
                            sublabel="Choose payment gateways for your integration"
                            items={gatewayItems}
                            selectedValues={gatewaySelected}
                            onChange={handleMultiSelectChange(
                                gatewaySelected,
                                setGatewaySelected
                            )}
                            placeholder="Search and select payment gateways..."
                            enableSearch={true}
                            enableSelectAll={true}
                            searchPlaceholder="Type to search gateways..."
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            useDrawerOnMobile={false}
                            slot={<CreditCard size={16} />}
                        />
                        {gatewaySelected.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>
                                        Selected Gateways (
                                        {gatewaySelected.length}):
                                    </strong>{' '}
                                    {gatewaySelected.slice(0, 5).join(', ')}
                                    {gatewaySelected.length > 5 &&
                                        ` +${gatewaySelected.length - 5} more`}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    ✅ Large dataset handled smoothly • ✅
                                    Search works perfectly • ✅ No
                                    ResizeObserver errors
                                </p>
                            </div>
                        )}
                    </div>

                    {/* <div className="space-y-2">
                        <h3 className="font-semibold">
                            Gateway Selection with Actions
                        </h3>
                        <p className="text-sm text-gray-600">
                            Same large dataset with action buttons for
                            confirmation workflow.
                        </p>
                        <MultiSelect
                            label="Configure Payment Gateways"
                            sublabel="Select and apply gateway configuration"
                            items={gatewayItems}
                            selectedValues={gatewaySelected}
                            onChange={handleMultiSelectChange(
                                gatewaySelected,
                                setGatewaySelected
                            )}
                            placeholder="Search and configure gateways..."
                            enableSearch={true}
                            enableSelectAll={true}
                            searchPlaceholder="Type to search..."
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            useDrawerOnMobile={false}
                            slot={<CreditCard size={16} />}
                            primaryAction={{
                                text: 'Apply Configuration',
                                onClick: () => {
                                    console.log(
                                        'Applied gateways:',
                                        gatewaySelected
                                    )
                                    addSnackbar({
                                        header: 'Configuration Applied',
                                        description: `${gatewaySelected.length} payment gateways configured successfully`,
                                    })
                                },
                            }}
                            secondaryAction={{
                                text: 'Clear All',
                                onClick: () => {
                                    setGatewaySelected([])
                                },
                            }}
                        />
                        <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-green-700">
                                <strong>Test Instructions:</strong>
                            </p>
                            <ul className="text-xs text-green-600 mt-1 space-y-1">
                                <li>
                                    • Type rapidly in the search box to test
                                    ResizeObserver fix
                                </li>
                                <li>
                                    • Try backspacing quickly to remove search
                                    text
                                </li>
                                <li>
                                    • Select multiple gateways to test with
                                    large selections
                                </li>
                                <li>
                                    • Verify no console errors appear during
                                    search
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MultiSelectDemo
