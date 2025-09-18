import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { StepperProps, StepProps, StepState } from './types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { StepperTokensType } from './stepper.tokens'
import { Check, Lock, ChevronDown } from 'lucide-react'
import Text from '../Text/Text'
import { toPixels } from '../../global-utils/GlobalUtils'
import VerticalLine from './VerticalLine'
import { FOUNDATION_THEME } from '../../tokens'

const StepComponent = forwardRef<HTMLDivElement, StepProps>(
    (
        { step, stepIndex, isCompleted, isCurrent, isLast, onClick, clickable },
        ref
    ) => {
        const stepperTokens = useResponsiveTokens<StepperTokensType>('STEPPER')
        const verticalLineRef = useRef<HTMLDivElement>(null)
        const descriptionRef = useRef<HTMLDivElement>(null)
        const [verticalLineHeight, setVerticalLineHeight] = useState<number>(0)
        const [descriptionHeight, setDescriptionHeight] = useState<number>(0)

        useEffect(() => {
            if (verticalLineRef.current && descriptionRef.current) {
                setVerticalLineHeight(verticalLineRef.current?.clientHeight)
                setDescriptionHeight(descriptionRef.current?.clientHeight)
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

        const hasSubsteps = !!step?.substeps && step.substeps.length > 0
        const isExpandable = step.isExpandable ?? hasSubsteps
        const [isExpanded, setIsExpanded] = useState<boolean>(
            step.isExpanded ?? hasSubsteps
        )

        const toggleExpand = useCallback(() => {
            if (isExpandable) setIsExpanded((v) => !v)
        }, [isExpandable])

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
                height={'100%'}
                display="flex"
                gap={toPixels(stepperTokens.container.default.gap) + 2}
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
                <Block display="flex" flexDirection="column" padding={8}>
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        gap={8}
                    >
                        <Block display="flex" flexDirection="column" gap={2}>
                            <Text
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
                                aria-hidden="true"
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
                                        truncate={true}
                                        fontSize={12}
                                        fontWeight={500}
                                        color={
                                            FOUNDATION_THEME.colors.gray[500]
                                        }
                                        aria-hidden="true"
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
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                aria-expanded={isExpanded}
                                onClick={toggleExpand}
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
                                />
                            </Block>
                        )}
                    </Block>

                    {isExpanded &&
                        step &&
                        step?.substeps &&
                        step?.substeps.length > 0 &&
                        step?.substeps.map((subStep, index) => (
                            <Block
                                key={index}
                                marginTop={
                                    toPixels(verticalLineHeight) +
                                    (index === 0 ? 10 : -2) +
                                    (step?.description && index === 0
                                        ? -(descriptionHeight ?? 0)
                                        : 0)
                                }
                            >
                                <Text
                                    fontSize={12}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[500]}
                                >
                                    {subStep.title}
                                </Text>
                            </Block>
                        ))}
                </Block>
            </Block>
        )
    }
)

const VerticalStepper = forwardRef<HTMLDivElement, StepperProps>(
    ({ steps, currentStep, onStepChange, clickable, ...htmlProps }, ref) => {
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
                height={'100%'}
                display="flex"
                flexDirection="column"
                role="group"
                aria-label={`Progress indicator: step ${currentStep + 1} of ${steps.length}`}
                aria-orientation="vertical"
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

export default VerticalStepper
