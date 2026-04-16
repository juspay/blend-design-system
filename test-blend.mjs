import {
    getSnackbarV2Tokens,
    FOUNDATION_THEME,
    Theme,
} from '@juspay/blend-design-system/node'

const tokens = getSnackbarV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
console.log('Has minWidth:', 'minWidth' in tokens.sm)
console.log('minWidth value:', tokens.sm.minWidth)
console.log('Keys:', Object.keys(tokens.sm))
