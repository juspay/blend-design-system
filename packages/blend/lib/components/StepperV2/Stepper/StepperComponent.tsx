import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    useId,
} from 'react'
import {
    StepperV2Props,
    StepperV2StepStatus,
    StepperV2Type,
} from '../stepperV2.types'
import { scheduleLiveRegionAnnouncement } from '../utils'
import Block from '../../Primitives/Block/Block'
import { Steps } from './Steps'
import { useMessages } from '../../../i18n/useMessages'
import { STEPPER_MESSAGES } from '../../../i18n/catalog/stepper.messages'

const StepperComponent = forwardRef<HTMLDivElement, StepperV2Props>(
    (
        {
            steps,
            onStepClick,
            onSubstepClick,
            clickable,
            stepperType = StepperV2Type.VERTICAL,
            ...htmlProps
        },
        ref
    ) => {
        const { m } = useMessages(STEPPER_MESSAGES)
        const stepperInstanceId = useId().replace(/:/g, '-')

        const [focusedStepIndex, setFocusedStepIndex] = useState<number | null>(
            null
        )
        const stepRefs = useRef<(HTMLDivElement | null)[]>([])

        const handleStepClick = useCallback(
            (stepIndex: number) => {
                onStepClick?.(stepIndex)
            },
            [onStepClick]
        )
        const stepClickHandler = onStepClick ? handleStepClick : undefined

        const currentExplicitIndex = steps.findIndex(
            (s) => s.status === StepperV2StepStatus.CURRENT
        )
        const derivedIndex =
            currentExplicitIndex >= 0 ? currentExplicitIndex : 0

        const isHorizontal = stepperType === StepperV2Type.HORIZONTAL

        const handleKeyDown = (
            event: React.KeyboardEvent,
            currentIndex: number
        ) => {
            if (!clickable) return

            let targetIndex: number | null = null
            const lastIndex = steps.length - 1

            if (isHorizontal) {
                switch (event.key) {
                    case 'ArrowRight':
                        event.preventDefault()
                        targetIndex = Math.min(currentIndex + 1, lastIndex)
                        break
                    case 'ArrowLeft':
                        event.preventDefault()
                        targetIndex = Math.max(currentIndex - 1, 0)
                        break
                    case 'Home':
                        event.preventDefault()
                        targetIndex = 0
                        break
                    case 'End':
                        event.preventDefault()
                        targetIndex = lastIndex
                        break
                }
            } else {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        targetIndex = Math.min(currentIndex + 1, lastIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        targetIndex = Math.max(currentIndex - 1, 0)
                        break
                    case 'Home':
                        event.preventDefault()
                        targetIndex = 0
                        break
                    case 'End':
                        event.preventDefault()
                        targetIndex = lastIndex
                        break
                }
            }

            if (targetIndex === null) return

            const targetStep = steps[targetIndex]
            const targetEl = stepRefs.current[targetIndex]
            if (!targetStep.disabled && targetEl) {
                setFocusedStepIndex(targetIndex)
                targetEl.focus()
            }
        }

        useEffect(() => {
            if (focusedStepIndex === null) return
            const currentStep = steps[focusedStepIndex]
            if (!currentStep || currentStep.disabled) return
            return scheduleLiveRegionAnnouncement(
                m('stepper.a11y.step-focused', {
                    current: String(focusedStepIndex + 1),
                    title: String(currentStep.title),
                })
            )
        }, [focusedStepIndex, steps, m])

        const blockHtmlProps = { ...(htmlProps as Record<string, unknown>) }
        delete blockHtmlProps['aria-orientation']

        const handleSubstepClick = onSubstepClick
            ? (stepIdx: number, subIdx: number) =>
                  onSubstepClick(steps[stepIdx].id, subIdx + 1)
            : undefined

        return (
            <Block
                data-stepper="stepper"
                ref={ref}
                height={'100%'}
                width={
                    stepperType === StepperV2Type.HORIZONTAL ? '100%' : 'auto'
                }
                display={'flex'}
                flexDirection={
                    stepperType === StepperV2Type.VERTICAL ? 'column' : 'row'
                }
                justifyContent={
                    stepperType === StepperV2Type.HORIZONTAL
                        ? 'space-between'
                        : 'flex-start'
                }
                role="group"
                aria-label={m('stepper.a11y.progress', {
                    current: String(derivedIndex + 1),
                    total: String(steps.length),
                })}
                aria-roledescription="stepper"
                {...blockHtmlProps}
            >
                {steps.map((step, index) => (
                    <Steps
                        key={step.id}
                        ref={(el) => {
                            stepRefs.current[index] = el
                        }}
                        step={step}
                        stepIndex={index}
                        stepsLength={steps.length}
                        isCompleted={index < derivedIndex}
                        isCurrent={index === derivedIndex}
                        isFirst={index === 0}
                        isLast={index === steps.length - 1}
                        onClick={stepClickHandler}
                        onSubstepClick={handleSubstepClick}
                        clickable={clickable}
                        onKeyDown={handleKeyDown}
                        stepperInstanceId={stepperInstanceId}
                        stepperType={stepperType}
                    />
                ))}
            </Block>
        )
    }
)

export default StepperComponent
