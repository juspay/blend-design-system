import Block from "../Primitives/Block/Block";
import { forwardRef } from "react";

import Text from "../Text/Text";
import { TagColor, TagProps, TagShape, TagSize, TagVariant } from "./types";
import { useComponentToken } from "../../context/useComponentToken";
import { TagTokensType } from "./tag.tokens";

const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      text,
      variant = TagVariant.SUBTLE,
      color = TagColor.PRIMARY,
      size = TagSize.SM,
      shape = TagShape.SQUARICAL,
      leftSlot,
      rightSlot,
      onClick,
      splitTagPosition,
      ...rest
    },
    ref,
  ) => {
    const tagTokens = useComponentToken("TAGS") as TagTokensType;

    const isSplitTag = splitTagPosition !== undefined;
    let borderRadius = tagTokens.borderRadius[shape][size];
    if (isSplitTag) {
      const radius = tagTokens.borderRadius[shape][size];
      borderRadius =
        splitTagPosition === "left"
          ? `${radius} 0 0 ${radius}`
          : `0 ${radius} ${radius} 0`;
    }

    return (
      <Block
        {...rest}
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="fit-content"
        gap={tagTokens.gap[size]}
        height={tagTokens.height[size]}
        padding={tagTokens.padding[size]}
        backgroundColor={tagTokens.background[variant][color]}
        color={tagTokens.color[variant][color]}
        border={`${tagTokens.borderWidth[variant][color]}px solid ${tagTokens.borderColor[variant][color]}`}
        borderRadius={borderRadius}
        cursor={onClick ? "pointer" : "default"}
        onClick={onClick}
      >
        {leftSlot && <Block contentCentered>{leftSlot}</Block>}
        <Text
          fontSize={tagTokens.font[size].fontSize}
          fontWeight={tagTokens.font[size].fontWeight}
        >
          {text}
        </Text>
        {rightSlot && <Block contentCentered>{rightSlot}</Block>}
      </Block>
    );
  },
);

Tag.displayName = "Tag";

export default Tag;
