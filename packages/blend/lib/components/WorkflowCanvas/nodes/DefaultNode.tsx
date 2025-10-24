import { memo } from 'react'
import { Position } from 'reactflow'
import type { CustomNodeProps } from '../types'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from '../workflow.tokens'
import Block from '../../Primitives/Block/Block'
import Card from '../../Card/Card'
import { CardVariant } from '../../Card/types'
import { createTokenStyledHandle, getBoxShadow } from '../utils'
import { TRANSITIONS } from '../constants'
import NodeContent from '../components/NodeContent'

/**
 * Styled handle component for node connections
 * Uses token-based styling for consistency
 */
const StyledHandle = createTokenStyledHandle()

/**
 * DefaultNode component for workflow canvas
 *
 * @component
 * @param {CustomNodeProps} props - Node properties including data and selected state
 * @returns {JSX.Element} Default workflow node with handles on both sides
 *
 * @example
 * ```tsx
 * <DefaultNode
 *   data={{ label: 'Process', icon: <Icon />, description: 'Process data' }}
 *   selected={false}
 * />
 * ```
 */
const DefaultNode = ({ data, selected }: CustomNodeProps) => {
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
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={tokens.node.content.gap}
                        padding={tokens.node.content.padding}
                        alignItems="center"
                        border={tokens.node.default.border}
                        boxShadow={getBoxShadow(
                            selected,
                            tokens.node.selected.boxShadow,
                            tokens.node.default.boxShadow
                        )}
                    >
                        <NodeContent
                            icon={data.icon}
                            label={data.label}
                            description={data.description}
                            iconPadding={tokens.node.icon.paddingSm}
                            iconBorderRadius={tokens.node.icon.borderRadiusSm}
                            labelColor={tokens.node.default.color}
                            descriptionColor={tokens.node.default.color}
                        />
                    </Block>
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

export default memo(DefaultNode)
