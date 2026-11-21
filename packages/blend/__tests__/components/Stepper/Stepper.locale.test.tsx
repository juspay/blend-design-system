import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import Stepper from '../../../lib/components/Stepper/Stepper'
import { StepperType, StepState } from '../../../lib/components/Stepper/types'
import StepperV2 from '../../../lib/components/StepperV2/StepperV2'
import {
    StepperV2StepStatus,
    StepperV2Type,
} from '../../../lib/components/StepperV2/stepperV2.types'

const FRENCH: Record<string, string> = {
    'stepper.a11y.step-current':
        'Étape {current} sur {total} : {title}, en cours',
    'stepper.a11y.substep-pending': 'Sous-étape {number} : {title}, en attente',
    'stepper.a11y.progress':
        'Indicateur de progression : étape {current} sur {total}',
}
const t = (key: string) => FRENCH[key]

const STEPS = [
    { id: 1, title: 'Account', status: StepState.COMPLETED },
    { id: 2, title: 'Payment', status: StepState.CURRENT },
    { id: 3, title: 'Review', status: StepState.PENDING },
]

// V1 step elements also carry `aria-labelledby` (the title), which takes
// precedence over `aria-label` for the computed accessible name, so V1 is
// asserted on the attribute itself.
const stepWithDataId = (container: HTMLElement, dataId: string) =>
    container.querySelector(`[data-id="${dataId}"]`)

describe('Stepper locale (Accessibility)', () => {
    it('names the V1 step count and keeps the original data-id', () => {
        const { container } = render(
            <Stepper
                steps={STEPS}
                stepperType={StepperType.HORIZONTAL}
                clickable
            />
        )

        // The label used to read "Step 2 of Payment, current".
        expect(
            stepWithDataId(container, 'Step 2 of Payment, current')
        ).toHaveAttribute('aria-label', 'Step 2 of 3: Payment, current')
    })

    it('translates the V1 step and progress names through the provider', () => {
        const { container } = render(
            <Stepper
                steps={STEPS}
                stepperType={StepperType.HORIZONTAL}
                clickable
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(
            stepWithDataId(container, 'Step 2 of Payment, current')
        ).toHaveAttribute('aria-label', 'Étape 2 sur 3 : Payment, en cours')
        expect(
            screen.getByLabelText('Indicateur de progression : étape 2 sur 3')
        ).toBeInTheDocument()
    })

    it('translates V1 substep names and keeps their data-id', () => {
        render(
            <Stepper
                stepperType={StepperType.VERTICAL}
                steps={[
                    {
                        id: 1,
                        title: 'Setup',
                        status: StepState.CURRENT,
                        substeps: [{ id: 1, title: 'Keys' }],
                    },
                ]}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        const substep = screen.getByLabelText('Sous-étape 1 : Keys, en attente')
        expect(substep).toHaveAttribute('data-id', 'Substep 1: Keys, pending')
    })

    it('keeps the StepperV2 English name and translates it', () => {
        const v2Steps = [
            { id: 1, title: 'Alpha', status: StepperV2StepStatus.COMPLETED },
            { id: 2, title: 'Beta', status: StepperV2StepStatus.CURRENT },
        ]
        const { unmount } = render(
            <StepperV2
                steps={v2Steps}
                stepperType={StepperV2Type.HORIZONTAL}
                clickable
                onStepClick={vi.fn()}
            />
        )
        expect(
            screen.getByRole('button', { name: 'Step 2 of 2: Beta, current' })
        ).toBeInTheDocument()
        unmount()

        render(
            <StepperV2
                steps={v2Steps}
                stepperType={StepperV2Type.HORIZONTAL}
                clickable
                onStepClick={vi.fn()}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )
        const step = screen.getByRole('button', {
            name: 'Étape 2 sur 2 : Beta, en cours',
        })
        expect(step).toHaveAttribute('data-id', 'Step 2 of 2: Beta, current')
    })
})
