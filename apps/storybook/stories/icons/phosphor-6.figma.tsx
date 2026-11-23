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
    ListBulletsIcon,
    ListChecksIcon,
    ListDashesIcon,
    ListNumbersIcon,
    ListPlusIcon,
    NoteIcon,
    NoteBlankIcon,
    NotePencilIcon,
    NotebookIcon,
    NotepadIcon,
    PaperclipIcon,
    PaperclipHorizontalIcon,
    ParagraphIcon,
    PresentationIcon,
    PresentationChartIcon,
    PrinterIcon,
    ProjectorScreenIcon,
    ProjectorScreenChartIcon,
    PushPinIcon,
    PushPinSimpleIcon,
    PushPinSimpleSlashIcon,
    PushPinSlashIcon,
    SortAscendingIcon,
    SortDescendingIcon,
    TextAaIcon,
    TextAlignCenterIcon,
    TextAlignJustifyIcon,
    TextAlignLeftIcon,
    TextAlignRightIcon,
    TextBIcon,
    TextColumnsIcon,
    TextHIcon,
    TextHFiveIcon,
    TextHFourIcon,
    TextHOneIcon,
    TextHSixIcon,
    TextHThreeIcon,
    TextHTwoIcon,
    TextIndentIcon,
    TextItalicIcon,
    TextOutdentIcon,
    TextStrikethroughIcon,
    TextSubscriptIcon,
    TextSuperscriptIcon,
    TextTIcon,
    TextTSlashIcon,
    TextUnderlineIcon,
    TextboxIcon,
    TrashIcon,
    TrashSimpleIcon,
    TrayIcon,
    TrayArrowDownIcon,
    TrayArrowUpIcon,
    ArmchairIcon,
    AvocadoIcon,
    AxeIcon,
    BabyCarriageIcon,
    BackpackIcon,
    BagIcon,
    BagSimpleIcon,
    BalloonIcon,
    BarcodeIcon,
    BarnIcon,
    BaseballCapIcon,
    BasketIcon,
    BathtubIcon,
    BeanieIcon,
    BeerBottleIcon,
    BeerSteinIcon,
    BeltIcon,
    BinocularsIcon,
    BootIcon,
    BowlFoodIcon,
    BowlSteamIcon,
    BrandyIcon,
    BreadIcon,
    BridgeIcon,
    BroomIcon,
    BuildingIcon,
    BuildingApartmentIcon,
    BuildingOfficeIcon,
    BuildingsIcon,
    BulldozerIcon,
    CakeIcon,
    CallBellIcon,
    CarBatteryIcon,
    CardholderIcon,
    CarrotIcon,
    CashRegisterIcon,
    ChairIcon,
    ChampagneIcon,
    CheersIcon,
    CheeseIcon,
    ChefHatIcon,
    CherriesIcon,
    CigaretteIcon,
    CigaretteSlashIcon,
    CityIcon,
    CoatHangerIcon,
    CoffeeIcon,
    CoffeeBeanIcon,
    CoinIcon,
    CoinVerticalIcon,
    CoinsIcon,
    ContactlessPaymentIcon,
    CookieIcon,
    CookingPotIcon,
    CouchIcon,
    CowboyHatIcon,
    CraneIcon,
    CraneTowerIcon,
    CreditCardIcon,
    CurrencyBtcIcon,
    CurrencyCircleDollarIcon,
    CurrencyCnyIcon,
    CurrencyDollarIcon,
    CurrencyDollarSimpleIcon,
    CurrencyEthIcon,
    CurrencyEurIcon,
    CurrencyGbpIcon,
    CurrencyInrIcon,
    CurrencyJpyIcon,
    CurrencyKrwIcon,
    CurrencyKztIcon,
    CurrencyNgnIcon,
    CurrencyRubIcon,
    DeskIcon,
    DoorIcon,
    DoorOpenIcon,
    DressIcon,
    DresserIcon,
    EggIcon,
    EggCrackIcon,
    EyeglassesIcon,
    FactoryIcon,
    FanIcon,
    FarmIcon,
    ForkKnifeIcon,
    GarageIcon,
    GavelIcon,
    GiftIcon,
    GrainsIcon,
    GrainsSlashIcon,
    HairDryerIcon,
    HamburgerIcon,
    HammerIcon,
    HandCoinsIcon,
    HandbagIcon,
    HandbagSimpleIcon,
    HardHatIcon,
    HighHeelIcon,
    HoodieIcon,
    IceCreamIcon,
    InvoiceIcon,
    JarIcon,
    JarLabelIcon,
    KnifeIcon,
    LadderIcon,
    LadderSimpleIcon,
    LampIcon,
    LampPendantIcon,
    MartiniIcon,
    MoneyIcon,
    MoneyWavyIcon,
    NeedleIcon,
    NuclearPlantIcon,
    OfficeChairIcon,
    OnigiriIcon,
    OrangeIcon,
    OrangeSliceIcon,
    OvenIcon,
    PackageIcon,
    PantsIcon,
    PepperIcon,
    PicnicTableIcon,
    PiggyBankIcon,
    PintGlassIcon,
    PipeIcon,
    PipeWrenchIcon,
    PixLogoIcon,
    PizzaIcon,
    PopcornIcon,
    PopsicleIcon,
    PottedPlantIcon,
    ReceiptIcon,
    ReceiptXIcon,
    RugIcon,
    ScalesIcon,
    ScrewdriverIcon,
    SeatbeltIcon,
    ShirtFoldedIcon,
    ShoppingBagIcon,
    ShoppingBagOpenIcon,
    ShoppingCartIcon,
    ShoppingCartSimpleIcon,
    ShovelIcon,
    ShowerIcon,
    SneakerIcon,
    SneakerMoveIcon,
    SockIcon,
} from '@phosphor-icons/react'

figma.connect(
    ListBulletsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59494',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListBulletsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListBulletsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListChecksIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59564',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListChecksIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListChecksIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListDashesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59634',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListDashesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListDashesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListNumbersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59699',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListNumbersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListNumbersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ListPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59764',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ListPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ListPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NoteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59828',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NoteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NoteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NoteBlankIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59878',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NoteBlankIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NoteBlankIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotePencilIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59933',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotePencilIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotePencilIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotebookIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-59993',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotebookIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotebookIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NotepadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60063',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NotepadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NotepadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaperclipIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60108',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaperclipIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PaperclipIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PaperclipHorizontalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60153',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PaperclipHorizontalIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PaperclipHorizontalIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ParagraphIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60208',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ParagraphIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ParagraphIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PresentationIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60268',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PresentationIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PresentationIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PresentationChartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60343',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PresentationChartIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PresentationChartIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PrinterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60403',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PrinterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PrinterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ProjectorScreenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60473',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ProjectorScreenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ProjectorScreenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ProjectorScreenChartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60558',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ProjectorScreenChartIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ProjectorScreenChartIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PushPinIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60608',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PushPinIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PushPinIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PushPinSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60673',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PushPinSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PushPinSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PushPinSimpleSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60743',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PushPinSimpleSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { PushPinSimpleSlashIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    PushPinSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60803',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PushPinSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PushPinSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SortAscendingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60868',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SortAscendingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SortAscendingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SortDescendingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60933',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SortDescendingIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SortDescendingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextAaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-60994',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextAaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextAlignCenterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61054',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAlignCenterIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TextAlignCenterIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TextAlignJustifyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61114',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAlignJustifyIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TextAlignJustifyIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TextAlignLeftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61174',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAlignLeftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextAlignLeftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextAlignRightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextAlignRightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { TextAlignRightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextBIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61279',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextBIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextBIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextColumnsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61359',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextColumnsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextColumnsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61414',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHFiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61474',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHFiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHFiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61534',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHOneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61594',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHOneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHOneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHSixIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61659',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHSixIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHSixIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61719',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextHTwoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61779',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextHTwoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextHTwoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextIndentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61839',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextIndentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextIndentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextItalicIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61894',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextItalicIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextItalicIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextOutdentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-61954',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextOutdentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextOutdentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextStrikethroughIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62009',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextStrikethroughIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TextStrikethroughIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TextSubscriptIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62064',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextSubscriptIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextSubscriptIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextSuperscriptIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62119',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextSuperscriptIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { TextSuperscriptIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    TextTIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62174',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextTIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextTIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextTSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62244',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextTSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextTSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextUnderlineIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62294',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextUnderlineIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextUnderlineIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TextboxIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62359',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TextboxIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TextboxIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62424',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrashSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62479',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrashSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrashSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrayIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62529',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrayIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrayIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrayArrowDownIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62589',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrayArrowDownIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrayArrowDownIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TrayArrowUpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62649',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TrayArrowUpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TrayArrowUpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ArmchairIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62705',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ArmchairIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ArmchairIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AvocadoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62755',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AvocadoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AvocadoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    AxeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62810',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <AxeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { AxeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BabyCarriageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62880',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BabyCarriageIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BabyCarriageIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BackpackIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62949',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BackpackIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BackpackIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-62999',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BagSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63049',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BagSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BagSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BalloonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63104',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BalloonIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BalloonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BarcodeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BarcodeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BarcodeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BarnIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63262',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BarnIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BarnIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BaseballCapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63317',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BaseballCapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BaseballCapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BasketIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63382',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BasketIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BasketIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BathtubIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63447',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BathtubIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BathtubIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BeanieIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63517',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BeanieIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BeanieIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BeerBottleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63577',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BeerBottleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BeerBottleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BeerSteinIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63642',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BeerSteinIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BeerSteinIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BeltIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63718',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BeltIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BeltIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BinocularsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63784',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BinocularsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BinocularsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BootIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63843',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BootIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BootIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BowlFoodIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63903',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BowlFoodIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BowlFoodIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BowlSteamIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-63963',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BowlSteamIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BowlSteamIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BrandyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64023',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BrandyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BrandyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BreadIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64083',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BreadIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BreadIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BridgeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64153',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BridgeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BridgeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BroomIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64208',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BroomIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BroomIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BuildingIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64303',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BuildingIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BuildingIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BuildingApartmentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64396',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BuildingApartmentIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BuildingApartmentIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BuildingOfficeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64491',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BuildingOfficeIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BuildingOfficeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BuildingsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64566',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BuildingsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BuildingsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BulldozerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64635',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BulldozerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BulldozerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CakeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64696',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CakeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CakeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CallBellIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64761',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CallBellIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CallBellIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CarBatteryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64831',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CarBatteryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CarBatteryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CardholderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64885',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CardholderIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CardholderIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CarrotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-64955',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CarrotIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CarrotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CashRegisterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65037',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CashRegisterIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CashRegisterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChairIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65108',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChairIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChairIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChampagneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChampagneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChampagneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65284',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CheersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CheeseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65344',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CheeseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CheeseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChefHatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65414',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChefHatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChefHatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CherriesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65479',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CherriesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CherriesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CigaretteIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65539',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CigaretteIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CigaretteIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CigaretteSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65609',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CigaretteSlashIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CigaretteSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CityIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65699',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CityIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CityIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoatHangerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65744',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoatHangerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoatHangerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoffeeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65814',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoffeeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoffeeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoffeeBeanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65864',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoffeeBeanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoffeeBeanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoinIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65929',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoinIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoinIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoinVerticalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-65994',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoinVerticalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoinVerticalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CoinsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66070',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CoinsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CoinsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ContactlessPaymentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66129',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ContactlessPaymentIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ContactlessPaymentIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CookieIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66194',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CookieIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CookieIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CookingPotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66264',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CookingPotIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CookingPotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CouchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66329',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CouchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CouchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CowboyHatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66384',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CowboyHatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CowboyHatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CraneIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66444',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CraneIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CraneIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CraneTowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66511',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CraneTowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CraneTowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CreditCardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66571',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CreditCardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CreditCardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyBtcIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66646',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyBtcIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyBtcIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyCircleDollarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66706',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyCircleDollarIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CurrencyCircleDollarIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CurrencyCnyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66766',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyCnyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyCnyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyDollarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66817',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyDollarIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { CurrencyDollarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyDollarSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66873',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyDollarSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { CurrencyDollarSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    CurrencyEthIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66928',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyEthIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyEthIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyEurIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-66983',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyEurIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyEurIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyGbpIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67033',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyGbpIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyGbpIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyInrIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67088',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyInrIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyInrIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyJpyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67148',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyJpyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyJpyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyKrwIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67198',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyKrwIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyKrwIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyKztIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67253',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyKztIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyKztIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyNgnIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67307',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyNgnIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyNgnIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CurrencyRubIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67357',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CurrencyRubIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CurrencyRubIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DeskIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67432',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DeskIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DeskIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DoorIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67487',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DoorIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DoorIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DoorOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67547',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DoorOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DoorOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DressIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67607',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DressIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DressIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DresserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67675',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DresserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DresserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EggIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67720',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EggIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EggIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EggCrackIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67770',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EggCrackIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EggCrackIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    EyeglassesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67836',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <EyeglassesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { EyeglassesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FactoryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67901',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FactoryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FactoryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FanIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-67963',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FanIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FanIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FarmIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68043',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FarmIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FarmIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ForkKnifeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68103',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ForkKnifeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ForkKnifeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GarageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68168',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GarageIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GarageIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GavelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GavelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GavelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GiftIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68299',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GiftIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GiftIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GrainsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68364',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GrainsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GrainsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GrainsSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68439',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GrainsSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GrainsSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HairDryerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68499',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HairDryerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HairDryerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HamburgerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68560',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HamburgerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HamburgerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HammerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68616',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HammerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HammerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandCoinsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68677',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandCoinsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandCoinsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandbagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68727',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandbagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandbagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HandbagSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68777',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HandbagSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HandbagSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HardHatIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68838',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HardHatIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HardHatIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HighHeelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68889',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HighHeelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HighHeelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HoodieIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-68949',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HoodieIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HoodieIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    IceCreamIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69008',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <IceCreamIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { IceCreamIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    InvoiceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69083',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <InvoiceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { InvoiceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    JarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69142',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <JarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { JarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    JarLabelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69211',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <JarLabelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { JarLabelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KnifeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69256',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <KnifeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KnifeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LadderIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69336',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LadderIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LadderIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LadderSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69401',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LadderSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LadderSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LampIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69461',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LampIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LampIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LampPendantIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69516',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LampPendantIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LampPendantIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MartiniIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69576',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MartiniIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MartiniIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MoneyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69650',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MoneyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MoneyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MoneyWavyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69710',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MoneyWavyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MoneyWavyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NeedleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69759',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NeedleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NeedleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    NuclearPlantIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69824',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <NuclearPlantIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { NuclearPlantIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OfficeChairIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69884',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OfficeChairIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OfficeChairIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OnigiriIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69934',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OnigiriIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OnigiriIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OrangeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-69994',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OrangeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OrangeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OrangeSliceIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70058',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OrangeSliceIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OrangeSliceIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    OvenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70123',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <OvenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { OvenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PackageIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70183',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PackageIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PackageIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PantsIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70248',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PantsIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PantsIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PepperIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70303',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PepperIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PepperIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PicnicTableIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70363',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PicnicTableIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PicnicTableIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PiggyBankIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70428',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PiggyBankIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PiggyBankIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PintGlassIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70478',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PintGlassIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PintGlassIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PipeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70558',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PipeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PipeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PipeWrenchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70613',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PipeWrenchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PipeWrenchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PixLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70668',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PixLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PixLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PizzaIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70728',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PizzaIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PizzaIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PopcornIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70789',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PopcornIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PopcornIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PopsicleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70849',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PopsicleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PopsicleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PottedPlantIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70919',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PottedPlantIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PottedPlantIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ReceiptIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-70974',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ReceiptIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ReceiptIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ReceiptXIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71029',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ReceiptXIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ReceiptXIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RugIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71119',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RugIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RugIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScalesIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71185',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScalesIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScalesIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ScrewdriverIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71241',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ScrewdriverIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ScrewdriverIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SeatbeltIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71302',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SeatbeltIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SeatbeltIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShirtFoldedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71369',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShirtFoldedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShirtFoldedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShoppingBagIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71419',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShoppingBagIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShoppingBagIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShoppingBagOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71474',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShoppingBagOpenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ShoppingBagOpenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ShoppingCartIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71534',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShoppingCartIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShoppingCartIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShoppingCartSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71589',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShoppingCartSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ShoppingCartSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ShovelIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71644',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShovelIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShovelIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShowerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71709',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShowerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShowerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SneakerIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71773',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SneakerIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SneakerIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SneakerMoveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71833',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SneakerMoveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SneakerMoveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-71889',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SockIcon } from '@phosphor-icons/react'"],
    }
)
