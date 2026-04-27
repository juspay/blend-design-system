import type { RefObject } from 'react'
import type { StepperV2Step } from '../stepperV2.types'
import type { StepperV2TokensType } from '../stepperV2.tokens'
import Block from '../../Primitives/Block/Block'
import VerticalLineV2 from './VerticalLineV2'

type StepsVerticalSubstepRailsProps = {
    step: StepperV2Step
    isLast: boolean
    isExpanded: boolean
    stepperTokens: StepperV2TokensType
    verticalLineRef: RefObject<HTMLDivElement | null>
}

export function StepsVerticalSubstepRails({
    step,
    isLast,
    isExpanded,
    stepperTokens,
    verticalLineRef,
}: StepsVerticalSubstepRailsProps) {
    if (!isExpanded || !step.substeps || step.substeps.length === 0) {
        return null
    }

    return (
        <>
            {step.substeps.map((substep, index) => (
                <Block
                    key={substep.id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Block
                        paddingY={
                            stepperTokens.container.subConnector.dot.paddingTop
                        }
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Block
                            width={
                                stepperTokens.container.subConnector.dot.width
                            }
                            height={
                                stepperTokens.container.subConnector.dot.height
                            }
                            border={
                                stepperTokens.container.subConnector.dot.border
                            }
                            borderRadius={
                                stepperTokens.container.subConnector.dot
                                    .borderRadius
                            }
                        />
                    </Block>
                    <VerticalLineV2
                        ref={verticalLineRef}
                        color={
                            step.substeps?.length === index + 1 && isLast
                                ? 'transparent'
                                : stepperTokens.container.connector.line.color
                        }
                    />
                </Block>
            ))}
        </>
    )
}
