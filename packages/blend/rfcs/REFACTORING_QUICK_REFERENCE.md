# Component Refactoring - Quick Reference Guide

**Quick checklist for developers refactoring components**

---

## Before You Start

1. ✅ Read the component you're refactoring
2. ✅ Understand its current behavior
3. ✅ Review [REFACTORING_FLOWCHART.md](./REFACTORING_FLOWCHART.md) for detailed steps
4. ✅ Review [RFC 0007](./0007-component-refactoring-standards.md) for standards

---

## 13-Step Refactoring Checklist

### ✅ STEP 1: Pre-Refactoring Audit

- [ ] Read all component files
- [ ] Identify hardcoded values
- [ ] Identify logic in UI
- [ ] List unused props/code
- [ ] Document current behavior

### ✅ STEP 2: Define Component Anatomy

- [ ] Draw component structure
- [ ] Identify all parts (trigger, content, items, etc.)
- [ ] Map to visual hierarchy
- [ ] Document in tokens file

### ✅ STEP 3: Create Token Structure

- [ ] Find all hardcoded values
- [ ] Map to foundation tokens
- [ ] Create component tokens
- [ ] Replace in component
- [ ] Verify no hardcoded values remain

### ✅ STEP 4: Separate Logic from UI

- [ ] Identify all logic in component
- [ ] Extract to `ComponentName.utils.ts`
- [ ] Extract complex state to hooks (if needed)
- [ ] Keep only UI in `.tsx`

### ✅ STEP 5: Break into Primitives

- [ ] Identify composable parts
- [ ] Create sub-components
- [ ] Compose in main component
- [ ] Ensure reusability

### ✅ STEP 6: Replace Styled-Components

- [ ] Identify styled-components usage
- [ ] Replace with Block (containers)
- [ ] Replace with Primitives (form elements)
- [ ] Keep SC only if complex pseudo-selectors needed

### ✅ STEP 7: Add Accessibility

- [ ] Import accessibility utilities
- [ ] Add ARIA attributes using helpers
- [ ] Add keyboard navigation
- [ ] Add focus management (if modal/dropdown)
- [ ] Run jest-axe tests

### ✅ STEP 8: Optimize Performance

- [ ] Check Lighthouse score
- [ ] Add useMemo/useCallback only if needed
- [ ] Avoid over-optimization
- [ ] Verify score ≥ 95

### ✅ STEP 9: Props Validation

- [ ] Add HTML props support (primitives)
- [ ] Add width/height support (containers)
- [ ] Validate props in development
- [ ] Remove unused props

### ✅ STEP 10: Remove Dead Code

- [ ] Remove unused imports
- [ ] Remove unused props
- [ ] Remove commented code
- [ ] Remove legacy patterns

### ✅ STEP 11: Write/Update Tests

- [ ] Follow RFC 0002 test standards
- [ ] Test all categories
- [ ] Test accessibility
- [ ] Test performance
- [ ] Achieve 95%+ coverage

### ✅ STEP 12: Verify & Document

- [ ] Run Lighthouse (score ≥ 95)
- [ ] Run all tests
- [ ] Update README.md
- [ ] Update accessibility.md
- [ ] Check consistency

### ✅ STEP 13: Code Review

- [ ] Self-review checklist complete
- [ ] Submit PR
- [ ] Address feedback
- [ ] Get approval

---

## Component Structure Template

```
ComponentName/
├── ComponentName.tsx              # UI only
├── ComponentName.types.ts        # Types & enums
├── ComponentName.tokens.ts        # Token structure
├── ComponentName.utils.ts         # Logic
├── ComponentName.hooks.ts         # Hooks (optional)
├── ComponentName.test.tsx         # Tests
├── ComponentName.accessibility.md # A11y docs
├── README.md                      # Component docs
└── index.ts                       # Exports
```

---

## Key Principles

1. **Tokens First**: No hardcoded values
2. **Logic Separate**: Utils for logic, UI for rendering
3. **Primitives First**: Block & Primitives over styled-components
4. **Accessibility Default**: Use a11y utilities
5. **Performance Target**: 95+ Lighthouse
6. **Props Validated**: HTML props (primitives), width/height (containers)
7. **No Dead Code**: Remove unused code
8. **Consistent Patterns**: Follow standards

---

## Common Patterns

### Pattern: Simple Component

```typescript
// Use Block, tokens, accessibility utilities
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getComponentAriaAttributes } from '../../utils/accessibility'
```

### Pattern: Complex Component

```typescript
// Break into sub-components
// Use composition
// Extract logic to utils
```

---

## Need Help?

- 📖 See [REFACTORING_FLOWCHART.md](./REFACTORING_FLOWCHART.md) for detailed steps
- 📋 See [RFC 0007](./0007-component-refactoring-standards.md) for standards
- 🔍 Check existing refactored components for examples

---

**Remember**: Think first, then make changes. Follow the flowchart step-by-step.
