import React, { useState, useRef, useEffect } from 'react'
import { Sankey } from 'recharts'
import SankeyNode from './SankeyNode'
import SankeyLink from './SankeyLink'
import { SankeyTooltipData } from './types'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'
import { formatNumber } from './ChartUtils'

interface SankeyChartWrapperProps {
    chartName?: string
    transformedData: {
        nodes: { name: string }[]
        links: {
            source: number
            target: number
            value: number
            color?: string
            hoverColor?: string
            sourceName?: string
            targetName?: string
        }[]
    }
    nodeColors: string[]
    linkColors: string[]
    sankeyWidth: number
    sankeyHeight: number
    isSmallScreen: boolean
}

const SankeyChartWrapper: React.FC<SankeyChartWrapperProps> = ({
    chartName,
    transformedData,
    nodeColors,
    linkColors,
    sankeyWidth,
    sankeyHeight,
    isSmallScreen,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState<number>(sankeyWidth)
    const [containerHeight, setContainerHeight] = useState<number>(sankeyHeight)
    const [tooltipData, setTooltipData] = useState<SankeyTooltipData | null>(
        null
    )
    const [tooltipPosition, setTooltipPosition] = useState<{
        x: number
        y: number
    } | null>(null)

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                const height = containerRef.current.offsetHeight
                setContainerWidth(Math.max(300, width - 40))

                if (height > 100) {
                    setContainerHeight(Math.max(300, height - 40))
                }
            }
        }

        updateDimensions()
        const timeoutId = setTimeout(updateDimensions, 100)

        window.addEventListener('resize', updateDimensions)
        return () => {
            window.removeEventListener('resize', updateDimensions)
            clearTimeout(timeoutId)
        }
    }, [sankeyWidth, sankeyHeight])

    const handleMouseEnter = (
        data: SankeyTooltipData,
        event: React.MouseEvent
    ) => {
        setTooltipData(data)
        setTooltipPosition({
            x: event.clientX,
            y: event.clientY,
        })
    }

    const handleMouseLeave = () => {
        setTooltipData(null)
        setTooltipPosition(null)
    }

    const renderTooltip = () => {
        if (!tooltipData || !tooltipPosition) return null

        const data = tooltipData.payload

        // Node tooltip
        if (
            data?.name &&
            data?.source === undefined &&
            data?.target === undefined
        ) {
            return (
                <Block
                    position="fixed"
                    left={tooltipPosition.x + 10}
                    top={tooltipPosition.y + 10}
                    backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    boxShadow={FOUNDATION_THEME.shadows.lg}
                    display="flex"
                    flexDirection="column"
                    gap={12}
                    borderRadius={FOUNDATION_THEME.border.radius[8]}
                    padding={12}
                    paddingLeft={10}
                    border={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                    minWidth={220}
                    maxWidth={200}
                    zIndex={9999}
                    pointerEvents="none"
                >
                    <Block maxWidth={180}>
                        <Text
                            fontSize={14}
                            fontWeight={FOUNDATION_THEME.font.weight[600]}
                            color={FOUNDATION_THEME.colors.gray[900]}
                            truncate={true}
                        >
                            {data.name}
                        </Text>
                    </Block>
                    {data.value !== undefined && (
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[500]}
                                color={FOUNDATION_THEME.colors.gray[400]}
                            >
                                Value:
                            </Text>
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[900]}
                            >
                                {formatNumber(data.value)}
                            </Text>
                        </Block>
                    )}
                </Block>
            )
        }

        if (
            data?.source !== undefined &&
            data?.target !== undefined &&
            data?.value !== undefined
        ) {
            return (
                <Block
                    position="fixed"
                    left={tooltipPosition.x + 10}
                    top={tooltipPosition.y + 10}
                    backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    boxShadow={FOUNDATION_THEME.shadows.lg}
                    display="flex"
                    flexDirection="column"
                    gap={12}
                    borderRadius={FOUNDATION_THEME.border.radius[8]}
                    padding={12}
                    paddingLeft={10}
                    border={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                    minWidth={220}
                    maxWidth={200}
                    zIndex={9999}
                    pointerEvents="none"
                >
                    <Block maxWidth={180}>
                        <Text
                            fontSize={14}
                            fontWeight={FOUNDATION_THEME.font.weight[600]}
                            color={FOUNDATION_THEME.colors.gray[900]}
                            truncate={true}
                        >
                            Flow
                        </Text>
                    </Block>
                    <Block display="flex" flexDirection="column" gap={6}>
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[500]}
                                color={FOUNDATION_THEME.colors.gray[400]}
                            >
                                From:
                            </Text>
                            <Block maxWidth={120}>
                                <Text
                                    fontSize={12}
                                    fontWeight={
                                        FOUNDATION_THEME.font.weight[600]
                                    }
                                    color={FOUNDATION_THEME.colors.gray[900]}
                                    truncate={true}
                                >
                                    {data.sourceName || `Node ${data.source}`}
                                </Text>
                            </Block>
                        </Block>
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[500]}
                                color={FOUNDATION_THEME.colors.gray[400]}
                            >
                                To:
                            </Text>
                            <Block maxWidth={120}>
                                <Text
                                    fontSize={12}
                                    fontWeight={
                                        FOUNDATION_THEME.font.weight[600]
                                    }
                                    color={FOUNDATION_THEME.colors.gray[900]}
                                    truncate={true}
                                >
                                    {data.targetName || `Node ${data.target}`}
                                </Text>
                            </Block>
                        </Block>
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[500]}
                                color={FOUNDATION_THEME.colors.gray[400]}
                            >
                                Value:
                            </Text>
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[900]}
                            >
                                {formatNumber(data.value)}
                            </Text>
                        </Block>
                    </Block>
                </Block>
            )
        }

        return null
    }

    const getMargins = () => {
        if (containerWidth < 500) {
            return { top: 10, bottom: 10, left: 5, right: 80 }
        } else if (containerWidth < 800) {
            return { top: 15, bottom: 15, left: 20, right: 100 }
        } else if (isSmallScreen) {
            return { top: 20, bottom: 20, left: 30, right: 120 }
        } else {
            return { top: 20, bottom: 20, left: 150, right: 200 }
        }
    }

    const margins = getMargins()

    return (
        <>
            <Block
                ref={containerRef}
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {containerWidth > 0 && containerHeight > 0 && (
                    <Sankey
                        data-chart={chartName}
                        width={containerWidth}
                        height={containerHeight}
                        margin={margins}
                        data={transformedData}
                        nodeWidth={
                            containerWidth < 500 ? 6 : isSmallScreen ? 8 : 15
                        }
                        nodePadding={
                            containerWidth < 500 ? 15 : isSmallScreen ? 20 : 50
                        }
                        linkCurvature={0.61}
                        iterations={64}
                        link={
                            <SankeyLink
                                linkColors={linkColors}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        }
                        node={
                            <SankeyNode
                                containerWidth={containerWidth}
                                nodeColors={nodeColors}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        }
                    >
                        <defs>
                            <linearGradient id={'linkGradient'}>
                                <stop
                                    offset="0%"
                                    stopColor="rgba(0, 136, 254, 0.5)"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="rgba(0, 197, 159, 0.3)"
                                />
                            </linearGradient>
                        </defs>
                    </Sankey>
                )}
            </Block>
            {renderTooltip()}
        </>
    )
}

export default SankeyChartWrapper
