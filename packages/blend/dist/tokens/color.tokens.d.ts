import { CSSObject } from 'styled-components'
type ColorGroupType = Readonly<{
    [key: string]: CSSObject['color']
}>
export type ColorTokensType = {
    gray: ColorGroupType
    primary: ColorGroupType
    purple: ColorGroupType
    orange: ColorGroupType
    red: ColorGroupType
    green: ColorGroupType
    yellow: ColorGroupType
    [key: string]: ColorGroupType
}
declare const colorTokens: ColorTokensType
export default colorTokens
