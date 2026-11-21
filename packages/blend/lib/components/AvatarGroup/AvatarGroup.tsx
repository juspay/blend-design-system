import { forwardRef, useState, useEffect, useCallback } from 'react'
import { Avatar } from '../Avatar'
import { AvatarShape, AvatarSize } from '../Avatar/types'
import type { AvatarGroupProps } from './types'
import {
    StyledAvatarGroupContainer,
    StyledAvatarWrapper,
    StyledOverflowCounter,
    VisuallyHidden,
} from './StyledAvatarGroup'
import { createMenuItems } from './avatarGroupUtils'
import Menu from '../Menu/Menu'
import { Skeleton } from '../Skeleton'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AvatarTokensType } from '../Avatar/avatar.tokens'
import { useMessages } from '../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../i18n/catalog/display.messages'

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (
        {
            avatars = [],
            maxCount = 5,
            size = AvatarSize.MD,
            shape = AvatarShape.CIRCULAR,
            selectedAvatarIds,
            onSelectionChange,
            skeleton,
            ...props
        },
        ref
    ) => {
        const { m, mp } = useMessages(DISPLAY_MESSAGES)
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')
        const safeMaxCount = Math.max(1, maxCount)

        const [internalSelectedIds, setInternalSelectedIds] = useState<
            (string | number)[]
        >(selectedAvatarIds || [])

        const visibleAvatars = avatars.slice(0, safeMaxCount)
        const overflowAvatars = avatars.slice(safeMaxCount)
        const overflowCount = overflowAvatars.length

        useEffect(() => {
            setInternalSelectedIds(selectedAvatarIds || [])
        }, [selectedAvatarIds])

        const handleSelect = useCallback(
            (id: string | number) => {
                setInternalSelectedIds((prevSelected) => {
                    const newSelectedIds = prevSelected.includes(id)
                        ? prevSelected.filter((selectedId) => selectedId !== id)
                        : [...prevSelected, id]

                    onSelectionChange?.(newSelectedIds)
                    return newSelectedIds
                })
            },
            [onSelectionChange]
        )

        const menuItems = createMenuItems(
            overflowAvatars,
            internalSelectedIds,
            handleSelect,
            Avatar,
            (id) => m('avatar-group.label.fallback-name', { id: String(id) })
        )

        return (
            <StyledAvatarGroupContainer
                ref={ref}
                role="group"
                aria-label={
                    internalSelectedIds.length > 0
                        ? mp(
                              'avatar-group.a11y.group-selected',
                              avatars.length,
                              {
                                  selected: String(internalSelectedIds.length),
                              }
                          )
                        : mp('avatar-group.a11y.group', avatars.length)
                }
                aria-live="polite"
                aria-atomic="true"
                data-avatar-group="avatar-group"
                data-avatar-group-count={avatars.length}
                data-avatar-group-selected-count={internalSelectedIds.length}
                data-avatar-group-max-count={safeMaxCount}
                {...props}
            >
                {visibleAvatars.map((avatar, index) => {
                    const isSelected = internalSelectedIds.includes(avatar.id)
                    const avatarName =
                        avatar.alt ||
                        (typeof avatar.fallback === 'string'
                            ? avatar.fallback
                            : m('avatar-group.label.fallback-name', {
                                  id: String(avatar.id),
                              }))
                    const descriptionId = `avatar-group-item-${avatar.id}-description`

                    return (
                        <StyledAvatarWrapper
                            key={avatar.id}
                            $index={index}
                            $total={visibleAvatars.length}
                            $isSelected={isSelected}
                            $size={size}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            aria-label={
                                isSelected
                                    ? m('avatar-group.a11y.selected', {
                                          name: avatarName,
                                      })
                                    : avatarName
                            }
                            aria-describedby={descriptionId}
                            data-avatar-group-item="true"
                            data-avatar-group-item-id={avatar.id}
                            data-avatar-group-item-index={index}
                            data-avatar-group-item-selected={isSelected}
                            onClick={() => handleSelect(avatar.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleSelect(avatar.id)
                                }
                            }}
                        >
                            <Avatar
                                skeleton={skeleton}
                                src={avatar.src}
                                alt={avatar.alt}
                                fallback={avatar.fallback}
                                size={size}
                                shape={shape}
                            />
                            <VisuallyHidden
                                id={descriptionId}
                                aria-hidden="false"
                            >
                                {overflowCount > 0
                                    ? m('avatar-group.a11y.position-more', {
                                          number: String(index + 1),
                                          total: String(visibleAvatars.length),
                                          more: String(overflowCount),
                                      })
                                    : m('avatar-group.a11y.position', {
                                          number: String(index + 1),
                                          total: String(visibleAvatars.length),
                                      })}
                            </VisuallyHidden>
                        </StyledAvatarWrapper>
                    )
                })}

                {overflowCount > 0 &&
                    (skeleton?.show ? (
                        <Skeleton
                            variant={skeleton.variant || 'pulse'}
                            width={tokens.container.size[size].width}
                            height={tokens.container.size[size].height}
                            borderRadius={tokens.container.borderRadius[shape]}
                            aria-label={m('avatar-group.a11y.loading-more')}
                        />
                    ) : (
                        <Menu
                            trigger={
                                <StyledOverflowCounter
                                    type="button"
                                    $size={size}
                                    $shape={shape}
                                    aria-haspopup="menu"
                                    aria-expanded="false"
                                    aria-label={mp(
                                        'avatar-group.a11y.overflow',
                                        overflowCount
                                    )}
                                    data-avatar-group-overflow="true"
                                    data-avatar-group-overflow-count={
                                        overflowCount
                                    }
                                    onMouseDown={(e) => e.preventDefault()}
                                    data-element="avatar-group-overflow-counter"
                                    data-id={`${overflowCount}-more-avatars`}
                                >
                                    +{overflowCount}
                                </StyledOverflowCounter>
                            }
                            items={menuItems}
                            enableSearch
                            searchPlaceholder={m(
                                'avatar-group.placeholder.search'
                            )}
                            maxHeight={250}
                        />
                    ))}
            </StyledAvatarGroupContainer>
        )
    }
)

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
