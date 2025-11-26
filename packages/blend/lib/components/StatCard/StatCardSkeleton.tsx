import { Skeleton, SkeletonVariant } from '../Skeleton'
import Block from '../Primitives/Block/Block'
import { StatCardVariant } from './types'
import { StatCardTokenType } from './statcard.tokens'

const StatCardSkeleton = ({
    height,
    skeletonVariant,
    actionIcon,
    titleIcon,
    isSmallScreen,
    statCardVariant,
    statCardToken,
}: {
    height: string | number | undefined
    skeletonVariant: SkeletonVariant
    statCardVariant: StatCardVariant
    actionIcon: React.ReactNode
    titleIcon: React.ReactNode
    isSmallScreen: boolean
    statCardToken: StatCardTokenType
}) => {
    return (
        <Block display="flex" flexDirection="column" height={height}>
            {statCardVariant === StatCardVariant.NUMBER &&
                (isSmallScreen ? (
                    <Block
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        gap={6}
                    >
                        <Skeleton
                            variant={skeletonVariant as SkeletonVariant}
                            width={'30%'}
                            height={'15px'}
                        />
                        <Block
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            width="100%"
                            gap={8}
                        >
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'60%px'}
                                height={'33px'}
                            />
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'30%px'}
                                height={'21px'}
                            />
                        </Block>
                    </Block>
                ) : (
                    <Block
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <Block
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            width="100%"
                            alignItems={isSmallScreen ? 'flex-start' : 'center'}
                            justifyContent="center"
                            gap={statCardToken.textContainer.gap}
                            style={{ flex: 1 }}
                            position="relative"
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                flexDirection="column"
                                gap={16}
                                width="100%"
                            >
                                <Skeleton
                                    variant={skeletonVariant as SkeletonVariant}
                                    width={'100%'}
                                    height={'16px'}
                                />

                                <Skeleton
                                    variant={skeletonVariant as SkeletonVariant}
                                    width={'100%'}
                                    height={'21px'}
                                />
                            </Block>
                            <Block
                                display="flex"
                                flexDirection="column"
                                width="100%"
                                alignItems={
                                    isSmallScreen ? 'flex-start' : 'center'
                                }
                                gap={8}
                            >
                                <Skeleton
                                    variant={skeletonVariant as SkeletonVariant}
                                    width={'100%'}
                                    height={'74px'}
                                />
                            </Block>
                        </Block>
                    </Block>
                ))}

            {statCardVariant !== StatCardVariant.NUMBER && (
                <Block display="flex" flexDirection="column" gap={10}>
                    <Block
                        display="flex"
                        gap={statCardToken.textContainer.header.gap}
                        position="relative"
                    >
                        {actionIcon && !isSmallScreen && (
                            <Block
                                display="flex"
                                alignItems="center"
                                position="absolute"
                                right={0}
                                top={0}
                            >
                                <Skeleton
                                    variant={skeletonVariant as SkeletonVariant}
                                    width={'16px'}
                                    height={'16px'}
                                />
                            </Block>
                        )}

                        {titleIcon && !isSmallScreen && (
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'16px'}
                                height={'16px'}
                            />
                        )}
                        <Block
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            gap={6}
                        >
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'50%'}
                                height={'21px'}
                            />
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'70%'}
                                height={'32px'}
                            />
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'50%'}
                                height={'18px'}
                            />
                        </Block>
                    </Block>
                    {statCardVariant === StatCardVariant.LINE && (
                        <Skeleton
                            variant={skeletonVariant as SkeletonVariant}
                            width={'100%'}
                            height={'40px'}
                        />
                    )}

                    {statCardVariant === StatCardVariant.BAR && (
                        <Skeleton
                            variant={skeletonVariant as SkeletonVariant}
                            width={'100%'}
                            height={'40px'}
                        />
                    )}

                    {statCardVariant === StatCardVariant.PROGRESS_BAR && (
                        <Block
                            display="flex"
                            flexDirection="column"
                            height={40}
                        >
                            <Skeleton
                                variant={skeletonVariant as SkeletonVariant}
                                width={'100%'}
                                height={'12px'}
                            />
                        </Block>
                    )}
                </Block>
            )}
        </Block>
    )
}

export default StatCardSkeleton
