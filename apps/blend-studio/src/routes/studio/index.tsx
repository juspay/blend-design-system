import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import {
    useBranchesWithMock,
    useCreateBranchWithMock,
    useDeleteBranchWithMock,
    useForkBranchWithMock,
} from '@/frontend/hooks/use-studio'
import {
    listPresets,
    getPreset,
    type BrandConfig,
    type Branch,
} from '@blend-design/token-engine'
import { useState, useCallback } from 'react'
import {
    GitBranch,
    Plus,
    Eye,
    MagnifyingGlass,
    PencilSimple,
    Trash,
    GitFork,
    DotsThreeVertical,
    Clock,
    Tag,
    CheckCircle,
    WarningCircle,
    Package,
    X,
    Question,
    Terminal,
    House,
    Palette,
    Sparkle,
} from '@phosphor-icons/react'
import {
    useOnboarding,
    WelcomeOnboarding,
} from '@/components/studio/WelcomeOnboarding'
import { featureFlags } from '@/lib/feature-flags'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Variant,
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    SearchInput,
} from '@juspay/blend-design-system'

export const Route = createFileRoute('/studio/')({
    component: StudioPage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type StatusFilter = 'all' | 'draft' | 'published' | 'archived'

type ModalState =
    | { type: 'none' }
    | { type: 'create' }
    | { type: 'fork'; branch: Branch }
    | { type: 'delete'; branch: Branch }

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

function StudioPage() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [modal, setModal] = useState<ModalState>({ type: 'none' })
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [showGuide, setShowGuide] = useState(false)
    const { isComplete: onboardingComplete, complete: completeOnboarding } =
        useOnboarding()
    const flags = featureFlags.get()

    // Fetch ALL branches (unfiltered) for counting
    const {
        branches: allBranches,
        loading,
        error,
        refetch,
    } = useBranchesWithMock(
        searchQuery
            ? {
                  filters: {
                      search: searchQuery || undefined,
                  },
              }
            : undefined
    )

    // Apply status filter client-side so tab counts remain correct
    const branches =
        statusFilter === 'all'
            ? allBranches
            : allBranches.filter((b) => b.status === statusFilter)

    const { createBranch, loading: creating } = useCreateBranchWithMock()
    const { deleteBranch, loading: deleting } = useDeleteBranchWithMock()
    const { forkBranch, loading: forking } = useForkBranchWithMock()

    const handleDelete = useCallback(
        async (branch: Branch) => {
            await deleteBranch(branch.id)
            setModal({ type: 'none' })
            refetch()
        },
        [deleteBranch, refetch]
    )

    const statusCounts = {
        all: allBranches.length,
        draft: allBranches.filter((b) => b.status === 'draft').length,
        published: allBranches.filter((b) => b.status === 'published').length,
        archived: allBranches.filter((b) => b.status === 'archived').length,
    }

    return (
        <RequireAuth>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                {!onboardingComplete && (
                    <WelcomeOnboarding onComplete={completeOnboarding} />
                )}

                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="max-w-7xl mx-auto px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <Link
                                        to="/"
                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        title="Back to home"
                                    >
                                        <House className="w-4 h-4" />
                                    </Link>
                                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-600" />
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Branches
                                    </h1>
                                    {flags.useMockData && (
                                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                                            Demo Mode
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 ml-[72px]">
                                    Each branch is a versioned brand
                                    configuration. Edit tokens, preview live,
                                    publish, then pull into your project.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.SMALL}
                                    leftSlot={{
                                        slot: <Question className="w-4 h-4" />,
                                    }}
                                    text="Quick Guide"
                                    onClick={() => setShowGuide(!showGuide)}
                                />
                                <ButtonV2
                                    buttonType={ButtonV2Type.PRIMARY}
                                    size={ButtonV2Size.SMALL}
                                    leftSlot={{
                                        slot: <Plus className="w-4 h-4" />,
                                    }}
                                    text="New Branch"
                                    onClick={() => setModal({ type: 'create' })}
                                />
                                <UserMenu />
                            </div>
                        </div>

                        {/* Quick Guide Panel */}
                        {showGuide && (
                            <QuickGuidePanel
                                onClose={() => setShowGuide(false)}
                            />
                        )}

                        {/* Search & Filter Bar */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex-1">
                                <SearchInput
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onClear={() => setSearchQuery('')}
                                    placeholder="Search branches by name..."
                                    leftSlot={
                                        <MagnifyingGlass className="w-4 h-4" />
                                    }
                                />
                            </div>

                            <TabsV2
                                value={statusFilter}
                                onValueChange={(v) =>
                                    setStatusFilter(v as StatusFilter)
                                }
                                variant={TabsV2Variant.BOXED}
                            >
                                <TabsV2List>
                                    {(
                                        [
                                            'all',
                                            'draft',
                                            'published',
                                            'archived',
                                        ] as StatusFilter[]
                                    ).map((s) => (
                                        <TabsV2Trigger key={s} value={s}>
                                            {`${s} (${statusCounts[s]})`}
                                        </TabsV2Trigger>
                                    ))}
                                </TabsV2List>
                            </TabsV2>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <WarningCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-red-800">
                                    Error loading branches
                                </p>
                                <p className="text-xs text-red-600 mt-0.5">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
                                >
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                                    <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
                                    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                    <div className="h-3 bg-gray-100 rounded w-4/5" />
                                </div>
                            ))}
                        </div>
                    ) : branches.length === 0 ? (
                        <EmptyState
                            hasSearch={!!searchQuery}
                            onCreate={() => setModal({ type: 'create' })}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {branches.map((branch) => (
                                <BranchCard
                                    key={branch.id}
                                    branch={branch}
                                    menuOpen={openMenu === branch.id}
                                    onMenuToggle={() =>
                                        setOpenMenu((prev) =>
                                            prev === branch.id
                                                ? null
                                                : branch.id
                                        )
                                    }
                                    onMenuClose={() => setOpenMenu(null)}
                                    onEdit={() => {
                                        setOpenMenu(null)
                                        navigate({
                                            to: '/studio/editor/$branchId',
                                            params: { branchId: branch.id },
                                        })
                                    }}
                                    onFork={() => {
                                        setOpenMenu(null)
                                        setModal({ type: 'fork', branch })
                                    }}
                                    onDelete={() => {
                                        setOpenMenu(null)
                                        setModal({ type: 'delete', branch })
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {modal.type === 'create' && (
                    <CreateBranchModal
                        onClose={() => setModal({ type: 'none' })}
                        onCreate={async (input) => {
                            const branch = await createBranch(input)
                            if (branch) {
                                setModal({ type: 'none' })
                                refetch()
                                navigate({
                                    to: '/studio/editor/$branchId',
                                    params: { branchId: branch.id },
                                })
                            }
                        }}
                        loading={creating}
                    />
                )}

                {modal.type === 'fork' && (
                    <ForkBranchModal
                        source={modal.branch}
                        onClose={() => setModal({ type: 'none' })}
                        onFork={async (name, slug) => {
                            const branch = await forkBranch(
                                modal.branch.id,
                                name,
                                slug
                            )
                            if (branch) {
                                setModal({ type: 'none' })
                                refetch()
                                navigate({
                                    to: '/studio/editor/$branchId',
                                    params: { branchId: branch.id },
                                })
                            }
                        }}
                        loading={forking}
                    />
                )}

                {modal.type === 'delete' && (
                    <DeleteConfirmModal
                        branch={modal.branch}
                        onClose={() => setModal({ type: 'none' })}
                        onConfirm={() => handleDelete(modal.branch)}
                        loading={deleting}
                    />
                )}

                {openMenu && (
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenu(null)}
                    />
                )}
            </div>
        </RequireAuth>
    )
}

// ---------------------------------------------------------------------------
// Quick Guide Panel
// ---------------------------------------------------------------------------

function QuickGuidePanel({ onClose }: { onClose: () => void }) {
    const [activeGuide, setActiveGuide] = useState<
        'getting-started' | 'dark-theme'
    >('getting-started')

    return (
        <div className="mt-4 p-5 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-blue-900">
                        How Token Studio Works
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-600 p-0.5"
                    aria-label="Close guide"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Guide Section Tabs */}
            <TabsV2
                value={activeGuide}
                onValueChange={(v) =>
                    setActiveGuide(v as 'getting-started' | 'dark-theme')
                }
                variant={TabsV2Variant.PILLS}
            >
                <TabsV2List>
                    <TabsV2Trigger value="getting-started">
                        Getting Started
                    </TabsV2Trigger>
                    <TabsV2Trigger value="dark-theme">
                        Dark Theme Usage
                    </TabsV2Trigger>
                </TabsV2List>
            </TabsV2>

            {activeGuide === 'getting-started' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                        <GuideStep
                            step={1}
                            icon={GitBranch}
                            title="Create a Branch"
                            description="Start from a preset or blank. Each branch holds a complete brand config."
                        />
                        <GuideStep
                            step={2}
                            icon={Palette}
                            title="Edit Tokens Visually"
                            description="Pick colors, adjust radius, shadows, and fonts. See all 26 V2 components update live."
                        />
                        <GuideStep
                            step={3}
                            icon={Terminal}
                            title="Publish & Pull"
                            description="Publish a version, then run the CLI command below to pull tokens into your app."
                        />
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 font-medium">
                                Use in your project:
                            </span>
                        </div>
                        <div className="text-xs font-mono space-y-1">
                            <div className="text-gray-500">
                                # One-time setup
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio init
                            </div>
                            <div className="text-gray-500 mt-2">
                                # Pull a published branch
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio pull {'<branchId>'}
                            </div>
                            <div className="text-gray-500 mt-2">
                                # Switch to a different branch/brand anytime
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio pull acme/light
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeGuide === 'dark-theme' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <GuideStep
                            step={1}
                            icon={Palette}
                            title="Auto-Generated Dark Palette"
                            description="By default, dark mode colors are auto-generated from your light palette. No setup needed - just switch the preview toggle."
                        />
                        <GuideStep
                            step={2}
                            icon={Palette}
                            title="Custom Dark Overrides"
                            description='Go to the "Dark" tab in the editor to customize specific dark mode colors, radius, shadows, or fonts independently.'
                        />
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 font-medium">
                                Using dark theme in your app:
                            </span>
                        </div>
                        <div className="text-xs font-mono space-y-1">
                            <div className="text-gray-500">
                                {'// Import the resolved tokens'}
                            </div>
                            <div className="text-blue-300">
                                {
                                    "import { resolveBrandTokens } from '@blend-design/token-engine'"
                                }
                            </div>
                            <div className="text-gray-500 mt-2">
                                {'// Resolve tokens for dark theme'}
                            </div>
                            <div className="text-green-400">
                                {
                                    "const darkTokens = resolveBrandTokens(brandConfig, 'dark')"
                                }
                            </div>
                            <div className="text-gray-500 mt-2">
                                {'// Use in ThemeProvider'}
                            </div>
                            <div className="text-purple-300">
                                {
                                    '<ThemeProvider theme="dark" componentTokens={darkTokens}>'
                                }
                            </div>
                            <div className="text-purple-300">{'  <App />'}</div>
                            <div className="text-purple-300">
                                {'</ThemeProvider>'}
                            </div>
                            <div className="text-gray-500 mt-2">
                                {'// Or pull dark tokens via CLI'}
                            </div>
                            <div className="text-green-400">
                                {
                                    'npx blend-token-studio pull <branchId> --theme dark'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 p-3 bg-white/60 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-800">
                            <strong>Tip:</strong> Use the sun/moon toggle in the
                            editor preview panel to switch between light and
                            dark mode preview. Your dark mode overrides will be
                            applied on top of the auto-generated dark palette.
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

function GuideStep({
    step,
    icon: Icon,
    title,
    description,
}: {
    step: number
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {step}
            </div>
            <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-800">
                        {title}
                    </span>
                </div>
                <p className="text-xs text-gray-600">{description}</p>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Branch Card
// ---------------------------------------------------------------------------

function BranchCard({
    branch,
    menuOpen,
    onMenuToggle,
    onMenuClose: _onMenuClose,
    onEdit,
    onFork,
    onDelete,
}: {
    branch: Branch
    menuOpen: boolean
    onMenuToggle: () => void
    onMenuClose: () => void
    onEdit: () => void
    onFork: () => void
    onDelete: () => void
}) {
    const primaryColor =
        branch.brandConfig?.colors?.primary?.['500'] || '#3B82F6'

    const statusConfig = {
        draft: {
            label: 'Draft',
            cls: 'bg-yellow-100 text-yellow-800',
            icon: WarningCircle,
        },
        published: {
            label: 'Published',
            cls: 'bg-green-100 text-green-800',
            icon: CheckCircle,
        },
        archived: {
            label: 'Archived',
            cls: 'bg-gray-100 text-gray-600',
            icon: Package,
        },
    }
    const sc =
        statusConfig[branch.status as keyof typeof statusConfig] ||
        statusConfig.draft
    const StatusIcon = sc.icon

    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group relative">
            <div
                className="h-1.5 rounded-t-xl"
                style={{ backgroundColor: primaryColor }}
            />

            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.cls}`}
                            >
                                <StatusIcon className="w-3 h-3" />
                                {sc.label}
                            </span>
                            {branch.latestVersion && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-mono">
                                    v{branch.latestVersion}
                                </span>
                            )}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                            {branch.name}
                        </h3>
                        <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">
                            {branch.id}
                        </p>
                    </div>

                    <div
                        className="relative ml-2"
                        style={{ zIndex: menuOpen ? 20 : 'auto' }}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onMenuToggle()
                            }}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <DotsThreeVertical className="w-4 h-4" />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-8 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                                <button
                                    onClick={onEdit}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <PencilSimple className="w-3.5 h-3.5 text-gray-400" />
                                    Edit Tokens
                                </button>
                                <button
                                    onClick={onFork}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <GitFork className="w-3.5 h-3.5 text-gray-400" />
                                    Fork Branch
                                </button>
                                <div className="h-px bg-gray-100 my-1" />
                                <button
                                    onClick={onDelete}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <Trash className="w-3.5 h-3.5" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                    {['500', '400', '300', '200', '100'].map((shade) => {
                        const c = branch.brandConfig?.colors?.primary?.[shade]
                        return c ? (
                            <div
                                key={shade}
                                className="w-6 h-6 rounded-md border border-black/10"
                                style={{ backgroundColor: c }}
                                title={`Primary ${shade}: ${c}`}
                            />
                        ) : null
                    })}
                </div>

                {branch.tags && branch.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {branch.tags.slice(0, 3).map((tag: any, i: number) => {
                            const tagKey =
                                typeof tag === 'string' ? tag : tag.id
                            const tagName =
                                typeof tag === 'string' ? tag : tag.name
                            return (
                                <span
                                    key={tagKey || i}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {tagName}
                                </span>
                            )
                        })}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>
                            {branch.updatedAt instanceof Date
                                ? branch.updatedAt.toLocaleDateString()
                                : new Date(
                                      branch.updatedAt
                                  ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/studio/preview/$branchId"
                            params={{ branchId: branch.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                        >
                            <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            to="/studio/editor/$branchId"
                            params={{ branchId: branch.id }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PencilSimple className="w-3 h-3" />
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmptyState({
    hasSearch,
    onCreate,
}: {
    hasSearch: boolean
    onCreate: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <GitBranch className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {hasSearch ? 'No branches found' : 'Create your first branch'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md text-center mb-6">
                {hasSearch
                    ? 'Try a different search term or clear the filter.'
                    : 'A branch is a versioned set of design tokens. Create one to start customizing colors, border radius, and more for your brand.'}
            </p>
            {!hasSearch && (
                <div className="flex flex-col items-center gap-4">
                    <ButtonV2
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.MEDIUM}
                        leftSlot={{ slot: <Plus className="w-4 h-4" /> }}
                        text="Create Branch"
                        onClick={onCreate}
                    />
                    <p className="text-xs text-gray-400">
                        Start from a preset or customize from scratch
                    </p>
                </div>
            )}
        </div>
    )
}

function CreateBranchModal({
    onClose,
    onCreate,
    loading,
}: {
    onClose: () => void
    onCreate: (
        input: Parameters<
            ReturnType<typeof useCreateBranchWithMock>['createBranch']
        >[0]
    ) => void
    loading: boolean
}) {
    const presets = listPresets()
    const [form, setForm] = useState({
        name: '',
        brandId: '',
        slug: '',
        description: '',
        preset: 'blend',
        visibility: 'private' as 'private' | 'team' | 'public',
        clientName: '',
        projectName: '',
        tags: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
        const e: Record<string, string> = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.brandId.trim()) e.brandId = 'Brand ID is required'
        if (!form.slug.trim()) e.slug = 'Slug is required'
        if (!/^[a-z0-9-]+$/.test(form.slug))
            e.slug = 'Slug must be lowercase letters, numbers, and hyphens only'
        return e
    }

    const handleSubmit = () => {
        const e = validate()
        if (Object.keys(e).length > 0) {
            setErrors(e)
            return
        }

        const selectedPreset = presets.find((p) => p.name === form.preset)
        const presetConfig = selectedPreset
            ? getPreset(selectedPreset.name)
            : undefined
        const baseConfig: BrandConfig = presetConfig || {
            brandId: form.brandId,
            name: form.name,
            version: '0.1.0',
            colors: {},
        }

        onCreate({
            brandId: form.brandId,
            name: form.name,
            slug: form.slug,
            description: form.description,
            visibility: form.visibility,
            clientName: form.clientName || undefined,
            projectName: form.projectName || undefined,
            tags: form.tags
                ? form.tags
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                : [],
            brandConfig: {
                ...baseConfig,
                brandId: form.brandId,
                name: form.name,
            },
        })
    }

    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        const brandId =
            name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .split('-')[0] || ''
        setForm((f) => ({ ...f, name, slug, brandId }))
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            New Branch
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create a token branch for your brand
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand Preset
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() =>
                                        setForm((f) => ({
                                            ...f,
                                            preset: preset.name,
                                        }))
                                    }
                                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                                        form.preset === preset.name
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0"
                                        style={{
                                            backgroundColor:
                                                getPreset(preset.name)?.colors
                                                    ?.primary?.['500'] ||
                                                '#3B82F6',
                                        }}
                                    />
                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                        {preset.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Branch Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="e.g. My Brand"
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name
                                    ? 'border-red-400'
                                    : 'border-gray-300'
                            }`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Brand ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.brandId}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        brandId: e.target.value,
                                    }))
                                }
                                placeholder="my-brand"
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.brandId
                                        ? 'border-red-400'
                                        : 'border-gray-300'
                                }`}
                            />
                            {errors.brandId && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.brandId}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        slug: e.target.value,
                                    }))
                                }
                                placeholder="my-brand-default"
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.slug
                                        ? 'border-red-400'
                                        : 'border-gray-300'
                                }`}
                            />
                            {errors.slug && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.slug}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Optional description"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, tags: e.target.value }))
                            }
                            placeholder="retail, banking (comma-separated)"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        Create Branch
                    </button>
                </div>
            </div>
        </div>
    )
}

function ForkBranchModal({
    source,
    onClose,
    onFork,
    loading,
}: {
    source: Branch
    onClose: () => void
    onFork: (name: string, slug: string) => void
    loading: boolean
}) {
    const [name, setName] = useState(`${source.name} (Copy)`)
    const [slug, setSlug] = useState(`${source.slug}-copy`)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Fork Branch
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create a copy of "{source.name}"
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Slug
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onFork(name, slug)}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        Fork Branch
                    </button>
                </div>
            </div>
        </div>
    )
}

function DeleteConfirmModal({
    branch,
    onClose,
    onConfirm,
    loading,
}: {
    branch: Branch
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Trash className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
                        Delete Branch?
                    </h2>
                    <p className="text-sm text-gray-500 text-center">
                        This will permanently delete{' '}
                        <strong>"{branch.name}"</strong> and all its versions.
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
