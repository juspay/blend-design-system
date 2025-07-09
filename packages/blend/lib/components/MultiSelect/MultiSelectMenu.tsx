import React from "react";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import Block from "../Primitives/Block/Block";
import { FOUNDATION_THEME } from "../../tokens";
import {
  MultiSelectMenuAlignment,
  MultiSelectMenuProps,
  MultiSelectMenuSide,
} from "./types";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import MultiSelectMenuItem from "./MultiSelectMenuItem";
import { MultiSelectTokensType } from "./multiSelect.tokens";
import { useComponentToken } from "../../context/useComponentToken";

const Content = styled(RadixMenu.Content)(() => ({
  position: "relative",
  backgroundColor: "white",
  borderRadius: 8,
  padding: "6px 0px",
  boxShadow: FOUNDATION_THEME.shadows.lg,
  zIndex: 9999,
  overflowY: "auto",
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
  border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
}));

const MultiSelectMenu = ({
  items,
  selected,
  onSelect,
  trigger,
  minWidth,
  maxWidth,
  maxHeight,
  alignment = MultiSelectMenuAlignment.CENTER,
  side = MultiSelectMenuSide.BOTTOM,
  sideOffset = 8,
  alignOffset = 0,
  open,
  onOpenChange,
}: MultiSelectMenuProps) => {
  const multiSelectTokens = useComponentToken(
    "MULTI_SELECT",
  ) as MultiSelectTokensType;
  return (
    <RadixMenu.Root modal={false} open={open} onOpenChange={onOpenChange}>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <Content
        align={alignment}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        side={side}
        style={{
          minWidth,
          width: "var(--radix-dropdown-menu-trigger-width)",
          maxWidth: maxWidth
            ? maxWidth
            : "var(--radix-dropdown-menu-trigger-width)",
          maxHeight,
        }}
      >
        {items.map((group, groupId) => (
          <React.Fragment key={groupId}>
            {group.groupLabel && (
              <RadixMenu.Label asChild>
                <PrimitiveText
                  fontSize={12}
                  padding="6px 8px"
                  userSelect="none"
                  margin="0px 6px"
                  textTransform="uppercase"
                  color={FOUNDATION_THEME.colors.gray[400]}
                >
                  {group.groupLabel}
                </PrimitiveText>
              </RadixMenu.Label>
            )}
            {group.items.map((item, itemIndex) => (
              <MultiSelectMenuItem
                key={`${groupId}-${itemIndex}`}
                selected={selected}
                item={item}
                onSelect={onSelect}
              />
            ))}
            {groupId !== items.length - 1 && group.showSeparator && (
              <RadixMenu.Separator asChild>
                <Block
                  height={multiSelectTokens.dropdown.seperator.height}
                  backgroundColor={multiSelectTokens.dropdown.seperator.color}
                  margin={multiSelectTokens.dropdown.seperator.margin}
                ></Block>
              </RadixMenu.Separator>
            )}
          </React.Fragment>
        ))}
      </Content>
    </RadixMenu.Root>
  );
};

export default MultiSelectMenu;
