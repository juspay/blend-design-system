import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";
import { Avatar } from "../Avatar";
import { AvatarShape, AvatarSize } from "../Avatar/types";
import { AvatarGroupProps } from "./types";
import {
  StyledAvatarGroupContainer,
  StyledAvatarWrapper,
  StyledOverflowCounter,
  StyledMenuContainer,
  VisuallyHidden,
} from "./StyledAvatarGroup";
import {
  positionMenu,
  createMenuItems,
  filterAvatars,
} from "./avatarGroupUtils";

// Temporarily stubbed Menu component until implemented fully
type MenuProps = {
  items: MenuItemProps[];
  hasSearch?: boolean;
  searchPlaceholder?: string;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onItemClick: (item: MenuItemProps) => void;
};

type MenuItemProps = {
  id: string;
  text: string;
  hasSlotL?: boolean;
  slotL?: React.ReactNode;
  onClick?: () => void;
  data?: { isSelected?: boolean };
};

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
      width: "320px",
      background: "white",
      border: "1px solid #e2e8f0",
      padding: "8px",
      borderRadius: "4px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }}
  >
    {hasSearch && (
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          border: "1px solid #e2e8f0",
          borderRadius: "4px",
        }}
      />
    )}
    <div style={{ maxHeight: "250px", overflowY: "auto" }}>
      {items.map((item: MenuItemProps) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: item.data?.isSelected ? "#EDF2F7" : "transparent",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLDivElement).style.backgroundColor = "#F7FAFC";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLDivElement).style.backgroundColor = item.data
              ?.isSelected
              ? "#EDF2F7"
              : "transparent";
          }}
        >
          {item.hasSlotL && (
            <div style={{ marginRight: "8px" }}>{item.slotL}</div>
          )}
          {item.text}
        </div>
      ))}
    </div>
  </div>
);

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
    ref,
  ) => {
    // Ensure maxCount is at least 1
    const safeMaxCount = Math.max(1, maxCount);

    // State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [internalSelectedIds, setInternalSelectedIds] = useState<
      (string | number)[]
    >(selectedAvatarIds || []);
    const [searchTerm, setSearchTerm] = useState("");

    // Refs
    const overflowCounterRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Determine visible avatars and overflow count
    const visibleAvatars = avatars.slice(0, safeMaxCount);
    const overflowCount = Math.max(0, avatars.length - safeMaxCount);

    // Position menu when it opens
    useEffect(() => {
      if (isMenuOpen) {
        // Cast the ref types to match the expected parameter types
        const typedMenuRef = menuRef as RefObject<HTMLDivElement>;
        const typedCounterRef =
          overflowCounterRef as RefObject<HTMLButtonElement>;

        positionMenu(typedMenuRef, typedCounterRef);

        // Handle window scroll and resize
        const handleScroll = (event: Event) => {
          requestAnimationFrame(() => {
            positionMenu(typedMenuRef, typedCounterRef);
          });

          // Don't close menu when scrolling within it
          if (
            menuRef.current &&
            (menuRef.current === event.target ||
              menuRef.current.contains(event.target as Node))
          ) {
            return;
          }

          // Close menu after a short delay when scrolling outside
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          scrollTimeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
          }, 100);
        };

        const handleResize = () => {
          requestAnimationFrame(() => {
            positionMenu(typedMenuRef, typedCounterRef);
          });
        };

        // Add event listeners
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => {
          window.removeEventListener("scroll", handleScroll, true);
          window.removeEventListener("resize", handleResize);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      }
    }, [isMenuOpen]);

    // Handle click outside
    useEffect(() => {
      if (!isMenuOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          overflowCounterRef.current &&
          menuRef.current &&
          !overflowCounterRef.current.contains(event.target as Node) &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isMenuOpen]);

    // Sync internal state with props
    useEffect(() => {
      setInternalSelectedIds(selectedAvatarIds || []);
    }, [selectedAvatarIds]);

    // Handle avatar selection
    const handleSelect = useCallback(
      (id: string | number) => {
        setInternalSelectedIds((prevSelected) => {
          const newSelectedIds = prevSelected.includes(id)
            ? prevSelected.filter((selectedId) => selectedId !== id) // Remove id
            : [...prevSelected, id]; // Add id

          onSelectionChange?.(newSelectedIds);
          return newSelectedIds;
        });
      },
      [onSelectionChange],
    );

    // Toggle menu
    const toggleMenu = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMenuOpen((prev) => !prev);
    }, []);

    // Handle search change
    const handleSearchChange = useCallback((term: string) => {
      setSearchTerm(term);
    }, []);

    // Filtered items for search
    const filteredAvatars = searchTerm
      ? filterAvatars(avatars, searchTerm)
      : avatars;

    // Generate menu items
    const menuItems = createMenuItems(
      filteredAvatars,
      internalSelectedIds,
      handleSelect,
      Avatar,
    );

    return (
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
            $isSelected={internalSelectedIds.includes(avatar.id)}
            $size={size}
            role="button"
            tabIndex={0}
            aria-pressed={internalSelectedIds.includes(avatar.id)}
            aria-label={`Select avatar ${avatar.alt || (typeof avatar.fallback === "string" ? avatar.fallback : avatar.id)}`}
            onClick={() => handleSelect(avatar.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(avatar.id);
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
            $isOpen={isMenuOpen}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-controls={
              isMenuOpen ? "avatar-group-overflow-menu" : undefined
            }
            aria-label={`+${overflowCount} more avatars, click to view and select`}
            onClick={toggleMenu}
            onMouseDown={(e) => e.preventDefault()}
          >
            +{overflowCount}
          </StyledOverflowCounter>
        )}

        {/* Menu displayed when overflow counter is clicked */}
        {overflowCount > 0 && isMenuOpen && (
          <StyledMenuContainer ref={menuRef} id="avatar-group-overflow-menu">
            <Menu
              items={menuItems}
              hasSearch={true}
              searchPlaceholder="Search avatars..."
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchChange}
              onItemClick={(item: MenuItemProps) => {
                if (item.id) {
                  handleSelect(item.id);
                }
              }}
            />
          </StyledMenuContainer>
        )}

        {/* Hidden text for screen readers to announce the overflow */}
        {overflowCount > 0 && !isMenuOpen && (
          <VisuallyHidden>
            And {overflowCount} more{" "}
            {overflowCount === 1 ? "avatar" : "avatars"}
          </VisuallyHidden>
        )}
      </StyledAvatarGroupContainer>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
