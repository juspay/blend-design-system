import { memo } from 'react'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from 'reactflow'
import type { CustomEdgeProps } from '../types'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from '../workflow.tokens'
import Block from '../../Primitives/Block/Block'
import Tag from '../../Tags/Tags'
import { TagVariant, TagColor, TagSize, TagShape } from '../../Tags/types'
import { getEdgeStroke, getEdgeStrokeWidth } from '../utils'
import { TRANSITIONS, REACTFLOW_CLASSES, TRANSFORMS } from '../constants'

const DefaultEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    data,
}: CustomEdgeProps) => {
    const tokens = useResponsiveTokens<WorkflowTokensType>('WORKFLOW_CANVAS')

    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    })

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: getEdgeStroke(
                        selected,
                        data?.animated,
                        tokens.edge.selected.stroke,
                        tokens.edge.animated.stroke,
                        tokens.edge.stroke
                    ),
                    strokeWidth: getEdgeStrokeWidth(
                        selected,
                        tokens.edge.selected.strokeWidth,
                        tokens.edge.strokeWidth
                    ),
                    transition: TRANSITIONS.DEFAULT,
                }}
            />

            {data?.label && (
                <EdgeLabelRenderer>
                    <Block
                        position="absolute"
                        style={{
                            left: `${labelX}px`,
                            top: `${labelY}px`,
                            transform: TRANSFORMS.CENTER,
                        }}
                        pointerEvents="all"
                        className={REACTFLOW_CLASSES.NO_DRAG_PAN}
                    >
                        <Tag
                            text={data.label}
                            variant={TagVariant.SUBTLE}
                            color={TagColor.NEUTRAL}
                            size={TagSize.XS}
                            shape={TagShape.ROUNDED}
                        />
                    </Block>
                </EdgeLabelRenderer>
            )}
        </>
    )
}

export default memo(DefaultEdge)
