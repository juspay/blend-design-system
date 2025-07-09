import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import styled, { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { MenuV2Props, MenuAlignment, MenuSide } from "./types";
import React, { useState } from "react";
import { filterMenuGroups } from "./utils";
import MenuItem from "./MenuItem";
import Block from "../Primitives/Block/Block";
import SearchInput from "../Inputs/SearchInput/SearchInput";
import { Search } from "lucide-react";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { MenuTokensType } from "./menu.tokens";
import { useComponentToken } from "../../context/useComponentToken";

export const contentBaseStyle: CSSObject = {
  backgroundColor: "white",
  boxShadow: FOUNDATION_THEME.shadows.lg,
  zIndex: 9999,
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
  paddingBottom: 6,
  borderRadius: 8,
};

const Content = styled(RadixMenu.Content)(() => ({
  ...contentBaseStyle,
}));

const Menu = ({
  trigger,
  items = [],
  asModal = false,
  alignment = MenuAlignment.CENTER,
  side = MenuSide.BOTTOM,
  sideOffset = 8,
  alignOffset = 0,
  collisonBoundaryRef,
  maxHeight,
  enableSearch = false,
  searchPlaceholder = "Search",
  minWidth,
  maxWidth,
}: MenuV2Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const filteredItems = filterMenuGroups(items, searchText);
  const menuTokens = useComponentToken("MENU") as MenuTokensType;
  return (
    <RadixMenu.Root modal={asModal}>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        side={side}
        align={alignment}
        collisionBoundary={collisonBoundaryRef}
        style={{
          maxHeight: maxHeight
            ? `${maxHeight}px`
            : "var(--radix-popper-available-height)",
          minWidth: minWidth ? `${minWidth}px` : "200px",
          maxWidth: maxWidth ? `${maxWidth}px` : "280px",
          paddingTop: enableSearch ? 0 : menuTokens.paddingTop,
          border: menuTokens.border,
        }}
      >
        {enableSearch && (
          <Block
            width="100%"
            marginLeft="-6px"
            position="sticky"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
          >
            <SearchInput
              leftSlot={
                <Search color={FOUNDATION_THEME.colors.gray[400]} size={16} />
              }
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Block>
        )}
        {filteredItems &&
          filteredItems.map((group, groupId) => (
            <React.Fragment key={groupId}>
              {group.label && (
                <RadixMenu.Label asChild>
                  <PrimitiveText
                    fontSize={12}
                    padding="6px 8px"
                    userSelect="none"
                    margin="0px 6px"
                    textTransform="uppercase"
                    color={FOUNDATION_THEME.colors.gray[400]}
                  >
                    {group.label}
                  </PrimitiveText>
                </RadixMenu.Label>
              )}
              {group.items.map((item, itemIndex) => (
                <MenuItem
                  key={`${groupId}-${itemIndex}`}
                  item={item}
                  idx={itemIndex}
                />
              ))}
              {groupId !== filteredItems.length - 1 && group.showSeparator && (
                <RadixMenu.Separator asChild>
                  <Block
                    height={menuTokens.seperator.height}
                    backgroundColor={menuTokens.seperator.color}
                    margin={menuTokens.seperator.margin}
                  ></Block>
                </RadixMenu.Separator>
              )}
            </React.Fragment>
          ))}
      </Content>
    </RadixMenu.Root>
  );
};

Menu.displayName = "Menu";

export default Menu;
