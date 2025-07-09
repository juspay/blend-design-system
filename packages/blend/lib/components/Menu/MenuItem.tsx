import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { FOUNDATION_THEME } from "../../tokens";
import {
  MenuItemV2ActionType,
  MenuItemV2Type,
  MenuItemV2Variant,
} from "./types";
import { SubMenu } from "./SubMenu";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import { MenuItemStates, MenuTokensType } from "./menu.tokens";
import { useComponentToken } from "../../context/useComponentToken";

const MenuSlot = ({ slot }: { slot: React.ReactNode }) => {
  return (
    <Block flexShrink={0} height="auto" contentCentered>
      {slot}
    </Block>
  );
};

const getBgColor = (
  state: MenuItemStates,
  menuTokens: MenuTokensType,
  item: MenuItemV2Type,
) => {
  const bg = menuTokens.item.backgroundColor;

  // check for variant
  if (item.variant === MenuItemV2Variant.DEFAULT) {
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

const getColor = (
  state: MenuItemStates,
  menuTokens: MenuTokensType,
  item: MenuItemV2Type,
) => {
  const bg = menuTokens.item.label.color;

  // check for variant
  if (item.variant === MenuItemV2Variant.DEFAULT) {
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

const MenuItem = ({ item, idx }: { item: MenuItemV2Type; idx: number }) => {
  const menuTokens = useComponentToken("MENU") as MenuTokensType;
  if (item.subMenu) {
    return <SubMenu item={item} idx={idx} />;
  }
  if (item.variant === undefined) {
    item.variant = MenuItemV2Variant.DEFAULT;
  }

  return (
    <RadixMenu.Item
      asChild
      disabled={item.disabled}
      style={{ outline: "none", border: "none" }}
    >
      <Block
        key={idx}
        display="flex"
        padding={menuTokens.item.padding}
        margin={menuTokens.item.margin}
        borderRadius={menuTokens.item.borderRadius}
        onClick={item.disabled ? undefined : item.onClick}
        cursor={item.disabled ? "not-allowed" : "pointer"}
        flexDirection="column"
        gap={menuTokens.item.gap}
        backgroundColor={getBgColor("default", menuTokens, item)}
        color={getColor("default", menuTokens, item)}
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
        <Block
          display="flex"
          alignItems="center"
          gap={4}
          width="100%"
          overflow="hidden"
        >
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
              color={getColor("default", menuTokens, item)}
              fontWeight={500}
              truncate
            >
              {item.label}
            </Text>
          </Block>
          {item.slot2 && <MenuSlot slot={item.slot2} />}
          {item.slot3 && <MenuSlot slot={item.slot3} />}
          {item.slot4 && <MenuSlot slot={item.slot4} />}
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
    </RadixMenu.Item>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
