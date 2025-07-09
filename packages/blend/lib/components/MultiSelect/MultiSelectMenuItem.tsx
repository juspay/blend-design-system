import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import Block from "../Primitives/Block/Block";
import { MultiSelectMenuItemType } from "./types";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { Checkbox } from "../Checkbox";
import MultiSelectSubMenu from "./MultiSelectSubMenu";
import { useComponentToken } from "../../context/useComponentToken";
import { MultiSelectTokensType } from "./multiSelect.tokens";

const MenuItemSlot = ({ slot }: { slot: React.ReactNode }) => {
  return (
    <Block flexShrink={0} height="auto" contentCentered>
      {slot}
    </Block>
  );
};

const MultiSelectMenuItem = ({
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
  if (item.subMenu) {
    return (
      <MultiSelectSubMenu item={item} onSelect={onSelect} selected={selected} />
    );
  }
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;

    e.preventDefault();
    e.stopPropagation();
    onSelect(item.value);
  };

  const isSelected = selected.includes(item.value);
  return (
    <RadixMenu.Item asChild onClick={handleClick} data-disabled={item.disabled}>
      <Block
        margin="0px 6px"
        padding="8px 6px"
        display="flex"
        flexDirection="column"
        gap={4}
        borderRadius={4}
        outline="none"
        border="none"
        color={
          item.disabled
            ? multiSelectTokens.dropdown.item.label.color.disabled
            : isSelected
              ? multiSelectTokens.dropdown.item.label.color.selected
              : multiSelectTokens.dropdown.item.label.color.default
        }
        backgroundColor={
          isSelected
            ? multiSelectTokens.dropdown.item.backgroundColor.selected
            : multiSelectTokens.dropdown.item.backgroundColor.default
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
        cursor={item.disabled ? "not-allowed" : "pointer"}
      >
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth="100%"
          gap={8}
        >
          <Block as="div" display="flex" alignItems="center" gap={8}>
            {item.slot1 && <MenuItemSlot slot={item.slot1} />}
            <Block flexGrow={1} display="flex" overflow="hidden">
              <PrimitiveText
                fontSize={multiSelectTokens.dropdown.item.label.fontSize}
                fontWeight={multiSelectTokens.dropdown.item.label.fontWeight}
                truncate
              >
                {item.label}
              </PrimitiveText>
            </Block>
          </Block>
          <Block as="div" display="flex" alignItems="center" gap={4}>
            {item.slot2 && <MenuItemSlot slot={item.slot2} />}
            {item.slot3 && <MenuItemSlot slot={item.slot3} />}
            {item.slot4 && <MenuItemSlot slot={item.slot4} />}
            <Block as="span" display="flex" alignItems="center" flexShrink={0}>
              <Checkbox disabled={item.disabled} checked={isSelected} />
            </Block>
          </Block>
        </Block>
        {item.subLabel && (
          <Block>
            <PrimitiveText
              fontSize={multiSelectTokens.dropdown.item.subLabel.fontSize}
              fontWeight={multiSelectTokens.dropdown.item.subLabel.fontWeight}
              color={
                isSelected
                  ? multiSelectTokens.dropdown.item.subLabel.color.selected
                  : multiSelectTokens.dropdown.item.subLabel.color.default
              }
            >
              {item.subLabel}
            </PrimitiveText>
          </Block>
        )}
      </Block>
    </RadixMenu.Item>
  );
};

MultiSelectMenuItem.displayName = "MultiSelectMenuItem";

export default MultiSelectMenuItem;
