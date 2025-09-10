import { forwardRef, useCallback } from 'react'
import { Check, InfoIcon, Lock } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { StepperProps, StepProps } from './types'
import { StepState } from './types'
import StepperLine from './StepperLine'
import { Tooltip } from '../Tooltip'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { StepperTokensType } from './stepper.tokens'

const StepComponent = forwardRef<HTMLDivElement, StepProps>(
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
                if (
                    isClickable &&
                    (event.key === 'Enter' || event.key === ' ')
                ) {
                    event.preventDefault()
                    onClick!(stepIndex)
                }
            },
            [isClickable, onClick, stepIndex]
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

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection="column"
                gap={stepperTokens.container.default.gap}
                role="button"
                tabIndex={isClickable ? 0 : -1}
                aria-current={isCurrent ? 'step' : undefined}
                aria-pressed={isCurrent ? 'true' : 'false'}
                aria-disabled={step.disabled}
                aria-label={`Step ${stepIndex + 1} of ${step.title}${
                    stepState === StepState.COMPLETED
                        ? ', completed'
                        : stepState === StepState.CURRENT
                          ? ', current'
                          : stepState === StepState.DISABLED
                            ? ', disabled'
                            : ', pending'
                }`}
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
                        aria-hidden="true"
                    >
                        {step.title}
                    </Text>
                    {step.tooltipContent && (
                        <Tooltip content={step.tooltipContent}>
                            <InfoIcon
                                size={12}
                                color={
                                    stepperTokens.title.text[stepState].default
                                        .color
                                }
                                aria-label="Additional information"
                            />
                        </Tooltip>
                    )}
                </Block>
            </Block>
        )
    }
)

StepComponent.displayName = 'StepComponent'

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
    (
        { steps, currentStep, onStepChange, clickable = false, ...htmlProps },
        ref
    ) => {
        const handleStepClick = useCallback(
            (stepIndex: number) => {
                if (onStepChange) {
                    onStepChange(stepIndex)
                }
            },
            [onStepChange]
        )

        return (
            <Block
                ref={ref}
                display="flex"
                width="100%"
                role="group"
                aria-label={`Progress indicator: step ${currentStep + 1} of ${steps.length}`}
                aria-orientation="horizontal"
                {...htmlProps}
            >
                {steps.map((step, index) => (
                    <StepComponent
                        key={step.id}
                        step={step}
                        stepIndex={index}
                        isCompleted={index < currentStep}
                        isCurrent={index === currentStep}
                        isFirst={index === 0}
                        isLast={index === steps.length - 1}
                        onClick={handleStepClick}
                        clickable={clickable}
                    />
                ))}
            </Block>
        )
    }
)

Stepper.displayName = 'Stepper'

export default Stepper
