# Accessibility Metrics - Usage Guide

This guide explains how to use the accessibility metrics system to evaluate and document accessibility compliance for components in the Blend Design System.

## Quick Start

### View Current Dashboard

```bash
pnpm accessibility:dashboard
```

This opens the accessibility dashboard showing metrics for all evaluated components.

### Generate Reports

```bash
pnpm accessibility:generate
```

This regenerates the dashboard and component documentation from all `*-metrics.json` files in `scripts/accessibility/`.

## Evaluating a New Component

### Step 1: Copy the Template

```bash
cd scripts/accessibility
cp component-template.json button-metrics.json
```

### Step 2: Update Component Information

Edit the JSON file:

```json
{
    "componentName": "Button",
    "version": "0.0.27",
    "evaluationDate": "2025-11-24",
    "evaluator": "Your Name"
}
```

### Step 3: Test the Component

#### Keyboard Navigation Testing

1. **Tab Order**
    - Press Tab to navigate through all interactive elements
    - Verify order is logical and matches visual order
    - Status: `pass` if correct, `fail` if broken

2. **Focus Management**
    - Check that focus is always visible
    - Verify focus doesn't get lost
    - For modals: focus should trap inside
    - Status: `pass` if correct

3. **Keyboard Shortcuts**
    - Enter/Space should activate buttons
    - Escape should close modals/dropdowns
    - Arrow keys for navigation (if applicable)
    - Status: `pass` if standard keys work

**Update the JSON:**

```json
"keyboardNavigation": {
  "score": 95,
  "tabOrder": "pass",
  "focusManagement": "pass",
  "keyboardShortcuts": "pass",
  "trapFocus": "not-applicable",
  "escapeKey": "pass",
  "notes": [
    "Tab navigation works correctly",
    "Focus indicator visible at all times",
    "Enter/Space activate button"
  ]
}
```

#### Screen Reader Testing

Test with multiple screen readers:

1. **NVDA (Windows) + Chrome/Firefox**

    ```
    Install NVDA: https://www.nvaccess.org/download/
    Test: Navigate component with arrows and tab
    Verify: All elements announced with correct roles
    ```

2. **JAWS (Windows) + Chrome**

    ```
    30-minute demo mode available
    Test: Navigate and interact with component
    Verify: States and changes announced
    ```

3. **VoiceOver (macOS) + Safari**

    ```
    Enable: System Preferences → Accessibility → VoiceOver
    Shortcut: Cmd+F5
    Test: Navigate with VO+arrows
    ```

4. **VoiceOver (iOS) + Safari**

    ```
    Enable: Settings → Accessibility → VoiceOver
    Test: Swipe to navigate
    Verify: Touch targets adequate
    ```

5. **TalkBack (Android) + Chrome**
    ```
    Enable: Settings → Accessibility → TalkBack
    Test: Swipe to navigate
    Verify: All elements accessible
    ```

**Check for:**

- Accessible names (via aria-label or text content)
- Correct roles (button, checkbox, dialog, etc.)
- State announcements (expanded, checked, selected)
- Relationship announcements (labels with inputs)

**Update the JSON:**

```json
"screenReaderSupport": {
  "score": 98,
  "ariaLabels": "pass",
  "ariaDescriptions": "pass",
  "roleUsage": "pass",
  "liveRegions": "not-applicable",
  "semanticHTML": "pass",
  "announcements": "pass",
  "notes": [
    "NVDA announces 'Submit button'",
    "State changes announced correctly",
    "Uses semantic button element"
  ]
}
```

#### Visual Accessibility Testing

1. **Color Contrast**

    Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

    Requirements:
    - Normal text (< 18pt): 4.5:1 (AA), 7:1 (AAA)
    - Large text (≥ 18pt or ≥ 14pt bold): 3:1 (AA), 4.5:1 (AAA)
    - UI components: 3:1 (AA)
    - Focus indicators: 3:1 (AA)

    Test all states:
    - Default
    - Hover
    - Active
    - Focus
    - Disabled

2. **Text Resize**

    ```
    Browser: Zoom to 200%
    Check: No horizontal scrolling
    Check: No text overlap
    Check: All functionality available
    ```

3. **Focus Indicators**

    ```
    Tab through component
    Verify: Outline visible on all elements
    Measure: 3:1 contrast with background
    Check: At least 2px thick
    ```

4. **Reduced Motion**

    ```
    macOS: System Preferences → Accessibility → Display → Reduce Motion
    Windows: Settings → Ease of Access → Display → Show animations

    Verify: Animations disabled or simplified
    ```

5. **High Contrast Mode (Windows)**

    ```
    Windows: Settings → Ease of Access → High Contrast

    Verify: Component visible and functional
    Check: Borders and icons visible
    ```

**Update the JSON:**

```json
"visualAccessibility": {
  "score": 95,
  "colorContrast": "pass",
  "fontSize": "pass",
  "focusIndicators": "pass",
  "reducedMotion": "pass",
  "highContrast": "pass",
  "textSpacing": "pass",
  "notes": [
    "Primary button: 5.2:1 contrast (AA compliant)",
    "Focus ring: 4.8:1 contrast",
    "Respects prefers-reduced-motion",
    "Visible in high contrast mode"
  ]
}
```

#### ARIA Compliance

Check against WAI-ARIA Authoring Practices:
https://www.w3.org/WAI/ARIA/apg/

1. **Find the Pattern**
    - Button: https://www.w3.org/WAI/ARIA/apg/patterns/button/
    - Accordion: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
    - Dialog: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
    - etc.

2. **Verify Roles**

    ```
    Use browser DevTools → Accessibility Inspector
    Check: role attribute matches pattern
    ```

3. **Verify States and Properties**

    ```
    Common states:
    - aria-expanded (for expandable elements)
    - aria-selected (for selectable items)
    - aria-checked (for checkboxes)
    - aria-pressed (for toggle buttons)
    - aria-disabled (for disabled elements)

    Common properties:
    - aria-label (accessible name)
    - aria-labelledby (label reference)
    - aria-describedby (description reference)
    - aria-controls (controlled element reference)
    ```

4. **Run Automated Tools**

    Install axe DevTools browser extension:
    - Chrome: https://chrome.google.com/webstore
    - Firefox: https://addons.mozilla.org

    Scan component and fix all errors.

**Update the JSON:**

```json
"ariaCompliance": {
  "score": 100,
  "ariaRoles": "pass",
  "ariaStates": "pass",
  "ariaProperties": "pass",
  "designPattern": "pass",
  "landmarkRegions": "not-applicable",
  "notes": [
    "Follows WAI-ARIA Button pattern",
    "aria-pressed for toggle buttons",
    "No ARIA validation errors in axe"
  ]
}
```

### Step 4: Evaluate WCAG Criteria

Review the WCAG criteria in `wcag-criteria.ts` and evaluate each one:

```json
"evaluations": [
  {
    "criterionId": "1.1.1",
    "status": "pass",
    "notes": "Icons have aria-label. No images without alt text.",
    "evidence": ["All icons use aria-label prop"]
  },
  {
    "criterionId": "2.1.1",
    "status": "pass",
    "notes": "All functionality available via keyboard. Tab, Enter, Space work correctly.",
    "codeReferences": ["Button.tsx:45-67"]
  }
]
```

**Status Options:**

- `pass`: Criterion fully met
- `fail`: Criterion not met (creates issue)
- `partial`: Partially met (creates issue)
- `not-applicable`: Criterion doesn't apply
- `needs-review`: Manual review needed

### Step 5: Calculate Scores

Calculate scores based on pass/fail ratio for each level:

```
Level A Score = (passed A criteria / total applicable A criteria) * 100
Level AA Score = (passed AA criteria / total applicable AA criteria) * 100
Level AAA Score = (passed AAA criteria / total applicable AAA criteria) * 100
Overall Score = (A + AA + AAA) / 3
```

Category scores (0-100):

```
Keyboard Navigation = weighted average of aspects (80-100 = good)
Screen Reader = weighted average of aspects (90-100 = excellent)
Visual Accessibility = weighted average of aspects (85-100 = good)
ARIA Compliance = weighted average of aspects (95-100 = excellent)
```

### Step 6: Document Strengths and Issues

**Strengths:**

```json
"strengths": [
  "Uses semantic HTML button element",
  "Excellent keyboard support",
  "Proper ARIA attributes",
  "Respects user motion preferences",
  "Clear focus indicators"
]
```

**Issues:**

```json
"issuesFound": [
  {
    "severity": "minor",
    "criterion": "1.4.6",
    "description": "Enhanced contrast not verified for AAA",
    "impact": "Users with low vision may have difficulty",
    "suggestion": "Measure contrast ratios with analyzer",
    "codeReference": "Button.tsx:123"
  }
]
```

**Severity Levels:**

- `critical`: Blocks users from completing tasks
- `major`: Significantly impairs user experience
- `minor`: Enhancement or best practice

**Recommendations:**

```json
"recommendations": [
  "Add aria-describedby for additional context",
  "Test with more screen readers",
  "Document keyboard shortcuts in README",
  "Add automated accessibility tests"
]
```

### Step 7: Generate Reports

```bash
pnpm accessibility:generate
```

This creates:

- Updated `docs/accessibility/dashboard.md`
- Component doc at `docs/accessibility/components/Button.md`
- Updated `docs/accessibility/dashboard.json`

### Step 8: Review and Iterate

1. Open the generated dashboard
2. Review the component documentation
3. Address any critical or major issues
4. Update the code
5. Re-evaluate and regenerate

## Testing Checklist

Use this checklist when evaluating components:

### Keyboard

- [ ] Tab order is logical
- [ ] All interactive elements focusable
- [ ] Focus indicator visible (3:1 contrast)
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals/menus
- [ ] Arrow keys work (if applicable)
- [ ] No keyboard traps
- [ ] Focus management in modals

### Screen Reader

- [ ] Tested with NVDA + Chrome/Firefox
- [ ] Tested with JAWS + Chrome
- [ ] Tested with VoiceOver + Safari (macOS)
- [ ] Tested with VoiceOver + Safari (iOS)
- [ ] Tested with TalkBack + Chrome (Android)
- [ ] All elements announced
- [ ] Roles are correct
- [ ] States announced (expanded, checked, etc.)
- [ ] Changes announced
- [ ] No ARIA errors in axe DevTools

### Visual

- [ ] Color contrast measured (4.5:1 AA, 7:1 AAA)
- [ ] Text resizable to 200%
- [ ] Focus indicators visible
- [ ] Reduced motion respected
- [ ] High contrast mode tested
- [ ] Text spacing adjustable
- [ ] Touch targets ≥ 24×24px (AA) or ≥ 44×44px (AAA)

### ARIA

- [ ] Follows WAI-ARIA pattern
- [ ] Roles are correct
- [ ] States are correct
- [ ] Properties are correct
- [ ] Accessible names present
- [ ] No ARIA validation errors
- [ ] Semantic HTML used

### Code

- [ ] Valid HTML
- [ ] No duplicate IDs
- [ ] Proper nesting
- [ ] No ARIA misuse
- [ ] Labels associated with inputs

## Tools Reference

### Browser Extensions

- **axe DevTools**: Accessibility scanner
- **WAVE**: Visual accessibility evaluator
- **Accessibility Insights**: Microsoft's accessibility tool

### Screen Readers

- **NVDA** (Windows): https://www.nvaccess.org/
- **JAWS** (Windows): https://www.freedomscientific.com/products/software/jaws/
- **VoiceOver** (macOS/iOS): Built-in
- **TalkBack** (Android): Built-in

### Testing Tools

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Oracle**: Colorblindness simulator
- **Accessibility Insights for Web**: https://accessibilityinsights.io/

### Resources

- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **WAI-ARIA Practices**: https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **a11y Project**: https://www.a11yproject.com/

## Automation

### Add to CI/CD

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Check

on: [pull_request]

jobs:
    accessibility:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: pnpm/action-setup@v2
            - name: Generate Reports
              run: pnpm accessibility:generate
            - name: Check for Critical Issues
              run: |
                  CRITICAL=$(jq '.summary.criticalIssues' docs/accessibility/dashboard.json)
                  if [ "$CRITICAL" -gt 0 ]; then
                    echo "❌ Found $CRITICAL critical accessibility issues"
                    exit 1
                  fi
```

### Add Jest Tests

```bash
pnpm add -D jest-axe @testing-library/jest-dom
```

```javascript
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import Button from './Button'

expect.extend(toHaveNoViolations)

test('Button should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
})
```

## FAQ

### Q: How often should components be evaluated?

**A:** Evaluate:

- When creating a new component
- After major changes to a component
- When WCAG guidelines are updated
- At least annually for all components

### Q: What if a criterion doesn't apply to my component?

**A:** Use `"status": "not-applicable"` and explain why in the notes.

### Q: How do I handle failures?

**A:**

1. Document the failure in `issuesFound`
2. Set severity (critical, major, minor)
3. Provide fix suggestion
4. Create an issue/ticket to track
5. Fix the code
6. Re-evaluate

### Q: Can I automate the evaluation?

**A:** Partially:

- Use axe DevTools for automated scanning
- Use jest-axe for testing
- Manual testing still required for:
    - Keyboard navigation
    - Screen reader testing
    - Context and usability

### Q: What score should components aim for?

**A:**

- **Minimum**: 85% overall, 100% Level A, 90% Level AA
- **Good**: 90% overall, 100% Level A, 95% Level AA, 85% Level AAA
- **Excellent**: 95%+ overall, 100% A/AA, 90%+ AAA

### Q: How do I share the dashboard with stakeholders?

**A:**

1. Generate reports: `pnpm accessibility:generate`
2. Share `docs/accessibility/dashboard.md`
3. Or share the JSON for custom visualizations
4. Or deploy docs to GitHub Pages

## Getting Help

- Review existing component evaluations for examples
- Check `wcag-criteria.ts` for criterion details
- See `accordion-metrics.json` for a complete example
- Consult WAI-ARIA Authoring Practices for patterns
- Ask the accessibility team for guidance
