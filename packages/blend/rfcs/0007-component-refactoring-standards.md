# RFC 0007: Component Refactoring Standards

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC establishes comprehensive refactoring standards for all components in the Blend Design System. It defines component structure, token anatomy, code organization patterns, performance targets, and accessibility requirements to ensure consistent, maintainable, and scalable components across the library.

## Motivation

### Problem Statement

Current component implementation has several issues:

1. **Inconsistent Structure**: Components lack uniform file organization and structure
2. **Hardcoded Values**: Magic numbers and hardcoded styles scattered throughout components
3. **Mixed Patterns**: Logic mixed with UI rendering, making components hard to test and maintain
4. **Over-Abstraction**: Some components are overly complex with unnecessary abstractions
5. **Under-Abstraction**: Some components lack proper separation of concerns
6. **Performance Issues**: Components don't consistently meet performance targets
7. **Accessibility Gaps**: Inconsistent accessibility implementation across components
8. **Dead Code**: Unused props, legacy patterns, and dead code accumulate over time
9. **Inconsistent Props**: Missing HTML props support, invalid prop handling
10. **Styled-Components Overuse**: Excessive use of styled-components instead of primitives

### Goals

- Establish uniform component structure across all components
- Define clear token anatomy for complex components
- Replace all hardcoded values with well-layered tokens
- Separate UI rendering from business logic
- Break components into small, composable primitives
- Minimize styled-components usage in favor of Block and Primitives
- Achieve 95+ Lighthouse performance scores
- Ensure accessibility by default
- Remove all dead code and legacy patterns
- Support all valid HTML props for primitive components
- Maintain consistent patterns across the system

### Non-Goals

- This RFC does NOT propose removing styled-components entirely (still needed for complex styling)
- This RFC does NOT cover component API changes (handled in individual component RFCs)
- This RFC does NOT include visual design changes
- This RFC does NOT cover component deprecation strategy (separate RFC)

## Proposed Solution

### 1. Component Structure Standards

#### Standard Component File Structure

```
ComponentName/
├── ComponentName.tsx              # Main component (UI rendering only)
├── ComponentName.types.ts        # Type definitions and enums
├── ComponentName.tokens.ts        # Component-specific tokens
├── ComponentName.utils.ts         # Business logic and utilities
├── ComponentName.hooks.ts         # Component-specific hooks (optional)
├── ComponentName.test.tsx         # Component tests
├── ComponentName.accessibility.md # Accessibility documentation
├── README.md                      # Component documentation
├── index.ts                       # Exports
└── subcomponents/                 # Sub-components (if needed)
    ├── SubComponent.tsx
    └── SubComponent.types.ts
```

#### Component Anatomy Definition

For complex components, define clear anatomy with token mapping:

```typescript
// ComponentName.tokens.ts

/**
 * Component Anatomy:
 *
 * ComponentName
 * ├── Container (root element)
 * │   ├── Header (optional)
 * │   │   ├── Title
 * │   │   ├── Actions
 * │   │   └── Icon
 * │   ├── Content
 * │   │   ├── Body
 * │   │   └── Footer (optional)
 * │   └── Overlay (optional)
 *
 * Token Mapping:
 * - container.* → Root container styles
 * - header.* → Header section styles
 * - content.* → Content section styles
 * - trigger.* → Interactive trigger element
 * - dropdown.* → Dropdown/menu container
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
    trigger: {
        backgroundColor: string
        padding: { x: string; y: string }
        borderRadius: string
        _hover: {
            backgroundColor: string
        }
    }
    dropdown: {
        backgroundColor: string
        borderRadius: string
        boxShadow: string
        padding: { x: string; y: string }
    }
}
```

#### Example: Menu Component Anatomy

```typescript
// Menu.tokens.ts

/**
 * Menu Component Anatomy:
 *
 * Menu
 * ├── Trigger (button/div that opens menu)
 * ├── Portal (positioned container)
 * │   └── MenuContent
 * │       ├── MenuHeader (optional)
 * │       ├── MenuItems
 * │       │   └── MenuItem (repeated)
 * │       │       ├── Icon (optional)
 * │       │       ├── Label
 * │       │       └── Shortcut (optional)
 * │       └── MenuFooter (optional)
 */

export type MenuTokenType = {
    trigger: {
        backgroundColor: string
        padding: { x: string; y: string }
        borderRadius: string
        border: string
        _hover: {
            backgroundColor: string
        }
        _focus: {
            outline: string
        }
    }
    portal: {
        zIndex: number
    }
    content: {
        backgroundColor: string
        borderRadius: string
        boxShadow: string
        padding: { x: string; y: string }
        minWidth: string
        maxWidth: string
    }
    item: {
        padding: { x: string; y: string }
        backgroundColor: string
        _hover: {
            backgroundColor: string
        }
        _focus: {
            backgroundColor: string
        }
        _active: {
            backgroundColor: string
        }
    }
    separator: {
        height: string
        backgroundColor: string
        margin: { x: string; y: string }
    }
}
```

### 2. Token Layering Strategy

#### Foundation → Component Token Flow

```typescript
// Foundation tokens (base layer)
const foundationTokens = {
    color: {
        gray: { 50: '#...', 100: '#...', ... },
        primary: { 50: '#...', 100: '#...', ... },
    },
    spacing: { 0: '0px', 1: '4px', 2: '8px', ... },
    typography: { fontSize: { sm: '...', md: '...' } },
}

// Component tokens (semantic layer)
const menuTokens = {
    trigger: {
        // Map foundation tokens to component use cases
        backgroundColor: foundationTokens.color.gray[100],
        padding: {
            x: foundationTokens.spacing[4], // 16px
            y: foundationTokens.spacing[2],  // 8px
        },
        borderRadius: foundationTokens.borderRadius[2], // 4px
        _hover: {
            backgroundColor: foundationTokens.color.gray[200],
        },
    },
}
```

#### Token Naming Convention

```typescript
// Component tokens follow anatomy structure
export type ComponentTokenType = {
    // Root container
    container: TokenGroup

    // Sub-components (if applicable)
    subComponent: TokenGroup

    // States
    states: {
        default: TokenGroup
        hover: TokenGroup
        focus: TokenGroup
        active: TokenGroup
        disabled: TokenGroup
    }

    // Variants
    variants: {
        primary: TokenGroup
        secondary: TokenGroup
    }

    // Sizes
    sizes: {
        small: TokenGroup
        medium: TokenGroup
        large: TokenGroup
    }
}
```

### 3. Code Organization Principles

#### Principle 1: UI Rendering Only in .tsx

```typescript
// ❌ BAD: Logic mixed with UI
const Button = ({ onClick, disabled }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        await fetchData()
        setIsLoading(false)
        onClick?.()
    }

    return <button onClick={handleClick}>...</button>
}

// ✅ GOOD: Logic in utils, UI in component
// Button.utils.ts
export const createButtonClickHandler = (
    onClick?: () => void,
    asyncAction?: () => Promise<void>
) => {
    return async () => {
        if (asyncAction) {
            await asyncAction()
        }
        onClick?.()
    }
}

// Button.tsx
import { createButtonClickHandler } from './Button.utils'

const Button = ({ onClick, asyncAction, ...props }) => {
    const handleClick = createButtonClickHandler(onClick, asyncAction)
    return <button onClick={handleClick} {...props}>...</button>
}
```

#### Principle 2: Extract Logic to Utils

```typescript
// ComponentName.utils.ts

/**
 * Business logic and utility functions
 * Keep pure functions when possible
 */

// Data transformation
export const transformData = (data: InputData): OutputData => {
    // Pure transformation logic
}

// Validation
export const validateProps = (props: ComponentProps): ValidationResult => {
    // Validation logic
}

// State management helpers
export const createStateManager = (initialState: State) => {
    // State management logic
}

// Event handlers
export const createEventHandler = (config: HandlerConfig) => {
    // Event handling logic
}
```

#### Principle 3: Use Hooks for Complex State

```typescript
// ComponentName.hooks.ts

/**
 * Component-specific hooks
 * Use when logic is reusable or complex
 */

export const useComponentState = (props: ComponentProps) => {
    // Complex state management
    const [state, setState] = useState(initialState)

    useEffect(() => {
        // Side effects
    }, [dependencies])

    return { state, setState }
}

export const useComponentBehavior = (props: ComponentProps) => {
    // Complex behavior logic
    return { handlers, computedValues }
}
```

### 4. Primitive-First Approach

#### Prefer Block and Primitives Over Styled-Components

```typescript
// ❌ BAD: Excessive styled-components
const StyledContainer = styled.div`
    padding: 16px;
    background: white;
    border-radius: 4px;
`

const StyledHeader = styled.div`
    padding: 12px;
    border-bottom: 1px solid gray;
`

// ✅ GOOD: Use Block and Primitives
import Block from '../Primitives/Block/Block'

const Component = () => {
    const tokens = useResponsiveTokens<ComponentTokenType>('COMPONENT')

    return (
        <Block
            padding={`${tokens.container.padding.y} ${tokens.container.padding.x}`}
            backgroundColor={tokens.container.backgroundColor}
            borderRadius={tokens.container.borderRadius}
        >
            <Block
                padding={`${tokens.header.padding.y} ${tokens.header.padding.x}`}
                borderBottom={tokens.header.borderBottom}
            >
                {/* Header content */}
            </Block>
        </Block>
    )
}
```

#### When to Use Styled-Components

Use styled-components only when:

- Complex pseudo-selector logic (e.g., `:nth-child`, `:has()`)
- Dynamic styling based on props that can't be handled by Block
- Third-party component styling requirements
- Animation keyframes that need scoped styling

```typescript
// ✅ ACCEPTABLE: Complex pseudo-selector logic
const StyledList = styled(Block)`
    & > *:not(:last-child) {
        margin-bottom: ${tokens.item.spacing};
    }

    & > *:has([data-selected='true']) {
        background-color: ${tokens.item.selectedBackground};
    }
`
```

### 5. Composable Primitives Pattern

#### Break Complex Components into Primitives

```typescript
// ❌ BAD: Monolithic component
const Menu = ({ items, onSelect, ...props }) => {
    // 500+ lines of mixed logic and UI
}

// ✅ GOOD: Composable primitives
// Menu/MenuTrigger.tsx
export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
    ({ children, ...props }, ref) => {
        const tokens = useResponsiveTokens<MenuTokenType>('MENU')
        return (
            <PrimitiveButton
                ref={ref}
                backgroundColor={tokens.trigger.backgroundColor}
                padding={`${tokens.trigger.padding.y} ${tokens.trigger.padding.x}`}
                {...props}
            >
                {children}
            </PrimitiveButton>
        )
    }
)

// Menu/MenuContent.tsx
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
    ({ children, ...props }, ref) => {
        const tokens = useResponsiveTokens<MenuTokenType>('MENU')
        return (
            <Block
                ref={ref}
                backgroundColor={tokens.content.backgroundColor}
                borderRadius={tokens.content.borderRadius}
                boxShadow={tokens.content.boxShadow}
                {...props}
            >
                {children}
            </Block>
        )
    }
)

// Menu/MenuItem.tsx
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
    ({ children, ...props }, ref) => {
        const tokens = useResponsiveTokens<MenuTokenType>('MENU')
        return (
            <PrimitiveButton
                ref={ref}
                backgroundColor={tokens.item.backgroundColor}
                _hover={{ backgroundColor: tokens.item._hover.backgroundColor }}
                {...props}
            >
                {children}
            </PrimitiveButton>
        )
    }
)

// Menu/Menu.tsx (Composition)
export const Menu = ({ trigger, items, ...props }: MenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <MenuTrigger onClick={() => setIsOpen(true)}>
                {trigger}
            </MenuTrigger>
            {isOpen && (
                <MenuContent>
                    {items.map((item) => (
                        <MenuItem key={item.id} onClick={item.onClick}>
                            {item.label}
                        </MenuItem>
                    ))}
                </MenuContent>
            )}
        </>
    )
}
```

### 6. Performance Standards

#### Lighthouse Performance Target

**Target**: 95+ Lighthouse Performance Score

**Requirements**:

- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 200ms

#### React Performance Optimization

```typescript
// ✅ GOOD: Proper use of React hooks

// Use useMemo for expensive computations
const Component = ({ items, filter }) => {
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter)
    }, [items, filter])

    // Use useCallback for stable function references
    const handleClick = useCallback((id: string) => {
        onItemClick(id)
    }, [onItemClick])

    // Use memo for component memoization (only when necessary)
    return (
        <MemoizedChild
            items={filteredItems}
            onClick={handleClick}
        />
    )
}

// ❌ BAD: Overuse of optimization hooks
const Component = ({ simpleProp }) => {
    // Don't memoize simple values
    const simpleValue = useMemo(() => simpleProp, [simpleProp]) // ❌ Unnecessary

    // Don't memoize simple functions
    const simpleHandler = useCallback(() => {
        console.log('click')
    }, []) // ❌ Unnecessary if not passed to memoized child
}
```

#### Performance Guidelines

1. **Use useMemo when**:
    - Computing derived data from large arrays/objects
    - Performing expensive calculations
    - Creating objects/arrays that are dependencies of other hooks

2. **Use useCallback when**:
    - Passing functions to memoized child components
    - Functions are dependencies of other hooks
    - Functions are used in effect dependencies

3. **Use memo when**:
    - Component receives same props frequently
    - Component is expensive to render
    - Component is rendered in lists with many items

4. **Avoid optimization when**:
    - Simple primitive values
    - Simple functions that aren't dependencies
    - Components that re-render infrequently

### 7. Accessibility by Default

#### Accessibility Requirements

All components must:

1. **Keyboard Navigation**: Full keyboard support
2. **Semantic HTML**: Use appropriate HTML elements
3. **Focus Management**: Visible focus indicators, proper focus order
4. **ARIA Attributes**: Proper ARIA roles, states, and properties
5. **Screen Reader Support**: Proper announcements and labels

#### Use Accessibility Utilities

```typescript
// ✅ GOOD: Use shared accessibility utilities
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
    focusFirstFocusable,
} from '../../utils/accessibility'

const Button = ({ disabled, loading, ariaLabel, onClick, ...props }) => {
    const ariaAttrs = getButtonAriaAttributes({
        disabled,
        loading,
        ariaLabel,
    })

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

### 8. Props Validation and HTML Props Support

#### Primitive Components (Atoms)

Primitive components (Button, Input, etc.) must accept all valid HTML props:

```typescript
// PrimitiveButton.tsx
import { ButtonHTMLAttributes } from 'react'

export interface PrimitiveButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    // Component-specific props
    buttonType?: ButtonType
    size?: ButtonSize
    // ... other component props
}

const PrimitiveButton = forwardRef<HTMLButtonElement, PrimitiveButtonProps>(
    ({ buttonType, size, className, ...htmlProps }, ref) => {
        // Component logic
        return (
            <button
                ref={ref}
                className={className}
                {...htmlProps} // Spread all HTML props
            >
                {children}
            </button>
        )
    }
)
```

#### Container Components

Container components (Card, Modal, etc.) must support width and height:

```typescript
// Card.tsx
export interface CardProps {
    children: ReactNode
    width?: string | number
    height?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    minHeight?: string | number
    maxHeight?: string | number
    // ... other props
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ width, height, minWidth, maxWidth, minHeight, maxHeight, ...props }, ref) => {
        const tokens = useResponsiveTokens<CardTokenType>('CARD')

        return (
            <Block
                ref={ref}
                width={width}
                height={height}
                minWidth={minWidth}
                maxWidth={maxWidth}
                minHeight={minHeight}
                maxHeight={maxHeight}
                backgroundColor={tokens.container.backgroundColor}
                borderRadius={tokens.container.borderRadius}
                {...props}
            >
                {children}
            </Block>
        )
    }
)
```

#### Props Validation

```typescript
// ComponentName.utils.ts

/**
 * Validate component props
 * Run in development mode only
 */
export const validateComponentProps = (
    props: ComponentProps,
    componentName: string
): void => {
    if (process.env.NODE_ENV !== 'development') return

    // Check required props
    if (props.required && !props.value) {
        console.warn(
            `${componentName}: Required prop "value" is missing when "required" is true`
        )
    }

    // Check prop combinations
    if (props.variant === 'icon-only' && !props.ariaLabel) {
        console.warn(
            `${componentName}: "ariaLabel" is required when variant is "icon-only"`
        )
    }

    // Check invalid prop combinations
    if (props.disabled && props.loading) {
        console.warn(
            `${componentName}: "disabled" and "loading" should not be used together`
        )
    }
}
```

### 9. Dead Code Removal

#### Identify and Remove

1. **Unused Props**: Remove props that are no longer used
2. **Legacy Patterns**: Remove deprecated implementation patterns
3. **Unused Imports**: Remove unused imports
4. **Commented Code**: Remove commented-out code
5. **Unused Utilities**: Remove utility functions that aren't used
6. **Dead Branches**: Remove unreachable code paths

#### Before Refactoring Checklist

```markdown
- [ ] Identify all unused props
- [ ] Find legacy patterns (old hooks, deprecated APIs)
- [ ] Check for commented code
- [ ] Verify all imports are used
- [ ] Check for unreachable code
- [ ] Review component for over-abstraction
- [ ] Check for under-abstraction
```

### 10. Consistent Patterns

#### Pattern Checklist

Every component should follow:

- [ ] Uses forwardRef
- [ ] Has displayName
- [ ] Props defined in separate types file
- [ ] Uses enums for variants/options
- [ ] Default props in function parameters
- [ ] Tokens from themeConfig
- [ ] Uses Block/Primitives when possible
- [ ] Logic separated to utils
- [ ] Uses accessibility utilities
- [ ] Supports all valid HTML props (primitives)
- [ ] Supports width/height (containers)
- [ ] Proper TypeScript types
- [ ] No hardcoded values
- [ ] No dead code

## Component Refactoring Template

### Step-by-Step Refactoring Process

```typescript
// 1. Define component anatomy and tokens
// ComponentName.tokens.ts
export type ComponentNameTokenType = {
    // Define based on component anatomy
}

// 2. Extract logic to utils
// ComponentName.utils.ts
export const componentUtils = {
    // Pure functions and utilities
}

// 3. Create component with proper structure
// ComponentName.tsx
import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getComponentAriaAttributes } from '../../utils/accessibility'
import { ComponentNameProps } from './ComponentName.types'
import { ComponentNameTokenType } from './ComponentName.tokens'
import { componentUtils } from './ComponentName.utils'

const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
    (props, ref) => {
        const {
            // Destructure with defaults
            variant = ComponentVariant.PRIMARY,
            size = ComponentSize.MEDIUM,
            ...restProps
        } = props

        const tokens = useResponsiveTokens<ComponentNameTokenType>('COMPONENT_NAME')
        const ariaAttrs = getComponentAriaAttributes(props)

        // Use utils for logic
        const computedValue = componentUtils.computeValue(props)

        return (
            <Block
                ref={ref}
                {...ariaAttrs}
                backgroundColor={tokens.container.backgroundColor}
                padding={`${tokens.container.padding.y} ${tokens.container.padding.x}`}
                {...restProps}
            >
                {children}
            </Block>
        )
    }
)

ComponentName.displayName = 'ComponentName'

export default ComponentName
```

## Alternatives Considered

### Option 1: Keep Current Structure

**Description**: Maintain existing component structure without standardization.

**Pros**:

- No migration effort
- Familiar to current developers

**Cons**:

- Inconsistent patterns
- Hard to maintain
- Difficult to onboard new developers
- Poor scalability

**Why not chosen**: Standardization is essential for a scalable design system.

### Option 2: Remove Styled-Components Entirely

**Description**: Use only Block and Primitives, no styled-components.

**Pros**:

- Simpler architecture
- Better performance
- Easier to understand

**Cons**:

- Limited for complex styling
- Harder to handle pseudo-selectors
- Less flexible for edge cases

**Why not chosen**: Styled-components are still needed for complex cases. Prefer primitives but allow styled-components when necessary.

## Impact Analysis

### Breaking Changes

**Minimal breaking changes**:

- Some components may have prop changes during refactoring
- Token structure may change
- Component structure may change

### Backward Compatibility

**Mostly compatible**:

- Public APIs remain the same
- Internal structure changes are transparent
- Migration guide provided

### Performance Impact

**Significant improvement**:

- Better code splitting
- Reduced bundle size
- Faster render times
- Better tree shaking

### Bundle Size Impact

**Reduction expected**:

- Removed dead code
- Better tree shaking
- Optimized imports
- Primitive-first approach reduces styled-components overhead

### Developer Experience

**Significantly improved**:

- Clear patterns to follow
- Easier to understand components
- Better IntelliSense support
- Consistent structure

## Migration Guide

### Phase 1: Audit Current Components

1. List all components
2. Identify components needing refactoring
3. Prioritize by usage and complexity
4. Document current issues

### Phase 2: Refactor One Component

1. Follow the refactoring flowchart (see separate document)
2. Define component anatomy
3. Create tokens
4. Extract logic
5. Refactor UI to use primitives
6. Add accessibility
7. Write tests
8. Update documentation

### Phase 3: Apply to All Components

1. Refactor high-priority components first
2. Apply patterns consistently
3. Update documentation
4. Train team on new patterns

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Tasks**:

- [ ] Create refactoring flowchart
- [ ] Document component anatomy patterns
- [ ] Create refactoring checklist
- [ ] Set up performance monitoring
- [ ] Create accessibility utilities (✅ Done)

**Deliverables**:

- Refactoring flowchart
- Component anatomy templates
- Refactoring checklist

### Phase 2: Pilot Refactoring (Week 3-4)

**Components**: Button, Input (as examples)

**Tasks**:

- [ ] Refactor Button following new standards
- [ ] Refactor Input following new standards
- [ ] Document learnings
- [ ] Refine standards based on experience

**Deliverables**:

- 2 refactored components
- Refined standards
- Best practices guide

### Phase 3: Systematic Refactoring (Week 5-12)

**Tasks**:

- [ ] Refactor all components following standards
- [ ] Remove dead code
- [ ] Update all documentation
- [ ] Achieve performance targets

**Deliverables**:

- All components refactored
- Performance targets met
- Complete documentation

## Risks and Mitigations

### Risk 1: Breaking Changes

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Maintain backward compatibility
- Gradual migration
- Clear migration guides
- Version documentation

### Risk 2: Team Adoption

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Comprehensive training
- Clear documentation
- Code review enforcement
- Pair programming

### Risk 3: Performance Regression

**Likelihood**: Low

**Impact**: Medium

**Mitigation**:

- Performance monitoring
- Lighthouse checks in CI
- Performance budgets
- Regular audits

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

1. **Migration Timeline**: Should we refactor all components at once or incrementally?
2. **Styled-Components**: What's the threshold for using styled-components vs primitives?
3. **Performance Monitoring**: How do we continuously monitor performance?
4. **Legacy Support**: How long do we support old component patterns?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization

## References

### Internal Documentation

- Component structure examples
- Token anatomy patterns
- Performance benchmarks

### External Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit/optimizing-rendering)
- [Component Composition Patterns](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Design System Architecture](https://www.invisionapp.com/inside-design/design-systems-handbook/)

---

**Discussion**: [Link to GitHub issue or discussion]
