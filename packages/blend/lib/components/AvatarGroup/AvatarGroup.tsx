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

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (
        {
            avatars,
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
            Avatar
        )

        return (
            <StyledAvatarGroupContainer
                ref={ref}
                role="group"
                aria-label={`Group of ${avatars.length} avatars${internalSelectedIds.length > 0 ? `, ${internalSelectedIds.length} selected` : ''}`}
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
                            : `Avatar ${avatar.id}`)
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
                                    ? `${avatarName}, selected`
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
                                {`Avatar ${index + 1} of ${visibleAvatars.length}${overflowCount > 0 ? `, ${overflowCount} more available` : ''}`}
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
                            aria-label="Loading more avatars"
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
                                    aria-label={`${overflowCount} more avatar${overflowCount > 1 ? 's' : ''}, click to view and select`}
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
                            searchPlaceholder="Search avatars..."
                            maxHeight={250}
                        />
                    ))}
            </StyledAvatarGroupContainer>
        )
    }
)

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
