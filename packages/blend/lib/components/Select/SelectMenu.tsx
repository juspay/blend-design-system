import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import Text from "../Text/Text";
import styled from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import Block from "../Primitives/Block/Block";
import { ChevronRightIcon, Check } from "lucide-react";
import React, { useState } from "react";
import {
  SelectMenuAlignment,
  SelectMenuGroupType,
  SelectMenuItemType,
  SelectMenuProps,
  SelectMenuSide,
} from "./types";
import SearchInput from "../Inputs/SearchInput/SearchInput";

const Content = styled(RadixMenu.Content)(() => ({
  backgroundColor: "white",
  color: "black",
  borderRadius: 8,
  padding: "8px 6px",
  boxShadow: FOUNDATION_THEME.shadows.lg,
  zIndex: 9999,
  minWidth: 200,
  width: "var(--radix-dropdown-menu-trigger-width)",
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
  border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
  overflowY: "auto",
}));

const StyledItem = styled(RadixMenu.Item)<{ selected: boolean }>(
  ({ selected }) => ({
    alignItems: "center",
    gap: 8,
    padding: "8px 6px",
    borderRadius: 4,
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: selected
      ? FOUNDATION_THEME.colors.gray[50]
      : "transparent",
    "&:hover": {
      backgroundColor: FOUNDATION_THEME.colors.gray[50],
    },

    "&[data-disabled]": {
      opacity: 0.5,
      cursor: "not-allowed",
    },

    "&[data-highlighted]": {
      border: "none",
      outline: "none",
      backgroundColor: FOUNDATION_THEME.colors.gray[50],
    },
  }),
);

const Sub = styled(RadixMenu.Sub)(() => ({
  padding: 0,
  margin: 0,
  listStyle: "none",
}));

const SubContent = styled(RadixMenu.SubContent)(() => ({
  backgroundColor: "white",
  color: "black",
  borderRadius: 6,
  padding: "8px 6px",
  boxShadow: FOUNDATION_THEME.shadows.lg,
  zIndex: 9999,
  minWidth: 200,
  maxWidth: 280,
}));

const SubTrigger = styled(RadixMenu.SubTrigger)(() => ({
  alignItems: "center",
  gap: 8,
  padding: "6px 8px",
  borderRadius: 4,
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    backgroundColor: FOUNDATION_THEME.colors.gray[50],
  },

  "&[data-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  "&[data-highlighted]": {
    border: "none",
    outline: "none",
    backgroundColor: FOUNDATION_THEME.colors.gray[50],
  },
}));

const SubMenu = ({
  item,
  idx,
  selectedValue,
  allowMultiSelect = false,
  onSelect,
}: {
  item: SelectMenuItemType;
  idx: number;
  selectedValue: string | string[] | undefined;
  allowMultiSelect?: boolean;
  onSelect?: (value: string | string[]) => void;
}) => {
  return (
    <Sub key={idx}>
      <SubTrigger data-gg="sub menu trigger" asChild>
        <Block
          padding="6px"
          display="flex"
          flexDirection="column"
          gap={4}
          width="100%"
        >
          <Block display="flex" alignItems="center" gap={4} width="100%">
            {item.slot1 && (
              <Block flexShrink={0} height="auto" contentCentered>
                {item.slot1}
              </Block>
            )}
            <Block
              display="flex"
              flexGrow={1}
              alignItems="center"
              maxWidth="100%"
              overflow="hidden"
            >
              <Text
                variant="body.md"
                color={FOUNDATION_THEME.colors.gray[600]}
                fontWeight={500}
                truncate
              >
                {item.label}
              </Text>
            </Block>
            {item.slot2 && (
              <Block flexShrink={0} height="auto" contentCentered>
                {item.slot2}
              </Block>
            )}
            {item.slot3 && (
              <Block flexShrink={0} height="auto" contentCentered>
                {item.slot3}
              </Block>
            )}
            {item.slot4 && (
              <Block flexShrink={0} height="auto" contentCentered>
                {item.slot4}
              </Block>
            )}

            <Block flexShrink={0} size="auto" contentCentered>
              <ChevronRightIcon size={16} />
            </Block>
          </Block>
          {item.subLabel && (
            <Block display="flex" alignItems="center" width="100%">
              <Text
                variant="body.sm"
                color={FOUNDATION_THEME.colors.gray[400]}
                fontWeight={400}
              >
                {item.subLabel}
              </Text>
            </Block>
          )}
        </Block>
      </SubTrigger>
      <RadixMenu.Portal>
        <SubContent avoidCollisions>
          {item.subMenu &&
            item.subMenu.map((subItem, subIdx) => (
              <Item
                key={subIdx}
                item={subItem}
                idx={subIdx}
                selectedValue={selectedValue}
                allowMultiSelect={allowMultiSelect}
                onSelect={onSelect}
              />
            ))}
        </SubContent>
      </RadixMenu.Portal>
    </Sub>
  );
};

const Separator = styled(RadixMenu.Separator)(() => ({
  height: 1,
  backgroundColor: "#eee",
  margin: "6px 0",
  width: "calc(100% + 12px)",
  marginLeft: "-6px",
}));

const Item = ({
  item,
  idx,
  selectedValue,
  allowMultiSelect = false,
  onSelect,
}: {
  item: SelectMenuItemType;
  idx: number;
  selectedValue: string | string[] | undefined;
  allowMultiSelect?: boolean;
  onSelect?: (value: string | string[]) => void;
}) => {
  if (item.subMenu) {
    return (
      <SubMenu
        item={item}
        idx={idx}
        selectedValue={selectedValue}
        allowMultiSelect={allowMultiSelect}
        onSelect={onSelect}
      />
    );
  }

  const isSelected = allowMultiSelect
    ? Array.isArray(selectedValue) && selectedValue.includes(item.value)
    : selectedValue === item.value;

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;

    // Prevent dropdown from closing in multi-select mode
    if (allowMultiSelect) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (allowMultiSelect) {
      let newSelected: string[] = Array.isArray(selectedValue)
        ? [...selectedValue]
        : [];
      if (newSelected.includes(item.value)) {
        newSelected = newSelected.filter((v) => v !== item.value);
      } else {
        newSelected.push(item.value);
      }
      if (onSelect) onSelect(newSelected);
    } else {
      if (onSelect) onSelect(item.value);
    }
    if (item.onClick) item.onClick();
  };

  return (
    <StyledItem
      onClick={handleClick}
      asChild
      disabled={item.disabled}
      key={idx}
      selected={isSelected}
      // Prevent Radix from handling the select event in multi-select mode
      onSelect={allowMultiSelect ? (e) => e.preventDefault() : undefined}
    >
      <Block
        padding="6px"
        display="flex"
        flexDirection="column"
        gap={4}
        width="100%"
      >
        <Block
          display="flex"
          alignItems="center"
          gap={4}
          width="100%"
          overflow="hidden"
        >
          {item.slot1 && (
            <Block flexShrink={0} height="auto" contentCentered>
              {item.slot1}
            </Block>
          )}
          <Block
            display="flex"
            flexGrow={1}
            alignItems="center"
            maxWidth="100%"
            overflow="hidden"
          >
            <Text
              variant="body.md"
              color={
                isSelected
                  ? FOUNDATION_THEME.colors.gray[700]
                  : FOUNDATION_THEME.colors.gray[600]
              }
              fontWeight={500}
              truncate
            >
              {item.label}
            </Text>
          </Block>
          {item.slot2 && (
            <Block flexShrink={0} height="auto" contentCentered>
              {item.slot2}
            </Block>
          )}
          {item.slot3 && (
            <Block flexShrink={0} height="auto" contentCentered>
              {item.slot3}
            </Block>
          )}
          {item.slot4 && (
            <Block flexShrink={0} height="auto" contentCentered>
              {item.slot4}
            </Block>
          )}
          {isSelected && (
            <Block flexShrink={0} height="auto" contentCentered>
              <Check
                strokeWidth={2.5}
                size={16}
                color={FOUNDATION_THEME.colors.gray[600]}
              />
            </Block>
          )}
        </Block>
        {item.subLabel && (
          <Block display="flex" alignItems="center" width="100%">
            <Text
              variant="body.sm"
              color={FOUNDATION_THEME.colors.gray[400]}
              fontWeight={400}
            >
              {item.subLabel}
            </Text>
          </Block>
        )}
      </Block>
    </StyledItem>
  );
};

const Label = styled(RadixMenu.Label)(() => ({
  padding: "6px 8px",
  userSelect: "none",
  textTransform: "uppercase",
}));

// Utility: Recursively filter menu items and groups by search text
function filterMenuGroups(
  groups: SelectMenuGroupType[],
  searchText: string,
): SelectMenuGroupType[] {
  if (!searchText) return groups;
  const lower = searchText.toLowerCase();
  return groups
    .map((group: SelectMenuGroupType) => {
      // TODO: Should we include the whole group if the label matches?
      // if (group.label && group.label.toLowerCase().includes(lower)) {
      //   return group;
      // }
      const filteredItems = group.items
        .map((item: SelectMenuItemType) => filterMenuItem(item, lower))
        .filter(Boolean) as SelectMenuItemType[];
      if (filteredItems.length === 0) return null;
      return { ...group, items: filteredItems };
    })
    .filter(Boolean) as SelectMenuGroupType[];
}

function filterMenuItem(
  item: SelectMenuItemType,
  lower: string,
): SelectMenuItemType | null {
  // Check if this item matches
  const matches =
    (item.label && item.label.toLowerCase().includes(lower)) ||
    (item.subLabel && item.subLabel.toLowerCase().includes(lower));
  // If it has a submenu, filter recursively
  if (item.subMenu) {
    const filteredSub = item.subMenu
      .map((sub: SelectMenuItemType) => filterMenuItem(sub, lower))
      .filter(Boolean) as SelectMenuItemType[];
    if (filteredSub.length > 0 || matches) {
      return { ...item, subMenu: filteredSub };
    }
    return null;
  }
  return matches ? item : null;
}

// Utility: Recursively override onClick for all menu items and submenus
function overrideOnClickInMenuGroups(
  groups: SelectMenuGroupType[],
  onSelect?: (value: string) => void,
): SelectMenuGroupType[] {
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => overrideOnClickInMenuItem(item, onSelect)),
  }));
}

function overrideOnClickInMenuItem(
  item: SelectMenuItemType,
  onSelect?: (value: string) => void,
): SelectMenuItemType {
  const newItem: SelectMenuItemType = {
    ...item,
    onClick: onSelect ? () => onSelect(item.value) : undefined,
  };
  if (item.subMenu) {
    newItem.subMenu = item.subMenu.map((sub) =>
      overrideOnClickInMenuItem(sub, onSelect),
    );
  }
  return newItem;
}

const SelectMenu = ({
  trigger,
  items,
  asModal = false,
  alignment = SelectMenuAlignment.CENTER,
  side = SelectMenuSide.BOTTOM,
  sideOffset = 8,
  alignOffset = 0,
  maxHeight,
  selected,
  onSelect,
  allowMultiSelect = false,
  enableSearch = false,
}: SelectMenuProps) => {
  const [searchText, setSearchText] = useState<string>("");

  // Override onClick for all items
  const itemsWithOnClick = overrideOnClickInMenuGroups(items, onSelect);
  const filteredItems = filterMenuGroups(itemsWithOnClick, searchText);

  return (
    <RadixMenu.Root modal={asModal}>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        side={side}
        align={alignment}
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
        }}
      >
        {enableSearch && (
          <Block
            width="calc(100% + 12px)"
            marginLeft="-6px"
            position="sticky"
            top={0}
            zIndex={1000}
            paddingBottom={10}
          >
            <SearchInput
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                e.stopPropagation();
                setSearchText(e.target.value);
              }}
            />
          </Block>
        )}
        {filteredItems &&
          filteredItems.map((group, groupId) => (
            <React.Fragment key={groupId}>
              {group.groupLabel && (
                <Label>
                  <Text
                    variant="body.sm"
                    color={FOUNDATION_THEME.colors.gray[400]}
                  >
                    {group.groupLabel}
                  </Text>
                </Label>
              )}
              {group.items.map((item, itemIndex) => (
                <Item
                  selectedValue={selected}
                  key={`${groupId}-${itemIndex}`}
                  item={item}
                  idx={itemIndex}
                  allowMultiSelect={allowMultiSelect}
                  onSelect={onSelect}
                />
              ))}
              {groupId !== filteredItems.length - 1 && group.showSeparator && (
                <Separator />
              )}
            </React.Fragment>
          ))}
      </Content>
    </RadixMenu.Root>
  );
};

export default SelectMenu;
