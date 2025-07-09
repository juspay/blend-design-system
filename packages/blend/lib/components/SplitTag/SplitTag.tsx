import Block from "../Primitives/Block/Block";
import { Tag, TagVariant } from "../Tags";
import { SplitTagProps } from "./types";

const SplitTag = ({ primaryTag, secondaryTag, size, shape }: SplitTagProps) => {
  return (
    <Block display="flex" width="fit-content" flexWrap="nowrap">
      {primaryTag ? (
        <Tag
          {...primaryTag}
          splitTagPosition="left"
          variant={TagVariant.NO_FILL}
          size={size}
          shape={shape}
        />
      ) : null}
      {secondaryTag ? (
        <Tag
          {...secondaryTag}
          splitTagPosition="right"
          variant={TagVariant.ATTENTIVE}
          size={size}
          shape={shape}
        />
      ) : null}
    </Block>
  );
};

SplitTag.displayName = "SplitTag";

export default SplitTag;
