import { forwardRef, useState, useEffect, useRef, useCallback } from 'react'
import { Avatar } from '../Avatar'
import { AvatarShape, AvatarSize } from '../Avatar/types'
import type { AvatarGroupProps } from './types'
import {
    StyledAvatarGroupContainer,
    StyledAvatarWrapper,
    StyledOverflowCounter,
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
        // Ensure maxCount is at least 1
        const safeMaxCount = Math.max(1, maxCount)

        // State
        const [internalSelectedIds, setInternalSelectedIds] = useState<
            (string | number)[]
        >(selectedAvatarIds || [])
        // Refs
        const overflowCounterRef = useRef<HTMLButtonElement>(null)

        const visibleAvatars = avatars.slice(0, safeMaxCount)
        const overflowAvatars = avatars.slice(safeMaxCount)
        const overflowCount = Math.max(0, overflowAvatars.length)

        // Sync internal state with props
        useEffect(() => {
            setInternalSelectedIds(selectedAvatarIds || [])
        }, [selectedAvatarIds])

        // Handle avatar selection
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
                aria-label={`Group of ${avatars.length} avatars, ${internalSelectedIds.length} selected`}
                data-avatar-group="true"
                data-avatar-group-count={avatars.length}
                data-avatar-group-selected-count={internalSelectedIds.length}
                data-avatar-group-max-count={safeMaxCount}
                {...props}
            >
                {visibleAvatars.map((avatar, index) => (
                    <StyledAvatarWrapper
                        key={avatar.id}
                        $index={index}
                        $total={visibleAvatars.length}
                        $isSelected={internalSelectedIds.includes(avatar.id)}
                        $size={size}
                        role="button"
                        tabIndex={0}
                        aria-pressed={internalSelectedIds.includes(avatar.id)}
                        aria-label={`Select avatar ${avatar.alt || (typeof avatar.fallback === 'string' ? avatar.fallback : avatar.id)}`}
                        data-avatar-group-item="true"
                        data-avatar-group-item-id={avatar.id}
                        data-avatar-group-item-index={index}
                        data-avatar-group-item-selected={internalSelectedIds.includes(
                            avatar.id
                        )}
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
                    </StyledAvatarWrapper>
                ))}

                {overflowCount > 0 &&
                    (skeleton?.show ? (
                        <Skeleton
                            variant={skeleton.variant || 'pulse'}
                            width={tokens.container.size[size].width}
                            height={tokens.container.size[size].height}
                            borderRadius={tokens.container.borderRadius[shape]}
                        />
                    ) : (
                        <Menu
                            trigger={
                                <StyledOverflowCounter
                                    ref={overflowCounterRef}
                                    type="button"
                                    $size={size}
                                    $shape={shape}
                                    aria-haspopup="menu"
                                    aria-label={`+${overflowCount} more avatars, click to view and select`}
                                    data-avatar-group-overflow="true"
                                    data-avatar-group-overflow-count={
                                        overflowCount
                                    }
                                    onMouseDown={(e) => e.preventDefault()}
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
