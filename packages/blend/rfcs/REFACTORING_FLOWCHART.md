# Component Refactoring Flowchart

**Version**: 1.0  
**Last Updated**: 2026-01-07  
**Purpose**: Step-by-step guide for developers refactoring components

---

## Overview

This flowchart provides a comprehensive, step-by-step process for refactoring components in the Blend Design System. Follow this process to ensure consistency, quality, and maintainability.

---

## Complete Refactoring Process

```
┌─────────────────────────────────────────────────────────────┐
│                    START REFACTORING                        │
│                  Component: [ComponentName]                 │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 1: PRE-REFACTORING AUDIT        │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Audit Current │                      │ Document      │
│ Component     │                      │ Issues        │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 2: DEFINE COMPONENT ANATOMY     │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Identify      │                      │ Map Anatomy   │
│ Sub-components│                      │ to Tokens     │
│ & Structure   │                      │               │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 3: CREATE TOKEN STRUCTURE        │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Create        │                      │ Replace       │
│ Component     │                      │ Hardcoded     │
│ Tokens        │                      │ Values        │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 4: SEPARATE LOGIC FROM UI       │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Extract Logic │                      │ Keep Only UI │
│ to utils.ts   │                      │ in .tsx      │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 5: BREAK INTO PRIMITIVES        │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Identify      │                      │ Create        │
│ Composable    │                      │ Sub-components│
│ Parts         │                      │               │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 6: REPLACE STYLED-COMPONENTS    │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Use Block &   │                      │ Keep SC only  │
│ Primitives    │                      │ if necessary  │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 7: ADD ACCESSIBILITY            │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Use A11y      │                      │ Add Keyboard  │
│ Utilities     │                      │ Navigation    │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 8: OPTIMIZE PERFORMANCE        │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Add useMemo/  │                      │ Verify        │
│ useCallback   │                      │ Performance   │
│ (if needed)   │                      │ Targets       │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 9: PROPS VALIDATION            │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Add HTML      │                      │ Add width/    │
│ Props Support │                      │ height (if    │
│ (primitives)  │                      │ container)    │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 10: REMOVE DEAD CODE            │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Remove        │                      │ Remove        │
│ Unused Props  │                      │ Legacy Code   │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 11: WRITE/UPDATE TESTS         │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Functional    │                      │ Accessibility │
│ Tests         │                      │ Tests         │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 12: VERIFY & DOCUMENT          │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│ Check         │                      │ Update        │
│ Lighthouse    │                      │ Documentation │
│ Score (95+)   │                      │               │
└───────────────┘                      └───────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   STEP 13: CODE REVIEW                │
        └───────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   COMPLETE    │
                    └───────────────┘
```

---

## Detailed Step-by-Step Guide

### STEP 1: Pre-Refactoring Audit

**Purpose**: Understand current state before making changes

**Tasks**:

1. **Read Current Implementation**

    ```bash
    # Review all files in component directory
    - ComponentName.tsx
    - ComponentName.types.ts
    - ComponentName.tokens.ts (if exists)
    - ComponentName.utils.ts (if exists)
    - ComponentName.test.tsx (if exists)
    ```

2. **Identify Issues**
    - [ ] Hardcoded values (colors, spacing, sizes)
    - [ ] Logic mixed with UI rendering
    - [ ] Excessive styled-components usage
    - [ ] Missing accessibility features
    - [ ] Unused props or dead code
    - [ ] Missing HTML props support
    - [ ] Performance issues
    - [ ] Inconsistent patterns

3. **Document Current Behavior**
    - List all props and their purposes
    - Document component behavior
    - Note any edge cases
    - List dependencies

4. **Check Dependencies**
    - What other components does it use?
    - What hooks does it use?
    - What utilities does it import?

**Output**: Audit document with issues list

---

### STEP 2: Define Component Anatomy

**Purpose**: Understand component structure for token mapping

**Tasks**:

1. **Identify Component Parts**

    ```
    Example: Menu Component
    ├── Trigger (button that opens menu)
    ├── Portal (positioned container)
    │   └── Content
    │       ├── Header (optional)
    │       ├── Items (list)
    │       │   └── Item (repeated)
    │       │       ├── Icon (optional)
    │       │       ├── Label
    │       │       └── Shortcut (optional)
    │       └── Footer (optional)
    └── Separator (optional, between items)
    ```

2. **Map to Visual Structure**
    - Draw component structure
    - Identify all interactive elements
    - Identify all container elements
    - Note state variations (hover, focus, active, disabled)

3. **Document in tokens file**
    ```typescript
    // ComponentName.tokens.ts
    /**
     * Component Anatomy:
     *
     * ComponentName
     * ├── Container
     * │   ├── Header
     * │   └── Content
     * └── SubComponent
     */
    ```

**Output**: Component anatomy diagram and documentation

---

### STEP 3: Create Token Structure

**Purpose**: Replace hardcoded values with tokens

**Tasks**:

1. **Identify All Hardcoded Values**

    ```typescript
    // Find in component:
    // - Colors: '#ffffff', 'rgb(255, 0, 0)', etc.
    // - Spacing: '16px', '1rem', etc.
    // - Sizes: '24px', '100%', etc.
    // - Border radius: '4px', '8px', etc.
    // - Shadows: '0 1px 2px...', etc.
    ```

2. **Map to Foundation Tokens**

    ```typescript
    // Before
    backgroundColor: '#ffffff'
    padding: '16px'

    // After
    backgroundColor: foundationTokens.color.surface.background
    padding: {
        x: foundationTokens.spacing[4], // 16px
        y: foundationTokens.spacing[4]
    }
    ```

3. **Create Component Tokens**

    ```typescript
    // ComponentName.tokens.ts
    export type ComponentNameTokenType = {
        container: {
            backgroundColor: string
            padding: { x: string; y: string }
            borderRadius: string
        }
        // ... based on anatomy
    }
    ```

4. **Replace in Component**
    - Replace all hardcoded values
    - Use `useResponsiveTokens` hook
    - Ensure responsive behavior

**Checklist**:

- [ ] No hardcoded colors
- [ ] No hardcoded spacing
- [ ] No hardcoded sizes
- [ ] All values come from tokens
- [ ] Responsive tokens used correctly

**Output**: Complete token structure, no hardcoded values

---

### STEP 4: Separate Logic from UI

**Purpose**: Keep .tsx files focused on rendering only

**Tasks**:

1. **Identify Logic in Component**
    - State management
    - Data transformation
    - Event handlers
    - Computed values
    - Side effects

2. **Extract to Utils**

    ```typescript
    // ComponentName.utils.ts

    // Pure functions
    export const transformData = (data: Input) => {
        /* ... */
    }
    export const validateProps = (props: Props) => {
        /* ... */
    }

    // Event handlers
    export const createClickHandler = (config: HandlerConfig) => {
        return (event: Event) => {
            /* ... */
        }
    }

    // State helpers
    export const createStateManager = (initial: State) => {
        // State management logic
    }
    ```

3. **Extract to Hooks (if complex)**

    ```typescript
    // ComponentName.hooks.ts
    export const useComponentState = (props: Props) => {
        // Complex state logic
    }
    ```

4. **Update Component**

    ```typescript
    // ComponentName.tsx
    import { transformData, createClickHandler } from './ComponentName.utils'

    const Component = (props) => {
        const transformed = transformData(props.data)
        const handleClick = createClickHandler(props)

        // Only UI rendering here
        return <Block onClick={handleClick}>...</Block>
    }
    ```

**Checklist**:

- [ ] No business logic in .tsx
- [ ] All logic in utils.ts or hooks.ts
- [ ] Component only renders UI
- [ ] Functions are pure when possible

**Output**: Clean separation of concerns

---

### STEP 5: Break into Primitives

**Purpose**: Create composable, reusable sub-components

**Tasks**:

1. **Identify Composable Parts**
    - Large components → break into smaller pieces
    - Repeated patterns → extract to sub-components
    - Complex sections → separate components

2. **Create Sub-components**

    ```typescript
    // ComponentName/SubComponent.tsx
    export const SubComponent = forwardRef<HTMLElement, SubComponentProps>(
        (props, ref) => {
            // Sub-component implementation
        }
    )
    ```

3. **Compose in Main Component**

    ```typescript
    // ComponentName.tsx
    import { SubComponent } from './SubComponent'

    const Component = (props) => {
        return (
            <Block>
                <SubComponent {...subProps} />
            </Block>
        )
    }
    ```

**Checklist**:

- [ ] Components are composable
- [ ] Sub-components are reusable
- [ ] Main component is simple
- [ ] Each part has single responsibility

**Output**: Composable component structure

---

### STEP 6: Replace Styled-Components

**Purpose**: Use Block and Primitives instead of styled-components

**Tasks**:

1. **Identify Styled-Components Usage**

    ```typescript
    // Find all:
    // - styled.div
    // - styled.button
    // - styled(Component)
    ```

2. **Evaluate if Styled-Component is Needed**
    - **Can use Block?** → Replace with Block
    - **Can use Primitive?** → Replace with Primitive
    - **Complex pseudo-selectors?** → Keep styled-component

3. **Replace with Block**

    ```typescript
    // Before
    const StyledContainer = styled.div`
        padding: 16px;
        background: white;
    `

    // After
    <Block
        padding={`${tokens.container.padding.y} ${tokens.container.padding.x}`}
        backgroundColor={tokens.container.backgroundColor}
    >
    ```

4. **Replace with Primitives**

    ```typescript
    // Before
    const StyledButton = styled.button`
        padding: 8px 16px;
    `

    // After
    <PrimitiveButton
        padding={`${tokens.button.padding.y} ${tokens.button.padding.x}`}
    >
    ```

**Checklist**:

- [ ] Minimal styled-components usage
- [ ] Block used for containers
- [ ] Primitives used for form elements
- [ ] Styled-components only for complex cases

**Output**: Primitive-first component

---

### STEP 7: Add Accessibility

**Purpose**: Ensure component is accessible by default

**Tasks**:

1. **Use Accessibility Utilities**

    ```typescript
    import {
        getButtonAriaAttributes,
        createButtonKeyboardHandler,
    } from '../../utils/accessibility'

    const ariaAttrs = getButtonAriaAttributes({
        disabled,
        loading,
        ariaLabel,
    })

    const keyboardHandler = createButtonKeyboardHandler(onClick, disabled)
    ```

2. **Add ARIA Attributes**
    - Use appropriate ARIA helpers
    - Ensure all interactive elements have labels
    - Add state attributes (aria-expanded, aria-selected, etc.)

3. **Add Keyboard Navigation**
    - Use keyboard helpers
    - Ensure all functionality is keyboard accessible
    - Test with keyboard only

4. **Add Focus Management**

    ```typescript
    import {
        focusFirstFocusable,
        createFocusManager,
    } from '../../utils/accessibility'

    // For modals/dropdowns
    const focusManager = createFocusManager()
    focusManager.store()
    focusFirstFocusable(containerRef.current)
    ```

5. **Test Accessibility**
    - Run jest-axe tests
    - Test with keyboard
    - Test with screen reader
    - Verify focus indicators

**Checklist**:

- [ ] ARIA attributes added
- [ ] Keyboard navigation works
- [ ] Focus management implemented
- [ ] Screen reader tested
- [ ] jest-axe passes

**Output**: Fully accessible component

---

### STEP 8: Optimize Performance

**Purpose**: Ensure component meets performance targets

**Tasks**:

1. **Check Current Performance**

    ```bash
    # Run Lighthouse
    npm run lighthouse

    # Check bundle size
    npm run analyze
    ```

2. **Add Optimizations (Only if Needed)**

    ```typescript
    // Use useMemo for expensive computations
    const expensiveValue = useMemo(() => {
        return computeExpensiveValue(data)
    }, [data])

    // Use useCallback for stable references
    const handleClick = useCallback(
        (id: string) => {
            onClick(id)
        },
        [onClick]
    )

    // Use memo for expensive children
    const MemoizedChild = memo(ExpensiveChild)
    ```

3. **Avoid Over-Optimization**
    - Don't memoize simple values
    - Don't use useCallback for simple functions
    - Don't memo components that re-render infrequently

4. **Verify Performance**
    - Lighthouse score ≥ 95
    - Bundle size within budget
    - Render time acceptable

**Checklist**:

- [ ] Lighthouse score ≥ 95
- [ ] No unnecessary optimizations
- [ ] Performance targets met
- [ ] Bundle size acceptable

**Output**: Optimized component

---

### STEP 9: Props Validation

**Purpose**: Ensure proper props handling

**Tasks**:

1. **For Primitive Components (Button, Input, etc.)**

    ```typescript
    // Accept all valid HTML props
    export interface PrimitiveButtonProps
        extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
        // Component-specific props
    }

    const PrimitiveButton = ({ ...htmlProps, ...componentProps }, ref) => {
        return <button {...htmlProps} {...componentProps} ref={ref} />
    }
    ```

2. **For Container Components (Card, Modal, etc.)**

    ```typescript
    // Add width/height support
    export interface CardProps {
        width?: string | number
        height?: string | number
        minWidth?: string | number
        maxWidth?: string | number
        minHeight?: string | number
        maxHeight?: string | number
    }
    ```

3. **Validate Props**

    ```typescript
    // ComponentName.utils.ts
    export const validateProps = (props: Props) => {
        if (process.env.NODE_ENV !== 'development') return

        // Validation logic
        if (props.variant === 'icon-only' && !props.ariaLabel) {
            console.warn('ariaLabel required for icon-only variant')
        }
    }
    ```

4. **Remove Unused Props**
    - Check all props are used
    - Remove deprecated props
    - Document prop changes

**Checklist**:

- [ ] HTML props supported (primitives)
- [ ] Width/height supported (containers)
- [ ] Props validated
- [ ] Unused props removed
- [ ] All props documented

**Output**: Properly validated props

---

### STEP 10: Remove Dead Code

**Purpose**: Clean up unused code

**Tasks**:

1. **Identify Dead Code**
    - Unused imports
    - Unused props
    - Unused functions
    - Commented code
    - Unreachable code paths

2. **Remove Dead Code**

    ```typescript
    // Remove unused imports
    // Remove unused props
    // Remove commented code
    // Remove unreachable branches
    ```

3. **Check for Legacy Patterns**
    - Old hooks usage
    - Deprecated APIs
    - Outdated patterns

4. **Verify Nothing Breaks**
    - Run tests
    - Check TypeScript errors
    - Verify functionality

**Checklist**:

- [ ] No unused imports
- [ ] No unused props
- [ ] No commented code
- [ ] No legacy patterns
- [ ] All code is reachable

**Output**: Clean, dead-code-free component

---

### STEP 11: Write/Update Tests

**Purpose**: Ensure component is thoroughly tested

**Tasks**:

1. **Follow Test Standards** (RFC 0002)
    - Rendering tests
    - User interaction tests
    - State management tests
    - Form integration tests (if applicable)
    - Accessibility tests
    - Performance tests
    - Edge case tests

2. **Use Test Utilities**

    ```typescript
    import { render, screen } from '@/test-utils'
    import { axe } from 'jest-axe'
    import { getButtonAriaAttributes } from '../../utils/accessibility'
    ```

3. **Test Accessibility**

    ```typescript
    it('meets WCAG 2.2 AA standards', async () => {
        const { container } = render(<Component />)
        expect(await axe(container)).toHaveNoViolations()
    })
    ```

4. **Test Performance**
    ```typescript
    it('renders within performance budget', async () => {
        const renderTime = await measureRenderTime(<Component />)
        assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
    })
    ```

**Checklist**:

- [ ] All test categories covered
- [ ] Accessibility tests pass
- [ ] Performance tests pass
- [ ] Edge cases tested
- [ ] Test coverage ≥ 95%

**Output**: Comprehensive test suite

---

### STEP 12: Verify & Document

**Purpose**: Ensure quality and document changes

**Tasks**:

1. **Run Lighthouse**

    ```bash
    npm run lighthouse
    # Verify score ≥ 95
    ```

2. **Run All Tests**

    ```bash
    npm test
    npm run test:a11y
    npm run test:coverage
    ```

3. **Update Documentation**
    - Update README.md
    - Update accessibility.md
    - Update prop documentation
    - Add examples

4. **Check Consistency**
    - Follows all patterns
    - Matches other components
    - Consistent naming

**Checklist**:

- [ ] Lighthouse score ≥ 95
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Patterns consistent
- [ ] Code reviewed

**Output**: Complete, documented component

---

### STEP 13: Code Review

**Purpose**: Final quality check

**Tasks**:

1. **Self-Review Checklist**
    - [ ] Follows component structure
    - [ ] Uses tokens (no hardcoded values)
    - [ ] Logic separated from UI
    - [ ] Uses primitives
    - [ ] Accessible
    - [ ] Performant
    - [ ] Props validated
    - [ ] No dead code
    - [ ] Tests complete
    - [ ] Documentation updated

2. **Submit for Review**
    - Create PR
    - Request review
    - Address feedback

3. **Final Verification**
    - All checks pass
    - Review approved
    - Ready to merge

**Output**: Approved, production-ready component

---

## Quick Reference Checklist

### Pre-Refactoring

- [ ] Audit current component
- [ ] Document issues
- [ ] Understand dependencies

### Structure

- [ ] Define component anatomy
- [ ] Create token structure
- [ ] Replace hardcoded values

### Code Organization

- [ ] Extract logic to utils
- [ ] Break into primitives
- [ ] Replace styled-components

### Quality

- [ ] Add accessibility
- [ ] Optimize performance
- [ ] Validate props
- [ ] Remove dead code

### Testing & Documentation

- [ ] Write/update tests
- [ ] Verify Lighthouse score
- [ ] Update documentation
- [ ] Code review

---

## Common Patterns

### Pattern 1: Simple Component Refactoring

```typescript
// Before
const Button = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '8px 16px',
                backgroundColor: '#0066CC',
                color: 'white',
            }}
        >
            {text}
        </button>
    )
}

// After
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getButtonAriaAttributes, createButtonKeyboardHandler } from '../../utils/accessibility'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, onClick, disabled, ...props }, ref) => {
        const tokens = useResponsiveTokens<ButtonTokenType>('BUTTON')
        const ariaAttrs = getButtonAriaAttributes({ disabled })
        const keyboardHandler = createButtonKeyboardHandler(onClick, disabled)

        return (
            <Block
                as="button"
                ref={ref}
                padding={`${tokens.button.padding.y} ${tokens.button.padding.x}`}
                backgroundColor={tokens.button.backgroundColor}
                color={tokens.button.color}
                {...ariaAttrs}
                {...keyboardHandler}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                {text}
            </Block>
        )
    }
)
```

### Pattern 2: Complex Component Refactoring

```typescript
// Menu Component Example

// 1. Define anatomy and tokens
// Menu.tokens.ts
export type MenuTokenType = {
    trigger: TokenGroup
    content: TokenGroup
    item: TokenGroup
}

// 2. Extract logic
// Menu.utils.ts
export const createMenuState = (initialOpen: boolean) => {
    /* ... */
}
export const handleMenuKeyDown = (options: KeyHandlerOptions) => {
    /* ... */
}

// 3. Create primitives
// Menu/MenuTrigger.tsx
export const MenuTrigger = forwardRef(/* ... */)

// Menu/MenuContent.tsx
export const MenuContent = forwardRef(/* ... */)

// Menu/MenuItem.tsx
export const MenuItem = forwardRef(/* ... */)

// 4. Compose
// Menu/Menu.tsx
export const Menu = (props) => {
    // Use primitives and compose
}
```

---

## Troubleshooting

### Issue: Component too complex to refactor at once

**Solution**: Break into phases

1. Phase 1: Extract tokens
2. Phase 2: Separate logic
3. Phase 3: Break into primitives
4. Phase 4: Add accessibility

### Issue: Performance regression after refactoring

**Solution**:

1. Profile before and after
2. Identify bottleneck
3. Add optimizations only where needed
4. Verify Lighthouse score

### Issue: Breaking changes

**Solution**:

1. Maintain backward compatibility
2. Use feature flags if needed
3. Provide migration guide
4. Version documentation

---

## Success Criteria

A successfully refactored component:

✅ Follows uniform structure  
✅ Uses tokens (no hardcoded values)  
✅ Logic separated from UI  
✅ Uses Block/Primitives  
✅ Fully accessible  
✅ Meets performance targets (95+ Lighthouse)  
✅ Props validated  
✅ No dead code  
✅ Comprehensive tests  
✅ Complete documentation

---
