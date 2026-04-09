import React, {
    forwardRef,
    useRef,
    useState,
    useEffect,
    useId,
    useCallback,
} from 'react'
import Block from '../../Primitives/Block/Block'

import { StepperV2Props, StepperV2StepStatus } from '../stepperV2.types'
import { scheduleLiveRegionAnnouncement } from '../utils'
import { HorizontalStepComponent } from './HorizontalStepComponent'

const HorizontalStepperV2 = forwardRef<HTMLDivElement, StepperV2Props>(
    ({ steps, onStepClick, clickable, ...htmlProps }, ref) => {
        const stepperInstanceId = useId().replace(/:/g, '-')

        const currentExplicitIndex = steps.findIndex(
            (s) => s.status === StepperV2StepStatus.CURRENT
        )
        const derivedIndex =
            currentExplicitIndex >= 0 ? currentExplicitIndex : 0

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

        const handleKeyDown = (
            event: React.KeyboardEvent,
            currentIndex: number
        ) => {
            if (!clickable) return

            let targetIndex: number | null = null
            const lastIndex = steps.length - 1

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
                `Step ${focusedStepIndex + 1}: ${currentStep.title}`
            )
        }, [focusedStepIndex, steps])

        // aria-orientation is not valid on role="group" (callers may still pass div/ARIA props via spread)
        const blockHtmlProps = { ...(htmlProps as Record<string, unknown>) }
        delete blockHtmlProps['aria-orientation']

        return (
            <Block
                data-stepper="stepper"
                ref={ref}
                display="flex"
                width="100%"
                role="group"
                aria-label={`Progress indicator: step ${derivedIndex + 1} of ${steps.length}`}
                aria-roledescription="stepper"
                {...blockHtmlProps}
            >
                {steps.map((step, index) => (
                    <HorizontalStepComponent
                        key={step.id}
                        ref={(el) => {
                            stepRefs.current[index] = el
                        }}
                        step={step}
                        stepIndex={index}
                        isCompleted={index < derivedIndex}
                        isCurrent={index === derivedIndex}
                        isFirst={index === 0}
                        isLast={index === steps.length - 1}
                        onClick={stepClickHandler}
                        clickable={clickable}
                        onKeyDown={handleKeyDown}
                        stepperInstanceId={stepperInstanceId}
                    />
                ))}
            </Block>
        )
    }
)

export default HorizontalStepperV2
