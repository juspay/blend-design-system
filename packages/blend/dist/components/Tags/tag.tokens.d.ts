import { CSSObject } from 'styled-components'
import { ThemeType } from '../../tokens'
import { TagColor, TagShape, TagSize, TagVariant } from './types'
export type TagTokensType = Readonly<{
    background: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['color']
        }
    }
    color: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['color']
        }
    }
    borderColor: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['color']
        }
    }
    borderRadius: {
        [key in TagShape]: {
            [key in TagSize]: CSSObject['borderRadius']
        }
    }
    borderWidth: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['borderWidth']
        }
    }
    font: {
        [key in TagSize]: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
    }
    gap: {
        [key in TagSize]: CSSObject['gap']
    }
    padding: {
        [key in TagSize]: CSSObject['padding']
    }
    height: {
        [key in TagSize]: CSSObject['height']
    }
    slot: {
        size: {
            [key in TagSize]: CSSObject['width']
        }
    }
}>
declare const tagTokens: TagTokensType
export declare const getTagTokens: (foundationToken: ThemeType) => TagTokensType
export default tagTokens
