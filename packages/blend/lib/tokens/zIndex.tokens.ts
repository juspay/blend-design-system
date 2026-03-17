import type { CSSObject } from 'styled-components'

export type ZIndexTokensType = Readonly<{
    0: CSSObject['zIndex']
    9999: CSSObject['zIndex']
    1000: CSSObject['zIndex']
    1100: CSSObject['zIndex']
    1200: CSSObject['zIndex']
    101: CSSObject['zIndex']
    [key: string]: CSSObject['zIndex']
}>

const zIndexTokens: ZIndexTokensType = {
    0: 0,
    101: 101,
    9999: 9999,
    1000: 1000,
    1100: 1100,
    1200: 1200,
}

export default zIndexTokens
