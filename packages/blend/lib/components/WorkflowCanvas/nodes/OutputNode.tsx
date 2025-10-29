import { memo } from 'react'
import { Position } from 'reactflow'
import type { CustomNodeProps } from '../types'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from '../workflow.tokens'
import { FOUNDATION_THEME } from '../../../tokens'
import Block from '../../Primitives/Block/Block'
import Card from '../../Card/Card'
import { CardVariant } from '../../Card/types'
import {
    createStyledHandle,
    createGradientWrapper,
    getBoxShadow,
} from '../utils'
import { TRANSITIONS } from '../constants'
import NodeContent from '../components/NodeContent'

const StyledHandle = createStyledHandle(
    FOUNDATION_THEME.colors.purple[500],
    FOUNDATION_THEME.colors.purple[600],
    FOUNDATION_THEME.colors.purple[600],
    FOUNDATION_THEME.colors.purple[700]
)

const GradientWrapper = createGradientWrapper(
    FOUNDATION_THEME.colors.purple[50],
    FOUNDATION_THEME.colors.purple[100],
    FOUNDATION_THEME.colors.purple[300]
)

const OutputNode = ({ data, selected }: CustomNodeProps) => {
    const tokens = useResponsiveTokens<WorkflowTokensType>('WORKFLOW_CANVAS')

    return (
        <Block
            position="relative"
            minWidth={tokens.node.default.minWidth}
            minHeight={tokens.node.default.minHeight}
        >
            <StyledHandle
                type="target"
                position={Position.Left}
                $tokens={tokens}
            />

            <Block
                _hover={{ boxShadow: tokens.node.hover.boxShadow }}
                transition={TRANSITIONS.DEFAULT}
            >
                <Card variant={CardVariant.CUSTOM}>
                    <GradientWrapper
                        $boxShadow={getBoxShadow(
                            selected,
                            tokens.node.selected.boxShadow,
                            tokens.node.default.boxShadow
                        )}
                    >
                        <NodeContent
                            icon={data.icon}
                            label={data.label}
                            description={data.description}
                            iconBackgroundColor={
                                FOUNDATION_THEME.colors.purple[200]
                            }
                            iconPadding={tokens.node.icon.paddingMd}
                            iconBorderRadius={tokens.node.icon.borderRadiusMd}
                            labelColor={FOUNDATION_THEME.colors.purple[700]}
                            descriptionColor={
                                FOUNDATION_THEME.colors.purple[600]
                            }
                            descriptionOpacity={1}
                        />
                    </GradientWrapper>
                </Card>
            </Block>
        </Block>
    )
}

export default memo(OutputNode)
