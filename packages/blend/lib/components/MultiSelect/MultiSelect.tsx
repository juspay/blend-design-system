import { useState } from "react";
import Block from "../Primitives/Block/Block";
import InputLabels from "../Inputs/utils/InputLabels/InputLabels";
import InputFooter from "../Inputs/utils/InputFooter/InputFooter";
import MultiSelectMenu from "./MultiSelectMenu";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import { FOUNDATION_THEME } from "../../tokens";
import Text from "../Text/Text";
import { ChevronDown, X } from "lucide-react";
import {
  MultiSelectMenuGroupType,
  MultiSelectMenuItemType,
  MultiSelectMenuSize,
  MultiSelectProps,
  MultiSelectSelectionTagType,
  MultiSelectVariant,
} from "./types";
import { MultiSelectTokensType } from "./multiSelect.tokens";
import { useComponentToken } from "../../context/useComponentToken";

const map = function getValueLabelMap(
  groups: MultiSelectMenuGroupType[],
): Record<string, string> {
  const map: Record<string, string> = {};

  function traverse(items: MultiSelectMenuItemType[]) {
    for (const item of items) {
      map[item.value] = item.label;
      if (item.subMenu) {
        traverse(item.subMenu);
      }
    }
  }

  for (const group of groups) {
    traverse(group.items);
  }

  return map;
};

const MultiSelect = ({
  selectedValues,
  onChange,
  items,
  label,
  sublabel,
  disabled,
  helpIconHintText,
  name,
  required,
  variant = MultiSelectVariant.CONTAINER,
  selectionTagType = MultiSelectSelectionTagType.COUNT,
  slot,
  hintText,
  placeholder,
  size = MultiSelectMenuSize.MEDIUM,
  minWidth,
  maxWidth,
  maxHeight,
  alignment,
  side,
  sideOffset,
  alignOffset,
}: MultiSelectProps) => {
  const multiSelectTokens = useComponentToken(
    "MULTI_SELECT",
  ) as MultiSelectTokensType;
  const [open, setOpen] = useState(false);
  const valueLabelMap = map(items);

  const showCancelButton =
    variant === MultiSelectVariant.CONTAINER && selectedValues.length > 0;

  const borderRadius = multiSelectTokens.trigger.borderRadius[size];
  const appliedBorderRadius = showCancelButton
    ? `${borderRadius} 0px 0px ${borderRadius}`
    : borderRadius;
  // const cancelButtonBorderRadius = showCancelButton
  //   ? `0 ${borderRadius}px ${borderRadius}px 0`
  //   : borderRadius;

  return (
    <Block
      width="100%"
      display="flex"
      flexDirection="column"
      gap={8}
      maxWidth={"100%"}
    >
      {variant === MultiSelectVariant.CONTAINER && (
        <InputLabels
          label={label}
          sublabel={sublabel}
          disabled={disabled}
          helpIconHintText={helpIconHintText}
          name={name}
          required={required}
        />
      )}
      <Block display="flex">
        <Block
          width={variant === MultiSelectVariant.CONTAINER ? "100%" : "auto"}
          maxWidth={
            variant === MultiSelectVariant.NO_CONTAINER ? "100%" : "auto"
          }
          display="flex"
          alignItems="center"
        >
          <MultiSelectMenu
            items={items}
            selected={selectedValues}
            onSelect={onChange}
            minWidth={minWidth}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            alignment={alignment}
            side={side}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            open={open}
            onOpenChange={setOpen}
            trigger={
              <PrimitiveButton
                width={"100%"}
                display="flex"
                alignItems="center"
                overflow="hidden"
                justifyContent="space-between"
                gap={8}
                borderRadius={appliedBorderRadius}
                boxShadow={multiSelectTokens.trigger.boxShadow[variant]}
                padding={multiSelectTokens.trigger.padding[size]}
                backgroundColor={
                  multiSelectTokens.trigger.backgroundColor.container[
                    open ? "open" : "closed"
                  ]
                }
                outline={
                  multiSelectTokens.trigger.outline[variant][
                    open ? "open" : "closed"
                  ]
                }
                _hover={{
                  outline: multiSelectTokens.trigger.outline[variant].hover,
                  backgroundColor:
                    multiSelectTokens.trigger.backgroundColor.container.hover,
                }}
                _focus={{
                  outline: multiSelectTokens.trigger.outline[variant].focus,
                  backgroundColor:
                    multiSelectTokens.trigger.backgroundColor.container.focus,
                }}
              >
                {slot && (
                  <Block as="span" contentCentered>
                    {slot}
                  </Block>
                )}
                <Block
                  as="span"
                  height={20}
                  textAlign="left"
                  style={{
                    textAlign: "left",
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* NO CONTAINER Label*/}
                  {variant === MultiSelectVariant.NO_CONTAINER && (
                    <Text
                      as="span"
                      variant="body.md"
                      color={FOUNDATION_THEME.colors.gray[700]}
                      fontWeight={500}
                    >
                      {label}
                    </Text>
                  )}

                  {/* Variant == Container - always show the placeholder*/}
                  {variant === MultiSelectVariant.NO_CONTAINER ||
                    (variant === MultiSelectVariant.CONTAINER && (
                      <Text
                        as="span"
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.gray[700]}
                        fontWeight={500}
                      >
                        {variant === MultiSelectVariant.CONTAINER
                          ? placeholder
                          : label}
                      </Text>
                    ))}
                  {selectedValues.length > 0 && (
                    <Text
                      as="span"
                      variant="body.md"
                      color={
                        multiSelectTokens.trigger.selectionTag.container[
                          selectionTagType
                        ].color
                      }
                      fontWeight={500}
                      style={{
                        height: "100%",
                        marginLeft: 8,
                        backgroundColor:
                          multiSelectTokens.trigger.selectionTag.container[
                            selectionTagType
                          ].backgroundColor,
                        borderRadius: 4,
                        padding:
                          selectionTagType === MultiSelectSelectionTagType.COUNT
                            ? "0px 6px"
                            : "0px 0px",
                      }}
                    >
                      {selectionTagType === MultiSelectSelectionTagType.COUNT
                        ? selectedValues.length
                        : selectedValues
                            .map((v) => valueLabelMap[v])
                            .join(", ")}
                    </Text>
                  )}
                </Block>
                <Block
                  as="span"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  size={20}
                  contentCentered
                  flexShrink={0}
                >
                  <ChevronDown size={16} />
                </Block>
              </PrimitiveButton>
            }
          />
          {variant === MultiSelectVariant.CONTAINER &&
            selectedValues.length > 0 && (
              <PrimitiveButton
                borderRadius={`0 ${borderRadius} ${borderRadius} 0`}
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                contentCentered
                height={"100%"}
                style={{ aspectRatio: 1 }}
                onClick={() => onChange("")}
                outline={multiSelectTokens.trigger.outline[variant].closed}
                _hover={{
                  backgroundColor: FOUNDATION_THEME.colors.gray[25],
                }}
                _focus={{
                  backgroundColor: FOUNDATION_THEME.colors.gray[25],
                  outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
                }}
              >
                <X size={16} color={FOUNDATION_THEME.colors.gray[400]} />
              </PrimitiveButton>
            )}
        </Block>
      </Block>
      {variant === MultiSelectVariant.CONTAINER && (
        <InputFooter hintText={hintText} />
      )}
    </Block>
  );
};

export default MultiSelect;
