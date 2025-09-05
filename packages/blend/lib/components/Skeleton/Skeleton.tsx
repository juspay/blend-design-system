import { forwardRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Block from '../Primitives/Block/Block'
import type { SkeletonProps } from './types'
import type { SkeletonTokensType } from './skeleton.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

// Animation keyframes
const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

// Styled skeleton wrapper
const StyledSkeleton = styled(Block)<{
    $variant: string
    $shape: string
    $animate: boolean
    $skeletonTokens: SkeletonTokensType
}>`
    position: relative;
    overflow: hidden;

    ${({ $animate, $variant, $skeletonTokens }) =>
        $animate &&
        css`
            ${$variant === 'pulse' &&
            css`
                animation: ${pulseAnimation}
                    ${$skeletonTokens.animation.duration}
                    ${$skeletonTokens.animation.timingFunction}
                    ${$skeletonTokens.animation.iterationCount};
            `}

            ${$variant === 'wave' &&
            css`
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(
                        90deg,
                        transparent,
                        ${$skeletonTokens.colors.highlight},
                        transparent
                    );
                    animation: ${waveAnimation}
                        ${$skeletonTokens.animation.duration}
                        ${$skeletonTokens.animation.timingFunction}
                        ${$skeletonTokens.animation.iterationCount};
                }
            `}

            ${$variant === 'shimmer' &&
            css`
                background: linear-gradient(
                    90deg,
                    ${$skeletonTokens.colors.base} 25%,
                    ${$skeletonTokens.colors.highlight} 37%,
                    ${$skeletonTokens.colors.base} 63%
                );
                background-size: 400% 100%;
                animation: ${shimmerAnimation}
                    ${$skeletonTokens.animation.duration} ease-in-out
                    ${$skeletonTokens.animation.iterationCount};
            `}
        `}

    ${({ $shape, $skeletonTokens }) =>
        $shape === 'circle' &&
        css`
            border-radius: ${$skeletonTokens.borderRadius.circle};
        `}

    ${({ $shape, $skeletonTokens }) =>
        $shape === 'rounded' &&
        css`
            border-radius: ${$skeletonTokens.borderRadius.rounded};
        `}

    ${({ $shape, $skeletonTokens }) =>
        $shape === 'rectangle' &&
        css`
            border-radius: ${$skeletonTokens.borderRadius.rectangle};
        `}
`

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            animate = true,
            width,
            height,
            shape = 'rectangle',
            children,
            backgroundColor,
            ...rest
        },
        ref
    ) => {
        const skeletonTokens =
            useResponsiveTokens<SkeletonTokensType>('SKELETON')

        // If not loading, render children or nothing
        if (!loading) {
            return children ? <>{children}</> : null
        }

        return (
            <StyledSkeleton
                ref={ref}
                $variant={variant}
                $shape={shape}
                $animate={animate}
                $skeletonTokens={skeletonTokens}
                width={width}
                height={height}
                backgroundColor={
                    backgroundColor ||
                    (variant === 'shimmer'
                        ? 'transparent'
                        : skeletonTokens.colors.base)
                }
                aria-label="Loading content"
                role="progressbar"
                aria-busy="true"
                data-testid="skeleton"
                {...rest}
            >
                {children}
            </StyledSkeleton>
        )
    }
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
