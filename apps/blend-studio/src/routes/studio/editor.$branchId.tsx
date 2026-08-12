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
    CodeEditorV2,
} from '@juspay/blend-design-system'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsSize,
    TabsTrigger,
    TabsVariant,
} from '@juspay/blend-design-system/deprecated/tabs'
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
        if (!isPanelThreeOpen || activeTab !== 'typography') return

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
        setIsMobile(isPanelThreeOpen && activeTab === 'typography')
    }, [isPanelThreeOpen, activeTab])

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
                                    isPanelThreeOpen &&
                                    activeTab === 'typography'
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
                                        <div className="bg-[#FEFCE8] p-[12px] flex items-center justify-between border-b border-[#ECEFF3]">
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
                            {isPanelThreeOpen && activeTab === 'typography' && (
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
                                            <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-[16px] py-[24px]">
                                                <div className="shrink-0">
                                                    <div className="text-[18px] font-[500] text-[#222530] leading-[24px] font-medium">
                                                        Get Started with the
                                                        Google Fonts
                                                    </div>
                                                    <div className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                                                        This guide explains how
                                                        to use the Google Fonts
                                                        API to add fonts to your
                                                        web pages. Since
                                                        typography is not
                                                        automatically pushed to
                                                        your codebase yet, you
                                                        need to manually add the
                                                        selected font to your
                                                        app/website.
                                                    </div>
                                                    <div className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                                                        Once the font is
                                                        installed, all text
                                                        styles, components, and
                                                        layouts will render
                                                        correctly with your
                                                        chosen brand typography.
                                                    </div>
                                                </div>
                                                <Tabs
                                                    defaultValue="web"
                                                    variant={
                                                        TabsVariant.UNDERLINE
                                                    }
                                                    size={TabsSize.MD}
                                                    className="mt-[24px] flex min-h-0 flex-1 flex-col"
                                                >
                                                    <TabsList
                                                        variant={
                                                            TabsVariant.UNDERLINE
                                                        }
                                                        size={TabsSize.MD}
                                                        className="shrink-0"
                                                    >
                                                        <TabsTrigger value="web">
                                                            Web
                                                        </TabsTrigger>
                                                        <TabsTrigger value="android">
                                                            Android
                                                        </TabsTrigger>
                                                        <TabsTrigger value="ios">
                                                            iOS
                                                        </TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent
                                                        value="web"
                                                        className="mt-4 min-h-0 flex-1 overflow-y-auto"
                                                    >
                                                        <FontSetupGuideHTMLContent />
                                                    </TabsContent>
                                                    <TabsContent
                                                        value="android"
                                                        className="mt-4 min-h-0 flex-1 overflow-y-auto"
                                                    >
                                                        <FontSetupGuideAndroidContent />
                                                    </TabsContent>
                                                    <TabsContent
                                                        value="ios"
                                                        className="mt-4 min-h-0 flex-1 overflow-y-auto"
                                                    >
                                                        <FontSetupGuideIosContent />
                                                    </TabsContent>
                                                </Tabs>
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

function FontSetupGuideHTMLContent() {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 1 : Add the font
            </p>
            <CodeEditorV2
                language="html"
                value={`<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
</head>`}
                showLineNumbers={true}
                header={{ title: 'index.html' }}
                minHeight={150}
            />
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 2 : Add the font family to your CSS
            </p>
            <CodeEditorV2
                language="css"
                value={`@font-face {
font-family: 'Inter';
src: url('https://fonts.googleapis.com/css2?family=Inter&display=swap') format('woff2');
font-weight: 400;
font-style: normal;
}`}
                showLineNumbers={true}
                header={{ title: 'styles.css' }}
                minHeight={170}
            />
        </div>
    )
}

function FontSetupGuideAndroidContent() {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 1 : Download the Font
            </p>
            <p className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                <ul className="list-disc pl-5">
                    <li>
                        Go to{' '}
                        <a
                            className="text-[#007AFF]"
                            href="https://fonts.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fonts.google.com
                        </a>
                    </li>
                    <li>Search for the font you want to use</li>
                    <li>Click on the font you want to use</li>
                    <li>Click on the "Download" button</li>
                    <li>Save the font to your computer</li>
                </ul>
            </p>
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 2 : Add Fonts to the Project
            </p>
            <p className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                Create a font folder inside res.
            </p>
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 3 : Use Font in XML
            </p>
            <CodeEditorV2
                language="html"
                value={`<TextView
android:id="@+id/text_view"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="Hello, World!"
android:fontFamily="Inter"
/>`}
                showLineNumbers={true}
                header={{ title: 'MainLayout.tsx' }}
                minHeight={170}
            />
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 4 : Use Font Programmatically (Kotlin)
            </p>
            <CodeEditorV2
                language="tsx"
                value={`val typeface = resources.getFont(R.font.inter_regular)
textView.typeface = typeface`}
                showLineNumbers={true}
                header={{ title: 'MainActivity.kt' }}
                minHeight={170}
            />
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 5 : (Optional) Create a Font Family XML
            </p>
            <CodeEditorV2
                language="html"
                value={`<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">

    <font
        app:font="@font/inter_regular"
        app:fontStyle="normal"
        app:fontWeight="400" />

    <font
        app:font="@font/inter_medium"
        app:fontStyle="normal"
        app:fontWeight="500" />

    <font
        app:font="@font/inter_bold"
        app:fontStyle="normal"
        app:fontWeight="700" />

</font-family>`}
                showLineNumbers={true}
                header={{ title: 'res/font/inter.xml' }}
            />
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 4 : Final Step
            </p>
            <CodeEditorV2
                language="html"
                value={`<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:fontFamily="@font/inter" />`}
                showLineNumbers={true}
                header={{ title: 'MainLayout.tsx' }}
                minHeight={170}
            />
        </div>
    )
}
function FontSetupGuideIosContent() {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 1 : Download the Font
            </p>
            <ul className="list-disc pl-5 text-[12px] font-[400] text-[#717784] leading-[18px]">
                <li>
                    Go to{' '}
                    <a
                        className="text-[#007AFF]"
                        href="https://fonts.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Fonts
                    </a>
                </li>
                <li>Download the font family (e.g., Inter, Poppins, Roboto)</li>
                <li>Extract the ZIP file</li>
            </ul>

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 2 : Add Font Files to Xcode
            </p>
            <ul className="list-disc pl-5 text-[12px] font-[400] text-[#717784] leading-[18px]">
                <li>Open your Xcode project</li>
                <li>
                    Drag the <code>.ttf</code> or <code>.otf</code> files into
                    the project navigator
                </li>
                <li>
                    Make sure <strong>Copy items if needed</strong> is checked
                    and your app target is selected
                </li>
            </ul>
            <CodeEditorV2
                language="markdown"
                value={`Project
 ├── Fonts
 │   ├── Inter-Regular.ttf
 │   ├── Inter-Medium.ttf
 │   └── Inter-Bold.ttf`}
                showLineNumbers={false}
                header={{ title: 'Project structure' }}
                minHeight={120}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 3 : Register Fonts in Info.plist
            </p>
            <p className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                Add the <strong>Fonts provided by application</strong>{' '}
                (UIAppFonts) key.
            </p>
            <CodeEditorV2
                language="html"
                value={`<key>UIAppFonts</key>
<array>
    <string>Inter-Regular.ttf</string>
    <string>Inter-Medium.ttf</string>
    <string>Inter-Bold.ttf</string>
</array>`}
                showLineNumbers={true}
                header={{ title: 'Info.plist' }}
                minHeight={150}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 4 : Find the Actual Font Name
            </p>
            <p className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                The file name is not always the font name. Print all available
                fonts to confirm the correct PostScript name.
            </p>
            <CodeEditorV2
                language="javascript"
                value={`for family in UIFont.familyNames.sorted() {
    print("Family: \\(family)")
    for font in UIFont.fontNames(forFamilyName: family) {
        print("  \\(font)")
    }
}`}
                showLineNumbers={true}
                header={{ title: 'FontDebug.swift' }}
                minHeight={150}
            />
            <CodeEditorV2
                language="markdown"
                value={`Example output:

Family: Inter
  Inter-Regular
  Inter-Medium
  Inter-Bold`}
                showLineNumbers={false}
                header={{ title: 'Console output' }}
                minHeight={110}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 5 : Use the Font in UIKit
            </p>
            <CodeEditorV2
                language="javascript"
                value={`label.font = UIFont(name: "Inter-Regular", size: 16)
titleLabel.font = UIFont(name: "Inter-Bold", size: 24)`}
                showLineNumbers={true}
                header={{ title: 'ViewController.swift' }}
                minHeight={100}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Step 6 : Use the Font in SwiftUI
            </p>
            <CodeEditorV2
                language="javascript"
                value={`Text("Hello World")
    .font(.custom("Inter-Regular", size: 16))

Text("Title")
    .font(.custom("Inter-Bold", size: 24))`}
                showLineNumbers={true}
                header={{ title: 'ContentView.swift' }}
                minHeight={120}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                React Native (iOS) Specific Steps
            </p>
            <p className="text-[12px] font-[400] text-[#717784] leading-[18px]">
                If you&apos;re using React Native, add fonts to{' '}
                <code>assets/fonts/</code> and link them with{' '}
                <code>react-native-asset</code>.
            </p>
            <CodeEditorV2
                language="javascript"
                value={`module.exports = {
  assets: ['./assets/fonts'],
};`}
                showLineNumbers={true}
                header={{ title: 'react-native.config.js' }}
                minHeight={90}
            />
            <CodeEditorV2
                language="markdown"
                value={`npx react-native-asset

cd ios
pod install
cd ..
npx react-native run-ios`}
                showLineNumbers={false}
                header={{ title: 'Terminal' }}
                minHeight={110}
            />
            <CodeEditorV2
                language="javascript"
                value={`const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
  },
});`}
                showLineNumbers={true}
                header={{ title: 'styles.ts' }}
                minHeight={110}
            />

            <p className="text-[14px] font-[500] text-[#181B25] font-medium">
                Verification Checklist
            </p>
            <ul className="list-disc pl-5 text-[12px] font-[400] text-[#717784] leading-[18px]">
                <li>Downloaded .ttf/.otf files</li>
                <li>Added files to Xcode</li>
                <li>Added file names to UIAppFonts</li>
                <li>Confirmed the actual font name</li>
                <li>Cleaned and rebuilt the project</li>
                <li>Applied the font using UIFont or .custom()</li>
            </ul>
        </div>
    )
}
