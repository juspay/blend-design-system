import { ChevronDownIcon } from "lucide-react";
import { FOUNDATION_THEME } from "../../tokens";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import Text from "../Text/Text";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import { Menu, MenuAlignment, MenuV2GroupType } from "../Menu";

const Dropdown = ({
  label = "Your Label",
  optionalLabel = "(optional)",
  hintText = "This is a hint text",
  slot,
  items,
}: {
  label?: string;
  optionalLabel?: string;
  hintText?: string;
  slot?: React.ReactNode;
  items: MenuV2GroupType[];
}) => {
  return (
    <Block display="flex" flexDirection="column" gap={10}>
      <Block display="flex" gap={8}>
        <Text as="label" variant="body.md" fontWeight={500} color={"black"}>
          {label}
        </Text>
        {optionalLabel && (
          <Text
            as="span"
            variant="body.md"
            color={FOUNDATION_THEME.colors.gray[400]}
          >
            {optionalLabel}
          </Text>
        )}
      </Block>
      <Menu
        items={items}
        alignment={MenuAlignment.START}
        trigger={
          <PrimitiveButton
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            _hover={{
              border: `1.5px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
            }}
            _focus={{
              border: `1.5px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
            }}
            _active={{
              border: `1.5px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
            }}
            style={{
              cursor: "pointer",
              border: `1.5px solid ${FOUNDATION_THEME.colors.gray[200]}`,
              borderRadius: 8,
            }}
          >
            <Block
              display="flex"
              alignItems="center"
              paddingX={14}
              paddingY={10}
              borderRadius={8}
              gap={8}
            >
              {slot && (
                <Block size={20} contentCentered>
                  {slot}
                </Block>
              )}
              <PrimitiveText
                style={{
                  cursor: "pointer",
                  flexGrow: 1,
                  userSelect: "none",
                  touchAction: "none",
                }}
                as="label"
                color={"black"}
                truncate
              >
                Select an option
              </PrimitiveText>

              <Block size={20} contentCentered borderRadius={4}>
                <ChevronDownIcon
                  size={16}
                  color={FOUNDATION_THEME.colors.gray[400]}
                />
              </Block>
            </Block>
          </PrimitiveButton>
        }
      />

      <Text variant="body.md" color={FOUNDATION_THEME.colors.gray[400]}>
        {hintText}
      </Text>
    </Block>
  );
};

export default Dropdown;
