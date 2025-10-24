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

/**
 * Styled handle component for input node connections
 * Green-themed handle for workflow start points
 */
const StyledHandle = createStyledHandle(
    FOUNDATION_THEME.colors.green[500],
    FOUNDATION_THEME.colors.green[600],
    FOUNDATION_THEME.colors.green[600],
    FOUNDATION_THEME.colors.green[700]
)

/**
 * Styled wrapper for input node gradient background
 * Green gradient for visual distinction of input nodes
 */
const GradientWrapper = createGradientWrapper(
    FOUNDATION_THEME.colors.green[50],
    FOUNDATION_THEME.colors.green[100],
    FOUNDATION_THEME.colors.green[300]
)

/**
 * InputNode component for workflow canvas start points
 *
 * @component
 * @param {CustomNodeProps} props - Node properties including data and selected state
 * @returns {JSX.Element} Input workflow node with green gradient and source handle
 *
 * @example
 * ```tsx
 * <InputNode
 *   data={{ label: 'Start', icon: <PlayIcon />, description: 'Workflow start' }}
 *   selected={false}
 * />
 * ```
 */
const InputNode = ({ data, selected }: CustomNodeProps) => {
    const tokens = useResponsiveTokens<WorkflowTokensType>('WORKFLOW_CANVAS')

    return (
        <Block
            position="relative"
            minWidth={tokens.node.default.minWidth}
            minHeight={tokens.node.default.minHeight}
        >
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
                                FOUNDATION_THEME.colors.green[200]
                            }
                            iconPadding={tokens.node.icon.paddingMd}
                            iconBorderRadius={tokens.node.icon.borderRadiusMd}
                            labelColor={FOUNDATION_THEME.colors.green[700]}
                            descriptionColor={
                                FOUNDATION_THEME.colors.green[600]
                            }
                            descriptionOpacity={1}
                        />
                    </GradientWrapper>
                </Card>
            </Block>

            <StyledHandle
                type="source"
                position={Position.Right}
                $tokens={tokens}
            />
        </Block>
    )
}

export default memo(InputNode)
