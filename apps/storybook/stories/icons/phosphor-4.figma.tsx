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
    GitlabLogoIcon,
    GitlabLogoSimpleIcon,
    GoodreadsLogoIcon,
    GoogleChromeLogoIcon,
    GoogleDriveLogoIcon,
    GoogleLogoIcon,
    GooglePhotosLogoIcon,
    GooglePlayLogoIcon,
    GooglePodcastsLogoIcon,
    InstagramLogoIcon,
    LastfmLogoIcon,
    LinkedinLogoIcon,
    LinktreeLogoIcon,
    LinuxLogoIcon,
    MastodonLogoIcon,
    MediumLogoIcon,
    MessengerLogoIcon,
    MetaLogoIcon,
    MicrosoftExcelLogoIcon,
    MicrosoftOutlookLogoIcon,
    MicrosoftPowerpointLogoIcon,
    MicrosoftTeamsLogoIcon,
    MicrosoftWordLogoIcon,
    NotionLogoIcon,
    NyTimesLogoIcon,
    OpenAiLogoIcon,
    PatreonLogoIcon,
    PaypalLogoIcon,
    PhosphorLogoIcon,
    PinterestLogoIcon,
    ReadCvLogoIcon,
    RedditLogoIcon,
    ReplitLogoIcon,
    SketchLogoIcon,
    SkypeLogoIcon,
    SlackLogoIcon,
    SnapchatLogoIcon,
    SoundcloudLogoIcon,
    SpotifyLogoIcon,
    SquareLogoIcon,
    StackOverflowLogoIcon,
    SteamLogoIcon,
    StripeLogoIcon,
    TelegramLogoIcon,
    ThreadsLogoIcon,
    TidalLogoIcon,
    TiktokLogoIcon,
    TumblrLogoIcon,
    TwitchLogoIcon,
    TwitterLogoIcon,
    WechatLogoIcon,
    WhatsappLogoIcon,
    WindowsLogoIcon,
    XLogoIcon,
    YoutubeLogoIcon,
    AmbulanceIcon,
    AsclepiusIcon,
    BandaidsIcon,
    BarbellIcon,
    BedIcon,
    BrainIcon,
    DnaIcon,
    FaceMaskIcon,
    FireTruckIcon,
    FirstAidIcon,
    FirstAidKitIcon,
    FlaskIcon,
    HandHeartIcon,
    HandSoapIcon,
    HeartbeatIcon,
    LifebuoyIcon,
    MicroscopeIcon,
    PillIcon,
    PrescriptionIcon,
    PulseIcon,
    StethoscopeIcon,
    SyringeIcon,
    TestTubeIcon,
    ToiletIcon,
    ToiletPaperIcon,
    ToothIcon,
    VirusIcon,
    AppWindowIcon,
    BackspaceIcon,
    BatteryChargingIcon,
    BatteryChargingVerticalIcon,
    BatteryEmptyIcon,
    BatteryFullIcon,
    BatteryHighIcon,
    BatteryLowIcon,
    BatteryMediumIcon,
    BatteryPlusIcon,
    BatteryPlusVerticalIcon,
    BatteryVerticalEmptyIcon,
    BatteryVerticalFullIcon,
    BatteryVerticalHighIcon,
    BatteryVerticalLowIcon,
    BatteryVerticalMediumIcon,
    BatteryWarningIcon,
    BatteryWarningVerticalIcon,
    BellIcon,
    BellRingingIcon,
    BellSimpleIcon,
    BellSimpleRingingIcon,
    BellSimpleSlashIcon,
    BellSimpleZIcon,
    BellSlashIcon,
    BellZIcon,
    BluetoothIcon,
    BluetoothConnectedIcon,
    BluetoothSlashIcon,
    BluetoothXIcon,
    BrowserIcon,
    BrowsersIcon,
    CellSignalFullIcon,
    CellSignalHighIcon,
    CellSignalLowIcon,
    CellSignalMediumIcon,
    CellSignalNoneIcon,
    CellSignalSlashIcon,
    CellSignalXIcon,
    CheckIcon,
    CheckCircleIcon,
    CheckFatIcon,
    CheckSquareIcon,
    CheckSquareOffsetIcon,
    ChecksIcon,
    CircuitryIcon,
    CloudArrowDownIcon,
    CloudArrowUpIcon,
    CloudCheckIcon,
    CloudSlashIcon,
    CloudWarningIcon,
    CloudXIcon,
    CommandIcon,
    ComputerTowerIcon,
    ControlIcon,
    CursorIcon,
    CursorClickIcon,
    DesktopIcon,
    DesktopTowerIcon,
    DeviceMobileIcon,
    DeviceMobileCameraIcon,
    DeviceMobileSlashIcon,
    DeviceMobileSpeakerIcon,
    DeviceRotateIcon,
    DeviceTabletIcon,
    DeviceTabletCameraIcon,
    DeviceTabletSpeakerIcon,
    DevicesIcon,
    DotIcon,
    DotOutlineIcon,
    DotsNineIcon,
    DotsSixIcon,
    DotsSixVerticalIcon,
    DotsThreeIcon,
    DotsThreeCircleIcon,
    DotsThreeCircleVerticalIcon,
    DotsThreeOutlineIcon,
    DotsThreeOutlineVerticalIcon,
    DotsThreeVerticalIcon,
    DownloadIcon,
    DownloadSimpleIcon,
    FlashlightIcon,
    GaugeIcon,
    GearIcon,
    GearSixIcon,
    HandSwipeLeftIcon,
    HandSwipeRightIcon,
    HandTapIcon,
    HardDriveIcon,
    HardDrivesIcon,
    KeyReturnIcon,
    KeyboardIcon,
    LaptopIcon,
    LightbulbIcon,
    LightbulbFilamentIcon,
    LightningIcon,
    LightningAIcon,
    LightningSlashIcon,
    LinkIcon,
    LinkBreakIcon,
    LinkSimpleIcon,
    LinkSimpleBreakIcon,
    LinkSimpleHorizontalIcon,
    LinkSimpleHorizontalBreakIcon,
    ListHeartIcon,
    ListMagnifyingGlassIcon,
    ListStarIcon,
    MagnifyingGlassIcon,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
    MemoryIcon,
    MonitorIcon,
    MonitorArrowUpIcon,
    MonitorPlayIcon,
    MouseIcon,
    MouseLeftClickIcon,
    MouseMiddleClickIcon,
    MouseRightClickIcon,
} from '@phosphor-icons/react'

figma.connect(
    GitlabLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36223',
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
            <GitlabLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitlabLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitlabLogoSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36268',
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
            <GitlabLogoSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GitlabLogoSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GoodreadsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36318',
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
            <GoodreadsLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GoodreadsLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GoogleChromeLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36383',
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
            <GoogleChromeLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GoogleChromeLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GoogleDriveLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36445',
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
            <GoogleDriveLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GoogleDriveLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GoogleLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36490',
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
            <GoogleLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GoogleLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GooglePhotosLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36551',
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
            <GooglePhotosLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GooglePhotosLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GooglePlayLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36606',
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
            <GooglePlayLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { GooglePlayLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GooglePodcastsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36691',
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
            <GooglePodcastsLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GooglePodcastsLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    InstagramLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36746',
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
            <InstagramLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { InstagramLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LastfmLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36791',
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
            <LastfmLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LastfmLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinkedinLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36856',
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
            <LinkedinLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinkedinLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinktreeLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36921',
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
            <LinktreeLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinktreeLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinuxLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36986',
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
            <LinuxLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinuxLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MastodonLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37041',
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
            <MastodonLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MastodonLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MediumLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37097',
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
            <MediumLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MediumLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MessengerLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37147',
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
            <MessengerLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MessengerLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MetaLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37193',
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
            <MetaLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MetaLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MicrosoftExcelLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37273',
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
            <MicrosoftExcelLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrosoftExcelLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MicrosoftOutlookLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37343',
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
            <MicrosoftOutlookLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrosoftOutlookLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MicrosoftPowerpointLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37411',
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
            <MicrosoftPowerpointLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrosoftPowerpointLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MicrosoftTeamsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37486',
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
            <MicrosoftTeamsLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrosoftTeamsLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MicrosoftWordLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37551',
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
            <MicrosoftWordLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrosoftWordLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NotionLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37611',
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
            <NotionLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotionLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NyTimesLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37676',
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
            <NyTimesLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NyTimesLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OpenAiLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37748',
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
            <OpenAiLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OpenAiLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PatreonLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37793',
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
            <PatreonLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PatreonLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaypalLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37843',
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
            <PaypalLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaypalLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhosphorLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37904',
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
            <PhosphorLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhosphorLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PinterestLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-37954',
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
            <PinterestLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PinterestLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ReadCvLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38014',
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
            <ReadCvLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ReadCvLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RedditLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38084',
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
            <RedditLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RedditLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ReplitLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38132',
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
            <ReplitLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ReplitLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SketchLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38187',
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
            <SketchLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SketchLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkypeLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38237',
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
            <SkypeLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SkypeLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SlackLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38320',
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
            <SlackLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SlackLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SnapchatLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38375',
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
            <SnapchatLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SnapchatLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SoundcloudLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38439',
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
            <SoundcloudLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SoundcloudLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpotifyLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38498',
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
            <SpotifyLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpotifyLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SquareLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38548',
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
            <SquareLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SquareLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StackOverflowLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38612',
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
            <StackOverflowLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { StackOverflowLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SteamLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38680',
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
            <SteamLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SteamLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StripeLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38730',
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
            <StripeLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StripeLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TelegramLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38786',
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
            <TelegramLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TelegramLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThreadsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38831',
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
            <ThreadsLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ThreadsLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TidalLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38894',
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
            <TidalLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TidalLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TiktokLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38939',
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
            <TiktokLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TiktokLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TumblrLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-38984',
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
            <TumblrLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TumblrLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TwitchLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39039',
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
            <TwitchLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TwitchLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TwitterLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39084',
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
            <TwitterLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TwitterLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WechatLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39144',
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
            <WechatLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WechatLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WhatsappLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39194',
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
            <WhatsappLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WhatsappLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WindowsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39257',
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
            <WindowsLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WindowsLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    XLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39312',
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
            <XLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { XLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    YoutubeLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39362',
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
            <YoutubeLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { YoutubeLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AmbulanceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39443',
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
            <AmbulanceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AmbulanceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AsclepiusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39503',
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
            <AsclepiusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AsclepiusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BandaidsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39565',
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
            <BandaidsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BandaidsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BarbellIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39641',
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
            <BarbellIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BarbellIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39701',
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
            <BedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BrainIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39771',
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
            <BrainIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BrainIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DnaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39846',
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
            <DnaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DnaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FaceMaskIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-39911',
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
            <FaceMaskIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FaceMaskIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FireTruckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40011',
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
            <FireTruckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FireTruckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FirstAidIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40056',
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
            <FirstAidIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FirstAidIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FirstAidKitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40116',
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
            <FirstAidKitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FirstAidKitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlaskIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40171',
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
            <FlaskIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlaskIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandHeartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40227',
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
            <HandHeartIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandHeartIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandSoapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40287',
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
            <HandSoapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandSoapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeartbeatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40337',
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
            <HeartbeatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeartbeatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LifebuoyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40408',
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
            <LifebuoyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LifebuoyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MicroscopeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40468',
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
            <MicroscopeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MicroscopeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PillIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40523',
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
            <PillIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PillIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PrescriptionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40578',
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
            <PrescriptionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PrescriptionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PulseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40623',
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
            <PulseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PulseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StethoscopeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40682',
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
            <StethoscopeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StethoscopeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SyringeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40757',
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
            <SyringeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SyringeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TestTubeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40807',
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
            <TestTubeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TestTubeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToiletIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40868',
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
            <ToiletIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToiletIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToiletPaperIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40938',
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
            <ToiletPaperIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToiletPaperIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToothIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-40993',
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
            <ToothIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToothIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VirusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41093',
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
            <VirusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VirusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AppWindowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41149',
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
            <AppWindowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AppWindowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BackspaceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41204',
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
            <BackspaceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BackspaceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryChargingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41259',
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
            <BatteryChargingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryChargingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryChargingVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41314',
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
            <BatteryChargingVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryChargingVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryEmptyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41364',
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
            <BatteryEmptyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryEmptyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryFullIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41434',
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
            <BatteryFullIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryFullIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41499',
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
            <BatteryHighIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryHighIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41554',
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
            <BatteryLowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryLowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41614',
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
            <BatteryMediumIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryMediumIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41674',
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
            <BatteryPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BatteryPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryPlusVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41734',
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
            <BatteryPlusVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryPlusVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryVerticalEmptyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41784',
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
            <BatteryVerticalEmptyIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryVerticalEmptyIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryVerticalFullIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41854',
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
            <BatteryVerticalFullIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryVerticalFullIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryVerticalHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41919',
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
            <BatteryVerticalHighIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryVerticalHighIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryVerticalLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-41974',
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
            <BatteryVerticalLowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryVerticalLowIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryVerticalMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42034',
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
            <BatteryVerticalMediumIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryVerticalMediumIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BatteryWarningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42094',
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
            <BatteryWarningIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BatteryWarningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BatteryWarningVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42154',
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
            <BatteryWarningVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BatteryWarningVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BellIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42204',
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
            <BellIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BellRingingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42264',
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
            <BellRingingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellRingingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BellSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42314',
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
            <BellSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BellSimpleRingingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42374',
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
            <BellSimpleRingingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BellSimpleRingingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BellSimpleSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42434',
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
            <BellSimpleSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BellSimpleSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BellSimpleZIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42489',
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
            <BellSimpleZIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellSimpleZIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BellSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42549',
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
            <BellSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BellZIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42604',
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
            <BellZIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BellZIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BluetoothIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42665',
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
            <BluetoothIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BluetoothIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BluetoothConnectedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42736',
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
            <BluetoothConnectedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BluetoothConnectedIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BluetoothSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42797',
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
            <BluetoothSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BluetoothSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BluetoothXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42868',
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
            <BluetoothXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BluetoothXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BrowserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42918',
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
            <BrowserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BrowserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BrowsersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-42973',
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
            <BrowsersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BrowsersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellSignalFullIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43034',
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
            <CellSignalFullIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CellSignalFullIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellSignalHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43092',
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
            <CellSignalHighIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CellSignalHighIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellSignalLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43142',
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
            <CellSignalLowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CellSignalLowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellSignalMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43196',
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
            <CellSignalMediumIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CellSignalMediumIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CellSignalNoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43239',
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
            <CellSignalNoneIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CellSignalNoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellSignalSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43310',
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
            <CellSignalSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CellSignalSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CellSignalXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43381',
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
            <CellSignalXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CellSignalXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43426',
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
            <CheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43476',
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
            <CheckCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheckCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckFatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43521',
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
            <CheckFatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheckFatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43571',
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
            <CheckSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheckSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckSquareOffsetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43621',
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
            <CheckSquareOffsetIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CheckSquareOffsetIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChecksIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43671',
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
            <ChecksIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChecksIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircuitryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43741',
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
            <CircuitryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CircuitryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43801',
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
            <CloudArrowDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CloudArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43861',
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
            <CloudArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43911',
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
            <CloudCheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudCheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-43971',
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
            <CloudSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudWarningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44026',
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
            <CloudWarningIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudWarningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44081',
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
            <CloudXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CommandIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44149',
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
            <CommandIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CommandIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ComputerTowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44209',
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
            <ComputerTowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ComputerTowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ControlIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44254',
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
            <ControlIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ControlIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CursorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44299',
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
            <CursorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CursorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CursorClickIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44364',
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
            <CursorClickIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CursorClickIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DesktopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44424',
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
            <DesktopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DesktopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DesktopTowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44499',
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
            <DesktopTowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DesktopTowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DeviceMobileIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44554',
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
            <DeviceMobileIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DeviceMobileIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DeviceMobileCameraIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44604',
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
            <DeviceMobileCameraIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DeviceMobileCameraIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DeviceMobileSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44659',
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
            <DeviceMobileSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DeviceMobileSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DeviceMobileSpeakerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44709',
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
            <DeviceMobileSpeakerIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DeviceMobileSpeakerIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DeviceRotateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44769',
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
            <DeviceRotateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DeviceRotateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DeviceTabletIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44824',
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
            <DeviceTabletIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DeviceTabletIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DeviceTabletCameraIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44874',
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
            <DeviceTabletCameraIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DeviceTabletCameraIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DeviceTabletSpeakerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44924',
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
            <DeviceTabletSpeakerIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DeviceTabletSpeakerIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DevicesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-44984',
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
            <DevicesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DevicesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45029',
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
            <DotIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotOutlineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45074',
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
            <DotOutlineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DotOutlineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotsNineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45159',
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
            <DotsNineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DotsNineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotsSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45229',
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
            <DotsSixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DotsSixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotsSixVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45299',
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
            <DotsSixVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsSixVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DotsThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45354',
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
            <DotsThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DotsThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DotsThreeCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45413',
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
            <DotsThreeCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsThreeCircleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DotsThreeCircleVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45472',
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
            <DotsThreeCircleVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsThreeCircleVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DotsThreeOutlineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45529',
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
            <DotsThreeOutlineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsThreeOutlineIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DotsThreeOutlineVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45586',
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
            <DotsThreeOutlineVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsThreeOutlineVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DotsThreeVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45641',
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
            <DotsThreeVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { DotsThreeVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DownloadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45701',
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
            <DownloadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DownloadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DownloadSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45756',
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
            <DownloadSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { DownloadSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlashlightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45811',
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
            <FlashlightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlashlightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GaugeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45876',
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
            <GaugeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GaugeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GearIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45926',
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
            <GearIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GearIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GearSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-45976',
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
            <GearSixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GearSixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandSwipeLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46031',
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
            <HandSwipeLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandSwipeLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandSwipeRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46086',
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
            <HandSwipeRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { HandSwipeRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandTapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46136',
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
            <HandTapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandTapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HardDriveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46186',
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
            <HardDriveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HardDriveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HardDrivesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46249',
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
            <HardDrivesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HardDrivesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KeyReturnIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46304',
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
            <KeyReturnIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KeyReturnIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KeyboardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46374',
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
            <KeyboardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KeyboardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LaptopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46429',
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
            <LaptopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LaptopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LightbulbIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46484',
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
            <LightbulbIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LightbulbIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LightbulbFilamentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46544',
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
            <LightbulbFilamentIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LightbulbFilamentIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    LightningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46589',
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
            <LightningIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LightningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LightningAIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46644',
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
            <LightningAIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LightningAIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LightningSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46699',
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
            <LightningSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { LightningSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46749',
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
            <LinkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinkBreakIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46819',
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
            <LinkBreakIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinkBreakIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinkSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46874',
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
            <LinkSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LinkSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LinkSimpleBreakIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46924',
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
            <LinkSimpleBreakIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LinkSimpleBreakIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    LinkSimpleHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-46979',
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
            <LinkSimpleHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LinkSimpleHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    LinkSimpleHorizontalBreakIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47029',
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
            <LinkSimpleHorizontalBreakIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LinkSimpleHorizontalBreakIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ListHeartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47090',
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
            <ListHeartIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListHeartIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListMagnifyingGlassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47155',
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
            <ListMagnifyingGlassIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ListMagnifyingGlassIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ListStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47216',
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
            <ListStarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListStarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MagnifyingGlassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47266',
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
            <MagnifyingGlassIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MagnifyingGlassIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MagnifyingGlassMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47321',
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
            <MagnifyingGlassMinusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MagnifyingGlassMinusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MagnifyingGlassPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47381',
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
            <MagnifyingGlassPlusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MagnifyingGlassPlusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MemoryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47474',
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
            <MemoryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MemoryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MonitorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47525',
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
            <MonitorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MonitorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MonitorArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47585',
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
            <MonitorArrowUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { MonitorArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MonitorPlayIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47640',
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
            <MonitorPlayIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MonitorPlayIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MouseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47695',
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
            <MouseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MouseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MouseLeftClickIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47757',
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
            <MouseLeftClickIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { MouseLeftClickIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MouseMiddleClickIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47822',
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
            <MouseMiddleClickIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MouseMiddleClickIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MouseRightClickIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-47884',
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
            <MouseRightClickIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MouseRightClickIcon } from '@phosphor-icons/react'",
        ],
    }
)
