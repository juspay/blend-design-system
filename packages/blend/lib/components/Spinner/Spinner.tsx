import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { VisuallyHidden } from '../ButtonV2/VisuallyHidden'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { SpinnerProps } from './types'
import type { SpinnerTokensType } from './spinner.tokens.types'

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
    (
        {
            size = 'md',
            color = 'default',
            label = 'Loading',
            overlay = false,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<SpinnerTokensType>('SPINNER')
        const prefersReducedMotion = useReducedMotion()
        const spinnerSize = tokens.size[size]
        const strokeWidth = tokens.strokeWidth[size]
        const center = 24
        const radius = center - strokeWidth / 2
        const circumference = 2 * Math.PI * radius

        return (
            <Block
                ref={ref}
                {...rest}
                display={overlay ? 'flex' : 'inline-flex'}
                contentCentered
                width={overlay ? '100%' : spinnerSize}
                height={overlay ? '100%' : spinnerSize}
                position={overlay ? 'absolute' : undefined}
                inset={overlay ? 0 : undefined}
                zIndex={overlay ? tokens.overlay.zIndex : undefined}
                backgroundColor={
                    overlay ? tokens.overlay.backgroundColor : undefined
                }
                role="status"
                aria-label={label}
                aria-live="polite"
                aria-atomic="true"
                data-spinner
                data-spinner-size={size}
                data-spinner-color={color}
                data-spinner-overlay={overlay || undefined}
            >
                <svg
                    width={spinnerSize}
                    height={spinnerSize}
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    data-spinner-indicator
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={tokens.trackColor}
                        strokeOpacity={0.3}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={tokens.colors[color]}
                        strokeDasharray={`${circumference * 0.25} ${circumference}`}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        transform={`rotate(-90 ${center} ${center})`}
                    >
                        {!prefersReducedMotion && (
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                from={`0 ${center} ${center}`}
                                to={`360 ${center} ${center}`}
                                dur={tokens.animation.duration}
                                repeatCount="indefinite"
                            />
                        )}
                    </circle>
                </svg>
                <VisuallyHidden data-element="label">{label}</VisuallyHidden>
            </Block>
        )
    }
)

Spinner.displayName = 'Spinner'

export default Spinner
