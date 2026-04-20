import { ChartLegendPosition, ChartsProps, ChartType } from './types'
import { ResponsiveContainer } from 'recharts'
import { DEFAULT_COLORS } from './utils'
import ChartHeader from './ChartHeader'
import ChartLegends from './ChartLegend'
import { useRef, useState, useEffect, useCallback, useId, useMemo } from 'react'
import { renderChart } from './renderChart'
import { transformNestedData } from './ChartUtils'
import Block from '../../components/Primitives/Block/Block'
import { ChartTokensType } from './chart.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { Button, ButtonSize, ButtonSubType, ButtonType } from '../Button'
import { ChevronDown } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import useScrollLock from '../../hooks/useScrollLock'
import { toPixels } from '../../global-utils/GlobalUtils'
import ChartsSkeleton from './ChartsSkeleton'

const Charts: React.FC<ChartsProps> = ({
    chartType = ChartType.LINE,
    data,
    colors,
    slot1,
    slot2,
    slot3,
    legendPosition = ChartLegendPosition.TOP,
    chartHeaderSlot,
    stackedLegends = false,
    stackedLegendsData,
    barsize,
    xAxis,
    yAxis,
    tooltip,
    noData,
    height = 400,
    showHeader = true,
    showCollapseIcon = true,
    isExpanded: isExpandedProp,
    onExpandedChange,
    chartName = 'Chart',
    skeleton,
    legends,
    CustomizedDot,
    lineSeriesKeys,
    ...props
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')
    const [isExpandedState, setIsExpandedState] = useState(true)

    const isExpanded =
        isExpandedProp !== undefined ? isExpandedProp : isExpandedState

    const setIsExpanded = useCallback(
        (value: boolean) => {
            if (isExpandedProp === undefined) {
                setIsExpandedState(value)
            }
            onExpandedChange?.(value)
        },
        [isExpandedProp, onExpandedChange]
    )

    const chartContainerRef = useRef<HTMLDivElement>(null!)
    const [hoveredKey, setHoveredKey] = useState<string | null>(null)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [showLegend, setShowLegend] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const legendContainerRef = useRef<HTMLDivElement>(null!)
    const [legendContainerHeight, setLegendContainerHeight] = useState(0)

    useScrollLock(isFullscreen)

    if (
        colors &&
        colors.length > 0 &&
        !colors.every(
            (item) => item && typeof item === 'object' && 'color' in item
        )
    ) {
        // If any object is missing 'color' key, add fallback color from DEFAULT_COLORS
        colors = colors.map((item, index) => {
            if (item && typeof item === 'object' && 'color' in item) {
                return item as { key: string; color: string }
            }
            const defaultColor = DEFAULT_COLORS[index % DEFAULT_COLORS.length]
            const itemKey =
                typeof item === 'object' && item && 'key' in item
                    ? (item as { key: string }).key
                    : String(index)
            return {
                key: itemKey,
                color: defaultColor.color,
            }
        })
    }
    if (!colors || colors.length === 0) colors = DEFAULT_COLORS
    const flattenedData = transformNestedData(data, selectedKeys)
    const lineKeys = data.length > 0 ? Object.keys(data[0].data) : []

    const mergedXAxis = {
        label: xAxis?.label,
        showLabel: xAxis?.showLabel ?? false,
        interval: xAxis?.interval,
        show: xAxis?.show ?? true,
        ...xAxis,
    }

    const mergedYAxis = {
        label: yAxis?.label,
        showLabel: yAxis?.showLabel ?? false,
        interval: yAxis?.interval,
        show: yAxis?.show ?? true,
        ...yAxis,
    }

    const baseId = useId()
    const chartId = `${baseId}-chart`
    const headerId = `${baseId}-header`
    const chartDescriptionId = `${baseId}-chart-description`

    const chartLabel = useMemo(() => {
        const parts: string[] = []
        if (chartHeaderSlot) {
            if (typeof chartHeaderSlot === 'string') {
                parts.push(chartHeaderSlot)
            } else if (
                chartHeaderSlot &&
                typeof chartHeaderSlot === 'object' &&
                'props' in chartHeaderSlot &&
                chartHeaderSlot.props &&
                typeof chartHeaderSlot.props === 'object' &&
                'children' in chartHeaderSlot.props
            ) {
                const children = chartHeaderSlot.props.children
                if (typeof children === 'string') {
                    parts.push(children)
                }
            }
        }
        if (xAxis?.label) {
            parts.push(`X-axis: ${xAxis.label}`)
        }
        if (yAxis?.label) {
            parts.push(`Y-axis: ${yAxis.label}`)
        }
        return parts.length > 0
            ? `${chartName} - ${parts.join(', ')}`
            : chartName
    }, [chartHeaderSlot, xAxis?.label, yAxis?.label, chartName])

    const chartDescription = useMemo(() => {
        const parts: string[] = []
        if (chartType) {
            parts.push(`${chartType} chart`)
        }
        if (data.length > 0) {
            parts.push(`showing ${data.length} data points`)
        }
        if (lineKeys.length > 0) {
            parts.push(`with ${lineKeys.length} series: ${lineKeys.join(', ')}`)
        }
        return parts.join(', ')
    }, [chartType, data.length, lineKeys])

    const isLargeScreen = () => {
        return window.innerWidth >= 1024
    }

    const isIOSOrSafari = () => {
        const userAgent = navigator.userAgent
        const isIOS = /iPad|iPhone|iPod/.test(userAgent)

        return isIOS
    }

    const handleFullscreen = useCallback(async () => {
        try {
            if (isLargeScreen()) {
                console.log(
                    'Fullscreen only available for small screens (<=786px)'
                )
                return
            }

            if (
                isIOSOrSafari() ||
                !document.documentElement.requestFullscreen
            ) {
                setIsFullscreen(true)

                if (screen.orientation && 'lock' in screen.orientation) {
                    try {
                        // Disabled eslint for this line because TypeScript doesn't have proper types for orientation lock yet
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (screen.orientation as any).lock('landscape')
                    } catch (err) {
                        console.log('Orientation lock not supported:', err)
                    }
                }

                setTimeout(() => {
                    window.scrollTo(0, 1)
                }, 100)

                return
            }

            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()

                // Disabled eslint for this line because TypeScript doesn't have proper types for orientation lock yet
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (screen.orientation && (screen.orientation as any).lock) {
                    try {
                        // Disabled eslint for this line because TypeScript doesn't have proper types for orientation lock yet
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (screen.orientation as any).lock('landscape')
                    } catch (err) {
                        console.log('Orientation lock not supported:', err)
                    }
                }

                setIsFullscreen(true)
            }
        } catch (err) {
            console.error('Error entering fullscreen:', err)
            alert('Error entering fullscreen:' + err)
            setIsFullscreen(true)
        }
    }, [])

    const handleExitFullscreen = useCallback(async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen()
            }

            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock()
            }

            setIsFullscreen(false)
        } catch (err) {
            console.error('Error exiting fullscreen:', err)
            setIsFullscreen(false)
        }
    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false)
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock()
                }
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullscreenChange
        )
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            )
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullscreenChange
            )
            document.removeEventListener(
                'mozfullscreenchange',
                handleFullscreenChange
            )
            document.removeEventListener(
                'MSFullscreenChange',
                handleFullscreenChange
            )
        }
    }, [])

    useEffect(() => {
        if (legendContainerRef.current) {
            setLegendContainerHeight(
                legendContainerRef.current?.offsetHeight || 0
            )
        }
    }, [showLegend])

    const renderFullscreenChart = () => (
        <Block
            position={'fixed'}
            top={'0'}
            left={'0'}
            width={'100vw'}
            height={'100vh'}
            zIndex={9999}
            display="flex"
            flexDirection="column"
            backgroundColor={chartTokens.content.backgroundColor}
            style={{
                transform: 'rotate(0deg)',
                transformOrigin: '0 0',
            }}
            {...props}
        >
            <Block
                ref={chartContainerRef}
                width="100%"
                height="100%"
                border={chartTokens.border}
                borderRadius={chartTokens.borderRadius}
                backgroundColor={chartTokens.content.backgroundColor}
            >
                {skeleton?.show ? (
                    <ChartsSkeleton
                        skeletonVariant={skeleton?.variant}
                        height={height}
                        isExpanded={isExpanded}
                    />
                ) : (
                    <>
                        {' '}
                        {showHeader && (
                            <ChartHeader
                                id={headerId}
                                slot1={slot1}
                                slot2={slot2}
                                slot3={slot3}
                                chartHeaderSlot={chartHeaderSlot}
                                onFullscreen={handleFullscreen}
                                onExitFullscreen={handleExitFullscreen}
                                isFullscreen={isFullscreen}
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                                showCollapseIcon={showCollapseIcon}
                            />
                        )}
                        {/* Hidden description for screen readers */}
                        <div
                            id={chartDescriptionId}
                            style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0, 0, 0, 0)',
                                whiteSpace: 'nowrap',
                            }}
                            aria-live="polite"
                        >
                            {chartDescription}
                        </div>
                        {showHorizontallyStackedLegends()
                            ? isExpanded && (
                                  <Block
                                      paddingTop={
                                          chartTokens.content.padding.top
                                      }
                                      paddingRight={
                                          chartTokens.content.padding.right
                                      }
                                      paddingBottom={
                                          chartTokens.content.padding.bottom
                                      }
                                      paddingLeft={
                                          chartTokens.content.padding.left
                                      }
                                      display="flex"
                                      flexDirection="column"
                                      gap={chartTokens.content.gap}
                                  >
                                      {
                                          <ChartLegends
                                              legends={legends}
                                              chartContainerRef={
                                                  chartContainerRef
                                              }
                                              keys={lineKeys}
                                              colors={colors}
                                              handleLegendClick={
                                                  handleLegendClick
                                              }
                                              handleLegendEnter={
                                                  handleLegendEnter
                                              }
                                              handleLegendLeave={
                                                  handleLegendLeave
                                              }
                                              selectedKeys={selectedKeys}
                                              setSelectedKeys={setSelectedKeys}
                                              hoveredKey={hoveredKey}
                                              activeKeys={selectedKeys}
                                              stacked={false}
                                          />
                                      }
                                      <Block
                                          display="flex"
                                          flexDirection="column"
                                          gap={chartTokens.content.gap}
                                          alignItems="center"
                                      >
                                          <div
                                              role="img"
                                              aria-label={chartLabel}
                                              aria-describedby={
                                                  chartDescriptionId
                                              }
                                              style={{
                                                  width: '100%',
                                                  height: '250px',
                                              }}
                                          >
                                              <ResponsiveContainer
                                                  width="100%"
                                                  height={250}
                                              >
                                                  {renderChart({
                                                      CustomizedDot,
                                                      flattenedData,
                                                      chartType,
                                                      hoveredKey,
                                                      lineKeys,
                                                      colors,
                                                      setHoveredKey,
                                                      data,
                                                      selectedKeys,
                                                      isSmallScreen: false,
                                                      barsize,
                                                      xAxis: mergedXAxis,
                                                      yAxis: {
                                                          ...mergedYAxis,
                                                          label: isSmallScreen
                                                              ? undefined
                                                              : mergedYAxis.label,
                                                          showLabel:
                                                              isSmallScreen
                                                                  ? false
                                                                  : mergedYAxis.showLabel,
                                                      },
                                                      tooltip,
                                                      noData,
                                                      onKeyClick:
                                                          handleLegendClick,
                                                      lineSeriesKeys,
                                                      height:
                                                          typeof height ===
                                                          'number'
                                                              ? height
                                                              : undefined,
                                                  })}
                                              </ResponsiveContainer>
                                          </div>
                                      </Block>
                                  </Block>
                              )
                            : isExpanded && (
                                  <Block
                                      paddingTop={
                                          chartTokens.content.padding.top
                                      }
                                      paddingRight={
                                          chartTokens.content.padding.right
                                      }
                                      paddingBottom={
                                          chartTokens.content.padding.bottom
                                      }
                                      paddingLeft={
                                          chartTokens.content.padding.left
                                      }
                                      display="flex"
                                      gap={chartTokens.content.gap}
                                  >
                                      <Block style={{ flex: 1, width: '100%' }}>
                                          <div
                                              role="img"
                                              aria-label={chartLabel}
                                              aria-describedby={
                                                  chartDescriptionId
                                              }
                                              style={{
                                                  width: '100%',
                                                  height: '300px',
                                              }}
                                          >
                                              <ResponsiveContainer
                                                  width="100%"
                                                  height={300}
                                              >
                                                  {renderChart({
                                                      CustomizedDot,
                                                      flattenedData,
                                                      chartType,
                                                      hoveredKey,
                                                      lineKeys,
                                                      colors,
                                                      setHoveredKey,
                                                      data,
                                                      selectedKeys,
                                                      isSmallScreen,
                                                      barsize,
                                                      xAxis: mergedXAxis,
                                                      yAxis: {
                                                          ...mergedYAxis,
                                                          label: isSmallScreen
                                                              ? undefined
                                                              : mergedYAxis.label,
                                                          showLabel:
                                                              isSmallScreen
                                                                  ? false
                                                                  : mergedYAxis.showLabel,
                                                      },
                                                      tooltip,
                                                      noData,
                                                      onKeyClick:
                                                          handleLegendClick,
                                                      lineSeriesKeys,
                                                      height:
                                                          typeof height ===
                                                          'number'
                                                              ? height
                                                              : undefined,
                                                  })}
                                              </ResponsiveContainer>
                                          </div>
                                      </Block>
                                      <Block
                                          width={'25%'}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                      >
                                          <ChartLegends
                                              legends={legends}
                                              chartContainerRef={
                                                  chartContainerRef
                                              }
                                              keys={lineKeys}
                                              colors={colors}
                                              handleLegendClick={
                                                  handleLegendClick
                                              }
                                              handleLegendEnter={
                                                  handleLegendEnter
                                              }
                                              handleLegendLeave={
                                                  handleLegendLeave
                                              }
                                              selectedKeys={selectedKeys}
                                              setSelectedKeys={setSelectedKeys}
                                              hoveredKey={hoveredKey}
                                              activeKeys={selectedKeys}
                                              stacked={true}
                                              stackedLegendsData={
                                                  stackedLegendsData
                                              }
                                          />
                                      </Block>
                                  </Block>
                              )}
                    </>
                )}
            </Block>
        </Block>
    )

    const handleLegendClick = (key: string) => {
        setSelectedKeys((prevActiveKeys) => {
            if (prevActiveKeys.includes(key)) {
                return prevActiveKeys.filter((k) => k !== key)
            } else {
                return [...prevActiveKeys, key]
            }
        })
    }

    const handleLegendEnter = (key: string) => {
        if (
            selectedKeys.length === 0 ||
            selectedKeys.length === lineKeys.length
        ) {
            setHoveredKey(key)
        }
    }

    const handleLegendLeave = () => {
        setHoveredKey(null)
    }

    const showHorizontallyStackedLegends = () => {
        return !(
            chartType === ChartType.PIE &&
            legendPosition === ChartLegendPosition.RIGHT
        )
    }

    return (
        <>
            <Block
                ref={chartContainerRef}
                id={chartId}
                width="100%"
                height="100%"
                border={chartTokens.border}
                borderRadius={chartTokens.borderRadius}
                role="region"
                aria-label={chartLabel}
                aria-labelledby={headerId}
                aria-describedby={chartDescriptionId}
                {...props}
                data-chart={chartType || 'Chart'}
            >
                {skeleton?.show ? (
                    <ChartsSkeleton
                        skeletonVariant={skeleton?.variant}
                        height={height}
                        isExpanded={isExpanded}
                    />
                ) : (
                    <>
                        {showHeader && (
                            <ChartHeader
                                id={headerId}
                                slot1={slot1}
                                slot2={slot2}
                                slot3={slot3}
                                chartHeaderSlot={chartHeaderSlot}
                                onFullscreen={handleFullscreen}
                                isSmallScreen={isSmallScreen}
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                                showCollapseIcon={showCollapseIcon}
                            />
                        )}
                        {/* Hidden description for screen readers */}
                        <div
                            id={chartDescriptionId}
                            style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0, 0, 0, 0)',
                                whiteSpace: 'nowrap',
                            }}
                            aria-live="polite"
                        >
                            {chartDescription}
                        </div>
                        {showHorizontallyStackedLegends()
                            ? isExpanded && (
                                  <Block
                                      paddingTop={
                                          chartTokens.content.padding.top
                                      }
                                      paddingRight={
                                          chartTokens.content.padding.right
                                      }
                                      paddingBottom={
                                          chartTokens.content.padding.bottom
                                      }
                                      paddingLeft={
                                          chartTokens.content.padding.left
                                      }
                                      display="flex"
                                      flexDirection="column"
                                      gap={chartTokens.content.gap}
                                      height={
                                          (height || 400) +
                                          legendContainerHeight +
                                          toPixels(chartTokens.content.gap) +
                                          toPixels(
                                              chartTokens.content.padding.top
                                          ) +
                                          toPixels(
                                              chartTokens.content.padding.bottom
                                          )
                                      }
                                  >
                                      {!isSmallScreen && (
                                          <Block ref={legendContainerRef}>
                                              <ChartLegends
                                                  legends={legends}
                                                  chartContainerRef={
                                                      chartContainerRef
                                                  }
                                                  keys={lineKeys}
                                                  colors={colors}
                                                  handleLegendClick={
                                                      handleLegendClick
                                                  }
                                                  handleLegendEnter={
                                                      handleLegendEnter
                                                  }
                                                  handleLegendLeave={
                                                      handleLegendLeave
                                                  }
                                                  selectedKeys={selectedKeys}
                                                  setSelectedKeys={
                                                      setSelectedKeys
                                                  }
                                                  hoveredKey={hoveredKey}
                                                  activeKeys={selectedKeys}
                                                  stacked={false}
                                              />
                                          </Block>
                                      )}
                                      <Block
                                          display="flex"
                                          flexDirection="column"
                                          alignItems="center"
                                          height={height || 400}
                                      >
                                          <div
                                              role="img"
                                              aria-label={chartLabel}
                                              aria-describedby={
                                                  chartDescriptionId
                                              }
                                              style={{
                                                  width: '100%',
                                                  height: '100%',
                                              }}
                                          >
                                              <ResponsiveContainer
                                                  width="100%"
                                                  height={'100%'}
                                                  //   height="100%"
                                                  //   height={'auto'}
                                              >
                                                  {renderChart({
                                                      CustomizedDot,
                                                      chartName,
                                                      flattenedData,
                                                      chartType,
                                                      hoveredKey,
                                                      lineKeys,
                                                      colors,
                                                      setHoveredKey,
                                                      data,
                                                      selectedKeys,
                                                      isSmallScreen,
                                                      barsize,
                                                      xAxis: mergedXAxis,
                                                      yAxis: {
                                                          ...mergedYAxis,
                                                          label: isSmallScreen
                                                              ? undefined
                                                              : mergedYAxis.label,
                                                          showLabel:
                                                              isSmallScreen
                                                                  ? false
                                                                  : mergedYAxis.showLabel,
                                                      },
                                                      tooltip,
                                                      noData,
                                                      onKeyClick:
                                                          handleLegendClick,
                                                      lineSeriesKeys,
                                                      height:
                                                          typeof height ===
                                                          'number'
                                                              ? height
                                                              : undefined,
                                                  })}
                                              </ResponsiveContainer>
                                          </div>
                                          {isSmallScreen && (
                                              <Block
                                                  display="flex"
                                                  flexDirection="column"
                                                  gap={
                                                      chartTokens.content.legend
                                                          .gap
                                                  }
                                                  width={'100%'}
                                                  ref={legendContainerRef}
                                              >
                                                  {(showLegend ||
                                                      !stackedLegends) && (
                                                      <ChartLegends
                                                          legends={legends}
                                                          isSmallScreen={
                                                              isSmallScreen
                                                          }
                                                          chartContainerRef={
                                                              chartContainerRef
                                                          }
                                                          keys={lineKeys}
                                                          colors={colors}
                                                          handleLegendClick={
                                                              handleLegendClick
                                                          }
                                                          handleLegendEnter={
                                                              handleLegendEnter
                                                          }
                                                          handleLegendLeave={
                                                              handleLegendLeave
                                                          }
                                                          selectedKeys={
                                                              selectedKeys
                                                          }
                                                          setSelectedKeys={
                                                              setSelectedKeys
                                                          }
                                                          hoveredKey={
                                                              hoveredKey
                                                          }
                                                          activeKeys={
                                                              selectedKeys
                                                          }
                                                          stacked={
                                                              stackedLegends
                                                          }
                                                          stackedLegendsData={
                                                              stackedLegendsData
                                                          }
                                                      />
                                                  )}
                                                  {stackedLegends && (
                                                      <Block
                                                          display="flex"
                                                          alignItems="center"
                                                          justifyContent="center"
                                                      >
                                                          <Button
                                                              buttonType={
                                                                  ButtonType.SECONDARY
                                                              }
                                                              subType={
                                                                  ButtonSubType.INLINE
                                                              }
                                                              size={
                                                                  ButtonSize.SMALL
                                                              }
                                                              text={
                                                                  showLegend
                                                                      ? 'Hide Legend'
                                                                      : 'Show Legend'
                                                              }
                                                              trailingIcon={
                                                                  <ChevronDown
                                                                      color={
                                                                          FOUNDATION_THEME
                                                                              .colors
                                                                              .gray[400]
                                                                      }
                                                                      size={14}
                                                                      style={{
                                                                          transform:
                                                                              showLegend
                                                                                  ? 'rotate(180deg)'
                                                                                  : 'rotate(0deg)',
                                                                          transition:
                                                                              'transform 0.3s ease-in-out',
                                                                      }}
                                                                  />
                                                              }
                                                              onClick={() => {
                                                                  setShowLegend(
                                                                      !showLegend
                                                                  )
                                                              }}
                                                          />
                                                      </Block>
                                                  )}
                                              </Block>
                                          )}
                                      </Block>
                                  </Block>
                              )
                            : isExpanded && (
                                  <Block
                                      paddingTop={
                                          chartTokens.content.padding.top
                                      }
                                      paddingRight={
                                          chartTokens.content.padding.right
                                      }
                                      paddingBottom={
                                          chartTokens.content.padding.bottom
                                      }
                                      paddingLeft={
                                          chartTokens.content.padding.left
                                      }
                                      display="flex"
                                      gap={chartTokens.content.gap}
                                  >
                                      <Block
                                          style={{
                                              flex: 1,
                                              width: '100%',
                                              height: height || 400,
                                          }}
                                      >
                                          <div
                                              role="img"
                                              aria-label={chartLabel}
                                              aria-describedby={
                                                  chartDescriptionId
                                              }
                                              style={{
                                                  width: '100%',
                                                  height: '100%',
                                              }}
                                          >
                                              <ResponsiveContainer
                                                  width="100%"
                                                  height={'100%'}
                                              >
                                                  {renderChart({
                                                      CustomizedDot,
                                                      flattenedData,
                                                      chartType,
                                                      hoveredKey,
                                                      lineKeys,
                                                      colors,
                                                      setHoveredKey,
                                                      data,
                                                      selectedKeys,
                                                      isSmallScreen,
                                                      barsize,
                                                      xAxis: mergedXAxis,
                                                      yAxis: {
                                                          ...mergedYAxis,
                                                          label: isSmallScreen
                                                              ? undefined
                                                              : mergedYAxis.label,
                                                          showLabel:
                                                              isSmallScreen
                                                                  ? false
                                                                  : mergedYAxis.showLabel,
                                                      },
                                                      tooltip,
                                                      noData,
                                                      onKeyClick:
                                                          handleLegendClick,
                                                      lineSeriesKeys,
                                                      height:
                                                          typeof height ===
                                                          'number'
                                                              ? height
                                                              : undefined,
                                                  })}
                                              </ResponsiveContainer>
                                          </div>
                                      </Block>
                                      <Block
                                          width={'25%'}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                      >
                                          <ChartLegends
                                              legends={legends}
                                              chartContainerRef={
                                                  chartContainerRef
                                              }
                                              keys={lineKeys}
                                              colors={colors}
                                              handleLegendClick={
                                                  handleLegendClick
                                              }
                                              handleLegendEnter={
                                                  handleLegendEnter
                                              }
                                              handleLegendLeave={
                                                  handleLegendLeave
                                              }
                                              selectedKeys={selectedKeys}
                                              setSelectedKeys={setSelectedKeys}
                                              hoveredKey={hoveredKey}
                                              activeKeys={selectedKeys}
                                              stacked={true}
                                              stackedLegendsData={
                                                  stackedLegendsData
                                              }
                                          />
                                      </Block>
                                  </Block>
                              )}
                    </>
                )}
            </Block>
            {isFullscreen && renderFullscreenChart()}
        </>
    )
}

Charts.displayName = 'Charts'

export default Charts
