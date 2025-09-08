import { ArrowDown, RotateCcw, ArrowUp } from 'lucide-react'
import { capitaliseCamelCase } from './ChartUtils'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { DropdownMenu } from 'radix-ui'
import { useDebounce } from '../../hooks/useDebounce'
import { ChartLegendsProps, StackedLegendsDataPoint } from './types'
import Block from '../../components/Primitives/Block/Block'
import Text from '../../components/Text/Text'
import { ChartTokensType } from './chart.tokens'
import { FOUNDATION_THEME } from '../../tokens'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tag, TagColor, TagVariant } from '../Tags'

const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
    keys,
    handleLegendClick,
    handleLegendEnter,
    handleLegendLeave,
    colors,
    chartContainerRef,
    selectedKeys,
    setSelectedKeys,
    hoveredKey,
    stacked = false,
    isSmallScreen = false,
    stackedLegendsData,
}) => {
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')
    const legendTokens = chartTokens.legend

    const lastWidth = useRef<number>(0)
    const legendItemsContainerRef = useRef<HTMLDivElement>(null!)
    const [cuttOffIndex, setCuttOffIndex] = useState<number>(keys.length)
    const isExpanding = useRef<boolean>(false)
    // Have to revisit from optimizaion POV.
    const handleResize = useCallback(() => {
        if (!legendItemsContainerRef.current) return

        const container = legendItemsContainerRef.current
        const containerRect = container.getBoundingClientRect()
        const containerWidth = containerRect.width

        const BUFFER = 30
        const MORE_BUTTON_ESTIMATED_WIDTH = 80
        const GAP_SIZE =
            typeof legendTokens.gap.lg === 'string'
                ? parseFloat(legendTokens.gap.lg)
                : (legendTokens.gap.lg as number) || 16

        const legendItems = Array.from(container.children)

        if (isExpanding.current && legendItems.length < keys.length) {
            setCuttOffIndex(keys.length)
            isExpanding.current = false

            setTimeout(() => {
                handleResize()
            }, 50)
            return
        }

        let totalWidth = 0
        let optimalCutoff = 0

        for (let i = 0; i < Math.min(legendItems.length, keys.length); i++) {
            const itemWidth = (
                legendItems[i] as HTMLElement
            ).getBoundingClientRect().width

            const totalGaps = i > 0 ? i * GAP_SIZE : 0

            const remainingItems = keys.length - (i + 1)
            const needsMoreButton = remainingItems > 0
            const requiredSpace =
                totalWidth +
                itemWidth +
                totalGaps +
                (needsMoreButton ? MORE_BUTTON_ESTIMATED_WIDTH + GAP_SIZE : 0) +
                BUFFER

            if (requiredSpace <= containerWidth) {
                totalWidth += itemWidth
                optimalCutoff = i + 1
            } else {
                break
            }
        }

        const newCutoff = Math.max(1, Math.min(optimalCutoff, keys.length))
        setCuttOffIndex(newCutoff)
    }, [keys.length, legendTokens.gap.lg])

    const debouncedResize = useDebounce(handleResize, 150)

    useResizeObserver(chartContainerRef, ({ width }) => {
        if (width && Math.abs(width - lastWidth.current) > 10) {
            if (width > lastWidth.current + 20) {
                isExpanding.current = true
            }

            lastWidth.current = width
            debouncedResize()
        }
    })

    useEffect(() => {
        setCuttOffIndex(keys.length)
        isExpanding.current = false

        const timeoutId = setTimeout(() => {
            handleResize()
        }, 150)

        return () => clearTimeout(timeoutId)
    }, [keys.length, handleResize])

    const getItemOpacity = (dataKey: string) => {
        if (hoveredKey) {
            return hoveredKey === dataKey ? 1 : 0.4
        }
        if (selectedKeys && selectedKeys.length > 0) {
            return selectedKeys.includes(dataKey) ? 1 : 0.4
        }
        return 1
    }

    if (stacked)
        return (
            <StackedLegends
                keys={keys}
                activeKeys={selectedKeys}
                handleLegendClick={handleLegendClick}
                colors={colors}
                handleLegendEnter={handleLegendEnter}
                handleLegendLeave={handleLegendLeave}
                hoveredKey={hoveredKey}
                selectedKeys={selectedKeys}
                isSmallScreen={isSmallScreen}
                stackedLegendsData={stackedLegendsData || []}
            />
        )

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={legendTokens.gap.lg}
            justifyContent="space-between"
        >
            <Block
                ref={legendItemsContainerRef}
                display="flex"
                height={FOUNDATION_THEME.unit[28]}
                alignItems="center"
                overflowX="hidden"
                overflowY="visible"
                whiteSpace="nowrap"
                style={{ flex: 1 }}
                justifyContent={isSmallScreen ? 'center' : 'start'}
                gap={legendTokens.gap.lg}
            >
                {keys.slice(0, cuttOffIndex).map((dataKey, index) => (
                    <Block
                        height={FOUNDATION_THEME.unit[16]}
                        display="flex"
                        alignItems="center"
                        gap={legendTokens.item.gap}
                        cursor="pointer"
                        paddingRight={legendTokens.padding.sm}
                        transition="all 300ms"
                        key={dataKey}
                        onClick={() => handleLegendClick(dataKey)}
                        onMouseEnter={() => handleLegendEnter(dataKey)}
                        onMouseLeave={handleLegendLeave}
                        opacity={getItemOpacity(dataKey)}
                    >
                        <Block
                            width={FOUNDATION_THEME.unit[12]}
                            height={FOUNDATION_THEME.unit[12]}
                            borderRadius={FOUNDATION_THEME.border.radius[4]}
                            flexShrink={0}
                            backgroundColor={colors[index]}
                        />
                        <Text
                            fontSize={legendTokens.item.fontSize}
                            fontWeight={legendTokens.item.fontWeight}
                            truncate={true}
                            color={legendTokens.item.color.default}
                        >
                            {capitaliseCamelCase(dataKey)}
                        </Text>
                    </Block>
                ))}
                {cuttOffIndex < keys.length && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Block
                                display="flex"
                                alignItems="center"
                                cursor="pointer"
                                gap={8}
                                style={{
                                    fontSize: legendTokens.item.fontSize,
                                    fontWeight: legendTokens.item.fontWeight,
                                }}
                                height="100%"
                                color={legendTokens.item.color.default}
                                _hover={{
                                    color: legendTokens.item.color.hover,
                                }}
                            >
                                + {keys.length - cuttOffIndex} more
                            </Block>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content asChild>
                            <Block
                                backgroundColor={
                                    FOUNDATION_THEME.colors.gray[0]
                                }
                                zIndex={50}
                                borderRadius={FOUNDATION_THEME.border.radius[4]}
                                boxShadow={FOUNDATION_THEME.shadows.lg}
                                border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                minWidth={180}
                            >
                                {keys.slice(cuttOffIndex).map((dataKey) => (
                                    <Block
                                        padding={legendTokens.item.padding}
                                        paddingLeft={legendTokens.padding.md}
                                        paddingRight={legendTokens.padding.md}
                                        style={{
                                            fontSize:
                                                legendTokens.item.fontSize,
                                        }}
                                        _hover={{
                                            backgroundColor:
                                                legendTokens.item
                                                    .backgroundColor.hover,
                                        }}
                                        color={legendTokens.item.color.default}
                                        cursor="pointer"
                                        key={dataKey}
                                        onClick={() =>
                                            handleLegendClick(dataKey)
                                        }
                                        onMouseEnter={() =>
                                            handleLegendEnter(dataKey)
                                        }
                                        onMouseLeave={handleLegendLeave}
                                        opacity={getItemOpacity(dataKey)}
                                    >
                                        {capitaliseCamelCase(dataKey)}
                                    </Block>
                                ))}
                            </Block>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </Block>
            {selectedKeys &&
                selectedKeys.length > 0 &&
                selectedKeys.length !== keys.length && (
                    <Block
                        style={{ fontSize: legendTokens.item.fontSize }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={FOUNDATION_THEME.colors.primary[600]}
                        _hover={{
                            color: FOUNDATION_THEME.colors.primary[700],
                            backgroundColor:
                                FOUNDATION_THEME.colors.primary[50],
                        }}
                        borderRadius={FOUNDATION_THEME.border.radius[4]}
                        height={FOUNDATION_THEME.unit[20]}
                        width={FOUNDATION_THEME.unit[20]}
                        flexShrink={0}
                        onClick={() => setSelectedKeys([])}
                    >
                        <RotateCcw
                            style={{
                                width: '12px',
                                height: '12px',
                            }}
                        />
                    </Block>
                )}
        </Block>
    )
}

const StackedLegends: React.FC<{
    keys: string[]
    activeKeys: string[] | null
    handleLegendClick: (dataKey: string) => void
    colors: string[]
    handleLegendEnter: (dataKey: string) => void
    handleLegendLeave: () => void
    hoveredKey: string | null
    selectedKeys: string[]
    isSmallScreen: boolean
    stackedLegendsData: StackedLegendsDataPoint[]
}> = ({
    keys,
    activeKeys,
    handleLegendClick,
    colors,
    handleLegendEnter,
    handleLegendLeave,
    hoveredKey,
    selectedKeys,
    isSmallScreen,
    stackedLegendsData,
}) => {
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')

    const legendTokens = chartTokens.legend

    const getItemOpacity = (key: string) => {
        if (hoveredKey) {
            return hoveredKey === key ? 1 : 0.4
        }
        if (selectedKeys && selectedKeys.length > 0) {
            return selectedKeys.includes(key) ? 1 : 0.4
        }
        return 1
    }

    return (
        <Block
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={legendTokens.gap.sm}
        >
            {keys.map((key, index) => (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={8}
                    {...(isSmallScreen && {
                        _hover: {
                            backgroundColor: FOUNDATION_THEME.colors.gray[100],
                            borderRadius: FOUNDATION_THEME.border.radius[4],
                        },
                        cursor: 'pointer',
                        onClick: () => handleLegendClick(key),
                        onMouseEnter: () => handleLegendEnter(key),
                        onMouseLeave: handleLegendLeave,
                        opacity: getItemOpacity(key),
                    })}
                >
                    <Block
                        height={FOUNDATION_THEME.unit[16]}
                        display="flex"
                        alignItems="center"
                        gap={legendTokens.item.gap}
                        cursor="pointer"
                        paddingRight={legendTokens.padding.sm}
                        transition="all 300ms"
                        key={key}
                        onClick={() => handleLegendClick(key)}
                        onMouseEnter={() => handleLegendEnter(key)}
                        onMouseLeave={handleLegendLeave}
                        opacity={getItemOpacity(key)}
                    >
                        <Block
                            backgroundColor={colors[index]}
                            width={FOUNDATION_THEME.unit[12]}
                            height={FOUNDATION_THEME.unit[12]}
                            borderRadius={FOUNDATION_THEME.border.radius[4]}
                            flexShrink={0}
                        />
                        <Text
                            fontSize={legendTokens.item.fontSize}
                            fontWeight={legendTokens.item.fontWeight}
                            color={
                                activeKeys && activeKeys.includes(key)
                                    ? legendTokens.item.color.active
                                    : legendTokens.item.color.default
                            }
                        >
                            {capitaliseCamelCase(key)}
                        </Text>
                    </Block>
                    {isSmallScreen && (
                        <Block display="flex" alignItems="center" gap={8}>
                            <Text fontSize={12} fontWeight={600}>
                                {stackedLegendsData?.[index]
                                    ? `${stackedLegendsData[index].value.toFixed(2)}%`
                                    : '0.00%'}
                            </Text>
                            <Tag
                                text={
                                    stackedLegendsData?.[index]
                                        ? `${stackedLegendsData[
                                              index
                                          ].delta.toFixed(2)}%`
                                        : '0.00%'
                                }
                                color={
                                    stackedLegendsData?.[index]?.changeType ===
                                    'increase'
                                        ? TagColor.SUCCESS
                                        : TagColor.ERROR
                                }
                                variant={TagVariant.SUBTLE}
                                leftSlot={
                                    stackedLegendsData?.[index]?.changeType ===
                                    'increase' ? (
                                        <ArrowUp size={12} />
                                    ) : (
                                        <ArrowDown size={12} />
                                    )
                                }
                            />
                        </Block>
                    )}
                </Block>
            ))}
        </Block>
    )
}

ChartLegendsComponent.displayName = 'ChartLegends'

export default React.memo(ChartLegendsComponent)
