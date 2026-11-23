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
    MosqueIcon,
    MotorcycleIcon,
    NavigationArrowIcon,
    ParkIcon,
    PathIcon,
    PoliceCarIcon,
    RoadHorizonIcon,
    RocketIcon,
    RocketLaunchIcon,
    SailboatIcon,
    ScooterIcon,
    SeatIcon,
    ShippingContainerIcon,
    SignpostIcon,
    SteeringWheelIcon,
    StepsIcon,
    SubwayIcon,
    SuitcaseIcon,
    SuitcaseRollingIcon,
    SuitcaseSimpleIcon,
    SwimmingPoolIcon,
    SynagogueIcon,
    TaxiIcon,
    TentIcon,
    TipiIcon,
    TrafficConeIcon,
    TrafficSignIcon,
    TrafficSignalIcon,
    TrainIcon,
    TrainRegionalIcon,
    TrainSimpleIcon,
    TramIcon,
    TrolleyIcon,
    TrolleySuitcaseIcon,
    TruckIcon,
    VanIcon,
    AirplayIcon,
    ApertureIcon,
    ArticleIcon,
    ArticleMediumIcon,
    ArticleNyTimesIcon,
    CameraIcon,
    CameraPlusIcon,
    CameraRotateIcon,
    CameraSlashIcon,
    CassetteTapeIcon,
    ClosedCaptioningIcon,
    CopyleftIcon,
    CopyrightIcon,
    CornersInIcon,
    CornersOutIcon,
    DiscIcon,
    EarIcon,
    EarSlashIcon,
    EjectIcon,
    EjectSimpleIcon,
    EqualizerIcon,
    FadersIcon,
    FadersHorizontalIcon,
    FastForwardIcon,
    FastForwardCircleIcon,
    FilmReelIcon,
    FilmScriptIcon,
    FilmSlateIcon,
    FilmStripIcon,
    FourKIcon,
    FrameCornersIcon,
    GifIcon,
    GuitarIcon,
    HeadphonesIcon,
    HeadsetIcon,
    HighDefinitionIcon,
    ImageIcon,
    ImageBrokenIcon,
    ImageSquareIcon,
    ImagesIcon,
    ImagesSquareIcon,
    MetronomeIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    MicrophoneStageIcon,
    MusicNoteIcon,
    MusicNoteSimpleIcon,
    MusicNotesIcon,
    MusicNotesMinusIcon,
    MusicNotesPlusIcon,
    MusicNotesSimpleIcon,
    NewspaperIcon,
    NewspaperClippingIcon,
    PanoramaIcon,
    PauseIcon,
    PauseCircleIcon,
    PianoKeysIcon,
    PictureInPictureIcon,
    PlayIcon,
    PlayCircleIcon,
    PlayPauseIcon,
    PlaylistIcon,
    QueueIcon,
    RecordIcon,
    RepeatIcon,
    RepeatOnceIcon,
    RewindIcon,
    RewindCircleIcon,
    ScreencastIcon,
    ShuffleIcon,
    ShuffleAngularIcon,
    ShuffleSimpleIcon,
    SkipBackIcon,
    SkipBackCircleIcon,
    SkipForwardIcon,
    SkipForwardCircleIcon,
    SlidersIcon,
    SlidersHorizontalIcon,
    SlideshowIcon,
    SpeakerHifiIcon,
    SpeakerHighIcon,
    SpeakerLowIcon,
    SpeakerNoneIcon,
    SpeakerSimpleHighIcon,
    SpeakerSimpleLowIcon,
    SpeakerSimpleNoneIcon,
    SpeakerSimpleSlashIcon,
    SpeakerSimpleXIcon,
    SpeakerSlashIcon,
    SpeakerXIcon,
    StandardDefinitionIcon,
    StopIcon,
    StopCircleIcon,
    SubtitlesIcon,
    SubtitlesSlashIcon,
    TelevisionIcon,
    TelevisionSimpleIcon,
    ThreeDIcon,
    VideoCameraIcon,
    VideoCameraSlashIcon,
    VideoConferenceIcon,
    VinylRecordIcon,
    VisorIcon,
    WaveSawtoothIcon,
    WaveSineIcon,
    WaveSquareIcon,
    WaveTriangleIcon,
    WaveformIcon,
    WaveformSlashIcon,
    WebcamIcon,
    WebcamSlashIcon,
    AlarmIcon,
    CalendarIcon,
    CalendarBlankIcon,
    CalendarCheckIcon,
    CalendarDotIcon,
    CalendarDotsIcon,
    CalendarHeartIcon,
    CalendarMinusIcon,
    CalendarPlusIcon,
    CalendarSlashIcon,
    CalendarStarIcon,
    CalendarXIcon,
    ClockIcon,
    ClockAfternoonIcon,
    ClockClockwiseIcon,
    ClockCountdownIcon,
    ClockCounterClockwiseIcon,
    ClockUserIcon,
    HourglassIcon,
    HourglassHighIcon,
    HourglassLowIcon,
    HourglassMediumIcon,
    HourglassSimpleIcon,
    HourglassSimpleHighIcon,
    HourglassSimpleLowIcon,
    HourglassSimpleMediumIcon,
    TimerIcon,
    WatchIcon,
    AlienIcon,
    BaseballIcon,
    BaseballHelmetIcon,
    BasketballIcon,
    BeachBallIcon,
    BombIcon,
    BoulesIcon,
    BowlingBallIcon,
    BoxingGloveIcon,
    CastleTurretIcon,
    CheckerboardIcon,
    ClubIcon,
    ConfettiIcon,
    CourtBasketballIcon,
    CricketIcon,
    CrownIcon,
    CrownCrossIcon,
    CrownSimpleIcon,
    CubeFocusIcon,
    DiamondIcon,
    DiceFiveIcon,
    DiceFourIcon,
    DiceOneIcon,
    DiceSixIcon,
    DiceThreeIcon,
} from '@phosphor-icons/react'

figma.connect(
    MosqueIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11816',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MosqueIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MosqueIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MotorcycleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11878',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MotorcycleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MotorcycleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NavigationArrowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-11923',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NavigationArrowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NavigationArrowIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ParkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12003',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ParkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ParkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PathIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12053',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PathIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PathIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PoliceCarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12128',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PoliceCarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PoliceCarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RoadHorizonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12198',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RoadHorizonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RoadHorizonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RocketIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12264',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RocketIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RocketIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RocketLaunchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12326',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RocketLaunchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RocketLaunchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SailboatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12382',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SailboatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SailboatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScooterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12443',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScooterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScooterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SeatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12493',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SeatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SeatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShippingContainerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12553',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShippingContainerIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ShippingContainerIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SignpostIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12608',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SignpostIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SignpostIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SteeringWheelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12673',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SteeringWheelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SteeringWheelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StepsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12718',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StepsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StepsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubwayIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12792',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubwayIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SubwayIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SuitcaseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12843',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SuitcaseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SuitcaseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SuitcaseRollingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12917',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SuitcaseRollingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SuitcaseRollingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SuitcaseSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-12972',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SuitcaseSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SuitcaseSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SwimmingPoolIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13047',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SwimmingPoolIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SwimmingPoolIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SynagogueIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13135',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SynagogueIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SynagogueIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TaxiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13210',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TaxiIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TaxiIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13260',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TipiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13310',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TipiIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TipiIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrafficConeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13370',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrafficConeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrafficConeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrafficSignIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13425',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrafficSignIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrafficSignIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrafficSignalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13500',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrafficSignalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrafficSignalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrainIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13580',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrainIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrainIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrainRegionalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13650',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrainRegionalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrainRegionalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrainSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13720',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrainSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrainSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TramIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13800',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TramIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TramIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrolleyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13860',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrolleyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrolleyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrolleySuitcaseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-13930',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrolleySuitcaseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TrolleySuitcaseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TruckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14005',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TruckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TruckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14080',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AirplayIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14131',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AirplayIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AirplayIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ApertureIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14206',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ApertureIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ApertureIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArticleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14266',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArticleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArticleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArticleMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14351',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArticleMediumIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArticleMediumIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArticleNyTimesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14426',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArticleNyTimesIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArticleNyTimesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CameraIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14476',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CameraIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CameraIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CameraPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14532',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CameraPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CameraPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CameraRotateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14597',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CameraRotateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CameraRotateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CameraSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14657',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CameraSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CameraSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CassetteTapeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14729',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CassetteTapeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CassetteTapeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClosedCaptioningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14784',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClosedCaptioningIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ClosedCaptioningIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CopyleftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14834',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CopyleftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CopyleftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CopyrightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14884',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CopyrightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CopyrightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CornersInIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-14944',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CornersInIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CornersInIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CornersOutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15004',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CornersOutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CornersOutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiscIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15064',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiscIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiscIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15114',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EarSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15184',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EarSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EarSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EjectIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15235',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EjectIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EjectIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EjectSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15285',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EjectSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EjectSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EqualizerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15382',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EqualizerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EqualizerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FadersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15467',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FadersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FadersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FadersHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15537',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FadersHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FadersHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FastForwardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15588',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FastForwardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FastForwardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FastForwardCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15643',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FastForwardCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FastForwardCircleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FilmReelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15713',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilmReelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilmReelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilmScriptIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15773',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilmScriptIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilmScriptIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilmSlateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15834',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilmSlateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilmSlateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FilmStripIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15915',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FilmStripIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FilmStripIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FourKIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-15985',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FourKIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FourKIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FrameCornersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16040',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FrameCornersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FrameCornersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GifIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16100',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GifIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GifIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GuitarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16175',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GuitarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GuitarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeadphonesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16221',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeadphonesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeadphonesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeadsetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16272',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeadsetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeadsetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HighDefinitionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16342',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HighDefinitionIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { HighDefinitionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ImageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16402',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ImageIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ImageIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ImageBrokenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16457',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ImageBrokenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ImageBrokenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ImageSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16512',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ImageSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ImageSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ImagesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16572',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ImagesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ImagesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ImagesSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16632',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ImagesSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ImagesSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MetronomeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16687',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MetronomeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MetronomeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MicrophoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16742',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MicrophoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MicrophoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MicrophoneSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16812',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MicrophoneSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrophoneSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MicrophoneStageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16871',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MicrophoneStageIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MicrophoneStageIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MusicNoteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16921',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNoteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MusicNoteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MusicNoteSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-16971',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNoteSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MusicNoteSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MusicNotesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17032',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNotesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MusicNotesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MusicNotesMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17107',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNotesMinusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MusicNotesMinusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    MusicNotesPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNotesPlusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { MusicNotesPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MusicNotesSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17239',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MusicNotesSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { MusicNotesSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    NewspaperIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17299',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NewspaperIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NewspaperIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NewspaperClippingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17359',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NewspaperClippingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { NewspaperClippingIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PanoramaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17419',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PanoramaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PanoramaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PauseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17470',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PauseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PauseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PauseCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17525',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PauseCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PauseCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PianoKeysIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17591',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PianoKeysIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PianoKeysIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PictureInPictureIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17641',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PictureInPictureIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PictureInPictureIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PlayIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17686',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlayIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlayIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlayCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17736',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlayCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlayCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlayPauseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17791',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlayPauseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlayPauseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlaylistIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17856',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlaylistIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlaylistIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    QueueIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17916',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <QueueIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { QueueIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RecordIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-17967',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RecordIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RecordIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RepeatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18027',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RepeatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RepeatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RepeatOnceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18092',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RepeatOnceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RepeatOnceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RewindIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18143',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RewindIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RewindIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RewindCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18198',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RewindCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RewindCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScreencastIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18258',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScreencastIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScreencastIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShuffleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18323',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShuffleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShuffleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShuffleAngularIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18388',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShuffleAngularIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ShuffleAngularIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShuffleSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18453',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShuffleSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShuffleSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkipBackIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18503',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SkipBackIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SkipBackIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkipBackCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18558',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SkipBackCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SkipBackCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkipForwardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18608',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SkipForwardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SkipForwardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkipForwardCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18663',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SkipForwardCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SkipForwardCircleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SlidersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18750',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SlidersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SlidersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SlidersHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18821',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SlidersHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SlidersHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SlideshowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18876',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SlideshowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SlideshowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerHifiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18931',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerHifiIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerHifiIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-18991',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerHighIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerHighIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19046',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerLowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerLowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerNoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19096',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerNoneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerNoneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerSimpleHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19151',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSimpleHighIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SpeakerSimpleHighIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SpeakerSimpleLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19201',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSimpleLowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SpeakerSimpleLowIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SpeakerSimpleNoneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19246',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSimpleNoneIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SpeakerSimpleNoneIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SpeakerSimpleSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19311',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSimpleSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SpeakerSimpleSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SpeakerSimpleXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19368',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSimpleXIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SpeakerSimpleXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19438',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpeakerXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19498',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpeakerXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpeakerXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StandardDefinitionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19558',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StandardDefinitionIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { StandardDefinitionIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    StopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19603',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StopCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19653',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StopCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StopCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubtitlesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19718',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubtitlesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SubtitlesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubtitlesSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19793',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubtitlesSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SubtitlesSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TelevisionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19858',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TelevisionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TelevisionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TelevisionSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19908',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TelevisionSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TelevisionSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ThreeDIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-19968',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ThreeDIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ThreeDIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VideoCameraIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20018',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VideoCameraIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VideoCameraIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VideoCameraSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20078',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VideoCameraSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { VideoCameraSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    VideoConferenceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20153',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VideoConferenceIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { VideoConferenceIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    VinylRecordIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20213',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VinylRecordIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VinylRecordIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VisorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20263',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VisorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VisorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveSawtoothIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20308',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveSawtoothIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveSawtoothIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveSineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20353',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveSineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveSineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20398',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveTriangleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20443',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveTriangleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveTriangleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveformIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20508',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveformIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveformIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WaveformSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20587',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WaveformSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WaveformSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WebcamIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20647',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WebcamIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WebcamIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WebcamSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20722',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WebcamSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WebcamSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlarmIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20783',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlarmIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlarmIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20853',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarBlankIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20913',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarBlankIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarBlankIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-20978',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarCheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarCheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarDotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21043',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarDotIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarDotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarDotsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21128',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarDotsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarDotsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarHeartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21189',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarHeartIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarHeartIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21254',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21324',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21388',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21448',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarStarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarStarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CalendarXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21518',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CalendarXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CalendarXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21568',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ClockIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClockAfternoonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21618',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockAfternoonIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ClockAfternoonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClockClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21673',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ClockClockwiseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClockCountdownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21737',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockCountdownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ClockCountdownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClockCounterClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21792',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockCounterClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ClockCounterClockwiseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ClockUserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21852',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClockUserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ClockUserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HourglassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21903',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HourglassIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HourglassHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-21958',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassHighIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HourglassHighIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HourglassLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22013',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassLowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HourglassLowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HourglassMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22073',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassMediumIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HourglassMediumIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HourglassSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22124',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HourglassSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HourglassSimpleHighIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22179',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassSimpleHighIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HourglassSimpleHighIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HourglassSimpleLowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassSimpleLowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HourglassSimpleLowIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HourglassSimpleMediumIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22294',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HourglassSimpleMediumIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HourglassSimpleMediumIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TimerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22349',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TimerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TimerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WatchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22409',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WatchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WatchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlienIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22470',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlienIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlienIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BaseballIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22554',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BaseballIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BaseballIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BaseballHelmetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22610',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BaseballHelmetIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BaseballHelmetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BasketballIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22676',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BasketballIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BasketballIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BeachBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22738',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BeachBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BeachBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BombIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22793',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BombIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BombIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoulesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22853',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoulesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoulesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BowlingBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22913',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BowlingBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BowlingBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoxingGloveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-22968',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoxingGloveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoxingGloveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CastleTurretIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23025',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CastleTurretIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CastleTurretIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheckerboardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23097',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CheckerboardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheckerboardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ClubIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23142',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ClubIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ClubIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ConfettiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23218',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ConfettiIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ConfettiIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CourtBasketballIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23279',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CourtBasketballIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CourtBasketballIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CricketIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23340',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CricketIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CricketIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23410',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CrownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrownCrossIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23465',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrownCrossIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CrownCrossIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CrownSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23510',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CrownSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CrownSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CubeFocusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23585',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CubeFocusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CubeFocusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiamondIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23630',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiamondIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiamondIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiceFiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23700',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceFiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceFiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiceFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23765',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiceOneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23815',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceOneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceOneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiceSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23890',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceSixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceSixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiceThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-23950',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceThreeIcon } from '@phosphor-icons/react'"],
    }
)
