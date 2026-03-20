import { ArrowDown, ArrowUp } from 'lucide-react'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import {
    StatCardV2ArrowDirection,
    type StatCardV2ChangeProps,
} from './statcardV2.types'

const StatCardV2Change = ({
    changeValueText,
    leftSymbol,
    rightSymbol,
    arrowDirection,
    changeType,
    tokens,
    id,
}: StatCardV2ChangeProps) => {
    const arrowColor =
        tokens.topContainer.dataContainer.statsContainer.changeContainer.arrow
            .color[changeType]
    const changeTokens =
        tokens.topContainer.dataContainer.statsContainer.changeContainer.change

    if (changeValueText === undefined || changeValueText === null) return null

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={
                tokens.topContainer.dataContainer.statsContainer.changeContainer
                    .gap
            }
            data-element="statcard-delta"
        >
            <Block
                data-element="change-arrow"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {arrowDirection === StatCardV2ArrowDirection.UP ? (
                    <ArrowUp
                        width={
                            tokens.topContainer.dataContainer.statsContainer
                                .changeContainer.arrow.width
                        }
                        height={
                            tokens.topContainer.dataContainer.statsContainer
                                .changeContainer.arrow.height
                        }
                        color={arrowColor}
                    />
                ) : (
                    <ArrowDown
                        width={
                            tokens.topContainer.dataContainer.statsContainer
                                .changeContainer.arrow.width
                        }
                        height={
                            tokens.topContainer.dataContainer.statsContainer
                                .changeContainer.arrow.height
                        }
                        color={arrowColor}
                    />
                )}
            </Block>
            <Block as="span" display="flex" alignItems="center">
                <Text
                    id={id}
                    fontSize={changeTokens.fontSize}
                    fontWeight={changeTokens.fontWeight}
                    lineHeight={addPxToValue(changeTokens.lineHeight)}
                    color={changeTokens.color[changeType]}
                    data-status={
                        changeType === 'increase' ? 'increase' : 'decrease'
                    }
                >
                    {leftSymbol && leftSymbol}
                    {changeValueText}
                    {rightSymbol && rightSymbol}
                </Text>
            </Block>
        </Block>
    )
}

export default StatCardV2Change
