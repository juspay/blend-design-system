import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type ChartV3TokensType = {
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    backgroundColor: CSSObject['backgroundColor']
    header: {
        padding: {
            top: CSSObject['padding']
            right: CSSObject['padding']
            bottom: CSSObject['padding']
            left: CSSObject['padding']
        }
        backgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
    }
    legends: {
        gap: CSSObject['gap']
        legendItem: {
            gap: CSSObject['gap']
            shape: {
                width: CSSObject['width']
                height: CSSObject['height']
                borderRadius: CSSObject['borderRadius']
            }
            text: {
                gap: CSSObject['gap']
                name: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                    color: CSSObject['color']
                }
                value: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                    color: CSSObject['color']
                }
                separator: {
                    color: CSSObject['color']
                    width: CSSObject['width']
                    height: CSSObject['height']
                }
            }
        }
    }
    chart: {
        backgroundColor: CSSObject['backgroundColor']
        xAxis: {
            title: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            labels: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            line: {
                width: CSSObject['width']
                color: CSSObject['color']
            }
            gridLine: {
                width: CSSObject['width']
                color: CSSObject['color']
            }
        }
        yAxis: {
            title: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            labels: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            line: {
                width: CSSObject['width']
                color: CSSObject['color']
            }
            gridLine: {
                width: CSSObject['width']
                color: CSSObject['color']
            }
        }
    }
}

export type ResponsiveChartV3Tokens = {
    [key in keyof BreakpointType]: ChartV3TokensType
}
