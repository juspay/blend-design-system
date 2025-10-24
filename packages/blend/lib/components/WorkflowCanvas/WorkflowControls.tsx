import { memo, useMemo } from 'react'
import { useReactFlow } from 'reactflow'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import type { WorkflowControlsProps } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from './workflow.tokens'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { TRANSITIONS } from './constants'

/**
 * WorkflowControls component for zoom and view controls
 *
 * @component
 * @param {WorkflowControlsProps} props - Control options and positioning
 * @returns {JSX.Element} Control buttons for zooming and fitting view
 *
 * @example
 * ```tsx
 * <WorkflowControls
 *   showZoom={true}
 *   showFitView={true}
 *   position="bottom-right"
 * />
 * ```
 */
const WorkflowControls = ({
    showZoom = true,
    showFitView = true,
    position = 'bottom-right',
}: WorkflowControlsProps) => {
    const tokens = useResponsiveTokens<WorkflowTokensType>('WORKFLOW_CANVAS')
    const { zoomIn, zoomOut, fitView } = useReactFlow()

    // Calculate positioning from position prop
    const positionStyles = useMemo(() => {
        const [vertical, horizontal] = position.split('-')
        return {
            [vertical]: tokens.controls.offset,
            [horizontal]: tokens.controls.offset,
        }
    }, [position, tokens.controls.offset])

    const handleZoomIn = () => {
        zoomIn({ duration: TRANSITIONS.ZOOM_DURATION })
    }

    const handleZoomOut = () => {
        zoomOut({ duration: TRANSITIONS.ZOOM_DURATION })
    }

    const handleFitView = () => {
        fitView({
            duration: TRANSITIONS.FIT_VIEW_DURATION,
            padding: TRANSITIONS.FIT_VIEW_PADDING,
        })
    }

    return (
        <Block
            position="absolute"
            zIndex={10}
            backgroundColor={tokens.controls.backgroundColor}
            border={tokens.controls.border}
            borderRadius={tokens.controls.borderRadius}
            boxShadow={tokens.controls.boxShadow}
            padding={tokens.controls.padding}
            display="flex"
            flexDirection="column"
            gap={tokens.controls.gap}
            {...positionStyles}
        >
            {showZoom && (
                <>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        subType={ButtonSubType.ICON_ONLY}
                        size={ButtonSize.SMALL}
                        onClick={handleZoomIn}
                        leadingIcon={
                            <ZoomIn size={tokens.node.icon.size.small} />
                        }
                        aria-label="Zoom in"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        subType={ButtonSubType.ICON_ONLY}
                        size={ButtonSize.SMALL}
                        onClick={handleZoomOut}
                        leadingIcon={
                            <ZoomOut size={tokens.node.icon.size.small} />
                        }
                        aria-label="Zoom out"
                    />
                </>
            )}
            {showFitView && (
                <Button
                    buttonType={ButtonType.SECONDARY}
                    subType={ButtonSubType.ICON_ONLY}
                    size={ButtonSize.SMALL}
                    onClick={handleFitView}
                    leadingIcon={
                        <Maximize2 size={tokens.node.icon.size.small} />
                    }
                    aria-label="Fit view"
                />
            )}
        </Block>
    )
}

export default memo(WorkflowControls)
