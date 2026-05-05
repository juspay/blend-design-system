import type { ReactNode } from 'react'
import type { StepperV2Step } from '../stepperV2.types'
import type { StepperV2TokensType } from '../stepperV2.tokens'
import type { StepperV2StepStatus } from '../stepperV2.types'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { StepStatusCircle } from './StepStatusCircle'

type StepsHorizontalBodyProps = {
    step: StepperV2Step
    stepIndex: number
    stepsLength: number
    stepState: StepperV2StepStatus
    stepTitleId: string
    stepperTokens: StepperV2TokensType
    stepIcon: ReactNode
    isClickable: boolean
}

export function StepsHorizontalBody({
    step,
    stepIndex,
    stepsLength,
    stepState,
    stepTitleId,
    stepperTokens,
    stepIcon,
    isClickable,
}: StepsHorizontalBodyProps) {
    const lineColor = stepperTokens.container.connector.line.color

    return (
        <>
            <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                role="presentation"
                paddingY={
                    stepperTokens.container.step.circle[stepState].default
                        .paddingTop
                }
                width="100%"
            >
                <Block
                    aria-hidden="true"
                    width="100%"
                    height={stepperTokens.container.connector.line.height}
                    backgroundColor={lineColor}
                    margin={0}
                    border="none"
                    style={{
                        visibility: stepIndex !== 0 ? 'visible' : 'hidden',
                    }}
                />
                <StepStatusCircle
                    stepState={stepState}
                    stepperTokens={stepperTokens}
                    isClickable={isClickable}
                >
                    {stepIcon}
                </StepStatusCircle>
                <Block
                    aria-hidden="true"
                    width="100%"
                    height={stepperTokens.container.connector.line.height}
                    backgroundColor={lineColor}
                    margin={0}
                    border="none"
                    style={{
                        visibility:
                            stepIndex !== stepsLength - 1
                                ? 'visible'
                                : 'hidden',
                    }}
                />
            </Block>
            <Text
                id={stepTitleId}
                truncate={true}
                fontSize={
                    stepperTokens.container.title.text[stepState].default
                        .fontSize
                }
                fontWeight={
                    stepperTokens.container.title.text[stepState].default
                        .fontWeight
                }
                color={
                    stepperTokens.container.title.text[stepState].default.color
                }
                as="span"
                style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    textAlign: 'center',
                }}
            >
                {step.title}
            </Text>
        </>
    )
}
