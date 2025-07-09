import React, { createContext, useContext, useState } from "react";
import { NavItemProps } from "./types";
import { ChevronDown } from "lucide-react";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import styled from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { handleKeyDown } from "./utils";

const StyledElement = styled(Block)<{ $isLink?: boolean; $isActive?: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? FOUNDATION_THEME.colors.gray[100] : "inherit"};
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 6px 12px;
  color: ${FOUNDATION_THEME.colors.gray[600]};
  font-weight: 500;
  border-radius: ${FOUNDATION_THEME.border.radius[4]};
  transition: background-color 0.2s;
  user-select: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${FOUNDATION_THEME.colors.gray[100]};
    outline: none;
    ring: 0;
  }
`;

const ChevronWrapper = styled(Block)<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  & > svg {
    width: 16px;
    height: 16px;
    transition: transform 150ms;
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(180deg)" : "rotate(0)"};
  }
`;

const NestedList = styled(Block)`
  width: 100%;
  padding-left: 24px;
  margin-top: 8px;
  position: relative;

  & > div:first-child {
    position: absolute;
    left: 16px;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: ${FOUNDATION_THEME.colors.gray[200]};
  }
`;

const ActiveItemContext = createContext<{
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}>({
  activeItem: null,
  setActiveItem: () => {},
});

export const ActiveItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};

const NavItem = ({ item, index, onNavigate }: NavItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { activeItem, setActiveItem } = useContext(ActiveItemContext);
  const isActive = activeItem === item.label;

  const hasChildren = item.items && item.items.length > 0;
  const itemRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const refCallback = React.useCallback(
    (node: HTMLButtonElement | HTMLAnchorElement | null) => {
      itemRef.current = node;
    },
    [],
  );

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.onClick) {
      setActiveItem(item.label);
      item.onClick();
    }
  };

  const Element = item.href ? "a" : "button";
  const elementProps = item.href ? { href: item.href } : {};

  return (
    <li style={{ width: "100%" }}>
      <StyledElement
        as={Element}
        $isLink={!!item.href}
        $isActive={isActive}
        {...elementProps}
        ref={refCallback}
        onClick={handleClick}
        onKeyDown={(e: React.KeyboardEvent) =>
          handleKeyDown(e, {
            hasChildren,
            isExpanded,
            setIsExpanded,
            handleClick,
            index,
            onNavigate,
          })
        }
        aria-expanded={hasChildren ? isExpanded : undefined}
        role={!item.href ? "button" : undefined}
        tabIndex={0}
      >
        <Block
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap="8px"
        >
          {item.leftSlot && <Block aria-hidden="true">{item.leftSlot}</Block>}
          <Text
            as="span"
            variant="body.md"
            color={FOUNDATION_THEME.colors.gray[600]}
          >
            {item.label}
          </Text>
          {item.rightSlot && <Block aria-hidden="true">{item.rightSlot}</Block>}
        </Block>
        {hasChildren && (
          <ChevronWrapper $isExpanded={isExpanded} aria-hidden="true">
            <ChevronDown />
          </ChevronWrapper>
        )}
      </StyledElement>

      {hasChildren && isExpanded && (
        <NestedList as="ul" role="group" aria-label={`${item.label} submenu`}>
          <Block aria-hidden="true" />
          {item.items &&
            item.items.map((childItem, childIdx) => (
              <NavItem
                key={childIdx}
                item={childItem}
                index={childIdx}
                onNavigate={(direction, currentIndex) => {
                  if (direction === "up" && currentIndex === 0) {
                    itemRef.current?.focus();
                  } else if (
                    direction === "down" &&
                    currentIndex === (item.items?.length || 0) - 1
                  ) {
                    onNavigate("down", index);
                  } else {
                    const nextIndex =
                      direction === "up"
                        ? Math.max(0, currentIndex - 1)
                        : Math.min(
                            (item.items?.length || 0) - 1,
                            currentIndex + 1,
                          );
                    const nestedItems = itemRef.current?.parentElement
                      ?.querySelector("ul")
                      ?.querySelectorAll("button, a");
                    if (nestedItems && nestedItems[nextIndex]) {
                      (nestedItems[nextIndex] as HTMLElement).focus();
                    }
                  }
                }}
              />
            ))}
        </NestedList>
      )}
    </li>
  );
};

export default NavItem;
