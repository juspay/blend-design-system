# StepperV2 Component Documentation

## Requirements

Create a token-driven stepper for multi-step flows that supports:

- **Layouts**: Horizontal (default) and vertical orientations (`StepperV2Type`)
- **Step states**: Completed, current, pending, disabled, and skipped (`StepperV2StepStatus`)
- **Current step resolution**: The active step is the first step whose `status` is `CURRENT`; if none is set, step `0` is treated as current
- **Optional substeps** (vertical): Nested items under a step, with expand/collapse when substeps exist
- **Optional descriptions** (horizontal): Per-step description with info affordance and accessible text
- **Interactive mode**: Optional `clickable` steps with `onStepClick(stepIndex)`; vertical also supports `onSubstepClick(stepId, substepIndex)` where `substepIndex` is **1-based** (first substep → `1`)
- **Custom step icons**: Optional `icon` on a step overrides the default check / lock / index rendering
- **Keyboard support** (when `clickable`): Arrow keys to move between steps, Home / End, Enter / Space to activate; polite live-region announcements on focus moves
- **Accessibility**: Landmark `role="group"` with `aria-roledescription="stepper"`, per-step labels and `aria-current="step"` on the current step
- **Theme support**: Light and dark token maps via `getStepperV2Tokens` / `useResponsiveTokens('STEPPERV2')`

## Anatomy

### Horizontal

```
  ●─────●─────○─────○
  S1    S2    S3    S4
```

- **Root**: Flex row container (`data-stepper="stepper"`)
- **Step column**: Connector line segment, status circle (check, lock, or index), title (and optional description / tooltip)
- **Connectors**: Line tokens differ for first/last and inactive vs active where applicable

### Vertical

```
  ●  Step 1
  │
  ●  Step 2  [expand]
  │    ○ Sub A
  │    ○ Sub B
  │
  ○  Step 3
```

- **Left rail**: Circle stack and vertical connector lines (including substep dots when expanded)
- **Right column**: Step title row (interactive when `clickable`), optional chevron expand control, substep list with its own focus/click behavior when `clickable`

## Props & Types

```typescript
export enum StepperV2StepStatus {
    COMPLETED = 'completed',
    CURRENT = 'current',
    PENDING = 'pending',
    DISABLED = 'disabled',
    SKIPPED = 'skipped',
}

export enum StepperV2Type {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export type StepperV2Props = {
    steps: StepperV2Step[]
    onStepClick?: (stepIndex: number) => void
    /** Receives numeric step `id` and 1-based substep ordinal (implementation passes `subIdx + 1`). */
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperV2Type
}

export type SubStep = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
}

export type StepperV2Step = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
    description?: string
    icon?: ReactNode
    substeps?: SubStep[]
    isExpandable?: boolean
    isExpanded?: boolean
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'id'>
```

Additional HTML attributes may be spread onto the root container, except `className`, `style`, and `id` (the numeric `id` on each step is the domain id, not the DOM `id` attribute).

## Final Token Type (summary)

```typescript
export type StepperV2TokensType = {
    container: {
        gap: CSSObject['gap']
        step: {
            circle: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        backgroundColor: CSSObject['backgroundColor']
                        borderColor: CSSObject['borderColor']
                        borderWidth: CSSObject['borderWidth']
                        borderRadius: CSSObject['borderRadius']
                        size: CSSObject['width']
                        transition: CSSObject['transition']
                        outline: CSSObject['outline']
                        outlineOffset: CSSObject['outlineOffset']
                    }
                }
            }
            icon: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        color: CSSObject['color']
                    }
                }
            }
        }
        connector: {
            line: {
                active: { default: { color; height } }
                inactive: { default: { color; height } }
            }
        }
        title: {
            text: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        color: CSSObject['color']
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        gap: CSSObject['gap']
                    }
                }
            }
        }
    }
}

export type ResponsiveStepperV2Tokens = {
    [key in keyof BreakpointType]: StepperV2TokensType
}
```

**Token hook**: `useResponsiveTokens<StepperV2TokensType>('STEPPERV2')`.

**Token pattern**: `container.step.circle[status][interactionState].*` and `container.title.text[status][interactionState].*`.

## Design Decisions

### 1. Separate horizontal and vertical implementations

**Decision**: `StepperV2` delegates to `HorizontalStepperV2` or `VerticalStepperV2` based on `stepperType`.

**Rationale**: Layout, substeps, and keyboard models differ. Isolated components keep each orientation maintainable and avoid a single overloaded tree.

### 2. Explicit `CURRENT` status drives the indicator

**Decision**: `derivedIndex` is `steps.findIndex(s => s.status === CURRENT)` or `0` if none.

**Rationale**: Consumers control wizard state in their store; the component reflects that state rather than inferring progress only from array order.

### 3. Substep callback uses step `id` and 1-based index

**Decision**: `VerticalStepperV2` maps internal `(stepIdx, subIdx)` to `onSubstepClick(steps[stepIdx].id, subIdx + 1)`.

**Rationale**: Callers often key data by stable step `id` and human-friendly ordinal; documenting 1-based `substepIndex` avoids off-by-one bugs in app code.

### 4. Expand control is a sibling of the step trigger (vertical)

**Decision**: When a step is expandable, the chevron is a separate `role="button"` next to the step title control, not nested inside it.

**Rationale**: Avoids invalid HTML (interactive inside interactive) and keeps step activation vs expand/collapse as distinct actions.

### 5. Live region announcements on keyboard step changes

**Decision**: When `clickable` and focus moves between steps via arrows / Home / End, a short-lived `role="status"` region announces the focused step title.

**Rationale**: Supports WCAG feedback when focus moves without a full page change; shared helper `scheduleLiveRegionAnnouncement` lives in `StepperV2/utils.ts`.

### 6. Horizontal interactive step surface

**Decision**: Click targets include the icon rail and the title column; the forwarded `ref` attaches to the focusable step control for programmatic focus alignment with keyboard order.

**Rationale**: Matches user expectation that the whole step “cell” is clickable, while preserving valid roles and focus management for arrow-key navigation.
