# TabsV2 Component Documentation

## Requirements

Create a composable, accessible Tabs component that supports multiple visual variants and interaction patterns:

- **Tabs Root (TabsV2)**: Container component managing tab state and context
- **Tabs List (TabsV2List)**: Horizontal list container for tab triggers with scroll support
- **Tabs Trigger (TabsV2Trigger)**: Individual tab button with icon slots and close button support
- **Tabs Content (TabsV2Content)**: Content panel displayed when tab is active
- **Multiple Variants**: BOXED, FLOATING, UNDERLINE, PILLS visual styles
- **Multiple Sizes**: MD and LG sizes for different density needs
- **Skeleton Support**: Loading state with pulse/wave skeleton variants
- **Sticky Header**: Optional sticky positioning with configurable offset
- **Expanded Mode**: Tabs can expand to fill available width
- **Fit Content**: Tabs can shrink to fit their content width
- **Closable Tabs**: Individual tabs can be closed with an X button
- **Left/Right Slots**: Support for icons or content before/after tab label
- **Responsive Design**: Breakpoint-specific tokens using `useResponsiveTokens`
- **Accessibility**: Full ARIA support with proper roles and keyboard navigation
- **Theme Support**: Light and dark mode token support
- **Context Provider**: React context for sharing tab state across sub-components

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Left Slot]  [Tab Label]  [Right Slot]  [Close Button]  │  [Tab 2] [Tab 3] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                        [Tab Content Panel]                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

![Tabs Anatomy](./TabsAnatomy.png)

- **TabsV2 Root**: Main container providing context and state management
- **TabsV2List**: Horizontal scrollable container with optional sticky positioning
- **TabsV2Trigger**: Individual tab button with support for icons and close action
- **TabsV2Content**: Content area displayed when associated tab is active
- **Active Indicator**: Visual indicator for active tab (animated for non-underline variants)
- **Underline Indicator**: CSS-based sliding indicator for underline variant

## Props & Types

```typescript
// ── Enums ─────────────────────────────────────────────────────────────────────

enum TabsV2Variant {
    BOXED = 'boxed',
    FLOATING = 'floating',
    UNDERLINE = 'underline',
    PILLS = 'pills',
}

enum TabsV2Size {
    MD = 'md',
    LG = 'lg',
}

export type TabsV2State = 'default' | 'hover' | 'active' | 'disabled'

// ── Tab Item Type ─────────────────────────────────────────────────────────────

type TabsV2TabItem = {
    value: string
    label: string
    content: ReactNode
    disabled?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    newItem?: boolean
}

// ── TabsV2 (Root) Props ───────────────────────────────────────────────────────

type TabsV2Props = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: TabsV2Variant // Defaults to UNDERLINE
    size?: TabsV2Size // Defaults to MD
    expanded?: boolean // Expand tabs to fill width
    fitContent?: boolean // Shrink to fit content
    disabled?: boolean // Disable all tabs
    showSkeleton?: boolean // Show skeleton loading state
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean // Enable sticky positioning
    offsetTop?: number // Sticky offset from top
}

// ── TabsV2List Props ──────────────────────────────────────────────────────────

type TabsV2ListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsV2Variant
    size?: TabsV2Size
    expanded?: boolean
    fitContent?: boolean
    disabled?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean
    offsetTop?: number
}

// ── TabsV2Trigger Props ───────────────────────────────────────────────────────

type TabsV2TriggerProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Trigger
> & {
    value: string
    variant?: TabsV2Variant
    size?: TabsV2Size
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    children: string | number
    disabled?: boolean
    closable?: boolean // Show close button
    onClose?: () => void // Close handler
    isActive?: boolean
    isOverlay?: boolean // Render as overlay style
    tabsGroupId?: string // For animation grouping
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}

// ── TabsV2Content Props ───────────────────────────────────────────────────────

type TabsV2ContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

// ── Context Value ──────────────────────────────────────────────────────────────

type TabsV2ContextValue = {
    variant: TabsV2Variant
    size: TabsV2Size
    expanded: boolean
    fitContent: boolean
    disabled: boolean
    showSkeleton: boolean
    skeletonVariant: SkeletonVariant
    stickyHeader: boolean
    offsetTop: number
    activeTab: string
}
```

## Final Token Type

```typescript
type TabsV2TokensType = {
    width: CSSObject['width']
    outline: CSSObject['outline']
    tabList: {
        gap: CSSObject['gap']
        backgroundColor: {
            [key in TabsV2Variant]: CSSObject['backgroundColor']
        }
        borderRadius: {
            [key in TabsV2Size]: {
                [key in TabsV2Variant]: CSSObject['borderRadius']
            }
        }
        padding: {
            [key in TabsV2Size]: {
                [key in TabsV2Variant]: {
                    top: CSSObject['paddingTop']
                    right: CSSObject['paddingRight']
                    bottom: CSSObject['paddingBottom']
                    left: CSSObject['paddingLeft']
                }
            }
        }
        activeIndicator: {
            height: CSSObject['height']
            color: CSSObject['color']
            position: {
                bottom: CSSObject['bottom']
            }
            transition: CSSObject['transition']
            zIndex: CSSObject['zIndex']
        }
        stickyHeader: {
            boxShadow: CSSObject['boxShadow']
            zIndex: CSSObject['zIndex']
        }
        trigger: {
            gap: CSSObject['gap']
            icon: {
                maxWidth: CSSObject['maxWidth']
            }
            backgroundColor: {
                [key in TabsV2Variant]: {
                    [key in TabsV2State]: CSSObject['backgroundColor']
                }
            }
            borderRadius: {
                [key in TabsV2Size]: {
                    [key in TabsV2Variant]: CSSObject['borderRadius']
                }
            }
            border: {
                [key in TabsV2Variant]: CSSObject['border']
            }
            padding: {
                [key in TabsV2Size]: {
                    [key in TabsV2Variant]: {
                        top: CSSObject['paddingTop']
                        right: CSSObject['paddingRight']
                        bottom: CSSObject['paddingBottom']
                        left: CSSObject['paddingLeft']
                    }
                }
            }
            text: {
                color: {
                    [key in TabsV2Variant]: {
                        [key in TabsV2State]: CSSObject['color']
                    }
                }
                fontSize: {
                    [key in TabsV2Size]: CSSObject['fontSize']
                }
                fontWeight: {
                    [key in TabsV2Size]: CSSObject['fontWeight']
                }
            }
            closeButton: {
                width: CSSObject['width']
                borderRadius: CSSObject['borderRadius']
                backgroundColor: {
                    [key in TabsV2State]: CSSObject['backgroundColor']
                }
            }
            transition: CSSObject['transition']
        }
    }
}

type ResponsiveTabsV2Tokens = {
    [key in keyof BreakpointType]: TabsV2TokensType
}
```

**Token Pattern**: `component.tabList.element.CSSProp.[size].[variant].[state]` (shape matches `packages/blend/lib/components/TabsV2/tabsV2.tokens.ts`)

## Design Decisions

### 1. Context-Based State Management

**Decision**: Use React Context (`TabsV2Context`) to share tab state across sub-components.

**Rationale**: Provides a clean API where props can be set once on the root component and automatically propagated to children. This reduces prop drilling and ensures consistency.

```tsx
const context = useMemo<TabsV2ContextValue>(() => ({
    variant, size, expanded, fitContent, disabled,
    showSkeleton, skeletonVariant, stickyHeader, offsetTop, activeTab
}), [...])

<TabsV2Provider value={context}>
    <StyledTabsRoot>...</StyledTabsRoot>
</TabsV2Provider>
```

### 2. Composable Component Pattern

**Decision**: Split into focused sub-components (TabsV2, TabsV2List, TabsV2Trigger, TabsV2Content) following the Radix UI Tabs primitive pattern.

**Rationale**: Provides flexibility for consumers to compose tabs in different layouts while maintaining full control over rendering. Each component has a single responsibility.

```tsx
<TabsV2 defaultValue="tab1">
    <TabsV2List>
        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
    </TabsV2List>
    <TabsV2Content value="tab1">Content 1</TabsV2Content>
    <TabsV2Content value="tab2">Content 2</TabsV2Content>
</TabsV2>
```

### 3. Recursive Child Rendering

**Decision**: Use `renderChildren` function to recursively process children and inject props.

**Rationale**: Allows TabsV2 to automatically pass context values to deeply nested TabsV2List and TabsV2Trigger components without consumers needing to manually wire props.

```tsx
const renderChildren = (childrenToRender: React.ReactNode): React.ReactNode => {
    return React.Children.map(childrenToRender, (child) => {
        if (!React.isValidElement(child)) return child

        const isTabsList = child.type?.displayName === 'TabsV2List'
        const isTabsTrigger = child.type?.displayName === 'TabsV2Trigger'

        if (isTabsList || isTabsTrigger) {
            const childProps = {
                ...existingProps,
                disabled: childDisabled || disabled,
                ...(isTabsList && { activeTab, showSkeleton, variant, size }),
                ...(isTabsTrigger && { showSkeleton, skeletonVariant }),
            }
            return React.cloneElement(child, childProps)
        }

        // Recursively process children
        if (childChildren) {
            return React.cloneElement(child, {
                children: renderChildren(childChildren),
            })
        }

        return child
    })
}
```

### 4. Animated Active Indicator

**Decision**: Use Framer Motion's `layoutId` for smooth animated background transitions between tabs (non-underline variants).

**Rationale**: Provides a polished, fluid animation when switching tabs. The shared layoutId ensures the background element morphs between positions rather than disappearing/reappearing.

```tsx
<motion.span
    layoutId={`tabs-background-indicator-${tabsGroupId}`}
    style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tabsToken.backgroundColor[variant].active,
        borderRadius: tabsToken.borderRadius[size][variant],
        zIndex: -1,
    }}
    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
/>
```

### 5. CSS-Based Underline Indicator

**Decision**: For UNDERLINE variant, use CSS custom properties (`--tabs-indicator-left`, `--tabs-indicator-width`) controlled via JavaScript.

**Rationale**: More performant than Framer Motion for the sliding underline effect. The indicator is implemented as a pseudo-element that scales and translates based on CSS variables.

```tsx
// JavaScript: Calculate and set CSS variables
listElement.style.setProperty('--tabs-indicator-left', `${tabLeft}px`)
listElement.style.setProperty('--tabs-indicator-width', `${tabWidth}`)

// CSS: Apply transforms
'&::after': {
    scale: 'var(--tabs-indicator-width, 0.125) 1',
    translate: 'var(--tabs-indicator-left, 0) 0',
    transition: props.$tabsToken.trigger.activeIndicator.transition,
}
```

### 6. Controlled and Uncontrolled Modes

**Decision**: Support both controlled (`value`) and uncontrolled (`defaultValue`) modes via internal state and `useEffect` synchronization.

**Rationale**: Provides flexibility for different use cases. Some consumers need full control (controlled), while others prefer simpler setup (uncontrolled).

```tsx
const [activeTab, setActiveTab] = useState<string>(value || defaultValue || '')

useEffect(() => {
    if (value !== undefined) {
        setActiveTab(value)
    }
}, [value])

const handleValueChange = useCallback(
    (newValue: string) => {
        setActiveTab(newValue)
        onValueChange?.(newValue)
    },
    [onValueChange]
)
```

### 7. Scroll Container with Auto-Scroll

**Decision**: Wrap tabs list in a scrollable container with automatic scrolling to keep active tab visible.

**Rationale**: Handles overflow gracefully on smaller screens. Auto-scroll ensures the active tab is always visible even when many tabs are present.

```tsx
const scrollContainerRef = useRef<HTMLDivElement>(null)

// Auto-scroll logic centers active tab in viewport
if (!isTabVisible) {
    scrollContainer.scrollTo({
        left: Math.max(0, tabOffsetLeft - containerWidth / 2 + tabWidth / 2),
        behavior: 'smooth',
    })
}
```

### 8. Skeleton State Handling

**Decision**: Integrate Skeleton component directly into TabsV2Trigger with transparent text during loading.

**Rationale**: Provides consistent loading UI across all tab variants. The text remains visible but transparent, preserving layout while skeleton animates.

```tsx
if (shouldShowSkeleton) {
    return (
        <Skeleton
            variant={skeletonVariant}
            loading
            borderRadius={skeletonBorderRadius}
        >
            {triggerContent}
        </Skeleton>
    )
}
```

### 9. Close Button with Event Isolation

**Decision**: Implement closable tabs with comprehensive event propagation stopping.

**Rationale**: Prevents tab activation when clicking the close button. Multiple event handlers (click, mousedown, pointerdown, keyboard) ensure consistent behavior across interaction methods.

```tsx
const stopEventPropagation = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent?.stopImmediatePropagation()
}

const handleCloseClick = (e: React.MouseEvent) => {
    stopEventPropagation(e)
    if (!isDisabled) {
        onClose?.()
    }
}
```

### 10. Responsive Token System

**Decision**: Use `useResponsiveTokens` hook to fetch breakpoint-specific tokens.

**Rationale**: Enables responsive design by allowing different token values for different screen sizes (sm, lg). This provides flexibility in spacing, typography, and layout adjustments across breakpoints.

```tsx
const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')
```

### 11. Sticky Header with Theme Support

**Decision**: Support sticky positioning with configurable offset and theme-aware background color.

**Rationale**: Useful for long tab content where the tab list should remain visible. Background color adapts to current theme (light/dark) to ensure proper contrast.

```tsx
const { theme, foundationTokens } = useTheme()
const isDarkTheme = theme === Theme.DARK || theme === 'dark'
const stickyHeaderBackground = isDarkTheme
    ? foundationTokens.colors.gray[900]
    : foundationTokens.colors.gray[0]
```

### 12. Forward Ref Support

**Decision**: Use `forwardRef` on all components to allow parent components to access underlying DOM elements.

**Rationale**: Enables imperative DOM operations when needed (e.g., scrolling, focus management) while maintaining the declarative React pattern.

```tsx
const TabsV2 = forwardRef<HTMLDivElement, TabsV2Props>((props, ref) => {
    return <StyledTabsRoot ref={ref} ... />
})
```

### 13. Icon Slot Accessibility

**Decision**: Conditionally apply `aria-hidden` to icon slots based on whether they have an `aria-label`.

**Rationale**: Decorative icons are hidden from screen readers, while functional icons with labels remain accessible. This follows best practices for icon accessibility.

```tsx
aria-hidden={
    React.isValidElement(leftSlot) &&
    leftSlot.props &&
    typeof leftSlot.props === 'object' &&
    'aria-label' in leftSlot.props
        ? undefined
        : 'true'
}
```

### 14. ResizeObserver for Indicator Updates

**Decision**: Use ResizeObserver to update underline indicator position when container size changes.

**Rationale**: Ensures the active indicator remains correctly positioned when the tabs container resizes (e.g., sidebar expand/collapse, window resize).

```tsx
const resizeObserver = new ResizeObserver(() => {
    updateIndicator()
})
resizeObserver.observe(listElement)
```
