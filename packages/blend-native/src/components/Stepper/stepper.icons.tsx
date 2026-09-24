import Svg, { Path } from 'react-native-svg'

/**
 * Inline SVG icons for the Stepper — mirrors web's lucide icons without
 * requiring `lucide-react-native` as a hard dependency for consumers that
 * might not have it in their app. The paths are lucide's own
 * (ISC-licensed, distinctive enough to match design-system intent);
 * exposing them here keeps the package self-contained like `Badge` and
 * `Spinner` already are with `react-native-svg`.
 */

type IconProps = {
    size: number
    color: string
}

export function Check({ size, color }: IconProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <Path
                d="M20 6 9 17l-5-5"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export function Lock({ size, color }: IconProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <Path
                d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M7 11V7a5 5 0 0 1 10 0v4"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export function ChevronRightChevronDown({ size, color }: IconProps) {
    // lucide's chevron-down, exposed under a distinct name so the import in
    // Stepper.tsx reads unambiguously alongside the animated wrapper.
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <Path
                d="m6 9 6 6 6-6"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
