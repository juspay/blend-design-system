import { X } from "lucide-react";
import { FOUNDATION_THEME } from "../../tokens";
import { ButtonSubTypeV2, ButtonTypeV2, ButtonV2 } from "../ButtonV2";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { PopoverTokenType } from "./popover.tokens";
import { PopoverProps, PopoverSize } from "./types";
import { useComponentToken } from "../../context/useComponentToken";

const PopoverHeader = ({
  heading,
  description,
  showCloseButton,
  onClose,
  size = PopoverSize.MEDIUM,
}: Pick<
  PopoverProps,
  "heading" | "description" | "showCloseButton" | "size" | "onClose"
>) => {
  const popoverTokens = useComponentToken("POPOVER") as PopoverTokenType;

  if (!heading && !description) return null;
  const Header = () => {
    return (
      <PrimitiveText
        fontSize={popoverTokens.headerContainer.heading.fontSize[size]}
        fontWeight={popoverTokens.headerContainer.heading.fontWeight[size]}
        color={popoverTokens.headerContainer.heading.color[size]}
      >
        {heading}
      </PrimitiveText>
    );
  };

  const Description = () => {
    return (
      <PrimitiveText
        fontSize={popoverTokens.headerContainer.description.fontSize[size]}
        color={popoverTokens.headerContainer.description.color[size]}
        fontWeight={popoverTokens.headerContainer.description.fontWeight[size]}
      >
        {description}
      </PrimitiveText>
    );
  };

  return (
    <Block display="flex" flexDirection="column" gap={FOUNDATION_THEME.unit[4]}>
      <Block
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={FOUNDATION_THEME.unit[8]}
      >
        {heading ? <Header /> : description ? <Description /> : null}
        {showCloseButton && (
          <Block size={18} contentCentered>
            <ButtonV2
              subType={ButtonSubTypeV2.INLINE}
              buttonType={ButtonTypeV2.SECONDARY}
              leadingIcon={<X size={FOUNDATION_THEME.unit[12]} />}
              onClick={onClose}
            ></ButtonV2>
          </Block>
        )}
      </Block>
      {description && heading && <Description />}
    </Block>
  );
};

PopoverHeader.displayName = "PopoverHeader";

export default PopoverHeader;
