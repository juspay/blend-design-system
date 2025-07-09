import styled from "styled-components";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import {
  MenuItemV2ActionType,
  MenuItemV2Type,
  MenuItemV2Variant,
} from "./types";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import { contentBaseStyle } from "./Menu";
import MenuItem from "./MenuItem";
import { ChevronRightIcon } from "lucide-react";
import { MenuItemStates, MenuTokensType } from "./menu.tokens";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { useComponentToken } from "../../context/useComponentToken";

const MenuSlot = ({ slot }: { slot: React.ReactNode }) => {
  return (
    <Block flexShrink={0} height="auto" contentCentered>
      {slot}
    </Block>
  );
};

const SubContent = styled(RadixMenu.SubContent)(() => ({
  ...contentBaseStyle,
}));

const getBgColor = (
  state: MenuItemStates,
  menuTokens: MenuTokensType,
  item: MenuItemV2Type,
) => {
  const bg = menuTokens.item.backgroundColor;

  // check for variant
  if (
    item.variant === MenuItemV2Variant.DEFAULT ||
    (item.subMenu && item.subMenu.length > 0)
  ) {
    if (!item.disabled) {
      return bg.default.enabled[state];
    } else {
      return bg.default.disabled[state];
    }
  } else {
    // check for action type
    if (item.actionType === undefined) {
      item.actionType = MenuItemV2ActionType.PRIMARY;
    }
    if (item.actionType === MenuItemV2ActionType.PRIMARY) {
      if (!item.disabled) {
        return bg.action.primary.enabled[state];
      } else {
        return bg.action.primary.disabled[state];
      }
    } else {
      if (!item.disabled) {
        return bg.action.danger.enabled[state];
      } else {
        return bg.action.danger.disabled[state];
      }
    }
  }
};

const getLabelColor = (
  state: MenuItemStates,
  menuTokens: MenuTokensType,
  item: MenuItemV2Type,
) => {
  const bg = menuTokens.item.label.color;

  // check for variant
  if (
    item.variant === MenuItemV2Variant.DEFAULT ||
    (item.subMenu && item.subMenu.length > 0)
  ) {
    if (!item.disabled) {
      return bg.default.enabled[state];
    } else {
      return bg.default.disabled[state];
    }
  } else {
    // check for action type
    if (item.actionType === undefined) {
      item.actionType = MenuItemV2ActionType.PRIMARY;
    }
    if (item.actionType === MenuItemV2ActionType.PRIMARY) {
      if (!item.disabled) {
        return bg.action.primary.enabled[state];
      } else {
        return bg.action.primary.disabled[state];
      }
    } else {
      if (!item.disabled) {
        return bg.action.danger.enabled[state];
      } else {
        return bg.action.danger.disabled[state];
      }
    }
  }
};

const getSubLabelColor = (
  state: MenuItemStates,
  menuTokens: MenuTokensType,
  item: MenuItemV2Type,
) => {
  const bg = menuTokens.item.subLabel.color;

  // check for variant
  if (
    item.variant === MenuItemV2Variant.DEFAULT ||
    (item.subMenu && item.subMenu.length > 0)
  ) {
    if (!item.disabled) {
      return bg.default.enabled[state];
    } else {
      return bg.default.disabled[state];
    }
  } else {
    // check for action type
    if (item.actionType === undefined) {
      item.actionType = MenuItemV2ActionType.PRIMARY;
    }
    if (item.actionType === MenuItemV2ActionType.PRIMARY) {
      if (!item.disabled) {
        return bg.action.primary.enabled[state];
      } else {
        return bg.action.primary.disabled[state];
      }
    } else {
      if (!item.disabled) {
        return bg.action.danger.enabled[state];
      } else {
        return bg.action.danger.disabled[state];
      }
    }
  }
};

export const SubMenu = ({
  item,
  idx,
}: {
  item: MenuItemV2Type;
  idx: number;
}) => {
  const menuTokens = useComponentToken("MENU") as MenuTokensType;

  return (
    <RadixMenu.Sub key={idx}>
      <RadixMenu.SubTrigger asChild style={{ outline: "none", border: "none" }}>
        <Block
          display="flex"
          flexDirection="column"
          gap={menuTokens.item.gap}
          width="calc(100% - 12px)"
          padding={menuTokens.item.padding}
          margin={menuTokens.item.margin}
          borderRadius={menuTokens.item.borderRadius}
          color={getLabelColor("default", menuTokens, item)}
          _hover={{
            backgroundColor: getBgColor("hover", menuTokens, item),
          }}
          _focus={{
            backgroundColor: getBgColor("focus", menuTokens, item),
          }}
          _active={{
            backgroundColor: getBgColor("active", menuTokens, item),
          }}
          _focusVisible={{
            backgroundColor: getBgColor("focusVisible", menuTokens, item),
          }}
        >
          <Block display="flex" alignItems="center" gap={4} width="100%">
            {item.slot1 && <MenuSlot slot={item.slot1} />}
            <Block
              display="flex"
              flexGrow={1}
              alignItems="center"
              maxWidth="100%"
              overflow="hidden"
            >
              <Text
                variant="body.md"
                fontWeight={menuTokens.item.label.fontWeight}
                fontSize={menuTokens.item.label.fontSize}
                truncate
                color={getLabelColor("default", menuTokens, item)}
              >
                {item.label}
              </Text>
            </Block>
            {item.slot2 && <MenuSlot slot={item.slot2} />}
            {item.slot3 && <MenuSlot slot={item.slot3} />}
            {item.slot4 && <MenuSlot slot={item.slot4} />}

            <Block flexShrink={0} size="auto" contentCentered>
              <ChevronRightIcon size={16} />
            </Block>
          </Block>
          {item.subLabel && (
            <Block display="flex" alignItems="center" width="100%">
              <PrimitiveText
                color={getSubLabelColor("default", menuTokens, item)}
                fontWeight={menuTokens.item.subLabel.fontWeight}
                fontSize={menuTokens.item.subLabel.fontSize}
              >
                {item.subLabel}
              </PrimitiveText>
            </Block>
          )}
        </Block>
      </RadixMenu.SubTrigger>
      <RadixMenu.Portal>
        <SubContent
          style={{
            paddingTop: menuTokens.paddingTop,
            paddingBottom: menuTokens.paddingBottom,
            borderRadius: menuTokens.borderRadius,
          }}
          avoidCollisions
        >
          {item.subMenu &&
            item.subMenu.map((subItem, subIdx) => (
              <MenuItem key={subIdx} item={subItem} idx={subIdx} />
            ))}
        </SubContent>
      </RadixMenu.Portal>
    </RadixMenu.Sub>
  );
};
