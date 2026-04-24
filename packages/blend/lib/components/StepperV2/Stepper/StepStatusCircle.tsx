import type { ReactNode } from 'react'
import type { StepperV2TokensType } from '../stepperV2.tokens'
import type { StepperV2StepStatus } from '../stepperV2.types'
import Block from '../../Primitives/Block/Block'

type StepStatusCircleProps = {
    stepState: StepperV2StepStatus
    stepperTokens: StepperV2TokensType
    isClickable: boolean
    children: ReactNode
}

export function StepStatusCircle({
    stepState,
    stepperTokens,
    isClickable,
    children,
}: StepStatusCircleProps) {
    return (
        <Block
            width={stepperTokens.container.step.circle[stepState].default.size}
            height={stepperTokens.container.step.circle[stepState].default.size}
            backgroundColor={
                stepperTokens.container.step.circle[stepState].default
                    .backgroundColor
            }
            border={`${stepperTokens.container.step.circle[stepState].default.borderWidth} solid ${stepperTokens.container.step.circle[stepState].default.borderColor}`}
            borderRadius={
                stepperTokens.container.step.circle[stepState].default
                    .borderRadius
            }
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            transition={
                stepperTokens.container.step.circle[stepState].default
                    .transition
            }
            role="presentation"
            _hover={
                isClickable
                    ? {
                          backgroundColor:
                              stepperTokens.container.step.circle[stepState]
                                  .hover.backgroundColor,
                      }
                    : undefined
            }
        >
            {children}
        </Block>
    )
}
