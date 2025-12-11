import { ChartHeaderProps } from './types'
import Block from '../../components/Primitives/Block/Block'
import { ChartTokensType } from './chart.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { ChevronsDownUp, Expand } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'

const ChartHeader: React.FC<ChartHeaderProps> = ({
    id,
    slot1,
    slot2,
    slot3,
    chartHeaderSlot,
    onFullscreen,
    onExitFullscreen,
    isFullscreen,
    isSmallScreen = false,
    isExpanded,
    setIsExpanded,
    showCollapseIcon,
}) => {
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')
    const headerTokens = chartTokens.header

    const handleExpandClick = () => {
        if (onFullscreen) {
            onFullscreen()
        }
    }

    return (
        <Block
            id={id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={FOUNDATION_THEME.unit[12]}
            paddingX={headerTokens.padding.x}
            paddingY={headerTokens.padding.y}
            backgroundColor={headerTokens.backgroundColor}
            {...(isExpanded && {
                borderBottom: headerTokens.borderBottom,
            })}
            borderRadius={headerTokens.borderRadius}
            borderBottomLeftRadius={
                isExpanded
                    ? FOUNDATION_THEME.border.radius[0]
                    : headerTokens.borderRadius
            }
            borderBottomRightRadius={
                isExpanded
                    ? FOUNDATION_THEME.border.radius[0]
                    : headerTokens.borderRadius
            }
            role="group"
            aria-label="Chart header"
        >
            <Block>{chartHeaderSlot}</Block>
            <Block
                display="flex"
                alignItems="center"
                gap={headerTokens.slots.gap}
                flexShrink={0}
            >
                {isSmallScreen ? (
                    <PrimitiveButton
                        type="button"
                        aria-label={
                            isFullscreen
                                ? 'Exit fullscreen view'
                                : 'Enter fullscreen view'
                        }
                        onClick={
                            isFullscreen ? onExitFullscreen : handleExpandClick
                        }
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: FOUNDATION_THEME.unit[20],
                            height: FOUNDATION_THEME.unit[20],
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                        _focusVisible={{
                            outline: '3px solid #BEDBFF',
                            border: '1px solid #0561E2',
                            cursor: 'pointer',
                            outlineOffset: '2px',
                        }}
                    >
                        <Expand
                            size={18}
                            color={FOUNDATION_THEME.colors.gray[400]}
                            aria-hidden="true"
                        />
                    </PrimitiveButton>
                ) : (
                    <>
                        {slot1 && <Block aria-hidden="true">{slot1}</Block>}
                        {slot2 && <Block aria-hidden="true">{slot2}</Block>}
                        {isFullscreen && (
                            <PrimitiveButton
                                type="button"
                                aria-label={
                                    isFullscreen
                                        ? 'Exit fullscreen view'
                                        : 'Enter fullscreen view'
                                }
                                onClick={
                                    isFullscreen
                                        ? onExitFullscreen
                                        : handleExpandClick
                                }
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: FOUNDATION_THEME.unit[20],
                                    height: FOUNDATION_THEME.unit[20],
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                                _focusVisible={{
                                    outline: '3px solid #BEDBFF',
                                    border: '1px solid #0561E2',
                                    cursor: 'pointer',
                                    outlineOffset: '2px',
                                }}
                            >
                                <Expand
                                    size={18}
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                    aria-hidden="true"
                                />
                            </PrimitiveButton>
                        )}
                    </>
                )}
                {showCollapseIcon && (
                    <PrimitiveButton
                        type="button"
                        aria-label={
                            isExpanded ? 'Collapse chart' : 'Expand chart'
                        }
                        aria-expanded={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                        _focusVisible={{
                            outline: '3px solid #BEDBFF',
                            border: '1px solid #0561E2',
                            cursor: 'pointer',
                            outlineOffset: '2px',
                        }}
                    >
                        <ChevronsDownUp
                            size={20}
                            color={FOUNDATION_THEME.colors.gray[400]}
                            aria-hidden="true"
                        />
                    </PrimitiveButton>
                )}
                {slot3}
            </Block>
        </Block>
    )
}

export default ChartHeader
