/**
 * Token Editor Page
 *
 * Main editor screen for customizing brand tokens. Split into two panels:
 * - Left: Editor tabs (Colors, Typography, Radius, Shadows, JSON)
 * - Right: Live preview
 *
 * The editor resolves brand config into component tokens using the token engine
 * and renders a live preview via ThemeProvider.
 */

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import {
    ButtonV2,
    ButtonV2SubType,
    ButtonV2Type,
    MenuV2,
    MenuV2Alignment,
    MenuV2ItemActionType,
    MenuV2Side,
    TagV2,
    TagV2Color,
    TagV2Size,
    ThemeProvider,
} from '@juspay/blend-design-system'
import {
    Panel,
    Group,
    Separator,
    type PanelImperativeHandle,
} from 'react-resizable-panels'
import {
    resolveBrandTokens,
    diffBrandConfigs,
    PRESET_BLEND_DEFAULT,
    type BrandConfig,
    type TokenDiff,
} from '@juspay/blend-design-system/tokens'
import {
    useBranchWithMock,
    usePublishVersionWithMock,
    useCreateSnapshotWithMock,
    incrementVersion,
    validateVersion,
} from '@/frontend/hooks/use-studio'
import { ComponentShowcase } from '@/components/studio/ComponentShowcase'
import { SingleComponentShowcase } from '@/components/studio/SingleComponentShowcase'
import {
    ColorsTab,
    TypographyTab,
    RadiusTab,
    ShadowsTab,
    DarkModeTab,
    ComponentOverridesTab,
    JsonTab,
    ImportWizard,
    type EditorTabId,
    type ColorGroupKey,
} from '@/components/studio/editor'
import { ToggleButton } from '@/components/studio/editor/ToggleButton'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react'
import {
    Sun,
    Moon,
    Play,
    Spinner,
    Code,
    TextAa,
    Sliders,
    WarningCircle,
    X,
    GitBranch,
    Repeat,
    Palette,
    Stack,
    LaptopIcon,
    DeviceMobileSpeakerIcon,
    MoonStarsIcon,
    SidebarIcon,
    PlayIcon,
    SlidersIcon,
    DownloadIcon,
} from '@phosphor-icons/react'
import { SidebarV2 } from '@juspay/blend-design-system'
import { getCurrentReturnPath } from '@/lib/return-path'
export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TabConfig {
    id: EditorTabId
    icon: React.ComponentType<{ className?: string }>
    label: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EDITOR_TABS: TabConfig[] = [
    { id: 'colors', icon: Palette, label: 'Colors' },
    { id: 'typography', icon: TextAa, label: 'Type' },
    { id: 'radius', icon: Sliders, label: 'Radius' },
    { id: 'shadows', icon: Stack, label: 'Shadows' },
    { id: 'darkmode', icon: Moon, label: 'Dark' },
    { id: 'components', icon: Repeat, label: 'Components' },
    { id: 'json', icon: Code, label: 'JSON' },
]

/** Tab switcher items aligned with `EDITOR_TABS` (e.g. secondary rail / panel). */
const sidebarItems = EDITOR_TABS.map(({ id, icon: Icon, label }) => ({
    label,
    value: id,
    showInPanel: true,
    icon: <Icon className="h-4 w-4" aria-hidden />,
}))

/** Auto-save debounce interval in milliseconds. */
const AUTO_SAVE_DELAY_MS = 1_000

const EDITOR_LEFT_PANEL_ID = 'editor-left-panel'
const EDITOR_RIGHT_PANEL_ID = 'editor-right-panel'

/** Flex transition when opening/closing the left panel via the toggle (not drag). */
const LEFT_PANEL_TOGGLE_MS = 280

const LEFT_PANEL_MIN_PX = '23'
const LEFT_PANEL_MAX_PX = '55'

// ---------------------------------------------------------------------------
// Main Editor Page
// ---------------------------------------------------------------------------

function EditorPage() {
    const { branchId } = Route.useParams()
    const navigate = useNavigate()

    // Data hooks
    const {
        branch,
        loading: branchLoading,
        error: branchError,
        updateBranch,
    } = useBranchWithMock(branchId)
    const { publishVersion, loading: publishLoading } =
        usePublishVersionWithMock(branchId)
    const { createSnapshot } = useCreateSnapshotWithMock(branchId)

    // Editor state
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light')
    const [brand, setBrand] = useState<BrandConfig | null>(null)
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<EditorTabId>('colors')
    const [isMobile, setIsMobile] = useState(false)
    const [activeColorGroup, setActiveColorGroup] =
        useState<ColorGroupKey>('primary')
    const [showPublishModal, setShowPublishModal] = useState(false)
    const [showImportWizard, setShowImportWizard] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        null
    )
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false)
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const leftPanelRef = useRef<PanelImperativeHandle | null>(null)
    const leftPanelOuterElRef = useRef<HTMLDivElement | null>(null)

    const leftPanelElementRef = useCallback((node: HTMLDivElement | null) => {
        leftPanelOuterElRef.current = node
    }, [])

    useLayoutEffect(() => {
        const el = leftPanelOuterElRef.current
        const panel = leftPanelRef.current
        if (!el || !panel) return

        el.style.transitionProperty = 'flex-grow, flex-basis, flex-shrink'
        el.style.transitionDuration = `${LEFT_PANEL_TOGGLE_MS}ms`
        el.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)'

        const clearId = window.setTimeout(() => {
            el.style.transitionProperty = ''
            el.style.transitionDuration = ''
            el.style.transitionTimingFunction = ''
        }, LEFT_PANEL_TOGGLE_MS + 50)

        return () => {
            window.clearTimeout(clearId)
        }
    }, [isLeftPanelOpen])

    // Sync brand from branch on load
    useEffect(() => {
        if (branch?.brandConfig && !brand) {
            setBrand(branch.brandConfig)
        }
    }, [branch, brand])

    // Auto-save when there are changes
    useEffect(() => {
        if (!hasChanges || !brand) return

        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)

        autoSaveTimer.current = setTimeout(async () => {
            await createSnapshot(brand, 'Auto-save', true)
        }, AUTO_SAVE_DELAY_MS)

        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
        }
    }, [hasChanges, brand, createSnapshot])

    // Derived state — debounced token resolution to avoid lag on every keystroke
    const [debouncedBrand, setDebouncedBrand] = useState<BrandConfig | null>(
        brand
    )
    const resolveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (!brand) return
        if (resolveTimer.current) clearTimeout(resolveTimer.current)
        resolveTimer.current = setTimeout(() => {
            setDebouncedBrand(brand)
        }, 200)
        return () => {
            if (resolveTimer.current) clearTimeout(resolveTimer.current)
        }
    }, [brand])

    const previewBrand = debouncedBrand

    const componentTokens = useMemo(() => {
        if (!previewBrand) return null
        try {
            return resolveBrandTokens(previewBrand, previewTheme)
        } catch {
            return null
        }
    }, [previewBrand, previewTheme])

    const diffs = useMemo<TokenDiff[]>(() => {
        if (!brand) return []
        try {
            return diffBrandConfigs(PRESET_BLEND_DEFAULT, brand)
        } catch {
            return []
        }
    }, [brand])

    // Handlers
    const handleBrandChange = useCallback(
        (updater: (prev: BrandConfig) => BrandConfig) => {
            setBrand((prev) => {
                if (!prev) return prev
                const updated = updater(prev)
                setHasChanges(true)
                return updated
            })
        },
        []
    )

    const handleImportTokens = useCallback((imported: Partial<BrandConfig>) => {
        setBrand((prev) => {
            if (!prev) return prev
            const updated = { ...prev }
            if (imported.colors) {
                updated.colors = {
                    ...updated.colors,
                    ...imported.colors,
                }
            }
            if (imported.radius) {
                updated.radius = { ...updated.radius, ...imported.radius }
            }
            if (imported.shadows) {
                updated.shadows = {
                    ...updated.shadows,
                    ...imported.shadows,
                }
            }
            if (imported.font) {
                updated.font = { ...updated.font, ...imported.font }
            }
            setHasChanges(true)
            return updated
        })
        setShowImportWizard(false)
    }, [])

    const handleSave = useCallback(async () => {
        if (!brand || !branchId) return
        setSaving(true)
        try {
            await updateBranch(branchId, { brandConfig: brand })
            await createSnapshot(brand, 'Manual save', false)
            setHasChanges(false)
        } catch (err) {
            console.error('Save failed:', err)
        } finally {
            setSaving(false)
        }
    }, [brand, branchId, updateBranch, createSnapshot])

    // Loading state
    if (branchLoading) {
        return <LoadingScreen message="Loading branch..." />
    }

    // Error state
    if (branchError || !branch) {
        return (
            <ErrorScreen
                message={branchError || 'Branch not found'}
                onBack={() => navigate({ to: '/studio' })}
            />
        )
    }

    if (!brand) return null

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col overflow-hidden bg-white">
                <SidebarV2
                    secondarySidebar={{
                        items: sidebarItems,
                        selected: activeTab,
                        onSelect: (value) => {
                            setActiveTab(value as EditorTabId)
                        },
                        footerSlot: (
                            <div className="flex flex-col items-center gap-4">
                                <UserMenu compact menuPlacement="top-left" />
                            </div>
                        ),
                    }}
                >
                    <div className="flex-1 flex overflow-hidden flex-col">
                        <Group
                            orientation="horizontal"
                            style={{ height: '100%' }}
                            defaultLayout={{
                                [EDITOR_LEFT_PANEL_ID]: 0,
                                [EDITOR_RIGHT_PANEL_ID]: 100,
                            }}
                        >
                            <Panel
                                id={EDITOR_LEFT_PANEL_ID}
                                panelRef={leftPanelRef}
                                elementRef={leftPanelElementRef}
                                minSize={
                                    isLeftPanelOpen ? LEFT_PANEL_MIN_PX : 0
                                }
                                maxSize={
                                    isLeftPanelOpen ? LEFT_PANEL_MAX_PX : 0
                                }
                                defaultSize={LEFT_PANEL_MIN_PX}
                                groupResizeBehavior="preserve-pixel-size"
                                className="min-h-0 flex flex-col"
                            >
                                <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
                                    <div className="bg-white border-b border-gray-200 h-[52px] flex items-center justify-between px-4">
                                        <div className="flex items-center gap-2">
                                            <GitBranch className="w-4 h-4 text-gray-400" />
                                            <span className="truncate text-sm font-semibold text-gray-900">
                                                {branch.name}
                                            </span>
                                            <span className="hidden max-w-[180px] truncate text-xs font-mono text-gray-400 lg:inline">
                                                {branch.id}
                                            </span>
                                            {hasChanges && (
                                                <TagV2
                                                    text={'Unsaved'}
                                                    size={TagV2Size.SM}
                                                    color={TagV2Color.WARNING}
                                                />
                                            )}
                                        </div>
                                        {diffs.length > 0 && (
                                            <TagV2
                                                text={`${diffs.length} Changes`}
                                                size={TagV2Size.SM}
                                                color={TagV2Color.WARNING}
                                            />
                                        )}
                                    </div>
                                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                                        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
                                            <div className="flex min-h-full flex-1 flex-col">
                                                {activeTab === 'colors' && (
                                                    <ColorsTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                        activeGroup={
                                                            activeColorGroup
                                                        }
                                                        onActiveGroupChange={
                                                            setActiveColorGroup
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'typography' && (
                                                    <TypographyTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'radius' && (
                                                    <RadiusTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'shadows' && (
                                                    <ShadowsTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'darkmode' && (
                                                    <DarkModeTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'components' && (
                                                    <ComponentOverridesTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                        onSelectComponent={
                                                            setSelectedComponent
                                                        }
                                                        resolvedTokens={
                                                            componentTokens
                                                        }
                                                    />
                                                )}
                                                {activeTab === 'json' && (
                                                    <JsonTab
                                                        brand={brand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            {isLeftPanelOpen && (
                                <Separator className="w-px bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />
                            )}

                            <Panel
                                id={EDITOR_RIGHT_PANEL_ID}
                                minSize={38}
                                defaultSize={71}
                            >
                                <div className="h-full flex flex-col overflow-hidden bg-[#f8fafc]">
                                    <div className="bg-white border-b border-gray-200 h-[52px] flex items-center justify-between">
                                        <div className="flex items-center px-4 gap-2 h-[34px]">
                                            <ToggleButton
                                                noContainer={true}
                                                icon={
                                                    <SidebarIcon className="h-3.5 w-3.5" />
                                                }
                                                title="Light preview"
                                                onClick={() =>
                                                    setIsLeftPanelOpen(
                                                        !isLeftPanelOpen
                                                    )
                                                }
                                                selected={true}
                                            />
                                            <div className="flex items-center rounded-lg bg-[#F5F7FA] p-0.5">
                                                <ToggleButton
                                                    icon={
                                                        <LaptopIcon
                                                            className="h-3.5 w-3.5"
                                                            weight={
                                                                true
                                                                    ? 'fill'
                                                                    : 'regular'
                                                            }
                                                        />
                                                    }
                                                    title="Light preview"
                                                    onClick={() => {
                                                        setIsMobile(false)
                                                    }}
                                                    selected={!isMobile}
                                                />
                                                <ToggleButton
                                                    icon={
                                                        <DeviceMobileSpeakerIcon
                                                            className="h-3.5 w-3.5"
                                                            weight={
                                                                false
                                                                    ? 'fill'
                                                                    : 'regular'
                                                            }
                                                        />
                                                    }
                                                    title="Dark preview"
                                                    onClick={() => {
                                                        setIsMobile(true)
                                                    }}
                                                    selected={isMobile}
                                                />
                                            </div>
                                            <div className="flex items-center rounded-lg bg-gray-100 p-0.5">
                                                <ToggleButton
                                                    icon={
                                                        <Sun
                                                            className="h-3.5 w-3.5"
                                                            weight={
                                                                previewTheme ===
                                                                'light'
                                                                    ? 'fill'
                                                                    : 'regular'
                                                            }
                                                        />
                                                    }
                                                    title="Light preview"
                                                    onClick={() =>
                                                        setPreviewTheme('light')
                                                    }
                                                    selected={
                                                        previewTheme === 'light'
                                                    }
                                                />
                                                <ToggleButton
                                                    icon={
                                                        <MoonStarsIcon
                                                            className="h-3.5 w-3.5"
                                                            weight={
                                                                previewTheme ===
                                                                'dark'
                                                                    ? 'fill'
                                                                    : 'regular'
                                                            }
                                                        />
                                                    }
                                                    title="Dark preview"
                                                    onClick={() =>
                                                        setPreviewTheme('dark')
                                                    }
                                                    selected={
                                                        previewTheme === 'dark'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center px-4 gap-2">
                                            <MenuV2
                                                trigger={
                                                    <ButtonV2
                                                        buttonType={
                                                            ButtonV2Type.SECONDARY
                                                        }
                                                        aria-label="Open data menu"
                                                        title="Open data menu"
                                                        leftSlot={{
                                                            slot: (
                                                                <SlidersIcon
                                                                    className="h-3.5 w-3.5"
                                                                    weight="fill"
                                                                    aria-hidden
                                                                />
                                                            ),
                                                        }}
                                                        subType={
                                                            ButtonV2SubType.ICON_ONLY
                                                        }
                                                    />
                                                }
                                                items={[
                                                    {
                                                        label: 'DATA',
                                                        showSeparator: true,
                                                        items: [
                                                            {
                                                                label: {
                                                                    text: 'Import',
                                                                    leftSlot: (
                                                                        <DownloadIcon
                                                                            className="h-3.5 w-3.5"
                                                                            weight="fill"
                                                                        />
                                                                    ),
                                                                },

                                                                actionType:
                                                                    MenuV2ItemActionType.PRIMARY,
                                                                onClick: () =>
                                                                    setShowImportWizard(
                                                                        true
                                                                    ),
                                                            },
                                                        ],
                                                    },
                                                ]}
                                                alignment={
                                                    MenuV2Alignment.START
                                                }
                                                side={MenuV2Side.BOTTOM}
                                            />
                                            <ButtonV2
                                                onClick={() => {
                                                    navigate({
                                                        to: '/studio/preview/$branchId',
                                                        params: { branchId },
                                                        search: {
                                                            from: getCurrentReturnPath(),
                                                        },
                                                    })
                                                }}
                                                buttonType={
                                                    ButtonV2Type.SECONDARY
                                                }
                                                aria-label="Open preview"
                                                title="Open preview"
                                                leftSlot={{
                                                    slot: (
                                                        <PlayIcon
                                                            className="h-3.5 w-3.5"
                                                            weight="fill"
                                                            aria-hidden
                                                        />
                                                    ),
                                                }}
                                                subType={
                                                    ButtonV2SubType.ICON_ONLY
                                                }
                                            />
                                            <ButtonV2
                                                text="Save"
                                                onClick={() => handleSave()}
                                                buttonType={
                                                    ButtonV2Type.SECONDARY
                                                }
                                                loading={saving}
                                                disabled={saving || !hasChanges}
                                            />
                                            <ButtonV2
                                                text="Publish"
                                                onClick={() =>
                                                    setShowPublishModal(true)
                                                }
                                                buttonType={
                                                    ButtonV2Type.PRIMARY
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        {componentTokens ? (
                                            <ThemeProvider
                                                theme={previewTheme}
                                                componentTokens={
                                                    componentTokens
                                                }
                                            >
                                                <div
                                                    className={`min-h-full ${
                                                        previewTheme === 'dark'
                                                            ? 'bg-gray-900'
                                                            : 'bg-gray-50'
                                                    } p-8`}
                                                >
                                                    {activeTab ===
                                                        'components' &&
                                                    selectedComponent ? (
                                                        <SingleComponentShowcase
                                                            componentKey={
                                                                selectedComponent
                                                            }
                                                            theme={previewTheme}
                                                        />
                                                    ) : (
                                                        <ComponentShowcase
                                                            isMobile={isMobile}
                                                            theme={previewTheme}
                                                        />
                                                    )}
                                                </div>
                                            </ThemeProvider>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                                Resolving tokens...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Panel>
                        </Group>
                    </div>
                </SidebarV2>

                {showImportWizard && (
                    <ImportWizard
                        onImport={handleImportTokens}
                        onClose={() => setShowImportWizard(false)}
                    />
                )}

                {showPublishModal && (
                    <PublishModal
                        latestVersion={branch.latestVersion}
                        onClose={() => setShowPublishModal(false)}
                        onPublish={async (
                            version,
                            changelog,
                            isBreaking,
                            isPrerelease
                        ) => {
                            const v = await publishVersion({
                                version,
                                brandConfig: brand,
                                changelog,
                                isBreaking,
                                isPrerelease,
                            })
                            if (v) {
                                setShowPublishModal(false)
                                setHasChanges(false)
                            }
                        }}
                        loading={publishLoading}
                    />
                )}
            </div>
        </RequireAuth>
    )
}

// ---------------------------------------------------------------------------
// Publish Modal
// ---------------------------------------------------------------------------

interface PublishModalProps {
    latestVersion: string | null | undefined
    onClose: () => void
    onPublish: (
        version: string,
        changelog: string,
        isBreaking: boolean,
        isPrerelease: boolean
    ) => Promise<void>
    loading: boolean
}

function PublishModal({
    latestVersion,
    onClose,
    onPublish,
    loading,
}: PublishModalProps) {
    const suggested = latestVersion
        ? incrementVersion(latestVersion, 'patch')
        : '1.0.0'
    const [version, setVersion] = useState(suggested)
    const [changelog, setChangelog] = useState('')
    const [isBreaking, setIsBreaking] = useState(false)
    const [isPrerelease, setIsPrerelease] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const vValid = validateVersion(version)

    const handlePublish = async () => {
        if (loading || isSubmitting || !vValid.valid) return
        setIsSubmitting(true)
        try {
            await onPublish(version, changelog, isBreaking, isPrerelease)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Publish Version
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Make this token branch available to teams
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Version
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="1.0.0"
                            className={`w-full px-3 py-2 text-sm font-mono border rounded-lg focus:outline-none focus:ring-2 ${
                                vValid.valid
                                    ? 'border-gray-300 focus:ring-blue-500'
                                    : 'border-red-300 focus:ring-red-400'
                            }`}
                        />
                        {!vValid.valid && (
                            <p className="text-xs text-red-500 mt-1">
                                {vValid.error}
                            </p>
                        )}

                        {latestVersion && (
                            <div className="flex gap-2 mt-2">
                                {(['patch', 'minor', 'major'] as const).map(
                                    (bump) => (
                                        <button
                                            key={bump}
                                            onClick={() =>
                                                setVersion(
                                                    incrementVersion(
                                                        latestVersion,
                                                        bump
                                                    )
                                                )
                                            }
                                            className="px-2 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600 capitalize"
                                        >
                                            {bump} (
                                            {incrementVersion(
                                                latestVersion,
                                                bump
                                            )}
                                            )
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Changelog
                        </label>
                        <textarea
                            value={changelog}
                            onChange={(e) => setChangelog(e.target.value)}
                            placeholder="What's changed in this version?"
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isBreaking}
                                onChange={(e) =>
                                    setIsBreaking(e.target.checked)
                                }
                                className="w-4 h-4 rounded text-red-600"
                            />
                            <span className="text-sm text-gray-700">
                                Breaking change
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPrerelease}
                                onChange={(e) =>
                                    setIsPrerelease(e.target.checked)
                                }
                                className="w-4 h-4 rounded text-purple-600"
                            />
                            <span className="text-sm text-gray-700">
                                Pre-release
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        disabled={loading || isSubmitting}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={loading || isSubmitting || !vValid.valid}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading || isSubmitting ? (
                            <Spinner className="w-4 h-4 animate-spin" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                        Publish v{version}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Loading & Error Screens
// ---------------------------------------------------------------------------

function LoadingScreen({ message }: { message: string }) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">{message}</p>
            </div>
        </div>
    )
}

function ErrorScreen({
    message,
    onBack,
}: {
    message: string
    onBack: () => void
}) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <WarningCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">
                    Failed to load branch
                </p>
                <p className="text-sm text-gray-500 mb-4">{message}</p>
                <button
                    onClick={onBack}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back to Studio
                </button>
            </div>
        </div>
    )
}
