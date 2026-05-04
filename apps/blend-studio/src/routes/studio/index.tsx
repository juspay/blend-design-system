import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import {
    useBranchesWithMock,
    useCreateBranchWithMock,
    useDeleteBranchWithMock,
    useForkBranchWithMock,
    useOrganization,
    useTokenLocks,
    useLockToken,
    useUnlockToken,
    useMergeRequests,
    useCreateMergeRequest,
    useApproveMergeRequest,
    useRejectMergeRequest,
    useMergeMergeRequest,
} from '@/frontend/hooks/use-studio'
import { type Branch } from '@juspay/blend-design-system/tokens'
import { memo, useState, useCallback, useEffect } from 'react'
import {
    GitBranchIcon,
    PlusIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    PencilSimpleIcon,
    TrashIcon,
    GitForkIcon,
    DotsThreeVerticalIcon,
    ClockIcon,
    TagIcon,
    CheckCircleIcon,
    WarningCircleIcon,
    PackageIcon,
    XIcon,
    QuestionIcon,
    TerminalIcon,
    HouseIcon,
    PaletteIcon,
    SparkleIcon,
    ShieldCheckIcon,
} from '@phosphor-icons/react'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import {
    useOnboarding,
    WelcomeOnboarding,
} from '@/components/studio/WelcomeOnboarding'
import { featureFlags } from '@/lib/feature-flags'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    CreateBranchModal,
    DeleteBranchModal,
    ForkBranchModal,
} from '@/components/studio/modals'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Variant,
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    SearchInput,
    TagV2,
    TagV2Color,
    TagV2Type,
} from '@juspay/blend-design-system'
import type { MergeRequest, TokenLock } from '@/api/backend'

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

const formatStatusLabel = (status: StatusFilter): string =>
    status.charAt(0).toUpperCase() + status.slice(1)

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

function StudioPage() {
    const navigate = useNavigate()
    const { user } = useBackendAuth()
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [modal, setModal] = useState<ModalState>({ type: 'none' })
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [showGuide, setShowGuide] = useState(false)
    const [tokenPathInput, setTokenPathInput] = useState('')
    const [tokenReasonInput, setTokenReasonInput] = useState('')
    const [mrSourceBranchId, setMrSourceBranchId] = useState('')
    const [mrTitle, setMrTitle] = useState('')
    const [mrDescription, setMrDescription] = useState('')
    const [mrReviewComment, setMrReviewComment] = useState('')
    const { isComplete: onboardingComplete, complete: completeOnboarding } =
        useOnboarding()
    const flags = featureFlags.get()

    const orgMembership = user?.organizations?.[0] ?? null
    const organizationId = orgMembership?.organizationId ?? null
    const orgRole = orgMembership?.role ?? 'viewer'
    const isOrgAdmin = orgRole === 'admin'
    const canCreateChangeRequest = orgRole === 'admin' || orgRole === 'editor'

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setSearchQuery(searchInput.trim())
        }, 250)
        return () => window.clearTimeout(timer)
    }, [searchInput])

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
    const { organization } = useOrganization(organizationId)
    const {
        locks,
        loading: locksLoading,
        error: locksError,
    } = useTokenLocks(organizationId)
    const {
        lockToken,
        loading: lockingToken,
        error: lockTokenError,
    } = useLockToken()
    const {
        unlockToken,
        loading: unlockingToken,
        error: unlockTokenError,
    } = useUnlockToken()
    const {
        mergeRequests,
        loading: mergeRequestsLoading,
        error: mergeRequestsError,
    } = useMergeRequests({ organizationId: organizationId ?? undefined })
    const {
        createMergeRequest,
        loading: creatingMergeRequest,
        error: createMergeRequestError,
    } = useCreateMergeRequest()
    const {
        approveMergeRequest,
        loading: approvingMergeRequest,
        error: approveMergeRequestError,
    } = useApproveMergeRequest()
    const {
        rejectMergeRequest,
        loading: rejectingMergeRequest,
        error: rejectMergeRequestError,
    } = useRejectMergeRequest()
    const {
        mergeMergeRequest,
        loading: mergingMergeRequest,
        error: mergeMergeRequestError,
    } = useMergeMergeRequest()

    const defaultBranchId = organization?.defaultBranchId ?? null
    const sourceBranchOptions = allBranches.filter(
        (branch) => branch.id !== defaultBranchId
    )

    const handleDelete = useCallback(
        async (branch: Branch) => {
            await deleteBranch(branch.id)
            setModal({ type: 'none' })
            refetch()
        },
        [deleteBranch, refetch]
    )

    const handleMenuToggle = useCallback((branchId: string) => {
        setOpenMenu((prev) => (prev === branchId ? null : branchId))
    }, [])

    const handleMenuClose = useCallback(() => setOpenMenu(null), [])

    const handleEditBranch = useCallback(
        (branchId: string) => {
            setOpenMenu(null)
            navigate({
                to: '/studio/editor/$branchId',
                params: { branchId },
            })
        },
        [navigate]
    )

    const handleForkBranch = useCallback((branch: Branch) => {
        setOpenMenu(null)
        setModal({ type: 'fork', branch })
    }, [])

    const handleDeleteBranch = useCallback((branch: Branch) => {
        setOpenMenu(null)
        setModal({ type: 'delete', branch })
    }, [])

    const statusCounts = {
        all: allBranches.length,
        draft: allBranches.filter((b) => b.status === 'draft').length,
        published: allBranches.filter((b) => b.status === 'published').length,
        archived: allBranches.filter((b) => b.status === 'archived').length,
    }

    const handleLockToken = useCallback(async () => {
        if (!organizationId || !tokenPathInput.trim()) return
        await lockToken({
            orgId: organizationId,
            tokenPath: tokenPathInput.trim(),
            reason: tokenReasonInput.trim() || undefined,
        })
        setTokenPathInput('')
        setTokenReasonInput('')
    }, [lockToken, organizationId, tokenPathInput, tokenReasonInput])

    const handleUnlockToken = useCallback(
        async (tokenPath: string) => {
            if (!organizationId) return
            await unlockToken({ orgId: organizationId, tokenPath })
        },
        [organizationId, unlockToken]
    )

    const handleCreateMergeRequest = useCallback(async () => {
        if (
            !organizationId ||
            !defaultBranchId ||
            !mrSourceBranchId ||
            !mrTitle.trim()
        ) {
            return
        }
        await createMergeRequest({
            organizationId,
            sourceBranchId: mrSourceBranchId,
            targetBranchId: defaultBranchId,
            title: mrTitle.trim(),
            description: mrDescription.trim() || undefined,
        })
        setMrSourceBranchId('')
        setMrTitle('')
        setMrDescription('')
    }, [
        createMergeRequest,
        defaultBranchId,
        mrDescription,
        mrSourceBranchId,
        mrTitle,
        organizationId,
    ])

    const handleApproveMergeRequest = useCallback(
        async (mrId: string) => {
            await approveMergeRequest({
                mrId,
                reviewComment: mrReviewComment.trim() || undefined,
            })
            setMrReviewComment('')
        },
        [approveMergeRequest, mrReviewComment]
    )

    const handleRejectMergeRequest = useCallback(
        async (mrId: string) => {
            await rejectMergeRequest({
                mrId,
                reviewComment: mrReviewComment.trim() || undefined,
            })
            setMrReviewComment('')
        },
        [mrReviewComment, rejectMergeRequest]
    )

    return (
        <RequireAuth>
            <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors">
                {!onboardingComplete && (
                    <WelcomeOnboarding onComplete={completeOnboarding} />
                )}

                {/* Header */}
                <div className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-800 transition-colors">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                                <div className="mb-2 flex min-w-0 items-center gap-3">
                                    <Link
                                        to="/"
                                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        title="Back to home"
                                    >
                                        <HouseIcon className="w-4 h-4" />
                                    </Link>
                                    <div className="h-7 w-px bg-gray-200 dark:bg-gray-600" />
                                    <h1 className="truncate text-2xl font-semibold tracking-[-0.03em] text-gray-900 dark:text-white">
                                        Branches
                                    </h1>
                                    {flags.useMockData && (
                                        <TagV2
                                            text="Demo Mode"
                                            color={TagV2Color.WARNING}
                                            type={TagV2Type.SUBTLE}
                                        />
                                    )}
                                </div>
                                <p className="max-w-2xl pl-12 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    Each branch is a versioned brand
                                    configuration. Edit tokens, preview live,
                                    publish, then pull into your project.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                <Link
                                    to="/studio/cli-help"
                                    search={{ branchId: undefined }}
                                    className="inline-block"
                                >
                                    <ButtonV2
                                        buttonType={ButtonV2Type.SECONDARY}
                                        size={ButtonV2Size.SMALL}
                                        leftSlot={{
                                            slot: (
                                                <TerminalIcon className="w-4 h-4" />
                                            ),
                                        }}
                                        text="CLI Help"
                                    />
                                </Link>
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.SMALL}
                                    leftSlot={{
                                        slot: (
                                            <QuestionIcon className="w-4 h-4" />
                                        ),
                                    }}
                                    text="Quick Guide"
                                    onClick={() => setShowGuide(!showGuide)}
                                />
                                <ButtonV2
                                    buttonType={ButtonV2Type.PRIMARY}
                                    size={ButtonV2Size.SMALL}
                                    leftSlot={{
                                        slot: <PlusIcon className="w-4 h-4" />,
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
                        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0 flex-1 lg:max-w-md">
                                <SearchInput
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    onClear={() => setSearchInput('')}
                                    placeholder="Search branches"
                                    leftSlot={
                                        <MagnifyingGlassIcon className="w-4 h-4" />
                                    }
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <TabsV2
                                    value={statusFilter}
                                    onValueChange={(v) =>
                                        setStatusFilter(v as StatusFilter)
                                    }
                                    variant={TabsV2Variant.PILLS}
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
                                                {`${formatStatusLabel(s)} ${statusCounts[s]}`}
                                            </TabsV2Trigger>
                                        ))}
                                    </TabsV2List>
                                </TabsV2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="studio-fade-in mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <WarningCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
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
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                            hasSearch={!!searchInput}
                            onCreate={() => setModal({ type: 'create' })}
                        />
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {branches.map((branch, index) => (
                                <BranchCard
                                    key={branch.id}
                                    branch={branch}
                                    index={index}
                                    menuOpen={openMenu === branch.id}
                                    onMenuToggle={handleMenuToggle}
                                    onMenuClose={handleMenuClose}
                                    onEdit={handleEditBranch}
                                    onFork={handleForkBranch}
                                    onDelete={handleDeleteBranch}
                                />
                            ))}
                        </div>
                    )}

                    {organizationId && (
                        <div className="mt-8">
                            <GovernanceSection
                                organizationName={
                                    organization?.name ?? 'Organization'
                                }
                                defaultBranchId={defaultBranchId}
                                orgRole={orgRole}
                                isOrgAdmin={isOrgAdmin}
                                canCreateChangeRequest={canCreateChangeRequest}
                                locks={locks}
                                locksLoading={locksLoading}
                                locksError={locksError}
                                tokenPathInput={tokenPathInput}
                                tokenReasonInput={tokenReasonInput}
                                onTokenPathChange={setTokenPathInput}
                                onTokenReasonChange={setTokenReasonInput}
                                onLockToken={handleLockToken}
                                onUnlockToken={handleUnlockToken}
                                lockingToken={lockingToken}
                                unlockingToken={unlockingToken}
                                lockTokenError={lockTokenError}
                                unlockTokenError={unlockTokenError}
                                mergeRequests={mergeRequests}
                                mergeRequestsLoading={mergeRequestsLoading}
                                mergeRequestsError={mergeRequestsError}
                                sourceBranchOptions={sourceBranchOptions}
                                mrSourceBranchId={mrSourceBranchId}
                                mrTitle={mrTitle}
                                mrDescription={mrDescription}
                                onMrSourceChange={setMrSourceBranchId}
                                onMrTitleChange={setMrTitle}
                                onMrDescriptionChange={setMrDescription}
                                onCreateMergeRequest={handleCreateMergeRequest}
                                creatingMergeRequest={creatingMergeRequest}
                                createMergeRequestError={
                                    createMergeRequestError
                                }
                                mrReviewComment={mrReviewComment}
                                onMrReviewCommentChange={setMrReviewComment}
                                onApproveMergeRequest={
                                    handleApproveMergeRequest
                                }
                                onRejectMergeRequest={handleRejectMergeRequest}
                                onMergeMergeRequest={mergeMergeRequest}
                                approvingMergeRequest={approvingMergeRequest}
                                rejectingMergeRequest={rejectingMergeRequest}
                                mergingMergeRequest={mergingMergeRequest}
                                approveMergeRequestError={
                                    approveMergeRequestError
                                }
                                rejectMergeRequestError={
                                    rejectMergeRequestError
                                }
                                mergeMergeRequestError={mergeMergeRequestError}
                            />
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
                    <DeleteBranchModal
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
                    <SparkleIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-blue-900">
                        How Token Studio Works
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-600 p-0.5"
                    aria-label="Close guide"
                >
                    <XIcon className="w-4 h-4" />
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
                            icon={GitBranchIcon}
                            title="Create a Branch"
                            description="Start from a preset or blank. Each branch holds a complete brand config."
                        />
                        <GuideStep
                            step={2}
                            icon={PaletteIcon}
                            title="Edit Tokens Visually"
                            description="Pick colors, adjust radius, shadows, and fonts. See all 26 V2 components update live."
                        />
                        <GuideStep
                            step={3}
                            icon={TerminalIcon}
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
                                npx blend-studio init
                            </div>
                            <div className="text-gray-500 mt-2">
                                # Pull a published branch
                            </div>
                            <div className="text-green-400">
                                npx blend-studio pull {'<branchId>'}
                            </div>
                            <div className="text-gray-500 mt-2">
                                # Switch to a different branch/brand anytime
                            </div>
                            <div className="text-green-400">
                                npx blend-studio pull acme/light
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
                            icon={PaletteIcon}
                            title="Auto-Generated Dark PaletteIcon"
                            description="By default, dark mode colors are auto-generated from your light PaletteIcon. No setup needed - just switch the preview toggle."
                        />
                        <GuideStep
                            step={2}
                            icon={PaletteIcon}
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
                                    "import { resolveBrandTokens } from '@juspay/blend-design-system/tokens'"
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
                                    'npx blend-studio pull <branchId> --theme dark'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 p-3 bg-white/60 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-800">
                            <strong>Tip:</strong> Use the sun/moon toggle in the
                            editor preview panel to switch between light and
                            dark mode preview. Your dark mode overrides will be
                            applied on top of the auto-generated dark
                            PaletteIcon.
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

function GovernanceSection({
    organizationName,
    defaultBranchId,
    orgRole,
    isOrgAdmin,
    canCreateChangeRequest,
    locks,
    locksLoading,
    locksError,
    tokenPathInput,
    tokenReasonInput,
    onTokenPathChange,
    onTokenReasonChange,
    onLockToken,
    onUnlockToken,
    lockingToken,
    unlockingToken,
    lockTokenError,
    unlockTokenError,
    mergeRequests,
    mergeRequestsLoading,
    mergeRequestsError,
    sourceBranchOptions,
    mrSourceBranchId,
    mrTitle,
    mrDescription,
    onMrSourceChange,
    onMrTitleChange,
    onMrDescriptionChange,
    onCreateMergeRequest,
    creatingMergeRequest,
    createMergeRequestError,
    mrReviewComment,
    onMrReviewCommentChange,
    onApproveMergeRequest,
    onRejectMergeRequest,
    onMergeMergeRequest,
    approvingMergeRequest,
    rejectingMergeRequest,
    mergingMergeRequest,
    approveMergeRequestError,
    rejectMergeRequestError,
    mergeMergeRequestError,
}: {
    organizationName: string
    defaultBranchId: string | null
    orgRole: string
    isOrgAdmin: boolean
    canCreateChangeRequest: boolean
    locks: TokenLock[]
    locksLoading: boolean
    locksError: string | null
    tokenPathInput: string
    tokenReasonInput: string
    onTokenPathChange: (value: string) => void
    onTokenReasonChange: (value: string) => void
    onLockToken: () => Promise<void>
    onUnlockToken: (tokenPath: string) => Promise<void>
    lockingToken: boolean
    unlockingToken: boolean
    lockTokenError: string | null
    unlockTokenError: string | null
    mergeRequests: MergeRequest[]
    mergeRequestsLoading: boolean
    mergeRequestsError: string | null
    sourceBranchOptions: Branch[]
    mrSourceBranchId: string
    mrTitle: string
    mrDescription: string
    onMrSourceChange: (value: string) => void
    onMrTitleChange: (value: string) => void
    onMrDescriptionChange: (value: string) => void
    onCreateMergeRequest: () => Promise<void>
    creatingMergeRequest: boolean
    createMergeRequestError: string | null
    mrReviewComment: string
    onMrReviewCommentChange: (value: string) => void
    onApproveMergeRequest: (mrId: string) => Promise<void>
    onRejectMergeRequest: (mrId: string) => Promise<void>
    onMergeMergeRequest: (mrId: string) => Promise<unknown>
    approvingMergeRequest: boolean
    rejectingMergeRequest: boolean
    mergingMergeRequest: boolean
    approveMergeRequestError: string | null
    rejectMergeRequestError: string | null
    mergeMergeRequestError: string | null
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
                        <h2 className="text-sm font-semibold text-gray-900">
                            Governance
                        </h2>
                    </div>
                    <p className="text-xs text-gray-500">
                        {organizationName} · role: {orgRole}
                        {defaultBranchId
                            ? ` · default branch: ${defaultBranchId}`
                            : ' · default branch not configured'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-3 text-sm font-medium text-gray-900">
                        Token Locks
                    </h3>
                    <p className="mb-3 text-xs text-gray-500">
                        Lock token paths that downstream branches cannot
                        override.
                    </p>

                    {isOrgAdmin && (
                        <div className="mb-3 space-y-2">
                            <input
                                value={tokenPathInput}
                                onChange={(event) =>
                                    onTokenPathChange(event.target.value)
                                }
                                placeholder="colors.primary.500"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                            <input
                                value={tokenReasonInput}
                                onChange={(event) =>
                                    onTokenReasonChange(event.target.value)
                                }
                                placeholder="Reason (optional)"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                            <ButtonV2
                                buttonType={ButtonV2Type.PRIMARY}
                                size={ButtonV2Size.SMALL}
                                text={
                                    lockingToken ? 'Locking...' : 'Lock Token'
                                }
                                onClick={() => {
                                    void onLockToken()
                                }}
                                disabled={
                                    lockingToken || !tokenPathInput.trim()
                                }
                            />
                        </div>
                    )}

                    {!isOrgAdmin && (
                        <p className="mb-3 text-xs text-amber-700">
                            Only organization admins can create or remove locks.
                        </p>
                    )}

                    {(locksError || lockTokenError || unlockTokenError) && (
                        <p className="mb-2 text-xs text-red-600">
                            {locksError || lockTokenError || unlockTokenError}
                        </p>
                    )}

                    <div className="space-y-2">
                        {locksLoading ? (
                            <p className="text-xs text-gray-500">
                                Loading locks...
                            </p>
                        ) : locks.length === 0 ? (
                            <p className="text-xs text-gray-500">
                                No locked token paths.
                            </p>
                        ) : (
                            locks.map((lock) => (
                                <div
                                    key={lock.id}
                                    className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-mono text-gray-800">
                                            {lock.tokenPath}
                                        </p>
                                        {lock.reason && (
                                            <p className="truncate text-xs text-gray-500">
                                                {lock.reason}
                                            </p>
                                        )}
                                    </div>
                                    {isOrgAdmin && (
                                        <ButtonV2
                                            buttonType={ButtonV2Type.SECONDARY}
                                            size={ButtonV2Size.SMALL}
                                            text={
                                                unlockingToken
                                                    ? 'Removing...'
                                                    : 'Unlock'
                                            }
                                            onClick={() => {
                                                void onUnlockToken(
                                                    lock.tokenPath
                                                )
                                            }}
                                            disabled={unlockingToken}
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-3 text-sm font-medium text-gray-900">
                        Change Requests
                    </h3>
                    <p className="mb-3 text-xs text-gray-500">
                        Promote branch updates to the default branch through
                        review.
                    </p>

                    {canCreateChangeRequest && defaultBranchId && (
                        <div className="mb-4 space-y-2">
                            <select
                                value={mrSourceBranchId}
                                onChange={(event) =>
                                    onMrSourceChange(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="">Select source branch</option>
                                {sourceBranchOptions.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                value={mrTitle}
                                onChange={(event) =>
                                    onMrTitleChange(event.target.value)
                                }
                                placeholder="Change request title"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                            <textarea
                                value={mrDescription}
                                onChange={(event) =>
                                    onMrDescriptionChange(event.target.value)
                                }
                                placeholder="Description (optional)"
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                            <ButtonV2
                                buttonType={ButtonV2Type.PRIMARY}
                                size={ButtonV2Size.SMALL}
                                text={
                                    creatingMergeRequest
                                        ? 'Creating...'
                                        : 'Create Change Request'
                                }
                                onClick={() => {
                                    void onCreateMergeRequest()
                                }}
                                disabled={
                                    creatingMergeRequest ||
                                    !mrSourceBranchId ||
                                    !mrTitle.trim()
                                }
                            />
                        </div>
                    )}

                    {!canCreateChangeRequest && (
                        <p className="mb-3 text-xs text-amber-700">
                            Editors and admins can create change requests.
                        </p>
                    )}

                    {!defaultBranchId && (
                        <p className="mb-3 text-xs text-amber-700">
                            Configure a default branch before creating change
                            requests.
                        </p>
                    )}

                    {(createMergeRequestError ||
                        mergeRequestsError ||
                        approveMergeRequestError ||
                        rejectMergeRequestError ||
                        mergeMergeRequestError) && (
                        <p className="mb-2 text-xs text-red-600">
                            {createMergeRequestError ||
                                mergeRequestsError ||
                                approveMergeRequestError ||
                                rejectMergeRequestError ||
                                mergeMergeRequestError}
                        </p>
                    )}

                    {isOrgAdmin && (
                        <textarea
                            value={mrReviewComment}
                            onChange={(event) =>
                                onMrReviewCommentChange(event.target.value)
                            }
                            placeholder="Review comment for approve/reject (optional)"
                            rows={2}
                            className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    )}

                    <div className="space-y-2">
                        {mergeRequestsLoading ? (
                            <p className="text-xs text-gray-500">
                                Loading change requests...
                            </p>
                        ) : mergeRequests.length === 0 ? (
                            <p className="text-xs text-gray-500">
                                No change requests yet.
                            </p>
                        ) : (
                            mergeRequests.map((mergeRequest) => (
                                <div
                                    key={mergeRequest.id}
                                    className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
                                >
                                    <div className="mb-1 flex items-center justify-between gap-2">
                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {mergeRequest.title}
                                        </p>
                                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[11px] uppercase text-gray-700">
                                            {mergeRequest.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {mergeRequest.sourceBranchName} →{' '}
                                        {mergeRequest.targetBranchName}
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {isOrgAdmin &&
                                            mergeRequest.status ===
                                                'pending' && (
                                                <>
                                                    <ButtonV2
                                                        buttonType={
                                                            ButtonV2Type.SECONDARY
                                                        }
                                                        size={
                                                            ButtonV2Size.SMALL
                                                        }
                                                        text={
                                                            approvingMergeRequest
                                                                ? 'Approving...'
                                                                : 'Approve'
                                                        }
                                                        onClick={() => {
                                                            void onApproveMergeRequest(
                                                                mergeRequest.id
                                                            )
                                                        }}
                                                        disabled={
                                                            approvingMergeRequest
                                                        }
                                                    />
                                                    <ButtonV2
                                                        buttonType={
                                                            ButtonV2Type.SECONDARY
                                                        }
                                                        size={
                                                            ButtonV2Size.SMALL
                                                        }
                                                        text={
                                                            rejectingMergeRequest
                                                                ? 'Rejecting...'
                                                                : 'Reject'
                                                        }
                                                        onClick={() => {
                                                            void onRejectMergeRequest(
                                                                mergeRequest.id
                                                            )
                                                        }}
                                                        disabled={
                                                            rejectingMergeRequest
                                                        }
                                                    />
                                                </>
                                            )}
                                        {isOrgAdmin &&
                                            mergeRequest.status ===
                                                'approved' && (
                                                <ButtonV2
                                                    buttonType={
                                                        ButtonV2Type.PRIMARY
                                                    }
                                                    size={ButtonV2Size.SMALL}
                                                    text={
                                                        mergingMergeRequest
                                                            ? 'Promoting...'
                                                            : 'Promote to Master'
                                                    }
                                                    onClick={() => {
                                                        void onMergeMergeRequest(
                                                            mergeRequest.id
                                                        )
                                                    }}
                                                    disabled={
                                                        mergingMergeRequest
                                                    }
                                                />
                                            )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Branch Card
// ---------------------------------------------------------------------------

const BranchCard = memo(function BranchCard({
    branch,
    index,
    menuOpen,
    onMenuToggle,
    onMenuClose: _onMenuClose,
    onEdit,
    onFork,
    onDelete,
}: {
    branch: Branch
    index: number
    menuOpen: boolean
    onMenuToggle: (branchId: string) => void
    onMenuClose: () => void
    onEdit: (branchId: string) => void
    onFork: (branch: Branch) => void
    onDelete: (branch: Branch) => void
}) {
    const primaryColor =
        branch.brandConfig?.colors?.primary?.['500'] || '#3B82F6'

    const statusConfig = {
        draft: {
            label: 'Draft',
            color: TagV2Color.WARNING,
            icon: WarningCircleIcon,
        },
        published: {
            label: 'Published',
            color: TagV2Color.SUCCESS,
            icon: CheckCircleIcon,
        },
        archived: {
            label: 'Archived',
            color: TagV2Color.NEUTRAL,
            icon: PackageIcon,
        },
    }
    const sc =
        statusConfig[branch.status as keyof typeof statusConfig] ||
        statusConfig.draft
    const StatusIcon = sc.icon

    return (
        <article
            className="studio-card-enter group relative overflow-visible rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
            style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
        >
            <div
                className="h-1.5 rounded-t-2xl"
                style={{ backgroundColor: primaryColor }}
            />

            <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="mb-2 flex min-w-0 flex-wrap items-center gap-2">
                            <TagV2
                                text={sc.label}
                                color={sc.color}
                                type={TagV2Type.SUBTLE}
                                leftSlot={{
                                    slot: <StatusIcon className="h-3 w-3" />,
                                }}
                            />
                            {branch.latestVersion && (
                                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                    v{branch.latestVersion}
                                </span>
                            )}
                        </div>
                        <h3 className="truncate text-base font-semibold tracking-[-0.01em] text-gray-900">
                            {branch.name}
                        </h3>
                        <p className="mt-1 truncate text-xs font-mono text-gray-400">
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
                                onMenuToggle(branch.id)
                            }}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            aria-label={`Open actions for ${branch.name}`}
                        >
                            <DotsThreeVerticalIcon className="w-4 h-4" />
                        </button>

                        {menuOpen && (
                            <div className="studio-menu-enter absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl shadow-gray-200/80">
                                <button
                                    onClick={() => onEdit(branch.id)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <PencilSimpleIcon className="w-3.5 h-3.5 text-gray-400" />
                                    Edit Tokens
                                </button>
                                <button
                                    onClick={() => onFork(branch)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <GitForkIcon className="w-3.5 h-3.5 text-gray-400" />
                                    Fork Branch
                                </button>
                                <div className="h-px bg-gray-100 my-1" />
                                <button
                                    onClick={() => onDelete(branch)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <TrashIcon className="w-3.5 h-3.5" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4 flex items-center gap-1.5">
                    {['500', '400', '300', '200', '100'].map((shade) => {
                        const c = branch.brandConfig?.colors?.primary?.[shade]
                        return c ? (
                            <div
                                key={shade}
                                className="h-7 flex-1 rounded-lg border border-black/10 transition-transform group-hover:scale-[1.02]"
                                style={{ backgroundColor: c }}
                                title={`Primary ${shade}: ${c}`}
                            />
                        ) : null
                    })}
                </div>

                {branch.tags && branch.tags.length > 0 && (
                    <div className="mb-4 flex min-h-6 flex-wrap gap-1.5">
                        {branch.tags.slice(0, 3).map((tag: any, i: number) => {
                            const tagKey =
                                typeof tag === 'string' ? tag : tag.id
                            const tagName =
                                typeof tag === 'string' ? tag : tag.name
                            return (
                                <span
                                    key={tagKey || i}
                                    className="inline-flex max-w-full items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                >
                                    <TagIcon className="w-2.5 h-2.5" />
                                    <span className="truncate">{tagName}</span>
                                </span>
                            )
                        })}
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div className="flex min-w-0 items-center gap-1 text-xs text-gray-400">
                        <ClockIcon className="w-3 h-3" />
                        <span className="truncate">
                            {branch.updatedAt instanceof Date
                                ? branch.updatedAt.toLocaleDateString()
                                : new Date(
                                      branch.updatedAt
                                  ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                        <Link
                            to="/studio/cli-help"
                            search={{ branchId: branch.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                            title="How to use this branch in CLI"
                        >
                            <TerminalIcon className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            to="/studio/preview/$branchId"
                            params={{ branchId: branch.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            title="Preview"
                        >
                            <EyeIcon className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            to="/studio/editor/$branchId"
                            params={{ branchId: branch.id }}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            <PencilSimpleIcon className="w-3 h-3" />
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
})

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
                <GitBranchIcon className="w-10 h-10 text-blue-500" />
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
                        leftSlot={{ slot: <PlusIcon className="w-4 h-4" /> }}
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
