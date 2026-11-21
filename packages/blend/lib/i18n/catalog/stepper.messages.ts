/**
 * Strings for Stepper (Horizontal/Vertical) and StepperV2.
 *
 * Each step and substep status is a whole sentence rather than a
 * `', ' + status` suffix: the status word agrees with the rest of the
 * sentence in many languages, and the separator is not always a comma.
 *
 * `{current}` (the step's position), `{number}` (a substep's position) and
 * `{total}` are 1-based and passed unformatted.
 * `{title}` and `{description}` are the consumer's own text.
 *
 * The English strings that also feed `data-id` attributes are built
 * separately in the components and never come from here, so selectors stay
 * stable across locales.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const STEPPER_MESSAGES = {
    'stepper.a11y.step-completed':
        'Step {current} of {total}: {title}, completed',
    'stepper.a11y.step-current': 'Step {current} of {total}: {title}, current',
    'stepper.a11y.step-disabled':
        'Step {current} of {total}: {title}, disabled',
    'stepper.a11y.step-skipped': 'Step {current} of {total}: {title}, skipped',
    'stepper.a11y.step-pending': 'Step {current} of {total}: {title}, pending',
    'stepper.a11y.substep-completed': 'Substep {number}: {title}, completed',
    'stepper.a11y.substep-current': 'Substep {number}: {title}, current',
    'stepper.a11y.substep-disabled': 'Substep {number}: {title}, disabled',
    'stepper.a11y.substep-skipped': 'Substep {number}: {title}, skipped',
    'stepper.a11y.substep-pending': 'Substep {number}: {title}, pending',
    'stepper.a11y.step-focused': 'Step {current}: {title}',
    'stepper.a11y.progress': 'Progress indicator: step {current} of {total}',
    'stepper.a11y.additional-info': 'Additional information: {description}',
    'stepper.a11y.expand-substeps': 'Expand substeps for {title}',
    'stepper.a11y.collapse-substeps': 'Collapse substeps for {title}',
    'stepper.a11y.substeps': 'Substeps for {title}',
} as const
