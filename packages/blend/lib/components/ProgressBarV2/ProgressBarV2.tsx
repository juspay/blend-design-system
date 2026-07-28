import { useMemo, forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Props,
    ProgressBarV2InternalProps,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from './progressBarV2.types'
import type { ProgressBarV2TokenType } from './progressBarV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    extractProgressBarV2AriaProps,
    generateDefaultAriaLabel,
} from './utils'
import { LinearProgressBarV2 } from './LinearProgressBarV2'
import { CircularProgressBarV2 } from './CircularProgressBarV2'
import { filterBlockedProps } from '../../utils/prop-helpers'

const ProgressBarV2 = forwardRef<HTMLDivElement, ProgressBarV2Props>(
    (
        {
            value,
            size = ProgressBarV2Size.MD,
            variant = ProgressBarV2Variant.LINEAR,
            appearance = ProgressBarV2Appearance.SOLID,
            showLabel = false,
            min = 0,
            max = 100,
            ...rest
        },
        ref
    ) => {
        const progressBarToken =
            useResponsiveTokens<ProgressBarV2TokenType>('PROGRESS_BARV2')
        const {
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            restProps,
        } = extractProgressBarV2AriaProps(rest)
        const filteredRest = filterBlockedProps(restProps)

        const defaultAriaLabel = useMemo(() => {
            if (ariaLabel || ariaLabelledby) return ariaLabel
            return generateDefaultAriaLabel(value, min, max)
        }, [value, min, max, ariaLabel, ariaLabelledby])

        const sharedProps: ProgressBarV2InternalProps = {
            value,
            min,
            max,
            ariaLabel: defaultAriaLabel,
            ariaLabelledby,
            showLabel,
            tokens: progressBarToken,
        }

        if (variant === ProgressBarV2Variant.CIRCULAR) {
            return (
                <Block
                    {...filteredRest}
                    data-progressbar="progressbar"
                    ref={ref}
                >
                    <CircularProgressBarV2
                        {...sharedProps}
                        size={size}
                        appearance={appearance}
                    />
                </Block>
            )
        }

        return (
            <Block {...filteredRest} data-progressbar="progressbar" ref={ref}>
                <LinearProgressBarV2
                    {...sharedProps}
                    size={size}
                    appearance={appearance}
                />
            </Block>
        )
    }
)

ProgressBarV2.displayName = 'ProgressBarV2'

export default ProgressBarV2
