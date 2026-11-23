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
    AcornIcon,
    AtomIcon,
    BirdIcon,
    BoneIcon,
    ButterflyIcon,
    CactusIcon,
    CampfireIcon,
    CatIcon,
    CloudIcon,
    CloudFogIcon,
    CloudLightningIcon,
    CloudMoonIcon,
    CloudRainIcon,
    CloudSnowIcon,
    CloudSunIcon,
    CloverIcon,
    CowIcon,
    DogIcon,
    DropIcon,
    DropSimpleIcon,
    FeatherIcon,
    FireIcon,
    FireSimpleIcon,
    FishIcon,
    FishSimpleIcon,
    FlameIcon,
    FlowerIcon,
    FlowerLotusIcon,
    FlowerTulipIcon,
    HurricaneIcon,
    IslandIcon,
    LeafIcon,
    LogIcon,
    MeteorIcon,
    MoonIcon,
    MoonStarsIcon,
    MountainsIcon,
    PawPrintIcon,
    PlanetIcon,
    PlantIcon,
    RabbitIcon,
    RainbowIcon,
    RainbowCloudIcon,
    ShootingStarIcon,
    ShrimpIcon,
    SnowflakeIcon,
    SparkleIcon,
    StarFourIcon,
    SunIcon,
    SunDimIcon,
    SunHorizonIcon,
    ThermometerIcon,
    ThermometerColdIcon,
    ThermometerHotIcon,
    ThermometerSimpleIcon,
    TornadoIcon,
    TreeIcon,
    TreeEvergreenIcon,
    UmbrellaIcon,
    UmbrellaSimpleIcon,
    WavesIcon,
    WindIcon,
    AddressBookIcon,
    AddressBookTabsIcon,
    AsteriskIcon,
    AsteriskSimpleIcon,
    AtIcon,
    BroadcastIcon,
    CellTowerIcon,
    ChatIcon,
    ChatCenteredIcon,
    ChatCenteredDotsIcon,
    ChatCenteredSlashIcon,
    ChatCenteredTextIcon,
    ChatCircleIcon,
    ChatCircleDotsIcon,
    ChatCircleSlashIcon,
    ChatCircleTextIcon,
    ChatDotsIcon,
    ChatSlashIcon,
    ChatTeardropIcon,
    ChatTeardropDotsIcon,
    ChatTeardropSlashIcon,
    ChatTeardropTextIcon,
    ChatTextIcon,
    ChatsIcon,
    ChatsCircleIcon,
    ChatsTeardropIcon,
    CrossIcon,
    EnvelopeIcon,
    EnvelopeOpenIcon,
    EnvelopeSimpleIcon,
    EnvelopeSimpleOpenIcon,
    ExportIcon,
    HashIcon,
    HashStraightIcon,
    LetterCircleHIcon,
    LetterCirclePIcon,
    LetterCircleVIcon,
    MailboxIcon,
    MatrixLogoIcon,
    MegaphoneIcon,
    MegaphoneSimpleIcon,
    NumpadIcon,
    PaperPlaneIcon,
    PaperPlaneRightIcon,
    PaperPlaneTiltIcon,
    PeaceIcon,
    PhoneIcon,
    PhoneCallIcon,
    PhoneDisconnectIcon,
    PhoneIncomingIcon,
    PhoneListIcon,
    PhoneOutgoingIcon,
    PhonePauseIcon,
    PhonePlusIcon,
    PhoneSlashIcon,
    PhoneTransferIcon,
    PhoneXIcon,
    QuotesIcon,
    RadioIcon,
    RssIcon,
    RssSimpleIcon,
    ShareIcon,
    ShareFatIcon,
    ShareNetworkIcon,
    SignatureIcon,
    StarIcon,
    StarAndCrescentIcon,
    StarHalfIcon,
    StarOfDavidIcon,
    StickerIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    TranslateIcon,
    VoicemailIcon,
    YinYangIcon,
    AirTrafficControlIcon,
    AirplaneIcon,
    AirplaneInFlightIcon,
    AirplaneLandingIcon,
    AirplaneTakeoffIcon,
    AirplaneTaxiingIcon,
    AirplaneTiltIcon,
    AnchorIcon,
    AnchorSimpleIcon,
    BarricadeIcon,
    BicycleIcon,
    BoatIcon,
    BusIcon,
    CableCarIcon,
    CarIcon,
    CarProfileIcon,
    CarSimpleIcon,
    ChargingStationIcon,
    ChurchIcon,
    CompassIcon,
    CompassRoseIcon,
    CrosshairIcon,
    CrosshairSimpleIcon,
    ElevatorIcon,
    EngineIcon,
    EscalatorDownIcon,
    EscalatorUpIcon,
    FlagIcon,
    FlagBannerIcon,
    FlagBannerFoldIcon,
    FlagCheckeredIcon,
    FlagPennantIcon,
    GasCanIcon,
    GasPumpIcon,
    GlobeIcon,
    GlobeHemisphereEastIcon,
    GlobeHemisphereWestIcon,
    GlobeSimpleIcon,
    GlobeSimpleXIcon,
    GlobeStandIcon,
    GlobeXIcon,
    GogglesIcon,
    GpsIcon,
    GpsFixIcon,
    GpsSlashIcon,
    HeadlightsIcon,
    HospitalIcon,
    HouseIcon,
    HouseLineIcon,
    HouseSimpleIcon,
    JeepIcon,
    LighthouseIcon,
    LockersIcon,
    MapPinIcon,
    MapPinAreaIcon,
    MapPinLineIcon,
    MapPinPlusIcon,
    MapPinSimpleIcon,
    MapPinSimpleAreaIcon,
    MapPinSimpleLineIcon,
    MapTrifoldIcon,
    MopedIcon,
    MopedFrontIcon,
} from '@phosphor-icons/react'

figma.connect(
    AcornIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-57',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AcornIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AcornIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AtomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-112',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AtomIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AtomIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BirdIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-167',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BirdIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BirdIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-212',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ButterflyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-267',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ButterflyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ButterflyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CactusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-317',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CactusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CactusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CampfireIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-377',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CampfireIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CampfireIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-456',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-501',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudFogIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-561',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudFogIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudFogIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudLightningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-611',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudLightningIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CloudLightningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudMoonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-661',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudMoonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudMoonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudRainIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-716',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudRainIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudRainIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudSnowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-784',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudSnowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudSnowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloudSunIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-854',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloudSunIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloudSunIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CloverIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-923',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CloverIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CloverIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1008',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DogIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1088',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DogIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DogIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1138',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DropIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DropSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FeatherIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1243',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FeatherIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FeatherIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FireIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1293',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FireIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FireIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FireSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1338',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FireSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FireSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FishIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1393',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FishIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FishIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FishSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1448',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FishSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FishSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlameIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1498',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlameIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlameIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1573',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlowerLotusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1639',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlowerLotusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlowerLotusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlowerTulipIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1704',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlowerTulipIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlowerTulipIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HurricaneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1754',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HurricaneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HurricaneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    IslandIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1835',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IslandIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { IslandIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LeafIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1885',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LeafIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LeafIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LogIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-1955',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LogIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LogIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MeteorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2025',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MeteorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MeteorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MoonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2070',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MoonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MoonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MoonStarsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2135',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MoonStarsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MoonStarsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MountainsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2197',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MountainsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MountainsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PawPrintIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2266',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PawPrintIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PawPrintIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlanetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2316',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlanetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlanetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlantIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2377',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlantIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlantIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RabbitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2447',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RabbitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RabbitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RainbowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2502',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RainbowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RainbowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RainbowCloudIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2562',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RainbowCloudIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RainbowCloudIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShootingStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2622',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShootingStarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShootingStarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShrimpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2696',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShrimpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShrimpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SnowflakeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2781',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SnowflakeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SnowflakeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SparkleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2846',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SparkleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SparkleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StarFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2892',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StarFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StarFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SunIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-2977',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SunIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SunIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SunDimIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3062',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SunDimIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SunDimIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SunHorizonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3137',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SunHorizonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SunHorizonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThermometerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3197',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThermometerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ThermometerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThermometerColdIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3277',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThermometerColdIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ThermometerColdIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ThermometerHotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3342',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThermometerHotIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ThermometerHotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThermometerSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3397',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThermometerSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ThermometerSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TornadoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3470',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TornadoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TornadoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3530',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreeEvergreenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3580',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreeEvergreenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreeEvergreenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UmbrellaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3636',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UmbrellaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UmbrellaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UmbrellaSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3686',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UmbrellaSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { UmbrellaSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WavesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3741',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WavesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WavesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WindIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3798',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WindIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WindIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AddressBookIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3869',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AddressBookIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AddressBookIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AddressBookTabsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3939',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AddressBookTabsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AddressBookTabsIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AsteriskIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-3994',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AsteriskIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AsteriskIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AsteriskSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4059',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AsteriskSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { AsteriskSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AtIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4109',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AtIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AtIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BroadcastIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4174',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BroadcastIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BroadcastIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CellTowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4239',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CellTowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CellTowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4284',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatCenteredIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4329',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCenteredIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatCenteredIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatCenteredDotsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4388',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCenteredDotsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatCenteredDotsIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatCenteredSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4443',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCenteredSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatCenteredSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatCenteredTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4498',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCenteredTextIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatCenteredTextIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4543',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatCircleDotsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4602',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCircleDotsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ChatCircleDotsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatCircleSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4657',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCircleSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatCircleSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatCircleTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4712',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatCircleTextIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ChatCircleTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatDotsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4771',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatDotsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatDotsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4826',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatTeardropIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4871',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatTeardropIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatTeardropIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatTeardropDotsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4930',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatTeardropDotsIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatTeardropDotsIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatTeardropSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-4985',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatTeardropSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatTeardropSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatTeardropTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5040',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatTeardropTextIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChatTeardropTextIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChatTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5095',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatTextIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5145',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatsCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5195',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatsCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatsCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChatsTeardropIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5245',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChatsTeardropIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChatsTeardropIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrossIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5290',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrossIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CrossIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EnvelopeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5350',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EnvelopeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EnvelopeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EnvelopeOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5410',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EnvelopeOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EnvelopeOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EnvelopeSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5460',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EnvelopeSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { EnvelopeSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EnvelopeSimpleOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5510',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EnvelopeSimpleOpenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { EnvelopeSimpleOpenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ExportIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5565',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ExportIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ExportIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5625',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HashStraightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5685',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HashStraightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HashStraightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LetterCircleHIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5745',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LetterCircleHIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LetterCircleHIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LetterCirclePIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5795',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LetterCirclePIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LetterCirclePIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LetterCircleVIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5845',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LetterCircleVIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LetterCircleVIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MailboxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5905',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MailboxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MailboxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MatrixLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-5970',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MatrixLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MatrixLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MegaphoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6020',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MegaphoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MegaphoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MegaphoneSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6070',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MegaphoneSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MegaphoneSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NumpadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6160',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NumpadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NumpadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaperPlaneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6210',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaperPlaneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaperPlaneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaperPlaneRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6260',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaperPlaneRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PaperPlaneRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PaperPlaneTiltIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6310',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaperPlaneTiltIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { PaperPlaneTiltIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PeaceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6370',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PeaceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PeaceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6415',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneCallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6470',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneCallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneCallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneDisconnectIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6520',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneDisconnectIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PhoneDisconnectIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PhoneIncomingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6575',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneIncomingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneIncomingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneListIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6630',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneListIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneListIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneOutgoingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6685',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneOutgoingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneOutgoingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhonePauseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6740',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhonePauseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhonePauseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhonePlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6795',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhonePlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhonePlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6850',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneTransferIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6905',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneTransferIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneTransferIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PhoneXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-6960',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PhoneXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PhoneXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    QuotesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <QuotesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { QuotesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RadioIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7080',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RadioIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RadioIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RssIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7140',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RssIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RssIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RssSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7195',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RssSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RssSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7250',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShareFatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7295',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShareFatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShareFatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShareNetworkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7361',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShareNetworkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShareNetworkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SignatureIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7411',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SignatureIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SignatureIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7456',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StarAndCrescentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7507',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StarAndCrescentIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { StarAndCrescentIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    StarHalfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7569',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StarHalfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StarHalfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StarOfDavidIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7619',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StarOfDavidIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StarOfDavidIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StickerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7669',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StickerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StickerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThumbsDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7719',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThumbsDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ThumbsDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ThumbsUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7769',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThumbsUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ThumbsUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TranslateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7840',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TranslateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TranslateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VoicemailIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7896',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VoicemailIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VoicemailIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    YinYangIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-7956',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <YinYangIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { YinYangIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AirTrafficControlIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8022',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirTrafficControlIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AirTrafficControlIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AirplaneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8067',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AirplaneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AirplaneInFlightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8117',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneInFlightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AirplaneInFlightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AirplaneLandingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8167',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneLandingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AirplaneLandingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AirplaneTakeoffIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8217',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneTakeoffIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AirplaneTakeoffIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AirplaneTaxiingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8272',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneTaxiingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AirplaneTaxiingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AirplaneTiltIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8317',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplaneTiltIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AirplaneTiltIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AnchorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8377',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AnchorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AnchorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AnchorSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8432',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AnchorSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AnchorSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BarricadeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8503',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BarricadeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BarricadeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BicycleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8569',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BicycleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BicycleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8630',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8716',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CableCarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8786',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CableCarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CableCarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8856',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CarProfileIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8923',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CarProfileIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CarProfileIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CarSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-8973',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CarSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CarSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChargingStationIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9033',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChargingStationIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChargingStationIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChurchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9099',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChurchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChurchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CompassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9149',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CompassIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CompassIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CompassRoseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9226',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CompassRoseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CompassRoseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrosshairIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9296',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrosshairIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CrosshairIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrosshairSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9361',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrosshairSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CrosshairSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ElevatorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9421',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ElevatorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ElevatorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EngineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9486',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EngineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EngineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EscalatorDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9541',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EscalatorDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EscalatorDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EscalatorUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9596',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EscalatorUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EscalatorUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9646',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlagBannerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9691',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlagBannerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlagBannerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlagBannerFoldIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9741',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlagBannerFoldIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { FlagBannerFoldIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlagCheckeredIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9803',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlagCheckeredIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlagCheckeredIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlagPennantIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9848',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlagPennantIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlagPennantIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GasCanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9913',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GasCanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GasCanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GasPumpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-9973',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GasPumpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GasPumpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GlobeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10033',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GlobeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GlobeHemisphereEastIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10089',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeHemisphereEastIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GlobeHemisphereEastIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GlobeHemisphereWestIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10150',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeHemisphereWestIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GlobeHemisphereWestIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GlobeSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10205',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GlobeSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GlobeSimpleXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10270',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeSimpleXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GlobeSimpleXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GlobeStandIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10330',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeStandIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GlobeStandIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GlobeXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10400',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GlobeXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GlobeXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GogglesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10469',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GogglesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GogglesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GpsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10534',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GpsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GpsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GpsFixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10604',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GpsFixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GpsFixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GpsSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10679',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GpsSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GpsSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeadlightsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10743',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeadlightsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeadlightsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HospitalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10813',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HospitalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HospitalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HouseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10858',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HouseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HouseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HouseLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10923',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HouseLineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HouseLineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HouseSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-10968',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HouseSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HouseSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    JeepIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11047',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <JeepIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { JeepIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LighthouseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11113',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LighthouseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LighthouseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11193',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11243',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapPinIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinAreaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11298',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinAreaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapPinAreaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11353',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinLineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapPinLineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11408',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapPinPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11458',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapPinSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MapPinSimpleAreaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11513',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinSimpleAreaIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MapPinSimpleAreaIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MapPinSimpleLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11568',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapPinSimpleLineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MapPinSimpleLineIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MapTrifoldIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11623',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MapTrifoldIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MapTrifoldIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MopedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11688',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MopedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MopedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MopedFrontIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11754',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MopedFrontIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MopedFrontIcon } from '@phosphor-icons/react'"],
    }
)
