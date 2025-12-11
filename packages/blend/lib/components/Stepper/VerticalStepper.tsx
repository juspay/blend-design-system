import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    useId,
} from 'react'
import { StepperProps, StepProps, StepState } from './types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { StepperTokensType } from './stepper.tokens'
import { Check, Lock, ChevronDown } from 'lucide-react'
import Text from '../Text/Text'
import { toPixels } from '../../global-utils/GlobalUtils'
import VerticalLine from './VerticalLine'
import { FOUNDATION_THEME } from '../../tokens'

const StepComponent = forwardRef<
    HTMLDivElement,
    StepProps & {
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
        const stepperTokens = useResponsiveTokens<StepperTokensType>('STEPPER')
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
        }, [verticalLineRef, descriptionRef, step.isExpanded])

        const getStepState = (): StepState => {
            if (step.disabled) return StepState.DISABLED
            if (step.status) return step.status
            if (isCompleted) return StepState.COMPLETED
            if (isCurrent) return StepState.CURRENT
            return StepState.PENDING
        }

        const stepState = getStepState()
        const isClickable = clickable && !step.disabled && onClick

        const substepRefs = useRef<(HTMLDivElement | null)[]>([])
        const [focusedSubstepIndex, setFocusedSubstepIndex] = useState<
            number | null
        >(null)

        const toggleExpand = useCallback(() => {
            if (isExpandable) {
                setIsExpanded((v) => {
                    const newExpanded = !v
                    // Reset substep focus when collapsing
                    if (!newExpanded) {
                        setFocusedSubstepIndex(null)
                    }
                    return newExpanded
                })
            }
        }, [isExpandable])

        const handleClick = useCallback(() => {
            if (isClickable) {
                onClick!(stepIndex)
            }
        }, [isClickable, onClick, stepIndex])

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent) => {
                if (!isClickable) return

                // If we're in substep navigation mode
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
                            // Move back to parent step
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

                // Main step navigation
                switch (event.key) {
                    case 'Enter':
                    case ' ':
                        event.preventDefault()
                        onClick!(stepIndex)
                        break
                    case 'ArrowRight':
                        // Move into substeps if available
                        if (hasSubsteps && !isExpanded) {
                            event.preventDefault()
                            toggleExpand()
                            // Focus first substep after expansion
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
                        } else if (hasSubsteps && isExpanded) {
                            // Move to first substep
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
                        // Fall through to parent navigation
                        if (onKeyDown) {
                            onKeyDown(event, stepIndex)
                        }
                        break
                    case 'ArrowDown':
                    case 'ArrowUp':
                    case 'Home':
                    case 'End':
                        // Navigation handled by parent component
                        if (onKeyDown) {
                            onKeyDown(event, stepIndex)
                        }
                        break
                }
            },
            [
                isClickable,
                onClick,
                stepIndex,
                onKeyDown,
                isExpanded,
                hasSubsteps,
                focusedSubstepIndex,
                step.substeps,
                onSubstepClick,
                toggleExpand,
                ref,
            ]
        )

        const renderStepIcon = () => {
            if (step.icon) return step.icon

            switch (stepState) {
                case StepState.COMPLETED:
                    return (
                        <Check
                            size={14}
                            color={
                                stepperTokens.step.icon[stepState].default.color
                            }
                            aria-hidden="true"
                        />
                    )
                case StepState.DISABLED:
                    return (
                        <Lock
                            size={14}
                            color={
                                stepperTokens.step.icon[stepState].default.color
                            }
                            aria-hidden="true"
                        />
                    )
                case StepState.CURRENT:
                case StepState.PENDING:
                case StepState.SKIPPED:
                    return (
                        <Text
                            fontSize={12}
                            fontWeight={500}
                            color={
                                stepperTokens.step.icon[stepState].default.color
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

        return (
            <Block
                ref={ref}
                height={'100%'}
                display="flex"
                gap={toPixels(stepperTokens.container.default.gap) + 2}
                role="group"
                aria-current={isCurrent ? 'step' : undefined}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
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
                                stepperTokens.step.circle[stepState].default
                                    .size
                            }
                            height={
                                stepperTokens.step.circle[stepState].default
                                    .size
                            }
                            backgroundColor={
                                stepperTokens.step.circle[stepState].default
                                    .backgroundColor
                            }
                            border={`${stepperTokens.step.circle[stepState].default.borderWidth} solid ${stepperTokens.step.circle[stepState].default.borderColor}`}
                            borderRadius={
                                stepperTokens.step.circle[stepState].default
                                    .borderRadius
                            }
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            transition={
                                stepperTokens.step.circle[stepState].default
                                    .transition
                            }
                            role="presentation"
                            _hover={
                                isClickable
                                    ? {
                                          backgroundColor:
                                              stepperTokens.step.circle[
                                                  stepState
                                              ].hover.backgroundColor,
                                      }
                                    : undefined
                            }
                            _focus={
                                isClickable
                                    ? {
                                          outline:
                                              stepperTokens.step.circle[
                                                  stepState
                                              ].focus.outline,
                                          outlineOffset:
                                              stepperTokens.step.circle[
                                                  stepState
                                              ].focus.outlineOffset,
                                      }
                                    : undefined
                            }
                        >
                            {renderStepIcon()}
                        </Block>
                    </Block>
                    <VerticalLine
                        color={
                            isLast &&
                            (step.substeps?.length === 0 || !isExpanded)
                                ? 'transparent'
                                : stepperTokens.connector.line.inactive.default
                                      .color
                        }
                    />
                    {isExpanded &&
                        step &&
                        step?.substeps &&
                        step?.substeps.length > 0 &&
                        step?.substeps.map((_, index) => (
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Block
                                    key={index}
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
                                <VerticalLine
                                    ref={verticalLineRef}
                                    color={
                                        step?.substeps?.length === index + 1 &&
                                        isLast
                                            ? 'transparent'
                                            : stepperTokens.connector.line
                                                  .inactive.default.color
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
                        alignItems="flex-start"
                    >
                        <Block
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
                            aria-label={
                                isClickable
                                    ? `Step ${stepIndex + 1} of ${step.title}${
                                          stepState === StepState.COMPLETED
                                              ? ', completed'
                                              : stepState === StepState.CURRENT
                                                ? ', current'
                                                : stepState ===
                                                    StepState.DISABLED
                                                  ? ', disabled'
                                                  : stepState ===
                                                      StepState.SKIPPED
                                                    ? ', skipped'
                                                    : ', pending'
                                      }`
                                    : undefined
                            }
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
                                    stepperTokens.title.text[stepState].default
                                        .fontSize
                                }
                                fontWeight={
                                    stepperTokens.title.text[stepState].default
                                        .fontWeight
                                }
                                color={
                                    stepperTokens.title.text[stepState].default
                                        .color
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
                                id={`substeps-${stepId}`}
                                role="group"
                                aria-label={`Substeps for ${step.title}`}
                            >
                                {step.substeps.map((subStep, index) => {
                                    const explicitStatus = subStep.status
                                    const isSubstepCurrent =
                                        explicitStatus === StepState.CURRENT
                                    const isSubstepCompleted =
                                        explicitStatus === StepState.COMPLETED
                                    const isSubstepPending =
                                        explicitStatus === StepState.PENDING
                                    const isSubstepSkipped =
                                        explicitStatus === StepState.SKIPPED
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

const VerticalStepper = forwardRef<HTMLDivElement, StepperProps>(
    ({ steps, onStepClick, onSubstepClick, clickable, ...htmlProps }, ref) => {
        // Generate unique ID for this stepper instance to avoid duplicate IDs across multiple steppers
        const stepperInstanceId = useId().replace(/:/g, '-')

        const [focusedStepIndex, setFocusedStepIndex] = useState<number | null>(
            null
        )
        const stepRefs = useRef<(HTMLDivElement | null)[]>([])

        const handleStepClick = useCallback(
            (stepIndex: number) => {
                if (onStepClick) {
                    onStepClick(stepIndex)
                }
            },
            [onStepClick]
        )

        const derivedIndex = (() => {
            const explicit = steps.findIndex(
                (s) => s.status === StepState.CURRENT
            )
            if (explicit >= 0) return explicit

            return 0
        })()

        // Handle arrow key navigation
        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent, currentIndex: number) => {
                if (!clickable) return

                let targetIndex: number | null = null

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        targetIndex = Math.min(
                            currentIndex + 1,
                            steps.length - 1
                        )
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
                        targetIndex = steps.length - 1
                        break
                }

                if (targetIndex !== null) {
                    const targetStep = steps[targetIndex]
                    if (!targetStep.disabled && stepRefs.current[targetIndex]) {
                        setFocusedStepIndex(targetIndex)
                        stepRefs.current[targetIndex]?.focus()
                    }
                }
            },
            [clickable, steps]
        )

        // Screen reader announcement for step changes
        useEffect(() => {
            if (focusedStepIndex !== null) {
                const currentStep = steps[focusedStepIndex]
                if (currentStep && !currentStep.disabled) {
                    const announcement = document.createElement('div')
                    announcement.setAttribute('role', 'status')
                    announcement.setAttribute('aria-live', 'polite')
                    announcement.setAttribute('aria-atomic', 'true')
                    announcement.style.position = 'absolute'
                    announcement.style.left = '-10000px'
                    announcement.style.width = '1px'
                    announcement.style.height = '1px'
                    announcement.style.overflow = 'hidden'
                    announcement.textContent = `Step ${focusedStepIndex + 1}: ${currentStep.title}`
                    document.body.appendChild(announcement)

                    const timer = setTimeout(() => {
                        if (document.body.contains(announcement)) {
                            document.body.removeChild(announcement)
                        }
                    }, 1000)

                    return () => {
                        clearTimeout(timer)
                        if (document.body.contains(announcement)) {
                            document.body.removeChild(announcement)
                        }
                    }
                }
            }
        }, [focusedStepIndex, steps])

        // Filter out aria-orientation as it's not valid for role="group"
        const filteredHtmlProps = { ...htmlProps } as Record<string, unknown>
        delete filteredHtmlProps['aria-orientation']

        return (
            <Block
                ref={ref}
                height={'100%'}
                display="flex"
                flexDirection="column"
                role="group"
                aria-label={`Progress indicator: step ${derivedIndex + 1} of ${steps.length}`}
                aria-roledescription="stepper"
                {...filteredHtmlProps}
            >
                {steps.map((step, index) => (
                    <StepComponent
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
                        onClick={handleStepClick}
                        onSubstepClick={
                            onSubstepClick
                                ? (stepIdx, subIdx) =>
                                      onSubstepClick(
                                          steps[stepIdx].id,
                                          subIdx + 1
                                      )
                                : undefined
                        }
                        clickable={clickable}
                        onKeyDown={handleKeyDown}
                        stepperInstanceId={stepperInstanceId}
                    />
                ))}
            </Block>
        )
    }
)

export default VerticalStepper
