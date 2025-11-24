# Accessibility Metrics System

This directory contains the accessibility evaluation framework for the Blend Design System components.

## Overview

The accessibility metrics system evaluates components against WCAG 2.2 Level AAA standards and generates comprehensive reports including:

- Dashboard with overall accessibility metrics
- Individual component accessibility reports
- Detailed WCAG criteria evaluations
- Recommendations and issue tracking

## Structure

```
scripts/accessibility/
├── types.ts                    # TypeScript type definitions
├── wcag-criteria.ts           # WCAG 2.2 criteria definitions
├── report-generator.ts        # Report generation logic
├── index.ts                   # Main entry point
├── README.md                  # This file
└── *-metrics.json            # Component accessibility metrics
```

## Component Metrics Format

Each component has a JSON file (e.g., `accordion-metrics.json`) containing:

### Overall Scores

- `overallScore`: Overall accessibility score (0-100)
- `levelAScore`: WCAG Level A compliance score
- `levelAAScore`: WCAG Level AA compliance score
- `levelAAAScore`: WCAG Level AAA compliance score

### Category Scores

- **Keyboard Navigation**: Tab order, focus management, shortcuts
- **Screen Reader Support**: ARIA attributes, semantic HTML, announcements
- **Visual Accessibility**: Contrast, font sizes, focus indicators, reduced motion
- **ARIA Compliance**: Roles, states, properties, design patterns

### Evaluations

Detailed evaluation of each WCAG criterion:

- Criterion ID (e.g., "1.1.1", "2.1.1")
- Compliance status (pass, fail, partial, not-applicable, needs-review)
- Notes explaining the evaluation
- Code references
- Evidence

### Issues and Recommendations

- **Issues**: Categorized by severity (critical, major, minor)
- **Recommendations**: Suggestions for improvement
- **Strengths**: Accessibility features done well

## Usage

### Generate Reports

Run the report generator to create accessibility documentation:

```bash
cd scripts/accessibility
npx ts-node index.ts
```

This will:

1. Load all `*-metrics.json` files
2. Generate a dashboard at `docs/accessibility/dashboard.md`
3. Generate individual component reports in `docs/accessibility/components/`

### Creating Metrics for New Components

1. **Evaluate the Component**
    - Test keyboard navigation
    - Test with screen readers (NVDA, JAWS, VoiceOver)
    - Check color contrast ratios
    - Verify ARIA attributes
    - Test with assistive technologies

2. **Create Metrics File**

    Create a new JSON file: `{component-name}-metrics.json`

    ```json
    {
      "componentName": "ComponentName",
      "version": "0.0.27",
      "evaluationDate": "2025-11-24",
      "overallScore": 92,
      "levelAScore": 100,
      "levelAAScore": 95,
      "levelAAAScore": 85,
      "keyboardNavigation": { ... },
      "screenReaderSupport": { ... },
      "visualAccessibility": { ... },
      "ariaCompliance": { ... },
      "evaluations": [ ... ],
      "strengths": [ ... ],
      "recommendations": [ ... ],
      "issuesFound": [ ... ]
    }
    ```

3. **Regenerate Reports**

    Run the generator to include the new component in the dashboard.

## WCAG Criteria

The system evaluates components against all WCAG 2.2 criteria:

### Level A (25 criteria)

- Essential accessibility features
- Most critical barriers
- Minimum conformance level

### Level AA (20 criteria)

- Recommended conformance level
- Industry standard
- Addresses major barriers

### Level AAA (28 criteria)

- Enhanced accessibility
- Specialized needs
- Highest conformance level

See `wcag-criteria.ts` for complete list with checkpoints.

## Evaluation Guidelines

### Keyboard Navigation

- ✅ All interactive elements keyboard accessible
- ✅ Logical tab order
- ✅ Visible focus indicators
- ✅ No keyboard traps
- ✅ Standard keyboard patterns work

### Screen Reader Support

- ✅ Proper ARIA roles
- ✅ Accessible names for all controls
- ✅ State changes announced
- ✅ Semantic HTML
- ✅ Follows ARIA design patterns

### Visual Accessibility

- ✅ Color contrast meets WCAG requirements
- ✅ Text is resizable
- ✅ Focus indicators are visible
- ✅ Respects reduced motion preference
- ✅ Works in high contrast mode

### ARIA Compliance

- ✅ Correct ARIA roles
- ✅ States properly managed
- ✅ Properties correctly set
- ✅ Follows WAI-ARIA Authoring Practices
- ✅ No ARIA validation errors

## Compliance Status Definitions

- **pass**: Criterion is fully met
- **fail**: Criterion is not met
- **partial**: Criterion is partially met
- **not-applicable**: Criterion doesn't apply to this component
- **needs-review**: Manual review required to determine compliance

## Testing Tools

### Automated Testing

- axe DevTools
- WAVE
- Lighthouse
- jest-axe

### Manual Testing

- Keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver, TalkBack)
- Color contrast analyzer
- Browser DevTools accessibility inspector

### Browser Testing

- Chrome + NVDA (Windows)
- Firefox + NVDA (Windows)
- Safari + VoiceOver (macOS)
- Safari + VoiceOver (iOS)
- Chrome + TalkBack (Android)

## References

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)
- [a11y Project Checklist](https://www.a11yproject.com/checklist/)

## Contributing

When adding new components or updating existing ones:

1. Create/update the metrics JSON file
2. Run the report generator
3. Review generated documentation
4. Address any issues found
5. Update component code as needed
6. Re-evaluate and regenerate reports

## CI/CD Integration

To integrate into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Generate Accessibility Reports
  run: |
      cd scripts/accessibility
      npx ts-node index.ts

- name: Check for Critical Issues
  run: |
      # Parse dashboard.json and fail if critical issues exist
      node -e "const data = require('./docs/accessibility/dashboard.json');
               if (data.summary.criticalIssues > 0) process.exit(1);"
```

## Support

For questions or issues with the accessibility metrics system:

1. Check existing component reports for examples
2. Review WCAG criteria definitions in `wcag-criteria.ts`
3. Consult the references section
4. Open an issue with the accessibility team
