import { ArrowDown, RotateCcw, ArrowUp } from 'lucide-react'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { ChartLegendsProps, StackedLegendsDataPoint } from './types'
import Block from '../../components/Primitives/Block/Block'
import Text from '../../components/Text/Text'
import { ChartTokensType } from './chart.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { getColorByKey } from './utils'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tag, TagColor, TagVariant } from '../Tags'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { Menu } from '../Menu'
import { Button, ButtonSize, ButtonSubType, ButtonType } from '../Button'
import { Skeleton } from '../Skeleton'

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

    const legendTokens = chartTokens.content.legend

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
            gap={legendTokens.gap}
        >
            {keys.map((key, index) => {
                const itemColor = getColorByKey(key, colors, index)
                return (
                    <Block
                        key={key}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding={FOUNDATION_THEME.unit[8]}
                        {...(isSmallScreen && {
                            _hover: {
                                backgroundColor:
                                    FOUNDATION_THEME.colors.gray[100],
                                borderRadius: FOUNDATION_THEME.border.radius[4],
                            },
                            cursor: 'pointer',
                            onClick: () => handleLegendClick(key),
                            onMouseEnter: () => handleLegendEnter(key),
                            onMouseLeave: handleLegendLeave,
                            opacity: getItemOpacity(key),
                        })}
                    >
                        <PrimitiveButton
                            type="button"
                            key={key}
                            aria-label={`Toggle ${key} series visibility`}
                            aria-pressed={selectedKeys.includes(key)}
                            onClick={() => handleLegendClick(key)}
                            onMouseEnter={() => handleLegendEnter(key)}
                            onMouseLeave={handleLegendLeave}
                            onFocus={() => handleLegendEnter(key)}
                            onBlur={handleLegendLeave}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap:
                                    typeof legendTokens.item.gap === 'string'
                                        ? legendTokens.item.gap
                                        : `${legendTokens.item.gap}px`,
                                height: FOUNDATION_THEME.unit[16],
                                cursor: 'pointer',
                                transition: 'all 300ms',
                                opacity: getItemOpacity(key),
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                color: 'inherit',
                            }}
                            _focusVisible={{
                                outline: '3px solid #BEDBFF',
                                border: '1px solid #0561E2',
                                cursor: 'pointer',
                                outlineOffset: '2px',
                            }}
                        >
                            <Block
                                backgroundColor={itemColor}
                                width={FOUNDATION_THEME.unit[12]}
                                height={FOUNDATION_THEME.unit[12]}
                                borderRadius={FOUNDATION_THEME.border.radius[4]}
                                flexShrink={0}
                                data-element="chart-legend-color"
                                data-id={itemColor}
                            />
                            <Text
                                data-element="chart-legend-text"
                                data-id={key}
                                fontSize={legendTokens.item.fontSize}
                                fontWeight={legendTokens.item.fontWeight}
                                color={
                                    activeKeys && activeKeys.includes(key)
                                        ? legendTokens.item.color.active
                                        : legendTokens.item.color.default
                                }
                            >
                                {key}
                            </Text>
                        </PrimitiveButton>
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
                                        stackedLegendsData?.[index]
                                            ?.changeType === 'increase'
                                            ? TagColor.SUCCESS
                                            : TagColor.ERROR
                                    }
                                    variant={TagVariant.SUBTLE}
                                    leftSlot={
                                        stackedLegendsData?.[index]
                                            ?.changeType === 'increase' ? (
                                            <ArrowUp size={12} />
                                        ) : (
                                            <ArrowDown size={12} />
                                        )
                                    }
                                />
                            </Block>
                        )}
                    </Block>
                )
            })}
        </Block>
    )
}

const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
    legends,
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
    const legendTokens = chartTokens.content.legend

    const displayLegends = useMemo(
        () => legends || keys.map((key) => ({ title: key })),
        [legends, JSON.stringify(keys)]
    )
    const lastWidth = useRef<number>(0)
    const legendItemsContainerRef = useRef<HTMLDivElement>(null!)
    const [cuttOffIndex, setCuttOffIndex] = useState<number>(keys.length)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const isExpanding = useRef<boolean>(false)
    // Have to revisit from optimizaion POV.
    const handleResize = useCallback(() => {
        if (!legendItemsContainerRef.current) {
            setIsLoading(false)
            return
        }

        const container = legendItemsContainerRef.current
        const containerRect = container.getBoundingClientRect()
        const containerWidth = containerRect.width

        const BUFFER = 30
        const MORE_BUTTON_ESTIMATED_WIDTH = 80
        const GAP_SIZE =
            typeof legendTokens.gap === 'string'
                ? parseFloat(legendTokens.gap)
                : (legendTokens.gap as number) || 16

        const legendItems = Array.from(container.children)
        const totalLegends = displayLegends.length

        if (isExpanding.current && legendItems.length < totalLegends) {
            setCuttOffIndex(totalLegends)
            isExpanding.current = false

            setTimeout(() => {
                handleResize()
            }, 50)
            return
        }

        let totalWidth = 0
        let optimalCutoff = 0

        for (let i = 0; i < Math.min(legendItems.length, totalLegends); i++) {
            const itemWidth = (
                legendItems[i] as HTMLElement
            ).getBoundingClientRect().width

            const totalGaps = i > 0 ? i * GAP_SIZE : 0

            const remainingItems = totalLegends - (i + 1)
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

        const newCutoff = Math.max(1, Math.min(optimalCutoff, totalLegends))
        setCuttOffIndex(newCutoff)
        setIsLoading(false)
    }, [displayLegends, legendTokens.gap])

    const debouncedResize = useDebounce(handleResize, 150)

    useResizeObserver(chartContainerRef, ({ width }) => {
        if (width && Math.abs(width - lastWidth.current) > 10) {
            setIsLoading(true)
            if (width > lastWidth.current + 20) {
                isExpanding.current = true
            }

            lastWidth.current = width
            debouncedResize()
        }
    })

    useEffect(() => {
        setIsLoading(true)
        setCuttOffIndex(displayLegends.length)
        isExpanding.current = false

        const timeoutId = setTimeout(() => {
            handleResize()
        }, 150)

        return () => clearTimeout(timeoutId)
    }, [displayLegends, handleResize])

    const getItemOpacity = (dataKey: string) => {
        if (hoveredKey) {
            return hoveredKey === dataKey ? 1 : 0.4
        }
        if (selectedKeys && selectedKeys.length > 0) {
            return selectedKeys.includes(dataKey) ? 1 : 0.4
        }
        return 1
    }

    if (stacked) {
        const normalizedColors = colors.map((color) =>
            typeof color === 'string' ? color : color.color
        )
        return (
            <StackedLegends
                keys={keys}
                activeKeys={selectedKeys}
                handleLegendClick={handleLegendClick}
                colors={normalizedColors}
                handleLegendEnter={handleLegendEnter}
                handleLegendLeave={handleLegendLeave}
                hoveredKey={hoveredKey}
                selectedKeys={selectedKeys}
                isSmallScreen={isSmallScreen}
                stackedLegendsData={stackedLegendsData || []}
            />
        )
    }

    const ChartLegendSkeleton = ({ count = 5 }: { count?: number }) => {
        return (
            <Block display="flex" alignItems="center" gap={16}>
                {Array.from({ length: count }).map((_, i) => (
                    <Block key={i} display="flex" alignItems="center" gap={8}>
                        <Skeleton width={12} height={12} borderRadius={4} />
                        <Skeleton width={40} height={12} borderRadius={2} />
                    </Block>
                ))}
            </Block>
        )
    }

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={legendTokens.gap}
            justifyContent="space-between"
            position="relative"
        >
            {isLoading && (
                <Block
                    display="flex"
                    alignItems="center"
                    height={FOUNDATION_THEME.unit[28]}
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    style={{ zIndex: 1 }}
                >
                    <ChartLegendSkeleton />
                </Block>
            )}
            <Block
                ref={legendItemsContainerRef}
                display="flex"
                height={FOUNDATION_THEME.unit[28]}
                alignItems="center"
                overflowX="hidden"
                overflowY="visible"
                whiteSpace="nowrap"
                style={{ flex: 1, opacity: isLoading ? 0 : 1 }}
                justifyContent={isSmallScreen ? 'center' : 'start'}
                gap={legendTokens.gap}
            >
                {displayLegends
                    .slice(0, cuttOffIndex)
                    .map(
                        (
                            legend: { title: string; total?: number },
                            index: number
                        ) => {
                            const dataKey = legend.title
                            const itemColor = getColorByKey(
                                dataKey,
                                colors,
                                index
                            )
                            return (
                                <PrimitiveButton
                                    type="button"
                                    key={dataKey}
                                    data-element="chart-legend"
                                    data-id={dataKey}
                                    aria-label={`Toggle ${dataKey} series visibility`}
                                    aria-pressed={selectedKeys.includes(
                                        dataKey
                                    )}
                                    onClick={() => handleLegendClick(dataKey)}
                                    onMouseEnter={() =>
                                        handleLegendEnter(dataKey)
                                    }
                                    onMouseLeave={handleLegendLeave}
                                    onFocus={() => handleLegendEnter(dataKey)}
                                    onBlur={handleLegendLeave}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap:
                                            typeof legendTokens.item.gap ===
                                            'string'
                                                ? legendTokens.item.gap
                                                : `${legendTokens.item.gap}px`,
                                        height: FOUNDATION_THEME.unit[16],
                                        cursor: 'pointer',
                                        transition: 'all 300ms',
                                        opacity: getItemOpacity(dataKey),
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        fontFamily: 'inherit',
                                        fontSize: 'inherit',
                                        color: 'inherit',
                                    }}
                                    _focusVisible={{
                                        outline: '3px solid #BEDBFF',
                                        border: '1px solid #0561E2',
                                        cursor: 'pointer',
                                        outlineOffset: '2px',
                                    }}
                                >
                                    <Block
                                        width={FOUNDATION_THEME.unit[12]}
                                        height={FOUNDATION_THEME.unit[12]}
                                        borderRadius={
                                            FOUNDATION_THEME.border.radius[4]
                                        }
                                        flexShrink={0}
                                        backgroundColor={itemColor}
                                        data-element="chart-legend-color"
                                        data-id={itemColor}
                                    />
                                    {legend.total !== undefined ? (
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={8}
                                        >
                                            <Text
                                                fontSize={
                                                    legendTokens.item.fontSize
                                                }
                                                fontWeight={
                                                    legendTokens.item.fontWeight
                                                }
                                                truncate={true}
                                                color={
                                                    legendTokens.item.color
                                                        .default
                                                }
                                                data-element="chart-legend-text"
                                                data-id={dataKey}
                                            >
                                                {dataKey}
                                            </Text>
                                            <Text
                                                fontSize={
                                                    legendTokens.item.fontSize
                                                }
                                                fontWeight={
                                                    legendTokens.item.fontWeight
                                                }
                                                color={
                                                    legendTokens.item.color
                                                        .default
                                                }
                                            >
                                                |
                                            </Text>
                                            <Text
                                                fontSize={
                                                    legendTokens.item.fontSize
                                                }
                                                fontWeight={
                                                    legendTokens.item.fontWeight
                                                }
                                                color={
                                                    legendTokens.item.color
                                                        .default
                                                }
                                            >
                                                {legend.total}
                                            </Text>
                                        </Block>
                                    ) : (
                                        <Text
                                            fontSize={
                                                legendTokens.item.fontSize
                                            }
                                            fontWeight={
                                                legendTokens.item.fontWeight
                                            }
                                            truncate={true}
                                            color={
                                                legendTokens.item.color.default
                                            }
                                            data-element="chart-legend-text"
                                            data-id={dataKey}
                                        >
                                            {dataKey}
                                        </Text>
                                    )}
                                </PrimitiveButton>
                            )
                        }
                    )}
                {cuttOffIndex < displayLegends.length && (
                    <Menu
                        trigger={
                            <Button
                                text={`+ ${displayLegends.length - cuttOffIndex} more`}
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                subType={ButtonSubType.INLINE}
                            />
                        }
                        items={[
                            {
                                items: displayLegends.slice(cuttOffIndex).map(
                                    (
                                        legend: {
                                            title: string
                                            total?: number
                                        },
                                        index: number
                                    ) => {
                                        const dataKey = legend.title
                                        // Try to find color by key first, fallback to index
                                        const colorByKey = colors.find(
                                            (c) =>
                                                typeof c !== 'string' &&
                                                c.key === dataKey
                                        )
                                        // Extract color string - prioritize key match, then fallback to index
                                        let itemColor: string
                                        if (colorByKey) {
                                            itemColor = colorByKey.color
                                        } else {
                                            const fallbackColor =
                                                colors[index % colors.length]
                                            itemColor =
                                                typeof fallbackColor ===
                                                'string'
                                                    ? fallbackColor
                                                    : fallbackColor?.color ||
                                                      '#000000'
                                        }
                                        const isHovered = hoveredKey === dataKey
                                        const isSelected =
                                            selectedKeys.includes(dataKey)
                                        const itemOpacity = isHovered
                                            ? 1
                                            : getItemOpacity(dataKey)
                                        return {
                                            label: '',
                                            slot1: (
                                                <PrimitiveButton
                                                    type="button"
                                                    aria-label={`Toggle ${dataKey} series visibility`}
                                                    aria-pressed={isSelected}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleLegendClick(
                                                            dataKey
                                                        )
                                                    }}
                                                    onMouseEnter={() =>
                                                        handleLegendEnter(
                                                            dataKey
                                                        )
                                                    }
                                                    onMouseLeave={
                                                        handleLegendLeave
                                                    }
                                                    _hover={{
                                                        backgroundColor:
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[200],
                                                        color:
                                                            legendTokens.item
                                                                .color.hover ||
                                                            legendTokens.item
                                                                .color.default,
                                                    }}
                                                    _focus={{
                                                        backgroundColor:
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[200],
                                                        color:
                                                            legendTokens.item
                                                                .color.hover ||
                                                            legendTokens.item
                                                                .color.default,
                                                    }}
                                                    onFocus={() =>
                                                        handleLegendEnter(
                                                            dataKey
                                                        )
                                                    }
                                                    onBlur={handleLegendLeave}
                                                    data-element="chart-legend-text"
                                                    data-id={dataKey}
                                                    style={{
                                                        padding: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
                                                        fontSize:
                                                            legendTokens.item
                                                                .fontSize,
                                                        color: String(
                                                            legendTokens.item
                                                                .color
                                                                .default ||
                                                                'inherit'
                                                        ),
                                                        cursor: 'pointer',
                                                        opacity: itemOpacity,
                                                        background: 'none',
                                                        border: 'none',
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        fontFamily: 'inherit',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap:
                                                            typeof legendTokens
                                                                .item.gap ===
                                                            'string'
                                                                ? legendTokens
                                                                      .item.gap
                                                                : `${legendTokens.item.gap}px`,
                                                        transition:
                                                            'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
                                                    }}
                                                    _focusVisible={{
                                                        outline:
                                                            '3px solid #BEDBFF',
                                                        border: '1px solid #0561E2',
                                                        cursor: 'pointer',
                                                        outlineOffset: '2px',
                                                    }}
                                                >
                                                    <Block
                                                        width={
                                                            FOUNDATION_THEME
                                                                .unit[12]
                                                        }
                                                        height={
                                                            FOUNDATION_THEME
                                                                .unit[12]
                                                        }
                                                        borderRadius={
                                                            FOUNDATION_THEME
                                                                .border
                                                                .radius[4]
                                                        }
                                                        flexShrink={0}
                                                        backgroundColor={
                                                            itemColor
                                                        }
                                                        data-element="chart-legend-color"
                                                        data-id={itemColor}
                                                    />
                                                    {legend.total !==
                                                    undefined ? (
                                                        <>
                                                            {dataKey}
                                                            <span
                                                                style={{
                                                                    margin: '0 8px',
                                                                }}
                                                            >
                                                                |
                                                            </span>
                                                            {legend.total}
                                                        </>
                                                    ) : (
                                                        dataKey
                                                    )}
                                                </PrimitiveButton>
                                            ),
                                            onClick: () =>
                                                handleLegendClick(dataKey),
                                        }
                                    }
                                ),
                            },
                        ]}
                    />
                )}
            </Block>
            {selectedKeys &&
                selectedKeys.length > 0 &&
                selectedKeys.length !== displayLegends.length && (
                    <PrimitiveButton
                        type="button"
                        aria-label="Reset all legend filters"
                        onClick={() => setSelectedKeys([])}
                        style={{
                            fontSize: legendTokens.item.fontSize,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: FOUNDATION_THEME.colors.primary[600],
                            borderRadius: FOUNDATION_THEME.border.radius[4],
                            height: FOUNDATION_THEME.unit[20],
                            width: FOUNDATION_THEME.unit[20],
                            flexShrink: 0,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                        _hover={{
                            backgroundColor:
                                FOUNDATION_THEME.colors.primary[50],
                            color: FOUNDATION_THEME.colors.primary[700],
                        }}
                        _focusVisible={{
                            outline: '3px solid #BEDBFF',
                            border: '1px solid #0561E2',
                            cursor: 'pointer',
                            outlineOffset: '2px',
                        }}
                    >
                        <RotateCcw
                            style={{
                                width: '12px',
                                height: '12px',
                            }}
                            aria-hidden="true"
                        />
                    </PrimitiveButton>
                )}
        </Block>
    )
}

ChartLegendsComponent.displayName = 'ChartLegends'

export default React.memo(ChartLegendsComponent)
