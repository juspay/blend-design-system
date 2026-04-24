import type {
    RefObject,
    MutableRefObject,
    MouseEvent,
    KeyboardEvent,
} from 'react'
import type { StepperV2Step } from '../stepperV2.types'
import { StepperV2StepStatus } from '../stepperV2.types'
import type { StepperV2TokensType } from '../stepperV2.tokens'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { buildSubstepRowLabel, getSubstepTextColor } from './stepsHelpers'

type StepsSubstepListProps = {
    step: StepperV2Step
    stepIndex: number
    stepId: string
    stepperTokens: StepperV2TokensType
    verticalLineHeight: number
    descriptionHeight: number
    substepRefs: MutableRefObject<(HTMLDivElement | null)[]>
    setFocusedSubstepIndex: (index: number | null) => void
    stepContentRef: RefObject<HTMLDivElement | null>
    clickable: boolean
    onSubstepClick?: (stepIndex: number, substepIndex: number) => void
}

export function StepsSubstepList({
    step,
    stepIndex,
    stepId,
    stepperTokens,
    verticalLineHeight,
    descriptionHeight,
    substepRefs,
    setFocusedSubstepIndex,
    stepContentRef,
    clickable,
    onSubstepClick,
}: StepsSubstepListProps) {
    if (!step.substeps?.length) return null

    return (
        <div
            data-element={`substeps:Step ${stepIndex + 1}`}
            id={`substeps-${stepId}`}
            role="group"
            aria-label={`Substeps for ${step.title}`}
        >
            {step.substeps.map((subStep, index) => {
                const explicitStatus = subStep.status
                const isSubstepCurrent =
                    explicitStatus === StepperV2StepStatus.CURRENT
                const isSubstepCompleted =
                    explicitStatus === StepperV2StepStatus.COMPLETED
                const isSubstepPending =
                    explicitStatus === StepperV2StepStatus.PENDING
                const isSubstepSkipped =
                    explicitStatus === StepperV2StepStatus.SKIPPED
                const isSubstepDisabled = !!step.disabled || !!subStep.disabled

                const textColor = getSubstepTextColor(stepperTokens, {
                    isSubstepDisabled,
                    isSubstepCompleted,
                    isSubstepCurrent,
                    isSubstepPending,
                    isSubstepSkipped,
                })

                const rowLabel = buildSubstepRowLabel(
                    index,
                    subStep.title,
                    isSubstepCompleted,
                    isSubstepCurrent,
                    isSubstepDisabled,
                    isSubstepSkipped
                )

                return (
                    <Block
                        key={index}
                        marginTop={
                            toPixels(verticalLineHeight) +
                            (index === 0 ? 10 : -2) +
                            (step?.description && index === 0
                                ? -(descriptionHeight || 0)
                                : 0)
                        }
                    >
                        <Block
                            data-element="substep"
                            data-id={rowLabel}
                            data-numeric={subStep.id}
                            ref={(el) => {
                                substepRefs.current[index] = el
                            }}
                            role={clickable ? 'button' : 'group'}
                            tabIndex={clickable && !isSubstepDisabled ? 0 : -1}
                            aria-label={rowLabel}
                            aria-disabled={
                                isSubstepDisabled ? 'true' : undefined
                            }
                            aria-current={isSubstepCurrent ? 'step' : undefined}
                            style={{
                                cursor:
                                    clickable && !isSubstepDisabled
                                        ? 'pointer'
                                        : 'default',
                            }}
                            onClick={
                                clickable &&
                                onSubstepClick &&
                                !isSubstepDisabled
                                    ? (e: MouseEvent) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          onSubstepClick(stepIndex, index)
                                      }
                                    : undefined
                            }
                            onKeyDown={(event: KeyboardEvent) => {
                                if (isSubstepDisabled) return

                                switch (event.key) {
                                    case 'Enter':
                                    case ' ': {
                                        if (clickable && onSubstepClick) {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            onSubstepClick(stepIndex, index)
                                        }
                                        break
                                    }
                                    case 'ArrowUp': {
                                        event.preventDefault()
                                        const prevIndex = Math.max(index - 1, 0)
                                        if (
                                            step.substeps &&
                                            !step.substeps[prevIndex]
                                                ?.disabled &&
                                            substepRefs.current[prevIndex]
                                        ) {
                                            setFocusedSubstepIndex(prevIndex)
                                            substepRefs.current[
                                                prevIndex
                                            ]?.focus()
                                        }
                                        break
                                    }
                                    case 'ArrowDown': {
                                        event.preventDefault()
                                        const nextIndex = Math.min(
                                            index + 1,
                                            step.substeps
                                                ? step.substeps.length - 1
                                                : 0
                                        )
                                        if (
                                            step.substeps &&
                                            !step.substeps[nextIndex]
                                                ?.disabled &&
                                            substepRefs.current[nextIndex]
                                        ) {
                                            setFocusedSubstepIndex(nextIndex)
                                            substepRefs.current[
                                                nextIndex
                                            ]?.focus()
                                        }
                                        break
                                    }
                                    case 'ArrowLeft':
                                    case 'ArrowRight': {
                                        event.preventDefault()
                                        setFocusedSubstepIndex(null)
                                        stepContentRef.current?.focus()
                                        break
                                    }
                                }
                            }}
                            onFocus={() => {
                                setFocusedSubstepIndex(index)
                            }}
                        >
                            <Text
                                fontSize={12}
                                fontWeight={500}
                                color={textColor}
                            >
                                {subStep.title}
                            </Text>
                        </Block>
                    </Block>
                )
            })}
        </div>
    )
}
