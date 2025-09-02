import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react'
import type { RefObject } from 'react'
import { Avatar } from '../Avatar'
import { AvatarShape, AvatarSize } from '../Avatar/types'
import type { AvatarGroupProps } from './types'
import {
    StyledAvatarGroupContainer,
    StyledAvatarWrapper,
    StyledOverflowCounter,
    StyledMenuContainer,
    VisuallyHidden,
} from './StyledAvatarGroup'
import {
    DarkStyledAvatarGroupContainer,
    DarkStyledAvatarWrapper,
    DarkStyledMenuContainer,
    DarkStyledOverflowCounter,
    DarkVisuallyHidden,
} from './DarkStyledAvatarGroup'
import {
    positionMenu,
    createMenuItems,
    filterAvatars,
} from './avatarGroupUtils'

type MenuProps = {
    items: MenuItemProps[]
    hasSearch?: boolean
    searchPlaceholder?: string
    searchTerm: string
    onSearchTermChange: (term: string) => void
    onItemClick: (item: MenuItemProps) => void
}

type MenuItemProps = {
    id: string
    text: string
    hasSlotL?: boolean
    slotL?: React.ReactNode
    onClick?: () => void
    data?: { isSelected?: boolean }
}

const Menu = ({
    items,
    hasSearch,
    searchPlaceholder,
    searchTerm,
    onSearchTermChange,
    onItemClick,
}: MenuProps) => (
    <div
        style={{
            width: '320px',
            background: 'white',
            border: '1px solid #e2e8f0',
            padding: '8px',
            borderRadius: '4px',
            boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
    >
        {hasSearch && (
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                }}
            />
        )}
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {items.map((item: MenuItemProps) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        backgroundColor: item.data?.isSelected
                            ? '#EDF2F7'
                            : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                        ;(e.target as HTMLDivElement).style.backgroundColor =
                            '#F7FAFC'
                    }}
                    onMouseLeave={(e) => {
                        ;(e.target as HTMLDivElement).style.backgroundColor =
                            item.data?.isSelected ? '#EDF2F7' : 'transparent'
                    }}
                >
                    {item.hasSlotL && (
                        <div style={{ marginRight: '8px' }}>{item.slotL}</div>
                    )}
                    {item.text}
                </div>
            ))}
        </div>
    </div>
)

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (
        {
            avatars,
            maxCount = 5,
            size = AvatarSize.MD,
            shape = AvatarShape.CIRCULAR,
            selectedAvatarIds,
            onSelectionChange,
            ...props
        },
        ref
    ) => {
        const safeMaxCount = Math.max(1, maxCount)

        const [internalSelectedIds, setInternalSelectedIds] = useState<
            (string | number)[]
        >(selectedAvatarIds || [])
        const [lightMenuOpen, setLightMenuOpen] = useState(false)
        const [darkMenuOpen, setDarkMenuOpen] = useState(false)
        const [lightSearchTerm, setLightSearchTerm] = useState('')
        const [darkSearchTerm, setDarkSearchTerm] = useState('')

        const overflowCounterRef = useRef<HTMLButtonElement>(null)
        const lightMenuRef = useRef<HTMLDivElement>(null)
        const darkMenuRef = useRef<HTMLDivElement>(null)

        const visibleAvatars = avatars.slice(0, safeMaxCount)
        const overflowCount = Math.max(0, avatars.length - safeMaxCount)

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

        const toggleLightMenu = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()
                setLightMenuOpen((prev) => !prev)
            },
            []
        )

        const toggleDarkMenu = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()
                setDarkMenuOpen((prev) => !prev)
            },
            []
        )

        const handleLightSearchChange = useCallback(
            (term: string) => setLightSearchTerm(term),
            []
        )
        const handleDarkSearchChange = useCallback(
            (term: string) => setDarkSearchTerm(term),
            []
        )

        const filteredLightAvatars = lightSearchTerm
            ? filterAvatars(avatars, lightSearchTerm)
            : avatars
        const filteredDarkAvatars = darkSearchTerm
            ? filterAvatars(avatars, darkSearchTerm)
            : avatars

        const lightMenuItems = createMenuItems(
            filteredLightAvatars,
            internalSelectedIds,
            handleSelect,
            Avatar
        )
        const darkMenuItems = createMenuItems(
            filteredDarkAvatars,
            internalSelectedIds,
            handleSelect,
            Avatar
        )

        return (
            <>
                {/* ---------- LIGHT THEME ---------- */}
                <StyledAvatarGroupContainer
                    ref={ref}
                    role="group"
                    aria-label={`Group of ${avatars.length} avatars, ${internalSelectedIds.length} selected`}
                    {...props}
                >
                    {visibleAvatars.map((avatar, index) => (
                        <StyledAvatarWrapper
                            key={avatar.id}
                            $index={index}
                            $total={visibleAvatars.length}
                            $isSelected={internalSelectedIds.includes(
                                avatar.id
                            )}
                            $size={size}
                            role="button"
                            tabIndex={0}
                            aria-pressed={internalSelectedIds.includes(
                                avatar.id
                            )}
                            aria-label={`Select avatar ${
                                avatar.alt ||
                                (typeof avatar.fallback === 'string'
                                    ? avatar.fallback
                                    : avatar.id)
                            }`}
                            onClick={() => handleSelect(avatar.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleSelect(avatar.id)
                                }
                            }}
                        >
                            <Avatar
                                src={avatar.src}
                                alt={avatar.alt}
                                fallback={avatar.fallback}
                                size={size}
                                shape={shape}
                            />
                        </StyledAvatarWrapper>
                    ))}

                    {overflowCount > 0 && (
                        <StyledOverflowCounter
                            ref={overflowCounterRef}
                            type="button"
                            $size={size}
                            $shape={shape}
                            $isOpen={lightMenuOpen}
                            aria-expanded={lightMenuOpen}
                            aria-haspopup="menu"
                            aria-controls={
                                lightMenuOpen
                                    ? 'avatar-group-light-menu'
                                    : undefined
                            }
                            aria-label={`+${overflowCount} more avatars, click to view and select`}
                            onClick={toggleLightMenu}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            +{overflowCount}
                        </StyledOverflowCounter>
                    )}

                    {overflowCount > 0 && lightMenuOpen && (
                        <StyledMenuContainer
                            ref={lightMenuRef}
                            id="avatar-group-light-menu"
                        >
                            <Menu
                                items={lightMenuItems}
                                hasSearch
                                searchPlaceholder="Search avatars..."
                                searchTerm={lightSearchTerm}
                                onSearchTermChange={handleLightSearchChange}
                                onItemClick={(item) =>
                                    item.id && handleSelect(item.id)
                                }
                            />
                        </StyledMenuContainer>
                    )}

                    {overflowCount > 0 && !lightMenuOpen && (
                        <VisuallyHidden>
                            And {overflowCount} more{' '}
                            {overflowCount === 1 ? 'avatar' : 'avatars'}
                        </VisuallyHidden>
                    )}
                </StyledAvatarGroupContainer>

                {/* ---------- DARK THEME ---------- */}
                <DarkStyledAvatarGroupContainer
                    ref={ref}
                    role="group"
                    aria-label={`Dark group of ${avatars.length} avatars, ${internalSelectedIds.length} selected`}
                    {...props}
                >
                    {visibleAvatars.map((avatar, index) => (
                        <DarkStyledAvatarWrapper
                            key={avatar.id}
                            $index={index}
                            $total={visibleAvatars.length}
                            $isSelected={internalSelectedIds.includes(
                                avatar.id
                            )}
                            $size={size}
                            role="button"
                            tabIndex={0}
                            aria-pressed={internalSelectedIds.includes(
                                avatar.id
                            )}
                            aria-label={`Select avatar ${
                                avatar.alt ||
                                (typeof avatar.fallback === 'string'
                                    ? avatar.fallback
                                    : avatar.id)
                            }`}
                            onClick={() => handleSelect(avatar.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleSelect(avatar.id)
                                }
                            }}
                        >
                            <Avatar
                                src={avatar.src}
                                alt={avatar.alt}
                                fallback={avatar.fallback}
                                size={size}
                                shape={shape}
                            />
                        </DarkStyledAvatarWrapper>
                    ))}

                    {overflowCount > 0 && (
                        <DarkStyledOverflowCounter
                            ref={overflowCounterRef}
                            type="button"
                            $size={size}
                            $shape={shape}
                            $isOpen={darkMenuOpen}
                            aria-expanded={darkMenuOpen}
                            aria-haspopup="menu"
                            aria-controls={
                                darkMenuOpen
                                    ? 'avatar-group-dark-menu'
                                    : undefined
                            }
                            aria-label={`+${overflowCount} more avatars, click to view and select`}
                            onClick={toggleDarkMenu}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            +{overflowCount}
                        </DarkStyledOverflowCounter>
                    )}

                    {overflowCount > 0 && darkMenuOpen && (
                        <DarkStyledMenuContainer
                            ref={darkMenuRef}
                            id="avatar-group-dark-menu"
                        >
                            <Menu
                                items={darkMenuItems}
                                hasSearch
                                searchPlaceholder="Search avatars..."
                                searchTerm={darkSearchTerm}
                                onSearchTermChange={handleDarkSearchChange}
                                onItemClick={(item) =>
                                    item.id && handleSelect(item.id)
                                }
                            />
                        </DarkStyledMenuContainer>
                    )}

                    {overflowCount > 0 && !darkMenuOpen && (
                        <DarkVisuallyHidden>
                            And {overflowCount} more{' '}
                            {overflowCount === 1 ? 'avatar' : 'avatars'}
                        </DarkVisuallyHidden>
                    )}
                </DarkStyledAvatarGroupContainer>
            </>
        )
    }
)

AvatarGroup.displayName = 'AvatarGroup'
export default AvatarGroup
