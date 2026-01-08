# RFC 0007: Component Refactoring Standards

## Summary

Establish comprehensive refactoring standards for all components, defining component structure, token anatomy, code organization patterns, performance targets (95+ Lighthouse), and accessibility requirements.

## Motivation

### Problem Statement

- Inconsistent component structure
- Hardcoded values scattered throughout
- Logic mixed with UI rendering
- Over/under-abstraction issues
- Performance problems
- Accessibility gaps
- Dead code accumulation
- Inconsistent props handling
- Excessive styled-components usage

### Goals

- Establish uniform component structure
- Define clear token anatomy for complex components
- Replace hardcoded values with tokens
- Separate UI rendering from business logic
- Break components into composable primitives
- Minimize styled-components, use Block/Primitives
- Achieve 95+ Lighthouse performance score
- Ensure accessibility by default
- Remove all dead code

### Non-Goals

- Removing styled-components entirely (still needed for complex styling)
- Component API changes (handled in individual component RFCs)
- Visual design changes
- Component deprecation strategy (separate RFC)

## Proposed Solution

### Key Changes

1. **Uniform Component Structure**
2. **Token Anatomy Definition**
3. **Token Layering Strategy**
4. **Code Organization Principles**
5. **Primitive-First Approach**
6. **Performance Standards**
7. **Accessibility by Default**
8. **Props Validation**

### Standard Component Structure

```
ComponentName/
├── ComponentName.tsx              # UI rendering only
├── ComponentName.types.ts        # Type definitions and enums
├── ComponentName.tokens.ts        # Component-specific tokens
├── ComponentName.utils.ts         # Business logic and utilities
├── ComponentName.hooks.ts         # Component-specific hooks (optional)
├── ComponentName.test.tsx         # Component tests
├── ComponentName.accessibility.md # Accessibility documentation
├── README.md                      # Component documentation
└── index.ts                       # Exports
```

### Component Anatomy Definition

```typescript
// ComponentName.tokens.ts

/**
 * Component Anatomy:
 *
 * ComponentName
 * ├── Container (root element)
 * │   ├── Header (optional)
 * │   ├── Content
 * │   └── SubComponent (if needed)
 *
 * Token Mapping:
 * - container.* → Root container styles
 * - header.* → Header section styles
 * - content.* → Content section styles
 */

export type ComponentNameTokenType = {
    container: {
        backgroundColor: string
        padding: { x: string; y: string }
        borderRadius: string
        border: string
        boxShadow: string
    }
    header: {
        backgroundColor: string
        padding: { x: string; y: string }
        borderBottom: string
    }
    content: {
        padding: { x: string; y: string }
    }
}
```

### Token Layering Strategy

```typescript
// Foundation tokens (base layer)
const foundationTokens = {
    color: {
        gray: { 50: '#...', 100: '#...' },
        primary: { 50: '#...', 100: '#...' },
    },
    spacing: { 0: '0px', 1: '4px', 2: '8px', ... },
}

// Component tokens (semantic layer)
const menuTokens = {
    trigger: {
        backgroundColor: foundationTokens.color.gray[100],
        padding: {
            x: foundationTokens.spacing[4], // 16px
            y: foundationTokens.spacing[2],  // 8px
        },
    },
}
```

### Code Organization Principles

#### Code Organization Principles

**UI Rendering Only in .tsx**

```typescript
// Incorrect: Logic mixed with UI
const Button = ({ onClick }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = async () => {
        setIsLoading(true)
        await fetchData()
        setIsLoading(false)
        onClick?.()
    }
    return <button onClick={handleClick}>...</button>
}

// Correct: Logic in utils, UI in component
// Button.utils.ts
export const createButtonClickHandler = (
    onClick?: () => void,
    asyncAction?: () => Promise<void>
) => {
    return async () => {
        if (asyncAction) await asyncAction()
        onClick?.()
    }
}

// Button.tsx
const Button = ({ onClick, asyncAction, ...props }) => {
    const handleClick = createButtonClickHandler(onClick, asyncAction)
    return <button onClick={handleClick} {...props}>...</button>
}
```

**Extract Logic to Utils**

```typescript
// ComponentName.utils.ts
export const transformData = (data: InputData): OutputData => {
    // Pure transformation logic
}

export const validateProps = (props: ComponentProps): ValidationResult => {
    // Validation logic
}

export const createEventHandler = (config: HandlerConfig) => {
    // Event handling logic
}
```

### Primitive-First Approach

```typescript
// Incorrect: Excessive styled-components
const StyledContainer = styled.div`
    padding: 16px;
    background: white;
`

// Correct: Use Block and Primitives
import Block from '../Primitives/Block/Block'

const Component = () => {
    const tokens = useResponsiveTokens<ComponentTokenType>('COMPONENT')
    return (
        <Block
            padding={`${tokens.container.padding.y} ${tokens.container.padding.x}`}
            backgroundColor={tokens.container.backgroundColor}
            borderRadius={tokens.container.borderRadius}
        >
            {children}
        </Block>
    )
}
```

### Composable Primitives Pattern

```typescript
// Incorrect: Monolithic component
const Menu = ({ items, onSelect }) => {
    // 500+ lines of mixed logic and UI
}

// Correct: Composable primitives
// Menu/MenuTrigger.tsx
export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(...)

// Menu/MenuContent.tsx
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(...)

// Menu/MenuItem.tsx
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(...)

// Menu/Menu.tsx (Composition)
export const Menu = ({ trigger, items }) => {
    return (
        <>
            <MenuTrigger>{trigger}</MenuTrigger>
            <MenuContent>
                {items.map((item) => (
                    <MenuItem key={item.id} onClick={item.onClick}>
                        {item.label}
                    </MenuItem>
                ))}
            </MenuContent>
        </>
    )
}
```

### Performance Standards

**Target**: 95+ Lighthouse Performance Score

**Requirements**:

- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 200ms

```typescript
const Component = ({ items, filter }) => {
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter)
    }, [items, filter])

    const handleClick = useCallback((id: string) => {
        onItemClick(id)
    }, [onItemClick])

    return <MemoizedChild items={filteredItems} onClick={handleClick} />
}
```

### Accessibility by Default

```typescript
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
    focusFirstFocusable,
} from '../../utils/accessibility'

const Button = ({ disabled, loading, ariaLabel, onClick, ...props }) => {
    const ariaAttrs = getButtonAriaAttributes({ disabled, loading, ariaLabel })
    const keyboardHandler = createButtonKeyboardHandler(onClick, disabled)

    return (
        <PrimitiveButton
            {...ariaAttrs}
            {...keyboardHandler}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </PrimitiveButton>
    )
}
```

### Props Validation and HTML Props Support

#### Primitive Components (Atoms)

```typescript
export interface PrimitiveButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    buttonType?: ButtonType
    size?: ButtonSize
}

const PrimitiveButton = forwardRef<HTMLButtonElement, PrimitiveButtonProps>(
    ({ buttonType, size, className, ...htmlProps }, ref) => {
        return (
            <button
                ref={ref}
                className={className}
                {...htmlProps}
            >
                {children}
            </button>
        )
    }
)
```

#### Container Components

```typescript
export interface CardProps {
    children: ReactNode
    width?: string | number
    height?: string | number
    minWidth?: string | number
    maxWidth?: string | number
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ width, height, minWidth, maxWidth, ...props }, ref) => {
        return (
            <Block
                ref={ref}
                width={width}
                height={height}
                minWidth={minWidth}
                maxWidth={maxWidth}
                {...props}
            >
                {children}
            </Block>
        )
    }
)
```

### Dead Code Removal

Remove:

- Unused props
- Legacy patterns
- Unused imports
- Commented code
- Unused utilities
- Dead code paths

## Alternatives Considered

### Option 1: Keep Current Structure

Maintain existing component structure without standardization.

**Why not chosen**: Inconsistent patterns, hard to maintain, difficult to onboard new developers.

### Option 2: Remove Styled-Components Entirely

Use only Block and Primitives, no styled-components.

**Why not chosen**: Still needed for complex styling (pseudo-selectors, third-party components).

## Impact Analysis

### Breaking Changes

**Minimal** - Some components may have prop changes during refactoring.

### Backward Compatibility

**Mostly compatible** - Public APIs remain the same, internal structure changes are transparent.

### Performance Impact

**Significant improvement** - Better code splitting, reduced bundle size, faster render times.

### Bundle Size Impact

**Reduction expected** - Removed dead code, better tree shaking, primitive-first approach.

### Migration Effort

**High** (~12 weeks) - Refactor all components, remove dead code, update documentation.

## Migration Guide

### Step-by-Step Process

1. **Pre-Refactoring Audit**: Identify issues, document current behavior
2. **Define Component Anatomy**: Draw structure, map to tokens
3. **Create Token Structure**: Replace hardcoded values
4. **Separate Logic from UI**: Extract to utils.ts
5. **Break into Primitives**: Create composable sub-components
6. **Replace Styled-Components**: Use Block/Primitives where possible
7. **Add Accessibility**: Use shared utilities, keyboard navigation, ARIA
8. **Optimize Performance**: Add useMemo/useCallback only if needed
9. **Validate Props**: Add HTML props support (primitives), width/height (containers)
10. **Remove Dead Code**: Remove unused imports, props, legacy patterns
11. **Write/Update Tests**: Follow RFC 0002 standards
12. **Verify & Document**: Check Lighthouse score (95+), update documentation
13. **Code Review**: Self-review checklist, submit PR

## Implementation Plan

**Phase 1: Foundation (Weeks 1-2)**

- Create refactoring flowchart
- Document component anatomy patterns
- Create refactoring checklist
- Set up performance monitoring

**Phase 2: Pilot Refactoring (Weeks 3-4)**

- Components: Button, Input
- Document learnings, refine standards

**Phase 3: Systematic Refactoring (Weeks 5-12)**

- Refactor all components following standards
- Remove dead code
- Update all documentation
- Achieve performance targets

## Risks and Mitigations

### Risk 1: Breaking Changes

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Maintain backward compatibility, gradual migration, clear migration guides, version documentation

### Risk 2: Team Adoption

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Comprehensive training, clear documentation, code review enforcement, pair programming

## Success Metrics

- [ ] 100% of components follow uniform structure
- [ ] 0 hardcoded values (all use tokens)
- [ ] 95+ Lighthouse performance score
- [ ] 100% accessibility compliance
- [ ] 0 dead code
- [ ] All components support HTML props (primitives)
- [ ] All containers support width/height
- [ ] Consistent patterns across all components

## Unresolved Questions

1. Migration timeline: Refactor all components at once or incrementally?
2. Styled-components threshold: When to use vs primitives?
3. Performance monitoring: How to continuously monitor?
4. Legacy support: How long to support old component patterns?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization

## References

- [React Performance Optimization](https://react.dev/learn/render-and-commit/optimizing-rendering) - React performance
- [Component Composition Patterns](https://kentcdodds.com/blog/compound-components-with-react-hooks) - Composition patterns
- [Design System Architecture](https://www.invisionapp.com/inside-design/design-systems-handbook/) - System architecture

---
