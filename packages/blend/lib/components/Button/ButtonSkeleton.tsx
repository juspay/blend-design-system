import { forwardRef } from 'react'
import Skeleton from '../Skeleton/Skeleton'
import type { ButtonProps } from './types'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import type { ButtonTokensType } from './button.tokens'
import { ButtonSize, ButtonSubType, ButtonType } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export type ButtonSkeletonProps = Omit<ButtonProps, 'showSkeleton'> & {
    skeletonVariant?: SkeletonVariant
}

const ButtonSkeleton = forwardRef<HTMLDivElement, ButtonSkeletonProps>(
    (
        {
            skeletonVariant = 'pulse',
            buttonType = ButtonType.PRIMARY,
            size = ButtonSize.MEDIUM,
            subType = ButtonSubType.DEFAULT,
            width,
            fullWidth = false,
            buttonGroupPosition,
            ...rest
        },
        ref
    ) => {
        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')

        const padding = buttonTokens.padding[size][buttonType][subType]
        const baseRadius =
            buttonTokens.borderRadius[size][buttonType][subType].default
        const borderRadius =
            buttonGroupPosition === undefined
                ? baseRadius
                : buttonGroupPosition === 'left'
                  ? `${baseRadius} 0 0 ${baseRadius}`
                  : buttonGroupPosition === 'right'
                    ? `0 ${baseRadius} ${baseRadius} 0`
                    : '0px 0px 0px 0px'

        const skeletonWidth = fullWidth ? '100%' : (width ?? 'fit-content')

        const dataAttributes = Object.fromEntries(
            Object.entries(rest).filter(
                ([key]) => key.startsWith('data-') || key.startsWith('aria-')
            )
        )

        const id = 'id' in rest ? (rest as { id?: string }).id : undefined

        return (
            <Skeleton
                ref={ref}
                variant={skeletonVariant}
                loading
                width={skeletonWidth}
                padding={padding}
                borderRadius={borderRadius}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={buttonTokens.gap}
                {...(id ? { id } : {})}
                {...dataAttributes}
                data-testid="skeleton-button"
            />
        )
    }
)

ButtonSkeleton.displayName = 'ButtonSkeleton'

export { ButtonSkeleton }
