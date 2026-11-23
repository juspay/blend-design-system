/**
 * Phosphor Icons — Code Connect (component sets).
 *
 * Each Figma component set has variants: Format (Stroke|Outline) and
 * Weight (Bold|Duotone|Fill|Light|Regular|Thin).  Weight maps to the
 * React `weight` prop; Format is a Figma rendering detail with no
 * React equivalent and is left unmapped.
 *
 * @see https://phosphoricons.com
 */

import React from 'react'
import { figma } from '@figma/code-connect'
import {
    MouseScrollIcon,
    MouseSimpleIcon,
    NetworkIcon,
    NetworkSlashIcon,
    NetworkXIcon,
    NotificationIcon,
    NutIcon,
    OptionIcon,
    PlugIcon,
    PlugChargingIcon,
    PlugsIcon,
    PlugsConnectedIcon,
    PowerIcon,
    QrCodeIcon,
    RadioButtonIcon,
    ScanIcon,
    ScanSmileyIcon,
    SignInIcon,
    SignOutIcon,
    SimCardIcon,
    SpeedometerIcon,
    SpinnerIcon,
    SpinnerBallIcon,
    SpinnerGapIcon,
    SwapIcon,
    TabsIcon,
    ToggleLeftIcon,
    ToggleRightIcon,
    TreeViewIcon,
    UploadIcon,
    UploadSimpleIcon,
    UsbIcon,
    VibrateIcon,
    WifiHighIcon,
    WifiLowIcon,
    WifiMediumIcon,
    WifiNoneIcon,
    WifiSlashIcon,
    WifiXIcon,
    ApproximateEqualsIcon,
    BankIcon,
    CalculatorIcon,
    ChartBarIcon,
    ChartBarHorizontalIcon,
    ChartDonutIcon,
    ChartLineIcon,
    ChartLineDownIcon,
    ChartLineUpIcon,
    ChartPieIcon,
    ChartPieSliceIcon,
    ChartPolarIcon,
    ChartScatterIcon,
    DivideIcon,
    EmptyIcon,
    EqualsIcon,
    FunctionIcon,
    GraphIcon,
    GreaterThanIcon,
    GreaterThanOrEqualIcon,
    InfinityIcon,
    IntersectionIcon,
    LessThanIcon,
    LessThanOrEqualIcon,
    MathOperationsIcon,
    MemberOfIcon,
    MinusIcon,
    MinusCircleIcon,
    MinusSquareIcon,
    NotEqualsIcon,
    NotMemberOfIcon,
    NotSubsetOfIcon,
    NotSupersetOfIcon,
    NumberCircleEightIcon,
    NumberCircleFiveIcon,
    NumberCircleFourIcon,
    NumberCircleNineIcon,
    NumberCircleOneIcon,
    NumberCircleSevenIcon,
    NumberCircleSixIcon,
    NumberCircleThreeIcon,
    NumberCircleTwoIcon,
    NumberCircleZeroIcon,
    NumberEightIcon,
    NumberFiveIcon,
    NumberFourIcon,
    NumberNineIcon,
    NumberOneIcon,
    NumberSevenIcon,
    NumberSixIcon,
    NumberSquareEightIcon,
    NumberSquareFiveIcon,
    NumberSquareFourIcon,
    NumberSquareNineIcon,
    NumberSquareOneIcon,
    NumberSquareSevenIcon,
    NumberSquareSixIcon,
    NumberSquareThreeIcon,
    NumberSquareTwoIcon,
    NumberSquareZeroIcon,
    NumberThreeIcon,
    NumberTwoIcon,
    NumberZeroIcon,
    PercentIcon,
    PiIcon,
    PlusIcon,
    PlusCircleIcon,
    PlusMinusIcon,
    PlusSquareIcon,
    RadicalIcon,
    SigmaIcon,
    SubsetOfIcon,
    SubsetProperOfIcon,
    SupersetOfIcon,
    SupersetProperOfIcon,
    TableIcon,
    TildeIcon,
    TrendDownIcon,
    TrendUpIcon,
    UnionIcon,
    XIcon,
    XCircleIcon,
    XSquareIcon,
    ArchiveIcon,
    BoxArrowDownIcon,
    BoxArrowUpIcon,
    BriefcaseIcon,
    BriefcaseMetalIcon,
    CardsIcon,
    CardsThreeIcon,
    ClipboardIcon,
    ClipboardTextIcon,
    CopyIcon,
    CopySimpleIcon,
    CursorTextIcon,
    FileIcon,
    FileArchiveIcon,
    FileArrowDownIcon,
    FileArrowUpIcon,
    FileAudioIcon,
    FileCIcon,
    FileCSharpIcon,
    FileCloudIcon,
    FileCodeIcon,
    FileCppIcon,
    FileCssIcon,
    FileCsvIcon,
    FileDashedIcon,
    FileDocIcon,
    FileHtmlIcon,
    FileImageIcon,
    FileIniIcon,
    FileJpgIcon,
    FileJsIcon,
    FileJsxIcon,
    FileLockIcon,
    FileMagnifyingGlassIcon,
    FileMdIcon,
    FileMinusIcon,
    FilePdfIcon,
    FilePlusIcon,
    FilePngIcon,
    FilePptIcon,
    FilePyIcon,
    FileRsIcon,
    FileSqlIcon,
    FileSvgIcon,
    FileTextIcon,
    FileTsIcon,
    FileTsxIcon,
    FileTxtIcon,
    FileVideoIcon,
    FileVueIcon,
    FileXIcon,
    FileXlsIcon,
    FileZipIcon,
    FilesIcon,
    FloppyDiskIcon,
    FloppyDiskBackIcon,
    FolderIcon,
    FolderDashedIcon,
    FolderLockIcon,
    FolderMinusIcon,
    FolderOpenIcon,
    FolderPlusIcon,
    FolderSimpleIcon,
    FolderSimpleDashedIcon,
    FolderSimpleLockIcon,
    FolderSimpleMinusIcon,
    FolderSimplePlusIcon,
    FolderSimpleStarIcon,
    FolderSimpleUserIcon,
    FolderStarIcon,
    FolderUserIcon,
    FoldersIcon,
    FunnelIcon,
    FunnelSimpleIcon,
    FunnelSimpleXIcon,
    FunnelXIcon,
    KanbanIcon,
    ListIcon,
} from '@phosphor-icons/react'

figma.connect(
    MouseScrollIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47944',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MouseScrollIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MouseScrollIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MouseSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47994',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MouseSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MouseSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NetworkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48071',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NetworkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NetworkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NetworkSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48147',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NetworkSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NetworkSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NetworkXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48228',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NetworkXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NetworkXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotificationIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48278',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotificationIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotificationIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48328',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OptionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48378',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OptionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OptionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlugIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48443',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlugIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlugIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlugChargingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48513',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlugChargingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlugChargingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlugsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48604',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlugsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlugsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlugsConnectedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48685',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlugsConnectedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { PlugsConnectedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48735',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    QrCodeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48816',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <QrCodeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { QrCodeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RadioButtonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48866',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RadioButtonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RadioButtonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-48931',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScanSmileyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49010',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScanSmileyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScanSmileyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SignInIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49065',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SignInIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SignInIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SignOutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49120',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SignOutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SignOutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SimCardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49179',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SimCardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SimCardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeedometerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeedometerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeedometerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpinnerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49314',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpinnerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpinnerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpinnerBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49377',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpinnerBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpinnerBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpinnerGapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49452',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpinnerGapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpinnerGapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SwapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49512',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SwapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SwapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TabsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49572',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TabsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TabsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToggleLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49622',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ToggleLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToggleLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToggleRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49672',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ToggleRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToggleRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreeViewIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49739',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreeViewIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreeViewIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UploadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49799',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UploadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UploadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UploadSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49854',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UploadSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UploadSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UsbIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49921',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UsbIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UsbIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VibrateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-49988',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VibrateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VibrateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50045',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiHighIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiHighIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50095',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiLowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiLowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50149',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiMediumIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiMediumIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiNoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50192',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiNoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiNoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50263',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WifiXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50330',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WifiXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WifiXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ApproximateEqualsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50381',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ApproximateEqualsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ApproximateEqualsIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BankIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50456',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BankIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BankIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalculatorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50534',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalculatorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalculatorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartBarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50594',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartBarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartBarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartBarHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50654',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartBarHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChartBarHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChartDonutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50709',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartDonutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartDonutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50759',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartLineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartLineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartLineDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50814',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartLineDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartLineDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartLineUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50869',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartLineUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartLineUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartPieIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50924',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartPieIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartPieIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartPieSliceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-50974',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartPieSliceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartPieSliceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartPolarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51034',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartPolarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartPolarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChartScatterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51109',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChartScatterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChartScatterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DivideIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51164',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DivideIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DivideIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EmptyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51214',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EmptyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EmptyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EqualsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51264',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EqualsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EqualsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FunctionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51314',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FunctionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FunctionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GraphIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51399',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GraphIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GraphIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GreaterThanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51444',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GreaterThanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GreaterThanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GreaterThanOrEqualIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51494',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GreaterThanOrEqualIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GreaterThanOrEqualIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    InfinityIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51539',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <InfinityIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { InfinityIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    IntersectionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51584',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IntersectionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { IntersectionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LessThanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51629',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LessThanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LessThanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LessThanOrEqualIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51679',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LessThanOrEqualIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LessThanOrEqualIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MathOperationsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51754',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MathOperationsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { MathOperationsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MemberOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51804',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MemberOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MemberOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51849',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MinusCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51899',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MinusCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MinusCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MinusSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-51949',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MinusSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MinusSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotEqualsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52004',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotEqualsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotEqualsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotMemberOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52059',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotMemberOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotMemberOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotSubsetOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52109',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotSubsetOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotSubsetOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotSupersetOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52164',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotSupersetOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotSupersetOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberCircleEightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52219',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleEightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleEightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleFiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52269',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleFiveIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleFiveIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52319',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleFourIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleFourIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleNineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52374',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleNineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleNineIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleOneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52424',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleOneIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleOneIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleSevenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52474',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleSevenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleSevenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52529',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleSixIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleSixIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52579',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleThreeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleThreeIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52629',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleTwoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleTwoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberCircleZeroIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52679',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberCircleZeroIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberCircleZeroIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberEightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52729',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberEightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberEightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberFiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52774',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberFiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberFiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52819',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberNineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52869',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberNineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberNineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberOneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52914',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberOneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberOneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberSevenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-52959',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSevenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberSevenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53009',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberSixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberSquareEightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53064',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareEightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareEightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareFiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53114',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareFiveIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareFiveIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53164',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareFourIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareFourIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareNineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53219',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareNineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareNineIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareOneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53269',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareOneIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareOneIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareSevenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53319',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareSevenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareSevenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53374',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareSixIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareSixIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53424',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareThreeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareThreeIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53474',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareTwoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareTwoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberSquareZeroIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53524',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberSquareZeroIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NumberSquareZeroIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumberThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53569',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53614',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberTwoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberTwoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NumberZeroIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53659',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumberZeroIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumberZeroIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PercentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53715',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PercentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PercentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53770',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PiIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PiIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53820',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlusCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53875',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlusCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlusCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlusMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53935',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlusMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlusMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlusSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-53990',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlusSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlusSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RadicalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54035',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RadicalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RadicalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SigmaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54080',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SigmaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SigmaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubsetOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54130',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubsetOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SubsetOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubsetProperOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54175',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubsetProperOfIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SubsetProperOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SupersetOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54225',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SupersetOfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SupersetOfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SupersetProperOfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54270',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SupersetProperOfIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SupersetProperOfIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TableIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54330',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TableIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TableIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TildeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54375',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TildeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TildeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrendDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54425',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrendDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrendDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrendUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54475',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrendUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrendUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UnionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54520',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UnionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UnionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    XIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54570',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <XIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { XIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    XCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54625',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <XCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { XCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    XSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54680',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <XSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { XSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArchiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54736',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArchiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArchiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoxArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54796',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoxArrowDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoxArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoxArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54856',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoxArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoxArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BriefcaseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54916',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BriefcaseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BriefcaseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BriefcaseMetalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-54977',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BriefcaseMetalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BriefcaseMetalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CardsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55028',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CardsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CardsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CardsThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55083',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CardsThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CardsThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClipboardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55133',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClipboardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ClipboardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClipboardTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55193',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClipboardTextIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ClipboardTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CopyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55243',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CopyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CopyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CopySimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55293',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CopySimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CopySimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CursorTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55353',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CursorTextIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CursorTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55403',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileArchiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55472',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileArchiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileArchiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55532',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileArrowDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55592',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileAudioIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55653',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileAudioIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileAudioIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55708',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCSharpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55783',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCSharpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCSharpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCloudIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55839',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCloudIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCloudIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCodeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55899',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCodeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCodeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCppIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-55974',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCppIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCppIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCssIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56039',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCssIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCssIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileCsvIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56104',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileCsvIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileCsvIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56179',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileDashedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileDashedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileDocIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56244',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileDocIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileDocIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileHtmlIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56329',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileHtmlIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileHtmlIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileImageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56385',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileImageIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileImageIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileIniIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56450',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileIniIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileIniIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileJpgIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56515',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileJpgIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileJpgIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileJsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56575',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileJsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileJsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileJsxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56645',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileJsxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileJsxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileLockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56706',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileLockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileLockIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileMagnifyingGlassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56766',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileMagnifyingGlassIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FileMagnifyingGlassIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FileMdIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56826',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileMdIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileMdIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56881',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilePdfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-56951',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilePdfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilePdfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilePlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilePlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilePlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilePngIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57076',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilePngIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilePngIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilePptIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57146',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilePptIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilePptIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilePyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57211',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilePyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilePyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileRsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57276',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileRsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileRsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileSqlIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57346',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileSqlIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileSqlIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileSvgIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57411',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileSvgIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileSvgIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57471',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileTextIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileTsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57536',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileTsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileTsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileTsxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57611',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileTsxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileTsxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileTxtIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57691',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileTxtIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileTxtIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileVideoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57756',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileVideoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileVideoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileVueIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57826',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileVueIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileVueIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57886',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileXlsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57956',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileXlsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileXlsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FileZipIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58021',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FileZipIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FileZipIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58081',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FloppyDiskIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58136',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FloppyDiskIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FloppyDiskIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FloppyDiskBackIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58191',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FloppyDiskBackIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { FloppyDiskBackIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58241',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58311',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderDashedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderDashedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderLockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58372',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderLockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderLockIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58427',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58477',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58537',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58582',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderSimpleDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58652',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleDashedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimpleDashedIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderSimpleLockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58707',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleLockIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimpleLockIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderSimpleMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58757',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleMinusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimpleMinusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderSimplePlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58812',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimplePlusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimplePlusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderSimpleStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58862',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleStarIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimpleStarIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderSimpleUserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58917',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderSimpleUserIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FolderSimpleUserIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FolderStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-58972',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderStarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderStarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FolderUserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59032',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FolderUserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FolderUserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FoldersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59083',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FoldersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FoldersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FunnelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59128',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FunnelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FunnelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FunnelSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FunnelSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FunnelSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FunnelSimpleXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59248',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FunnelSimpleXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FunnelSimpleXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FunnelXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59303',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FunnelXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FunnelXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KanbanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59369',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <KanbanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KanbanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59424',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListIcon } from '@phosphor-icons/react'"],
    }
)
