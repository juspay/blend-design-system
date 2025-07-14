import { CSSObject } from 'styled-components'
import { StatCardVariant } from './types'
import { FoundationTokenType } from '../../tokens/theme.token'
export type StatCardState = 'default' | 'hover' | 'loading'
export type StatCardTokenType = {
    height: CSSObject['height']
    border: {
        [key in StatCardState]?: CSSObject['border']
    }
    borderRadius: CSSObject['borderRadius']
    backgroundColor: {
        [key in StatCardState]?: CSSObject['backgroundColor']
    }
    boxShadow: CSSObject['boxShadow']
    padding: CSSObject['padding']
    gap: CSSObject['gap']
    header: {
        gap: CSSObject['gap']
        titleIcon: {
            width: CSSObject['width']
            height: CSSObject['height']
            marginBottom: CSSObject['marginBottom']
        }
        title: {
            [key in StatCardVariant]: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
        helpIcon: {
            width: CSSObject['width']
            height: CSSObject['height']
            color: CSSObject['color']
        }
    }
    headerStatGap: {
        gap: CSSObject['gap']
    }
    stats: {
        gap: CSSObject['gap']
        value: {
            [key in StatCardVariant]: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
        change: {
            marginLeft: CSSObject['marginLeft']
            arrow: {
                width: CSSObject['width']
                height: CSSObject['height']
                marginRight: CSSObject['marginRight']
            }
            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                increase: {
                    color: CSSObject['color']
                }
                decrease: {
                    color: CSSObject['color']
                }
            }
        }
        subtitle: {
            [key in StatCardVariant]: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
    }
    chart: {
        height: CSSObject['height']
        colors: {
            line: {
                increase: CSSObject['color']
                decrease: CSSObject['color']
            }
            area: {
                increase: CSSObject['color']
                decrease: CSSObject['color']
            }
            gradient: {
                end: CSSObject['color']
                startOpacity: number
                endOpacity: number
            }
        }
        line: {
            strokeWidth: CSSObject['strokeWidth']
            activeDot: {
                radius: number
                fill: CSSObject['fill']
            }
        }
        bar: {
            radius: number[]
            fill: CSSObject['fill']
            activeBar: {
                fill: CSSObject['fill']
            }
        }
        progressBar: {
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            background: {
                fill: CSSObject['backgroundColor']
                empty: CSSObject['backgroundColor']
                pattern: {
                    color: CSSObject['color']
                    size: CSSObject['backgroundSize']
                }
            }
            label: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
        tooltip: {
            cursor: {
                strokeDasharray: string
                stroke: CSSObject['stroke']
            }
            container: {
                backgroundColor: CSSObject['backgroundColor']
                padding: CSSObject['padding']
                borderRadius: CSSObject['borderRadius']
            }
            text: {
                color: CSSObject['color']
            }
            bar: {
                cursor: {
                    fill: CSSObject['fill']
                }
            }
        }
    }
}
export declare const getStatCardToken: (
    foundationToken: FoundationTokenType
) => StatCardTokenType
