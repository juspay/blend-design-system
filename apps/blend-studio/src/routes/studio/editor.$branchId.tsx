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
    TooltipV2,
} from '@juspay/blend-design-system'
import {
    Panel,
    Group,
    Separator,
    type GroupImperativeHandle,
    type PanelImperativeHandle,
} from 'react-resizable-panels'
import {
    buildBrandFoundation,
    type BrandConfig,
} from '@juspay/blend-design-system/tokens'
import {
    useBranchWithMock,
    usePublishVersionWithMock,
    useCreateSnapshotWithMock,
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
    PublishModal,
    EditorLoadingScreen,
    EditorErrorScreen,
    type EditorTabId,
    type ColorGroupKey,
    ensureTypographyDefaults,
    getEffectiveFontFamily,
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
    Code,
    TextAa,
    Repeat,
    Stack,
    LaptopIcon,
    DeviceMobileSpeakerIcon,
    MoonStarsIcon,
    SidebarIcon,
    PlayIcon,
    SlidersIcon,
    DownloadIcon,
    PaletteIcon,
    BezierCurveIcon,
    GitBranchIcon,
    CaretLeftIcon,
    ReadCvLogoIcon,
    XIcon,
    CaretRightIcon,
} from '@phosphor-icons/react'
import { SidebarV2 } from '@juspay/blend-design-system'
import { getCurrentReturnPath } from '@/lib/return-path'
import {
    getFontFamilyStyle,
    loadTypographyPreviewFonts,
} from '@/components/utils'
import {
    AUTO_SAVE_DELAY_MS,
    TOKEN_RESOLVE_DEBOUNCE_MS,
    EDITOR_LEFT_PANEL_ID,
    EDITOR_RIGHT_PANEL_ID,
    EDITOR_THIRD_PANEL_ID,
    LEFT_PANEL_TOGGLE_MS,
    LEFT_PANEL_MIN_SIZE,
    LEFT_PANEL_MAX_SIZE,
    LEFT_PANEL_DEFAULT_SIZE,
    PREVIEW_PANEL_MIN_SIZE,
    PREVIEW_PANEL_MAX_SIZE,
    PREVIEW_PANEL_DEFAULT_SIZE,
    PREVIEW_PANEL_DEFAULT_SIZE_WITH_GUIDE,
    THIRD_PANEL_MIN_SIZE,
    THIRD_PANEL_MAX_SIZE,
    THIRD_PANEL_DEFAULT_SIZE,
    applyLeftPanelToggleTransition,
    computeBrandDiffs,
    mergeImportedBrandConfig,
    getPreviewSurfaceClassName,
    resolveComponentTokens,
} from '@/utils'
export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TabConfig {
    id: EditorTabId
    icon: React.ComponentType<{ className?: string; color?: string }>
    label: string
    color?: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EDITOR_TABS: TabConfig[] = [
    { id: 'colors', icon: PaletteIcon, label: 'Colors', color: '#99A0AE' },
    { id: 'typography', icon: TextAa, label: 'Type', color: '#99A0AE' },
    { id: 'radius', icon: BezierCurveIcon, label: 'Radius', color: '#99A0AE' },
    { id: 'shadows', icon: Stack, label: 'Shadows', color: '#99A0AE' },
    { id: 'darkmode', icon: Moon, label: 'Dark', color: '#99A0AE' },
    { id: 'components', icon: Repeat, label: 'Components', color: '#99A0AE' },
    { id: 'json', icon: Code, label: 'JSON', color: '#99A0AE' },
]

/** Tab switcher items aligned with `EDITOR_TABS` (e.g. secondary rail / panel). */
const sidebarItems = EDITOR_TABS.map(({ id, icon: Icon, label, color }) => ({
    label,
    value: id,
    showInPanel: true,
    icon: <Icon className="h-4 w-4" color={color} aria-hidden />,
}))

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
    const [savedBrand, setSavedBrand] = useState<BrandConfig | null>(null)
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
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const leftPanelRef = useRef<PanelImperativeHandle | null>(null)
    const groupRef = useRef<GroupImperativeHandle | null>(null)
    const leftPanelOuterElRef = useRef<HTMLDivElement | null>(null)
    const [isPanelThreeOpen, setIsPanelThreeOpen] = useState(false)

    const leftPanelElementRef = useCallback((node: HTMLDivElement | null) => {
        leftPanelOuterElRef.current = node
    }, [])

    useLayoutEffect(() => {
        const el = leftPanelOuterElRef.current
        if (!el) return
        return applyLeftPanelToggleTransition(el, LEFT_PANEL_TOGGLE_MS)
    }, [isLeftPanelOpen])

    useEffect(() => {
        if (!isPanelThreeOpen) return

        const frameId = requestAnimationFrame(() => {
            groupRef.current?.setLayout({
                [EDITOR_LEFT_PANEL_ID]: Number(LEFT_PANEL_DEFAULT_SIZE),
                [EDITOR_RIGHT_PANEL_ID]: Number(
                    PREVIEW_PANEL_DEFAULT_SIZE_WITH_GUIDE
                ),
                [EDITOR_THIRD_PANEL_ID]: Number(THIRD_PANEL_DEFAULT_SIZE),
            })
        })

        return () => cancelAnimationFrame(frameId)
    }, [isPanelThreeOpen])

    // Sync brand from branch on load (apply default font when missing)
    useEffect(() => {
        if (!branch?.brandConfig) return

        const config = ensureTypographyDefaults(branch.brandConfig)
        setSavedBrand(config)
        setBrand((current) =>
            current ? ensureTypographyDefaults(current) : config
        )
    }, [branch?.brandConfig])

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
        }, TOKEN_RESOLVE_DEBOUNCE_MS)
        return () => {
            if (resolveTimer.current) clearTimeout(resolveTimer.current)
        }
    }, [brand])

    const previewBrand = debouncedBrand

    const componentTokens = useMemo(
        () =>
            previewBrand
                ? resolveComponentTokens(previewBrand, previewTheme)
                : null,
        [previewBrand, previewTheme]
    )

    const previewFoundation = useMemo(
        () => (previewBrand ? buildBrandFoundation(previewBrand) : undefined),
        [previewBrand]
    )

    const previewFontStyle = useMemo(
        () => getFontFamilyStyle(getEffectiveFontFamily(previewBrand)),
        [previewBrand]
    )

    useEffect(() => {
        loadTypographyPreviewFonts([getEffectiveFontFamily(previewBrand)])
    }, [previewBrand?.font?.family])

    useEffect(() => {
        setIsMobile(isPanelThreeOpen)
    }, [isPanelThreeOpen])

    const diffs = useMemo(() => computeBrandDiffs(brand), [brand])

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

    const handleColorGroupReset = useCallback(
        (group: ColorGroupKey, shades: Record<string, string>) => {
            setBrand((prev) => {
                if (!prev) return prev
                const updated: BrandConfig = {
                    ...prev,
                    colors: {
                        ...prev.colors,
                        [group]: shades,
                    },
                }

                if (
                    savedBrand &&
                    JSON.stringify(updated) === JSON.stringify(savedBrand)
                ) {
                    setHasChanges(false)
                    setSaving(false)
                }

                return updated
            })
        },
        [savedBrand]
    )

    const handleImportTokens = useCallback((imported: Partial<BrandConfig>) => {
        setBrand((prev) => {
            if (!prev) return prev
            setHasChanges(true)
            return mergeImportedBrandConfig(prev, imported)
        })
        setShowImportWizard(false)
    }, [])

    const handleSave = useCallback(async () => {
        if (!brand || !branchId) return
        setSaving(true)
        try {
            await updateBranch(branchId, { brandConfig: brand })
            await createSnapshot(brand, 'Manual save', false)
            setSavedBrand(brand)
            setHasChanges(false)
        } catch (err) {
            console.error('Save failed:', err)
        } finally {
            setSaving(false)
        }
    }, [brand, branchId, updateBranch, createSnapshot])

    // Loading state
    if (branchLoading) {
        return <EditorLoadingScreen message="Loading branch..." />
    }

    // Error state
    if (branchError || !branch) {
        return (
            <EditorErrorScreen
                message={branchError || 'Branch not found'}
                onBack={() => navigate({ to: '/studio' })}
            />
        )
    }

    if (!brand || !savedBrand) return null

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
                            groupRef={groupRef}
                            orientation="horizontal"
                            style={{ height: '100%' }}
                            defaultLayout={{
                                [EDITOR_LEFT_PANEL_ID]: Number(
                                    LEFT_PANEL_DEFAULT_SIZE
                                ),
                                [EDITOR_RIGHT_PANEL_ID]: Number(
                                    PREVIEW_PANEL_DEFAULT_SIZE
                                ),
                            }}
                        >
                            <Panel
                                id={EDITOR_LEFT_PANEL_ID}
                                panelRef={leftPanelRef}
                                elementRef={leftPanelElementRef}
                                minSize={
                                    isLeftPanelOpen ? LEFT_PANEL_MIN_SIZE : 0
                                }
                                maxSize={
                                    isLeftPanelOpen ? LEFT_PANEL_MAX_SIZE : 0
                                }
                                defaultSize={LEFT_PANEL_DEFAULT_SIZE}
                                groupResizeBehavior="preserve-relative-size"
                                className="min-h-0 flex flex-col"
                            >
                                <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
                                    <div className="bg-white border-b border-gray-200 h-[52px] flex min-w-[280px] items-center justify-between gap-3 px-4">
                                        <ButtonV2
                                            onClick={() =>
                                                navigate({ to: '/studio' })
                                            }
                                            buttonType={ButtonV2Type.SECONDARY}
                                            subType={ButtonV2SubType.INLINE}
                                            leftSlot={{
                                                slot: (
                                                    <CaretLeftIcon
                                                        className="size-4 shrink-0 text-gray-400"
                                                        size={16}
                                                        weight="bold"
                                                    />
                                                ),
                                            }}
                                        />
                                        <div className="flex min-w-0 flex-1 items-center gap-2">
                                            <GitBranchIcon
                                                className="size-4 shrink-0 text-gray-400"
                                                size={16}
                                            />
                                            <TooltipV2 content={branch.name}>
                                                <span className="truncate text-sm font-semibold text-gray-900">
                                                    {branch.name}
                                                </span>
                                            </TooltipV2>
                                            <TooltipV2 content={branch.id}>
                                                <span className="hidden max-w-[180px] truncate text-xs font-mono text-gray-400 lg:inline">
                                                    {branch.id}
                                                </span>
                                            </TooltipV2>
                                            {hasChanges && (
                                                <TagV2
                                                    text={'Unsaved'}
                                                    size={TagV2Size.SM}
                                                    color={TagV2Color.WARNING}
                                                />
                                            )}
                                        </div>
                                        {diffs.length > 0 && (
                                            <span className="shrink-0">
                                                <TagV2
                                                    text={`${diffs.length} Changes`}
                                                    size={TagV2Size.SM}
                                                    color={TagV2Color.WARNING}
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                                        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                                            <div className="flex h-full min-w-0 flex-1 flex-col">
                                                {activeTab === 'colors' && (
                                                    <ColorsTab
                                                        brand={brand}
                                                        savedBrand={savedBrand}
                                                        onChange={
                                                            handleBrandChange
                                                        }
                                                        onColorGroupReset={
                                                            handleColorGroupReset
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
                                                        branchId={branchId}
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
                                minSize={PREVIEW_PANEL_MIN_SIZE}
                                maxSize={PREVIEW_PANEL_MAX_SIZE}
                                defaultSize={
                                    isPanelThreeOpen
                                        ? PREVIEW_PANEL_DEFAULT_SIZE_WITH_GUIDE
                                        : PREVIEW_PANEL_DEFAULT_SIZE
                                }
                                groupResizeBehavior="preserve-relative-size"
                                className="min-h-0 min-w-0"
                            >
                                <div className="h-full flex flex-col overflow-hidden bg-[#f8fafc]">
                                    <div className="bg-white border-b border-gray-200 h-[52px] flex items-center justify-between">
                                        <div className="flex items-center px-4 gap-2 h-[34px]">
                                            {!isLeftPanelOpen && (
                                                <ButtonV2
                                                    onClick={() =>
                                                        navigate({
                                                            to: '/studio',
                                                        })
                                                    }
                                                    buttonType={
                                                        ButtonV2Type.SECONDARY
                                                    }
                                                    subType={
                                                        ButtonV2SubType.INLINE
                                                    }
                                                    leftSlot={{
                                                        slot: (
                                                            <CaretLeftIcon
                                                                className="size-4 shrink-0 text-gray-400"
                                                                size={16}
                                                                weight="bold"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            )}
                                            <ToggleButton
                                                noContainer={true}
                                                icon={
                                                    <SidebarIcon
                                                        className="h-3.5 w-3.5"
                                                        color={'#99A0AE'}
                                                    />
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
                                                            color={
                                                                isMobile
                                                                    ? '#99A0AE'
                                                                    : '#000000'
                                                            }
                                                            weight="fill"
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
                                                            color={
                                                                !isMobile
                                                                    ? '#99A0AE'
                                                                    : '#000000'
                                                            }
                                                            weight="fill"
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
                                                            color={
                                                                previewTheme ===
                                                                'light'
                                                                    ? '#99A0AE'
                                                                    : '#000000'
                                                            }
                                                            weight="fill"
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
                                                            color={
                                                                previewTheme ===
                                                                'dark'
                                                                    ? '#99A0AE'
                                                                    : '#000000'
                                                            }
                                                            weight="fill"
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
                                                                    color="#99A0AE"
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
                                                                            color="#99A0AE"
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
                                                            color="#99A0AE"
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
                                    {activeTab === 'typography' && (
                                        <div className="bg-[#FEFCE8] p-[12px] flex items-center justify-between border border-[#ECEFF3]">
                                            <div className="text-[14px] font-[400] text-[#A65F00]">
                                                The selected font is used as a
                                                visual reference & must be added
                                                manually to your codebase.
                                            </div>
                                            <button
                                                className="flex items-center gap-1 text-[14px] font-[400] text-[#A65F00]"
                                                onClick={() =>
                                                    setIsPanelThreeOpen(
                                                        !isPanelThreeOpen
                                                    )
                                                }
                                            >
                                                {'View Guide'}
                                                <span>
                                                    <CaretRightIcon
                                                        size={16}
                                                        className="text-[#A65F00]"
                                                    />
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex-1 overflow-y-auto">
                                        {componentTokens ? (
                                            <ThemeProvider
                                                theme={previewTheme}
                                                foundationTokens={
                                                    previewFoundation
                                                }
                                                componentTokens={
                                                    componentTokens
                                                }
                                            >
                                                <div
                                                    className={`min-h-full p-8 ${getPreviewSurfaceClassName(previewTheme)}`}
                                                    style={previewFontStyle}
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
                            {isPanelThreeOpen && (
                                <>
                                    <Separator className="w-px shrink-0 cursor-col-resize bg-gray-200 transition-colors hover:bg-blue-400" />
                                    <Panel
                                        id={EDITOR_THIRD_PANEL_ID}
                                        minSize={THIRD_PANEL_MIN_SIZE}
                                        maxSize={THIRD_PANEL_MAX_SIZE}
                                        defaultSize={THIRD_PANEL_DEFAULT_SIZE}
                                        groupResizeBehavior="preserve-relative-size"
                                        className="min-h-0 min-w-0"
                                    >
                                        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
                                            <div className="flex h-[52px] px-[16px] py-[12px] justify-between shrink-0 items-center border-b border-gray-200 bg-white">
                                                <div className="flex items-center gap-2">
                                                    <ReadCvLogoIcon
                                                        size={16}
                                                        weight="fill"
                                                    />
                                                    <div className="text-[14px] font-[400] text-[#2B303B]">
                                                        Font Setup Guide
                                                    </div>
                                                </div>
                                                <ButtonV2
                                                    buttonType={
                                                        ButtonV2Type.SECONDARY
                                                    }
                                                    onClick={() =>
                                                        setIsPanelThreeOpen(
                                                            false
                                                        )
                                                    }
                                                    leftSlot={{
                                                        slot: (
                                                            <XIcon size={16} />
                                                        ),
                                                    }}
                                                    subType={
                                                        ButtonV2SubType.INLINE
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                </>
                            )}
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
                                setSavedBrand(brand)
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
