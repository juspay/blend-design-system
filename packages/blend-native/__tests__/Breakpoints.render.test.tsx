import { Text } from 'react-native'
import { render } from '@testing-library/react-native'
import {
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    FOUNDATION_THEME,
    getButtonV2Tokens,
    type ButtonV2TokensType,
} from '@juspay/blend-design-system/node'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { useNativeTokens } from '../src/theme/useNativeTokens'

/**
 * Regression: `BlendNativeProvider`'s `breakpoints` prop was stored in context
 * but never read — `useNativeTokens` called `useNativeBreakpoint()` bare, so a
 * consumer's breakpoint override silently resolved against the defaults.
 *
 * The probe reads a token leaf that genuinely differs between the `sm` and
 * `lg` breakpoint blocks; the guard assertion keeps the test honest if the
 * token values ever converge.
 */

const readLeaf = (tokens: ButtonV2TokensType) =>
    String(
        tokens.borderRadius[ButtonV2Size.LARGE][ButtonV2Type.PRIMARY][
            ButtonV2SubType.DEFAULT
        ]
    )

function Probe() {
    const tokens = useNativeTokens<ButtonV2TokensType>('BUTTONV2')
    return <Text testID="leaf">{readLeaf(tokens)}</Text>
}

const responsive = getButtonV2Tokens(FOUNDATION_THEME)
const smValue = readLeaf(responsive.sm as ButtonV2TokensType)
const lgValue = readLeaf(responsive.lg as ButtonV2TokensType)

describe('provider breakpoints override', () => {
    it('has a token leaf that distinguishes sm from lg', () => {
        // Guard: the probe below is meaningless if these ever converge.
        expect(smValue).not.toBe(lgValue)
    })

    it('resolves sm with default breakpoints at phone width', () => {
        // Jest's RN preset reports a 750pt-wide window: sm under defaults.
        const { getByTestId } = render(
            <BlendNativeProvider>
                <Probe />
            </BlendNativeProvider>
        )
        expect(getByTestId('leaf').props.children).toBe(smValue)
    })

    it('honours a breakpoints override from the provider', () => {
        // Same 750pt window, but lg now starts at 500 — must resolve lg.
        const { getByTestId } = render(
            <BlendNativeProvider breakpoints={{ sm: 320, lg: 500 }}>
                <Probe />
            </BlendNativeProvider>
        )
        expect(getByTestId('leaf').props.children).toBe(lgValue)
    })
})
