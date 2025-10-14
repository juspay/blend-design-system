import { ChartLegendPosition, ChartsProps, ChartType } from './types'
import { ResponsiveContainer } from 'recharts'
import { DEFAULT_COLORS } from './utils'
import ChartHeader from './ChartHeader'
import ChartLegends from './ChartLegend'
import { useRef, useState, useEffect, useCallback } from 'react'
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
    noData,
    height = 400,
    showHeader = true,
    showCollapseIcon = true,
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')
    const [isExpanded, setIsExpanded] = useState(true)

    const chartContainerRef = useRef<HTMLDivElement>(null!)
    const [hoveredKey, setHoveredKey] = useState<string | null>(null)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [showLegend, setShowLegend] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useScrollLock(isFullscreen)

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

    const renderFullscreenChart = () => (
        <Block
            position={chartTokens.fullscreen.container.position}
            top={chartTokens.fullscreen.container.top}
            left={chartTokens.fullscreen.container.left}
            width={chartTokens.fullscreen.container.width}
            height={chartTokens.fullscreen.container.height}
            zIndex={chartTokens.fullscreen.container.zIndex}
            display="flex"
            flexDirection="column"
            backgroundColor={chartTokens.fullscreen.container.backgroundColor}
            style={{
                transform: chartTokens.fullscreen.container.transform,
                transformOrigin:
                    chartTokens.fullscreen.container.transformOrigin,
            }}
        >
            <Block
                ref={chartContainerRef}
                width="100%"
                height="100%"
                border={chartTokens.container.border.container.fullscreen}
                borderRadius={chartTokens.container.borderRadius.fullscreen}
                backgroundColor={
                    chartTokens.container.backgroundColor.fullscreen
                }
            >
                {showHeader && (
                    <ChartHeader
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
                {showHorizontallyStackedLegends()
                    ? isExpanded && (
                          <Block
                              padding={chartTokens.content.padding}
                              display="flex"
                              flexDirection="column"
                              gap={chartTokens.content.gap.lg}
                          >
                              {
                                  <ChartLegends
                                      chartContainerRef={chartContainerRef}
                                      keys={lineKeys}
                                      colors={colors}
                                      handleLegendClick={handleLegendClick}
                                      handleLegendEnter={handleLegendEnter}
                                      handleLegendLeave={handleLegendLeave}
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
                                  gap={chartTokens.content.gap.lg}
                                  alignItems="center"
                              >
                                  <ResponsiveContainer
                                      width="100%"
                                      height={
                                          chartTokens.fullscreen.content.height
                                      }
                                  >
                                      {renderChart({
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
                                              showLabel: isSmallScreen
                                                  ? false
                                                  : mergedYAxis.showLabel,
                                          },
                                          noData,
                                      })}
                                  </ResponsiveContainer>
                              </Block>
                          </Block>
                      )
                    : isExpanded && (
                          <Block
                              padding={chartTokens.content.padding}
                              display="flex"
                              gap={chartTokens.content.gap.lg}
                          >
                              <Block style={{ flex: 1, width: '100%' }}>
                                  <ResponsiveContainer
                                      width="100%"
                                      height={
                                          chartTokens.content.height.default
                                      }
                                  >
                                      {renderChart({
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
                                              showLabel: isSmallScreen
                                                  ? false
                                                  : mergedYAxis.showLabel,
                                          },
                                          noData,
                                      })}
                                  </ResponsiveContainer>
                              </Block>
                              <Block
                                  width={
                                      chartTokens.legend.width[
                                          ChartLegendPosition.RIGHT
                                      ]
                                  }
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                              >
                                  <ChartLegends
                                      chartContainerRef={chartContainerRef}
                                      keys={lineKeys}
                                      colors={colors}
                                      handleLegendClick={handleLegendClick}
                                      handleLegendEnter={handleLegendEnter}
                                      handleLegendLeave={handleLegendLeave}
                                      selectedKeys={selectedKeys}
                                      setSelectedKeys={setSelectedKeys}
                                      hoveredKey={hoveredKey}
                                      activeKeys={selectedKeys}
                                      stacked={true}
                                      stackedLegendsData={stackedLegendsData}
                                  />
                              </Block>
                          </Block>
                      )}
            </Block>
        </Block>
    )

    const handleLegendClick = (key: string) => {
        if (chartType === ChartType.PIE) return
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
                width="100%"
                height="100%"
                border={chartTokens.container.border.container.default}
                borderRadius={chartTokens.container.borderRadius.default}
                backgroundColor={chartTokens.container.backgroundColor.default}
            >
                {showHeader && (
                    <ChartHeader
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
                {showHorizontallyStackedLegends()
                    ? isExpanded && (
                          <Block
                              padding={chartTokens.content.padding}
                              display="flex"
                              flexDirection="column"
                              gap={
                                  chartTokens.content.gap[
                                      isSmallScreen ? 'sm' : 'lg'
                                  ]
                              }
                          >
                              {!isSmallScreen && (
                                  <Block>
                                      <ChartLegends
                                          chartContainerRef={chartContainerRef}
                                          keys={lineKeys}
                                          colors={colors}
                                          handleLegendClick={handleLegendClick}
                                          handleLegendEnter={handleLegendEnter}
                                          handleLegendLeave={handleLegendLeave}
                                          selectedKeys={selectedKeys}
                                          setSelectedKeys={setSelectedKeys}
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
                              >
                                  <ResponsiveContainer
                                      width="100%"
                                      height={
                                          height ||
                                          chartTokens.content.height.default
                                      }
                                      //   height="100%"
                                      //   height={'auto'}
                                  >
                                      {renderChart({
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
                                              showLabel: isSmallScreen
                                                  ? false
                                                  : mergedYAxis.showLabel,
                                          },
                                          noData,
                                      })}
                                  </ResponsiveContainer>
                                  {isSmallScreen && (
                                      <Block
                                          display="flex"
                                          flexDirection="column"
                                          gap={chartTokens.legend.gap.lg}
                                          width={'100%'}
                                      >
                                          {(showLegend || !stackedLegends) && (
                                              <ChartLegends
                                                  isSmallScreen={isSmallScreen}
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
                                                  stacked={stackedLegends}
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
                                                      size={ButtonSize.SMALL}
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
                              padding={chartTokens.content.padding}
                              display="flex"
                              gap={
                                  chartTokens.content.gap[
                                      isSmallScreen ? 'sm' : 'lg'
                                  ]
                              }
                          >
                              <Block style={{ flex: 1, width: '100%' }}>
                                  <ResponsiveContainer
                                      width="100%"
                                      height={
                                          chartTokens.content.height.default
                                      }
                                  >
                                      {renderChart({
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
                                              showLabel: isSmallScreen
                                                  ? false
                                                  : mergedYAxis.showLabel,
                                          },
                                          noData,
                                      })}
                                  </ResponsiveContainer>
                              </Block>
                              <Block
                                  width={
                                      chartTokens.legend.width[
                                          ChartLegendPosition.RIGHT
                                      ]
                                  }
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                              >
                                  <ChartLegends
                                      chartContainerRef={chartContainerRef}
                                      keys={lineKeys}
                                      colors={colors}
                                      handleLegendClick={handleLegendClick}
                                      handleLegendEnter={handleLegendEnter}
                                      handleLegendLeave={handleLegendLeave}
                                      selectedKeys={selectedKeys}
                                      setSelectedKeys={setSelectedKeys}
                                      hoveredKey={hoveredKey}
                                      activeKeys={selectedKeys}
                                      stacked={true}
                                      stackedLegendsData={stackedLegendsData}
                                  />
                              </Block>
                          </Block>
                      )}
            </Block>
            {isFullscreen && renderFullscreenChart()}
        </>
    )
}

Charts.displayName = 'Charts'

export default Charts
