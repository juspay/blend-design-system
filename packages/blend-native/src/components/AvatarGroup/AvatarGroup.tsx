import { forwardRef, useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import type { View as RNView } from 'react-native'
import { AvatarV2Shape, AvatarV2Size } from '@juspay/blend-design-system/node'
import type {
    AvatarGroupTokensType,
    AvatarV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import {
    parseBorderRadius,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import { Avatar } from '../Avatar'
import { Menu } from '../Menu'
import type { MenuGroupType } from '../Menu'
import { Skeleton } from '../Skeleton'
import type { AvatarGroupNativeProps } from './avatarGroup.types'
import {
    getAvatarName,
    getGroupLabel,
    getItemLabel,
    getOverflowLabel,
    getPositionHint,
    splitAvatars,
    toggleSelection,
} from './avatarGroup.utils'
import type { AvatarId } from './avatarGroup.utils'

/**
 * AvatarGroup — the native port of web's `AvatarGroup`.
 *
 * Overlapping avatars with a "+N" counter that opens the overflow in a
 * searchable `Menu` (a bottom sheet on phones). Press an avatar, or an
 * overflow row, to toggle its selection.
 *
 * RN has no `box-shadow` ring or `outline-offset`, so the selected ring is an
 * absolutely-positioned bordered view drawn outside the avatar.
 */
const AvatarGroup = forwardRef<RNView, AvatarGroupNativeProps>(
    function AvatarGroup(
        {
            avatars = [],
            maxCount = 5,
            size = AvatarV2Size.MD,
            shape = AvatarV2Shape.CIRCULAR,
            selectedAvatarIds,
            onSelectionChange,
            skeleton,
            accessibilityLabel,
            testID,
            style,
        },
        ref
    ) {
        const tokens = useNativeTokens<AvatarGroupTokensType>('AVATAR_GROUP')
        const avatarTokens = useNativeTokens<AvatarV2TokensType>('AVATARV2')

        const [selectedIds, setSelectedIds] = useState<AvatarId[]>(
            selectedAvatarIds ?? []
        )
        useEffect(() => {
            setSelectedIds(selectedAvatarIds ?? [])
        }, [selectedAvatarIds])
        const [menuOpen, setMenuOpen] = useState(false)

        const { visible, overflow } = splitAvatars(avatars, maxCount)

        const toggle = (id: AvatarId) => {
            const next = toggleSelection(selectedIds, id)
            setSelectedIds(next)
            onSelectionChange?.(next)
        }

        // The group's tokens are keyed by web's `AvatarSize`; both enums share values.
        const sizeKey = size as string
        const bySize = <T,>(map: unknown): T =>
            (map as Record<string, T>)[sizeKey]

        const avatarSize =
            parseDimension(
                avatarTokens.container.width[size] as string | number
            ) ?? 40
        // Web's overlap is tuned to its V1 avatar sizes; capped so native's
        // smaller V2 avatars don't lose their initials under the next one.
        const overlap = Math.min(
            parseDimension(
                bySize<string | number>(tokens.container.marginLeft)
            ) ?? 0,
            avatarSize * 0.2
        )
        const borderWidth =
            parseDimension(tokens.avatar.border.width as string | number) ?? 0
        const radius =
            parseBorderRadius(
                avatarTokens.container.borderRadius[shape] as string | number
            ) ?? 9999
        const outerRadius = typeof radius === 'number' ? radius : 9999

        const ringWidth =
            parseDimension(
                tokens.avatar.selected.ringWidth as string | number
            ) ?? 2
        const ringOffset =
            parseDimension(
                tokens.avatar.selected.ringOffset as string | number
            ) ?? 2

        // Sized from the avatar tokens, not the group's counter tokens: those are
        // tuned for web's V1 Avatar and don't match native's AvatarV2 sizes.
        const counterFontSize = avatarTokens.container.fallbackText.fontSize[
            size
        ] as string | number
        const counterFontWeight = avatarTokens.container.fallbackText
            .fontWeight[size] as string | number

        const ring = (visibleRadius: number) => (
            <View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: -(ringOffset + ringWidth),
                    left: -(ringOffset + ringWidth),
                    right: -(ringOffset + ringWidth),
                    bottom: -(ringOffset + ringWidth),
                    borderWidth: ringWidth,
                    borderColor: String(tokens.avatar.selected.ringColor),
                    borderRadius: visibleRadius + ringOffset + ringWidth,
                }}
            />
        )

        const menuGroups: MenuGroupType[] = [
            {
                items: overflow.map((avatar) => ({
                    id: String(avatar.id),
                    label: {
                        text: getAvatarName(avatar),
                        leftSlot: (
                            <Avatar
                                size={AvatarV2Size.SM}
                                src={avatar.src}
                                alt={avatar.alt}
                                fallbackText={avatar.fallbackText}
                            />
                        ),
                    },
                    selected: selectedIds.includes(avatar.id),
                    onClick: () => toggle(avatar.id),
                })),
            },
        ]

        return (
            <View
                ref={ref}
                testID={testID}
                accessibilityLabel={
                    accessibilityLabel ??
                    getGroupLabel(avatars.length, selectedIds.length)
                }
                accessibilityLiveRegion="polite"
                style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
            >
                {visible.map((avatar, index) => {
                    const isSelected = selectedIds.includes(avatar.id)
                    const name = getAvatarName(avatar)
                    return (
                        <Pressable
                            key={avatar.id}
                            onPress={() => toggle(avatar.id)}
                            accessibilityRole="button"
                            accessibilityLabel={getItemLabel(name, isSelected)}
                            accessibilityHint={getPositionHint(
                                index,
                                visible.length,
                                overflow.length
                            )}
                            accessibilityState={{ selected: isSelected }}
                            testID={
                                testID ? `${testID}-item-${index}` : undefined
                            }
                            style={{
                                marginLeft: index === 0 ? 0 : -overlap,
                                zIndex: isSelected
                                    ? visible.length + 2
                                    : 1 + (visible.length - index),
                            }}
                        >
                            <View
                                style={{
                                    width: avatarSize,
                                    height: avatarSize,
                                    borderWidth: borderWidth,
                                    borderColor: String(
                                        tokens.avatar.border.color
                                    ),
                                    borderRadius: outerRadius,
                                    overflow: 'hidden',
                                }}
                            >
                                <Avatar
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    fallbackText={avatar.fallbackText}
                                    size={size}
                                    shape={shape}
                                    skeleton={skeleton}
                                    width={avatarSize - borderWidth * 2}
                                    height={avatarSize - borderWidth * 2}
                                />
                            </View>
                            {isSelected && ring(outerRadius)}
                        </Pressable>
                    )
                })}

                {overflow.length > 0 &&
                    (skeleton?.show ? (
                        <View style={{ marginLeft: -overlap }}>
                            <Skeleton
                                width={avatarSize}
                                height={avatarSize}
                                shape={
                                    shape === AvatarV2Shape.CIRCULAR
                                        ? 'circle'
                                        : 'rounded'
                                }
                                variant={skeleton.variant}
                            />
                        </View>
                    ) : (
                        <Menu
                            trigger={
                                <Pressable
                                    onPress={() => setMenuOpen(true)}
                                    accessibilityRole="button"
                                    accessibilityLabel={getOverflowLabel(
                                        overflow.length
                                    )}
                                    accessibilityState={{ expanded: menuOpen }}
                                    testID={
                                        testID
                                            ? `${testID}-overflow`
                                            : undefined
                                    }
                                >
                                    {({ pressed }) => (
                                        <View
                                            style={{
                                                marginLeft: -overlap,
                                                zIndex: 1,
                                                width: avatarSize,
                                                height: avatarSize,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: String(
                                                    pressed
                                                        ? tokens.overflowCounter
                                                              .background.hover
                                                        : tokens.overflowCounter
                                                              .background
                                                              .default
                                                ),
                                                borderWidth:
                                                    parseDimension(
                                                        tokens.overflowCounter
                                                            .border.width as
                                                            | string
                                                            | number
                                                    ) ?? 0,
                                                borderColor: String(
                                                    tokens.overflowCounter
                                                        .border.color
                                                ),
                                                borderRadius: outerRadius,
                                            }}
                                        >
                                            <Text
                                                fontSize={counterFontSize}
                                                fontWeight={counterFontWeight}
                                                color={String(
                                                    tokens.overflowCounter.text
                                                        .color
                                                )}
                                            >
                                                {`+${overflow.length}`}
                                            </Text>
                                        </View>
                                    )}
                                </Pressable>
                            }
                            items={menuGroups}
                            open={menuOpen}
                            onOpenChange={setMenuOpen}
                            closeOnSelect={false}
                            enableSearch
                            searchPlaceholder="Search avatars..."
                        />
                    ))}
            </View>
        )
    }
)

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
