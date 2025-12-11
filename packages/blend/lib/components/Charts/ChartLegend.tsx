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
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'

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
    const legendTokens = chartTokens.content.legend

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
            typeof legendTokens.gap === 'string'
                ? parseFloat(legendTokens.gap)
                : (legendTokens.gap as number) || 16

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
    }, [keys.length, legendTokens.gap])

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
            gap={legendTokens.gap}
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
                gap={legendTokens.gap}
            >
                {keys.slice(0, cuttOffIndex).map((dataKey, index) => (
                    <PrimitiveButton
                        type="button"
                        key={dataKey}
                        data-chart-legend={capitaliseCamelCase(dataKey)}
                        aria-label={`Toggle ${capitaliseCamelCase(dataKey)} series visibility`}
                        aria-pressed={selectedKeys.includes(dataKey)}
                        onClick={() => handleLegendClick(dataKey)}
                        onMouseEnter={() => handleLegendEnter(dataKey)}
                        onMouseLeave={handleLegendLeave}
                        onFocus={() => handleLegendEnter(dataKey)}
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
                            borderRadius={FOUNDATION_THEME.border.radius[4]}
                            flexShrink={0}
                            backgroundColor={colors[index]}
                            data-color={colors[index]}
                        />
                        <Text
                            fontSize={legendTokens.item.fontSize}
                            fontWeight={legendTokens.item.fontWeight}
                            truncate={true}
                            color={legendTokens.item.color.default}
                            data-chart-legend-text={capitaliseCamelCase(
                                dataKey
                            )}
                        >
                            {capitaliseCamelCase(dataKey)}
                        </Text>
                    </PrimitiveButton>
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
                                    <PrimitiveButton
                                        type="button"
                                        key={dataKey}
                                        aria-label={`Toggle ${capitaliseCamelCase(dataKey)} series visibility`}
                                        aria-pressed={selectedKeys.includes(
                                            dataKey
                                        )}
                                        onClick={() =>
                                            handleLegendClick(dataKey)
                                        }
                                        _hover={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[50],
                                        }}
                                        _focus={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[50],
                                        }}
                                        onFocus={() =>
                                            handleLegendEnter(dataKey)
                                        }
                                        onBlur={handleLegendLeave}
                                        data-chart-legend-text={capitaliseCamelCase(
                                            dataKey
                                        )}
                                        style={{
                                            padding: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
                                            fontSize:
                                                legendTokens.item.fontSize,
                                            color: String(
                                                legendTokens.item.color
                                                    .default || 'inherit'
                                            ),
                                            cursor: 'pointer',
                                            opacity: getItemOpacity(dataKey),
                                            background: 'none',
                                            border: 'none',
                                            width: '100%',
                                            textAlign: 'left',
                                            fontFamily: 'inherit',
                                        }}
                                        _focusVisible={{
                                            outline: '3px solid #BEDBFF',
                                            border: '1px solid #0561E2',
                                            cursor: 'pointer',
                                            outlineOffset: '2px',
                                        }}
                                    >
                                        {capitaliseCamelCase(dataKey)}
                                    </PrimitiveButton>
                                ))}
                            </Block>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </Block>
            {selectedKeys &&
                selectedKeys.length > 0 &&
                selectedKeys.length !== keys.length && (
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
            {keys.map((key, index) => (
                <Block
                    key={key}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={FOUNDATION_THEME.unit[8]}
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
                    <PrimitiveButton
                        type="button"
                        key={key}
                        data-chart-legend={capitaliseCamelCase(key)}
                        aria-label={`Toggle ${capitaliseCamelCase(key)} series visibility`}
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
                            backgroundColor={colors[index]}
                            width={FOUNDATION_THEME.unit[12]}
                            height={FOUNDATION_THEME.unit[12]}
                            borderRadius={FOUNDATION_THEME.border.radius[4]}
                            flexShrink={0}
                            data-color={colors[index]}
                        />
                        <Text
                            data-chart-legend-text={capitaliseCamelCase(key)}
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
