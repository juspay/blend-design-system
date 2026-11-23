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
    SolarPanelIcon,
    SolarRoofIcon,
    StairsIcon,
    StoolIcon,
    StorefrontIcon,
    SunglassesIcon,
    TShirtIcon,
    TagIcon,
    TagChevronIcon,
    TagSimpleIcon,
    TeaBagIcon,
    TicketIcon,
    TipJarIcon,
    TireIcon,
    ToolboxIcon,
    ToteIcon,
    ToteSimpleIcon,
    TowelIcon,
    TractorIcon,
    TrademarkIcon,
    TrademarkRegisteredIcon,
    TruckTrailerIcon,
    WalletIcon,
    WarehouseIcon,
    WashingMachineIcon,
    WindmillIcon,
    WineIcon,
    WrenchIcon,
    YarnIcon,
    ArrowArcLeftIcon,
    ArrowArcRightIcon,
    ArrowBendDoubleUpLeftIcon,
    ArrowBendDoubleUpRightIcon,
    ArrowBendDownLeftIcon,
    ArrowBendDownRightIcon,
    ArrowBendLeftDownIcon,
    ArrowBendLeftUpIcon,
    ArrowBendRightDownIcon,
    ArrowBendRightUpIcon,
    ArrowBendUpLeftIcon,
    ArrowBendUpRightIcon,
    ArrowCircleDownIcon,
    ArrowCircleDownLeftIcon,
    ArrowCircleDownRightIcon,
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
    ArrowCircleUpIcon,
    ArrowCircleUpLeftIcon,
    ArrowCircleUpRightIcon,
    ArrowClockwiseIcon,
    ArrowCounterClockwiseIcon,
    ArrowDownIcon,
    ArrowDownLeftIcon,
    ArrowDownRightIcon,
    ArrowElbowDownLeftIcon,
    ArrowElbowDownRightIcon,
    ArrowElbowLeftIcon,
    ArrowElbowLeftDownIcon,
    ArrowElbowLeftUpIcon,
    ArrowElbowRightIcon,
    ArrowElbowRightDownIcon,
    ArrowElbowRightUpIcon,
    ArrowElbowUpLeftIcon,
    ArrowElbowUpRightIcon,
    ArrowFatDownIcon,
    ArrowFatLeftIcon,
    ArrowFatLineDownIcon,
    ArrowFatLineLeftIcon,
    ArrowFatLineRightIcon,
    ArrowFatLineUpIcon,
    ArrowFatLinesDownIcon,
    ArrowFatLinesLeftIcon,
    ArrowFatLinesRightIcon,
    ArrowFatLinesUpIcon,
    ArrowFatRightIcon,
    ArrowFatUpIcon,
    ArrowLeftIcon,
    ArrowLineDownIcon,
    ArrowLineDownLeftIcon,
    ArrowLineDownRightIcon,
    ArrowLineLeftIcon,
    ArrowLineRightIcon,
    ArrowLineUpIcon,
    ArrowLineUpLeftIcon,
    ArrowLineUpRightIcon,
    ArrowRightIcon,
    ArrowSquareDownIcon,
    ArrowSquareDownLeftIcon,
    ArrowSquareDownRightIcon,
    ArrowSquareInIcon,
    ArrowSquareLeftIcon,
    ArrowSquareOutIcon,
    ArrowSquareRightIcon,
    ArrowSquareUpIcon,
    ArrowSquareUpLeftIcon,
    ArrowSquareUpRightIcon,
    ArrowUDownLeftIcon,
    ArrowUDownRightIcon,
    ArrowULeftDownIcon,
    ArrowULeftUpIcon,
    ArrowURightDownIcon,
    ArrowURightUpIcon,
    ArrowUUpLeftIcon,
    ArrowUUpRightIcon,
    ArrowUpIcon,
    ArrowUpLeftIcon,
    ArrowUpRightIcon,
    ArrowsClockwiseIcon,
    ArrowsCounterClockwiseIcon,
    ArrowsDownUpIcon,
    ArrowsHorizontalIcon,
    ArrowsInIcon,
    ArrowsInCardinalIcon,
    ArrowsInLineHorizontalIcon,
    ArrowsInLineVerticalIcon,
    ArrowsInSimpleIcon,
    ArrowsLeftRightIcon,
    ArrowsMergeIcon,
    ArrowsOutIcon,
    ArrowsOutCardinalIcon,
    ArrowsOutLineHorizontalIcon,
    ArrowsOutLineVerticalIcon,
    ArrowsOutSimpleIcon,
    ArrowsSplitIcon,
    ArrowsVerticalIcon,
    CaretCircleDoubleDownIcon,
    CaretCircleDoubleLeftIcon,
    CaretCircleDoubleRightIcon,
    CaretCircleDoubleUpIcon,
    CaretCircleDownIcon,
    CaretCircleLeftIcon,
    CaretCircleRightIcon,
    CaretCircleUpIcon,
    CaretCircleUpDownIcon,
    CaretDoubleDownIcon,
    CaretDoubleLeftIcon,
    CaretDoubleRightIcon,
    CaretDoubleUpIcon,
    CaretDownIcon,
    CaretLeftIcon,
    CaretLineDownIcon,
    CaretLineLeftIcon,
    CaretLineRightIcon,
    CaretLineUpIcon,
    CaretRightIcon,
    CaretUpIcon,
    CaretUpDownIcon,
    RecycleIcon,
    VectorThreeIcon,
    VectorTwoIcon,
    BabyIcon,
    EyesIcon,
    FootprintsIcon,
    GenderFemaleIcon,
    GenderIntersexIcon,
    GenderMaleIcon,
    GenderNeuterIcon,
    GenderNonbinaryIcon,
    GenderTransgenderIcon,
    HandIcon,
    HandArrowDownIcon,
    HandArrowUpIcon,
    HandDepositIcon,
    HandEyeIcon,
    HandFistIcon,
    HandGrabbingIcon,
    HandPalmIcon,
    HandPeaceIcon,
    HandPointingIcon,
    HandWavingIcon,
    HandWithdrawIcon,
    HandsClappingIcon,
    HandsPrayingIcon,
    HandshakeIcon,
    IdentificationBadgeIcon,
    IdentificationCardIcon,
    PersonIcon,
    PersonArmsSpreadIcon,
    PersonSimpleIcon,
    PersonSimpleBikeIcon,
    PersonSimpleCircleIcon,
    PersonSimpleHikeIcon,
    PersonSimpleRunIcon,
    PersonSimpleSwimIcon,
    PersonSimpleTaiChiIcon,
    PersonSimpleThrowIcon,
    PersonSimpleWalkIcon,
    SmileyIcon,
    SmileyAngryIcon,
    SmileyBlankIcon,
    SmileyMehIcon,
    SmileyMeltingIcon,
    SmileyNervousIcon,
    SmileySadIcon,
    SmileyStickerIcon,
    SmileyWinkIcon,
    SmileyXEyesIcon,
    UserIcon,
    UserCheckIcon,
    UserCircleIcon,
} from '@phosphor-icons/react'

figma.connect(
    SolarPanelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71978',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SolarPanelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SolarPanelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SolarRoofIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72048',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SolarRoofIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SolarRoofIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StairsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72108',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StairsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StairsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StoolIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72168',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StoolIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StoolIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StorefrontIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72235',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StorefrontIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StorefrontIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SunglassesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72301',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SunglassesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SunglassesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TShirtIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72357',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TShirtIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TShirtIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72407',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TagChevronIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72452',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TagChevronIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TagChevronIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TagSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72497',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TagSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TagSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TeaBagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72547',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TeaBagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TeaBagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TicketIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72597',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TicketIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TicketIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TipJarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72671',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TipJarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TipJarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TireIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72737',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TireIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TireIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToolboxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72802',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ToolboxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToolboxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72852',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ToteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ToteSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72902',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ToteSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ToteSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TowelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-72952',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TowelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TowelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TractorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73038',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TractorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TractorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrademarkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73098',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrademarkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrademarkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrademarkRegisteredIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73153',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrademarkRegisteredIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TrademarkRegisteredIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TruckTrailerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73224',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TruckTrailerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TruckTrailerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WalletIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73274',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WalletIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WalletIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WarehouseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73344',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WarehouseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WarehouseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WashingMachineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73409',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WashingMachineIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { WashingMachineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WindmillIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73474',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WindmillIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WindmillIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73534',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WrenchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73580',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WrenchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WrenchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    YarnIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73660',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <YarnIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { YarnIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowArcLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73711',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowArcLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowArcLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowArcRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73761',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowArcRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowArcRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowBendDoubleUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73816',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendDoubleUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendDoubleUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendDoubleUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73871',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendDoubleUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendDoubleUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73921',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendDownLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-73971',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendLeftDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74021',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendLeftDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendLeftDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendLeftUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74071',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendLeftUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendLeftUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendRightDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74121',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendRightDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendRightDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendRightUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74171',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendRightUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendRightUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74221',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowBendUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74271',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowBendUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowBendUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74326',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74381',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleDownLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74436',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74491',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74546',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74601',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowCircleUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowCircleUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74656',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowCircleUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74711',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCircleUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCircleUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74761',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowClockwiseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowCounterClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74811',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowCounterClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74861',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74911',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowDownLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowDownLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-74961',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowDownRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowElbowDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowDownLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75061',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75111',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowElbowLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowElbowLeftDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75161',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowLeftDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowLeftDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowLeftUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75211',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowLeftUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowLeftUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75261',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowRightDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75311',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowRightDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowRightDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowRightUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75361',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowRightUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowRightUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75412',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowElbowUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75462',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowElbowUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowElbowUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75507',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowFatDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowFatLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75552',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowFatLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowFatLineDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75602',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLineDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLineDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLineLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75652',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLineLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLineLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLineRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75702',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLineRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLineRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLineUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75752',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLineUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowFatLineUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowFatLinesDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75807',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLinesDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLinesDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLinesLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75862',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLinesLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLinesLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLinesRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75917',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLinesRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLinesRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatLinesUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-75972',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatLinesUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowFatLinesUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowFatRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76017',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowFatRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowFatUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76062',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowFatUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowFatUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76112',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLineDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76167',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowLineDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLineDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76222',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowLineDownLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowLineDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76277',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowLineDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowLineLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76332',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowLineLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLineRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76387',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowLineRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLineUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76442',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowLineUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowLineUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76497',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowLineUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowLineUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76552',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowLineUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowLineUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76602',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowSquareDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76657',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76712',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareDownLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76767',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareInIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76822',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareInIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowSquareInIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowSquareLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76877',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareOutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76932',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareOutIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowSquareOutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowSquareRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-76987',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77042',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowSquareUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowSquareUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77097',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareUpLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareUpLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowSquareUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77152',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowSquareUpRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowSquareUpRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowUDownLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77202',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUDownLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowUDownLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUDownRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77252',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUDownRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowUDownRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowULeftDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77302',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowULeftDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowULeftDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowULeftUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77352',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowULeftUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowULeftUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowURightDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77402',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowURightDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowURightDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowURightUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77452',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowURightUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowURightUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77502',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUUpLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowUUpLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77552',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUUpRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowUUpRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77602',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUpLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77652',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUpLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowUpLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowUpRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77702',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowUpRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowUpRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77762',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsClockwiseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsCounterClockwiseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77822',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsCounterClockwiseIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsDownUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77882',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsDownUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowsDownUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-77937',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsInIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78017',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsInIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowsInIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsInCardinalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78097',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsInCardinalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsInCardinalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsInLineHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78162',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsInLineHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsInLineHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsInLineVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78227',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsInLineVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsInLineVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsInSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78287',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsInSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowsInSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsLeftRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78347',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsLeftRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsLeftRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsMergeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78402',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsMergeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowsMergeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsOutIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78482',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsOutIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowsOutIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsOutCardinalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78562',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsOutCardinalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsOutCardinalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsOutLineHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78627',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsOutLineHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsOutLineHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsOutLineVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78692',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsOutLineVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsOutLineVerticalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsOutSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78752',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsOutSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ArrowsOutSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ArrowsSplitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78812',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsSplitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArrowsSplitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArrowsVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78867',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArrowsVerticalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { ArrowsVerticalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretCircleDoubleDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78922',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleDoubleDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleDoubleDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleDoubleLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-78977',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleDoubleLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleDoubleLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleDoubleRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79032',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleDoubleRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleDoubleRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleDoubleUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79087',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleDoubleUpIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleDoubleUpIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79137',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79187',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79237',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretCircleUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79287',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretCircleUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretCircleUpDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79342',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretCircleUpDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretCircleUpDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretDoubleDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79392',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretDoubleDownIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretDoubleDownIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretDoubleLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79442',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretDoubleLeftIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretDoubleLeftIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretDoubleRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79492',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretDoubleRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CaretDoubleRightIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CaretDoubleUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79542',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretDoubleUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretDoubleUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79587',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79632',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretLineDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79682',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretLineDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretLineDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretLineLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79732',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretLineLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretLineLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretLineRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79782',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretLineRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CaretLineRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretLineUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79832',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretLineUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretLineUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79877',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretRightIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79922',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CaretUpDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-79973',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CaretUpDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CaretUpDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RecycleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80043',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RecycleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RecycleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VectorThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80108',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VectorThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VectorThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VectorTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80163',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VectorTwoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VectorTwoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BabyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80229',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BabyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BabyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80290',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FootprintsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80353',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FootprintsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FootprintsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GenderFemaleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80408',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderFemaleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GenderFemaleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GenderIntersexIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80473',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderIntersexIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { GenderIntersexIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GenderMaleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80528',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderMaleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GenderMaleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GenderNeuterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80578',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderNeuterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GenderNeuterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GenderNonbinaryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80638',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderNonbinaryIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GenderNonbinaryIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    GenderTransgenderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80698',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GenderTransgenderIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { GenderTransgenderIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    HandIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80748',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80808',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandArrowDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80868',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandDepositIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80933',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandDepositIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandDepositIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandEyeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-80998',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandEyeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandEyeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandFistIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81053',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandFistIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandFistIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandGrabbingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81108',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandGrabbingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandGrabbingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandPalmIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81163',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandPalmIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandPalmIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandPeaceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81228',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandPeaceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandPeaceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandPointingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81273',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandPointingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandPointingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandWavingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81338',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandWavingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandWavingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandWithdrawIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81403',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandWithdrawIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandWithdrawIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandsClappingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81485',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandsClappingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandsClappingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandsPrayingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81546',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandsPrayingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandsPrayingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandshakeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81616',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandshakeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandshakeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    IdentificationBadgeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81676',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IdentificationBadgeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { IdentificationBadgeIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    IdentificationCardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81741',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IdentificationCardIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { IdentificationCardIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81792',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PersonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PersonArmsSpreadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81843',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonArmsSpreadIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonArmsSpreadIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81903',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PersonSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PersonSimpleBikeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-81964',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleBikeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleBikeIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82029',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleCircleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleCircleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleHikeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82090',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleHikeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleHikeIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleRunIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82150',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleRunIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleRunIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleSwimIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82216',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleSwimIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleSwimIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleTaiChiIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82276',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleTaiChiIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleTaiChiIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleThrowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82341',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleThrowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleThrowIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PersonSimpleWalkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82401',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PersonSimpleWalkIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PersonSimpleWalkIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    SmileyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82461',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyAngryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82526',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyAngryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyAngryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyBlankIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82581',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyBlankIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyBlankIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyMehIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82641',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyMehIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyMehIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyMeltingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82701',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyMeltingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyMeltingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyNervousIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82761',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyNervousIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyNervousIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileySadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82821',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileySadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileySadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyStickerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82881',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyStickerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyStickerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyWinkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-82941',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyWinkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyWinkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SmileyXEyesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SmileyXEyesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SmileyXEyesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83061',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83116',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserCheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83171',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserCircleIcon } from '@phosphor-icons/react'"],
    }
)
