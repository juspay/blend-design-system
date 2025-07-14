import { CSSObject } from 'styled-components'
import { FoundationTokenType } from '../../tokens/theme.token'
export type ModalTokensType = {
    shadow: CSSObject['boxShadow']
    zIndex: CSSObject['zIndex']
    borderRadius: CSSObject['borderRadius']
    headerContainer: {
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        borderTop: CSSObject['borderTop']
        borderLeft: CSSObject['borderLeft']
        borderRight: CSSObject['borderRight']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: CSSObject['backgroundColor']
        header: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        subtitle: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
        }
    }
    bodyContainer: {
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        borderTop: CSSObject['borderTop']
        borderLeft: CSSObject['borderLeft']
        borderRight: CSSObject['borderRight']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: CSSObject['backgroundColor']
    }
    footerContainer: {
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        borderTop: CSSObject['borderTop']
        borderLeft: CSSObject['borderLeft']
        borderRight: CSSObject['borderRight']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: CSSObject['backgroundColor']
        alignItems: CSSObject['alignItems']
        gap: CSSObject['gap']
    }
}
export declare const modalTokens: ModalTokensType
export declare const getModalComponentTokens: (
    foundationToken: FoundationTokenType
) => ModalTokensType
export default modalTokens
