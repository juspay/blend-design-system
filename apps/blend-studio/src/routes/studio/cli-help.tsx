import { createFileRoute, Link } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2Type,
} from '@juspay/blend-design-system'
import {
    HouseIcon,
    TerminalIcon,
    CopyIcon,
    CheckCircleIcon,
    GitBranchIcon,
    SignInIcon,
    ArrowClockwiseIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'

export const Route = createFileRoute('/studio/cli-help')({
    validateSearch: (search: Record<string, unknown>) => ({
        branchId:
            typeof search.branchId === 'string' &&
            search.branchId.trim().length > 0
                ? search.branchId.trim()
                : undefined,
    }),
    component: CliHelpPage,
})

type CommandItem = {
    command: string
    description: string
}

type CommandGroup = {
    title: string
    icon: React.ComponentType<{ className?: string }>
    commands: CommandItem[]
}

const commandGroups: CommandGroup[] = [
    {
        title: 'Setup',
        icon: CheckCircleIcon,
        commands: [
            {
                command: 'blend-studio init',
                description:
                    'Initialize blend.config.json and generated token files.',
            },
            {
                command: 'blend-studio init --defaults',
                description: 'Run non-interactive setup with defaults.',
            },
            {
                command: 'blend-studio init --env staging',
                description:
                    'Initialize project using staging Studio API preset.',
            },
        ],
    },
    {
        title: 'Authentication',
        icon: SignInIcon,
        commands: [
            {
                command: 'blend-studio login --token "<TOKEN>"',
                description:
                    'Authenticate CLI with a token from the Studio user menu.',
            },
            {
                command: 'blend-studio whoami',
                description:
                    'Show current authenticated user and session status.',
            },
            {
                command: 'blend-studio logout',
                description: 'Clear current CLI session.',
            },
        ],
    },
    {
        title: 'Branch Sync',
        icon: GitBranchIcon,
        commands: [
            {
                command: 'blend-studio list',
                description: 'List branches with copyable ID for pull/push.',
            },
            {
                command: 'blend-studio pull <branch-id>',
                description:
                    'Pull latest branch config and regenerate local tokens.',
            },
            {
                command: 'blend-studio pull <branch-id> --version 1.0.4',
                description: 'Pull a specific published version.',
            },
            {
                command: 'blend-studio push <branch-id>',
                description: 'Push local brand config to Studio.',
            },
            {
                command: 'blend-studio push <branch-id> --publish --patch',
                description: 'Push and publish a new patch version.',
            },
        ],
    },
    {
        title: 'Brand & Generate',
        icon: ArrowClockwiseIcon,
        commands: [
            {
                command: 'blend-studio brand --preset blend',
                description: 'Apply preset values quickly.',
            },
            {
                command: 'blend-studio validate',
                description: 'Validate current local token config.',
            },
            {
                command: 'blend-studio diff',
                description: 'Show override difference from defaults.',
            },
            {
                command: 'blend-studio generate ./src/blend/brand.json',
                description: 'Generate tokens from local JSON file.',
            },
        ],
    },
]

const quickStart = [
    'blend-studio init --env staging',
    'blend-studio login --token "<TOKEN>"',
    'blend-studio list',
    'blend-studio pull <ID_FROM_LIST>',
]

function CliHelpPage() {
    const { branchId } = Route.useSearch()
    const branchQuickStart = branchId
        ? [
              `blend-studio pull ${branchId}`,
              `blend-studio push ${branchId}`,
              `blend-studio push ${branchId} --publish --patch`,
          ]
        : []

    return (
        <RequireAuth>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-6xl mx-auto px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <Link
                                        to="/studio"
                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        title="Back to branches"
                                    >
                                        <HouseIcon className="w-4 h-4" />
                                    </Link>
                                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-600" />
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        CLI Help
                                    </h1>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 ml-14">
                                    Clean command reference for onboarding and
                                    daily token sync.
                                </p>
                            </div>
                            <UserMenu />
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <TerminalIcon className="w-5 h-5 text-blue-600" />
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Getting Started (Recommended)
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Run these commands in your app folder. Use the
                                same format in CI with <code>pnpm exec</code>.
                            </p>
                            <div className="space-y-2">
                                {quickStart.map((cmd) => (
                                    <CommandRow
                                        key={cmd}
                                        command={`npx ${cmd}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                                Command Style
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">
                                        No install
                                    </p>
                                    <code className="text-gray-600 dark:text-gray-300">
                                        npx blend-studio &lt;command&gt;
                                    </code>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">
                                        pnpm projects
                                    </p>
                                    <code className="text-gray-600 dark:text-gray-300">
                                        pnpm exec blend-studio &lt;command&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </section>

                    {branchId ? (
                        <section className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/20 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <GitBranchIcon className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    This Branch: {branchId}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                You opened CLI Help from a branch card. Use
                                these ready commands directly in your app
                                terminal.
                            </p>
                            <div className="space-y-2">
                                {branchQuickStart.map((cmd) => (
                                    <CommandRow
                                        key={cmd}
                                        command={`npx ${cmd}`}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {commandGroups.map((group) => (
                            <div
                                key={group.title}
                                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <group.icon className="w-5 h-5 text-blue-600" />
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                        {group.title}
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {group.commands.map((item) => (
                                        <CommandRow
                                            key={item.command}
                                            command={`npx ${item.command}`}
                                            description={item.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                            Tip: Pull uses branch ID
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Use the value from <code>ID:</code> in{' '}
                            <code>blend-studio list</code>. Branch name and ID
                            can differ.
                        </p>
                        <div className="space-y-2">
                            <CommandRow command="npx blend-studio list" />
                            <CommandRow command="npx blend-studio pull <ID_FROM_LIST>" />
                        </div>
                    </section>

                    <section className="flex items-center justify-end">
                        <Link to="/studio">
                            <ButtonV2
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.SMALL}
                                text="Back to Branches"
                            />
                        </Link>
                    </section>
                </div>
            </div>
        </RequireAuth>
    )
}

function CommandRow({
    command,
    description,
}: {
    command: string
    description?: string
}) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
        } catch {
            // no-op for unsupported clipboard contexts
        }
    }

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
            <div className="flex items-start justify-between gap-3">
                <code className="text-xs md:text-sm font-mono text-gray-800 dark:text-gray-100 break-all">
                    {command}
                </code>
                <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label={`Copy command: ${command}`}
                >
                    {copied ? (
                        <>
                            <CheckCircleIcon className="w-4 h-4" />
                            Copied
                        </>
                    ) : (
                        <>
                            <CopyIcon className="w-4 h-4" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            {description ? (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            ) : null}
        </div>
    )
}
