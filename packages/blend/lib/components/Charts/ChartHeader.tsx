import { ChartHeaderProps } from './types'
import Block from '../../components/Primitives/Block/Block'
import { ChartTokensType } from './chart.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { ChevronsDownUp, Expand } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const ChartHeader: React.FC<ChartHeaderProps> = ({
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
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={headerTokens.gap}
            padding={headerTokens.padding[isSmallScreen ? 'sm' : 'lg']}
            paddingLeft={headerTokens.padding[isSmallScreen ? 'sm' : 'lg']}
            paddingRight={headerTokens.padding[isSmallScreen ? 'sm' : 'lg']}
            backgroundColor={headerTokens.backgroundColor}
            {...(isExpanded && {
                borderBottom: headerTokens.borderBottom,
            })}
            borderRadius={FOUNDATION_THEME.border.radius[8]}
            borderBottomLeftRadius={
                isExpanded
                    ? FOUNDATION_THEME.border.radius[0]
                    : FOUNDATION_THEME.border.radius[8]
            }
            borderBottomRightRadius={
                isExpanded
                    ? FOUNDATION_THEME.border.radius[0]
                    : FOUNDATION_THEME.border.radius[8]
            }
        >
            <Block>{chartHeaderSlot}</Block>
            <Block
                display="flex"
                alignItems="center"
                gap={headerTokens.gap}
                flexShrink={0}
            >
                {isSmallScreen ? (
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={FOUNDATION_THEME.unit[20]}
                        onClick={
                            isFullscreen ? onExitFullscreen : handleExpandClick
                        }
                    >
                        <Expand
                            size={18}
                            color={FOUNDATION_THEME.colors.gray[400]}
                            className="cursor-pointer"
                        />
                    </Block>
                ) : (
                    <>
                        {slot1}
                        {slot2}
                        {isFullscreen && (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={FOUNDATION_THEME.unit[20]}
                                onClick={
                                    isFullscreen
                                        ? onExitFullscreen
                                        : handleExpandClick
                                }
                            >
                                <Expand
                                    size={18}
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                    className="cursor-pointer"
                                />
                            </Block>
                        )}
                    </>
                )}
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <ChevronsDownUp
                        size={20}
                        color={FOUNDATION_THEME.colors.gray[400]}
                        cursor="pointer"
                    />
                </Block>
                {slot3}
            </Block>
        </Block>
    )
}

export default ChartHeader
