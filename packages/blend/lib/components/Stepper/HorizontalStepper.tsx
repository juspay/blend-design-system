import React, {
    forwardRef,
    useCallback,
    useRef,
    useState,
    useEffect,
    useId,
} from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import StepperLine from './StepperLine'
import { Check, InfoIcon, Lock } from 'lucide-react'
import { StepperProps, StepProps, StepState } from './types'
import { StepperTokensType } from './stepper.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tooltip } from '../Tooltip'

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
            isFirst,
            isLast,
            onClick,
            clickable,
            onKeyDown,
            stepperInstanceId,
        },
        ref
    ) => {
        const stepperTokens = useResponsiveTokens<StepperTokensType>('STEPPER')

        const getStepState = (): StepState => {
            if (step.disabled) return StepState.DISABLED
            if (step.status) return step.status
            if (isCompleted) return StepState.COMPLETED
            if (isCurrent) return StepState.CURRENT
            return StepState.PENDING
        }

        const stepState = getStepState()
        const isClickable = clickable && !step.disabled && onClick

        const handleClick = useCallback(() => {
            if (isClickable) {
                onClick!(stepIndex)
            }
        }, [isClickable, onClick, stepIndex])

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent) => {
                if (!isClickable) return

                switch (event.key) {
                    case 'Enter':
                    case ' ':
                        event.preventDefault()
                        onClick!(stepIndex)
                        break
                    case 'ArrowRight':
                    case 'ArrowLeft':
                    case 'Home':
                    case 'End':
                        // Navigation handled by parent component
                        if (onKeyDown) {
                            onKeyDown(event, stepIndex)
                        }
                        break
                }
            },
            [isClickable, onClick, stepIndex, onKeyDown]
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
        const stepStatus = isClickable
            ? `Step ${stepIndex + 1} of ${step.title}${
                  stepState === StepState.COMPLETED
                      ? ', completed'
                      : stepState === StepState.CURRENT
                        ? ', current'
                        : stepState === StepState.DISABLED
                          ? ', disabled'
                          : stepState === StepState.SKIPPED
                            ? ', skipped'
                            : ', pending'
              }`
            : undefined

        return (
            <Block
                data-element="stepper-status"
                data-id={stepStatus}
                data-numeric={step.id}
                ref={ref}
                width="100%"
                display="flex"
                flexDirection="column"
                gap={stepperTokens.container.default.gap}
                role={isClickable ? 'button' : 'group'}
                tabIndex={isClickable ? 0 : -1}
                aria-current={isCurrent ? 'step' : undefined}
                aria-pressed={isClickable && isCurrent ? 'true' : undefined}
                aria-disabled={step.disabled ? 'true' : undefined}
                aria-label={
                    isClickable
                        ? `Step ${stepIndex + 1} of ${step.title}${
                              stepState === StepState.COMPLETED
                                  ? ', completed'
                                  : stepState === StepState.CURRENT
                                    ? ', current'
                                    : stepState === StepState.DISABLED
                                      ? ', disabled'
                                      : stepState === StepState.SKIPPED
                                        ? ', skipped'
                                        : ', pending'
                          }`
                        : undefined
                }
                aria-labelledby={stepTitleId}
                aria-describedby={stepDescriptionId}
                id={stepId}
                cursor={isClickable ? 'pointer' : 'default'}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    role="presentation"
                >
                    <StepperLine
                        color={
                            isFirst
                                ? 'transparent'
                                : stepperTokens.connector.line.inactive.default
                                      .color
                        }
                    />
                    <Block
                        width={
                            stepperTokens.step.circle[stepState].default.size
                        }
                        height={
                            stepperTokens.step.circle[stepState].default.size
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
                                          stepperTokens.step.circle[stepState]
                                              .hover.backgroundColor,
                                  }
                                : undefined
                        }
                        _focus={
                            isClickable
                                ? {
                                      outline:
                                          stepperTokens.step.circle[stepState]
                                              .focus.outline,
                                      outlineOffset:
                                          stepperTokens.step.circle[stepState]
                                              .focus.outlineOffset,
                                  }
                                : undefined
                        }
                    >
                        {renderStepIcon()}
                    </Block>

                    <StepperLine
                        color={
                            isLast
                                ? 'transparent'
                                : stepperTokens.connector.line.inactive.default
                                      .color
                        }
                    />
                </Block>
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={stepperTokens.title.text[stepState].default.gap}
                    role="presentation"
                >
                    <Text
                        id={stepTitleId}
                        truncate={true}
                        fontSize={
                            stepperTokens.title.text[stepState].default.fontSize
                        }
                        fontWeight={
                            stepperTokens.title.text[stepState].default
                                .fontWeight
                        }
                        color={
                            stepperTokens.title.text[stepState].default.color
                        }
                        as="span"
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            paddingInline: '8px',
                            textAlign: 'center',
                        }}
                    >
                        {step.title}
                    </Text>
                    {step?.description && (
                        <>
                            <span
                                id={stepDescriptionId}
                                className="sr-only"
                                style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    padding: 0,
                                    margin: '-1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0, 0, 0, 0)',
                                    whiteSpace: 'nowrap',
                                    borderWidth: 0,
                                }}
                            >
                                {step.description}
                            </span>
                            <Tooltip content={step.description}>
                                <InfoIcon
                                    style={{ flexShrink: 0, cursor: 'pointer' }}
                                    size={12}
                                    color={
                                        stepperTokens.title.text[stepState]
                                            .default.color
                                    }
                                    aria-label={`Additional information: ${step.description}`}
                                    aria-describedby={stepDescriptionId}
                                />
                            </Tooltip>
                        </>
                    )}
                </Block>
            </Block>
        )
    }
)

const HorizontalStepper = forwardRef<HTMLDivElement, StepperProps>(
    ({ steps, onStepClick, clickable, ...htmlProps }, ref) => {
        // Generate unique ID for this stepper instance to avoid duplicate IDs across multiple steppers
        const stepperInstanceId = useId().replace(/:/g, '-')

        const derivedIndex = (() => {
            const explicit = steps.findIndex(
                (s) => s.status === StepState.CURRENT
            )
            if (explicit >= 0) return explicit
            return 0
        })()

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

        // Handle arrow key navigation
        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent, currentIndex: number) => {
                if (!clickable) return

                let targetIndex: number | null = null

                switch (event.key) {
                    case 'ArrowRight':
                        event.preventDefault()
                        targetIndex = Math.min(
                            currentIndex + 1,
                            steps.length - 1
                        )
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
                data-stepper="stepper"
                ref={ref}
                display="flex"
                width="100%"
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
                        clickable={clickable}
                        onKeyDown={handleKeyDown}
                        stepperInstanceId={stepperInstanceId}
                    />
                ))}
            </Block>
        )
    }
)

export default HorizontalStepper
