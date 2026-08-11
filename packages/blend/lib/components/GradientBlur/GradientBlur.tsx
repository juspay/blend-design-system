/**
 * GradientBlur — INTERNAL ONLY
 *
 * This component is intentionally NOT exported from the package public API
 * (`packages/blend/lib/main.ts`). It is out of the design-system theming
 * contract:
 *
 * - No component token module (light/dark)
 * - Not registered in ThemeProvider / initComponentTokens
 * - CSS mask `rgba(0,0,0,…)` values are luminance masks for layered
 *   `backdrop-filter` blur, not theme surface colors; they do not need to
 *   follow ThemeContext
 *
 * Do not import this from app code. If a public, theme-aware blur chrome is
 * needed, export it only after adding proper tokens and ThemeProvider wiring.
 */

import './GradientBlur.css'

const GradientBlur = () => {
    return (
        <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default GradientBlur
