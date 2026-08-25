import { render } from '@testing-library/react-native'
import { FOUNDATION_THEME, Theme } from '@juspay/blend-design-system/node'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Text } from '../src/primitives/Text'
import { Tag } from '../src/components/Tag'

/**
 * Render coverage for the provider-level platform policies:
 *
 * - the font-family map reaching `Text` (RN's replacement for web's CSS
 *   font inheritance),
 * - `theme="system"` resolving against the OS appearance,
 * - the font-scaling policy (`minHeight`, scaling left ON).
 */

// `useColorScheme` reads internal Appearance state that spying on
// `Appearance.getColorScheme` does not reach — mock the hook's module, which
// `react-native`'s barrel re-exports. `jest.mock` is hoisted above imports.
const mockColorScheme = jest.fn<'light' | 'dark' | null, []>(() => 'light')
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    __esModule: true,
    default: () => mockColorScheme(),
}))

const BODY_FAMILY = String(FOUNDATION_THEME.font.family.body)

const flatten = (style: unknown) =>
    Object.assign({}, ...(Array.isArray(style) ? style.flat() : [style]))

describe('font family policy', () => {
    it('applies the token body family by default', () => {
        const { getByTestId } = render(
            <BlendNativeProvider>
                <Text testID="t">hello</Text>
            </BlendNativeProvider>
        )
        expect(flatten(getByTestId('t').props.style).fontFamily).toBe(
            BODY_FAMILY
        )
    })

    it('applies the family with no provider mounted (defaults)', () => {
        const { getByTestId } = render(<Text testID="t">hello</Text>)
        expect(flatten(getByTestId('t').props.style).fontFamily).toBe(
            BODY_FAMILY
        )
    })

    it("emits no family when the provider opts into 'system'", () => {
        const { getByTestId } = render(
            <BlendNativeProvider fontFamily="system">
                <Text testID="t">hello</Text>
            </BlendNativeProvider>
        )
        expect(flatten(getByTestId('t').props.style).fontFamily).toBeUndefined()
    })

    it('an explicit fontFamily prop wins over the map', () => {
        const { getByTestId } = render(
            <BlendNativeProvider>
                <Text testID="t" fontFamily="SpaceMono">
                    hello
                </Text>
            </BlendNativeProvider>
        )
        expect(flatten(getByTestId('t').props.style).fontFamily).toBe(
            'SpaceMono'
        )
    })

    it('components inherit the family through the provider', () => {
        const { getByText } = render(
            <BlendNativeProvider>
                <Tag text="Beta" />
            </BlendNativeProvider>
        )
        expect(flatten(getByText('Beta').props.style).fontFamily).toBe(
            BODY_FAMILY
        )
    })
})

describe('theme="system"', () => {
    afterEach(() => mockColorScheme.mockReturnValue('light'))

    /** A leaf whose value differs between the light and dark factories. */
    const probeTagBackground = (element: { props: { style: unknown } }) =>
        flatten(element.props.style).backgroundColor

    it('resolves dark tokens when the OS is dark', () => {
        mockColorScheme.mockReturnValue('dark')
        const { getByTestId: q } = render(
            <BlendNativeProvider theme="system">
                <Tag text="Beta" testID="sys" />
            </BlendNativeProvider>
        )
        const { getByTestId: qDark } = render(
            <BlendNativeProvider theme={Theme.DARK}>
                <Tag text="Beta" testID="dark" />
            </BlendNativeProvider>
        )
        expect(probeTagBackground(q('sys'))).toBe(
            probeTagBackground(qDark('dark'))
        )
    })

    it('resolves light tokens when the OS is light', () => {
        mockColorScheme.mockReturnValue('light')
        const { getByTestId: q } = render(
            <BlendNativeProvider theme="system">
                <Tag text="Beta" testID="sys" />
            </BlendNativeProvider>
        )
        const { getByTestId: qLight } = render(
            <BlendNativeProvider theme={Theme.LIGHT}>
                <Tag text="Beta" testID="light" />
            </BlendNativeProvider>
        )
        expect(probeTagBackground(q('sys'))).toBe(
            probeTagBackground(qLight('light'))
        )
    })
})

describe('font scaling policy', () => {
    it('sizes Tag with minHeight, never a fixed height', () => {
        const { getByTestId } = render(
            <BlendNativeProvider>
                <Tag text="Beta" testID="tag" />
            </BlendNativeProvider>
        )
        const style = flatten(getByTestId('tag').props.style)
        expect(style.minHeight).toBeGreaterThan(0)
        expect(style.height).toBeUndefined()
    })

    it('leaves font scaling enabled on Text', () => {
        const { getByTestId } = render(<Text testID="t">hello</Text>)
        // RN's default is true; the policy is to not override it.
        expect(getByTestId('t').props.allowFontScaling).not.toBe(false)
    })
})
