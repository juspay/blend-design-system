import { HelpCircleIcon } from "lucide-react";
import { FOUNDATION_THEME } from "../../../../tokens";
import Block from "../../../Primitives/Block/Block";
import Text from "../../../Text/Text";
import { Tooltip, TooltipSize } from "../../../Tooltip";

type InputLabelsProps = {
  label: string;
  sublabel?: string;
  disabled?: boolean;
  helpIconHintText?: string;
  name?: string;
  required?: boolean;
};

/**
 * @description InputLabels is a component that displays a label and sublabel for an input field.
 * @param {string} label - The label for the input field.
 * @param {string} sublabel - The sublabel for the input field.
 * @param {boolean} disabled - Whether the input field is disabled.
 * @param {string} helpIconHintText - The hint text for the help icon.
 * @param {boolean} required - Whether the input field is required.
 */
const InputLabels = ({
  label,
  sublabel,
  disabled,
  helpIconHintText,
  name,
  required,
}: InputLabelsProps) => {
  return (
    <Block display="flex" alignItems="center" gap={4} width={"100%"}>
      <Text
        as="label"
        htmlFor={name}
        variant="body.md"
        fontWeight={500}
        color={
          disabled
            ? FOUNDATION_THEME.colors.gray[400]
            : FOUNDATION_THEME.colors.gray[700]
        }
        style={{ margin: 0, padding: 0 }}
      >
        {label}
      </Text>
      {required && (
        <sup style={{ color: FOUNDATION_THEME.colors.red[500] }}>*</sup>
      )}
      {sublabel && (
        <Text
          variant="body.md"
          fontWeight={400}
          color={
            disabled
              ? FOUNDATION_THEME.colors.gray[300]
              : FOUNDATION_THEME.colors.gray[400]
          }
          margin={0}
        >
          ({sublabel})
        </Text>
      )}

      {helpIconHintText && (
        <Block contentCentered size={16}>
          <Tooltip content={helpIconHintText} size={TooltipSize.SMALL}>
            <HelpCircleIcon
              size={14}
              color={FOUNDATION_THEME.colors.gray[400]}
            />
          </Tooltip>
        </Block>
      )}
    </Block>
  );
};

export default InputLabels;
