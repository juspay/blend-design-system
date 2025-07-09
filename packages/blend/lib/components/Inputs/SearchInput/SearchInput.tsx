import { useEffect } from "react";
import { useRef, useState } from "react";
import Block from "../../Primitives/Block/Block";
import PrimitiveInput from "../../Primitives/PrimitiveInput/PrimitiveInput";

import { SearchInputProps } from "./types";
import { SearchInputTokensType } from "./searchInput.tokens";
import { useComponentToken } from "../../../context/useComponentToken";

const toPixels = (value: string | number | undefined): number => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    // Remove 'px' and convert to number
    const numericValue = parseFloat(value.replace("px", ""));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  return 0;
};

const SearchInput = ({
  leftSlot,
  rightSlot,
  error = false,
  placeholder = "Enter",
  value,
  onChange,
  name,
  ...rest
}: SearchInputProps) => {
  const searchInputTokens = useComponentToken(
    "SEARCH_INPUT",
  ) as SearchInputTokensType;

  const leftSlotRef = useRef<HTMLDivElement>(null);
  const rightSlotRef = useRef<HTMLDivElement>(null);

  const [leftSlotWidth, setLeftSlotWidth] = useState(0);
  const [rightSlotWidth, setRightSlotWidth] = useState(0);

  useEffect(() => {
    if (leftSlotRef.current) {
      setLeftSlotWidth(leftSlotRef.current.offsetWidth);
    } else {
      setLeftSlotWidth(0);
    }
    if (rightSlotRef.current) {
      setRightSlotWidth(rightSlotRef.current.offsetWidth);
    } else {
      setRightSlotWidth(0);
    }
  }, [leftSlot, rightSlot]);

  const paddingX = toPixels(searchInputTokens.padding.x);
  const paddingY = toPixels(searchInputTokens.padding.y);
  const GAP = toPixels(searchInputTokens.gap);

  const paddingInlineStart = leftSlot
    ? paddingX + leftSlotWidth + GAP
    : paddingX;
  const paddingInlineEnd = rightSlot
    ? paddingX + rightSlotWidth + GAP
    : paddingX;

  return (
    <Block position="relative" width={"100%"} height={40}>
      {leftSlot && (
        <Block
          ref={leftSlotRef}
          position="absolute"
          top={paddingY}
          left={paddingX}
          bottom={paddingY}
          contentCentered
        >
          {leftSlot}
        </Block>
      )}

      {rightSlot && (
        <Block
          ref={rightSlotRef}
          position="absolute"
          top={paddingY}
          right={paddingX}
          bottom={paddingY}
          contentCentered
        >
          {rightSlot}
        </Block>
      )}

      <PrimitiveInput
        name={name}
        value={value}
        onChange={onChange}
        height={searchInputTokens.height}
        width={searchInputTokens.width}
        placeholder={placeholder}
        paddingInlineStart={paddingInlineStart}
        paddingInlineEnd={paddingInlineEnd}
        paddingY={paddingY}
        outline={searchInputTokens.outline}
        borderRadius={searchInputTokens.borderRadius}
        borderTop={searchInputTokens.borderTop.default}
        borderLeft={searchInputTokens.borderLeft.default}
        borderRight={searchInputTokens.borderRight.default}
        borderBottom={
          error
            ? searchInputTokens.borderBottom.error
            : searchInputTokens.borderBottom.default
        }
        _hover={{
          borderBottom: searchInputTokens.borderBottom.hover,
        }}
        _focus={{
          borderBottom: searchInputTokens.borderBottom.focus,
        }}
        {...rest}
      />
    </Block>
  );
};

export default SearchInput;
