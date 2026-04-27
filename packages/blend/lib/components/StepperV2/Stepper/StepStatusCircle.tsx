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
    const circleTokens = stepperTokens.container.step.circle[stepState]
    const getCircleStateStyles = (
        circleState: (typeof circleTokens)['default']
    ) => ({
        backgroundColor: circleState.backgroundColor,
        border: `${circleState.borderWidth} solid ${circleState.borderColor}`,
        borderRadius: circleState.borderRadius,
        outline: circleState.outline,
        outlineOffset: circleState.outlineOffset,
        transition: circleState.transition,
    })
    return (
        <Block
            width={circleTokens.default.size}
            height={circleTokens.default.size}
            {...getCircleStateStyles(circleTokens.default)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            role="presentation"
            _hover={
                isClickable
                    ? getCircleStateStyles(circleTokens.hover)
                    : undefined
            }
            _focusVisible={
                isClickable
                    ? getCircleStateStyles(circleTokens.focus)
                    : undefined
            }
        >
            {children}
        </Block>
    )
}
