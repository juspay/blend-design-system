import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { StepperV2TokensType } from '../stepperV2.tokens'
import { Check, Lock, ChevronDown } from 'lucide-react'
import Text from '../../Text/Text'
import { toPixels } from '../../../global-utils/GlobalUtils'
import VerticalLineV2 from './VerticalLineV2'
import { FOUNDATION_THEME } from '../../../tokens'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { StepperV2StepProps, StepperV2StepStatus } from '../stepperV2.types'
import Block from '../../Primitives/Block/Block'
import { getStepState } from '../utils'
export const VerticalStepComponent = forwardRef<
    HTMLDivElement,
    StepperV2StepProps & {
        onKeyDown?: (event: React.KeyboardEvent, stepIndex: number) => void
        stepperInstanceId: string
    }
>(
    (
        {
            step,
            stepIndex,
            isCompleted,
            isCurrent,
            isLast,
            onClick,
            onSubstepClick,
            clickable,
            onKeyDown,
            stepperInstanceId,
        },
        ref
    ) => {
        const stepperTokens =
            useResponsiveTokens<StepperV2TokensType>('STEPPERV2')
        const verticalLineRef = useRef<HTMLDivElement>(null)
        const descriptionRef = useRef<HTMLDivElement>(null)
        const [verticalLineHeight, setVerticalLineHeight] = useState<number>(0)
        const [descriptionHeight, setDescriptionHeight] = useState<number>(0)

        const hasSubsteps = !!step?.substeps && step.substeps.length > 0
        const isExpandable = step.isExpandable ?? hasSubsteps
        const [isExpanded, setIsExpanded] = useState<boolean>(
            step.isExpanded ?? hasSubsteps
        )

        useEffect(() => {
            if (verticalLineRef.current || descriptionRef.current) {
                setVerticalLineHeight(
                    verticalLineRef.current?.clientHeight || 0
                )
                setDescriptionHeight(descriptionRef.current?.clientHeight || 0)
            }
            if (step.isExpanded) {
                setIsExpanded(true)
            }
        }, [step.isExpanded])

        const stepState = getStepState(step, isCompleted, isCurrent)
        const isClickable = clickable && !step.disabled && onClick

        const substepRefs = useRef<(HTMLDivElement | null)[]>([])
        const [focusedSubstepIndex, setFocusedSubstepIndex] = useState<
            number | null
        >(null)

        const toggleExpand = () => {
            if (!isExpandable) return
            setIsExpanded((v) => {
                const newExpanded = !v
                if (!newExpanded) {
                    setFocusedSubstepIndex(null)
                }
                return newExpanded
            })
        }

        const handleClick = () => {
            if (isClickable) {
                onClick!(stepIndex)
            }
        }

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (!isClickable) return

            if (
                isExpanded &&
                hasSubsteps &&
                focusedSubstepIndex !== null &&
                step.substeps
            ) {
                switch (event.key) {
                    case 'ArrowDown': {
                        event.preventDefault()
                        const nextSubstepIndex = Math.min(
                            focusedSubstepIndex + 1,
                            step.substeps.length - 1
                        )
                        if (
                            !step.substeps[nextSubstepIndex]?.disabled &&
                            substepRefs.current[nextSubstepIndex]
                        ) {
                            setFocusedSubstepIndex(nextSubstepIndex)
                            substepRefs.current[nextSubstepIndex]?.focus()
                        }
                        return
                    }
                    case 'ArrowUp': {
                        event.preventDefault()
                        const prevSubstepIndex = Math.max(
                            focusedSubstepIndex - 1,
                            0
                        )
                        if (
                            !step.substeps[prevSubstepIndex]?.disabled &&
                            substepRefs.current[prevSubstepIndex]
                        ) {
                            setFocusedSubstepIndex(prevSubstepIndex)
                            substepRefs.current[prevSubstepIndex]?.focus()
                        }
                        return
                    }
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        event.preventDefault()
                        setFocusedSubstepIndex(null)
                        if (ref && typeof ref !== 'function') {
                            ref.current?.focus()
                        }
                        return
                    case 'Enter':
                    case ' ':
                        event.preventDefault()
                        if (
                            onSubstepClick &&
                            step.substeps[focusedSubstepIndex] &&
                            !step.substeps[focusedSubstepIndex].disabled
                        ) {
                            onSubstepClick(stepIndex, focusedSubstepIndex)
                        }
                        return
                }
            }

            switch (event.key) {
                case 'Enter':
                case ' ':
                    event.preventDefault()
                    onClick!(stepIndex)
                    break
                case 'ArrowRight':
                    if (hasSubsteps && !isExpanded) {
                        event.preventDefault()
                        toggleExpand()
                        setTimeout(() => {
                            if (
                                step.substeps &&
                                step.substeps.length > 0 &&
                                !step.substeps[0]?.disabled &&
                                substepRefs.current[0]
                            ) {
                                setFocusedSubstepIndex(0)
                                substepRefs.current[0]?.focus()
                            }
                        }, 100)
                        return
                    }
                    if (hasSubsteps && isExpanded) {
                        event.preventDefault()
                        if (
                            step.substeps &&
                            step.substeps.length > 0 &&
                            !step.substeps[0]?.disabled &&
                            substepRefs.current[0]
                        ) {
                            setFocusedSubstepIndex(0)
                            substepRefs.current[0]?.focus()
                        }
                        return
                    }
                    onKeyDown?.(event, stepIndex)
                    break
                case 'ArrowDown':
                case 'ArrowUp':
                case 'Home':
                case 'End':
                    onKeyDown?.(event, stepIndex)
                    break
            }
        }

        const renderStepIcon = () => {
            if (step.icon) return step.icon

            switch (stepState) {
                case StepperV2StepStatus.COMPLETED:
                    return (
                        <Check
                            size={14}
                            color={
                                stepperTokens.container.step.icon[stepState]
                                    .default.color
                            }
                            aria-hidden="true"
                        />
                    )
                case StepperV2StepStatus.DISABLED:
                    return (
                        <Lock
                            size={14}
                            color={
                                stepperTokens.container.step.icon[stepState]
                                    .default.color
                            }
                            aria-hidden="true"
                        />
                    )
                case StepperV2StepStatus.CURRENT:
                case StepperV2StepStatus.PENDING:
                case StepperV2StepStatus.SKIPPED:
                    return (
                        <Text
                            fontSize={12}
                            fontWeight={500}
                            color={
                                stepperTokens.container.step.icon[stepState]
                                    .default.color
                            }
                            aria-hidden="true"
                        >
                            {stepIndex + 1}
                        </Text>
                    )
                default:
                    return null
            }
        }

        // Generate unique IDs for ARIA relationships
        // Use stepperInstanceId from parent to ensure uniqueness across multiple steppers
        const stepId = `stepper-${stepperInstanceId}-step-${step.id}-${stepIndex}`
        const stepTitleId = `${stepId}-title`
        const stepDescriptionId = step.description
            ? `${stepId}-description`
            : undefined

        // When there's an expand button, we can't nest it inside the step button
        // So we wrap everything in a group and make the step content a separate button
        // The expand button will be a sibling, not a child, so both can be buttons
        const stepContentRole = isClickable ? 'button' : 'group'
        const stepContentTabIndex = isClickable ? 0 : -1

        const clickableStepLabel = isClickable
            ? `Step ${stepIndex + 1} of ${step.title}${
                  stepState === StepperV2StepStatus.COMPLETED
                      ? ', completed'
                      : stepState === StepperV2StepStatus.CURRENT
                        ? ', current'
                        : stepState === StepperV2StepStatus.DISABLED
                          ? ', disabled'
                          : stepState === StepperV2StepStatus.SKIPPED
                            ? ', skipped'
                            : ', pending'
              }`
            : undefined

        return (
            <Block
                data-element="stepper-status"
                data-id={clickableStepLabel}
                data-numeric={step.id}
                height={'100%'}
                display="flex"
                gap={toPixels(stepperTokens.container.gap) + 2}
                role="group"
                aria-current={isCurrent ? 'step' : undefined}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    cursor={isClickable ? 'pointer' : 'default'}
                    onClick={isClickable ? handleClick : undefined}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        role="presentation"
                        paddingY={6}
                    >
                        <Block
                            width={
                                stepperTokens.container.step.circle[stepState]
                                    .default.size
                            }
                            height={
                                stepperTokens.container.step.circle[stepState]
                                    .default.size
                            }
                            backgroundColor={
                                stepperTokens.container.step.circle[stepState]
                                    .default.backgroundColor
                            }
                            border={`${stepperTokens.container.step.circle[stepState].default.borderWidth} solid ${stepperTokens.container.step.circle[stepState].default.borderColor}`}
                            borderRadius={
                                stepperTokens.container.step.circle[stepState]
                                    .default.borderRadius
                            }
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            transition={
                                stepperTokens.container.step.circle[stepState]
                                    .default.transition
                            }
                            role="presentation"
                            _hover={
                                isClickable
                                    ? {
                                          backgroundColor:
                                              stepperTokens.container.step
                                                  .circle[stepState].hover
                                                  .backgroundColor,
                                      }
                                    : undefined
                            }
                            _focus={
                                isClickable
                                    ? {
                                          outline:
                                              stepperTokens.container.step
                                                  .circle[stepState].focus
                                                  .outline,
                                          outlineOffset:
                                              stepperTokens.container.step
                                                  .circle[stepState].focus
                                                  .outlineOffset,
                                      }
                                    : undefined
                            }
                        >
                            {renderStepIcon()}
                        </Block>
                    </Block>
                    <VerticalLineV2
                        color={
                            isLast &&
                            (step.substeps?.length === 0 || !isExpanded)
                                ? 'transparent'
                                : stepperTokens.container.connector.line
                                      .inactive.default.color
                        }
                    />
                    {isExpanded &&
                        step &&
                        step?.substeps &&
                        step?.substeps.length > 0 &&
                        step?.substeps.map((_, index) => (
                            <Block
                                key={index}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Block
                                    paddingY={4}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Block
                                        width={8}
                                        height={8}
                                        border={`1px solid ${FOUNDATION_THEME.colors.primary[500]}`}
                                        borderRadius={'50%'}
                                    />
                                </Block>
                                <VerticalLineV2
                                    ref={verticalLineRef}
                                    color={
                                        step?.substeps?.length === index + 1 &&
                                        isLast
                                            ? 'transparent'
                                            : stepperTokens.container.connector
                                                  .line.inactive.default.color
                                    }
                                />
                            </Block>
                        ))}
                </Block>
                <Block
                    display="flex"
                    flexDirection="column"
                    padding={8}
                    style={{ flex: 1 }}
                >
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        gap={8}
                        alignItems="center"
                    >
                        <Block
                            ref={ref}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            style={{ flex: 1 }}
                            role={stepContentRole}
                            tabIndex={stepContentTabIndex}
                            aria-pressed={
                                isClickable && isCurrent ? 'true' : undefined
                            }
                            aria-disabled={step.disabled ? 'true' : undefined}
                            aria-label={clickableStepLabel}
                            aria-labelledby={stepTitleId}
                            aria-describedby={stepDescriptionId}
                            cursor={isClickable ? 'pointer' : 'default'}
                            onClick={isClickable ? handleClick : undefined}
                            onKeyDown={isClickable ? handleKeyDown : undefined}
                        >
                            <Text
                                id={stepTitleId}
                                truncate={true}
                                fontSize={
                                    stepperTokens.container.title.text[
                                        stepState
                                    ].default.fontSize
                                }
                                fontWeight={
                                    stepperTokens.container.title.text[
                                        stepState
                                    ].default.fontWeight
                                }
                                color={
                                    stepperTokens.container.title.text[
                                        stepState
                                    ].default.color
                                }
                                as="span"
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                }}
                            >
                                {step.title}
                            </Text>
                            {step?.description && (
                                <Block ref={descriptionRef}>
                                    <Text
                                        id={stepDescriptionId}
                                        truncate={true}
                                        fontSize={12}
                                        fontWeight={500}
                                        color={
                                            FOUNDATION_THEME.colors.gray[500]
                                        }
                                        as="span"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {step.description}
                                    </Text>
                                </Block>
                            )}
                        </Block>
                        {isExpandable && (
                            <Block
                                role="button"
                                tabIndex={0}
                                aria-label={
                                    isExpanded
                                        ? `Collapse substeps for ${step.title}`
                                        : `Expand substeps for ${step.title}`
                                }
                                aria-expanded={isExpanded}
                                aria-controls={
                                    step.substeps && step.substeps.length > 0
                                        ? `substeps-${stepId}`
                                        : undefined
                                }
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleExpand()
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        toggleExpand()
                                    }
                                }}
                                flexShrink={0}
                            >
                                <ChevronDown
                                    size={16}
                                    style={{
                                        transform: isExpanded
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',
                                        transition: 'transform 120ms ease',
                                        cursor: 'pointer',
                                    }}
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                    aria-hidden="true"
                                />
                            </Block>
                        )}
                    </Block>

                    {isExpanded &&
                        step &&
                        step?.substeps &&
                        step?.substeps.length > 0 && (
                            <div
                                data-element={`substeps:Step ${stepIndex + 1}`}
                                id={`substeps-${stepId}`}
                                role="group"
                                aria-label={`Substeps for ${step.title}`}
                            >
                                {step.substeps.map((subStep, index) => {
                                    const explicitStatus = subStep.status
                                    const isSubstepCurrent =
                                        explicitStatus ===
                                        StepperV2StepStatus.CURRENT
                                    const isSubstepCompleted =
                                        explicitStatus ===
                                        StepperV2StepStatus.COMPLETED
                                    const isSubstepPending =
                                        explicitStatus ===
                                        StepperV2StepStatus.PENDING
                                    const isSubstepSkipped =
                                        explicitStatus ===
                                        StepperV2StepStatus.SKIPPED
                                    const isSubstepDisabled =
                                        step.disabled || subStep.disabled

                                    let textColor =
                                        FOUNDATION_THEME.colors.gray[500]
                                    if (isSubstepDisabled) {
                                        textColor =
                                            FOUNDATION_THEME.colors.gray[300]
                                    } else if (isSubstepCompleted) {
                                        textColor =
                                            FOUNDATION_THEME.colors.primary[500]
                                    } else if (isSubstepCurrent) {
                                        textColor =
                                            FOUNDATION_THEME.colors.primary[500]
                                    } else if (isSubstepPending) {
                                        textColor =
                                            FOUNDATION_THEME.colors.gray[400]
                                    } else if (isSubstepSkipped) {
                                        textColor =
                                            FOUNDATION_THEME.colors.gray[400]
                                    }

                                    return (
                                        <Block
                                            key={index}
                                            marginTop={
                                                toPixels(verticalLineHeight) +
                                                (index === 0 ? 10 : -2) +
                                                (step?.description &&
                                                index === 0
                                                    ? -(descriptionHeight || 0)
                                                    : 0)
                                            }
                                        >
                                            <Block
                                                data-element="substep"
                                                data-id={`Substep ${index + 1}: ${subStep.title}${
                                                    isSubstepCompleted
                                                        ? ', completed'
                                                        : isSubstepCurrent
                                                          ? ', current'
                                                          : isSubstepDisabled
                                                            ? ', disabled'
                                                            : isSubstepSkipped
                                                              ? ', skipped'
                                                              : ', pending'
                                                }`}
                                                data-numeric={subStep.id}
                                                ref={(el) => {
                                                    substepRefs.current[index] =
                                                        el
                                                }}
                                                role={
                                                    clickable
                                                        ? 'button'
                                                        : 'group'
                                                }
                                                tabIndex={
                                                    clickable &&
                                                    !isSubstepDisabled
                                                        ? 0
                                                        : -1
                                                }
                                                aria-label={`Substep ${index + 1}: ${subStep.title}${
                                                    isSubstepCompleted
                                                        ? ', completed'
                                                        : isSubstepCurrent
                                                          ? ', current'
                                                          : isSubstepDisabled
                                                            ? ', disabled'
                                                            : isSubstepSkipped
                                                              ? ', skipped'
                                                              : ', pending'
                                                }`}
                                                aria-disabled={
                                                    isSubstepDisabled
                                                        ? 'true'
                                                        : undefined
                                                }
                                                aria-current={
                                                    isSubstepCurrent
                                                        ? 'step'
                                                        : undefined
                                                }
                                                style={{
                                                    cursor: clickable
                                                        ? 'pointer'
                                                        : 'default',
                                                }}
                                                onClick={
                                                    clickable && onSubstepClick
                                                        ? (
                                                              e: React.MouseEvent
                                                          ) => {
                                                              e.preventDefault()
                                                              e.stopPropagation()
                                                              onSubstepClick(
                                                                  stepIndex,
                                                                  index
                                                              )
                                                          }
                                                        : undefined
                                                }
                                                onKeyDown={(
                                                    event: React.KeyboardEvent
                                                ) => {
                                                    if (isSubstepDisabled)
                                                        return

                                                    switch (event.key) {
                                                        case 'Enter':
                                                        case ' ': {
                                                            if (
                                                                clickable &&
                                                                onSubstepClick
                                                            ) {
                                                                event.preventDefault()
                                                                event.stopPropagation()
                                                                onSubstepClick(
                                                                    stepIndex,
                                                                    index
                                                                )
                                                            }
                                                            break
                                                        }
                                                        case 'ArrowUp': {
                                                            event.preventDefault()
                                                            const prevIndex =
                                                                Math.max(
                                                                    index - 1,
                                                                    0
                                                                )
                                                            if (
                                                                step.substeps &&
                                                                !step.substeps[
                                                                    prevIndex
                                                                ]?.disabled &&
                                                                substepRefs
                                                                    .current[
                                                                    prevIndex
                                                                ]
                                                            ) {
                                                                setFocusedSubstepIndex(
                                                                    prevIndex
                                                                )
                                                                substepRefs.current[
                                                                    prevIndex
                                                                ]?.focus()
                                                            }
                                                            break
                                                        }
                                                        case 'ArrowDown': {
                                                            event.preventDefault()
                                                            const nextIndex =
                                                                Math.min(
                                                                    index + 1,
                                                                    step.substeps
                                                                        ? step
                                                                              .substeps
                                                                              .length -
                                                                              1
                                                                        : 0
                                                                )
                                                            if (
                                                                step.substeps &&
                                                                !step.substeps[
                                                                    nextIndex
                                                                ]?.disabled &&
                                                                substepRefs
                                                                    .current[
                                                                    nextIndex
                                                                ]
                                                            ) {
                                                                setFocusedSubstepIndex(
                                                                    nextIndex
                                                                )
                                                                substepRefs.current[
                                                                    nextIndex
                                                                ]?.focus()
                                                            }
                                                            break
                                                        }
                                                        case 'ArrowLeft':
                                                        case 'ArrowRight': {
                                                            // Move back to parent step
                                                            event.preventDefault()
                                                            setFocusedSubstepIndex(
                                                                null
                                                            )
                                                            if (
                                                                ref &&
                                                                typeof ref !==
                                                                    'function'
                                                            ) {
                                                                ref.current?.focus()
                                                            }
                                                            break
                                                        }
                                                    }
                                                }}
                                                onFocus={() => {
                                                    setFocusedSubstepIndex(
                                                        index
                                                    )
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
                        )}
                </Block>
            </Block>
        )
    }
)
