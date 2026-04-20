# Avatar Component Documentation

## Requirements

Create a scalable Avatar component that can display:

- **Image**: Optional image source with automatic fallback handling
- **Fallback**: Custom ReactNode or auto-generated initials from alt text
- **Status**: Optional online status Status with configurable position (top/bottom)
- **Leading/Trailing Slots**: Optional icon or content slots positioned before/after avatar
- **Multiple Sizes**: Support for SM, REGULAR, MD, LG, XL sizes (5 sizes)
- **Shapes**: Support for CIRCULAR and ROUNDED shapes (2 shapes)
- **Skeleton Loading**: Built-in skeleton state support
- **Interactive States**: Support for clickable avatars with proper accessibility
- **Responsive Design**: Support for different breakpoints (sm, lg)
- **Accessibility**: Full ARIA support with proper roles and screen reader text

## Anatomy

```
┌─────────────────────────────────────────────┐
│  [LeadingSlot]  [Container]  [TrailingSlot] │
│                  [Image/Fallback]           │
│                  [Status]                   │
└─────────────────────────────────────────────┘
```

![Avatar Anatomy](./AvatarAnatomy.png)

- **Container**: Main avatar container with configurable size, shape, border, and background
- **Image**: Optional image element displayed when src is provided and valid
- **Fallback**: Content displayed when image fails to load or src is not provided (initials or custom ReactNode)
- **Status**: Optional online status Status positioned absolutely (top-right or bottom-right)
- **Leading Slot**: Optional ReactNode positioned before the avatar container
- **Trailing Slot**: Optional ReactNode positioned after the avatar container
- **Skeleton**: Loading state overlay when skeleton.show is true
- **Screen Reader Text**: Visually hidden accessible label for assistive technologies

## Props & Types

```typescript
enum AvatarV2Size {
    SM = 'sm',
    REGULAR = 'regular',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

enum AvatarV2Shape {
    CIRCULAR = 'circular',
    ROUNDED = 'rounded',
}

enum AvatarV2StatusPosition {
    TOP_RIGHT = 'topRight',
    BOTTOM_RIGHT = 'bottomRight',
    TOP_LEFT = 'topLeft',
    BOTTOM_LEFT = 'bottomLeft',
}

enum AvatarV2Status {
    NONE = 'none',
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away',
    BUSY = 'busy',
}

type AvatarV2Props = {
    src?: string
    alt?: string
    fallbackText?: string
    size?: AvatarV2Size
    shape?: AvatarV2Shape
    status?: AvatarV2StatusConfig
    leftSlot?: ReactElement
    rightSlot?: ReactElement
    skeleton?: {
        show: boolean
        variant?: 'pulse' | 'wave'
    }
    backgroundColor?: string
    disabled?: boolean
    onImageError?: (error: Error) => void
    onImageLoad?: () => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
    AvatarV2Dimensions
```

## Final Token Type

```typescript
type AvatarV2TokensType = {
    gap: CSSObject['gap']
    container: {
        backgroundColor: CSSObject['backgroundColor']
        width: {
            [key in AvatarV2Size]: CSSObject['width']
        }
        height: {
            [key in AvatarV2Size]: CSSObject['height']
        }
        borderRadius: {
            [key in AvatarV2Shape]: CSSObject['borderRadius']
        }
        image: {
            border: CSSObject['border']
        }
        fallbackText: {
            border: CSSObject['border']
            fontSize: {
                [key in AvatarV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in AvatarV2Size]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in AvatarV2Size]: CSSObject['lineHeight']
            }
            color: CSSObject['color']
        }
        status: {
            width: {
                [key in AvatarV2Size]: CSSObject['width']
            }
            height: {
                [key in AvatarV2Size]: CSSObject['height']
            }
            border: {
                [key in AvatarV2Size]: CSSObject['border']
            }
            borderRadius: CSSObject['borderRadius']
            backgroundColor: {
                [key in AvatarV2Status]: CSSObject['backgroundColor']
            }
            boxShadow: CSSObject['boxShadow']
        }
    }
    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
    }
}

type ResponsiveAvatarV2Tokens = {
    [key in keyof BreakpointType]: AvatarV2TokensType
}
```

**Token Pattern**: `component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value`

## Design Decisions

### 1. Automatic Fallback Generation

**Decision**: Automatically generate initials from `alt` text when no `fallback` prop is provided and image fails to load.

**Rationale**: Provides a consistent fallback experience without requiring consumers to manually generate initials. The component extracts the first letter of each word from the alt text, up to 2 characters.

```tsx
const renderFallback = () => {
    if (fallback) {
        return typeof fallback === 'string'
            ? fallback.substring(0, 2)
            : fallback
    }
    return getInitialsFromText(alt)
}
```

### 2. Dynamic Background Color from Text

**Decision**: Generate background color for fallback avatars based on the text content (alt or fallback string).

**Rationale**: Ensures consistent color assignment for the same user/entity while providing visual distinction between different avatars. Uses a hash-based color generation algorithm.

```tsx
const textForColor = typeof fallback === 'string' ? fallback : alt
const initialsColor = getColorFromText(textForColor)
```

### 3. Image Error Handling

**Decision**: Track image load errors in component state and automatically switch to fallback content.

**Rationale**: Provides graceful degradation when images fail to load or are invalid URLs. Once an error occurs, the component permanently shows fallback content until remounted.

```tsx
const [imageError, setImageError] = useState(false)
const hasImage = src && !imageError

<StyledAvatarImage
    src={src}
    alt={alt}
    onError={() => setImageError(true)}
/>
```

### 4. Conditional Variant Based on Image Presence

**Decision**: Use different token variants (`withImage` vs `withoutImage`) based on whether an image is displayed.

**Rationale**: Enables different styling for image-based avatars (transparent background, white border) versus fallback avatars (colored background, gray border). This maintains visual consistency across both states.

```tsx
const variant = hasImage ? 'withImage' : 'withoutImage'
backgroundColor={tokens.container.backgroundColor[variant].default}
border={tokens.container.border[variant].default}
```

### 5. Precise Status Positioning

**Decision**: Use size and shape-specific positioning calculations for the online status Status.

**Rationale**: Ensures the Status is properly positioned relative to the avatar edge across all size and shape combinations. Different sizes require different offsets to maintain visual balance.

```tsx
const Status_POSITIONS = {
    sm: {
        [AvatarShape.CIRCULAR]: {
            [AvatarSize.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarSize.MD]: { top: '-3px', right: '-4px', bottom: '0px' },
            // ... more size-specific positions
        },
        [AvatarShape.ROUNDED]: {
            // ... rounded-specific positions
        },
    },
    lg: {
        // ... large breakpoint positions
    },
}
```

### 6. Wrapper Container for Slots

**Decision**: Wrap avatar and slots in a separate container when leadingSlot or trailingSlot are provided.

**Rationale**: Maintains proper spacing and alignment between avatar and slot elements. The wrapper uses flexbox with configurable gap spacing from tokens.

```tsx
if (leadingSlot || trailingSlot) {
    return (
        <Block
            data-avatar-wrapper="true"
            display="inline-flex"
            alignItems="center"
            gap={tokens.slot.spacing}
        >
            {leadingSlot && <Block data-element="leading-slot">...</Block>}
            {renderContent()}
            {trailingSlot && <Block data-element="trailing-slot">...</Block>}
        </Block>
    )
}
```

### 7. Screen Reader Only Text

**Decision**: Include visually hidden accessible label that combines avatar name and online status.

**Rationale**: Provides comprehensive context for screen reader users. The label includes the person's name (from alt or fallback) and their online status, ensuring accessibility compliance.

```tsx
<Block
    as="span"
    position="absolute"
    width="1px"
    height="1px"
    style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
    }}
    aria-hidden="true"
>
    {accessibleLabel}
</Block>
```

### 8. Interactive Avatar Support

**Decision**: Support clickable avatars with keyboard navigation (Enter/Space) and proper cursor styling.

**Rationale**: Enables avatar usage in interactive contexts (user profiles, navigation) while maintaining accessibility. Keyboard events are converted to synthetic click events for consistent handler behavior.

```tsx
const isInteractive = onClick !== undefined
tabIndex={isInteractive ? 0 : undefined}
cursor={isInteractive ? 'pointer' : undefined}
onKeyDown={isInteractive && onClick ? handleKeyboardClick : undefined}
```

### 9. Skeleton Loading State

**Decision**: Overlay skeleton component when `skeleton.show` is true, hiding all other content.

**Rationale**: Provides consistent loading experience across the design system. The skeleton matches the avatar's border radius and fills the entire container.

```tsx
{shouldShowSkeleton ? (
    <Skeleton
        variant={skeleton?.variant || 'pulse'}
        width="100%"
        height="100%"
        borderRadius={tokens.container.borderRadius[shape]}
    />
) : hasImage ? (
    <StyledAvatarImage ... />
) : (
    <Block data-avatar-fallback="true">...</Block>
)}
```

### 10. Responsive Token System

**Decision**: Use `useResponsiveTokens` hook to fetch breakpoint-specific tokens.

**Rationale**: Enables responsive design by allowing different token values for different screen sizes (sm, lg). This provides flexibility in sizing, spacing, and Status positioning across breakpoints.

```tsx
const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')
const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
const isSmallScreen = breakPointLabel === 'sm'
```

### 11. ARIA Live Region for Status Changes

**Decision**: Use `aria-live="polite"` when online status is displayed.

**Rationale**: Ensures screen readers announce status changes without interrupting current announcements. The polite live region allows assistive technologies to announce updates when convenient.

```tsx
aria-live={online ? 'polite' : undefined}
```

### 12. Fallback Content Styling

**Decision**: Use white text color (#FFFFFF) for fallback content to ensure contrast on colored backgrounds.

**Rationale**: Provides consistent readability regardless of the generated background color. White text ensures WCAG contrast compliance across all color variations.

```tsx
<Block
    data-avatar-fallback="true"
    color="#FFFFFF"
    display="flex"
    alignItems="center"
    justifyContent="center"
>
    {renderFallback()}
</Block>
```

### 13. Status Border and Shadow

**Decision**: Apply white border and subtle box shadow to the online Status for visual separation.

**Rationale**: Ensures the Status stands out against various avatar backgrounds (images, colored fallbacks). The white border and shadow create clear visual distinction.

```tsx
border={`${tokens.Status.border[size].online.width} solid ${tokens.Status.border[size].online.color}`}
boxShadow={tokens.Status.boxShadow}
```

### 14. Data Attributes for Testing

**Decision**: Include data attributes (`data-avatar`, `data-status`, `data-avatar-Status`, `data-avatar-fallback`) for component identification.

**Rationale**: Enables reliable testing and debugging. Data attributes provide stable selectors that don't change with styling or implementation details.

```tsx
data-avatar={alt ?? 'avatar'}
data-status={online ? 'online' : 'offline'}
data-avatar-Status="true"
data-avatar-fallback="true"
```
