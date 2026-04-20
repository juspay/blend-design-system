import Skeleton from '../../../../packages/blend/lib/components/Skeleton'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'

const SkeletonDemo = () => {
    return (
        <div className="space-y-8">
            <div>
                <Text variant="heading.md" fontWeight={600}>
                    Skeleton Variants
                </Text>
                <Text variant="body.sm" color="rgba(0,0,0,0.6)">
                    Showcase of pulse, wave and shimmer animations with
                    different shapes.
                </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Block className="space-y-4">
                    <Text variant="body.md" fontWeight={600}>
                        Pulse
                    </Text>
                    <Skeleton width="100%" height="120px" variant="pulse" />
                    <Skeleton width="60%" height="20px" variant="pulse" />
                    <Skeleton width="80%" height="16px" variant="pulse" />
                </Block>

                <Block className="space-y-4">
                    <Text variant="body.md" fontWeight={600}>
                        Wave
                    </Text>
                    <Skeleton width="100%" height="120px" variant="wave" />
                    <Skeleton width="100%" height="20px" variant="wave" />
                    <div className="flex gap-3">
                        <Skeleton
                            width="48px"
                            height="48px"
                            shape="circle"
                            variant="wave"
                        />
                        <div className="flex-1 space-y-2">
                            <Skeleton
                                width="80%"
                                height="16px"
                                variant="wave"
                            />
                            <Skeleton
                                width="60%"
                                height="14px"
                                variant="wave"
                            />
                        </div>
                    </div>
                </Block>

                <Block className="space-y-4">
                    <Text variant="body.md" fontWeight={600}>
                        Shimmer
                    </Text>
                    <Skeleton width="100%" height="120px" variant="shimmer" />
                    <Skeleton width="70%" height="18px" variant="shimmer" />
                    <Skeleton width="50%" height="14px" variant="shimmer" />
                </Block>
            </div>

            <div className="space-y-4">
                <Text variant="body.md" fontWeight={600}>
                    Content Placeholder
                </Text>
                <Block className="space-y-3 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <Skeleton
                            width="56px"
                            height="56px"
                            shape="circle"
                            variant="pulse"
                        />
                        <div className="flex-1 space-y-2">
                            <Skeleton
                                width="40%"
                                height="16px"
                                variant="pulse"
                            />
                            <Skeleton
                                width="30%"
                                height="14px"
                                variant="pulse"
                            />
                        </div>
                    </div>
                    <Skeleton width="100%" height="14px" variant="pulse" />
                    <Skeleton width="90%" height="14px" variant="pulse" />
                    <Skeleton width="95%" height="14px" variant="pulse" />
                </Block>
            </div>
        </div>
    )
}

export default SkeletonDemo
