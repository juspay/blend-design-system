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
    DiceTwoIcon,
    DiscoBallIcon,
    DroneIcon,
    FinnTheHumanIcon,
    FlyingSaucerIcon,
    FootballIcon,
    FootballHelmetIcon,
    GameControllerIcon,
    GhostIcon,
    GolfIcon,
    GoogleCardboardLogoIcon,
    HeartIcon,
    HeartBreakIcon,
    HeartHalfIcon,
    HeartStraightIcon,
    HeartStraightBreakIcon,
    HockeyIcon,
    HorseIcon,
    JoystickIcon,
    LegoIcon,
    LegoSmileyIcon,
    MaskHappyIcon,
    MaskSadIcon,
    MedalIcon,
    MedalMilitaryIcon,
    ParachuteIcon,
    PersonSimpleSkiIcon,
    PersonSimpleSnowboardIcon,
    PingPongIcon,
    PinwheelIcon,
    PokerChipIcon,
    PuzzlePieceIcon,
    RacquetIcon,
    RankingIcon,
    ScrollIcon,
    SkullIcon,
    SoccerBallIcon,
    SpadeIcon,
    SpiralIcon,
    StrategyIcon,
    SwordIcon,
    TargetIcon,
    TennisBallIcon,
    TreasureChestIcon,
    TreePalmIcon,
    TrophyIcon,
    VirtualRealityIcon,
    VolleyballIcon,
    AlignBottomIcon,
    AlignBottomSimpleIcon,
    AlignCenterHorizontalIcon,
    AlignCenterHorizontalSimpleIcon,
    AlignCenterVerticalIcon,
    AlignCenterVerticalSimpleIcon,
    AlignLeftIcon,
    AlignLeftSimpleIcon,
    AlignRightIcon,
    AlignRightSimpleIcon,
    AlignTopIcon,
    AlignTopSimpleIcon,
    AngleIcon,
    BezierCurveIcon,
    BlueprintIcon,
    BoundingBoxIcon,
    CircleIcon,
    CircleDashedIcon,
    CircleHalfIcon,
    CircleHalfTiltIcon,
    CircleNotchIcon,
    CirclesFourIcon,
    CirclesThreeIcon,
    CirclesThreePlusIcon,
    ColumnsIcon,
    ColumnsPlusLeftIcon,
    ColumnsPlusRightIcon,
    CompassToolIcon,
    CropIcon,
    CubeIcon,
    CubeTransparentIcon,
    CylinderIcon,
    DiamondsFourIcon,
    DropHalfIcon,
    DropHalfBottomIcon,
    DropSlashIcon,
    EraserIcon,
    ExcludeIcon,
    ExcludeSquareIcon,
    EyeIcon,
    EyeClosedIcon,
    EyeSlashIcon,
    EyedropperIcon,
    EyedropperSampleIcon,
    FlipHorizontalIcon,
    FlipVerticalIcon,
    FlowArrowIcon,
    GearFineIcon,
    GradientIcon,
    GridFourIcon,
    GridNineIcon,
    HexagonIcon,
    HighlighterIcon,
    HighlighterCircleIcon,
    IntersectIcon,
    IntersectSquareIcon,
    IntersectThreeIcon,
    LassoIcon,
    LayoutIcon,
    LineSegmentIcon,
    LineSegmentsIcon,
    LineVerticalIcon,
    MagicWandIcon,
    MarkerCircleIcon,
    NotchesIcon,
    OctagonIcon,
    PaintBrushIcon,
    PaintBrushBroadIcon,
    PaintBrushHouseholdIcon,
    PaintBucketIcon,
    PaintRollerIcon,
    PaletteIcon,
    ParallelogramIcon,
    PenIcon,
    PenNibIcon,
    PenNibStraightIcon,
    PencilIcon,
    PencilCircleIcon,
    PencilLineIcon,
    PencilRulerIcon,
    PencilSimpleIcon,
    PencilSimpleLineIcon,
    PencilSimpleSlashIcon,
    PencilSlashIcon,
    PentagonIcon,
    PentagramIcon,
    PerspectiveIcon,
    PlaceholderIcon,
    PolygonIcon,
    RectangleIcon,
    RectangleDashedIcon,
    ResizeIcon,
    RowsIcon,
    RowsPlusBottomIcon,
    RowsPlusTopIcon,
    RulerIcon,
    ScissorsIcon,
    ScribbleIcon,
    ScribbleLoopIcon,
    SelectionIcon,
    SelectionAllIcon,
    SelectionBackgroundIcon,
    SelectionForegroundIcon,
    SelectionInverseIcon,
    SelectionPlusIcon,
    SelectionSlashIcon,
    ShapesIcon,
    SidebarIcon,
    SidebarSimpleIcon,
    SphereIcon,
    SplitHorizontalIcon,
    SplitVerticalIcon,
    SprayBottleIcon,
    SquareIcon,
    SquareHalfIcon,
    SquareHalfBottomIcon,
    SquareSplitHorizontalIcon,
    SquareSplitVerticalIcon,
    SquaresFourIcon,
    StackIcon,
    StackMinusIcon,
    StackPlusIcon,
    StackSimpleIcon,
    StampIcon,
    SubtractIcon,
    SubtractSquareIcon,
    SwatchesIcon,
    TextAUnderlineIcon,
    TriangleIcon,
    TriangleDashedIcon,
    UniteIcon,
    UniteSquareIcon,
    VignetteIcon,
    AmazonLogoIcon,
    AndroidLogoIcon,
    AngularLogoIcon,
    AppStoreLogoIcon,
    AppleLogoIcon,
    ApplePodcastsLogoIcon,
    BehanceLogoIcon,
    CodaLogoIcon,
    CodepenLogoIcon,
    CodesandboxLogoIcon,
    DevToLogoIcon,
    DiscordLogoIcon,
    DribbbleLogoIcon,
    DropboxLogoIcon,
    FacebookLogoIcon,
    FediverseLogoIcon,
    FigmaLogoIcon,
    FramerLogoIcon,
    GithubLogoIcon,
} from '@phosphor-icons/react'

figma.connect(
    DiceTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24005',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiceTwoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiceTwoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiscoBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24086',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiscoBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiscoBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DroneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24174',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DroneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DroneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FinnTheHumanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FinnTheHumanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FinnTheHumanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlyingSaucerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24299',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlyingSaucerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlyingSaucerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FootballIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24369',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FootballIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FootballIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FootballHelmetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24423',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FootballHelmetIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { FootballHelmetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GameControllerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24488',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GameControllerIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { GameControllerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GhostIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24543',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GhostIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GhostIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GolfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24608',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GolfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GolfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GoogleCardboardLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24663',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GoogleCardboardLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GoogleCardboardLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HeartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24708',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeartIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeartIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeartBreakIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24753',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeartBreakIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeartBreakIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeartHalfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24815',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeartHalfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeartHalfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeartStraightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24860',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeartStraightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeartStraightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeartStraightBreakIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24905',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeartStraightBreakIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HeartStraightBreakIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HockeyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-24971',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HockeyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HockeyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HorseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25026',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HorseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HorseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    JoystickIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25087',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <JoystickIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { JoystickIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LegoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25162',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LegoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LegoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LegoSmileyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25232',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LegoSmileyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LegoSmileyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MaskHappyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25292',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MaskHappyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MaskHappyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MaskSadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25352',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MaskSadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MaskSadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MedalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25407',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MedalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MedalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MedalMilitaryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25469',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MedalMilitaryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MedalMilitaryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ParachuteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25535',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ParachuteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ParachuteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PersonSimpleSkiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25600',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleSkiIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleSkiIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleSnowboardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25666',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleSnowboardIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleSnowboardIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PingPongIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25716',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PingPongIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PingPongIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PinwheelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25782',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PinwheelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PinwheelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PokerChipIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25872',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PokerChipIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PokerChipIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PuzzlePieceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25917',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PuzzlePieceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PuzzlePieceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RacquetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-25992',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RacquetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RacquetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RankingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26058',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RankingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RankingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScrollIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26118',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScrollIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScrollIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SkullIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SkullIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SkullIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SoccerBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26288',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SoccerBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SoccerBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpadeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26333',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpadeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpadeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SpiralIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26378',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SpiralIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SpiralIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StrategyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26453',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StrategyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StrategyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SwordIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26513',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SwordIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SwordIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TargetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26568',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TargetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TargetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TennisBallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26624',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TennisBallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TennisBallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreasureChestIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26693',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreasureChestIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreasureChestIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreePalmIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26761',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreePalmIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreePalmIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrophyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26826',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrophyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrophyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VirtualRealityIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26886',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VirtualRealityIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { VirtualRealityIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VolleyballIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-26961',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VolleyballIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VolleyballIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlignBottomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27018',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignBottomIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlignBottomIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlignBottomSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27068',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignBottomSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignBottomSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignCenterHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27134',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignCenterHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignCenterHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignCenterHorizontalSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27189',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignCenterHorizontalSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignCenterHorizontalSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignCenterVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27255',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignCenterVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignCenterVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignCenterVerticalSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27310',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignCenterVerticalSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignCenterVerticalSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27366',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlignLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlignLeftSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27416',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignLeftSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignLeftSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27472',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlignRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlignRightSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27522',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignRightSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { AlignRightSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    AlignTopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27578',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignTopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AlignTopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AlignTopSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27628',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AlignTopSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { AlignTopSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AngleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27683',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AngleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AngleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BezierCurveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27760',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BezierCurveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BezierCurveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BlueprintIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27825',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BlueprintIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BlueprintIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BoundingBoxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27908',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BoundingBoxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BoundingBoxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-27953',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircleDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28023',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CircleDashedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CircleDashedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircleHalfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28080',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CircleHalfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CircleHalfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircleHalfTiltIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28145',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CircleHalfTiltIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CircleHalfTiltIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CircleNotchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28190',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CircleNotchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CircleNotchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CirclesFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28253',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CirclesFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CirclesFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CirclesThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28310',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CirclesThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CirclesThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CirclesThreePlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28377',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CirclesThreePlusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CirclesThreePlusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ColumnsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28428',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ColumnsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ColumnsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ColumnsPlusLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28489',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ColumnsPlusLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ColumnsPlusLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ColumnsPlusRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28550',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ColumnsPlusRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ColumnsPlusRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CompassToolIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28615',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CompassToolIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CompassToolIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CropIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28675',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CropIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CropIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CubeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28730',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CubeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CubeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CubeTransparentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28800',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CubeTransparentIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CubeTransparentIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CylinderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28850',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CylinderIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CylinderIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiamondsFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28913',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiamondsFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiamondsFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropHalfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-28981',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropHalfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DropHalfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropHalfBottomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29038',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropHalfBottomIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { DropHalfBottomIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29093',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DropSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EraserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29143',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EraserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EraserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ExcludeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29216',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ExcludeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ExcludeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ExcludeSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29291',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ExcludeSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ExcludeSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29341',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyeClosedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29406',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyeClosedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyeClosedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyeSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29469',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyeSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyeSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyedropperIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29519',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyedropperIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyedropperIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyedropperSampleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29575',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyedropperSampleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { EyedropperSampleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FlipHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29625',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlipHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { FlipHorizontalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlipVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29675',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlipVerticalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlipVerticalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FlowArrowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29730',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FlowArrowIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FlowArrowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GearFineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29835',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GearFineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GearFineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GradientIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29925',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GradientIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GradientIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GridFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-29980',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GridFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GridFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GridNineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30045',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GridNineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GridNineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HexagonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30090',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HexagonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HexagonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HighlighterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30145',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HighlighterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HighlighterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HighlighterCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30200',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HighlighterCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { HighlighterCircleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    IntersectIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30257',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IntersectIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { IntersectIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    IntersectSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30311',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IntersectSquareIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { IntersectSquareIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    IntersectThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30368',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IntersectThreeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { IntersectThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LassoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30420',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LassoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LassoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LayoutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30475',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LayoutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LayoutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LineSegmentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30531',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LineSegmentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LineSegmentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LineSegmentsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30609',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LineSegmentsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LineSegmentsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LineVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30654',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LineVerticalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LineVerticalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MagicWandIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30734',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MagicWandIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MagicWandIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MarkerCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30794',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MarkerCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MarkerCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotchesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30843',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotchesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotchesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OctagonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30888',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OctagonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OctagonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaintBrushIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30943',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaintBrushIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaintBrushIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaintBrushBroadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-30998',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaintBrushBroadIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PaintBrushBroadIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PaintBrushHouseholdIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31058',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaintBrushHouseholdIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PaintBrushHouseholdIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PaintBucketIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31119',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaintBucketIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaintBucketIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaintRollerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31174',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaintRollerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaintRollerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaletteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31239',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaletteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaletteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ParallelogramIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31284',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ParallelogramIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ParallelogramIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31344',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PenNibIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31404',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PenNibIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PenNibIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PenNibStraightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31464',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PenNibStraightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { PenNibStraightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31524',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31589',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31650',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilLineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilLineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilRulerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31730',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilRulerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilRulerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31780',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PencilSimpleLineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31835',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilSimpleLineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PencilSimpleLineIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PencilSimpleSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31895',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilSimpleSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PencilSimpleSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PencilSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-31970',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PencilSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PencilSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PentagonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32015',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PentagonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PentagonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PentagramIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32060',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PentagramIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PentagramIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PerspectiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32110',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PerspectiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PerspectiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PlaceholderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32161',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PlaceholderIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PlaceholderIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PolygonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32244',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PolygonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PolygonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RectangleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32289',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RectangleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RectangleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RectangleDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32369',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RectangleDashedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { RectangleDashedIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ResizeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32439',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ResizeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ResizeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RowsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32490',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RowsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RowsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RowsPlusBottomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32551',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RowsPlusBottomIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { RowsPlusBottomIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RowsPlusTopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32612',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RowsPlusTopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RowsPlusTopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RulerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32672',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RulerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RulerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScissorsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32738',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScissorsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScissorsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScribbleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32783',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScribbleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScribbleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScribbleLoopIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32828',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScribbleLoopIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScribbleLoopIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SelectionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32908',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SelectionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SelectionAllIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-32993',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionAllIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SelectionAllIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SelectionBackgroundIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33063',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionBackgroundIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SelectionBackgroundIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SelectionForegroundIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33148',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionForegroundIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SelectionForegroundIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SelectionInverseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33213',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionInverseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SelectionInverseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SelectionPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33298',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SelectionPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SelectionSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33373',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SelectionSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SelectionSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShapesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33430',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShapesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShapesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SidebarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33494',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SidebarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SidebarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SidebarSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33544',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SidebarSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SidebarSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SphereIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33599',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SphereIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SphereIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SplitHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33670',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SplitHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SplitHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SplitVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33741',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SplitVerticalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SplitVerticalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SprayBottleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33791',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SprayBottleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SprayBottleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33836',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SquareHalfIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33901',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquareHalfIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SquareHalfIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SquareHalfBottomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-33966',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquareHalfBottomIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SquareHalfBottomIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SquareSplitHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34016',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquareSplitHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SquareSplitHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SquareSplitVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34066',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquareSplitVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { SquareSplitVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SquaresFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34129',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SquaresFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SquaresFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StackIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34188',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StackIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StackIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StackMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34248',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StackMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StackMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StackPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34313',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StackPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StackPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StackSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34365',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StackSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StackSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StampIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34420',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StampIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StampIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubtractIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34481',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubtractIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SubtractIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SubtractSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34543',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SubtractSquareIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SubtractSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SwatchesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34603',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SwatchesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SwatchesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextAUnderlineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34658',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAUnderlineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { TextAUnderlineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TriangleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34703',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TriangleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TriangleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TriangleDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34773',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TriangleDashedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { TriangleDashedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UniteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34852',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UniteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UniteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UniteSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34909',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UniteSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UniteSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VignetteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-34959',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VignetteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VignetteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AmazonLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35020',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AmazonLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AmazonLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AndroidLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35085',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AndroidLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AndroidLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AngularLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35140',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AngularLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AngularLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AppStoreLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35210',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AppStoreLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AppStoreLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AppleLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35260',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AppleLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AppleLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ApplePodcastsLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35320',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ApplePodcastsLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ApplePodcastsLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BehanceLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35376',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BehanceLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BehanceLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodaLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35421',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodaLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CodaLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodepenLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35491',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodepenLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CodepenLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodesandboxLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35563',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodesandboxLogoIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CodesandboxLogoIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    DevToLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35628',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DevToLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DevToLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DiscordLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35698',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DiscordLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DiscordLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DribbbleLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35758',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DribbbleLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DribbbleLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DropboxLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35826',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DropboxLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DropboxLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FacebookLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-35881',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FacebookLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FacebookLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FediverseLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36000',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FediverseLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FediverseLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FigmaLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36067',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FigmaLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FigmaLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FramerLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36112',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FramerLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FramerLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GithubLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-36168',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GithubLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GithubLogoIcon } from '@phosphor-icons/react'"],
    }
)
