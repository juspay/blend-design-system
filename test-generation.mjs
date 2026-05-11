import { resolveBrandTokens } from '@blend-design/token-engine'

const tokens = resolveBrandTokens(
    {
        brandId: 'test',
        name: 'Test',
        version: '1.0.0',
    },
    'light'
)

console.log(
    'SNACKBARV2 has minWidth:',
    tokens.SNACKBARV2?.sm?.minWidth !== undefined
)
console.log('minWidth value:', tokens.SNACKBARV2?.sm?.minWidth)
console.log(
    'SNACKBARV2.sm keys:',
    Object.keys(tokens.SNACKBARV2?.sm || {}).slice(0, 10)
)
