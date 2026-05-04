import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { StepperV2TokensType } from '../stepperV2.tokens'
import { Check, Lock, ChevronDown } from 'lucide-react'
import Text from '../../Text/Text'
import { composeRefs, toPixels } from '../../../global-utils/GlobalUtils'
import VerticalLineV2 from './VerticalLineV2'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import {
    StepperV2StepProps,
    StepperV2StepStatus,
    StepperV2Type,
} from '../stepperV2.types'
import Block from '../../Primitives/Block/Block'
import { getStepState } from '../utils'
import { StepStatusCircle } from './StepStatusCircle'
import { StepsHorizontalBody } from './StepsHorizontalBody'
import { StepsVerticalSubstepRails } from './StepsVerticalSubstepRails'
import { StepsSubstepList } from './StepsSubstepList'

export const Steps = forwardRef<
    HTMLDivElement,
    StepperV2StepProps & {
        onKeyDown?: (event: React.KeyboardEvent, stepIndex: number) => void
        stepperInstanceId: string
        stepperType: StepperV2Type
        stepsLength: number
    }
>(
    (
        {
            step,
            stepIndex,
            stepsLength,
            isCompleted,
            isCurrent,
            isLast,
            onClick,
            onSubstepClick,
            clickable,
            onKeyDown,
            stepperInstanceId,
            stepperType,
        },
        ref
    ) => {
        const isHorizontal = stepperType === StepperV2Type.HORIZONTAL

        const stepperTokens =
            useResponsiveTokens<StepperV2TokensType>('STEPPERV2')
        const verticalLineRef = useRef<HTMLDivElement>(null)
        const descriptionRef = useRef<HTMLDivElement>(null)
        const stepContentRef = useRef<HTMLDivElement | null>(null)
        const setStepContentRef = useMemo(
            () => composeRefs(stepContentRef, ref),
            [ref]
        )
        const [verticalLineHeight, setVerticalLineHeight] = useState<number>(0)
        const [descriptionHeight, setDescriptionHeight] = useState<number>(0)

        const hasSubsteps = !!step?.substeps && step.substeps.length > 0
        const isExpandable = step.isExpandable ?? hasSubsteps
        const [isExpanded, setIsExpanded] = useState<boolean>(
            step.isExpanded ?? hasSubsteps
        )

        useEffect(() => {
            if (step.isExpanded !== undefined) {
                setIsExpanded(step.isExpanded)
            }
        }, [step.isExpanded])

        useEffect(() => {
            if (!isExpanded) {
                setVerticalLineHeight(0)
                setDescriptionHeight(0)
                return
            }
            const animationFrameId = requestAnimationFrame(() => {
                setVerticalLineHeight(
                    verticalLineRef.current?.clientHeight || 0
                )
                setDescriptionHeight(descriptionRef.current?.clientHeight || 0)
            })
            return () => cancelAnimationFrame(animationFrameId)
        }, [isExpanded, hasSubsteps, step.substeps?.length])

        const stepState = getStepState(step, isCompleted, isCurrent)
        const isClickable = Boolean(clickable && !step.disabled && onClick)

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

        const focusFirstSubstep = () => {
            if (
                step.substeps &&
                step.substeps.length > 0 &&
                !step.substeps[0]?.disabled &&
                substepRefs.current[0]
            ) {
                setFocusedSubstepIndex(0)
                substepRefs.current[0]?.focus()
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
                        stepContentRef.current?.focus()
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
                    // Substep navigation only applies in vertical mode
                    if (!isHorizontal && hasSubsteps && !isExpanded) {
                        event.preventDefault()
                        toggleExpand()
                        setTimeout(() => focusFirstSubstep(), 100)
                        return
                    }
                    if (!isHorizontal && hasSubsteps && isExpanded) {
                        event.preventDefault()
                        focusFirstSubstep()
                        return
                    }
                    onKeyDown?.(event, stepIndex)
                    break
                case 'ArrowLeft':
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

        const stepId = `stepper-${stepperInstanceId}-step-${step.id}-${stepIndex}`
        const stepTitleId = `${stepId}-title`
        const stepDescriptionId = step.description
            ? `${stepId}-description`
            : undefined

        const stepContentRole = isClickable ? 'button' : 'group'
        const stepContentTabIndex = isClickable ? 0 : -1

        const clickableStepLabel = isClickable
            ? `Step ${stepIndex + 1} of ${stepsLength}: ${step.title}${
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

        const stepIcon = renderStepIcon()

        if (isHorizontal) {
            return (
                <Block
                    ref={ref}
                    data-element="stepper-status"
                    data-id={clickableStepLabel}
                    data-numeric={step.id}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    gap={stepperTokens.container.gap}
                    role={isClickable ? 'button' : 'group'}
                    tabIndex={isClickable ? 0 : -1}
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-pressed={isClickable && isCurrent ? 'true' : undefined}
                    aria-disabled={step.disabled ? 'true' : undefined}
                    aria-label={clickableStepLabel}
                    id={stepId}
                    cursor={isClickable ? 'pointer' : 'default'}
                    onClick={isClickable ? handleClick : undefined}
                    onKeyDown={isClickable ? handleKeyDown : undefined}
                >
                    <StepsHorizontalBody
                        step={step}
                        stepIndex={stepIndex}
                        stepsLength={stepsLength}
                        stepState={stepState}
                        stepTitleId={stepTitleId}
                        stepperTokens={stepperTokens}
                        stepIcon={stepIcon}
                        isClickable={isClickable}
                    />
                </Block>
            )
        }

        return (
            <Block
                data-element="stepper-status"
                data-id={clickableStepLabel}
                data-numeric={step.id}
                height={'100%'}
                width="auto"
                justifyContent="flex-start"
                display="flex"
                gap={toPixels(stepperTokens.container.gap) + 2}
                role="group"
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    cursor={isClickable ? 'pointer' : 'default'}
                    onClick={isClickable ? handleClick : undefined}
                    width="auto"
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        role="presentation"
                        paddingY={
                            stepperTokens.container.step.circle[stepState]
                                .default.paddingTop
                        }
                        width="auto"
                    >
                        <StepStatusCircle
                            stepState={stepState}
                            stepperTokens={stepperTokens}
                            isClickable={isClickable}
                        >
                            {stepIcon}
                        </StepStatusCircle>
                    </Block>
                    <VerticalLineV2
                        color={
                            isLast &&
                            (step.substeps?.length === 0 || !isExpanded)
                                ? 'transparent'
                                : stepperTokens.container.connector.line.color
                        }
                    />
                    <StepsVerticalSubstepRails
                        step={step}
                        isLast={isLast}
                        isExpanded={isExpanded}
                        stepperTokens={stepperTokens}
                        verticalLineRef={verticalLineRef}
                    />
                </Block>
                <Block
                    display="flex"
                    flexDirection="column"
                    paddingTop={
                        stepperTokens.container.title.text[stepState].default
                            .paddingTop
                    }
                    paddingRight={
                        stepperTokens.container.title.text[stepState].default
                            .paddingRight
                    }
                    paddingBottom={
                        stepperTokens.container.title.text[stepState].default
                            .paddingBottom
                    }
                    paddingLeft={
                        stepperTokens.container.title.text[stepState].default
                            .paddingLeft
                    }
                    style={{ flex: 1 }}
                >
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        gap={
                            stepperTokens.container.title.text[stepState]
                                .default.gap
                        }
                        alignItems="center"
                    >
                        <Block
                            ref={setStepContentRef}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            style={{ flex: 1 }}
                            role={stepContentRole}
                            tabIndex={stepContentTabIndex}
                            aria-current={isCurrent ? 'step' : undefined}
                            aria-pressed={
                                isClickable && isCurrent ? 'true' : undefined
                            }
                            aria-disabled={step.disabled ? 'true' : undefined}
                            aria-label={clickableStepLabel}
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
                                        fontSize={
                                            stepperTokens.container.description
                                                .text.fontSize
                                        }
                                        fontWeight={
                                            stepperTokens.container.description
                                                .text.fontWeight
                                        }
                                        color={
                                            stepperTokens.container.description
                                                .text.color
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
                                    size={
                                        stepperTokens.container.subConnector
                                            .expander.width
                                    }
                                    style={{
                                        transform: isExpanded
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',
                                        transition: 'transform 120ms ease',
                                        cursor: 'pointer',
                                    }}
                                    color={
                                        stepperTokens.container.subConnector
                                            .expander.icon.color
                                    }
                                    aria-hidden="true"
                                />
                            </Block>
                        )}
                    </Block>

                    {isExpanded &&
                        step?.substeps &&
                        step.substeps.length > 0 && (
                            <StepsSubstepList
                                step={step}
                                stepIndex={stepIndex}
                                stepId={stepId}
                                stepperTokens={stepperTokens}
                                verticalLineHeight={verticalLineHeight}
                                descriptionHeight={descriptionHeight}
                                substepRefs={substepRefs}
                                setFocusedSubstepIndex={setFocusedSubstepIndex}
                                stepContentRef={stepContentRef}
                                clickable={!!clickable}
                                onSubstepClick={onSubstepClick}
                            />
                        )}
                </Block>
            </Block>
        )
    }
)

Steps.displayName = 'Steps'
