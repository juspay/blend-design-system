import { ChevronRight } from "lucide-react";
import { FOUNDATION_THEME } from "../../tokens";
import Block from "../Primitives/Block/Block";
import { MultiSelectMenuItemType } from "./types";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import MultiSelectMenuItem from "./MultiSelectMenuItem";
import { MultiSelectTokensType } from "./multiSelect.tokens";
import { useComponentToken } from "../../context/useComponentToken";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";

const MenuItemSlot = ({ slot }: { slot: React.ReactNode }) => {
  return (
    <Block flexShrink={0} height="auto" contentCentered>
      {slot}
    </Block>
  );
};

const MultiSelectSubMenu = ({
  item,
  onSelect,
  selected,
}: {
  item: MultiSelectMenuItemType;
  onSelect: (value: string) => void;
  selected: string[];
}) => {
  const multiSelectTokens = useComponentToken(
    "MULTI_SELECT",
  ) as MultiSelectTokensType;
  return (
    <RadixMenu.Sub>
      <RadixMenu.SubTrigger asChild>
        <Block
          alignItems="center"
          padding="8px 6px"
          margin="0px 6px"
          borderRadius={4}
          outline="none"
          border="none"
          backgroundColor={
            multiSelectTokens.dropdown.item.backgroundColor.default
          }
          _hover={{
            backgroundColor:
              multiSelectTokens.dropdown.item.backgroundColor.hover,
          }}
          _active={{
            backgroundColor:
              multiSelectTokens.dropdown.item.backgroundColor.active,
          }}
          _focus={{
            backgroundColor:
              multiSelectTokens.dropdown.item.backgroundColor.focus,
          }}
          _focusVisible={{
            backgroundColor:
              multiSelectTokens.dropdown.item.backgroundColor.focusVisible,
          }}
        >
          <Block
            display="flex"
            alignItems="center"
            gap={8}
            justifyContent="space-between"
          >
            <Block
              as="span"
              display="flex"
              alignItems="center"
              gap={8}
              flexGrow={1}
            >
              {item.slot1 && <MenuItemSlot slot={item.slot1} />}
              {/* <Text
                variant="body.md"
                color={FOUNDATION_THEME.colors.gray[600]}
                fontWeight={500}
                truncate
              >
                {item.label}
              </Text> */}
              <PrimitiveText
                fontSize={multiSelectTokens.dropdown.item.label.fontSize}
                fontWeight={multiSelectTokens.dropdown.item.label.fontWeight}
                color={multiSelectTokens.dropdown.item.label.color.default}
                truncate
              >
                {item.label}
              </PrimitiveText>
            </Block>
            {item.slot1 && <MenuItemSlot slot={item.slot2} />}
            {item.slot2 && <MenuItemSlot slot={item.slot2} />}
            {item.slot3 && <MenuItemSlot slot={item.slot3} />}
            {item.slot4 && <MenuItemSlot slot={item.slot4} />}
            <Block flexShrink={0} size={20} contentCentered>
              <ChevronRight
                size={16}
                color={FOUNDATION_THEME.colors.gray[400]}
              />
            </Block>
          </Block>
        </Block>
      </RadixMenu.SubTrigger>
      <RadixMenu.SubContent avoidCollisions sideOffset={8} asChild>
        <Block
          backgroundColor="white"
          borderRadius={8}
          padding="8px 0px"
          boxShadow={FOUNDATION_THEME.shadows.lg}
          border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
        >
          {item.subMenu?.map((subItem, subIdx) => (
            <MultiSelectMenuItem
              key={subIdx}
              item={subItem}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </Block>
      </RadixMenu.SubContent>
    </RadixMenu.Sub>
  );
};

MultiSelectSubMenu.displayName = "MultiSelectSubMenu";

export default MultiSelectSubMenu;
