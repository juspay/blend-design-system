import { useMemo } from 'react'
import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenOverrides } from './ThemeContext'
import { Theme } from './theme.enum'
import { AutofillStyles } from '../components/Inputs/AutofillStyles/AutofillStyles'
import ShadowAware from './ShadowAware'
import I18nContext from '../i18n/I18nContext'
import { DEFAULT_FIRST_DAY_OF_WEEK, DEFAULT_LOCALE } from '../i18n/constants'
import type {
    BlendFirstDayOfWeek,
    BlendLocale,
    BlendTranslate,
} from '../i18n/types'

const EMPTY_COMPONENT_TOKENS: ComponentTokenOverrides = {}

type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenOverrides
    breakpoints?: BreakpointType
    theme?: Theme | string
    /**
     * BCP 47 language tag used by every `Intl` formatter in the library.
     *
     * Defaults to the explicit string `'en-US'` — never `undefined`, which
     * would let `Intl` fall through to the host machine locale and silently
     * change rendered dates and numbers for existing consumers.
     */
    locale?: BlendLocale
    /**
     * Translation lookup. Returning `undefined`, `''`, or the key itself is a
     * miss, and the built-in English default is used instead. An explicit
     * component prop still wins over this.
     *
     * Named `t` for consumer ergonomics; it is unrelated to `theme` above.
     */
    t?: BlendTranslate
    /**
     * First day of the week in calendars, `0` = Sunday through `6` = Saturday.
     *
     * Defaults to `1` (Monday) rather than being derived from `locale`,
     * because the CLDR lookup is unavailable in Firefox and older Safari and
     * identical props should not render differently per browser. Pass
     * `resolveFirstDayOfWeek(locale)` to opt into CLDR behaviour.
     */
    firstDayOfWeek?: BlendFirstDayOfWeek
    children: React.ReactNode
    /**
     * Target HTMLElement for styled-components to inject styles into.
     * Use this when rendering inside a Shadow DOM.
     * The element must be inside a shadow root.
     *
     * Note: This is the actual DOM element (not the ShadowRoot itself) that
     * styled-components will use as the style injection target.
     */
    target?: HTMLElement
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = EMPTY_COMPONENT_TOKENS,
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    locale = DEFAULT_LOCALE,
    t,
    firstDayOfWeek = DEFAULT_FIRST_DAY_OF_WEEK,
    children,
    target,
}: ThemeProviderProps) => {
    const resolvedComponentTokens = useMemo(
        () => initTokens(componentTokens, foundationTokens, theme),
        [componentTokens, foundationTokens, theme]
    )

    const themeContextValue = useMemo(
        () => ({
            foundationTokens,
            componentTokens: resolvedComponentTokens,
            breakpoints,
            theme,
        }),
        [foundationTokens, resolvedComponentTokens, breakpoints, theme]
    )

    // Separate from `themeContextValue` on purpose, not for tidiness.
    //
    // React context has no selector: any change to a context value re-renders
    // every consumer of it. `themeContextValue` is what all ~85 token slots
    // subscribe to, and consumers routinely rebuild `t` inline
    // (`t={(k) => i18n.t(k)}`), giving it a new identity on every render. In a
    // shared value that would re-render the whole token-consuming tree on
    // every parent render.
    //
    // It would NOT re-run `initTokens` — `resolvedComponentTokens` above has
    // its own memo, keyed on componentTokens/foundationTokens/theme, which
    // `t` is not part of. The cost is re-render fan-out, not recomputing
    // tokens.
    const i18nContextValue = useMemo(
        () => ({
            locale,
            translate: t,
            // Clamped because the ReScript binding generator may widen the
            // `0 | … | 6` union to a plain int, and an out-of-range value would
            // silently mis-rotate the weekday array rather than fail loudly.
            firstDayOfWeek: (Number.isInteger(firstDayOfWeek) &&
            firstDayOfWeek >= 0 &&
            firstDayOfWeek <= 6
                ? firstDayOfWeek
                : DEFAULT_FIRST_DAY_OF_WEEK) as BlendFirstDayOfWeek,
        }),
        [locale, t, firstDayOfWeek]
    )

    const content = (
        <>
            <AutofillStyles />
            {children}
        </>
    )

    return (
        <I18nContext.Provider value={i18nContextValue}>
            <ThemeContext.Provider value={themeContextValue}>
                {target ? (
                    <ShadowAware target={target}>{content}</ShadowAware>
                ) : (
                    content
                )}
            </ThemeContext.Provider>
        </I18nContext.Provider>
    )
}

export default ThemeProvider
