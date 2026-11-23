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
    UserCircleCheckIcon,
    UserCircleDashedIcon,
    UserCircleGearIcon,
    UserCircleMinusIcon,
    UserCirclePlusIcon,
    UserFocusIcon,
    UserGearIcon,
    UserListIcon,
    UserMinusIcon,
    UserPlusIcon,
    UserRectangleIcon,
    UserSoundIcon,
    UserSquareIcon,
    UserSwitchIcon,
    UsersIcon,
    UsersFourIcon,
    UsersThreeIcon,
    WheelchairIcon,
    WheelchairMotionIcon,
    BinaryIcon,
    BracketsAngleIcon,
    BracketsCurlyIcon,
    BracketsRoundIcon,
    BracketsSquareIcon,
    BugIcon,
    BugBeetleIcon,
    BugDroidIcon,
    CodeIcon,
    CodeBlockIcon,
    CodeSimpleIcon,
    CpuIcon,
    DatabaseIcon,
    GitBranchIcon,
    GitCommitIcon,
    GitDiffIcon,
    GitForkIcon,
    GitMergeIcon,
    GitPullRequestIcon,
    GraphicsCardIcon,
    HeadCircuitIcon,
    MagnetIcon,
    MagnetStraightIcon,
    MarkdownLogoIcon,
    RobotIcon,
    TerminalIcon,
    TerminalWindowIcon,
    TreeStructureIcon,
    WebhooksLogoIcon,
    BiohazardIcon,
    DetectiveIcon,
    ExclamationMarkIcon,
    FalloutShelterIcon,
    FingerprintIcon,
    FingerprintSimpleIcon,
    FireExtinguisherIcon,
    InfoIcon,
    KeyIcon,
    KeyholeIcon,
    LockIcon,
    LockKeyIcon,
    LockKeyOpenIcon,
    LockLaminatedIcon,
    LockLaminatedOpenIcon,
    LockOpenIcon,
    LockSimpleIcon,
    LockSimpleOpenIcon,
    PasswordIcon,
    ProhibitIcon,
    ProhibitInsetIcon,
    QuestionIcon,
    QuestionMarkIcon,
    RadioactiveIcon,
    SealIcon,
    SealCheckIcon,
    SealPercentIcon,
    SealQuestionIcon,
    SealWarningIcon,
    SecurityCameraIcon,
    ShieldIcon,
    ShieldCheckIcon,
    ShieldCheckeredIcon,
    ShieldChevronIcon,
    ShieldPlusIcon,
    ShieldSlashIcon,
    ShieldStarIcon,
    ShieldWarningIcon,
    SirenIcon,
    VaultIcon,
    WallIcon,
    WarningIcon,
    WarningCircleIcon,
    WarningDiamondIcon,
    WarningOctagonIcon,
    BookIcon,
    BookBookmarkIcon,
    BookOpenIcon,
    BookOpenTextIcon,
    BookOpenUserIcon,
    BookmarkIcon,
    BookmarkSimpleIcon,
    BookmarksIcon,
    BookmarksSimpleIcon,
    BooksIcon,
    CertificateIcon,
    ChalkboardIcon,
    ChalkboardSimpleIcon,
    ChalkboardTeacherIcon,
    ExamIcon,
    GraduationCapIcon,
    LecternIcon,
    StudentIcon,
    VideoIcon,
} from '@phosphor-icons/react'

figma.connect(
    UserCircleCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83231',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCircleCheckIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { UserCircleCheckIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    UserCircleDashedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83301',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCircleDashedIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { UserCircleDashedIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    UserCircleGearIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83389',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCircleGearIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { UserCircleGearIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserCircleMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83449',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCircleMinusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { UserCircleMinusIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    UserCirclePlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83514',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserCirclePlusIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { UserCirclePlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserFocusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83584',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserFocusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserFocusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserGearIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83667',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserGearIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserGearIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserListIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83732',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserListIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserListIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserMinusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83787',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserMinusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserMinusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83847',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserRectangleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83902',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserRectangleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserRectangleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserSoundIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-83962',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserSoundIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserSoundIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84017',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserSquareIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UserSwitchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84087',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UserSwitchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UserSwitchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UsersIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84147',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UsersIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UsersIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UsersFourIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84220',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UsersFourIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UsersFourIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    UsersThreeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84290',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <UsersThreeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { UsersThreeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WheelchairIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84345',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WheelchairIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WheelchairIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WheelchairMotionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84400',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WheelchairMotionIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { WheelchairMotionIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BinaryIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84461',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BinaryIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BinaryIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BracketsAngleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84511',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BracketsAngleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BracketsAngleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BracketsCurlyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84561',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BracketsCurlyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BracketsCurlyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BracketsRoundIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84611',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BracketsRoundIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BracketsRoundIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BracketsSquareIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84661',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BracketsSquareIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BracketsSquareIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BugIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84746',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BugIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BugIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BugBeetleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84831',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BugBeetleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BugBeetleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BugDroidIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84901',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BugDroidIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BugDroidIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-84956',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CodeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodeBlockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodeBlockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CodeBlockIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CodeSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85061',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CodeSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CodeSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CpuIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85151',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CpuIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CpuIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DatabaseIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85206',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DatabaseIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DatabaseIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitBranchIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85271',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitBranchIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitBranchIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitCommitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85326',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitCommitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitCommitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitDiffIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85397',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitDiffIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitDiffIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitForkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85463',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitForkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitForkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitMergeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85523',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitMergeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GitMergeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GitPullRequestIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85594',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GitPullRequestIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { GitPullRequestIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GraphicsCardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85672',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GraphicsCardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GraphicsCardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    HeadCircuitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85739',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <HeadCircuitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { HeadCircuitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MagnetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85795',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MagnetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MagnetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MagnetStraightIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85851',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MagnetStraightIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { MagnetStraightIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    MarkdownLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85911',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <MarkdownLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { MarkdownLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RobotIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-85986',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RobotIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RobotIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TerminalIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86036',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TerminalIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TerminalIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TerminalWindowIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86091',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TerminalWindowIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { TerminalWindowIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    TreeStructureIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86158',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <TreeStructureIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { TreeStructureIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WebhooksLogoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86227',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WebhooksLogoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WebhooksLogoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BiohazardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86288',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BiohazardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BiohazardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    DetectiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86355',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <DetectiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { DetectiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ExclamationMarkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86405',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ExclamationMarkIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ExclamationMarkIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FalloutShelterIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86465',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FalloutShelterIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { FalloutShelterIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FingerprintIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86539',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FingerprintIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { FingerprintIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    FingerprintSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86609',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FingerprintSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FingerprintSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    FireExtinguisherIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86674',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <FireExtinguisherIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { FireExtinguisherIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    InfoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86729',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <InfoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { InfoIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KeyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86779',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <KeyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KeyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    KeyholeIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86833',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <KeyholeIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { KeyholeIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86888',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockKeyIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-86948',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockKeyIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockKeyIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockKeyOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87008',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockKeyOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockKeyOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockLaminatedIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87072',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockLaminatedIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockLaminatedIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockLaminatedOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87136',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockLaminatedOpenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { LockLaminatedOpenIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    LockOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87191',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87241',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockSimpleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LockSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LockSimpleOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87291',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LockSimpleOpenIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { LockSimpleOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    PasswordIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87386',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <PasswordIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { PasswordIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ProhibitIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87436',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ProhibitIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ProhibitIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ProhibitInsetIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87486',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ProhibitInsetIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ProhibitInsetIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    QuestionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87541',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <QuestionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { QuestionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    QuestionMarkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87591',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <QuestionMarkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { QuestionMarkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    RadioactiveIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87653',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <RadioactiveIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { RadioactiveIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SealIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87698',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SealIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SealIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SealCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87748',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SealCheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SealCheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SealPercentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87808',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SealPercentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SealPercentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SealQuestionIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87863',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SealQuestionIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SealQuestionIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SealWarningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87918',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SealWarningIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SealWarningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SecurityCameraIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-87978',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SecurityCameraIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { SecurityCameraIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88023',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldCheckIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88073',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldCheckIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldCheckIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldCheckeredIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88129',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldCheckeredIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ShieldCheckeredIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ShieldChevronIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88179',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldChevronIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldChevronIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldPlusIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88234',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldPlusIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldPlusIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldSlashIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88289',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldSlashIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldSlashIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldStarIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88359',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldStarIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldStarIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ShieldWarningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88414',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ShieldWarningIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ShieldWarningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    SirenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88484',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <SirenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { SirenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VaultIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88553',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VaultIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VaultIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WallIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88635',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WallIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WallIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WarningIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88690',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WarningIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WarningIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WarningCircleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88745',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WarningCircleIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { WarningCircleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WarningDiamondIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88800',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WarningDiamondIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { WarningDiamondIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    WarningOctagonIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88855',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <WarningOctagonIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { WarningOctagonIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88906',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookBookmarkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-88961',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookBookmarkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookBookmarkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookOpenIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89011',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookOpenIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookOpenIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookOpenTextIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89075',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookOpenTextIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookOpenTextIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookOpenUserIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89130',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookOpenUserIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookOpenUserIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookmarkIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89180',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookmarkIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookmarkIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookmarkSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89225',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookmarkSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: ["import { BookmarkSimpleIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookmarksIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89275',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookmarksIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BookmarksIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    BookmarksSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89327',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BookmarksSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { BookmarksSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    BooksIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89403',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <BooksIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { BooksIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    CertificateIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89468',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <CertificateIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { CertificateIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChalkboardIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89528',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChalkboardIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ChalkboardIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    ChalkboardSimpleIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89583',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChalkboardSimpleIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChalkboardSimpleIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ChalkboardTeacherIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89638',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ChalkboardTeacherIcon
                size={32}
                color="currentColor"
                weight={weight}
            />
        ),
        imports: [
            "import { ChalkboardTeacherIcon } from '@phosphor-icons/react'",
        ],
    }
)

figma.connect(
    ExamIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89703',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <ExamIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { ExamIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    GraduationCapIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89758',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <GraduationCapIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { GraduationCapIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    LecternIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89818',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <LecternIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { LecternIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    StudentIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89878',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <StudentIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { StudentIcon } from '@phosphor-icons/react'"],
    }
)

figma.connect(
    VideoIcon,
    'https://www.figma.com/design/HZCDeFFrwEYEYgWiXm0Mbz/Phosphor-Icons?node-id=8899-89933',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <VideoIcon size={32} color="currentColor" weight={weight} />
        ),
        imports: ["import { VideoIcon } from '@phosphor-icons/react'"],
    }
)
